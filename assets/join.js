(() => {
  "use strict";
  const $ = WA.UI.qs;
  const $$ = WA.UI.qsa;
  let step = 1;

  const selectedValues = (select) => [...select.selectedOptions].map((option) => option.value);
  const progress = { 1: [25, "نوع الشريك"], 2: [50, "الخدمات والتغطية"], 3: [75, "الخصم"], 4: [100, "الموافقات"] };

  const showStep = (next) => {
    step = next;
    $$('[data-join-step]').forEach((section) => section.classList.toggle("active", Number(section.dataset.joinStep) === step));
    $("#joinSuccess").classList.remove("active");
    const [percent, label] = progress[step];
    $("#joinProgressBar").style.width = `${percent}%`;
    $("#joinProgressPercent").textContent = `${percent}%`;
    $("#joinProgressLabel").textContent = label;
    $(".progress-track").setAttribute("aria-valuenow", String(percent));
    $(`[data-join-step="${step}"]`)?.focus();
  };

  const updateAdaptive = () => {
    const type = $("#partnerType").value;
    $("#workshopAdaptive").hidden = !["workshop", "maintenance"].includes(type);
    $("#partsAdaptive").hidden = type !== "parts";
    $("#towAdaptive").hidden = type !== "tow";
    $("#maintenanceAdaptive").hidden = type !== "maintenance";
    $("#mainSpecialty").required = ["workshop", "maintenance"].includes(type);
    $("#towVehicleTypes").required = type === "tow";
    $("#maintenanceServicesJoin").required = type === "maintenance";
  };

  const validateStep = (number) => {
    if (number === 1) {
      const ids = ["partnerType", "businessName", "joinCity", "joinWhatsapp", "exactLocation", "workingHours"];
      const valid = ids.every((id) => Boolean($("#" + id).value.trim()));
      const phoneValid = /^05\d{8}$/.test(WA.Storage.sanitizePhone($("#joinWhatsapp").value));
      if (!valid || !phoneValid) WA.UI.showToast("أكمل البيانات الأساسية وتحقق من رقم واتساب", "error");
      return valid && phoneValid;
    }
    if (number === 2) {
      const type = $("#partnerType").value;
      const coverage = selectedValues($("#coverageCities"));
      const makes = selectedValues($("#servedMakes"));
      let valid = coverage.length > 0 && makes.length > 0;
      if (["workshop", "maintenance"].includes(type)) valid = valid && Boolean($("#mainSpecialty").value);
      if (type === "tow") valid = valid && Boolean($("#towVehicleTypes").value.trim());
      if (type === "maintenance") valid = valid && selectedValues($("#maintenanceServicesJoin")).length > 0;
      if (!valid) WA.UI.showToast("حدد التغطية والخدمات المناسبة لنوع الشريك", "error");
      return valid;
    }
    if (number === 3 && $("#offersDiscount").checked) {
      const fields = ["joinDiscountPercent", "joinDiscountServices", "joinDiscountConditions", "joinDiscountStart", "joinDiscountEnd"];
      const valid = fields.every((id) => Boolean($("#" + id).value.trim())) && $("#joinDiscountEnd").value >= $("#joinDiscountStart").value;
      if (!valid) WA.UI.showToast("أكمل تفاصيل الخصم وتحقق من المدة", "error");
      return valid;
    }
    return true;
  };

  const review = () => {
    const type = $("#partnerType").value;
    const items = [
      ["نوع الشريك", WA.Config.partnerTypes[type]],
      ["الاسم", $("#businessName").value],
      ["المدينة", $("#joinCity").value],
      ["التغطية", selectedValues($("#coverageCities")).join("، ")],
      ["الشركات المخدومة", selectedValues($("#servedMakes")).join("، ")],
      ["الخصم", $("#offersDiscount").checked ? `${$("#joinDiscountPercent").value}%` : "لا يوجد"]
    ];
    $("#joinReview").innerHTML = items.map(([label, value]) => `<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value || "—")}</strong></div>`).join("");
  };

  const submit = (event) => {
    event.preventDefault();
    const form = $("#joinForm");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!["agreementAccepted", "feesAccepted", "ratingsAccepted", "privacyTrustAccepted"].every((id) => $("#" + id).checked)) {
      WA.UI.showToast("يلزم قبول جميع موافقات الشراكة", "error");
      return;
    }
    const type = $("#partnerType").value;
    const phone = WA.Storage.sanitizePhone($("#joinWhatsapp").value);
    const duplicate = WA.Storage.get("wa_join_applications").find((row) => row.phone === phone && row.businessName === $("#businessName").value.trim() && !["rejected", "cancelled"].includes(row.status));
    if (duplicate) {
      WA.UI.showToast(`يوجد طلب سابق برقم ${duplicate.applicationNumber}`, "info");
      $("#joinApplicationNumber").textContent = duplicate.applicationNumber;
      $$('[data-join-step]').forEach((section) => section.classList.remove("active"));
      $("#joinSuccess").classList.add("active");
      return;
    }
    const application = WA.Storage.upsert("wa_join_applications", {
      id: WA.Storage.createId("APP"),
      applicationNumber: `JOIN-${Math.floor(10000 + Math.random() * 90000)}`,
      publicToken: WA.Storage.randomToken("join"),
      partnerType: type,
      businessName: WA.Storage.sanitizeText($("#businessName").value, 100),
      city: $("#joinCity").value,
      phone,
      exactLocation: WA.Storage.sanitizeText($("#exactLocation").value, 180),
      workingHours: WA.Storage.sanitizeText($("#workingHours").value, 100),
      coverageCities: selectedValues($("#coverageCities")),
      servedMakes: selectedValues($("#servedMakes")),
      mainSpecialty: $("#mainSpecialty").value,
      subSpecialties: WA.Storage.sanitizeText($("#subSpecialties").value, 250),
      towVehicleTypes: WA.Storage.sanitizeText($("#towVehicleTypes").value, 250),
      maintenanceServices: selectedValues($("#maintenanceServicesJoin")),
      discount: $("#offersDiscount").checked ? {
        percent: Number($("#joinDiscountPercent").value),
        services: WA.Storage.sanitizeText($("#joinDiscountServices").value, 180),
        conditions: WA.Storage.sanitizeText($("#joinDiscountConditions").value, 500),
        startsAt: $("#joinDiscountStart").value,
        endsAt: $("#joinDiscountEnd").value
      } : null,
      agreements: {
        partnership: true,
        fees: true,
        ratingsAndObjections: true,
        privacyAndTrust: true
      },
      status: "submitted",
      statusLabel: "تم الاستلام — قيد المراجعة التجريبية",
      isDemo: true,
      submittedAt: WA.Storage.now()
    });
    $("#joinApplicationNumber").textContent = application.applicationNumber;
    $("#joinStatusLink").href = `join-status.html?token=${encodeURIComponent(application.publicToken)}`;
    $$('[data-join-step]').forEach((section) => section.classList.remove("active"));
    $("#joinSuccess").classList.add("active");
    $("#joinSuccess").focus();
  };

  const init = () => {
    WA.UI.initSelect($("#joinCity"), WA.Config.supportedCities, "اختر المدينة");
    WA.Config.supportedCities.forEach((city) => $("#coverageCities").add(new Option(city, city)));
    WA.Automotive.makes.filter((make) => make !== "أخرى").forEach((make) => $("#servedMakes").add(new Option(make, make)));
    WA.Automotive.maintenanceServices.forEach((service) => $("#maintenanceServicesJoin").add(new Option(service, service)));
    $("#partnerType").addEventListener("change", updateAdaptive);
    $("#offersDiscount").addEventListener("change", () => {
      $("#discountJoinFields").hidden = !$("#offersDiscount").checked;
      ["joinDiscountPercent", "joinDiscountServices", "joinDiscountConditions", "joinDiscountStart", "joinDiscountEnd"].forEach((id) => $("#" + id).required = $("#offersDiscount").checked);
    });
    $$('[data-join-next]').forEach((button) => button.addEventListener("click", () => {
      if (!validateStep(step)) return;
      const next = Number(button.dataset.joinNext);
      if (next === 4) review();
      showStep(next);
    }));
    $$('[data-join-back]').forEach((button) => button.addEventListener("click", () => showStep(Number(button.dataset.joinBack))));
    $("#joinForm").addEventListener("submit", submit);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
