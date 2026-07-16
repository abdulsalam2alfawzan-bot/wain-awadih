(() => {
  "use strict";

  let currentStep = 1;
  const data = {
    establishment: {},
    contact: {},
    specialties: {},
    operations: {},
    agreements: {}
  };

  const subSpecialties = [
    "فحص كمبيوتر", "كهرباء محرك", "ميكانيكا محرك", "تكييف",
    "عفشة", "فرامل", "إطارات", "بطاريات", "زيوت وفلاتر",
    "ميزان أذرعة", "فحص شامل", "خدمات سريعة"
  ];

  const services = [
    "فحص وتشخيص", "صيانة دورية", "تغيير زيت", "تغيير فلاتر",
    "فحص فرامل", "تغيير بطارية", "تغيير كفرات", "فحص مكيف",
    "إصلاح كهرباء", "إصلاح ميكانيكا", "عفشة وتعليق", "خدمة أخرى"
  ];

  const normalizeDigits = (value, max) => value.replace(/\D/g, "").slice(0, max);
  const selectedValues = (selector) => [...document.querySelectorAll(`${selector}:checked`)].map((item) => item.value);
  const invalid = (name, value) => document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", value);

  const populateChecks = (mountId, name, values) => {
    document.querySelector(mountId).innerHTML = values.map((value) => `
      <label class="check-card"><input type="checkbox" name="${name}" value="${WA.escapeHTML(value)}">${WA.escapeHTML(value)}</label>`).join("");
  };

  const updateStepper = () => {
    document.querySelectorAll("[data-stepper]").forEach((item) => {
      const step = Number(item.dataset.stepper);
      item.classList.toggle("active", step === currentStep);
      item.classList.toggle("done", step < currentStep);
    });
    document.querySelectorAll("[data-join-step]").forEach((panel) => panel.classList.toggle("active", Number(panel.dataset.joinStep) === currentStep));
    window.scrollTo({ top: document.querySelector("#joinWizard").offsetTop - 80, behavior: "smooth" });
    WA.storage.set("wa_join_draft", { data, currentStep });
  };

  const validateStep1 = () => {
    const values = {
      workshopName: document.querySelector("#joinWorkshopName").value.trim(),
      ownerName: document.querySelector("#joinOwnerName").value.trim(),
      commercialNo: normalizeDigits(document.querySelector("#commercialNo").value, 10),
      taxNo: normalizeDigits(document.querySelector("#taxNo").value, 15),
      description: document.querySelector("#workshopDescription").value.trim()
    };
    const checks = {
      workshopName: values.workshopName.length >= 3,
      ownerName: values.ownerName.length >= 3,
      commercialNo: values.commercialNo.length === 10
    };
    Object.entries(checks).forEach(([key, valid]) => invalid(key, !valid));
    if (!Object.values(checks).every(Boolean)) return false;
    data.establishment = values;
    return true;
  };

  const validateStep2 = () => {
    const values = {
      city: document.querySelector("#joinCity").value,
      district: document.querySelector("#joinDistrict").value.trim(),
      address: document.querySelector("#joinAddress").value.trim(),
      mobile: normalizeDigits(document.querySelector("#joinMobile").value, 10),
      whatsapp: normalizeDigits(document.querySelector("#joinWhatsapp").value, 10),
      email: document.querySelector("#joinEmail").value.trim(),
      mapsLink: document.querySelector("#mapsLink").value.trim()
    };
    const checks = {
      joinCity: Boolean(values.city),
      district: values.district.length >= 2,
      address: values.address.length >= 5,
      joinMobile: /^05\d{8}$/.test(values.mobile),
      joinWhatsapp: /^05\d{8}$/.test(values.whatsapp)
    };
    Object.entries(checks).forEach(([key, valid]) => invalid(key, !valid));
    if (!Object.values(checks).every(Boolean)) return false;
    data.contact = values;
    return true;
  };

  const validateStep3 = () => {
    const values = {
      mainSpecialty: document.querySelector("#mainSpecialty").value,
      subSpecialties: selectedValues('input[name="subSpecialties"]'),
      carMakes: selectedValues('input[name="carMakes"]'),
      services: selectedValues('input[name="joinServices"]')
    };
    const checks = {
      mainSpecialty: Boolean(values.mainSpecialty),
      subSpecialties: values.subSpecialties.length > 0,
      carMakes: values.carMakes.length > 0,
      services: values.services.length > 0
    };
    Object.entries(checks).forEach(([key, valid]) => invalid(key, !valid));
    if (!Object.values(checks).every(Boolean)) return false;
    data.specialties = values;
    return true;
  };

  const collectStep4 = () => {
    data.operations = {
      commercialFile: document.querySelector("#commercialFile").files[0]?.name || "غير مرفق",
      licenseFile: document.querySelector("#licenseFile").files[0]?.name || "غير مرفق",
      openingTime: document.querySelector("#openingTime").value,
      closingTime: document.querySelector("#closingTime").value,
      availability: document.querySelector("#availability").value,
      dailyCapacity: document.querySelector("#dailyCapacity").value
    };
    return true;
  };

  const renderReview = () => {
    const e = data.establishment;
    const c = data.contact;
    const s = data.specialties;
    const o = data.operations;
    document.querySelector("#joinReview").innerHTML = `
      <div class="review-block">
        <h4>المنشأة</h4>
        <dl>
          <div><dt>اسم الورشة</dt><dd>${WA.escapeHTML(e.workshopName)}</dd></div>
          <div><dt>المسؤول</dt><dd>${WA.escapeHTML(e.ownerName)}</dd></div>
          <div><dt>السجل التجاري</dt><dd class="ltr">${WA.escapeHTML(e.commercialNo)}</dd></div>
        </dl>
      </div>
      <div class="review-block">
        <h4>الموقع والتواصل</h4>
        <dl>
          <div><dt>المدينة</dt><dd>${WA.escapeHTML(c.city)}</dd></div>
          <div><dt>الحي</dt><dd>${WA.escapeHTML(c.district)}</dd></div>
          <div><dt>واتساب</dt><dd class="ltr">${WA.escapeHTML(c.whatsapp)}</dd></div>
        </dl>
      </div>
      <div class="review-block">
        <h4>التخصص والخدمات</h4>
        <dl>
          <div><dt>الرئيسي</dt><dd>${WA.escapeHTML(s.mainSpecialty)}</dd></div>
          <div><dt>الفرعية</dt><dd>${WA.escapeHTML(s.subSpecialties.join("، "))}</dd></div>
          <div><dt>الخدمات</dt><dd>${WA.escapeHTML(s.services.join("، "))}</dd></div>
        </dl>
      </div>
      <div class="review-block">
        <h4>التشغيل والوثائق</h4>
        <dl>
          <div><dt>ساعات العمل</dt><dd class="ltr">${WA.escapeHTML(o.openingTime)} — ${WA.escapeHTML(o.closingTime)}</dd></div>
          <div><dt>التوفر</dt><dd>${WA.escapeHTML(o.availability)}</dd></div>
          <div><dt>الوثائق</dt><dd>${WA.escapeHTML(o.commercialFile)}، ${WA.escapeHTML(o.licenseFile)}</dd></div>
        </dl>
      </div>`;
  };

  const goNext = (step) => {
    let valid = true;
    if (currentStep === 1) valid = validateStep1();
    if (currentStep === 2) valid = validateStep2();
    if (currentStep === 3) valid = validateStep3();
    if (currentStep === 4) valid = collectStep4();
    if (!valid) {
      WA.toast("أكمل الحقول المطلوبة قبل المتابعة.");
      return;
    }
    currentStep = step;
    if (currentStep === 5) renderReview();
    updateStepper();
  };

  const submit = (event) => {
    event.preventDefault();
    const agreements = ["agreePartnership", "agreeReferrals", "agreeFees", "agreeTrust"];
    const allAgreed = agreements.every((id) => document.querySelector(`#${id}`).checked);
    invalid("agreements", !allAgreed);
    if (!allAgreed) {
      WA.toast("يجب الموافقة على جميع بنود الشراكة.");
      return;
    }
    data.agreements = {
      partnership: true,
      referrals: true,
      fees: true,
      trust: true
    };
    const applicationId = WA.randomId("JOIN", 5);
    const application = {
      id: applicationId,
      createdAt: new Date().toISOString(),
      status: "قيد المراجعة",
      reviewNote: "تم استلام الطلب وسيتم التحقق من البيانات والوثائق والتخصصات.",
      ...JSON.parse(JSON.stringify(data))
    };
    const applications = WA.storage.get("wa_join_applications", []);
    applications.unshift(application);
    WA.storage.set("wa_join_applications", applications);
    WA.storage.remove("wa_join_draft");

    document.querySelector("#joinWizard").classList.add("hidden");
    document.querySelector("#joinSuccess").classList.remove("hidden");
    document.querySelector("#joinApplicationId").textContent = applicationId;
    document.querySelector("#joinSuccessName").textContent = data.establishment.workshopName;
    document.querySelector("#joinSuccessPhone").textContent = data.contact.mobile;
    document.querySelector("#joinStatusLink").href = `join-status.html?id=${encodeURIComponent(applicationId)}&phone=${encodeURIComponent(data.contact.mobile)}`;
    window.scrollTo({ top: document.querySelector("#joinSuccess").offsetTop - 80, behavior: "smooth" });
  };

  const restoreDraft = () => {
    const draft = WA.storage.get("wa_join_draft", null);
    if (!draft?.data) return;
    Object.assign(data, draft.data);
    currentStep = Math.min(5, Math.max(1, Number(draft.currentStep || 1)));
    const e = data.establishment || {};
    const c = data.contact || {};
    const s = data.specialties || {};
    const o = data.operations || {};
    document.querySelector("#joinWorkshopName").value = e.workshopName || "";
    document.querySelector("#joinOwnerName").value = e.ownerName || "";
    document.querySelector("#commercialNo").value = e.commercialNo || "";
    document.querySelector("#taxNo").value = e.taxNo || "";
    document.querySelector("#workshopDescription").value = e.description || "";
    document.querySelector("#joinCity").value = c.city || "";
    document.querySelector("#joinDistrict").value = c.district || "";
    document.querySelector("#joinAddress").value = c.address || "";
    document.querySelector("#joinMobile").value = c.mobile || "";
    document.querySelector("#joinWhatsapp").value = c.whatsapp || "";
    document.querySelector("#joinEmail").value = c.email || "";
    document.querySelector("#mapsLink").value = c.mapsLink || "";
    document.querySelector("#mainSpecialty").value = s.mainSpecialty || "";
    (s.subSpecialties || []).forEach((value) => { const el = document.querySelector(`input[name="subSpecialties"][value="${CSS.escape(value)}"]`); if (el) el.checked = true; });
    (s.carMakes || []).forEach((value) => { const el = document.querySelector(`input[name="carMakes"][value="${CSS.escape(value)}"]`); if (el) el.checked = true; });
    (s.services || []).forEach((value) => { const el = document.querySelector(`input[name="joinServices"][value="${CSS.escape(value)}"]`); if (el) el.checked = true; });
    document.querySelector("#openingTime").value = o.openingTime || "08:00";
    document.querySelector("#closingTime").value = o.closingTime || "22:00";
    document.querySelector("#availability").value = o.availability || "متوفر غالبًا";
    document.querySelector("#dailyCapacity").value = o.dailyCapacity || "أقل من 5 سيارات";
  };

  const init = () => {
    WA.fillSelect("#joinCity", WA.cities, "اختر المدينة أو المحافظة");
    populateChecks("#subSpecialtiesGrid", "subSpecialties", subSpecialties);
    populateChecks("#carMakesGrid", "carMakes", [...WA.makes.filter((item) => item !== "أخرى"), "جميع الأنواع"]);
    populateChecks("#servicesGrid", "joinServices", services);
    restoreDraft();

    ["commercialNo", "taxNo", "joinMobile", "joinWhatsapp"].forEach((id) => {
      const element = document.querySelector(`#${id}`);
      const max = id === "taxNo" ? 15 : 10;
      element.addEventListener("input", () => { element.value = normalizeDigits(element.value, max); });
    });
    document.querySelector("#commercialFile").addEventListener("change", (event) => {
      document.querySelector("#commercialFileName").textContent = event.target.files[0]?.name || "لم يتم اختيار ملف";
    });
    document.querySelector("#licenseFile").addEventListener("change", (event) => {
      document.querySelector("#licenseFileName").textContent = event.target.files[0]?.name || "لم يتم اختيار ملف";
    });

    document.querySelectorAll(".join-next").forEach((button) => button.addEventListener("click", () => goNext(Number(button.dataset.nextStep))));
    document.querySelectorAll(".join-back").forEach((button) => button.addEventListener("click", () => {
      currentStep = Number(button.dataset.prevStep);
      updateStepper();
    }));
    document.querySelector("#joinForm").addEventListener("submit", submit);
    updateStepper();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
