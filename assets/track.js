(() => {
  "use strict";

  let currentRequest = null;

  const ratingDimensions = [
    ["overall", "التقييم العام"],
    ["treatment", "جودة التعامل"],
    ["commitment", "الالتزام"],
    ["clarity", "وضوح التعامل"],
    ["quality", "جودة الخدمة"],
    ["fairness", "عدالة الأسعار"]
  ];

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
  const currentReferral = () => currentRequest?.referrals?.[currentRequest.currentReferral || 0] || null;
  const hasRating = (referralId) => WA.storage.get("wa_ratings", []).some((rating) => rating.referralId === referralId);

  const fieldInvalid = (name, invalid) => {
    document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", invalid);
  };

  const renderRatingFields = () => {
    document.querySelector("#ratingFields").innerHTML = ratingDimensions.map(([name, label]) => `
      <fieldset class="rating-field">
        <legend>${label}</legend>
        <div class="stars-input" aria-label="${label}">
          ${[5, 4, 3, 2, 1].map((value) => `
            <input type="radio" id="${name}-${value}" name="${name}" value="${value}">
            <label for="${name}-${value}" title="${value} من 5"><span class="sr-only">${value} من 5</span>★</label>`).join("")}
        </div>
      </fieldset>`).join("");
  };

  const renderTimeline = () => {
    const status = currentReferral()?.status || currentRequest.status;
    const stages = [
      ["تم إنشاء الطلب", true],
      ["تم تسجيل الإحالة", true],
      ["ظهرت الورشة للعميل", true],
      ["تم التواصل", ["تواصل العميل", "تم تحديد موعد", "وصل العميل", "تمت الخدمة"].includes(status)],
      ["وصل العميل", ["وصل العميل", "تمت الخدمة"].includes(status)],
      ["تمت الخدمة", status === "تمت الخدمة"]
    ];
    const activeIndex = stages.reduce((last, item, index) => item[1] ? index : last, 0);
    document.querySelector("#requestTimeline").innerHTML = stages.map(([title, done], index) => `
      <div class="timeline-item ${done ? "done" : ""} ${index === activeIndex && status !== "تمت الخدمة" ? "current" : ""}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <h4>${WA.escapeHTML(title)}</h4>
        <p>${done ? "مكتملة أو مؤكدة" : "بانتظار التحديث"}</p>
      </div>`).join("");
  };

  const renderCurrentReferral = () => {
    const referral = currentReferral();
    if (!referral) return;
    const workshop = referral.workshop;
    const whatsappUrl = WA.buildWhatsappUrl(currentRequest, workshop);
    document.querySelector("#currentReferralCard").innerHTML = `
      <div class="request-strip"><span>رقم الإحالة</span><strong class="ltr">${WA.escapeHTML(referral.referralId)}</strong></div>
      <div class="info-list">
        <div class="info-row"><div class="info-label">الورشة</div><div class="info-value">${WA.escapeHTML(workshop.name)}</div></div>
        <div class="info-row"><div class="info-label">المدينة</div><div class="info-value">${WA.escapeHTML(workshop.city || currentRequest.city)}</div></div>
        <div class="info-row"><div class="info-label">التخصص</div><div class="info-value">${WA.escapeHTML(workshop.specialty)}</div></div>
        <div class="info-row"><div class="info-label">الحالة</div><div class="info-value"><span class="badge ${WA.statusBadgeClass(referral.status)}">${WA.escapeHTML(referral.status)}</span></div></div>
        <div class="info-row"><div class="info-label">التقييم العام</div><div class="info-value"><span class="stars">★</span> ${workshop.rating} من 5</div></div>
        <div class="info-row"><div class="info-label">عدالة الأسعار</div><div class="info-value"><span class="stars">★</span> ${workshop.fairness} من 5</div></div>
      </div>
      <a class="btn btn-success btn-block mt-16" id="trackWhatsapp" href="${whatsappUrl}" target="_blank" rel="noopener">التواصل عبر واتساب</a>
      <button class="btn btn-light btn-block mt-8" id="copyTrackMessage" type="button">نسخ رسالة واتساب</button>`;

    document.querySelector("#trackWhatsapp").addEventListener("click", () => {
      WA.markWhatsappOpened(currentRequest);
      renderRequest();
    });
    document.querySelector("#copyTrackMessage").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(WA.buildWhatsappMessage(currentRequest, workshop));
        WA.toast("تم نسخ رسالة واتساب.");
      } catch (_) {
        WA.toast("تعذر النسخ التلقائي في هذا المتصفح.");
      }
    });
  };

  const renderHistory = () => {
    document.querySelector("#referralHistory").innerHTML = currentRequest.referrals.map((referral, index) => `
      <article class="history-item ${index === currentRequest.currentReferral ? "current" : ""}">
        <div class="history-number">${index + 1}</div>
        <div class="history-content">
          <div class="section-row">
            <div><strong>${WA.escapeHTML(referral.workshop.name)}</strong><span>${WA.escapeHTML(referral.workshop.specialty)}</span></div>
            <span class="badge ${WA.statusBadgeClass(referral.status)}">${WA.escapeHTML(referral.status)}</span>
          </div>
          <div class="history-meta"><span class="ltr">${WA.escapeHTML(referral.referralId)}</span><span>${WA.formatDate(referral.createdAt)}</span>${referral.reason ? `<span>السبب: ${WA.escapeHTML(referral.reason)}</span>` : ""}</div>
        </div>
      </article>`).join("");
  };

  const renderDetails = () => {
    const primary = currentRequest.type === "maintenance" ? currentRequest.service : currentRequest.problem;
    const secondary = currentRequest.type === "maintenance" ? "صيانة دورية وخدمات سريعة" : currentRequest.guidance;
    document.querySelector("#requestDetails").innerHTML = `
      <div class="info-row"><div class="info-label">الطلب</div><div class="info-value">${WA.escapeHTML(primary || "—")}</div></div>
      <div class="info-row"><div class="info-label">التخصص</div><div class="info-value">${WA.escapeHTML(currentRequest.specialty || "—")}</div></div>
      <div class="info-row"><div class="info-label">التوجيه</div><div class="info-value">${WA.escapeHTML(secondary || "—")}</div></div>
      <div class="info-row"><div class="info-label">الممشى</div><div class="info-value">${WA.escapeHTML(currentRequest.vehicle.mileage || "—")}</div></div>`;
  };

  const renderRating = () => {
    const referral = currentReferral();
    const completed = referral?.status === "تمت الخدمة" || currentRequest.customerConfirmation === "تمت الخدمة";
    const rated = referral ? hasRating(referral.referralId) : false;
    document.querySelector("#ratingSection").classList.toggle("hidden", !completed);
    document.querySelector("#ratingForm").classList.toggle("hidden", rated);
    document.querySelector("#ratingSuccess").classList.toggle("hidden", !rated);
    if (rated) document.querySelector("#ratingSuccess").textContent = "سبق إرسال تقييم موثق لهذه الإحالة. شكرًا لك.";
  };

  const renderRequest = () => {
    if (!currentRequest) return;
    document.querySelector("#requestView").classList.remove("hidden");
    document.querySelector("#trackRequestTitle").textContent = `الطلب ${currentRequest.id}`;
    document.querySelector("#trackRequestMeta").textContent = `أُنشئ في ${WA.formatDate(currentRequest.createdAt)} — باسم ${currentRequest.customer.name}`;
    document.querySelector("#trackRequestStatus").className = `badge ${WA.statusBadgeClass(currentRequest.status)}`;
    document.querySelector("#trackRequestStatus").textContent = currentRequest.status;
    document.querySelector("#trackType").textContent = currentRequest.type === "maintenance" ? "صيانة دورية" : "مشكلة تواجهك";
    document.querySelector("#trackVehicle").textContent = `${currentRequest.vehicle.make} ${currentRequest.vehicle.model} ${currentRequest.vehicle.year}`;
    document.querySelector("#trackCity").textContent = currentRequest.city;
    document.querySelector("#trackReferralCount").textContent = currentRequest.referrals.length;
    renderDetails();
    renderTimeline();
    renderCurrentReferral();
    renderHistory();
    renderRating();

    const completed = currentReferral()?.status === "تمت الخدمة";
    const maxed = currentRequest.referrals.length >= 3;
    document.querySelector("#alternativeAction").classList.toggle("hidden", completed || maxed);
  };

  const findRequest = (id, phone) => WA.storage.get("wa_requests", [])
    .find((request) => request.id.toUpperCase() === id.toUpperCase() && request.customer.phone === phone) || null;

  const search = (event) => {
    event?.preventDefault();
    const id = document.querySelector("#trackId").value.trim();
    const phone = normalizePhone(document.querySelector("#trackPhone").value);
    fieldInvalid("trackId", !id);
    fieldInvalid("trackPhone", !/^05\d{8}$/.test(phone));
    if (!id || !/^05\d{8}$/.test(phone)) return;
    currentRequest = findRequest(id, phone);
    if (!currentRequest) {
      document.querySelector("#requestView").classList.add("hidden");
      WA.toast("لم نجد طلبًا مطابقًا لرقم الطلب والجوال.");
      return;
    }
    renderRequest();
    document.querySelector("#requestView").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateConfirmation = (value) => {
    if (!currentRequest) return;
    const referral = currentReferral();
    currentRequest.customerConfirmation = value;
    if (value === "وصلت إلى الورشة") referral.status = "وصل العميل";
    if (value === "تمت الخدمة") referral.status = "تمت الخدمة";
    if (value === "لم أتواصل معها") referral.status = "لم يتم التواصل";
    if (value === "تواصلت ولم أصل") referral.status = "تواصل العميل";
    currentRequest.status = value === "تمت الخدمة" ? "تمت الخدمة" : value;
    WA.saveRequest(currentRequest);
    WA.updateFlatReferral(referral.referralId, { status: referral.status });
    if (value === "تمت الخدمة") WA.registerFeeForReferral(currentRequest, referral);
    document.querySelector("#confirmationNotice").classList.remove("hidden");
    document.querySelector("#confirmationNotice").textContent = `تم تسجيل تأكيدك: ${value}.`;
    renderRequest();
  };

  const submitRating = (event) => {
    event.preventDefault();
    const referral = currentReferral();
    if (!currentRequest || !referral || hasRating(referral.referralId)) return;
    const data = {};
    let valid = true;
    ratingDimensions.forEach(([name]) => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      if (!selected) valid = false;
      else data[name] = Number(selected.value);
    });
    const recommend = document.querySelector("#recommendWorkshop").value;
    fieldInvalid("recommendWorkshop", !recommend);
    if (!recommend) valid = false;
    if (!valid) {
      WA.toast("أكمل جميع عناصر التقييم واختر هل تنصح بالورشة.");
      return;
    }
    const ratings = WA.storage.get("wa_ratings", []);
    ratings.unshift({
      requestId: currentRequest.id,
      referralId: referral.referralId,
      workshopId: referral.workshop.id,
      customer: currentRequest.customer.name,
      ...data,
      recommend,
      comment: document.querySelector("#ratingComment").value.trim(),
      createdAt: new Date().toISOString()
    });
    WA.storage.set("wa_ratings", ratings);
    currentRequest.rated = true;
    currentRequest.status = "تم التقييم";
    WA.saveRequest(currentRequest);
    renderRequest();
    WA.toast("تم حفظ التقييم الموثق بنجاح.");
  };

  const requestAlternative = () => {
    if (!currentRequest) return;
    if (currentRequest.referrals.length >= 3) {
      WA.toast("وصل الطلب إلى الحد الأقصى: 3 ورش.");
      return;
    }
    WA.openModal("#trackAnotherModal");
  };

  const confirmAlternative = () => {
    const selected = document.querySelector('input[name="trackAnotherReason"]:checked');
    const result = WA.createAlternativeReferral(currentRequest, selected?.value || "غير محدد");
    if (result.error) {
      WA.toast(result.error);
      return;
    }
    currentRequest = result.request;
    WA.closeModals();
    renderRequest();
    WA.toast("تم تسجيل إحالة جديدة داخل نفس الطلب.");
  };

  const init = () => {
    renderRatingFields();
    document.querySelector("#requestSearchForm").addEventListener("submit", search);
    document.querySelector("#trackPhone").addEventListener("input", (event) => {
      event.target.value = normalizePhone(event.target.value);
      fieldInvalid("trackPhone", false);
    });
    document.querySelector("#trackId").addEventListener("input", () => fieldInvalid("trackId", false));
    document.querySelector("#loadDemoRequest").addEventListener("click", () => {
      document.querySelector("#trackId").value = "WA-10425";
      document.querySelector("#trackPhone").value = "0500000001";
      search();
    });
    document.querySelectorAll(".confirmation-btn").forEach((button) => {
      button.addEventListener("click", () => updateConfirmation(button.dataset.confirmation));
    });
    document.querySelector("#requestAlternative").addEventListener("click", requestAlternative);
    document.querySelector("#confirmTrackAlternative").addEventListener("click", confirmAlternative);
    document.querySelector("#ratingForm").addEventListener("submit", submitRating);
    document.querySelector("#copyRequestId").addEventListener("click", async () => {
      if (!currentRequest) return;
      try { await navigator.clipboard.writeText(currentRequest.id); WA.toast("تم نسخ رقم الطلب."); }
      catch (_) { WA.toast(`رقم الطلب: ${currentRequest.id}`); }
    });

    const queryId = WA.getQuery("id");
    const queryPhone = WA.getQuery("phone");
    if (queryId) document.querySelector("#trackId").value = queryId;
    if (queryPhone) document.querySelector("#trackPhone").value = queryPhone;
    if (queryId && queryPhone) setTimeout(search, 80);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
