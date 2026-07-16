(() => {
  "use strict";

  const $ = WA.UI.qs;
  const $$ = WA.UI.qsa;
  const validServices = Object.keys(WA.Config.serviceTypes);
  const progress = {
    service: [8, "اختيار الخدمة"],
    customer: [20, "بيانات التواصل"],
    vehicle: [34, "بيانات السيارة"],
    location: [48, "المدينة والموقع"],
    path: [61, "تفاصيل الطلب"],
    analyzing: [70, "التحليل المبدئي"],
    questions: [77, "الأسئلة التوضيحية"],
    guidance: [84, "التوجيه المبدئي"],
    review: [84, "مراجعة الطلب"],
    matching: [94, "المطابقة وتسجيل الإحالة"],
    result: [100, "اكتمل الطلب"],
    noMatch: [100, "نتيجة المطابقة"]
  };

  const defaultState = () => ({
    screen: "service",
    serviceType: "",
    customer: { firstName: "", phone: "" },
    consents: { privacyAccepted: false, termsAccepted: false, marketingMessages: false },
    vehicle: { make: "", makeOther: "", model: "", modelOther: "", year: "", mileage: "" },
    city: "",
    preciseLocation: "",
    problem: "",
    vehicleMoves: "",
    towDestination: "",
    towNotes: "",
    maintenanceService: "",
    maintenanceNotes: "",
    ai: null,
    questions: [],
    answers: [],
    questionIndex: 0,
    requestId: "",
    referralId: "",
    matchReason: ""
  });

  let state = defaultState();
  let draftTimer = null;

  const saveDraft = () => {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => WA.Lifecycle.saveDraft(state), 120);
  };

  const setProgress = (screen) => {
    const [percent, label] = progress[screen] || [0, "بداية الطلب"];
    $("#progressBar").style.width = `${percent}%`;
    $("#progressPercent").textContent = `${percent}%`;
    $("#progressLabel").textContent = label;
    $(".progress-track").setAttribute("aria-valuenow", String(percent));
  };

  const showScreen = (screen, options = {}) => {
    $$(".flow-screen").forEach((item) => item.classList.toggle("active", item.dataset.screen === screen));
    state.screen = screen;
    setProgress(screen);
    const active = $(`.flow-screen[data-screen="${screen}"]`);
    if (active && options.focus !== false) {
      active.focus({ preventScroll: false });
      active.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    saveDraft();
  };

  const setError = (fieldId, message = "") => {
    const target = $(`[data-error-for="${fieldId}"]`);
    const field = $(`#${fieldId}`);
    if (target) target.textContent = message;
    if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const validateRequired = (id, message) => {
    const field = $(`#${id}`);
    const valid = Boolean(field?.value?.trim());
    setError(id, valid ? "" : message);
    return valid;
  };

  const selectService = (serviceType) => {
    if (!validServices.includes(serviceType)) return;
    state.serviceType = serviceType;
    $$("[data-service]").forEach((button) => button.classList.toggle("selected", button.dataset.service === serviceType));
    $("#serviceNext").disabled = false;
    $("#flowServiceLabel").textContent = WA.Config.serviceTypes[serviceType];
    updateConditionalFields();
    saveDraft();
  };

  const updateModels = (selected = "") => {
    const make = $("#make").value;
    const modelSelect = $("#model");
    if (!make) {
      modelSelect.disabled = true;
      modelSelect.innerHTML = '<option value="">اختر الشركة أولًا</option>';
      return;
    }
    modelSelect.disabled = false;
    WA.UI.initSelect(modelSelect, WA.Automotive.getModels(make), "اختر الموديل");
    if (selected && WA.Automotive.getModels(make).includes(selected)) modelSelect.value = selected;
  };

  const updateOtherFields = () => {
    const makeOther = $("#make").value === "أخرى";
    const modelOther = $("#model").value === "أخرى" || makeOther;
    $("#makeOtherField").hidden = !makeOther;
    $("#modelOtherField").hidden = !modelOther;
    $("#makeOther").required = makeOther;
    $("#modelOther").required = modelOther;
  };

  const updateConditionalFields = () => {
    const service = state.serviceType;
    const needsMileage = ["problem", "maintenance"].includes(service);
    $("#mileageField").hidden = !needsMileage;
    $("#mileage").required = needsMileage;
    const needsYear = service !== "tow";
    $("#year").required = needsYear;
    $("#yearLabel").classList.toggle("required", needsYear);
    const tow = service === "tow";
    $("#preciseLocationLabel").classList.toggle("required", tow);
    $("#preciseLocation").required = tow;
    $("#preciseLocationHint").textContent = tow
      ? "مطلوب لخدمة السطحة بسبب الحاجة التشغيلية."
      : "اختياري لتحسين المطابقة، ولا تظهر مسافة غير موثقة.";
    $("#locationHelp").textContent = tow
      ? "ابدأ بالمدينة ثم اكتب موقع السيارة بدقة حتى يمكن التنسيق مع مقدم السطحة."
      : "نبدأ بالمدينة، والموقع الدقيق اختياري ولا نستخدمه لاختلاق مسافة.";

    $("#problemFields").hidden = service !== "problem";
    $("#partsFields").hidden = service !== "parts";
    $("#towFields").hidden = service !== "tow";
    $("#maintenanceFields").hidden = service !== "maintenance";
    $("#problem").required = service === "problem";
    $("#vehicleMoves").required = service === "tow";
    $("#maintenanceService").required = service === "maintenance";

    const titles = {
      problem: ["وش المشكلة في سيارتك؟", "اشرح المشكلة بطريقتك، ولا تحتاج إلى معرفة المصطلحات الفنية."],
      parts: ["نبحث لك عن محل قطع غيار مناسب", "لا تكتب اسم القطعة هنا. ستسأل المحل مباشرة عن التوفر والسعر والمطابقة."],
      tow: ["وش وضع السيارة الآن؟", "حدد حالة الحركة والوجهة إن كانت معروفة."],
      maintenance: ["وش الصيانة المطلوبة؟", "اختر خدمة بسيطة ومباشرة، وأضف ملاحظة عند الحاجة."]
    };
    const [title, description] = titles[service] || ["تفاصيل الطلب", "أكمل البيانات المطلوبة."];
    $("#pathTitle").textContent = title;
    $("#pathDescription").textContent = description;
    $("#pathSubmit").textContent = service === "problem" ? "تحليل الطلب" : "مراجعة الطلب";
  };

  const syncStateFromFields = () => {
    state.customer.firstName = WA.Storage.sanitizeText($("#firstName").value, 40);
    state.customer.phone = WA.Storage.sanitizePhone($("#phone").value);
    state.consents.privacyAccepted = $("#privacyAccepted").checked;
    state.consents.termsAccepted = $("#termsAccepted").checked;
    state.consents.marketingMessages = $("#marketingMessages").checked;
    state.vehicle.make = $("#make").value;
    state.vehicle.makeOther = WA.Storage.sanitizeText($("#makeOther").value, 60);
    state.vehicle.model = $("#model").value;
    state.vehicle.modelOther = WA.Storage.sanitizeText($("#modelOther").value, 60);
    state.vehicle.year = $("#year").value;
    state.vehicle.mileage = $("#mileage").value;
    state.city = $("#city").value;
    state.preciseLocation = WA.Storage.sanitizeText($("#preciseLocation").value, 180);
    state.problem = WA.Storage.sanitizeText($("#problem").value, 1200);
    state.vehicleMoves = $("#vehicleMoves").value;
    state.towDestination = WA.Storage.sanitizeText($("#towDestination").value, 180);
    state.towNotes = WA.Storage.sanitizeText($("#towNotes").value, 500);
    state.maintenanceService = $("#maintenanceService").value;
    state.maintenanceNotes = WA.Storage.sanitizeText($("#maintenanceNotes").value, 500);
  };

  const hydrateFields = () => {
    $("#firstName").value = state.customer.firstName || "";
    $("#phone").value = state.customer.phone || "";
    $("#privacyAccepted").checked = Boolean(state.consents.privacyAccepted);
    $("#termsAccepted").checked = Boolean(state.consents.termsAccepted);
    $("#marketingMessages").checked = Boolean(state.consents.marketingMessages);
    $("#make").value = state.vehicle.make || "";
    updateModels(state.vehicle.model);
    $("#model").value = state.vehicle.model || "";
    $("#makeOther").value = state.vehicle.makeOther || "";
    $("#modelOther").value = state.vehicle.modelOther || "";
    $("#year").value = state.vehicle.year || "";
    $("#mileage").value = state.vehicle.mileage || "";
    $("#city").value = state.city || "";
    $("#preciseLocation").value = state.preciseLocation || "";
    $("#problem").value = state.problem || "";
    $("#vehicleMoves").value = state.vehicleMoves || "";
    $("#towDestination").value = state.towDestination || "";
    $("#towNotes").value = state.towNotes || "";
    $("#maintenanceService").value = state.maintenanceService || "";
    $("#maintenanceNotes").value = state.maintenanceNotes || "";
    updateOtherFields();
    if (state.serviceType) selectService(state.serviceType);
  };

  const validateCustomer = () => {
    let valid = validateRequired("firstName", "اكتب الاسم الأول");
    const phone = WA.Storage.sanitizePhone($("#phone").value);
    const phoneValid = /^05\d{8}$/.test(phone);
    setError("phone", phoneValid ? "" : "أدخل رقم جوال سعودي بصيغة 05XXXXXXXX");
    valid = valid && phoneValid;
    if (!$("#privacyAccepted").checked || !$("#termsAccepted").checked) {
      WA.UI.showToast("يلزم قبول الخصوصية والشروط لتشغيل الطلب", "error");
      valid = false;
    }
    return valid;
  };

  const validateVehicle = () => {
    let valid = true;
    ["make", "model"].forEach((id) => { valid = validateRequired(id, "هذا الحقل مطلوب") && valid; });
    if (state.serviceType !== "tow") valid = validateRequired("year", "اختر سنة الصنع") && valid;
    if ($("#make").value === "أخرى") valid = validateRequired("makeOther", "اكتب اسم الشركة") && valid;
    if ($("#model").value === "أخرى" || $("#make").value === "أخرى") valid = validateRequired("modelOther", "اكتب اسم الموديل") && valid;
    if (["problem", "maintenance"].includes(state.serviceType)) valid = validateRequired("mileage", "اختر ممشى السيارة") && valid;
    return valid;
  };

  const validateLocation = () => {
    let valid = validateRequired("city", "اختر المدينة");
    if (state.serviceType === "tow") valid = validateRequired("preciseLocation", "اكتب موقع السيارة لخدمة السطحة") && valid;
    return valid;
  };

  const validatePath = () => {
    let valid = true;
    if (state.serviceType === "problem") {
      const clean = WA.Storage.sanitizeText($("#problem").value, 1200);
      valid = clean.length >= 8;
      setError("problem", valid ? "" : "اكتب وصفًا أوضح للمشكلة بما لا يقل عن 8 أحرف");
    }
    if (state.serviceType === "tow") valid = validateRequired("vehicleMoves", "حدد هل السيارة تتحرك") && valid;
    if (state.serviceType === "maintenance") valid = validateRequired("maintenanceService", "اختر خدمة الصيانة") && valid;
    return valid;
  };

  const animateSteps = (selector, callback) => {
    const steps = $$(selector);
    steps.forEach((step) => step.classList.remove("active", "done"));
    steps[0]?.classList.add("active");
    steps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.remove("active");
        step.classList.add("done");
        steps[index + 1]?.classList.add("active");
        if (index === steps.length - 1) setTimeout(callback, 280);
      }, 420 * (index + 1));
    });
  };

  const runAnalysis = () => {
    showScreen("analyzing");
    animateSteps("#analysisSteps .loader-step", () => {
      const initial = WA.AIEngine.assess({ description: state.problem, vehicle: state.vehicle });
      state.ai = initial;
      state.questions = initial.questions || [];
      state.answers = [];
      state.questionIndex = 0;
      if (state.questions.length) renderQuestion();
      else renderGuidance();
    });
  };

  const renderQuestion = () => {
    const question = state.questions[state.questionIndex];
    if (!question) {
      state.ai = WA.AIEngine.finalize({ description: state.problem, vehicle: state.vehicle, questions: state.questions, answers: state.answers });
      renderGuidance();
      return;
    }
    $("#questionTitle").textContent = `سؤال ${state.questionIndex + 1} من ${state.questions.length}`;
    $("#questionText").textContent = question;
    const choices = $("#answerChoices");
    choices.replaceChildren();
    ["نعم", "لا", "غير متأكد"].forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-btn";
      button.textContent = answer;
      button.classList.toggle("selected", state.answers[state.questionIndex] === answer);
      button.addEventListener("click", () => {
        state.answers[state.questionIndex] = answer;
        $$(".choice-btn", choices).forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        $("#questionNext").disabled = false;
        saveDraft();
      });
      choices.appendChild(button);
    });
    $("#questionBack").disabled = state.questionIndex === 0;
    $("#questionNext").disabled = !state.answers[state.questionIndex];
    $("#questionNext").textContent = state.questionIndex === state.questions.length - 1 ? "عرض النتيجة" : "التالي";
    showScreen("questions");
  };

  const renderGuidance = () => {
    const ai = state.ai || WA.AIEngine.finalize({ description: state.problem, vehicle: state.vehicle, questions: state.questions, answers: state.answers });
    state.ai = ai;
    $("#expectedIssue").textContent = ai.expectedIssue;
    $("#specialty").textContent = ai.specialty;
    $("#urgency").textContent = ai.urgency;
    $("#nextStep").textContent = ai.nextStep;
    $("#legalNotice").textContent = ai.legalNotice;
    const danger = ai.urgency === "خطرة";
    $("#dangerPanel").hidden = !danger;
    $("#dangerPanel").innerHTML = danger
      ? `<strong>توجيه سلامة عاجل</strong><p>${WA.UI.escapeHtml(ai.nextStep)}</p>`
      : "";
    $("#findPartner").textContent = danger ? "الانتقال إلى خدمة السطحة" : "وين أوديها؟";
    showScreen("guidance");
  };

  const renderReview = () => {
    const vehicleText = `${state.vehicle.makeOther || state.vehicle.make} ${state.vehicle.modelOther || state.vehicle.model} ${state.vehicle.year}`;
    const data = [
      ["الخدمة", WA.Config.serviceTypes[state.serviceType]],
      ["السيارة", vehicleText],
      ["المدينة", state.city]
    ];
    if (state.serviceType === "parts") data.push(["الاحتياج", "الدلالة على محل مناسب لنوع السيارة دون طلب اسم القطعة"]);
    if (state.serviceType === "tow") {
      data.push(["موقع السيارة", state.preciseLocation], ["حالة الحركة", state.vehicleMoves], ["الوجهة", state.towDestination || "غير محددة"]);
    }
    if (state.serviceType === "maintenance") data.push(["الصيانة", state.maintenanceService], ["الممشى", state.vehicle.mileage]);
    $("#reviewContent").innerHTML = data.map(([label, value]) => `<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value)}</strong></div>`).join("");
    const disclaimers = {
      parts: "توفر القطعة وسعرها ومطابقتها للسيارة يتم التأكد منها مباشرة مع محل قطع الغيار. المنصة لا تبيع القطع ولا تؤكد المخزون.",
      tow: "السعر ووقت الوصول ونطاق التغطية النهائي تتأكد منها مباشرة مع مقدم السطحة. لا تعرض المنصة سعرًا تقديريًا.",
      maintenance: "السعر والموعد والتفاصيل النهائية تتفق عليها مباشرة مع مركز الصيانة. لا تعرض المنصة أسعارًا تقديرية."
    };
    $("#serviceDisclaimer").textContent = disclaimers[state.serviceType] || "";
    showScreen("review");
  };

  const requestPayload = () => ({
    requestId: state.requestId,
    serviceType: state.serviceType,
    customer: state.customer,
    consents: state.consents,
    vehicle: state.vehicle,
    city: state.city,
    preciseLocation: state.preciseLocation,
    problem: state.problem,
    vehicleMoves: state.vehicleMoves,
    towDestination: state.towDestination,
    notes: state.serviceType === "tow" ? state.towNotes : state.maintenanceNotes,
    maintenanceService: state.maintenanceService,
    ai: state.serviceType === "problem" ? { ...state.ai, questions: state.questions, answers: state.answers } : null
  });

  const runMatching = () => {
    showScreen("matching");
    let created;
    try {
      created = WA.Lifecycle.createRequest(requestPayload());
      state.requestId = created.request.id;
    } catch (error) {
      WA.UI.showToast(error.message, "error");
      showScreen("path");
      return;
    }

    const matchSteps = $$(".flow-screen[data-screen='matching'] .loader-step");
    matchSteps.forEach((step) => step.classList.remove("done", "active"));
    matchSteps[0]?.classList.add("active");
    matchSteps.forEach((step, index) => setTimeout(() => {
      step.classList.remove("active");
      step.classList.add("done");
      matchSteps[index + 1]?.classList.add("active");
    }, 330 * (index + 1)));

    setTimeout(() => {
      const previousPartnerIds = WA.Storage.get("wa_referrals").filter((row) => row.requestId === created.request.id).map((row) => row.partnerId);
      const result = WA.Matching.match({ request: created.request, excludedPartnerIds: previousPartnerIds });
      if (!result.partner) {
        WA.Storage.upsert("wa_requests", { ...created.request, status: "no_match", lastActivityAt: WA.Storage.now() });
        $("#noMatchReason").textContent = result.reason;
        showScreen("noMatch");
        return;
      }
      try {
        const referral = WA.Lifecycle.createReferral(created.request.id, result.partner.id, result.reason);
        state.referralId = referral.id;
        state.matchReason = result.reason;
        WA.Lifecycle.markReferralShown(referral.id);
        renderResult();
      } catch (error) {
        WA.UI.showToast(error.message, "error");
        $("#noMatchReason").textContent = error.message;
        showScreen("noMatch");
      }
    }, 1650);
  };

  const renderResult = () => {
    const request = WA.Storage.findById("wa_requests", state.requestId);
    const bundle = WA.UI.getRequestBundle(request);
    if (!bundle?.partner || !bundle.activeReferral) {
      $("#noMatchReason").textContent = "تعذر استعادة بيانات الإحالة. يمكنك متابعة الطلب من صفحة المتابعة.";
      showScreen("noMatch");
      return;
    }
    const { customer, vehicle, partner, activeReferral, discount } = bundle;
    state.referralId = activeReferral.id;
    $("#resultHeader").innerHTML = `
      <div class="kicker">تم إنشاء الطلب والإحالة قبل عرض الشريك</div>
      <h1>${WA.UI.escapeHtml(request.humanId)}</h1>
      <p>${WA.UI.escapeHtml(WA.Config.serviceTypes[request.serviceType])} — ${WA.UI.escapeHtml(request.city)}</p>
      <div class="request-meta"><span>${WA.UI.escapeHtml(WA.Config.requestStatuses[request.status] || request.status)}</span><span>الإحالة ${WA.UI.escapeHtml(activeReferral.order)} من 3</span></div>`;
    $("#partnerResult").innerHTML = WA.UI.renderPartnerCard({ partner, referral: activeReferral, discount, matchReason: activeReferral.matchReason });
    const privateUrl = new URL("track.html", location.href);
    privateUrl.searchParams.set("token", request.publicToken);
    $("#privateLink").value = privateUrl.href;
    $("#openTrackLink").href = `track.html?token=${encodeURIComponent(request.publicToken)}`;
    const message = WA.UI.buildWhatsappMessage({ request, customer, vehicle, partner });
    $("#whatsappLink").href = WA.UI.whatsappUrl(partner.whatsapp, message);
    $("#whatsappLink").onclick = () => WA.Lifecycle.markWhatsappOpened(activeReferral.id);
    $("#copyWhatsapp").onclick = () => WA.UI.copyText(message);
    WA.Lifecycle.clearDraft();
    showScreen("result");
  };

  const restoreResultIfPossible = () => {
    if (!state.requestId) return false;
    const request = WA.Storage.findById("wa_requests", state.requestId);
    if (!request) return false;
    if (request.status === "no_match") {
      $("#noMatchReason").textContent = "لا يوجد شريك مطابق حاليًا ضمن بيانات Seed التجريبية.";
      showScreen("noMatch", { focus: false });
      return true;
    }
    if (request.activeReferralId) {
      renderResult();
      return true;
    }
    return false;
  };

  const init = () => {
    WA.UI.initSelect($("#make"), WA.Automotive.makes, "اختر الشركة");
    WA.UI.initSelect($("#year"), WA.Automotive.buildYears(), "اختر السنة");
    WA.UI.initSelect($("#mileage"), WA.Automotive.mileages, "اختر الممشى");
    WA.UI.initSelect($("#city"), WA.Config.supportedCities, "اختر المدينة");
    WA.UI.initSelect($("#vehicleMoves"), WA.Automotive.vehicleMovementOptions, "اختر الحالة");
    WA.UI.initSelect($("#maintenanceService"), WA.Automotive.maintenanceServices, "اختر الصيانة");

    const params = new URLSearchParams(location.search);
    if (params.get("fresh") === "1") WA.Lifecycle.clearDraft();
    const restored = params.get("fresh") === "1" ? null : WA.Lifecycle.loadDraft();
    state = restored ? { ...defaultState(), ...restored } : defaultState();
    const requestedService = params.get("service");
    if (validServices.includes(requestedService)) state.serviceType = requestedService;
    hydrateFields();

    $$("[data-service]").forEach((button) => button.addEventListener("click", () => selectService(button.dataset.service)));
    $("#serviceNext").addEventListener("click", () => state.serviceType ? showScreen("customer") : WA.UI.showToast("اختر الخدمة أولًا", "error"));
    $$("[data-back]").forEach((button) => button.addEventListener("click", () => showScreen(button.dataset.back)));

    $("#make").addEventListener("change", () => { updateModels(); updateOtherFields(); syncStateFromFields(); saveDraft(); });
    $("#model").addEventListener("change", () => { updateOtherFields(); syncStateFromFields(); saveDraft(); });
    $$('input, select, textarea').forEach((field) => field.addEventListener("input", () => { syncStateFromFields(); saveDraft(); }));

    $("#customerForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateCustomer()) return;
      syncStateFromFields();
      showScreen("vehicle");
    });
    $("#vehicleForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateVehicle()) return;
      syncStateFromFields();
      showScreen("location");
    });
    $("#locationForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateLocation()) return;
      syncStateFromFields();
      showScreen("path");
    });
    $("#pathForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validatePath()) return;
      syncStateFromFields();
      if (state.serviceType === "problem") runAnalysis();
      else renderReview();
    });

    $("#questionBack").addEventListener("click", () => {
      if (state.questionIndex > 0) { state.questionIndex -= 1; renderQuestion(); }
      else showScreen("path");
    });
    $("#questionNext").addEventListener("click", () => {
      if (!state.answers[state.questionIndex]) return;
      if (state.questionIndex < state.questions.length - 1) { state.questionIndex += 1; renderQuestion(); }
      else {
        state.ai = WA.AIEngine.finalize({ description: state.problem, vehicle: state.vehicle, questions: state.questions, answers: state.answers });
        renderGuidance();
      }
    });
    $("#findPartner").addEventListener("click", () => {
      if (state.ai?.urgency === "خطرة") {
        selectService("tow");
        updateConditionalFields();
        WA.UI.showToast("تم تحويل المسار إلى السطحة. أكمل موقع السيارة وحالتها.", "info");
        showScreen("location");
        return;
      }
      runMatching();
    });
    $("#reviewMatch").addEventListener("click", runMatching);
    $("#copyPrivateLink").addEventListener("click", () => WA.UI.copyText($("#privateLink").value));

    if (restoreResultIfPossible()) return;
    if (state.screen === "analyzing") { runAnalysis(); return; }
    if (state.screen === "questions" && state.questions.length) { renderQuestion(); return; }
    if (state.screen === "guidance" && state.ai) { renderGuidance(); return; }
    if (state.screen === "review") { renderReview(); return; }
    if (state.screen === "matching") { runMatching(); return; }
    showScreen(state.screen || "service", { focus: false });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
