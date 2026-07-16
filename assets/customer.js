(() => {
  "use strict";

  const state = {
    mode: "",
    service: "",
    problem: "",
    customer: { name: "", phone: "" },
    vehicle: { make: "", model: "", year: "", mileage: "" },
    city: "",
    scenario: "general",
    specialty: "",
    guidance: "",
    questions: [],
    answers: [],
    questionIndex: 0,
    requestId: "",
    currentReferral: 0,
    request: null,
    pendingAlternativeReason: ""
  };

  const scenarioData = {
    engine: {
      keys: ["رج", "رجفة", "مكينة", "محرك", "عزم", "لمبة", "تقطيع", "تنتيع"],
      specialty: "ميكانيكا وكهرباء محرك",
      guidance: "المشكلة قد تكون مرتبطة بأداء المحرك أو أحد الأنظمة المؤثرة على عمله أثناء الوقوف، وتحتاج إلى فحص متخصص قبل تحديد السبب النهائي.",
      questions: [
        { text: "هل تظهر لمبة المكينة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تحدث المشكلة أثناء الوقوف فقط؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تخف المشكلة عند الضغط على دواسة الوقود؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل لاحظت ضعفًا في عزم السيارة؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    },
    ac: {
      keys: ["مكيف", "تبريد", "يبرد", "حر", "كمبروسر", "هواء"],
      specialty: "تكييف وكهرباء سيارات",
      guidance: "الوصف يشير مبدئيًا إلى مشكلة في كفاءة نظام التكييف أو أحد مكوناته المرتبطة بالتبريد، ويحتاج النظام إلى فحص متخصص لتحديد السبب.",
      questions: [
        { text: "هل يبرد المكيف بشكل أفضل أثناء المشي؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل الهواء الخارج من الفتحات قوي كالمعتاد؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تسمع صوتًا غير معتاد عند تشغيل المكيف؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    },
    suspension: {
      keys: ["طقطقة", "صوت", "مطب", "مطبات", "تعليق", "مساعد", "دركسون", "اهتزاز"],
      specialty: "عفشة وتعليق وتوجيه",
      guidance: "الأعراض قد تكون مرتبطة بأحد مكونات نظام التعليق أو التوجيه، ويحتاج تحديد السبب إلى فحص الجزء الأمامي ومكونات العفشة بشكل مباشر.",
      questions: [
        { text: "هل يظهر الصوت أكثر عند المطبات؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تشعر باهتزاز في المقود أثناء القيادة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل الصوت من جهة أمامية محددة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل لاحظت أن السيارة تميل إلى جهة أثناء القيادة؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    },
    general: {
      keys: [],
      specialty: "فحص وتشخيص عام",
      guidance: "الوصف يحتاج إلى فحص فني أولي لتحديد النظام المرتبط بالمشكلة بدقة قبل الوصول إلى سبب نهائي أو إجراء إصلاح.",
      questions: [
        { text: "هل بدأت المشكلة بشكل مفاجئ؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تظهر المشكلة في كل مرة تستخدم فيها السيارة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل ظهرت أي لمبة تحذير في الطبلون؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    }
  };

  const progress = {
    mode: [0, "بداية الطلب"],
    maintenance: [14, "اختيار الخدمة"],
    problem: [14, "وصف المشكلة"],
    customer: [28, "بيانات العميل"],
    vehicle: [42, "بيانات السيارة"],
    location: [56, "الموقع"],
    analyzing: [66, "التحليل المبدئي"],
    questions: [74, "الأسئلة التوضيحية"],
    guidance: [84, "التوجيه الفني"],
    maintenanceSummary: [84, "مراجعة الطلب"],
    matching: [93, "مطابقة الورش"],
    result: [100, "تم إنشاء الطلب"]
  };

  const screens = [...document.querySelectorAll(".flow-screen")];

  const showScreen = (name) => {
    screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === name));
    const [percent, label] = progress[name] || [0, ""];
    document.querySelector("#flowProgressBar").style.width = `${percent}%`;
    document.querySelector("#flowPercent").textContent = `${percent}%`;
    document.querySelector("#flowStepText").textContent = label;
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveDraft(name);
  };

  const saveDraft = (screen) => {
    WA.storage.set("wa_customer_draft", { ...state, screen, request: null });
  };

  const fieldInvalid = (name, invalid) => {
    document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", invalid);
  };

  const detectScenario = (text) => {
    const normalized = text.toLowerCase();
    const ranked = ["engine", "ac", "suspension"]
      .map((name) => ({
        name,
        score: scenarioData[name].keys.reduce((score, key) => score + (normalized.includes(key) ? 1 : 0), 0)
      }))
      .sort((a, b) => b.score - a.score);
    return ranked[0].score > 0 ? ranked[0].name : "general";
  };

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);

  const getNextReferralCandidate = () => {
    const poolKey = state.mode === "maintenance" ? "maintenance" : state.scenario;
    const excluded = state.request?.referrals?.map((item) => item.workshop?.id) || [];
    return WA.getWorkshopPool(poolKey, state.city, excluded)[0] || null;
  };

  const createRequest = () => {
    if (state.request) {
      const result = WA.createAlternativeReferral(state.request, state.pendingAlternativeReason || "غير محدد");
      state.pendingAlternativeReason = "";
      if (result.error) return result;
      state.request = result.request;
      state.currentReferral = result.request.currentReferral;
      return result;
    }

    const now = new Date().toISOString();
    const workshop = getNextReferralCandidate();
    if (!workshop) return { error: "لا توجد ورشة متاحة ضمن البيانات التجريبية." };
    const referralId = WA.randomId("RF", 5);
    const requestId = state.requestId || WA.randomId("WA", 5);
    state.requestId = requestId;

    const referral = {
      referralId,
      order: 1,
      workshop,
      status: "تم ترشيحها للعميل",
      createdAt: now
    };

    const request = {
      id: requestId,
      createdAt: now,
      type: state.mode,
      scenario: state.mode === "maintenance" ? "maintenance" : state.scenario,
      customer: { ...state.customer },
      vehicle: { ...state.vehicle },
      city: state.city,
      service: state.mode === "maintenance" ? state.service : "فحص وتشخيص للمشكلة",
      problem: state.mode === "problem" ? state.problem : "",
      specialty: state.mode === "maintenance" ? "صيانة دورية وخدمات سريعة" : state.specialty,
      guidance: state.mode === "problem" ? state.guidance : "",
      answers: state.mode === "problem" ? [...state.answers] : [],
      status: "تم ترشيح ورشة",
      customerConfirmation: "بانتظار المتابعة",
      referrals: [referral],
      currentReferral: 0,
      rated: false
    };
    WA.saveRequest(request);

    const referrals = WA.storage.get("wa_referrals", []);
    referrals.unshift({
      referralId,
      requestId,
      customer: state.customer.name,
      phone: state.customer.phone,
      car: `${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.year}`,
      city: state.city,
      service: state.mode === "maintenance" ? state.service : state.problem.slice(0, 80),
      specialty: request.specialty,
      status: "تم ترشيحها للعميل",
      createdAt: now,
      updatedAt: now,
      feeEligible: false,
      feeId: null,
      workshopId: workshop.id
    });
    WA.storage.set("wa_referrals", referrals);
    state.request = request;
    WA.storage.remove("wa_customer_draft");
    return { request, referral, workshop };
  };

  const runMatching = () => {
    showScreen("matching");
    setTimeout(() => {
      const result = createRequest();
      if (result.error) {
        WA.toast(result.error);
        showScreen(state.mode === "maintenance" ? "maintenanceSummary" : "guidance");
        return;
      }
      renderResult(result.workshop);
      showScreen("result");
    }, 1650);
  };

  const renderResult = (workshop) => {
    document.querySelector("#resultWorkshopName").textContent = workshop.name;
    document.querySelector("#resultRequestId").textContent = state.requestId;
    document.querySelector("#resultRating").textContent = workshop.rating;
    document.querySelector("#resultFairness").textContent = workshop.fairness;
    document.querySelector("#resultRatingsCount").textContent = `${workshop.ratingsCount} تقييمًا`;
    document.querySelector("#resultDistance").textContent = workshop.distance;
    document.querySelector("#resultCity").textContent = workshop.city;
    document.querySelector("#resultSpecialty").textContent = workshop.specialty;
    document.querySelector("#resultCommitment").textContent = workshop.commitment;
    document.querySelector("#resultRecommend").textContent = `${workshop.recommend}%`;
    document.querySelector("#resultReason").textContent = workshop.reason;
    document.querySelector("#trackRequestLink").href = `track.html?id=${encodeURIComponent(state.requestId)}&phone=${encodeURIComponent(state.customer.phone)}`;
    document.querySelector("#resultIntro").textContent = state.request.referrals.length === 1
      ? "تم إنشاء الطلب وتسجيل الإحالة قبل إظهار بيانات الورشة."
      : `تم استبعاد الورشة السابقة وتسجيل الإحالة رقم ${state.request.referrals.length} داخل نفس الطلب.`;
  };

  const createWhatsappMessage = () => {
    const current = state.request.referrals[state.request.currentReferral];
    return WA.buildWhatsappMessage(state.request, current.workshop);
  };

  const renderQuestion = () => {
    const question = state.questions[state.questionIndex];
    document.querySelector("#questionCount").textContent = `السؤال ${state.questionIndex + 1} من ${state.questions.length}`;
    document.querySelector("#questionText").textContent = question.text;
    const grid = document.querySelector("#answerGrid");
    grid.innerHTML = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-btn";
      button.textContent = answer;
      if (state.answers[state.questionIndex] === answer) button.classList.add("selected");
      button.addEventListener("click", () => {
        state.answers[state.questionIndex] = answer;
        [...grid.children].forEach((child) => child.classList.remove("selected"));
        button.classList.add("selected");
        document.querySelector("#questionNext").disabled = false;
      });
      grid.appendChild(button);
    });
    const next = document.querySelector("#questionNext");
    next.disabled = !state.answers[state.questionIndex];
    next.textContent = state.questionIndex === state.questions.length - 1 ? "عرض التوجيه المبدئي" : "التالي";
    document.querySelector("#questionBack").disabled = state.questionIndex === 0;
  };

  const runAnalysis = () => {
    showScreen("analyzing");
    const steps = [...document.querySelectorAll("#analysisSteps .loader-step")];
    steps.forEach((step, index) => {
      step.classList.remove("active", "done");
      step.querySelector(".dot").textContent = "";
      if (index === 0) step.classList.add("active");
    });
    let index = 0;
    const timer = setInterval(() => {
      steps[index].classList.remove("active");
      steps[index].classList.add("done");
      steps[index].querySelector(".dot").textContent = "✓";
      index += 1;
      if (index < steps.length) steps[index].classList.add("active");
      else {
        clearInterval(timer);
        state.scenario = detectScenario(state.problem);
        const scenario = scenarioData[state.scenario];
        state.specialty = scenario.specialty;
        state.guidance = scenario.guidance;
        state.questions = scenario.questions;
        state.answers = new Array(state.questions.length).fill(null);
        state.questionIndex = 0;
        setTimeout(() => {
          renderQuestion();
          showScreen("questions");
        }, 350);
      }
    }, 570);
  };

  const renderGuidance = () => {
    document.querySelector("#guidanceVehicle").textContent = `${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.year} — ${state.vehicle.mileage}`;
    document.querySelector("#guidanceProblem").textContent = state.problem;
    document.querySelector("#guidanceText").textContent = state.guidance;
    document.querySelector("#guidanceSpecialty").textContent = state.specialty;
  };

  const renderMaintenanceSummary = () => {
    document.querySelector("#maintenanceSummaryService").textContent = state.service;
    document.querySelector("#maintenanceSummaryVehicle").textContent = `${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.year} — ${state.vehicle.mileage}`;
    document.querySelector("#maintenanceSummaryCity").textContent = state.city;
  };

  const validateCustomer = () => {
    const name = document.querySelector("#customerName").value.trim();
    const phone = normalizePhone(document.querySelector("#customerPhone").value);
    const nameValid = name.length >= 2;
    const phoneValid = /^05\d{8}$/.test(phone);
    fieldInvalid("name", !nameValid);
    fieldInvalid("phone", !phoneValid);
    if (!nameValid || !phoneValid) return false;
    state.customer = { name, phone };
    return true;
  };

  const validateVehicle = () => {
    const vehicle = {
      make: document.querySelector("#vehicleMake").value,
      model: document.querySelector("#vehicleModel").value.trim(),
      year: document.querySelector("#vehicleYear").value,
      mileage: document.querySelector("#vehicleMileage").value
    };
    const validity = {
      make: Boolean(vehicle.make),
      model: vehicle.model.length >= 2,
      year: Boolean(vehicle.year),
      mileage: Boolean(vehicle.mileage)
    };
    Object.entries(validity).forEach(([key, valid]) => fieldInvalid(key, !valid));
    if (!Object.values(validity).every(Boolean)) return false;
    state.vehicle = vehicle;
    return true;
  };

  const initServices = () => {
    const icons = ["⛽", "▦", "◉", "▣", "◎", "⌁", "❄", "+"];
    const mount = document.querySelector("#maintenanceServices");
    mount.innerHTML = WA.maintenanceServices.map((service, index) => `
      <button class="service-card" type="button" data-service="${WA.escapeHTML(service)}">
        <span aria-hidden="true" style="font-size:24px">${icons[index]}</span>
        <span>${WA.escapeHTML(service)}</span>
      </button>`).join("");

    mount.querySelectorAll("[data-service]").forEach((button) => {
      button.addEventListener("click", () => {
        mount.querySelectorAll(".service-card").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        state.service = button.dataset.service;
        document.querySelector("#maintenanceNext").disabled = false;
        document.querySelector("#otherServiceField").classList.toggle("hidden", state.service !== "خدمة أخرى");
      });
    });
  };

  const init = () => {
    WA.fillSelect("#vehicleMake", WA.makes, "اختر الشركة");
    WA.fillSelect("#customerCity", WA.cities, "اختر المدينة أو المحافظة");
    initServices();

    document.querySelectorAll("[data-back]").forEach((button) => {
      button.addEventListener("click", () => showScreen(button.dataset.back));
    });

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-mode]").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        state.mode = button.dataset.mode;
        document.querySelector("#modeNext").disabled = false;
      });
    });

    document.querySelector("#modeNext").addEventListener("click", () => {
      if (!state.mode) return;
      showScreen(state.mode === "maintenance" ? "maintenance" : "problem");
    });

    document.querySelector("#maintenanceNext").addEventListener("click", () => {
      if (!state.service) return;
      if (state.service === "خدمة أخرى") {
        const other = document.querySelector("#otherService").value.trim();
        const valid = other.length >= 3;
        document.querySelector("#otherServiceField").classList.toggle("invalid", !valid);
        if (!valid) return;
        state.service = other;
      }
      showScreen("customer");
    });

    const problemText = document.querySelector("#problemText");
    problemText.addEventListener("input", () => {
      document.querySelector("#problemCount").textContent = problemText.value.length;
      fieldInvalid("problem", false);
    });
    document.querySelectorAll(".example-problem").forEach((button) => {
      button.addEventListener("click", () => {
        problemText.value = button.dataset.text;
        problemText.dispatchEvent(new Event("input"));
      });
    });
    document.querySelector("#problemNext").addEventListener("click", () => {
      const value = problemText.value.trim();
      const valid = value.length >= 12;
      fieldInvalid("problem", !valid);
      if (!valid) return;
      state.problem = value;
      showScreen("customer");
    });

    document.querySelector("#customerPhone").addEventListener("input", (event) => {
      event.target.value = normalizePhone(event.target.value);
      fieldInvalid("phone", false);
    });
    document.querySelector("#customerName").addEventListener("input", () => fieldInvalid("name", false));
    document.querySelector("#customerBack").addEventListener("click", () => showScreen(state.mode === "maintenance" ? "maintenance" : "problem"));
    document.querySelector("#customerNext").addEventListener("click", () => {
      if (validateCustomer()) showScreen("vehicle");
    });

    document.querySelector("#vehicleNext").addEventListener("click", () => {
      if (validateVehicle()) showScreen("location");
    });

    document.querySelector("#useMockLocation").addEventListener("click", () => {
      const button = document.querySelector("#useMockLocation");
      button.disabled = true;
      button.textContent = "جاري تحديد الموقع…";
      setTimeout(() => {
        state.city = "بريدة";
        document.querySelector("#customerCity").value = "بريدة";
        document.querySelector("#locationNotice").classList.remove("hidden");
        button.disabled = false;
        button.textContent = "استخدام موقعي الحالي — محاكاة";
        fieldInvalid("city", false);
      }, 700);
    });
    document.querySelector("#customerCity").addEventListener("change", (event) => {
      state.city = event.target.value;
      document.querySelector("#locationNotice").classList.add("hidden");
      fieldInvalid("city", false);
    });
    document.querySelector("#locationNext").addEventListener("click", () => {
      state.city = state.city || document.querySelector("#customerCity").value;
      fieldInvalid("city", !state.city);
      if (!state.city) return;
      if (state.mode === "maintenance") {
        renderMaintenanceSummary();
        showScreen("maintenanceSummary");
      } else {
        runAnalysis();
      }
    });

    document.querySelector("#questionBack").addEventListener("click", () => {
      if (state.questionIndex > 0) {
        state.questionIndex -= 1;
        renderQuestion();
      }
    });
    document.querySelector("#questionNext").addEventListener("click", () => {
      if (!state.answers[state.questionIndex]) return;
      if (state.questionIndex < state.questions.length - 1) {
        state.questionIndex += 1;
        renderQuestion();
      } else {
        renderGuidance();
        showScreen("guidance");
      }
    });

    document.querySelector("#guidanceMatch").addEventListener("click", runMatching);
    document.querySelector("#maintenanceMatch").addEventListener("click", runMatching);

    document.querySelector("#openWhatsapp").addEventListener("click", () => {
      const current = state.request.referrals[state.request.currentReferral];
      const message = createWhatsappMessage();
      document.querySelector("#whatsappMessage").textContent = message;
      document.querySelector("#openWhatsappLink").href = WA.buildWhatsappUrl(state.request, current.workshop);
      WA.openModal("#whatsappModal");
    });
    document.querySelector("#copyWhatsappMessage").addEventListener("click", async () => {
      const message = createWhatsappMessage();
      try {
        await navigator.clipboard.writeText(message);
        WA.toast("تم نسخ رسالة واتساب.");
      } catch (_) {
        WA.toast("تعذر النسخ التلقائي. يمكنك تحديد النص ونسخه يدويًا.");
      }
    });
    document.querySelector("#openWhatsappLink").addEventListener("click", () => {
      WA.markWhatsappOpened(state.request);
      WA.closeModals();
    });

    document.querySelector("#anotherWorkshop").addEventListener("click", () => {
      if (!state.request) return;
      if (state.request.referrals.length >= 3) {
        WA.toast("وصل الطلب إلى الحد الأقصى: 3 ورش.");
        return;
      }
      WA.openModal("#anotherModal");
    });
    document.querySelector("#confirmAnotherWorkshop").addEventListener("click", () => {
      const selected = document.querySelector('input[name="anotherReason"]:checked');
      state.pendingAlternativeReason = selected ? selected.value : "غير محدد";
      WA.closeModals();
      runMatching();
    });

    const draft = WA.storage.get("wa_customer_draft", null);
    if (draft && !WA.getQuery("fresh")) {
      // Keep the prototype predictable: restore only basic fields, not an in-progress request.
      if (draft.customer?.name) document.querySelector("#customerName").value = draft.customer.name;
      if (draft.customer?.phone) document.querySelector("#customerPhone").value = draft.customer.phone;
      if (draft.vehicle?.make) document.querySelector("#vehicleMake").value = draft.vehicle.make;
      if (draft.vehicle?.model) document.querySelector("#vehicleModel").value = draft.vehicle.model;
      if (draft.vehicle?.year) document.querySelector("#vehicleYear").value = draft.vehicle.year;
      if (draft.vehicle?.mileage) document.querySelector("#vehicleMileage").value = draft.vehicle.mileage;
      if (draft.city) document.querySelector("#customerCity").value = draft.city;
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
