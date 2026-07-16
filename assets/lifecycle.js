(() => {
  "use strict";
  window.WA = window.WA || {};

  const findCustomer = (phone) => WA.Storage.get("wa_customers").find((row) => row.phone === phone) || null;
  const findRequestByToken = (token) => WA.Storage.get("wa_requests").find((row) => row.publicToken === token) || null;
  const findRequestByHumanId = (humanId) => WA.Storage.get("wa_requests").find((row) => row.humanId === humanId) || null;

  const humanRequestId = () => {
    const used = new Set(WA.Storage.get("wa_requests").map((row) => row.humanId));
    let id;
    do id = `WA-${Math.floor(10000 + Math.random() * 90000)}`;
    while (used.has(id));
    return id;
  };

  const saveCustomerAndVehicle = (payload) => WA.Storage.transaction(() => {
    const phone = WA.Storage.sanitizePhone(payload.customer.phone);
    if (!/^05\d{8}$/.test(phone)) throw new Error("رقم الجوال غير صالح");
    let customer = findCustomer(phone);
    if (customer) {
      customer = WA.Storage.upsert("wa_customers", {
        ...customer,
        firstName: WA.Storage.sanitizeText(payload.customer.firstName, 40)
      });
    } else {
      customer = WA.Storage.upsert("wa_customers", {
        id: WA.Storage.createId("CUS"),
        firstName: WA.Storage.sanitizeText(payload.customer.firstName, 40),
        phone,
        isDemo: false
      });
    }

    const vehicles = WA.Storage.get("wa_vehicles");
    const sameVehicle = vehicles.find((row) => row.customerId === customer.id
      && row.make === payload.vehicle.make
      && row.model === payload.vehicle.model
      && row.year === payload.vehicle.year);
    const vehicle = WA.Storage.upsert("wa_vehicles", {
      id: sameVehicle?.id || WA.Storage.createId("VEH"),
      customerId: customer.id,
      make: payload.vehicle.make,
      makeOther: payload.vehicle.makeOther || "",
      model: payload.vehicle.model,
      modelOther: payload.vehicle.modelOther || "",
      year: payload.vehicle.year,
      mileage: payload.vehicle.mileage || "",
      isDemo: false
    });

    const consentId = `${customer.id}-CONSENT`;
    WA.Storage.upsert("wa_consents", {
      id: consentId,
      customerId: customer.id,
      operationalMessages: true,
      privacyAccepted: Boolean(payload.consents?.privacyAccepted),
      termsAccepted: Boolean(payload.consents?.termsAccepted),
      marketingMessages: Boolean(payload.consents?.marketingMessages),
      consentedAt: WA.Storage.now()
    });
    return { customer, vehicle };
  });

  const createRequest = (payload) => WA.Storage.transaction(() => {
    const { customer, vehicle } = saveCustomerAndVehicle(payload);
    const existing = payload.requestId ? WA.Storage.findById("wa_requests", payload.requestId) : null;
    const request = WA.Storage.upsert("wa_requests", {
      id: existing?.id || WA.Storage.createId("REQ"),
      humanId: existing?.humanId || humanRequestId(),
      publicToken: existing?.publicToken || WA.Storage.randomToken("req"),
      customerId: customer.id,
      vehicleId: vehicle.id,
      serviceType: payload.serviceType,
      city: payload.city,
      preciseLocation: payload.preciseLocation || "",
      towDestination: payload.towDestination || "",
      vehicleMoves: payload.vehicleMoves || "",
      problem: payload.problem || "",
      maintenanceService: payload.maintenanceService || "",
      notes: payload.notes || "",
      ai: payload.ai || null,
      status: "matching",
      draftStep: "matching",
      activeReferralId: existing?.activeReferralId || "",
      referralCount: existing?.referralCount || 0,
      lastActivityAt: WA.Storage.now(),
      administrativeClosedAt: existing?.administrativeClosedAt || "",
      closedAt: existing?.closedAt || "",
      isDemo: false
    });
    return { customer, vehicle, request };
  });

  const createReferral = (requestId, partnerId, matchReason) => WA.Storage.transaction(() => {
    const request = WA.Storage.findById("wa_requests", requestId);
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (!request || !partner) throw new Error("تعذر إنشاء الإحالة بسبب مرجع غير مكتمل");
    const current = WA.Storage.get("wa_referrals").filter((row) => row.requestId === requestId);
    if (current.length >= WA.Config.maxReferralsPerRequest) throw new Error("تم الوصول إلى الحد الأقصى للإحالات");
    if (current.some((row) => row.partnerId === partnerId)) throw new Error("سبق ترشيح هذا الشريك للطلب");

    const referral = WA.Storage.upsert("wa_referrals", {
      id: WA.Storage.createId("REF"),
      requestId,
      partnerId,
      order: current.length + 1,
      status: "registered",
      matchReason,
      registeredAt: WA.Storage.now(),
      shownAt: "",
      whatsappOpenedAt: "",
      customerArrivalConfirmedAt: "",
      partnerArrivalConfirmedAt: "",
      customerIntakeConfirmedAt: "",
      partnerIntakeConfirmedAt: "",
      feeEligibleAt: "",
      outcome: "",
      alternativeReason: "",
      objectionStatus: "none",
      isDemo: false
    });
    WA.Storage.upsert("wa_requests", {
      ...request,
      activeReferralId: referral.id,
      referralCount: current.length + 1,
      status: "referred",
      draftStep: "result",
      lastActivityAt: WA.Storage.now()
    });
    return referral;
  });

  const markReferralShown = (referralId) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) return null;
    const updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: referral.status === "registered" ? "shown" : referral.status,
      shownAt: referral.shownAt || WA.Storage.now()
    });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) WA.Storage.upsert("wa_requests", { ...request, status: "awaiting_arrival", lastActivityAt: WA.Storage.now() });
    return updated;
  };

  const markWhatsappOpened = (referralId) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) return null;
    return WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: "whatsapp_opened",
      whatsappOpenedAt: referral.whatsappOpenedAt || WA.Storage.now()
    });
  };

  const referralEventState = (referral) => ({
    arrivalConfirmed: Boolean(referral.customerArrivalConfirmedAt || referral.partnerArrivalConfirmedAt),
    intakeConfirmed: Boolean(referral.customerIntakeConfirmedAt || referral.partnerIntakeConfirmedAt)
  });

  const ensureFee = (referralId) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const partner = WA.Storage.findById("wa_partners", referral.partnerId);
    if (!partner) throw new Error("الشريك غير موجود");
    const state = referralEventState(referral);
    if (!state.arrivalConfirmed || !state.intakeConfirmed) return null;
    const existing = WA.Storage.get("wa_fees").find((fee) => fee.referralId === referralId);
    if (existing) return existing;
    const fee = WA.Storage.upsert("wa_fees", {
      id: WA.Storage.createId("FEE"),
      referralId,
      partnerId: partner.id,
      type: "fixed_referral_fee",
      amount: Number(partner.feeAmount || 0),
      event: "arrival_and_intake_started",
      status: "unclaimed",
      eligibleAt: WA.Storage.now(),
      dueAt: "",
      claimId: "",
      isDemo: false
    });
    WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: "intake_started",
      feeEligibleAt: fee.eligibleAt
    });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) WA.Storage.upsert("wa_requests", { ...request, status: "intake_started", lastActivityAt: WA.Storage.now() });
    return fee;
  });

  const confirmArrival = (referralId, actor) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const field = actor === "partner" ? "partnerArrivalConfirmedAt" : "customerArrivalConfirmedAt";
    const updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      [field]: referral[field] || WA.Storage.now(),
      status: "arrived"
    });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) WA.Storage.upsert("wa_requests", { ...request, status: "arrived", lastActivityAt: WA.Storage.now() });
    ensureFee(referralId);
    return updated;
  };

  const confirmIntake = (referralId, actor) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const field = actor === "partner" ? "partnerIntakeConfirmedAt" : "customerIntakeConfirmedAt";
    const updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      [field]: referral[field] || WA.Storage.now(),
      status: "intake_started"
    });
    ensureFee(referralId);
    return updated;
  };

  const updateReferralStatus = (referralId, status, actor = "partner") => {
    if (status === "arrived") return confirmArrival(referralId, actor);
    if (status === "intake_started") return confirmIntake(referralId, actor);
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    return WA.Storage.upsert("wa_referrals", { ...referral, status, outcome: status });
  };

  const requestAlternative = (requestId, reason) => WA.Storage.transaction(() => {
    const request = WA.Storage.findById("wa_requests", requestId);
    if (!request) throw new Error("الطلب غير موجود");
    const referrals = WA.Storage.get("wa_referrals").filter((row) => row.requestId === requestId);
    if (referrals.length >= WA.Config.maxReferralsPerRequest) throw new Error("وصلت إلى الحد الأقصى وهو ثلاثة شركاء للطلب");
    const current = referrals.find((row) => row.id === request.activeReferralId) || referrals[referrals.length - 1];
    if (current) WA.Storage.upsert("wa_referrals", {
      ...current,
      status: "alternative_requested",
      alternativeReason: WA.Storage.sanitizeText(reason, 250),
      outcome: "not_agreed"
    });
    WA.Storage.upsert("wa_requests", {
      ...request,
      status: "alternative_requested",
      lastActivityAt: WA.Storage.now()
    });
    return referrals.map((row) => row.partnerId);
  });

  const createRating = (payload) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", payload.referralId);
    if (!referral || referral.requestId !== payload.requestId) throw new Error("التقييم غير مرتبط بإحالة صحيحة");
    const state = referralEventState(referral);
    if (!state.arrivalConfirmed) throw new Error("لا يمكن إرسال تقييم موثق قبل تأكيد حدوث تجربة فعلية");
    const existing = WA.Storage.get("wa_ratings").find((row) => row.referralId === referral.id);
    if (existing) throw new Error("تم تقييم هذه الإحالة سابقًا");
    const clamp = (value) => Math.max(1, Math.min(5, Number(value || 0)));
    const rating = WA.Storage.upsert("wa_ratings", {
      id: WA.Storage.createId("RAT"),
      requestId: referral.requestId,
      referralId: referral.id,
      partnerId: referral.partnerId,
      overall: clamp(payload.overall),
      serviceQuality: clamp(payload.serviceQuality),
      commitment: clamp(payload.commitment),
      clarity: clamp(payload.clarity),
      treatment: clamp(payload.treatment),
      fairness: clamp(payload.fairness),
      recommend: payload.recommend === "yes",
      comment: WA.Storage.sanitizeText(payload.comment, 600),
      status: "published",
      isVerified: true,
      ratedAt: WA.Storage.now()
    });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) WA.Storage.upsert("wa_requests", { ...request, status: "rated", lastActivityAt: WA.Storage.now() });
    recalculatePartnerRatings(referral.partnerId);
    return rating;
  });

  const recalculatePartnerRatings = (partnerId) => {
    const ratings = WA.Storage.get("wa_ratings").filter((row) => row.partnerId === partnerId && row.status === "published" && row.isVerified);
    if (!ratings.length) return null;
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (!partner) return null;
    const baseRatingCount = Number(partner.baseRatingCount ?? partner.ratingCount ?? 0);
    const baseRatingOverall = Number(partner.baseRatingOverall ?? partner.ratingOverall ?? 0);
    const baseFairnessCount = Number(partner.baseFairnessCount ?? partner.fairnessCount ?? 0);
    const baseFairnessRating = Number(partner.baseFairnessRating ?? partner.fairnessRating ?? 0);
    const runtimeOverallTotal = ratings.reduce((sum, row) => sum + Number(row.overall || 0), 0);
    const runtimeFairnessTotal = ratings.reduce((sum, row) => sum + Number(row.fairness || 0), 0);
    const ratingCount = baseRatingCount + ratings.length;
    const fairnessCount = baseFairnessCount + ratings.length;
    return WA.Storage.upsert("wa_partners", {
      ...partner,
      baseRatingCount,
      baseRatingOverall,
      baseFairnessCount,
      baseFairnessRating,
      ratingOverall: Number((((baseRatingOverall * baseRatingCount) + runtimeOverallTotal) / Math.max(1, ratingCount)).toFixed(1)),
      ratingCount,
      fairnessRating: Number((((baseFairnessRating * baseFairnessCount) + runtimeFairnessTotal) / Math.max(1, fairnessCount)).toFixed(1)),
      fairnessCount
    });
  };

  const createObjection = (payload) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", payload.referralId);
    if (!referral || referral.partnerId !== payload.partnerId) throw new Error("بيانات الاعتراض غير متطابقة");
    const objection = WA.Storage.upsert("wa_objections", {
      id: WA.Storage.createId("OBJ"),
      requestId: referral.requestId,
      referralId: referral.id,
      partnerId: payload.partnerId,
      ratingId: payload.ratingId || "",
      type: payload.type,
      reason: payload.reason,
      details: WA.Storage.sanitizeText(payload.details, 800),
      status: "new",
      decision: "",
      feeEffect: payload.type === "referral" ? "held_pending_review" : "none",
      ratingEffect: payload.type === "rating" ? "under_review" : "none",
      submittedAt: WA.Storage.now(),
      closedAt: "",
      isDemo: false
    });
    WA.Storage.upsert("wa_referrals", { ...referral, status: "disputed", objectionStatus: "new" });
    if (payload.type === "referral") {
      const fee = WA.Storage.get("wa_fees").find((row) => row.referralId === referral.id);
      if (fee && fee.status !== "paid") WA.Storage.upsert("wa_fees", { ...fee, status: "disputed", heldAt: WA.Storage.now() });
    }
    if (payload.type === "rating" && payload.ratingId) {
      const rating = WA.Storage.findById("wa_ratings", payload.ratingId);
      if (rating) WA.Storage.upsert("wa_ratings", { ...rating, status: "under_review" });
    }
    return objection;
  });

  const issueClaim = (partnerId, reason = "threshold") => WA.Storage.transaction(() => {
    const unclaimed = WA.Storage.get("wa_fees").filter((fee) => fee.partnerId === partnerId && fee.status === "unclaimed");
    if (!unclaimed.length) return null;
    const total = unclaimed.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    if (reason === "threshold" && total < WA.Config.claimThreshold) return null;
    const issuedAt = WA.Storage.now();
    const due = new Date();
    due.setDate(due.getDate() + WA.Config.claimDueDays);
    const claim = WA.Storage.upsert("wa_claims", {
      id: WA.Storage.createId("CLM"),
      partnerId,
      feeIds: unclaimed.map((fee) => fee.id),
      amount: total,
      reason,
      periodStart: unclaimed.map((fee) => fee.eligibleAt || fee.createdAt).sort()[0] || issuedAt,
      periodEnd: issuedAt,
      status: "issued",
      issuedAt,
      dueAt: due.toISOString(),
      paidAt: "",
      isDemo: false
    });
    unclaimed.forEach((fee) => WA.Storage.upsert("wa_fees", { ...fee, status: "claimed", claimId: claim.id, dueAt: claim.dueAt }));
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (partner) WA.Storage.upsert("wa_partners", { ...partner, paymentStatus: "awaiting_payment" });
    return claim;
  });

  const maybeIssueClaims = () => {
    const partners = WA.Storage.get("wa_partners");
    const nowDate = new Date();
    partners.forEach((partner) => {
      const unclaimed = WA.Storage.get("wa_fees").filter((fee) => fee.partnerId === partner.id && fee.status === "unclaimed");
      const total = unclaimed.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
      if (total >= WA.Config.claimThreshold) {
        issueClaim(partner.id, "threshold");
        return;
      }
      const previousMonthFees = unclaimed.filter((fee) => {
        const date = new Date(fee.eligibleAt || fee.createdAt);
        return date.getFullYear() < nowDate.getFullYear() || (date.getFullYear() === nowDate.getFullYear() && date.getMonth() < nowDate.getMonth());
      });
      if (previousMonthFees.length) issueClaim(partner.id, "monthly_settlement");
    });
  };

  const registerPayment = (claimId, method = "demo_bank_transfer") => WA.Storage.transaction(() => {
    const claim = WA.Storage.findById("wa_claims", claimId);
    if (!claim) throw new Error("المطالبة غير موجودة");
    const existing = WA.Storage.get("wa_payments").find((row) => row.claimId === claimId);
    if (existing) return existing;
    const payment = WA.Storage.upsert("wa_payments", {
      id: WA.Storage.createId("PAY"),
      claimId,
      partnerId: claim.partnerId,
      amount: claim.amount,
      method,
      status: "paid",
      receiptNumber: `RC-${Date.now().toString().slice(-8)}`,
      paidAt: WA.Storage.now(),
      isDemo: true
    });
    WA.Storage.upsert("wa_claims", { ...claim, status: "paid", paidAt: payment.paidAt });
    claim.feeIds.forEach((feeId) => {
      const fee = WA.Storage.findById("wa_fees", feeId);
      if (fee) WA.Storage.upsert("wa_fees", { ...fee, status: "paid", paidAt: payment.paidAt });
    });
    const partner = WA.Storage.findById("wa_partners", claim.partnerId);
    if (partner) {
      const hasOutstanding = WA.Storage.get("wa_claims").some((row) => row.partnerId === partner.id && ["issued", "overdue"].includes(row.status) && row.id !== claim.id);
      WA.Storage.upsert("wa_partners", {
        ...partner,
        paymentStatus: hasOutstanding ? "awaiting_payment" : "current",
        partnershipStatus: partner.partnershipStatus === "suspended_financial" && !hasOutstanding ? "active" : partner.partnershipStatus
      });
    }
    return payment;
  });

  const sweepOverdueClaims = () => {
    const nowTime = Date.now();
    WA.Storage.get("wa_claims").forEach((claim) => {
      if (claim.status !== "issued" || !claim.dueAt || new Date(claim.dueAt).getTime() >= nowTime) return;
      WA.Storage.upsert("wa_claims", { ...claim, status: "overdue" });
      const partner = WA.Storage.findById("wa_partners", claim.partnerId);
      if (partner) WA.Storage.upsert("wa_partners", {
        ...partner,
        paymentStatus: "overdue",
        partnershipStatus: "suspended_financial",
        notifications: [...(partner.notifications || []), {
          id: WA.Storage.createId("NOT"),
          text: "تم تعليق الإحالات الجديدة مؤقتًا بسبب تأخر مطالبة مالية.",
          createdAt: WA.Storage.now(),
          read: false
        }]
      });
    });
  };

  const sweepAdministrativeClosures = () => {
    const cutoff = Date.now() - (WA.Config.administrativeCloseDays * 24 * 60 * 60 * 1000);
    WA.Storage.get("wa_requests").forEach((request) => {
      if (["rated", "administratively_closed", "finally_closed"].includes(request.status)) return;
      const last = new Date(request.lastActivityAt || request.updatedAt || request.createdAt).getTime();
      const hasRating = WA.Storage.get("wa_ratings").some((row) => row.requestId === request.id);
      if (!hasRating && Number.isFinite(last) && last < cutoff) {
        WA.Storage.upsert("wa_requests", {
          ...request,
          status: "administratively_closed",
          administrativeClosedAt: WA.Storage.now()
        });
      }
    });
  };

  const saveDraft = (draft) => {
    const sessions = WA.Storage.get("wa_sessions").filter((row) => row.type !== "customer_draft");
    sessions.push({
      id: "CUSTOMER-DRAFT",
      type: "customer_draft",
      draft: WA.Storage.deepClone(draft),
      updatedAt: WA.Storage.now(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });
    WA.Storage.set("wa_sessions", sessions);
  };

  const loadDraft = () => {
    const session = WA.Storage.get("wa_sessions").find((row) => row.type === "customer_draft");
    if (!session || new Date(session.expiresAt).getTime() < Date.now()) return null;
    return WA.Storage.deepClone(session.draft);
  };

  const clearDraft = () => WA.Storage.remove("wa_sessions", (row) => row.type === "customer_draft");

  const runSweep = () => {
    maybeIssueClaims();
    sweepOverdueClaims();
    sweepAdministrativeClosures();
  };

  WA.Lifecycle = {
    findCustomer,
    findRequestByToken,
    findRequestByHumanId,
    saveCustomerAndVehicle,
    createRequest,
    createReferral,
    markReferralShown,
    markWhatsappOpened,
    confirmArrival,
    confirmIntake,
    updateReferralStatus,
    requestAlternative,
    createRating,
    createObjection,
    issueClaim,
    maybeIssueClaims,
    registerPayment,
    runSweep,
    saveDraft,
    loadDraft,
    clearDraft,
    referralEventState,
    ensureFee
  };
})();
