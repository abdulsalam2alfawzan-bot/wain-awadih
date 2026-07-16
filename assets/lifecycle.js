(() => {
  "use strict";
  window.WA = window.WA || {};

  const touchRequest = (request, patch = {}) => WA.Storage.upsert("wa_requests", { ...request, ...patch, lastActivityAt: WA.Storage.now() });
  const findCustomer = (phone) => WA.Storage.get("wa_customers").find((row) => row.phone === WA.Storage.sanitizePhone(phone)) || null;
  const findRequestByToken = (token) => WA.Storage.get("wa_requests").find((row) => row.publicToken === token) || null;
  const findRequestByHumanId = (humanId) => WA.Storage.get("wa_requests").find((row) => row.humanId === String(humanId || "").toUpperCase()) || null;
  const feeForBand = (band) => WA.Config.costBands[band]?.fee ?? null;
  const bandLabel = (band) => WA.Config.costBands[band]?.label || band || "غير محددة";

  const saveCustomerAndVehicle = ({ customer, vehicle, consents = {} }) => WA.Storage.transaction(() => {
    const phone = WA.Storage.sanitizePhone(customer.phone);
    if (!/^05\d{8}$/.test(phone)) throw new Error("رقم الجوال غير صالح");
    const existingCustomer = findCustomer(phone);
    const customerRecord = WA.Storage.upsert("wa_customers", {
      id: existingCustomer?.id || WA.Storage.createId("CUS"),
      firstName: WA.Storage.sanitizeText(customer.firstName, 40),
      phone,
      operationalMessages: true,
      marketingMessages: Boolean(consents.marketingMessages)
    });

    WA.Storage.insertUnique("wa_consents", {
      id: WA.Storage.createId("CNS"),
      customerId: customerRecord.id,
      privacyAccepted: Boolean(consents.privacyAccepted),
      termsAccepted: Boolean(consents.termsAccepted),
      marketingMessages: Boolean(consents.marketingMessages),
      source: "customer_flow",
      acceptedAt: WA.Storage.now()
    }, ["customerId", "source"]);

    const make = WA.Storage.sanitizeText(vehicle.make, 60);
    const model = WA.Storage.sanitizeText(vehicle.model, 60);
    const year = WA.Storage.sanitizeText(vehicle.year, 4);
    const vin = WA.Storage.sanitizeText(vehicle.vin, 40).toUpperCase();
    const existingVehicle = WA.Storage.get("wa_vehicles").find((row) => row.customerId === customerRecord.id
      && row.make === make && row.model === model && row.year === year && (row.vin || "") === vin);
    const vehicleRecord = WA.Storage.upsert("wa_vehicles", {
      id: existingVehicle?.id || WA.Storage.createId("VEH"),
      customerId: customerRecord.id,
      make,
      makeOther: WA.Storage.sanitizeText(vehicle.makeOther, 60),
      model,
      modelOther: WA.Storage.sanitizeText(vehicle.modelOther, 60),
      year,
      mileage: WA.Storage.sanitizeText(vehicle.mileage, 60),
      fuelType: WA.Storage.sanitizeText(vehicle.fuelType, 30),
      vin
    });
    return { customer: customerRecord, vehicle: vehicleRecord };
  });

  const createRequest = (payload) => WA.Storage.transaction(() => {
    if (!WA.Config.serviceTypes[payload.serviceType]) throw new Error("نوع الخدمة غير صالح");
    const saved = saveCustomerAndVehicle(payload);
    const current = payload.requestId ? WA.Storage.findById("wa_requests", payload.requestId) : null;
    const request = WA.Storage.upsert("wa_requests", {
      id: current?.id || WA.Storage.createId("REQ"),
      humanId: current?.humanId || `WA-${String(Date.now()).slice(-6)}`,
      publicToken: current?.publicToken || WA.Storage.randomToken("req"),
      customerId: saved.customer.id,
      vehicleId: saved.vehicle.id,
      serviceType: payload.serviceType,
      region: WA.Storage.sanitizeText(payload.region, 80),
      city: WA.Storage.sanitizeText(payload.city, 80),
      preciseLocation: WA.Storage.sanitizeText(payload.preciseLocation, 400),
      locationCoordinates: payload.locationCoordinates || null,
      placeDescription: WA.Storage.sanitizeText(payload.placeDescription, 500),
      problem: WA.Storage.sanitizeText(payload.problem, 1200),
      partName: WA.Storage.sanitizeText(payload.partName, 200),
      partType: WA.Storage.sanitizeText(payload.partType, 30),
      towDestination: WA.Storage.sanitizeText(payload.towDestination, 300),
      vehicleMoves: WA.Storage.sanitizeText(payload.vehicleMoves, 80),
      maintenanceService: WA.Storage.sanitizeText(payload.maintenanceService, 120),
      notes: WA.Storage.sanitizeText(payload.notes, 600),
      ai: payload.ai || null,
      vehicleSnapshot: saved.vehicle,
      status: current?.status || "matching",
      activeReferralId: current?.activeReferralId || "",
      lastActivityAt: WA.Storage.now(),
      administrativeClosedAt: current?.administrativeClosedAt || ""
    });
    return { request, ...saved };
  });

  const createReferral = (requestId, partnerId, matchReason = "") => WA.Storage.transaction(() => {
    const request = WA.Storage.findById("wa_requests", requestId);
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (!request || !partner) throw new Error("تعذر إنشاء الإحالة بسبب بيانات ناقصة");
    const previous = WA.Storage.get("wa_referrals").filter((row) => row.requestId === requestId).sort((a, b) => a.order - b.order);
    if (previous.length >= WA.Config.maxReferralsPerRequest) throw new Error("وصل الطلب إلى الحد الأقصى: ثلاثة شركاء");
    if (previous.some((row) => row.partnerId === partnerId)) throw new Error("لا يمكن ترشيح الشريك نفسه مرتين للطلب");
    const referral = WA.Storage.upsert("wa_referrals", {
      id: WA.Storage.createId("REF"),
      requestId,
      partnerId,
      serviceType: request.serviceType,
      order: previous.length + 1,
      status: "registered",
      matchReason: WA.Storage.sanitizeText(matchReason, 800),
      registeredAt: WA.Storage.now(),
      shownAt: "",
      whatsappOpenedAt: "",
      customerArrivalConfirmedAt: "",
      partnerArrivalConfirmedAt: "",
      serviceReceivedAt: "",
      serviceConfirmationSource: "",
      costBand: "",
      costBandLabel: "",
      costSource: "",
      costPreviousBand: "",
      costChangeReason: "",
      costDisputeStatus: "",
      feeId: "",
      objectionStatus: ""
    });
    touchRequest(request, { activeReferralId: referral.id, status: "referred" });
    return referral;
  });

  const markReferralShown = (referralId) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const updated = WA.Storage.upsert("wa_referrals", { ...referral, status: "shown", shownAt: referral.shownAt || WA.Storage.now() });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) touchRequest(request, { status: "awaiting_result" });
    return updated;
  };

  const markWhatsappOpened = (referralId) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) return null;
    return WA.Storage.upsert("wa_referrals", { ...referral, status: "whatsapp_opened", whatsappOpenedAt: WA.Storage.now() });
  };

  const confirmArrival = (referralId, source = "customer") => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    return WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: "arrived",
      customerArrivalConfirmedAt: source === "customer" ? (referral.customerArrivalConfirmedAt || WA.Storage.now()) : referral.customerArrivalConfirmedAt,
      partnerArrivalConfirmedAt: source === "partner" ? (referral.partnerArrivalConfirmedAt || WA.Storage.now()) : referral.partnerArrivalConfirmedAt
    });
  };

  const registerCostBand = (referralId, costBand, source = "customer", reason = "") => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    if (!WA.Config.costBands[costBand]) throw new Error("فئة التكلفة غير صالحة");

    if (referral.costBand && referral.costBand !== costBand && referral.costSource && referral.costSource !== source) {
      WA.Storage.upsert("wa_referrals", {
        ...referral,
        status: "cost_disputed",
        costPreviousBand: referral.costBand,
        requestedCostBand: costBand,
        costChangeReason: WA.Storage.sanitizeText(reason, 500),
        costDisputeStatus: "under_review"
      });
      const fee = referral.feeId ? WA.Storage.findById("wa_fees", referral.feeId) : null;
      if (fee && fee.status !== "paid") WA.Storage.upsert("wa_fees", { ...fee, status: "disputed", heldAt: WA.Storage.now() });
      return { disputed: true, referral: WA.Storage.findById("wa_referrals", referralId) };
    }

    const updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      costBand,
      costBandLabel: bandLabel(costBand),
      costSource: source,
      costConfirmedAt: WA.Storage.now(),
      costChangeReason: WA.Storage.sanitizeText(reason, 500),
      status: referral.serviceReceivedAt ? "service_received" : "cost_pending"
    });
    const fee = updated.serviceReceivedAt ? ensureFee(updated.id) : null;
    return { disputed: false, referral: updated, fee };
  });

  const confirmServiceReceived = (referralId, source = "customer", costBand = "") => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    let updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: costBand || referral.costBand ? "service_received" : "cost_pending",
      serviceReceivedAt: referral.serviceReceivedAt || WA.Storage.now(),
      serviceConfirmationSource: source,
      serviceCustomerConfirmedAt: source === "customer" ? WA.Storage.now() : referral.serviceCustomerConfirmedAt,
      servicePartnerConfirmedAt: source === "partner" ? WA.Storage.now() : referral.servicePartnerConfirmedAt
    });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) touchRequest(request, { status: costBand || referral.costBand ? "service_received" : "cost_pending" });
    if (costBand) {
      registerCostBand(referralId, costBand, source);
      updated = WA.Storage.findById("wa_referrals", referralId);
    } else if (updated.costBand) ensureFee(updated.id);
    return updated;
  });

  const ensureFee = (referralId) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral?.serviceReceivedAt || !referral.costBand || referral.costDisputeStatus === "under_review") return null;
    const existing = WA.Storage.get("wa_fees").find((row) => row.referralId === referralId);
    if (existing) return existing;
    const amount = feeForBand(referral.costBand);
    if (amount === null) return null;
    const fee = WA.Storage.upsert("wa_fees", {
      id: WA.Storage.createId("FEE"),
      referralId,
      requestId: referral.requestId,
      partnerId: referral.partnerId,
      type: "brokerage_by_confirmed_cost_band",
      costBand: referral.costBand,
      costBandLabel: bandLabel(referral.costBand),
      amount,
      event: "تأكيد تلقي الخدمة وتحديد فئة التكلفة",
      status: amount === 0 ? "exempt" : "unbilled",
      eligibleAt: WA.Storage.now(),
      invoiceIds: [],
      paidAt: ""
    });
    WA.Storage.upsert("wa_referrals", { ...referral, feeId: fee.id, status: "confirmed" });
    return fee;
  });

  const updateReferralStatus = (referralId, status, source = "partner") => {
    if (!WA.Config.referralStatuses[status]) throw new Error("حالة الإحالة غير صالحة");
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const updated = WA.Storage.upsert("wa_referrals", { ...referral, status, statusSource: source, statusUpdatedAt: WA.Storage.now() });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) touchRequest(request);
    return updated;
  };

  const requestAlternative = (requestId, reason = "") => WA.Storage.transaction(() => {
    const request = WA.Storage.findById("wa_requests", requestId);
    if (!request) throw new Error("الطلب غير موجود");
    const referrals = WA.Storage.get("wa_referrals").filter((row) => row.requestId === requestId).sort((a, b) => a.order - b.order);
    if (referrals.length >= WA.Config.maxReferralsPerRequest) throw new Error("وصل الطلب إلى الحد الأقصى: ثلاثة شركاء");
    const active = referrals.find((row) => row.id === request.activeReferralId) || referrals[referrals.length - 1];
    if (active) WA.Storage.upsert("wa_referrals", { ...active, status: "alternative_requested", alternativeReason: WA.Storage.sanitizeText(reason, 300), alternativeRequestedAt: WA.Storage.now() });
    touchRequest(request, { status: "alternative_requested", activeReferralId: "" });
    return referrals.map((row) => row.partnerId);
  });

  const createRating = (payload) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", payload.referralId);
    const request = WA.Storage.findById("wa_requests", payload.requestId);
    if (!referral || !request || referral.requestId !== request.id || !referral.serviceReceivedAt) throw new Error("لا يمكن التقييم دون إحالة وتجربة مؤكدة");
    const existing = WA.Storage.get("wa_ratings").find((row) => row.referralId === referral.id);
    if (existing) return existing;
    const rating = WA.Storage.upsert("wa_ratings", {
      id: WA.Storage.createId("RAT"),
      requestId: request.id,
      referralId: referral.id,
      partnerId: referral.partnerId,
      overall: Number(payload.overall),
      treatment: Number(payload.treatment),
      commitment: Number(payload.commitment),
      clarity: Number(payload.clarity),
      serviceQuality: Number(payload.serviceQuality),
      fairness: Number(payload.fairness),
      recommend: payload.recommend === "yes" || payload.recommend === true,
      costBand: referral.costBand,
      comment: WA.Storage.sanitizeText(payload.comment, 800),
      status: "published",
      submittedAt: WA.Storage.now()
    });
    touchRequest(request, { status: "rated" });
    return rating;
  });

  const createObjection = (payload) => WA.Storage.transaction(() => {
    const referral = payload.referralId ? WA.Storage.findById("wa_referrals", payload.referralId) : null;
    const invoice = payload.invoiceId ? WA.Storage.findById("wa_invoices", payload.invoiceId) : null;
    if (payload.invoiceId) {
      if (!invoice || invoice.partnerId !== payload.partnerId) throw new Error("بيانات الفاتورة غير متطابقة");
      if (invoice.objectionDeadline && new Date(invoice.objectionDeadline).getTime() < Date.now()) throw new Error("انتهت مهلة الاعتراض البالغة 15 يومًا");
    } else if (!referral || referral.partnerId !== payload.partnerId) throw new Error("بيانات الاعتراض غير متطابقة");

    const objection = WA.Storage.upsert("wa_objections", {
      id: WA.Storage.createId("OBJ"),
      requestId: referral?.requestId || "",
      referralId: referral?.id || "",
      invoiceId: invoice?.id || "",
      partnerId: payload.partnerId,
      ratingId: payload.ratingId || "",
      type: payload.type,
      reason: WA.Storage.sanitizeText(payload.reason, 250),
      details: WA.Storage.sanitizeText(payload.details, 1000),
      requestedCostBand: payload.requestedCostBand || "",
      status: "new",
      decision: "",
      submittedAt: WA.Storage.now(),
      closedAt: ""
    });

    if (referral) {
      WA.Storage.upsert("wa_referrals", { ...referral, status: "disputed", objectionStatus: "new" });
      const fee = WA.Storage.get("wa_fees").find((row) => row.referralId === referral.id);
      if (fee && fee.status !== "paid") WA.Storage.upsert("wa_fees", { ...fee, status: "disputed", heldAt: WA.Storage.now() });
    }
    if (payload.ratingId) {
      const rating = WA.Storage.findById("wa_ratings", payload.ratingId);
      if (rating) WA.Storage.upsert("wa_ratings", { ...rating, status: "under_review" });
    }
    if (invoice) WA.Storage.upsert("wa_invoices", { ...invoice, status: "under_review", objectionId: objection.id });
    return objection;
  });

  const outstandingFees = (partnerId) => WA.Storage.get("wa_fees").filter((fee) => fee.partnerId === partnerId && !["paid", "exempt"].includes(fee.status));

  const issueInvoice = (partnerId, reason = "monthly", at = new Date()) => WA.Storage.transaction(() => {
    const fees = outstandingFees(partnerId).filter((fee) => fee.status !== "disputed");
    if (!fees.length) return null;
    const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const cycle = `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, "0")}`;
    const issuedAt = at.toISOString();
    const objectionDeadline = new Date(at);
    objectionDeadline.setDate(objectionDeadline.getDate() + WA.Config.objectionWindowDays);
    const dueAt = new Date(at);
    dueAt.setDate(dueAt.getDate() + WA.Config.paymentDueDays);
    const paymentRequired = total >= WA.Config.paymentThreshold;

    const currentCycle = WA.Storage.get("wa_invoices").find((row) => row.partnerId === partnerId
      && row.cycle === cycle && !["paid", "cancelled", "rolled_forward"].includes(row.status));

    WA.Storage.get("wa_invoices")
      .filter((row) => row.partnerId === partnerId && row.cycle !== cycle && row.status === "carried_forward")
      .forEach((row) => WA.Storage.upsert("wa_invoices", { ...row, status: "rolled_forward", rolledForwardAt: issuedAt }));

    const invoice = WA.Storage.upsert("wa_invoices", {
      ...(currentCycle || {}),
      id: currentCycle?.id || WA.Storage.createId("INV"),
      number: currentCycle?.number || `INV-${at.getFullYear()}${String(at.getMonth() + 1).padStart(2, "0")}-${String(Date.now()).slice(-5)}`,
      partnerId,
      cycle,
      issueReason: paymentRequired ? "threshold" : reason,
      feeIds: fees.map((fee) => fee.id),
      amount: total,
      paymentRequired,
      status: paymentRequired ? "payment_required" : "carried_forward",
      issuedAt: currentCycle?.issuedAt || issuedAt,
      updatedAt: issuedAt,
      dueAt: paymentRequired ? (currentCycle?.dueAt || dueAt.toISOString()) : "",
      objectionDeadline: currentCycle?.objectionDeadline || objectionDeadline.toISOString(),
      paidAt: currentCycle?.paidAt || ""
    });

    fees.forEach((fee) => WA.Storage.upsert("wa_fees", {
      ...fee,
      invoiceIds: [...new Set([...(fee.invoiceIds || []), invoice.id])],
      status: paymentRequired ? "invoiced_due" : "statemented"
    }));
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (partner) WA.Storage.upsert("wa_partners", { ...partner, paymentStatus: paymentRequired ? "awaiting_payment" : partner.paymentStatus });
    return invoice;
  });

  const maybeIssueInvoices = (at = new Date()) => {
    WA.Storage.get("wa_partners").forEach((partner) => {
      const total = outstandingFees(partner.id).filter((fee) => fee.status !== "disputed").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
      if (total >= WA.Config.paymentThreshold) issueInvoice(partner.id, "threshold", at);
      else if (at.getDate() === WA.Config.invoiceIssueDay) issueInvoice(partner.id, "monthly", at);
    });
  };

  const registerPayment = (invoiceId, method = "demo_bank_transfer") => WA.Storage.transaction(() => {
    const invoice = WA.Storage.findById("wa_invoices", invoiceId) || WA.Storage.findById("wa_claims", invoiceId);
    if (!invoice) throw new Error("الفاتورة غير موجودة");
    if (["under_review", "rolled_forward", "cancelled"].includes(invoice.status)) throw new Error("لا يمكن سداد هذه الفاتورة في حالتها الحالية");
    if (Number(invoice.amount || 0) <= 0) throw new Error("لا يوجد مبلغ مستحق في الفاتورة");
    const existing = WA.Storage.get("wa_payments").find((row) => row.invoiceId === invoice.id || row.claimId === invoice.id);
    if (existing) return existing;
    const payment = WA.Storage.upsert("wa_payments", {
      id: WA.Storage.createId("PAY"),
      invoiceId: invoice.id,
      partnerId: invoice.partnerId,
      amount: invoice.amount,
      method,
      status: "paid",
      receiptNumber: `RC-${Date.now().toString().slice(-8)}`,
      paidAt: WA.Storage.now(),
      isDemo: true
    });
    WA.Storage.upsert("wa_invoices", { ...invoice, status: "paid", paidAt: payment.paidAt });
    (invoice.feeIds || []).forEach((feeId) => {
      const fee = WA.Storage.findById("wa_fees", feeId);
      if (fee) WA.Storage.upsert("wa_fees", { ...fee, status: "paid", paidAt: payment.paidAt });
    });
    const partner = WA.Storage.findById("wa_partners", invoice.partnerId);
    if (partner) WA.Storage.upsert("wa_partners", { ...partner, paymentStatus: "current", partnershipStatus: partner.partnershipStatus === "suspended_financial" ? "active" : partner.partnershipStatus });
    return payment;
  });

  const sweepOverdueInvoices = (at = new Date()) => {
    WA.Storage.get("wa_invoices").forEach((invoice) => {
      if (invoice.status !== "payment_required" || !invoice.dueAt || new Date(invoice.dueAt).getTime() >= at.getTime()) return;
      WA.Storage.upsert("wa_invoices", { ...invoice, status: "overdue" });
      const partner = WA.Storage.findById("wa_partners", invoice.partnerId);
      if (partner) WA.Storage.upsert("wa_partners", {
        ...partner,
        paymentStatus: "overdue",
        partnershipStatus: "suspended_financial",
        notifications: [...(partner.notifications || []), { id: WA.Storage.createId("NOT"), text: "تم تعليق الإحالات الجديدة مؤقتًا بسبب تأخر فاتورة واجبة السداد.", createdAt: WA.Storage.now(), read: false }]
      });
    });
  };

  const sweepAdministrativeClosures = (at = new Date()) => {
    const cutoff = at.getTime() - WA.Config.administrativeCloseDays * 86400000;
    WA.Storage.get("wa_requests").forEach((request) => {
      if (["rated", "administratively_closed", "finally_closed"].includes(request.status)) return;
      const last = new Date(request.lastActivityAt || request.updatedAt || request.createdAt).getTime();
      if (Number.isFinite(last) && last < cutoff) touchRequest(request, { status: "administratively_closed", administrativeClosedAt: at.toISOString() });
    });
  };

  const saveDraft = (draft) => {
    const sessions = WA.Storage.get("wa_sessions").filter((row) => row.type !== "customer_draft");
    sessions.push({ id: "CUSTOMER-DRAFT", type: "customer_draft", draft: WA.Storage.deepClone(draft), updatedAt: WA.Storage.now(), expiresAt: new Date(Date.now() + 7 * 86400000).toISOString() });
    WA.Storage.set("wa_sessions", sessions);
  };
  const loadDraft = () => {
    const session = WA.Storage.get("wa_sessions").find((row) => row.type === "customer_draft");
    return !session || new Date(session.expiresAt).getTime() < Date.now() ? null : WA.Storage.deepClone(session.draft);
  };
  const clearDraft = () => WA.Storage.remove("wa_sessions", (row) => row.type === "customer_draft");
  const referralEventState = (referral) => ({
    arrivalConfirmed: Boolean(referral?.customerArrivalConfirmedAt || referral?.partnerArrivalConfirmedAt),
    serviceReceived: Boolean(referral?.serviceReceivedAt),
    costConfirmed: Boolean(referral?.costBand),
    feeCreated: Boolean(referral?.feeId)
  });
  const runSweep = () => { maybeIssueInvoices(); sweepOverdueInvoices(); sweepAdministrativeClosures(); };

  WA.Lifecycle = {
    findCustomer, findRequestByToken, findRequestByHumanId, saveCustomerAndVehicle, createRequest,
    createReferral, markReferralShown, markWhatsappOpened, confirmArrival, confirmServiceReceived,
    registerCostBand, ensureFee, updateReferralStatus, requestAlternative, createRating, createObjection,
    issueInvoice, maybeIssueInvoices, registerPayment, sweepOverdueInvoices, sweepAdministrativeClosures,
    saveDraft, loadDraft, clearDraft, referralEventState, feeForBand, bandLabel, outstandingFees,
    // توافق خلفي مع أسماء النسخة السابقة
    confirmIntake: (referralId, source) => confirmServiceReceived(referralId, source),
    issueClaim: (partnerId, reason) => issueInvoice(partnerId, reason === "threshold" ? "threshold" : "monthly"),
    maybeIssueClaims: () => maybeIssueInvoices()
  };
})();
