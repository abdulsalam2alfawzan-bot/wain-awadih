(() => {
  "use strict";

  let currentReferralId = null;

  const getProfile = () => WA.storage.get("wa_workshop_profile", {});
  const getWorkshopId = () => WA.storage.get("wa_workshop_session", {})?.workshopId || getProfile().id || "WS-101";
  const getWorkshopReferrals = () => WA.storage.get("wa_referrals", []).filter((item) => !item.workshopId || item.workshopId === getWorkshopId());
  const getWorkshopRatings = () => {
    const referralIds = new Set(getWorkshopReferrals().map((item) => item.referralId));
    return WA.storage.get("wa_ratings", []).filter((item) => item.workshopId === getWorkshopId() || referralIds.has(item.referralId));
  };
  const getWorkshopFees = () => WA.storage.get("wa_fees", []).filter((item) => !item.workshopId || item.workshopId === getWorkshopId());
  const getWorkshopPayments = () => WA.storage.get("wa_payments", []).filter((item) => !item.workshopId || item.workshopId === getWorkshopId());

  const requireSession = () => {
    const session = WA.storage.get("wa_workshop_session", null);
    if (!session) {
      window.location.href = "workshop-login.html";
      return false;
    }
    return true;
  };

  const average = (items, key) => {
    if (!items.length) return 0;
    return items.reduce((sum, item) => sum + Number(item[key] || 0), 0) / items.length;
  };

  const renderOverview = () => {
    const profile = getProfile();
    const referrals = getWorkshopReferrals();
    const ratings = getWorkshopRatings();
    const balance = getWorkshopFees().filter((fee) => fee.status === "غير مدفوع").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);

    document.querySelector("#sidebarWorkshopName").textContent = profile.name;
    document.querySelector("#ownerName").textContent = profile.owner;
    document.querySelector("#statReferrals").textContent = referrals.length;
    document.querySelector("#statCompleted").textContent = referrals.filter((item) => item.status === "تمت الخدمة").length;
    document.querySelector("#statRating").textContent = ratings.length ? average(ratings, "overall").toFixed(1) : profile.rating;
    document.querySelector("#statBalance").textContent = WA.formatMoney(balance);
    document.querySelector("#commitmentValue").textContent = `${profile.commitment}%`;
    document.querySelector("#commitmentBar").style.width = `${profile.commitment}%`;
    document.querySelector("#trustValue").textContent = `${profile.trustIndex}%`;
    document.querySelector("#trustBar").style.width = `${profile.trustIndex}%`;
    document.querySelector("#fairnessValue").textContent = ratings.length ? average(ratings, "fairness").toFixed(1) : profile.fairness;

    const latest = referrals.slice(0, 4);
    document.querySelector("#latestReferralsBody").innerHTML = latest.length ? latest.map((item) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(item.requestId)}</span><span class="table-sub ltr">${WA.escapeHTML(item.referralId)}</span></td>
        <td><span class="table-title">${WA.escapeHTML(item.customer)}</span><span class="table-sub">${WA.escapeHTML(item.car)}</span></td>
        <td>${WA.escapeHTML(item.service)}</td>
        <td><span class="badge ${WA.statusBadgeClass(item.status)}">${WA.escapeHTML(item.status)}</span></td>
        <td>${WA.formatDate(item.updatedAt || item.createdAt)}</td>
      </tr>`).join("") : '<tr><td colspan="5"><div class="empty-state">لا توجد إحالات.</div></td></tr>';
  };

  const renderReferrals = () => {
    const filter = document.querySelector("#referralFilter").value;
    const referrals = getWorkshopReferrals().filter((item) => !filter || item.status === filter);
    document.querySelector("#referralsBody").innerHTML = referrals.length ? referrals.map((item) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(item.referralId)}</span><span class="table-sub">${WA.formatDate(item.createdAt)}</span></td>
        <td><span class="table-title ltr">${WA.escapeHTML(item.requestId)}</span><span class="table-sub">${WA.escapeHTML(item.city)}</span></td>
        <td><span class="table-title">${WA.escapeHTML(item.customer)}</span><span class="table-sub ltr">${WA.escapeHTML(item.phone)}</span></td>
        <td><span class="table-title">${WA.escapeHTML(item.car)}</span><span class="table-sub">${WA.escapeHTML(item.service)}</span></td>
        <td><span class="badge ${WA.statusBadgeClass(item.status)}">${WA.escapeHTML(item.status)}</span></td>
        <td><button class="btn btn-light btn-sm edit-referral" type="button" data-id="${WA.escapeHTML(item.referralId)}">تحديث الحالة</button></td>
      </tr>`).join("") : '<tr><td colspan="6"><div class="empty-state"><h3>لا توجد إحالات مطابقة</h3><p>غيّر فلتر الحالة أو أنشئ طلبًا من بوابة العميل.</p></div></td></tr>';

    document.querySelectorAll(".edit-referral").forEach((button) => {
      button.addEventListener("click", () => openReferralModal(button.dataset.id));
    });
  };

  const openReferralModal = (id) => {
    currentReferralId = id;
    const referral = getWorkshopReferrals().find((item) => item.referralId === id);
    if (!referral) return;
    document.querySelector("#referralModalTitle").textContent = `تحديث الإحالة ${id}`;
    document.querySelector("#referralModalContent").innerHTML = `
      <div class="form-grid one">
        <div class="notice info">الطلب ${WA.escapeHTML(referral.requestId)} — ${WA.escapeHTML(referral.customer)} — ${WA.escapeHTML(referral.car)}</div>
        <div class="field">
          <label for="modalStatus">الحالة الجديدة</label>
          <select id="modalStatus">${WA.referralStatuses.map((status) => `<option ${status === referral.status ? "selected" : ""}>${WA.escapeHTML(status)}</option>`).join("")}</select>
        </div>
        <div class="field">
          <label for="modalNote">ملاحظة داخلية اختيارية</label>
          <textarea id="modalNote" maxlength="200" placeholder="مثال: تم التنسيق للزيارة مساءً">${WA.escapeHTML(referral.note || "")}</textarea>
        </div>
        <button class="btn btn-dark btn-block" id="saveReferralStatus" type="button">حفظ التحديث</button>
      </div>`;
    document.querySelector("#saveReferralStatus").addEventListener("click", saveReferralStatus);
    WA.openModal("#referralModal");
  };

  const saveReferralStatus = () => {
    const status = document.querySelector("#modalStatus").value;
    const note = document.querySelector("#modalNote").value.trim();
    const referrals = WA.storage.get("wa_referrals", []);
    const referral = referrals.find((item) => item.referralId === currentReferralId);
    if (!referral) return;
    referral.status = status;
    referral.note = note;
    referral.updatedAt = new Date().toISOString();

    const profile = getProfile();
    if (status === "تمت الخدمة" && !referral.feeEligible) {
      const feeId = WA.randomId("FEE", 5);
      referral.feeEligible = true;
      referral.feeId = feeId;
      const fees = WA.storage.get("wa_fees", []);
      fees.unshift({
        id: feeId,
        referralId: referral.referralId,
        requestId: referral.requestId,
        event: profile.agreementEvent,
        amount: profile.demoFee,
        status: "غير مدفوع",
        createdAt: new Date().toISOString(),
        workshopId: getWorkshopId(),
        demo: true
      });
      WA.storage.set("wa_fees", fees);
    }
    WA.storage.set("wa_referrals", referrals);

    const requests = WA.storage.get("wa_requests", []);
    const request = requests.find((item) => item.id === referral.requestId);
    if (request) {
      const linked = request.referrals.find((item) => item.referralId === referral.referralId);
      if (linked) {
        linked.status = status;
        linked.note = note;
        linked.updatedAt = referral.updatedAt;
        linked.feeEligible = Boolean(referral.feeEligible);
        linked.feeId = referral.feeId || null;
      }
      request.status = status;
      if (status === "تمت الخدمة") request.customerConfirmation = "تمت الخدمة";
      WA.storage.set("wa_requests", requests);
    }

    WA.closeModals();
    renderAll();
    WA.toast(status === "تمت الخدمة" ? "تم تحديث الحالة ومحاكاة تسجيل الرسم وفق الاتفاقية." : "تم تحديث حالة الإحالة.");
  };

  const renderRatings = () => {
    const ratings = getWorkshopRatings();
    document.querySelector("#ratingOverall").textContent = ratings.length ? `${average(ratings, "overall").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingTreatment").textContent = ratings.length ? `${average(ratings, "treatment").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingCommitment").textContent = ratings.length ? `${average(ratings, "commitment").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingFairness").textContent = ratings.length ? `${average(ratings, "fairness").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingsList").innerHTML = ratings.length ? ratings.map((rating) => `
      <article class="card">
        <div class="dashboard-head">
          <div><h3 class="mt-0">${WA.escapeHTML(rating.customer)} — <span class="ltr">${WA.escapeHTML(rating.requestId)}</span></h3><p>${WA.formatDate(rating.createdAt)}</p></div>
          <span class="badge success"><span class="stars">★</span> ${rating.overall} / 5</span>
        </div>
        <div class="metric-grid">
          <div class="metric"><small>جودة التعامل</small><strong>${rating.treatment} / 5</strong></div>
          <div class="metric"><small>الالتزام</small><strong>${rating.commitment} / 5</strong></div>
          <div class="metric"><small>جودة الخدمة</small><strong>${rating.quality} / 5</strong></div>
          <div class="metric"><small>عدالة الأسعار</small><strong>${rating.fairness} / 5</strong></div>
        </div>
        <div class="why-box"><strong>هل ينصح بالورشة؟ ${WA.escapeHTML(rating.recommend)}</strong><p>${WA.escapeHTML(rating.comment || "لا يوجد تعليق.")}</p></div>
      </article>`).join("") : '<div class="empty-state"><h3>لا توجد تقييمات بعد</h3><p>تظهر هنا التقييمات المرتبطة بتجارب فعلية.</p></div>';
  };

  const renderStatement = () => {
    const fees = getWorkshopFees();
    const payments = getWorkshopPayments();
    const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const outstanding = fees.filter((fee) => fee.status === "غير مدفوع").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const paid = payments.filter((payment) => payment.status === "مكتمل").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    document.querySelector("#feesTotal").textContent = WA.formatMoney(total);
    document.querySelector("#feesPaid").textContent = WA.formatMoney(paid);
    document.querySelector("#feesOutstanding").textContent = WA.formatMoney(outstanding);
    document.querySelector("#lastPayment").textContent = payments.length ? WA.formatDate(payments[0].paidAt) : "لا يوجد";
    const profile = getProfile();
    const notice = document.querySelector("#balanceNotice");
    notice.textContent = outstanding >= profile.threshold
      ? `بلغ الرصيد المستحق حد المطالبة المالي التجريبي (${WA.formatMoney(profile.threshold)}). يمكنك الانتقال إلى صفحة الدفع.`
      : `الرصيد دون حد المطالبة التجريبي. القيم المعروضة محاكاة وليست سياسة تسعير معتمدة.`;

    document.querySelector("#feesBody").innerHTML = fees.length ? fees.map((fee) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(fee.id)}</span></td>
        <td><span class="table-title ltr">${WA.escapeHTML(fee.referralId)}</span><span class="table-sub ltr">${WA.escapeHTML(fee.requestId)}</span></td>
        <td>${WA.escapeHTML(fee.event)}</td>
        <td>${WA.formatMoney(fee.amount)}</td>
        <td><span class="badge ${WA.statusBadgeClass(fee.status)}">${WA.escapeHTML(fee.status)}</span></td>
        <td>${WA.formatDate(fee.createdAt)}</td>
      </tr>`).join("") : '<tr><td colspan="6"><div class="empty-state">لا توجد رسوم مسجلة.</div></td></tr>';

    document.querySelector("#paymentsBody").innerHTML = payments.length ? payments.map((payment) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(payment.id)}</span></td>
        <td>${WA.formatMoney(payment.amount)}</td>
        <td>${WA.escapeHTML(payment.method)}</td>
        <td><span class="badge success">${WA.escapeHTML(payment.status)}</span></td>
        <td>${WA.formatDate(payment.paidAt)}</td>
        <td><a class="btn btn-light btn-sm" href="receipt.html?id=${encodeURIComponent(payment.receiptId)}">عرض الإيصال</a></td>
      </tr>`).join("") : '<tr><td colspan="6"><div class="empty-state">لا توجد مدفوعات.</div></td></tr>';
  };

  const renderAll = () => {
    renderOverview();
    renderReferrals();
    renderRatings();
    renderStatement();
  };

  const switchTab = (name) => {
    document.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === name));
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const init = () => {
    if (!requireSession()) return;
    WA.fillSelect("#referralFilter", WA.referralStatuses, "كل الحالات");
    document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.tab)));
    document.querySelectorAll("[data-switch-tab]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.switchTab)));
    document.querySelector("#referralFilter").addEventListener("change", renderReferrals);
    document.querySelector("#logoutWorkshop").addEventListener("click", () => {
      WA.storage.remove("wa_workshop_session");
      window.location.href = "workshop-login.html";
    });
    document.querySelector("#resetReferralDemo").addEventListener("click", () => {
      WA.storage.remove("wa_seed_version");
      WA.storage.remove("wa_seeded");
      WA.seedData();
      renderAll();
      WA.toast("تمت إعادة البيانات التجريبية الأساسية.");
    });
    renderAll();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
