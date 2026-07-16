(() => {
  "use strict";
  const $ = WA.UI.qs;
  let currentRequest = null;

  const setView = (name) => {
    $("#lookupSection").hidden = name !== "lookup";
    $("#requestSection").hidden = name !== "request";
    $("#notFoundSection").hidden = name !== "notFound";
  };

  const serviceAlternativeLabel = (serviceType) => ({
    problem: "أريد ورشة أخرى",
    parts: "أريد محل قطع غيار آخر",
    tow: "أريد سطحة أخرى",
    maintenance: "أريد مركز صيانة آخر"
  })[serviceType] || "أريد شريكًا آخر";

  const serviceSummary = (request) => {
    if (request.serviceType === "problem") return request.problem;
    if (request.serviceType === "parts") return "الدلالة على محل قطع غيار مناسب لنوع السيارة";
    if (request.serviceType === "tow") return `${request.vehicleMoves}${request.towDestination ? ` — الوجهة: ${request.towDestination}` : ""}`;
    return request.maintenanceService || request.notes;
  };

  const renderTimeline = (referrals) => {
    $("#referralTimeline").innerHTML = referrals.map((referral) => {
      const partner = WA.Storage.findById("wa_partners", referral.partnerId);
      return `<div class="timeline-item"><div class="timeline-dot">${WA.UI.escapeHtml(referral.order)}</div><div class="timeline-body"><strong>${WA.UI.escapeHtml(partner?.name || "شريك غير متاح")}</strong><span class="status-badge mt-8">${WA.UI.escapeHtml(WA.UI.statusLabel(referral.status, "referral"))}</span><small>${WA.UI.formatDate(referral.createdAt || referral.registeredAt)}</small>${referral.alternativeReason ? `<p class="small">سبب البديل: ${WA.UI.escapeHtml(referral.alternativeReason)}</p>` : ""}</div></div>`;
    }).join("") || '<div class="empty-state"><p>لا توجد إحالات مسجلة.</p></div>';
  };

  const renderSummary = (bundle) => {
    const { request, vehicle } = bundle;
    const items = [
      ["الخدمة", WA.Config.serviceTypes[request.serviceType]],
      ["السيارة", `${vehicle.makeOther || vehicle.make} ${vehicle.modelOther || vehicle.model} ${vehicle.year}`],
      ["المدينة", request.city],
      ["الاحتياج", serviceSummary(request)]
    ];
    if (request.ai) {
      items.push(["التوقع المبدئي", request.ai.expectedIssue], ["التخصص", request.ai.specialty], ["الاستعجال", request.ai.urgency], ["الخطوة التالية", request.ai.nextStep]);
    }
    $("#requestSummary").innerHTML = items.map(([label, value]) => `<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value || "—")}</strong></div>`).join("");
  };

  const renderActions = (bundle) => {
    const { request, activeReferral, partner, customer, vehicle, referrals } = bundle;
    if (!activeReferral || !partner) {
      $("#requestActions").innerHTML = '<div class="empty-state"><h3>لا يوجد شريك حالي</h3><p>حالة الطلب لا تحتوي على إحالة نشطة.</p></div>';
      return;
    }
    const state = WA.Lifecycle.referralEventState(activeReferral);
    const limitReached = referrals.length >= WA.Config.maxReferralsPerRequest;
    const message = WA.UI.buildWhatsappMessage({ request, customer, vehicle, partner });
    const whatsapp = WA.UI.whatsappUrl(partner.whatsapp, message);
    $("#requestActions").innerHTML = `
      <h2>إجراءات الطلب</h2>
      <p class="muted">استحقاق الرسم لا يحدث عند فتح واتساب؛ بل بعد الوصول وبدء الاستقبال أو الفحص.</p>
      <div class="button-row">
        <a id="trackWhatsapp" class="btn btn-primary" href="${WA.UI.escapeHtml(whatsapp)}" target="_blank" rel="noopener">فتح واتساب</a>
        <button id="copyTrackWhatsapp" class="btn btn-light" type="button">نسخ الرسالة</button>
      </div>
      <div class="cards-grid mt-16">
        <div class="card"><h3>هل وصلت؟</h3><p>${state.arrivalConfirmed ? "تم تسجيل تأكيد الوصول." : "أكد الوصول بنقرة واحدة بعد حدوثه فعليًا."}</p><button id="confirmArrival" class="btn btn-dark btn-sm" type="button" ${state.arrivalConfirmed ? "disabled" : ""}>${state.arrivalConfirmed ? "تم التأكيد" : "نعم، وصلت"}</button></div>
        <div class="card"><h3>هل بدأ الاستقبال أو الفحص؟</h3><p>${state.intakeConfirmed ? "تم تسجيل بدء الاستقبال أو الفحص." : "لا تؤكد إلا بعد أن يبدأ مقدم الخدمة باستقبالك أو فحص السيارة."}</p><button id="confirmIntake" class="btn btn-dark btn-sm" type="button" ${state.intakeConfirmed ? "disabled" : ""}>${state.intakeConfirmed ? "تم التأكيد" : "نعم، بدأ"}</button></div>
        <div class="card"><h3>لم يتم التفاهم؟</h3><p>${limitReached ? "وصل الطلب إلى الحد الأقصى: ثلاثة شركاء." : "اطلب بديلًا دون إعادة البيانات."}</p><button id="requestAlternative" class="btn btn-warning btn-sm" type="button" ${limitReached ? "disabled" : ""}>${WA.UI.escapeHtml(serviceAlternativeLabel(request.serviceType))}</button></div>
      </div>`;

    $("#trackWhatsapp")?.addEventListener("click", () => WA.Lifecycle.markWhatsappOpened(activeReferral.id));
    $("#copyTrackWhatsapp")?.addEventListener("click", () => WA.UI.copyText(message));
    $("#confirmArrival")?.addEventListener("click", () => {
      try { WA.Lifecycle.confirmArrival(activeReferral.id, "customer"); WA.UI.showToast("تم تأكيد الوصول", "success"); renderRequest(request); }
      catch (error) { WA.UI.showToast(error.message, "error"); }
    });
    $("#confirmIntake")?.addEventListener("click", () => {
      try { WA.Lifecycle.confirmIntake(activeReferral.id, "customer"); WA.UI.showToast("تم تأكيد بدء الاستقبال أو الفحص", "success"); renderRequest(request); }
      catch (error) { WA.UI.showToast(error.message, "error"); }
    });
    $("#requestAlternative")?.addEventListener("click", () => $("#alternativeDialog").showModal());
  };

  const renderRating = (bundle) => {
    const { request, activeReferral } = bundle;
    const existing = activeReferral ? WA.Storage.get("wa_ratings").find((row) => row.referralId === activeReferral.id) : null;
    const state = activeReferral ? WA.Lifecycle.referralEventState(activeReferral) : { arrivalConfirmed: false };
    if (existing) {
      $("#ratingPanel").innerHTML = `<div class="success-panel"><strong>تم استلام تقييمك الموثق</strong><p>التقييم العام: ${WA.UI.escapeHtml(existing.overall)} من 5. حالة التقييم: ${WA.UI.escapeHtml(existing.status)}.</p></div>`;
      return;
    }
    if (!activeReferral || !state.arrivalConfirmed) {
      $("#ratingPanel").innerHTML = '<h2>التقييم</h2><p class="muted">يتاح التقييم بعد تأكيد حدوث تجربة فعلية أو الوصول إلى الشريك.</p>';
      return;
    }
    $("#ratingPanel").innerHTML = '<h2>قيّم تجربتك</h2><p class="muted">يرتبط التقييم برقم الطلب والإحالة والشريك، ولا يقبل تقييم عشوائي.</p><button id="openRating" class="btn btn-primary" type="button">فتح نموذج التقييم</button>';
    $("#openRating")?.addEventListener("click", () => $("#ratingDialog").showModal());
  };

  const renderRequest = (request) => {
    currentRequest = WA.Storage.findById("wa_requests", request.id) || request;
    const bundle = WA.UI.getRequestBundle(currentRequest);
    if (!bundle?.customer || !bundle.vehicle) { setView("notFound"); return; }
    const { customer, activeReferral, partner, discount, referrals } = bundle;
    $("#requestHeader").innerHTML = `<div class="kicker">أهلًا ${WA.UI.escapeHtml(customer.firstName)}</div><h1>${WA.UI.escapeHtml(currentRequest.humanId)}</h1><p>${WA.UI.escapeHtml(WA.Config.serviceTypes[currentRequest.serviceType])} — آخر تحديث ${WA.UI.formatDate(currentRequest.updatedAt)}</p><div class="request-meta"><span>${WA.UI.escapeHtml(WA.UI.statusLabel(currentRequest.status))}</span><span>${WA.UI.escapeHtml(referrals.length)} من 3 إحالات</span><span>الرابط لا يحتوي على رقم الجوال</span></div>`;
    const closed = ["administratively_closed", "finally_closed"].includes(currentRequest.status);
    $("#closedNotice").hidden = !closed;
    if (closed) $("#closedNotice").textContent = "هذا الطلب مغلق إداريًا دون حذف سجلاته. يمكنك الاطلاع على البيانات السابقة، لكن بعض الإجراءات الجديدة قد تكون مقيدة.";
    $("#activePartner").innerHTML = partner && activeReferral
      ? WA.UI.renderPartnerCard({ partner, referral: activeReferral, discount, matchReason: activeReferral.matchReason })
      : '<div class="empty-state"><h2>لا يوجد شريك حالي</h2><p>لم يتم العثور على إحالة نشطة لهذا الطلب.</p></div>';
    renderActions(bundle);
    renderRating(bundle);
    renderSummary(bundle);
    renderTimeline(referrals);
    setView("request");
  };

  const loadByToken = (token) => {
    const request = WA.Lifecycle.findRequestByToken(token);
    if (!request) { setView("notFound"); return; }
    renderRequest(request);
  };

  const handleAlternative = (event) => {
    event.preventDefault();
    if (!currentRequest) return;
    const reason = $("#alternativeReason").value;
    try {
      const excluded = WA.Lifecycle.requestAlternative(currentRequest.id, reason);
      const refreshed = WA.Storage.findById("wa_requests", currentRequest.id);
      const result = WA.Matching.match({ request: refreshed, excludedPartnerIds: excluded });
      if (!result.partner) {
        WA.Storage.upsert("wa_requests", { ...refreshed, status: "no_match", lastActivityAt: WA.Storage.now() });
        $("#alternativeDialog").close();
        WA.UI.showToast("لا يوجد شريك بديل مطابق حاليًا", "error");
        renderRequest(refreshed);
        return;
      }
      const referral = WA.Lifecycle.createReferral(refreshed.id, result.partner.id, result.reason);
      WA.Lifecycle.markReferralShown(referral.id);
      $("#alternativeDialog").close();
      WA.UI.showToast("تم تسجيل إحالة بديلة داخل نفس الطلب", "success");
      renderRequest(refreshed);
    } catch (error) {
      WA.UI.showToast(error.message, "error");
    }
  };

  const handleRating = (event) => {
    event.preventDefault();
    if (!currentRequest) return;
    const bundle = WA.UI.getRequestBundle(currentRequest);
    const form = $("#ratingForm");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    try {
      WA.Lifecycle.createRating({
        requestId: currentRequest.id,
        referralId: bundle.activeReferral.id,
        overall: $("#ratingOverall").value,
        treatment: $("#ratingTreatment").value,
        commitment: $("#ratingCommitment").value,
        clarity: $("#ratingClarity").value,
        serviceQuality: $("#ratingService").value,
        fairness: $("#ratingFairness").value,
        recommend: form.elements.recommend.value,
        comment: $("#ratingComment").value
      });
      $("#ratingDialog").close();
      WA.UI.showToast("شكرًا، تم تسجيل التقييم الموثق", "success");
      renderRequest(currentRequest);
    } catch (error) {
      WA.UI.showToast(error.message, "error");
    }
  };

  const init = () => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) loadByToken(token);
    else setView("lookup");

    $("#lookupForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const requestId = WA.Storage.sanitizeText($("#requestNumber").value, 30).toUpperCase();
      const phone = WA.Storage.sanitizePhone($("#lookupPhone").value);
      const request = WA.Lifecycle.findRequestByHumanId(requestId);
      const customer = request ? WA.Storage.findById("wa_customers", request.customerId) : null;
      if (!request || !customer || customer.phone !== phone) { setView("notFound"); return; }
      history.replaceState({}, "", `track.html?token=${encodeURIComponent(request.publicToken)}`);
      renderRequest(request);
    });
    $("#alternativeForm").addEventListener("submit", handleAlternative);
    $("#ratingForm").addEventListener("submit", handleRating);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
