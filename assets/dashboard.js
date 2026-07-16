(() => {
  "use strict";
  const $ = WA.UI.qs;
  const $$ = WA.UI.qsa;
  let partner = null;

  const getSession = () => WA.Storage.get("wa_sessions").find((row) => row.type === "partner_session" && new Date(row.expiresAt).getTime() > Date.now()) || null;
  const partnerReferrals = () => WA.Storage.get("wa_referrals").filter((row) => row.partnerId === partner.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const partnerFees = () => WA.Storage.get("wa_fees").filter((row) => row.partnerId === partner.id);
  const partnerClaims = () => WA.Storage.get("wa_claims").filter((row) => row.partnerId === partner.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const partnerPayments = () => WA.Storage.get("wa_payments").filter((row) => row.partnerId === partner.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const partnerRatings = () => WA.Storage.get("wa_ratings").filter((row) => row.partnerId === partner.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const partnerObjections = () => WA.Storage.get("wa_objections").filter((row) => row.partnerId === partner.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const table = (headers, rows, emptyText = "لا توجد بيانات") => rows.length ? `
    <div class="table-wrap"><table><thead><tr>${headers.map((header) => `<th>${WA.UI.escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`
    : `<div class="empty-state"><p>${WA.UI.escapeHtml(emptyText)}</p></div>`;

  const loadPartner = () => {
    const session = getSession();
    if (!session) { location.replace("workshop-login.html"); return false; }
    partner = WA.Storage.findById("wa_partners", session.partnerId);
    if (!partner) { location.replace("workshop-login.html"); return false; }
    return true;
  };

  const renderHeader = () => {
    $("#partnerHeader").innerHTML = `<div class="demo-badge">بيانات Seed تجريبية — ليست منشأة حقيقية</div><div class="kicker">${WA.UI.escapeHtml(WA.Config.partnerTypes[partner.type])}</div><h1>${WA.UI.escapeHtml(partner.name)}</h1><p>${WA.UI.escapeHtml(partner.city)} — ${WA.UI.escapeHtml(partner.hours)}</p><div class="request-meta"><span>الشراكة: ${WA.UI.escapeHtml(partner.partnershipStatus)}</span><span>السداد: ${WA.UI.escapeHtml(partner.paymentStatus)}</span><span>الثقة: ${WA.UI.escapeHtml(partner.trustScore)}/100</span></div>`;
  };

  const renderOverview = () => {
    const referrals = partnerReferrals();
    const fees = partnerFees();
    const claims = partnerClaims();
    const ratings = partnerRatings();
    const outstanding = fees.filter((row) => !["paid", "disputed"].includes(row.status)).reduce((sum, row) => sum + Number(row.amount || 0), 0);
    $("#overviewStats").innerHTML = [
      [referrals.length, "إجمالي الإحالات"],
      [referrals.filter((row) => row.status === "intake_started").length, "بدأ استقبالها أو فحصها"],
      [ratings.length, "تقييمات موثقة"],
      [WA.UI.formatMoney(outstanding), "رصيد غير مسدد"]
    ].map(([value, label]) => `<div class="stat-card"><strong>${WA.UI.escapeHtml(value)}</strong><span>${WA.UI.escapeHtml(label)}</span></div>`).join("");

    const latest = referrals.slice(0, 5).map((referral) => {
      const request = WA.Storage.findById("wa_requests", referral.requestId);
      return `<div class="timeline-item"><div class="timeline-dot">${WA.UI.escapeHtml(referral.order)}</div><div class="timeline-body"><strong>${WA.UI.escapeHtml(request?.humanId || referral.requestId)}</strong><span>${WA.UI.escapeHtml(WA.UI.statusLabel(referral.status, "referral"))}</span><small>${WA.UI.formatDate(referral.updatedAt)}</small></div></div>`;
    }).join("");
    $("#latestReferrals").innerHTML = `<div class="timeline">${latest || '<div class="empty-state"><p>لا توجد إحالات حتى الآن.</p></div>'}</div>`;

    const currentClaims = claims.filter((row) => ["issued", "overdue"].includes(row.status));
    $("#accountStatus").innerHTML = `<div class="guidance-grid"><div class="guidance-item"><span>حالة الشراكة</span><strong>${WA.UI.escapeHtml(partner.partnershipStatus)}</strong></div><div class="guidance-item"><span>حالة السداد</span><strong>${WA.UI.escapeHtml(partner.paymentStatus)}</strong></div><div class="guidance-item"><span>مطالبات مفتوحة</span><strong>${WA.UI.escapeHtml(currentClaims.length)}</strong></div><div class="guidance-item"><span>قيمة الرسم الثابت التجريبي</span><strong>${WA.UI.formatMoney(partner.feeAmount)}</strong></div></div><div class="legal-note">يستحق الرسم فقط عند ثبوت الوصول وبدء الاستقبال أو الفحص، ولا يستحق بمجرد فتح واتساب أو اكتمال الإصلاح.</div>`;
  };

  const referralStatusOptions = (selected) => [
    "registered", "shown", "whatsapp_opened", "no_contact", "contacted_not_arrived", "arrived", "intake_started", "inspected_only", "service_completed", "service_not_completed", "not_agreed", "unresolved", "closed"
  ].map((status) => `<option value="${status}" ${status === selected ? "selected" : ""}>${WA.UI.escapeHtml(WA.UI.statusLabel(status, "referral"))}</option>`).join("");

  const renderReferrals = () => {
    const rows = partnerReferrals().map((referral) => {
      const request = WA.Storage.findById("wa_requests", referral.requestId);
      const vehicle = request ? WA.Storage.findById("wa_vehicles", request.vehicleId) : null;
      return `<tr><td><strong>${WA.UI.escapeHtml(request?.humanId || "—")}</strong><br><small>${WA.UI.escapeHtml(WA.Config.serviceTypes[request?.serviceType] || "—")}</small></td><td>${WA.UI.escapeHtml(vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : "—")}</td><td>${WA.UI.escapeHtml(request?.city || "—")}</td><td><select class="referral-status" data-referral-id="${WA.UI.escapeHtml(referral.id)}">${referralStatusOptions(referral.status)}</select></td><td>${WA.UI.formatDate(referral.updatedAt)}</td><td><div class="table-actions"><button class="btn btn-light btn-sm objection-referral" type="button" data-referral-id="${WA.UI.escapeHtml(referral.id)}">اعتراض</button></div></td></tr>`;
    });
    $("#referralsTable").innerHTML = table(["الطلب", "السيارة", "المدينة", "الحالة", "آخر تحديث", "إجراء"], rows, "لا توجد إحالات لهذا الشريك");
    $$(".referral-status").forEach((select) => select.addEventListener("change", () => {
      try {
        WA.Lifecycle.updateReferralStatus(select.dataset.referralId, select.value, "partner");
        WA.UI.showToast("تم تحديث حالة الإحالة", "success");
        refresh();
      } catch (error) { WA.UI.showToast(error.message, "error"); }
    }));
    $$(".objection-referral").forEach((button) => button.addEventListener("click", () => openObjection("referral", button.dataset.referralId)));
  };

  const renderObjections = () => {
    const rows = partnerObjections().map((objection) => {
      const request = WA.Storage.findById("wa_requests", objection.requestId);
      return `<tr><td>${WA.UI.escapeHtml(objection.id)}</td><td>${WA.UI.escapeHtml(request?.humanId || objection.requestId)}</td><td>${WA.UI.escapeHtml(objection.type === "rating" ? "تقييم" : "إحالة")}</td><td>${WA.UI.escapeHtml(objection.reason)}</td><td>${WA.UI.escapeHtml(objection.status)}</td><td>${WA.UI.escapeHtml(objection.decision || "بانتظار المراجعة")}</td><td>${WA.UI.formatDate(objection.submittedAt || objection.createdAt)}</td></tr>`;
    });
    $("#objectionsTable").innerHTML = table(["رقم الاعتراض", "الطلب", "النوع", "السبب", "الحالة", "القرار", "التاريخ"], rows, "لا توجد اعتراضات مسجلة");
  };

  const renderRatings = () => {
    const ratings = partnerRatings();
    if (!ratings.length) {
      $("#ratingsList").innerHTML = '<div class="empty-state"><p>لا توجد تقييمات موثقة لهذا الشريك بعد.</p></div>';
      return;
    }
    $("#ratingsList").innerHTML = ratings.map((rating) => {
      const request = WA.Storage.findById("wa_requests", rating.requestId);
      return `<article class="card mt-16"><div class="button-row"><span class="status-badge ${rating.status === "published" ? "success" : "warning"}">${WA.UI.escapeHtml(rating.status)}</span>${WA.UI.renderStars(rating.overall)}<strong>${WA.UI.escapeHtml(rating.overall)} / 5</strong></div><h3>${WA.UI.escapeHtml(request?.humanId || rating.requestId)}</h3><div class="guidance-grid"><div class="guidance-item"><span>جودة التعامل</span><strong>${WA.UI.escapeHtml(rating.treatment)}/5</strong></div><div class="guidance-item"><span>الالتزام</span><strong>${WA.UI.escapeHtml(rating.commitment)}/5</strong></div><div class="guidance-item"><span>عدالة الأسعار</span><strong>${WA.UI.escapeHtml(rating.fairness)}/5</strong></div><div class="guidance-item"><span>التوصية</span><strong>${rating.recommend ? "نعم" : "لا"}</strong></div></div>${rating.comment ? `<p>${WA.UI.escapeHtml(rating.comment)}</p>` : ""}<button class="btn btn-light btn-sm objection-rating" type="button" data-referral-id="${WA.UI.escapeHtml(rating.referralId)}" data-rating-id="${WA.UI.escapeHtml(rating.id)}">اعتراض على التقييم</button></article>`;
    }).join("");
    $$(".objection-rating").forEach((button) => button.addEventListener("click", () => openObjection("rating", button.dataset.referralId, button.dataset.ratingId)));
  };

  const renderDiscounts = () => {
    const discounts = WA.Storage.get("wa_discounts").filter((row) => row.partnerId === partner.id);
    $("#discountsList").innerHTML = discounts.length ? discounts.map((discount) => `<div class="discount-box"><strong>${WA.UI.escapeHtml(discount.percent)}% — ${WA.UI.escapeHtml(discount.title)}</strong><span>${WA.UI.escapeHtml(discount.includedServices.join("، "))}</span><small>${WA.UI.escapeHtml(discount.conditions)} — الحالة: ${WA.UI.escapeHtml(discount.status)} — حتى ${WA.UI.escapeHtml(discount.endsAt || "غير محدد")}</small><button class="btn btn-light btn-sm disable-discount" type="button" data-id="${WA.UI.escapeHtml(discount.id)}" ${discount.status !== "approved" ? "disabled" : ""}>إيقاف الخصم</button></div>`).join("") : '<div class="empty-state"><p>لا توجد خصومات معتمدة.</p></div>';
    $$(".disable-discount").forEach((button) => button.addEventListener("click", () => {
      const discount = WA.Storage.findById("wa_discounts", button.dataset.id);
      if (discount) WA.Storage.upsert("wa_discounts", { ...discount, status: "inactive" });
      WA.UI.showToast("تم إيقاف الخصم", "success");
      renderDiscounts();
    }));
  };

  const renderBilling = () => {
    const fees = partnerFees();
    const claims = partnerClaims();
    const payments = partnerPayments();
    const unclaimed = fees.filter((row) => row.status === "unclaimed").reduce((sum, row) => sum + Number(row.amount || 0), 0);
    const openClaims = claims.filter((row) => ["issued", "overdue"].includes(row.status)).reduce((sum, row) => sum + Number(row.amount || 0), 0);
    const paid = payments.reduce((sum, row) => sum + Number(row.amount || 0), 0);
    $("#billingStats").innerHTML = [
      [WA.UI.formatMoney(unclaimed), "رسوم لم تطالب بعد"],
      [WA.UI.formatMoney(openClaims), "مطالبات مفتوحة"],
      [WA.UI.formatMoney(paid), "إجمالي مدفوع"],
      [WA.UI.formatMoney(WA.Config.claimThreshold), "حد المطالبة"]
    ].map(([value, label]) => `<div class="stat-card"><strong>${WA.UI.escapeHtml(value)}</strong><span>${WA.UI.escapeHtml(label)}</span></div>`).join("");

    const claimRows = claims.map((claim) => `<tr><td>${WA.UI.escapeHtml(claim.id)}</td><td>${WA.UI.formatMoney(claim.amount)}</td><td>${WA.UI.escapeHtml(claim.reason === "threshold" ? "بلوغ 100 ريال" : "تسوية شهرية")}</td><td>${WA.UI.escapeHtml(claim.status)}</td><td>${WA.UI.formatDate(claim.dueAt)}</td><td>${["issued", "overdue"].includes(claim.status) ? `<a class="btn btn-primary btn-sm" href="payment.html?claim=${encodeURIComponent(claim.id)}">سداد تجريبي</a>` : "—"}</td></tr>`);
    $("#claimsList").innerHTML = table(["المطالبة", "المبلغ", "السبب", "الحالة", "الاستحقاق", "إجراء"], claimRows, "لا توجد مطالبات");

    const paymentRows = payments.map((payment) => `<tr><td>${WA.UI.escapeHtml(payment.receiptNumber)}</td><td>${WA.UI.formatMoney(payment.amount)}</td><td>${WA.UI.escapeHtml(payment.method)}</td><td>${WA.UI.formatDate(payment.paidAt)}</td><td><a class="btn btn-light btn-sm" href="receipt.html?payment=${encodeURIComponent(payment.id)}">الإيصال</a></td></tr>`);
    $("#paymentsList").innerHTML = table(["الإيصال", "المبلغ", "الطريقة", "التاريخ", "عرض"], paymentRows, "لا توجد مدفوعات");

    const feeRows = fees.map((fee) => {
      const referral = WA.Storage.findById("wa_referrals", fee.referralId);
      const request = referral ? WA.Storage.findById("wa_requests", referral.requestId) : null;
      return `<tr><td>${WA.UI.escapeHtml(request?.humanId || "—")}</td><td>${WA.UI.escapeHtml(fee.event)}</td><td>${WA.UI.formatMoney(fee.amount)}</td><td>${WA.UI.escapeHtml(fee.status)}</td><td>${WA.UI.formatDate(fee.eligibleAt || fee.createdAt)}</td></tr>`;
    });
    $("#feesList").innerHTML = table(["الطلب", "الحدث", "الرسم", "الحالة", "التاريخ"], feeRows, "لا توجد رسوم");
  };

  const renderProfile = () => {
    $("#profileData").innerHTML = `<div class="guidance-grid"><div class="guidance-item"><span>النوع</span><strong>${WA.UI.escapeHtml(WA.Config.partnerTypes[partner.type])}</strong></div><div class="guidance-item"><span>المدينة</span><strong>${WA.UI.escapeHtml(partner.city)}</strong></div><div class="guidance-item"><span>التغطية</span><strong>${WA.UI.escapeHtml(partner.coverageCities.join("، "))}</strong></div><div class="guidance-item"><span>التخصصات</span><strong>${WA.UI.escapeHtml(partner.specialties.join("، "))}</strong></div><div class="guidance-item"><span>التقييم</span><strong>${WA.UI.escapeHtml(partner.ratingOverall)} من 5 — ${WA.UI.escapeHtml(partner.ratingCount)} مقيمًا</strong></div><div class="guidance-item"><span>عدالة الأسعار</span><strong>${WA.UI.escapeHtml(partner.fairnessRating)} من 5 — ${WA.UI.escapeHtml(partner.fairnessCount)} مقيمًا</strong></div></div><div class="legal-note">${WA.UI.escapeHtml(partner.demoNotice)}</div>`;
    const notifications = partner.notifications || [];
    $("#notificationsList").innerHTML = notifications.length ? notifications.map((notification) => `<div class="info-panel"><strong>${WA.UI.escapeHtml(notification.text)}</strong><p>${WA.UI.formatDate(notification.createdAt)}</p></div>`).join("") : '<div class="empty-state"><p>لا توجد إشعارات جديدة.</p></div>';
  };

  const openObjection = (type, referralId, ratingId = "") => {
    $("#objectionType").value = type;
    $("#objectionReferralId").value = referralId;
    $("#objectionRatingId").value = ratingId;
    $("#objectionTitle").textContent = type === "rating" ? "اعتراض على التقييم" : "اعتراض على حالة الإحالة";
    const reasons = type === "rating" ? ["التقييم لا يخص المنشأة", "العميل لم يتعامل معنا", "الخدمة لم تقدم لدينا", "التعليق يتضمن معلومات غير صحيحة", "التعليق يتضمن إساءة أو بيانات شخصية", "سبب آخر"] : ["العميل لم يصل", "العميل تواصل فقط", "حضر ولم يبدأ الاستقبال أو الفحص", "الطلب لا يخص المنشأة", "رقم الطلب غير معروف", "الخدمة تمت لدى شريك آخر", "الطلب ألغي", "سبب آخر"];
    WA.UI.initSelect($("#objectionReason"), reasons, "اختر السبب");
    $("#objectionDetails").value = "";
    $("#objectionDialog").showModal();
  };

  const handleObjection = (event) => {
    event.preventDefault();
    const form = $("#objectionForm");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    try {
      WA.Lifecycle.createObjection({
        partnerId: partner.id,
        referralId: $("#objectionReferralId").value,
        ratingId: $("#objectionRatingId").value,
        type: $("#objectionType").value,
        reason: $("#objectionReason").value,
        details: $("#objectionDetails").value
      });
      $("#objectionDialog").close();
      WA.UI.showToast("تم تسجيل الاعتراض وتحويل الحالة للمراجعة", "success");
      refresh();
    } catch (error) { WA.UI.showToast(error.message, "error"); }
  };

  const handleDiscount = (event) => {
    event.preventDefault();
    const form = $("#discountForm");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const start = $("#discountStart").value;
    const end = $("#discountEnd").value;
    if (end < start) { WA.UI.showToast("تاريخ نهاية الخصم يجب أن يكون بعد البداية", "error"); return; }
    WA.Storage.upsert("wa_discounts", {
      id: WA.Storage.createId("DISC"),
      partnerId: partner.id,
      title: "خصم عملاء وين أوديها",
      percent: Number($("#discountPercent").value),
      includedServices: [WA.Storage.sanitizeText($("#discountServices").value, 160)],
      conditions: WA.Storage.sanitizeText($("#discountConditions").value, 500),
      exclusions: "لا يجمع مع عروض أخرى إلا إذا ذكر خلاف ذلك.",
      startsAt: start,
      endsAt: end,
      status: "approved",
      approvedAt: WA.Storage.now(),
      isDemo: true
    });
    form.reset();
    WA.UI.showToast("تم اعتماد الخصم داخل النسخة التجريبية", "success");
    renderDiscounts();
  };

  const refresh = () => {
    partner = WA.Storage.findById("wa_partners", partner.id) || partner;
    renderHeader();
    renderOverview();
    renderReferrals();
    renderObjections();
    renderRatings();
    renderDiscounts();
    renderBilling();
    renderProfile();
  };

  const initTabs = () => {
    $$(".tab-btn").forEach((button) => button.addEventListener("click", () => {
      $$(".tab-btn").forEach((item) => { item.classList.toggle("active", item === button); item.setAttribute("aria-selected", String(item === button)); });
      $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
    }));
  };

  const init = () => {
    if (!loadPartner()) return;
    initTabs();
    $("#objectionForm").addEventListener("submit", handleObjection);
    $("#discountForm").addEventListener("submit", handleDiscount);
    $("#issueClaim").addEventListener("click", () => {
      const before = new Set(partnerClaims().map((claim) => claim.id));
      WA.Lifecycle.maybeIssueClaims();
      const claim = partnerClaims().find((row) => !before.has(row.id)) || null;
      WA.UI.showToast(claim ? "تم إصدار مطالبة وفق حد 100 ريال أو التسوية الشهرية" : "لا توجد رسوم مستحقة للمطالبة وفق السياسة حاليًا", claim ? "success" : "info");
      refresh();
    });
    $("#logoutButton").addEventListener("click", () => {
      WA.Storage.remove("wa_sessions", (row) => row.type === "partner_session");
      location.replace("workshop-login.html");
    });
    refresh();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
