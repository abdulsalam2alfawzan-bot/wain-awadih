# الكود الكامل للمشروع
> هذا الملف مولد آليًا من الملفات الفعلية داخل المشروع بعد الاختبارات النهائية.

## `.nojekyll`

```text

```

## `404.html`

```html
<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"><title>الصفحة غير موجودة — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css"></head>
<body><div data-site-header></div><main id="main-content" class="section"><div class="container empty-state"><div class="path-icon">404</div><h1>الصفحة غير موجودة</h1><p>الرابط غير صحيح أو نُقلت الصفحة.</p><div class="button-row"><a class="btn btn-primary" href="index.html">الرئيسية</a><a class="btn btn-light" href="track.html">متابعة طلب</a></div></div></main><div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script></body></html>

```

## `_headers`

```text
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(self), camera=(), microphone=(), payment=()
  Cross-Origin-Opener-Policy: same-origin

```

## `assets/ai-engine.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const normalize = (text) => String(text || "")
    .toLowerCase()
    .replace(/[إأآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\u0600-\u06FFa-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const dangerousRules = [
    { keys: ["فرامل ما تمسك", "فرامل ضعيف", "بريك ما يمسك", "فقدت الفرامل"], label: "مؤشر واضح على ضعف أو فقدان الفرامل" },
    { keys: ["دركسون قفل", "دركسون ثقيل جدا", "ما اقدر اوجه", "فقد التوجيه"], label: "مؤشر خطير في نظام التوجيه" },
    { keys: ["حراره مرتفعه", "الحراره للاخير", "غليان", "المكينه تحتر"], label: "ارتفاع شديد في حرارة المحرك" },
    { keys: ["ريحه بنزين", "رائحه وقود", "تسريب بنزين", "تسرب وقود"], label: "احتمال وجود رائحة أو تسرب وقود" },
    { keys: ["دخان كثيف", "دخان كثير", "دخان من المكينه"], label: "خروج دخان كثيف" },
    { keys: ["وسط الطريق", "في طريق سريع", "مكان خطر", "السياره واقفه بالشارع"], label: "توقف المركبة في موقع قد يكون خطرًا" }
  ];

  const scenarios = [
    {
      id: "brakes",
      keywords: ["فرامل", "بريك", "دعسه الفرامل", "صوت مع الفرامل", "رجفه فرامل"],
      expectedIssue: "قد تكون الأعراض مرتبطة بنظام الفرامل أو أحد مكوناته، ولا يمكن تأكيد السبب إلا بعد الفحص الفعلي.",
      specialty: "فحص فرامل",
      urgency: "عالية",
      nextStep: "قلل القيادة غير الضرورية وتوجه إلى ورشة متخصصة لفحص نظام الفرامل في أقرب وقت.",
      questions: [
        "هل تشعر أن مسافة التوقف أصبحت أطول من المعتاد؟",
        "هل تظهر لمبة تحذير للفرامل؟",
        "هل يوجد صوت احتكاك أو طحن عند الضغط على الفرامل؟"
      ]
    },
    {
      id: "engine",
      keywords: ["رجفه", "رج", "تقطيع", "تنتيع", "ضعف عزم", "عزم", "مكينه", "محرك", "لمبه المكينه"],
      expectedIssue: "قد تكون الأعراض مرتبطة بأداء المحرك أو أحد الأنظمة المؤثرة على الاحتراق أو دخول الهواء، ولا يمكن تأكيد السبب إلا بعد الفحص.",
      specialty: "ميكانيكا وكهرباء محرك",
      urgency: "متوسطة",
      nextStep: "إجراء فحص متخصص للمحرك وقراءة أنظمة السيارة قبل استبدال أي قطعة.",
      questions: [
        "هل تظهر لمبة المكينة أو لمبة تحذير أخرى؟",
        "هل تحدث المشكلة أثناء الوقوف فقط؟",
        "هل لاحظت ضعفًا واضحًا في عزم السيارة؟"
      ]
    },
    {
      id: "ac",
      keywords: ["مكيف", "تبريد", "يبرد", "هواء حار", "كمبروسر", "المكيف حار"],
      expectedIssue: "قد تكون المشكلة مرتبطة بكفاءة نظام التكييف أو أحد مكوناته الكهربائية أو الميكانيكية، ولا يمكن تحديد السبب قبل الفحص.",
      specialty: "تكييف وكهرباء سيارات",
      urgency: "منخفضة",
      nextStep: "احجز فحصًا لنظام التكييف وتأكد من سبب ضعف التبريد قبل تنفيذ أي إصلاح.",
      questions: [
        "هل يبرد المكيف بشكل أفضل أثناء المشي؟",
        "هل قوة الهواء من الفتحات طبيعية؟",
        "هل تسمع صوتًا غير معتاد عند تشغيل المكيف؟"
      ]
    },
    {
      id: "suspension",
      keywords: ["طقطقه", "مطب", "مطبات", "عفشه", "مساعد", "دركسون", "اهتزاز", "صوت من الامام"],
      expectedIssue: "قد تكون الأعراض مرتبطة بأحد مكونات التعليق أو التوجيه أو الأجزاء الأمامية، ويحتاج السبب إلى فحص مباشر.",
      specialty: "عفشة وتعليق وتوجيه",
      urgency: "متوسطة",
      nextStep: "إجراء فحص للعفشة والتوجيه والأجزاء الأمامية قبل الاستمرار في الرحلات الطويلة.",
      questions: [
        "هل يظهر الصوت أكثر عند المطبات؟",
        "هل تشعر باهتزاز في المقود أثناء القيادة؟",
        "هل تميل السيارة إلى جهة أثناء السير؟"
      ]
    },
    {
      id: "electrical",
      keywords: ["بطاريه", "ما تشتغل", "سلف", "انوار", "كهرباء", "تطفى", "تشغيل"],
      expectedIssue: "قد تكون الأعراض مرتبطة بمنظومة التشغيل أو الشحن أو أحد الدوائر الكهربائية، ولا يمكن الجزم قبل القياس والفحص.",
      specialty: "كهرباء سيارات",
      urgency: "متوسطة",
      nextStep: "إجراء فحص كهربائي لمنظومة التشغيل والشحن قبل تغيير أي مكوّن.",
      questions: [
        "هل تسمع صوت السلف عند محاولة التشغيل؟",
        "هل تضعف أنوار السيارة عند التشغيل؟",
        "هل توقفت السيارة أثناء القيادة؟"
      ]
    },
    {
      id: "transmission",
      keywords: ["قير", "ناقل", "تعشيق", "نتعه قير", "ما يغير", "تبديل"],
      expectedIssue: "قد تكون الأعراض مرتبطة بعمل ناقل الحركة أو نظام التحكم به، ولا يمكن تحديد السبب دون فحص متخصص.",
      specialty: "فحص ناقل حركة",
      urgency: "عالية",
      nextStep: "تجنب الضغط على السيارة واحجز فحصًا متخصصًا لناقل الحركة في أقرب وقت.",
      questions: [
        "هل تظهر المشكلة عند التعشيق أم أثناء تبديل السرعات؟",
        "هل ظهرت لمبة تحذير في الطبلون؟",
        "هل تسمع صوتًا غير معتاد مع التبديل؟"
      ]
    }
  ];

  const containsAny = (text, keys) => keys.some((key) => text.includes(normalize(key)));

  const detectDanger = (description, answers = []) => {
    const combined = normalize(`${description} ${answers.join(" ")}`);
    const matches = dangerousRules.filter((rule) => containsAny(combined, rule.keys));
    return {
      isDangerous: matches.length > 0,
      reasons: matches.map((match) => match.label)
    };
  };

  const classify = (description) => {
    const text = normalize(description);
    const ranked = scenarios.map((scenario) => ({
      scenario,
      score: scenario.keywords.reduce((total, keyword) => total + (text.includes(normalize(keyword)) ? 1 : 0), 0)
    })).sort((a, b) => b.score - a.score);
    return ranked[0].score > 0 ? ranked[0] : { scenario: null, score: 0 };
  };

  const assess = ({ description = "", vehicle = {}, answers = [] }) => {
    const cleanDescription = WA.Storage.sanitizeText(description, 1200);
    const danger = detectDanger(cleanDescription, answers);
    const classification = classify(cleanDescription);
    const wordCount = normalize(cleanDescription).split(" ").filter(Boolean).length;
    const enoughDetail = wordCount >= 6 || cleanDescription.length >= 35;

    if (danger.isDangerous) {
      return {
        scenarioId: "danger",
        sufficient: true,
        confidence: "مؤشر خطر يحتاج تصرفًا احترازيًا",
        questions: [],
        expectedIssue: `توجد مؤشرات خطرة محتملة: ${danger.reasons.join("، ")}. لا يمكن تأكيد السبب دون فحص فعلي.`,
        specialty: "مساندة عاجلة ونقل آمن للمركبة",
        urgency: "خطرة",
        nextStep: "أوقف السيارة في موقع آمن إن أمكن، ولا تستمر في القيادة إذا كان ذلك غير آمن، واستخدم خدمة سطحة أو تواصل مع الجهة المناسبة للحالة.",
        legalNotice: "هذا توقع وتوجيه فني مبدئي مبني على المعلومات التي أدخلتها، ولا يمثل تشخيصًا نهائيًا. عند وجود خطر مباشر على الأشخاص أو الطريق تواصل مع جهة الطوارئ المناسبة.",
        dangerReasons: danger.reasons
      };
    }

    if (!classification.scenario) {
      const questions = cleanDescription.length < 18 ? [
        "هل ظهرت لمبة تحذير في الطبلون؟",
        "هل بدأت المشكلة بشكل مفاجئ؟",
        "هل تؤثر المشكلة على قدرة السيارة على الحركة؟"
      ] : [
        "هل ظهرت لمبة تحذير في الطبلون؟",
        "هل تتكرر المشكلة في كل مرة؟"
      ];
      return {
        scenarioId: "general",
        sufficient: false,
        confidence: "المعلومات محدودة",
        questions: questions.slice(0, 3),
        expectedIssue: "لا تتوفر معلومات كافية لتحديد المشكلة المتوقعة بدقة، لكن البداية الأنسب هي فحص وتشخيص عام.",
        specialty: "فحص وتشخيص عام",
        urgency: "غير محددة",
        nextStep: "ابدأ بفحص تشخيصي عام لدى ورشة مؤهلة، وامتنع عن القيادة إذا ظهرت أعراض تجعلها غير آمنة.",
        legalNotice: "هذا توقع وتوجيه فني مبدئي مبني على المعلومات التي أدخلتها، ويهدف إلى الوصول إلى التخصص المناسب. لا يمثل تشخيصًا نهائيًا.",
        dangerReasons: []
      };
    }

    const scenario = classification.scenario;
    let questionCount = 0;
    if (!enoughDetail || classification.score === 1) questionCount = 2;
    if (cleanDescription.length < 15) questionCount = 3;
    if (classification.score >= 2 && enoughDetail) questionCount = 0;

    return {
      scenarioId: scenario.id,
      sufficient: questionCount === 0,
      confidence: classification.score >= 2 ? "توجيه أولي جيد" : "توجيه يحتاج توضيحًا بسيطًا",
      questions: scenario.questions.slice(0, questionCount),
      expectedIssue: scenario.expectedIssue,
      specialty: scenario.specialty,
      urgency: scenario.urgency,
      nextStep: scenario.nextStep,
      legalNotice: "هذا توقع وتوجيه فني مبدئي مبني على المعلومات التي أدخلتها، ويهدف إلى مساعدتك في فهم الاحتمال الأقرب والوصول إلى التخصص المناسب. لا يمثل تشخيصًا نهائيًا، وقد تختلف النتيجة بعد فحص السيارة فعليًا.",
      dangerReasons: []
    };
  };

  const finalize = ({ description, vehicle, questions = [], answers = [] }) => {
    const result = assess({ description, vehicle, answers });
    const danger = detectDanger(description, answers);
    if (danger.isDangerous) return assess({ description: `${description} ${answers.join(" ")}`, vehicle, answers });
    return {
      ...result,
      sufficient: true,
      questions,
      answers,
      confidence: answers.length ? "توجيه أولي بعد الأسئلة التوضيحية" : result.confidence
    };
  };

  WA.AIEngine = { assess, finalize, detectDanger, normalize };
})();

```

## `assets/automotive-data.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const models = {
    "تويوتا": ["كامري", "كورولا", "يارس", "أفالون", "راف فور", "لاندكروزر", "برادو", "هايلكس", "فورتشنر", "أخرى"],
    "نيسان": ["صني", "التيما", "مكسيما", "إكس تريل", "باترول", "باثفايندر", "نافارا", "كيكس", "أخرى"],
    "هيونداي": ["أكسنت", "إلنترا", "سوناتا", "أزيرا", "توسان", "سنتافي", "كريتا", "كونا", "أخرى"],
    "كيا": ["بيجاس", "ريو", "سيراتو", "K5", "K8", "سبورتاج", "سورينتو", "سيلتوس", "أخرى"],
    "فورد": ["توروس", "إكسبلورر", "إكسبيديشن", "إيدج", "إسكيب", "رينجر", "F-150", "أخرى"],
    "شيفروليه": ["ماليبو", "كابتيفا", "تاهو", "سوبربان", "ترافيرس", "سيلفرادو", "أخرى"],
    "لكزس": ["ES", "IS", "LS", "NX", "RX", "GX", "LX", "أخرى"],
    "مرسيدس": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "أخرى"],
    "بي إم دبليو": ["الفئة 1", "الفئة 3", "الفئة 5", "الفئة 7", "X1", "X3", "X5", "X7", "أخرى"],
    "جي إم سي": ["تيرين", "أكاديا", "يوكن", "سييرا", "سافانا", "أخرى"],
    "مازدا": ["مازدا 3", "مازدا 6", "CX-3", "CX-5", "CX-9", "أخرى"],
    "هوندا": ["سيتي", "سيفيك", "أكورد", "HR-V", "CR-V", "بايلوت", "أخرى"],
    "ميتسوبيشي": ["أتراج", "لانسر", "ASX", "أوتلاندر", "باجيرو", "L200", "أخرى"],
    "سوزوكي": ["ديزاير", "سويفت", "سياز", "فيتارا", "جيمني", "أخرى"],
    "رينو": ["سيمبول", "ميجان", "داستر", "كوليوس", "أخرى"],
    "أودي": ["A3", "A4", "A6", "Q3", "Q5", "Q7", "أخرى"],
    "أخرى": ["أخرى"]
  };

  WA.Automotive = Object.freeze({
    makes: Object.keys(models),
    models,
    mileages: [
      "أقل من 50 ألف كم",
      "من 50 إلى 100 ألف كم",
      "من 100 إلى 150 ألف كم",
      "من 150 إلى 200 ألف كم",
      "أكثر من 200 ألف كم"
    ],
    maintenanceServices: [
      "تغيير الزيت والفلاتر",
      "تغيير البطارية",
      "الإطارات",
      "فحص الفرامل",
      "خدمة التكييف",
      "فحص السوائل",
      "فحص دوري عام",
      "خدمة أخرى"
    ],
    vehicleMovementOptions: ["تتحرك بشكل طبيعي", "تتحرك بصعوبة", "لا تتحرك", "غير متأكد"],
    getModels(make) {
      return models[make] || ["أخرى"];
    },
    buildYears(start = 1990) {
      const years = [];
      const current = new Date().getFullYear() + 1;
      for (let year = current; year >= start; year -= 1) years.push(String(year));
      return years;
    }
  });
})();

```

## `assets/common.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const formatDate = (value, options = {}) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: options.time === false ? undefined : "short" }).format(date);
  };
  const formatMoney = (value) => `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
  const serviceLabel = (type) => WA.Config.serviceTypes[type] || type;
  const statusLabel = (status, source = "request") => source === "referral"
    ? (WA.Config.referralStatuses[status] || status)
    : (WA.Config.requestStatuses[status] || status);

  const showToast = (message, type = "info") => {
    let region = qs("#toastRegion");
    if (!region) {
      region = document.createElement("div");
      region.id = "toastRegion";
      region.className = "toast-region";
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    region.appendChild(toast);
    setTimeout(() => toast.remove(), 3600);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("تم النسخ", "success");
      return true;
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const result = document.execCommand("copy");
      textarea.remove();
      showToast(result ? "تم النسخ" : "تعذر النسخ", result ? "success" : "error");
      return result;
    }
  };

  const whatsappUrl = (phone, message) => {
    const normalized = WA.Storage.normalizeWhatsapp(phone);
    return normalized ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}` : "";
  };

  const buildWhatsappMessage = ({ request, customer, vehicle, partner }) => {
    const vehicleText = `${vehicle.makeOther || vehicle.make} ${vehicle.modelOther || vehicle.model} ${vehicle.year}`;
    let need = "";
    if (request.serviceType === "problem") need = `فحص مشكلة: ${request.problem}`;
    if (request.serviceType === "parts") need = "الاستفسار عن قطعة غيار للسيارة والاستفادة من خصم عملاء وين أوديها إن كان متاحًا";
    if (request.serviceType === "tow") need = `نقل السيارة من ${request.preciseLocation}${request.towDestination ? ` إلى ${request.towDestination}` : ""}`;
    if (request.serviceType === "maintenance") need = `${request.maintenanceService}${request.notes ? ` — ${request.notes}` : ""}`;
    return [
      "السلام عليكم،",
      `معك ${customer.firstName}، وصلت إليكم عن طريق «وين أوديها» بخصوص الطلب رقم ${request.humanId}.`,
      "",
      `السيارة: ${vehicleText}.`,
      `الطلب: ${need}.`,
      "",
      "أرغب بالتنسيق معكم."
    ].join("\n");
  };

  const availabilityText = (partner) => {
    if (partner.availability?.status === "verified") {
      return `تم تحديث قابلية الاستقبال تجريبيًا بتاريخ ${formatDate(partner.availability.verifiedAt, { time: false })}. يرجى تأكيد الموعد عبر واتساب.`;
    }
    return partner.availability?.note || "يستقبل عادةً هذا النوع من الطلبات، ويرجى التأكد من الموعد عبر واتساب.";
  };

  const renderStars = (rating) => {
    const rounded = Math.round(Number(rating || 0));
    return `<span class="stars" aria-label="${escapeHtml(rating)} من 5">${"★".repeat(rounded)}${"☆".repeat(Math.max(0, 5 - rounded))}</span>`;
  };

  const getRequestBundle = (request) => {
    if (!request) return null;
    const customer = WA.Storage.findById("wa_customers", request.customerId);
    const vehicle = WA.Storage.findById("wa_vehicles", request.vehicleId);
    const referrals = WA.Storage.get("wa_referrals").filter((row) => row.requestId === request.id).sort((a, b) => a.order - b.order);
    const activeReferral = referrals.find((row) => row.id === request.activeReferralId) || referrals[referrals.length - 1] || null;
    const partner = activeReferral ? WA.Storage.findById("wa_partners", activeReferral.partnerId) : null;
    const discount = partner ? WA.Matching?.getDiscount(partner.id) : null;
    return { request, customer, vehicle, referrals, activeReferral, partner, discount };
  };

  const renderPartnerCard = ({ partner, referral, discount, matchReason = "", compact = false }) => {
    if (!partner) return "";
    const typeLabel = WA.Config.partnerTypes[partner.type] || partner.type;
    const discountHtml = discount ? `
      <section class="discount-box" aria-label="تفاصيل الخصم">
        <strong>${escapeHtml(discount.title)}: ${escapeHtml(discount.percent)}%</strong>
        <span>${escapeHtml(discount.includedServices.join("، "))}</span>
        <small>${escapeHtml(discount.conditions)} ${discount.exclusions ? `الاستثناءات: ${escapeHtml(discount.exclusions)}` : ""} صالح حتى ${escapeHtml(discount.endsAt || "غير محدد")}.</small>
      </section>` : "";
    return `
      <article class="partner-card ${compact ? "partner-card-compact" : ""}">
        <div class="demo-badge">بيانات تجريبية — ليس شريكًا حقيقيًا</div>
        <div class="partner-head">
          <div>
            <span class="pill">${escapeHtml(typeLabel)}</span>
            <h2>${escapeHtml(partner.name)}</h2>
            <p>${escapeHtml(partner.city)} — ${escapeHtml(partner.exactLocation)}</p>
          </div>
          <div class="rating-block">${renderStars(partner.ratingOverall)}<strong>${escapeHtml(partner.ratingOverall)} / 5</strong><small>بناءً على ${escapeHtml(partner.ratingCount)} تقييمًا موثقًا</small></div>
        </div>
        <div class="partner-metrics">
          <div><span>عدالة الأسعار</span><strong>${escapeHtml(partner.fairnessRating)} / 5</strong><small>${escapeHtml(partner.fairnessCount)} تقييمًا موثقًا</small></div>
          <div><span>الالتزام</span><strong>${escapeHtml(partner.commitment)}</strong><small>مؤشر تشغيلي تجريبي</small></div>
          <div><span>ساعات العمل</span><strong>${escapeHtml(partner.hours)}</strong><small>تأكد من الموعد عبر واتساب</small></div>
        </div>
        <div class="info-panel"><strong>سبب الترشيح</strong><p>${escapeHtml(matchReason || referral?.matchReason || "مطابق لنوع الخدمة والمدينة ضمن البيانات التجريبية.")}</p></div>
        <div class="info-panel muted"><strong>التوفر</strong><p>${escapeHtml(availabilityText(partner))}</p></div>
        ${discountHtml}
      </article>`;
  };

  const injectLayout = () => {
    qsa("[data-site-header]").forEach((slot) => {
      slot.innerHTML = `
        <header class="site-header">
          <a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a>
          <div class="container nav-shell">
            <a class="brand" href="index.html" aria-label="الصفحة الرئيسية لوين أوديها"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>توجيه وإحالة ذكية</small></span></a>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mainNav">القائمة</button>
            <nav id="mainNav" class="main-nav" aria-label="التنقل الرئيسي">
              <a href="customer.html?fresh=1">ابدأ طلبك</a>
              <a href="track.html">متابعة الطلب</a>
              <a href="join.html">انضم كشريك</a>
              <a href="workshop-login.html">بوابة الشريك</a>
            </nav>
          </div>
        </header>`;
      const toggle = qs(".nav-toggle", slot);
      const nav = qs(".main-nav", slot);
      toggle?.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("open", !open);
      });
    });

    qsa("[data-site-footer]").forEach((slot) => {
      slot.innerHTML = `
        <footer class="site-footer">
          <div class="container footer-grid">
            <div><a class="brand footer-brand" href="index.html"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>نسخة MVP تجريبية</small></span></a><p>منصة توجيه وإحالة، وليست جهة فحص أو إصلاح. جميع بيانات Seed في هذه النسخة تجريبية.</p></div>
            <div><strong>روابط مهمة</strong><a href="privacy.html">سياسة الخصوصية</a><a href="terms.html">الشروط وحدود المسؤولية</a><a href="track.html">متابعة الطلب</a></div>
            <div><strong>للشركاء</strong><a href="join.html">طلب انضمام</a><a href="join-status.html">حالة الطلب</a><a href="workshop-login.html">تسجيل الدخول</a></div>
          </div>
          <div class="container footer-bottom"><span>© 2026 وين أوديها — نموذج تشغيلي تجريبي</span><span>HTML + CSS + JavaScript + localStorage</span></div>
        </footer>`;
    });
  };

  const setActiveNav = () => {
    const page = location.pathname.split("/").pop() || "index.html";
    qsa(".main-nav a").forEach((link) => {
      if (link.getAttribute("href").split("?")[0] === page) link.setAttribute("aria-current", "page");
    });
  };

  const initSelect = (select, options, placeholder = "اختر") => {
    if (!select) return;
    select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}`;
  };

  const setButtonBusy = (button, busy, text = "جاري التنفيذ...") => {
    if (!button) return;
    if (busy) {
      button.dataset.originalText = button.textContent;
      button.textContent = text;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }
  };

  const init = () => {
    WA.Storage.init();
    WA.Seed.run();
    WA.Lifecycle.runSweep();
    injectLayout();
    setActiveNav();
    document.documentElement.classList.add("js");
  };

  WA.UI = {
    qs, qsa, escapeHtml, formatDate, formatMoney, serviceLabel, statusLabel,
    showToast, copyText, whatsappUrl, buildWhatsappMessage, availabilityText,
    renderStars, renderPartnerCard, getRequestBundle, initSelect, setButtonBusy
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

```

## `assets/config.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  WA.Config = Object.freeze({
    appName: "وين أوديها",
    dataVersion: 6,
    maxReferralsPerRequest: 3,
    administrativeCloseDays: 5,
    claimThreshold: 100,
    claimDueDays: 10,
    supportedCities: [
      "بريدة", "عنيزة", "الرس", "البكيرية", "المذنب",
      "البدائع", "الأسياح", "النبهانية", "عيون الجواء",
      "رياض الخبراء", "الشماسية", "عقلة الصقور", "ضرية", "أبانات"
    ],
    serviceTypes: Object.freeze({
      problem: "مشكلة في السيارة",
      parts: "محل قطع غيار",
      tow: "سطحة",
      maintenance: "صيانة دورية"
    }),
    partnerTypes: Object.freeze({
      workshop: "ورشة أو مركز فحص",
      parts: "محل قطع غيار",
      tow: "مقدم خدمة سطحة",
      maintenance: "مركز صيانة دورية"
    }),
    storageKeys: Object.freeze([
      "wa_customers", "wa_vehicles", "wa_requests", "wa_partners",
      "wa_referrals", "wa_ratings", "wa_objections", "wa_discounts",
      "wa_fees", "wa_claims", "wa_payments", "wa_join_applications",
      "wa_consents", "wa_sessions", "wa_meta"
    ]),
    referralStatuses: Object.freeze({
      registered: "مسجلة",
      shown: "ظهرت للعميل",
      whatsapp_opened: "تم فتح واتساب",
      no_contact: "لم يتواصل العميل",
      contacted_not_arrived: "تواصل ولم يصل",
      arrived: "وصل العميل",
      intake_started: "بدأ الاستقبال أو الفحص",
      inspected_only: "تم الفحص فقط",
      service_completed: "تمت الخدمة",
      service_not_completed: "لم تتم الخدمة",
      not_agreed: "لم يتم التفاهم",
      alternative_requested: "تم طلب بديل",
      disputed: "معترض عليها",
      under_review: "تحت المراجعة",
      confirmed: "مؤكدة",
      unresolved: "غير محسومة",
      closed: "مغلقة"
    }),
    requestStatuses: Object.freeze({
      draft: "مسودة",
      matching: "جاري المطابقة",
      no_match: "لا يوجد تطابق حاليًا",
      referred: "تم ترشيح شريك",
      awaiting_arrival: "بانتظار تأكيد الوصول",
      arrived: "وصل العميل",
      intake_started: "بدأ الاستقبال أو الفحص",
      alternative_requested: "تم طلب شريك بديل",
      rated: "تم التقييم",
      administratively_closed: "مغلق إداريًا",
      finally_closed: "مغلق نهائيًا"
    })
  });
})();

```

## `assets/customer.js`

```javascript
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

```

## `assets/dashboard.js`

```javascript
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

```

## `assets/icons/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="18" fill="#0b1729"/>
  <path d="M15 38l5-15c1-3 4-5 7-5h10c3 0 6 2 7 5l5 15" fill="none" stroke="#f2ca7b" stroke-width="4" stroke-linecap="round"/>
  <path d="M12 38h40v9c0 3-2 5-5 5H17c-3 0-5-2-5-5z" fill="#dba94c"/>
  <circle cx="22" cy="44" r="3" fill="#0b1729"/><circle cx="42" cy="44" r="3" fill="#0b1729"/>
</svg>

```

## `assets/join-status.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  const show = (name) => { $("#joinLookup").hidden = name !== "lookup"; $("#joinResult").hidden = name !== "result"; $("#joinNotFound").hidden = name !== "notFound"; };
  const render = (application) => {
    $("#joinResultContent").innerHTML = `<div class="section-head"><div class="kicker">${WA.UI.escapeHtml(application.applicationNumber)}</div><h1>${WA.UI.escapeHtml(application.businessName)}</h1><p>${WA.UI.escapeHtml(application.statusLabel)}</p></div><div class="guidance-grid"><div class="guidance-item"><span>نوع الشريك</span><strong>${WA.UI.escapeHtml(WA.Config.partnerTypes[application.partnerType])}</strong></div><div class="guidance-item"><span>المدينة</span><strong>${WA.UI.escapeHtml(application.city)}</strong></div><div class="guidance-item"><span>التغطية</span><strong>${WA.UI.escapeHtml(application.coverageCities.join("، "))}</strong></div><div class="guidance-item"><span>تاريخ التقديم</span><strong>${WA.UI.formatDate(application.submittedAt)}</strong></div></div><div class="legal-note">هذه مراجعة تجريبية داخل المتصفح، ولا تمثل قبولًا فعليًا للشراكة.</div>`;
    show("result");
  };
  const init = () => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      const app = WA.Storage.get("wa_join_applications").find((row) => row.publicToken === token);
      app ? render(app) : show("notFound");
    } else show("lookup");
    $("#joinLookupForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const number = WA.Storage.sanitizeText($("#joinNumber").value, 30).toUpperCase();
      const phone = WA.Storage.sanitizePhone($("#joinPhone").value);
      const app = WA.Storage.get("wa_join_applications").find((row) => row.applicationNumber === number && row.phone === phone);
      app ? render(app) : show("notFound");
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();

```

## `assets/join.js`

```javascript
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

```

## `assets/lifecycle.js`

```javascript
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

```

## `assets/matching-engine.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const typeForService = (serviceType) => ({
    problem: "workshop",
    parts: "parts",
    tow: "tow",
    maintenance: "maintenance"
  })[serviceType] || "workshop";

  const isDiscountActive = (discount) => {
    if (!discount || discount.status !== "approved") return false;
    const today = new Date().toISOString().slice(0, 10);
    return (!discount.startsAt || discount.startsAt <= today) && (!discount.endsAt || discount.endsAt >= today);
  };

  const getDiscount = (partnerId) => WA.Storage.get("wa_discounts")
    .find((discount) => discount.partnerId === partnerId && isDiscountActive(discount)) || null;

  const match = ({ request, excludedPartnerIds = [] }) => {
    const partnerType = typeForService(request.serviceType);
    const vehicle = WA.Storage.findById("wa_vehicles", request.vehicleId) || {};
    const specialty = request.ai?.specialty || "";
    const desiredService = request.maintenanceService || (request.serviceType === "parts" ? "الاستفسار عن قطع الغيار" : "");

    const candidates = WA.Storage.get("wa_partners").filter((partner) => {
      if (partner.type !== partnerType) return false;
      if (partner.partnershipStatus !== "active") return false;
      if (["overdue", "suspended"].includes(partner.paymentStatus)) return false;
      if (excludedPartnerIds.includes(partner.id)) return false;
      if (!Array.isArray(partner.coverageCities) || !partner.coverageCities.includes(request.city)) return false;
      if (vehicle.make && Array.isArray(partner.makes) && partner.makes.length && !partner.makes.includes(vehicle.make)) return false;
      if (request.serviceType === "problem" && specialty) {
        const text = `${partner.specialties?.join(" ")} ${partner.services?.join(" ")}`;
        const relevant = specialty.split(" ").some((word) => word.length > 3 && text.includes(word));
        if (!relevant && !partner.services?.includes("فحص وتشخيص")) return false;
      }
      if (request.serviceType === "maintenance" && desiredService && !partner.services?.includes(desiredService) && !partner.services?.includes("خدمة أخرى")) return false;
      return true;
    });

    const scored = candidates.map((partner) => {
      let score = 0;
      score += Number(partner.trustScore || 0) * 1.4;
      score += Number(partner.ratingOverall || 0) * 12;
      score += Math.min(Number(partner.ratingCount || 0), 100) * 0.15;
      score += Number(partner.responseSpeed || 0) * 0.5;
      if (partner.city === request.city) score += 25;
      if (partner.availability?.status === "verified") score += 12;
      if (getDiscount(partner.id)) score += 3;
      if (partner.commitment === "مرتفع") score += 8;
      return { partner, score };
    }).sort((a, b) => b.score - a.score || a.partner.id.localeCompare(b.partner.id));

    if (!scored.length) {
      return {
        partner: null,
        reason: "لا يوجد شريك تجريبي مطابق للمدينة ونوع الخدمة وحالة الشراكة حاليًا. لم يتم اختلاق موقع أو توفر بديل.",
        evaluatedCount: candidates.length
      };
    }

    const selected = scored[0].partner;
    const reasonParts = [
      `يغطي مدينة ${request.city}`,
      request.serviceType === "problem" ? `ويقدم تخصص ${specialty || "الفحص التشخيصي"}` : "ويقدم الخدمة المطلوبة",
      `ومؤشر الثقة الداخلي لديه ${selected.trustScore}/100`
    ];

    return {
      partner: selected,
      score: scored[0].score,
      discount: getDiscount(selected.id),
      reason: `${reasonParts.join("، ")}. تم الاختيار من بيانات Seed ثابتة دون تعديل المدينة أو اختلاق المسافة أو التوفر.`,
      evaluatedCount: scored.length
    };
  };

  WA.Matching = { match, typeForService, getDiscount };
})();

```

## `assets/payment.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  let claim = null;
  const init = () => {
    const claimId = new URLSearchParams(location.search).get("claim");
    claim = claimId ? WA.Storage.findById("wa_claims", claimId) : null;
    if (!claim) { $("#paymentCard").hidden = true; $("#paymentMissing").hidden = false; return; }
    const partner = WA.Storage.findById("wa_partners", claim.partnerId);
    $("#claimSummary").innerHTML = `<div class="guidance-item"><span>رقم المطالبة</span><strong>${WA.UI.escapeHtml(claim.id)}</strong></div><div class="guidance-item"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div><div class="guidance-item"><span>المبلغ</span><strong>${WA.UI.formatMoney(claim.amount)}</strong></div><div class="guidance-item"><span>تاريخ الاستحقاق</span><strong>${WA.UI.formatDate(claim.dueAt)}</strong></div>`;
    if (claim.status === "paid") {
      const payment = WA.Storage.get("wa_payments").find((row) => row.claimId === claim.id);
      $("#paymentForm").innerHTML = `<div class="success-panel"><strong>تم سداد هذه المطالبة تجريبيًا</strong><p><a href="receipt.html?payment=${encodeURIComponent(payment?.id || "")}">عرض الإيصال</a></p></div>`;
      return;
    }
    $("#paymentForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!$("#confirmDemoPayment").checked) { WA.UI.showToast("أكد فهمك لطبيعة العملية التجريبية", "error"); return; }
      const method = new FormData(event.currentTarget).get("paymentMethod");
      try {
        const payment = WA.Lifecycle.registerPayment(claim.id, method);
        location.replace(`receipt.html?payment=${encodeURIComponent(payment.id)}`);
      } catch (error) { WA.UI.showToast(error.message, "error"); }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();

```

## `assets/receipt.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  const init = () => {
    const paymentId = new URLSearchParams(location.search).get("payment");
    const payment = paymentId ? WA.Storage.findById("wa_payments", paymentId) : null;
    if (!payment) { $("#receiptCard").hidden = true; $("#receiptMissing").hidden = false; return; }
    const claim = WA.Storage.findById("wa_claims", payment.claimId);
    const partner = WA.Storage.findById("wa_partners", payment.partnerId);
    $("#receiptContent").innerHTML = `<div class="receipt-row"><span>رقم الإيصال</span><strong>${WA.UI.escapeHtml(payment.receiptNumber)}</strong></div><div class="receipt-row"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div><div class="receipt-row"><span>رقم المطالبة</span><strong>${WA.UI.escapeHtml(claim?.id || payment.claimId)}</strong></div><div class="receipt-row"><span>طريقة السداد</span><strong>${WA.UI.escapeHtml(payment.method)}</strong></div><div class="receipt-row"><span>تاريخ السداد</span><strong>${WA.UI.formatDate(payment.paidAt)}</strong></div><div class="receipt-row receipt-total"><span>الإجمالي</span><strong>${WA.UI.formatMoney(payment.amount)}</strong></div><div class="legal-note">هذا إيصال محاكاة داخل نسخة MVP، ولا يمثل مستندًا ماليًا أو ضريبيًا حقيقيًا.</div>`;
    $("#printReceipt").addEventListener("click", () => window.print());
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();

```

## `assets/seed.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const primaryCities = ["بريدة", "عنيزة", "الرس", "البكيرية", "المذنب"];
  const serviceDefinitions = [
    {
      type: "workshop",
      label: "ورشة فحص",
      prefixes: ["مركز الفحص الأول", "ورشة مسار المركبة", "مركز عناية المحرك"],
      specialties: ["فحص وتشخيص عام", "ميكانيكا وكهرباء محرك", "كهرباء سيارات", "تكييف سيارات", "عفشة وتعليق وتوجيه", "فرامل", "ناقل حركة"],
      services: ["فحص وتشخيص", "فحص محرك", "فحص كهرباء", "فحص تكييف", "فحص عفشة", "فحص فرامل", "فحص ناقل حركة"]
    },
    {
      type: "parts",
      label: "قطع غيار",
      prefixes: ["محل قطع المركبة", "مركز قطع السيارات", "مستودع قطع الطريق"],
      specialties: ["قطع غيار سيارات"],
      services: ["الاستفسار عن قطع الغيار"]
    },
    {
      type: "tow",
      label: "سطحة",
      prefixes: ["سطحة الطريق", "نقل المركبات", "سطحة المساندة"],
      specialties: ["نقل المركبات"],
      services: ["نقل سيارة متوقفة", "نقل سيارة تتحرك بصعوبة", "نقل مركبات"]
    },
    {
      type: "maintenance",
      label: "صيانة دورية",
      prefixes: ["مركز الخدمة السريعة", "عناية السيارة", "مركز الصيانة الدورية"],
      specialties: ["صيانة دورية وخدمات سريعة"],
      services: [...WA.Automotive.maintenanceServices]
    }
  ];

  const allMakes = WA.Automotive.makes.filter((make) => make !== "أخرى");

  const createPartners = () => {
    const partners = [];
    let sequence = 1;
    primaryCities.forEach((city, cityIndex) => {
      serviceDefinitions.forEach((definition, typeIndex) => {
        definition.prefixes.forEach((prefix, index) => {
          const id = `DEMO-${definition.type.toUpperCase()}-${String(sequence).padStart(3, "0")}`;
          const verified = index === 0;
          partners.push({
            id,
            type: definition.type,
            name: `${prefix} — ${city} (تجريبي)`,
            city,
            coverageCities: definition.type === "tow" ? [city, primaryCities[(cityIndex + 1) % primaryCities.length]] : [city],
            exactLocation: `موقع تجريبي داخل مدينة ${city}`,
            whatsapp: `96655${String(1000000 + sequence).slice(-7)}`,
            hours: definition.type === "tow" ? "خدمة تجريبية على مدار الساعة" : "يوميًا 8:00 ص – 10:00 م",
            specialties: definition.specialties,
            makes: index === 1 ? allMakes.slice(0, 7) : allMakes,
            services: definition.services,
            vehicleTypes: ["سيارات ركوب", "مركبات دفع رباعي"],
            availability: {
              status: verified ? "verified" : "usual",
              verifiedAt: verified ? new Date().toISOString() : "",
              note: verified ? "تم تحديث القابلية للاستقبال داخل النسخة التجريبية" : "يستقبل عادةً هذا النوع من الطلبات؛ يرجى التأكد عبر واتساب"
            },
            ratingOverall: Number((4.2 + ((sequence % 7) / 10)).toFixed(1)),
            ratingCount: 8 + ((sequence * 7) % 64),
            fairnessRating: Number((4.1 + ((sequence % 6) / 10)).toFixed(1)),
            fairnessCount: 6 + ((sequence * 5) % 51),
            commitment: ["مرتفع", "جيد جدًا", "جيد"][sequence % 3],
            responseSpeed: 70 + (sequence % 25),
            trustScore: 74 + (sequence % 23),
            partnershipStatus: "active",
            paymentStatus: "current",
            feeAmount: 25,
            paymentGraceDays: 10,
            isDemo: true,
            demoNotice: "بيانات تجريبية للعرض وليست لشريك حقيقي",
            notifications: [],
            createdAt: "2026-07-01T08:00:00.000Z",
            updatedAt: "2026-07-01T08:00:00.000Z"
          });
          sequence += 1;
        });
      });
    });
    return partners;
  };

  const createDiscounts = (partners) => partners
    .filter((partner, index) => index % 4 === 0 && partner.type !== "tow")
    .map((partner, index) => ({
      id: `DISC-DEMO-${String(index + 1).padStart(3, "0")}`,
      partnerId: partner.id,
      title: "خصم عملاء وين أوديها",
      percent: partner.type === "parts" ? 5 : 10,
      includedServices: partner.type === "parts" ? ["قطع محددة بعد التأكد من المحل"] : ["أجور اليد للخدمات المحددة"],
      conditions: "إبراز رقم الطلب قبل بدء الخدمة، ويطبق الخصم على البنود المشمولة فقط.",
      exclusions: "لا يشمل القطع أو الخدمات غير المذكورة، ولا يجمع مع عروض أخرى.",
      startsAt: "2026-07-01",
      endsAt: "2026-12-31",
      status: "approved",
      approvedAt: "2026-07-01T08:00:00.000Z",
      isDemo: true,
      createdAt: "2026-07-01T08:00:00.000Z",
      updatedAt: "2026-07-01T08:00:00.000Z"
    }));

  const seedPartnerLogin = (partners) => {
    const workshop = partners.find((partner) => partner.type === "workshop" && partner.city === "بريدة");
    if (!workshop) return;
    const sessions = WA.Storage.get("wa_sessions");
    if (!sessions.some((session) => session.id === "DEMO-CREDENTIALS")) {
      sessions.push({
        id: "DEMO-CREDENTIALS",
        type: "demo_credentials",
        partnerId: workshop.id,
        partnerCode: "WA-DEMO",
        pin: "1234",
        isDemo: true,
        createdAt: WA.Storage.now(),
        updatedAt: WA.Storage.now()
      });
      WA.Storage.set("wa_sessions", sessions);
    }
  };

  const seedSampleFinancials = (partners) => {
    const partner = partners.find((row) => row.type === "workshop" && row.city === "بريدة");
    if (!partner) return;
    const customers = WA.Storage.get("wa_customers");
    if (!customers.some((row) => row.id === "CUS-DEMO-001")) {
      WA.Storage.upsert("wa_customers", {
        id: "CUS-DEMO-001",
        firstName: "عميل تجريبي",
        phone: "0500000000",
        isDemo: true
      });
      WA.Storage.upsert("wa_vehicles", {
        id: "VEH-DEMO-001",
        customerId: "CUS-DEMO-001",
        make: "تويوتا",
        model: "كامري",
        year: "2022",
        mileage: "من 50 إلى 100 ألف كم",
        isDemo: true
      });
      WA.Storage.upsert("wa_requests", {
        id: "REQ-DEMO-001",
        humanId: "WA-DEMO-1001",
        publicToken: "req_demo_public_token",
        customerId: "CUS-DEMO-001",
        vehicleId: "VEH-DEMO-001",
        serviceType: "problem",
        city: "بريدة",
        problem: "رجفة أثناء الوقوف",
        ai: {
          expectedIssue: "قد تكون الأعراض مرتبطة بأداء المحرك أثناء الوقوف.",
          specialty: "ميكانيكا وكهرباء محرك",
          urgency: "متوسطة",
          nextStep: "إجراء فحص متخصص قبل اتخاذ أي قرار إصلاحي.",
          questions: [],
          answers: []
        },
        status: "intake_started",
        activeReferralId: "REF-DEMO-001",
        referralCount: 1,
        isDemo: true,
        lastActivityAt: WA.Storage.now()
      });
      WA.Storage.upsert("wa_referrals", {
        id: "REF-DEMO-001",
        requestId: "REQ-DEMO-001",
        partnerId: partner.id,
        order: 1,
        status: "intake_started",
        customerArrivalConfirmedAt: WA.Storage.now(),
        partnerIntakeConfirmedAt: WA.Storage.now(),
        feeEligibleAt: WA.Storage.now(),
        isDemo: true
      });
      WA.Storage.insertUnique("wa_fees", {
        id: "FEE-DEMO-001",
        referralId: "REF-DEMO-001",
        partnerId: partner.id,
        type: "fixed_referral_fee",
        amount: partner.feeAmount,
        event: "arrival_and_intake_started",
        status: "unclaimed",
        dueAt: "",
        isDemo: true
      }, ["referralId"]);
    }
  };

  const run = () => {
    const existingPartners = WA.Storage.get("wa_partners");
    const generatedPartners = createPartners();
    const byId = new Map(existingPartners.map((partner) => [partner.id, partner]));
    generatedPartners.forEach((partner) => {
      if (!byId.has(partner.id)) WA.Storage.upsert("wa_partners", partner);
    });

    const partners = WA.Storage.get("wa_partners");
    createDiscounts(generatedPartners).forEach((discount) => {
      WA.Storage.insertUnique("wa_discounts", discount, ["id"]);
    });
    seedPartnerLogin(partners);
    seedSampleFinancials(partners);

    const meta = WA.Storage.get("wa_meta");
    WA.Storage.set("wa_meta", {
      ...meta,
      seedVersion: 3,
      seedAppliedAt: meta.seedAppliedAt || WA.Storage.now(),
      seedNotice: "جميع سجلات Seed موسومة بأنها بيانات تجريبية وليست لشركاء أو عملاء حقيقيين.",
      updatedAt: WA.Storage.now()
    });
  };

  WA.Seed = { run, createPartners };
})();

```

## `assets/storage.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const memory = new Map();
  const arrayKeys = new Set(WA.Config.storageKeys.filter((key) => key !== "wa_meta"));

  const sanitizeText = (value, max = 500) => String(value ?? "")
    .replace(/[<>`]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

  const sanitizePhone = (value) => {
    const digits = String(value ?? "").replace(/\D/g, "");
    if (/^05\d{8}$/.test(digits)) return digits;
    if (/^9665\d{8}$/.test(digits)) return `0${digits.slice(3)}`;
    if (/^5\d{8}$/.test(digits)) return `0${digits}`;
    return digits.slice(0, 10);
  };

  const normalizeWhatsapp = (value) => {
    const phone = sanitizePhone(value);
    if (/^05\d{8}$/.test(phone)) return `966${phone.slice(1)}`;
    const digits = String(value ?? "").replace(/\D/g, "");
    return /^9665\d{8}$/.test(digits) ? digits : "";
  };

  const parse = (raw, fallback) => {
    try {
      return raw == null ? fallback : JSON.parse(raw);
    } catch (_) {
      return fallback;
    }
  };

  const rawGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return memory.has(key) ? memory.get(key) : null;
    }
  };

  const rawSet = (key, value) => {
    const serialized = JSON.stringify(value);
    try {
      localStorage.setItem(key, serialized);
    } catch (_) {
      memory.set(key, serialized);
    }
    return value;
  };

  const deepClone = (value) => JSON.parse(JSON.stringify(value));
  const now = () => new Date().toISOString();

  const randomToken = (prefix = "tok") => {
    const bytes = new Uint8Array(16);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    return `${prefix}_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  };

  const createId = (prefix) => {
    const stamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `${prefix}-${stamp}-${random}`;
  };

  const normalizeRecord = (record) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) return record;
    const copy = {};
    Object.entries(record).forEach(([key, value]) => {
      if (typeof value === "string") copy[key] = sanitizeText(value, 2000);
      else if (Array.isArray(value)) copy[key] = value.map((item) => typeof item === "string" ? sanitizeText(item, 500) : normalizeRecord(item));
      else if (value && typeof value === "object") copy[key] = normalizeRecord(value);
      else copy[key] = value;
    });
    return copy;
  };

  const get = (key) => {
    const fallback = arrayKeys.has(key) ? [] : {};
    const value = parse(rawGet(key), fallback);
    if (arrayKeys.has(key) && !Array.isArray(value)) return [];
    if (!arrayKeys.has(key) && (Array.isArray(value) || !value || typeof value !== "object")) return {};
    return value;
  };

  const set = (key, value) => rawSet(key, value);

  const ensureKeys = () => {
    WA.Config.storageKeys.forEach((key) => {
      if (rawGet(key) === null) set(key, arrayKeys.has(key) ? [] : {});
    });
  };

  const upsert = (key, record, identity = "id") => {
    if (!arrayKeys.has(key)) throw new Error(`المفتاح ${key} ليس جدولًا`);
    const rows = get(key);
    const clean = normalizeRecord(record);
    const timestamp = now();
    const index = rows.findIndex((row) => row?.[identity] === clean?.[identity]);
    if (index >= 0) {
      rows[index] = { ...rows[index], ...clean, updatedAt: timestamp };
    } else {
      rows.push({ ...clean, createdAt: clean.createdAt || timestamp, updatedAt: timestamp });
    }
    set(key, rows);
    return deepClone(index >= 0 ? rows[index] : rows[rows.length - 1]);
  };

  const insertUnique = (key, record, uniqueFields = ["id"]) => {
    const rows = get(key);
    const duplicate = rows.find((row) => uniqueFields.every((field) => row?.[field] === record?.[field]));
    if (duplicate) return deepClone(duplicate);
    return upsert(key, record);
  };

  const remove = (key, predicate) => {
    const rows = get(key);
    const next = rows.filter((row) => !predicate(row));
    set(key, next);
    return rows.length - next.length;
  };

  const findById = (key, id) => get(key).find((row) => row?.id === id) || null;

  const transaction = (callback) => {
    const snapshot = {};
    WA.Config.storageKeys.forEach((key) => { snapshot[key] = rawGet(key); });
    try {
      return callback();
    } catch (error) {
      Object.entries(snapshot).forEach(([key, value]) => {
        if (value === null) {
          try { localStorage.removeItem(key); } catch (_) { memory.delete(key); }
        } else {
          try { localStorage.setItem(key, value); } catch (_) { memory.set(key, value); }
        }
      });
      throw error;
    }
  };

  const migrateLegacy = () => {
    const meta = get("wa_meta");
    const currentVersion = Number(meta.dataVersion || 0);
    if (currentVersion >= WA.Config.dataVersion) return;

    const requests = get("wa_requests");
    const referrals = get("wa_referrals");
    const partners = get("wa_partners");

    requests.forEach((request) => {
      if (!request.publicToken) request.publicToken = randomToken("req");
      if (!request.status) request.status = "referred";
      if (!request.lastActivityAt) request.lastActivityAt = request.updatedAt || request.createdAt || now();
      if (!request.humanId) request.humanId = request.id;
    });

    referrals.forEach((referral) => {
      if (!referral.order) referral.order = 1;
      if (!referral.status) referral.status = "registered";
      if (referral.workshopId && !referral.partnerId) referral.partnerId = referral.workshopId;
      if (referral.arrived && !referral.customerArrivalConfirmedAt) referral.customerArrivalConfirmedAt = now();
    });

    partners.forEach((partner) => {
      if (!partner.type) partner.type = "workshop";
      if (!partner.coverageCities) partner.coverageCities = partner.city ? [partner.city] : [];
      if (!partner.partnershipStatus) partner.partnershipStatus = "active";
      if (!partner.paymentStatus) partner.paymentStatus = "current";
      if (typeof partner.isDemo !== "boolean") partner.isDemo = true;
    });

    set("wa_requests", requests);
    set("wa_referrals", referrals);
    set("wa_partners", partners);
    set("wa_meta", {
      ...meta,
      dataVersion: WA.Config.dataVersion,
      migratedAt: now(),
      updatedAt: now()
    });
  };

  const integrityCheck = () => {
    const issues = [];
    const customers = new Set(get("wa_customers").map((row) => row.id));
    const vehicles = new Set(get("wa_vehicles").map((row) => row.id));
    const requests = new Set(get("wa_requests").map((row) => row.id));
    const partners = new Set(get("wa_partners").map((row) => row.id));
    const referrals = new Set(get("wa_referrals").map((row) => row.id));

    get("wa_vehicles").forEach((row) => {
      if (!customers.has(row.customerId)) issues.push(`المركبة ${row.id} مرتبطة بعميل غير موجود`);
    });
    get("wa_requests").forEach((row) => {
      if (!customers.has(row.customerId)) issues.push(`الطلب ${row.id} مرتبط بعميل غير موجود`);
      if (!vehicles.has(row.vehicleId)) issues.push(`الطلب ${row.id} مرتبط بمركبة غير موجودة`);
    });
    get("wa_referrals").forEach((row) => {
      if (!requests.has(row.requestId)) issues.push(`الإحالة ${row.id} مرتبطة بطلب غير موجود`);
      if (!partners.has(row.partnerId)) issues.push(`الإحالة ${row.id} مرتبطة بشريك غير موجود`);
    });
    get("wa_ratings").forEach((row) => {
      if (!referrals.has(row.referralId)) issues.push(`التقييم ${row.id} مرتبط بإحالة غير موجودة`);
    });
    get("wa_fees").forEach((row) => {
      if (!referrals.has(row.referralId)) issues.push(`الرسم ${row.id} مرتبط بإحالة غير موجودة`);
      if (!partners.has(row.partnerId)) issues.push(`الرسم ${row.id} مرتبط بشريك غير موجود`);
    });
    return issues;
  };

  const init = () => {
    ensureKeys();
    migrateLegacy();
    const meta = get("wa_meta");
    set("wa_meta", {
      ...meta,
      dataVersion: WA.Config.dataVersion,
      initializedAt: meta.initializedAt || now(),
      updatedAt: now()
    });
  };

  WA.Storage = {
    init,
    get,
    set,
    upsert,
    insertUnique,
    remove,
    findById,
    transaction,
    createId,
    randomToken,
    sanitizeText,
    sanitizePhone,
    normalizeWhatsapp,
    deepClone,
    now,
    integrityCheck
  };
})();

```

## `assets/styles.css`

```css
:root {
  --navy-950: #071426;
  --navy-900: #0b1d33;
  --navy-800: #12304f;
  --blue-600: #1769aa;
  --teal-600: #0a7d72;
  --teal-500: #0f9487;
  --teal-100: #dff6f2;
  --amber-600: #a65c00;
  --amber-100: #fff2d8;
  --red-700: #a1242d;
  --red-100: #fde9eb;
  --green-700: #146c43;
  --green-100: #e4f7ed;
  --slate-900: #172033;
  --slate-700: #405069;
  --slate-600: #59677d;
  --slate-400: #95a0b2;
  --slate-300: #c7cfda;
  --slate-200: #e2e7ee;
  --slate-100: #f1f4f8;
  --white: #fff;
  --surface: #fff;
  --page: #f6f8fb;
  --radius-sm: 10px;
  --radius: 16px;
  --radius-lg: 24px;
  --shadow-sm: 0 8px 24px rgba(7, 20, 38, .07);
  --shadow: 0 18px 50px rgba(7, 20, 38, .11);
  --focus: 0 0 0 3px rgba(23, 105, 170, .28);
  --container: 1180px;
  font-family: Tahoma, Arial, "Segoe UI", sans-serif;
  color-scheme: light;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--page);
  color: var(--slate-900);
  font-family: inherit;
  line-height: 1.75;
  text-align: right;
  -webkit-font-smoothing: antialiased;
}
img, svg { max-width: 100%; }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
button, a, input, select, textarea, summary { -webkit-tap-highlight-color: transparent; }
button { cursor: pointer; }
[hidden] { display: none !important; }

:focus-visible { outline: none; box-shadow: var(--focus); }
.skip-link {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  transform: translateY(-150%);
  background: var(--white);
  color: var(--navy-900);
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 800;
}
.skip-link:focus { transform: translateY(0); }

.container { width: min(calc(100% - 32px), var(--container)); margin-inline: auto; }
.section { padding: 56px 0; }
.section.alt { background: var(--white); }
.section-head { max-width: 720px; margin-bottom: 28px; }
.section-head.center { text-align: center; margin-inline: auto; }
.section-head h1, .section-head h2 { margin: 6px 0 8px; line-height: 1.35; }
.section-head p { margin: 0; color: var(--slate-600); }
.kicker, .eyebrow { color: var(--teal-600); font-size: .88rem; font-weight: 800; letter-spacing: .01em; }
.muted { color: var(--slate-600); }
.small { font-size: .88rem; }
.mt-8 { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mb-0 { margin-bottom: 0; }
.text-center { text-align: center; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, .96);
  border-bottom: 1px solid var(--slate-200);
  backdrop-filter: blur(10px);
}
.nav-shell { min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: inline-flex; align-items: center; gap: 10px; min-width: max-content; }
.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  color: var(--white);
  background: linear-gradient(145deg, var(--teal-500), var(--navy-800));
  font-weight: 900;
  font-size: 1.2rem;
  box-shadow: 0 9px 22px rgba(10, 125, 114, .2);
}
.brand span:last-child { display: grid; line-height: 1.35; }
.brand strong { font-size: 1rem; }
.brand small { color: var(--slate-600); font-size: .72rem; }
.nav-toggle {
  border: 1px solid var(--slate-300);
  border-radius: 10px;
  background: var(--white);
  padding: 8px 12px;
  color: var(--navy-900);
  font-weight: 800;
}
.main-nav {
  position: absolute;
  inset-inline: 16px;
  top: 74px;
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: var(--white);
  border: 1px solid var(--slate-200);
  border-radius: 14px;
  box-shadow: var(--shadow);
}
.main-nav.open { display: flex; }
.main-nav a { padding: 10px 12px; border-radius: 9px; color: var(--slate-700); font-weight: 700; }
.main-nav a:hover, .main-nav a[aria-current="page"] { background: var(--teal-100); color: var(--teal-600); }

.hero {
  overflow: hidden;
  padding: 68px 0 54px;
  background:
    radial-gradient(circle at 8% 20%, rgba(15, 148, 135, .17), transparent 28%),
    radial-gradient(circle at 90% 70%, rgba(23, 105, 170, .15), transparent 30%),
    linear-gradient(160deg, #f7fbfc, #edf3f8);
}
.hero-grid { display: grid; gap: 34px; align-items: center; }
.hero h1 { margin: 10px 0 16px; font-size: clamp(2rem, 8vw, 4.3rem); line-height: 1.2; letter-spacing: -.04em; }
.hero h1 span { color: var(--teal-600); }
.hero p { max-width: 720px; color: var(--slate-600); font-size: 1.04rem; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.hero-assurances { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.hero-assurances span { padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,.78); border: 1px solid var(--slate-200); color: var(--slate-700); font-size: .82rem; font-weight: 700; }
.hero-panel { background: rgba(255,255,255,.9); border: 1px solid rgba(255,255,255,.9); border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow); }
.hero-panel h2 { margin: 0 0 8px; }
.hero-panel .main-path-card { margin-top: 14px; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 11px 18px;
  border: 1px solid transparent;
  border-radius: 12px;
  font-weight: 800;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn:disabled { cursor: not-allowed; opacity: .55; transform: none; }
.btn-primary { background: var(--teal-600); color: var(--white); box-shadow: 0 11px 25px rgba(10,125,114,.22); }
.btn-primary:hover { background: #086d64; }
.btn-dark { background: var(--navy-900); color: var(--white); }
.btn-light { background: var(--white); color: var(--navy-900); border-color: var(--slate-300); }
.btn-danger { background: var(--red-700); color: var(--white); }
.btn-warning { background: var(--amber-600); color: var(--white); }
.btn-ghost { background: transparent; color: var(--navy-900); border-color: var(--slate-300); }
.btn-sm { min-height: 38px; padding: 7px 12px; border-radius: 9px; font-size: .88rem; }
.btn-block { width: 100%; }
.button-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }

.main-path-card, .service-card, .card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--slate-200);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}
.main-path-card {
  border: 2px solid rgba(10,125,114,.32);
  background: linear-gradient(145deg, var(--white), #f0fbf9);
}
.main-path-card h2, .service-card h3, .card h3 { margin: 6px 0; }
.main-path-card p, .service-card p, .card p { margin: 0; color: var(--slate-600); }
.path-icon { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 14px; background: var(--teal-100); color: var(--teal-600); font-size: 1.35rem; font-weight: 900; }
.other-services { display: grid; gap: 12px; margin-top: 14px; }
.service-card { transition: transform .18s ease, border-color .18s ease; }
.service-card:hover { transform: translateY(-2px); border-color: var(--teal-500); }
.demo-badge, .pill, .status-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  padding: 4px 9px;
  font-size: .75rem;
  font-weight: 800;
}
.demo-badge { background: var(--amber-100); color: var(--amber-600); margin-bottom: 10px; }
.pill { background: var(--teal-100); color: var(--teal-600); }
.status-badge { background: var(--slate-100); color: var(--slate-700); }
.status-badge.success { background: var(--green-100); color: var(--green-700); }
.status-badge.warning { background: var(--amber-100); color: var(--amber-600); }
.status-badge.danger { background: var(--red-100); color: var(--red-700); }

.stats-grid, .cards-grid, .portal-grid, .metric-grid { display: grid; gap: 14px; }
.stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.stat-card { padding: 18px; background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius); }
.stat-card strong { display: block; font-size: 1.5rem; color: var(--navy-900); }
.stat-card span { color: var(--slate-600); font-size: .88rem; }
.portal-grid .card { transition: transform .18s ease; }
.portal-grid .card:hover { transform: translateY(-3px); }

.flow-shell { padding: 28px 0 64px; }
.flow-layout { display: grid; gap: 20px; align-items: start; }
.flow-sidebar { background: var(--navy-900); color: var(--white); border-radius: var(--radius-lg); padding: 20px; }
.flow-sidebar h1 { margin: 0 0 6px; font-size: 1.35rem; }
.flow-sidebar p { margin: 0; color: #c5d1df; font-size: .9rem; }
.progress-wrap { margin-top: 18px; }
.progress-meta { display: flex; justify-content: space-between; gap: 10px; font-size: .8rem; color: #c5d1df; }
.progress-track { height: 8px; background: rgba(255,255,255,.13); border-radius: 99px; overflow: hidden; margin-top: 8px; }
.progress-bar { height: 100%; width: 0; background: linear-gradient(90deg, var(--teal-500), #45c9ba); border-radius: inherit; transition: width .3s ease; }
.flow-content { min-width: 0; }
.flow-screen { background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm); }
.flow-screen:not(.active) { display: none; }
.flow-screen h2 { margin: 0 0 8px; line-height: 1.4; }
.flow-screen > p:first-of-type { margin-top: 0; color: var(--slate-600); }
.screen-actions { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--slate-200); }
.service-choice-grid { display: grid; gap: 12px; margin-top: 20px; }
.service-choice {
  width: 100%;
  text-align: right;
  border: 1px solid var(--slate-200);
  background: var(--white);
  border-radius: var(--radius);
  padding: 18px;
  color: var(--slate-900);
}
.service-choice.primary { border: 2px solid var(--teal-500); background: #f3fbfa; }
.service-choice.selected { box-shadow: var(--focus); border-color: var(--blue-600); }
.service-choice strong { display: block; font-size: 1.05rem; }
.service-choice span { color: var(--slate-600); font-size: .88rem; }

.form-grid { display: grid; gap: 16px; }
.form-field { display: grid; gap: 7px; min-width: 0; }
.form-field label, .form-field legend { font-weight: 800; color: var(--slate-900); }
.required::after { content: " *"; color: var(--red-700); }
.form-field input, .form-field select, .form-field textarea {
  width: 100%;
  min-height: 47px;
  border: 1px solid var(--slate-300);
  border-radius: 11px;
  padding: 10px 12px;
  background: var(--white);
  color: var(--slate-900);
}
.form-field textarea { min-height: 120px; resize: vertical; }
.form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: var(--blue-600); box-shadow: var(--focus); outline: 0; }
.field-hint { color: var(--slate-600); font-size: .82rem; }
.field-error { color: var(--red-700); font-size: .82rem; min-height: 1em; }
fieldset { margin: 0; padding: 0; border: 0; }
.checkbox-line, .radio-line { display: flex; align-items: flex-start; gap: 9px; }
.checkbox-line input, .radio-line input { width: 19px; height: 19px; margin-top: 3px; accent-color: var(--teal-600); }
.checkbox-stack { display: grid; gap: 10px; }
.inline-fields { display: grid; gap: 12px; }
.choice-grid { display: grid; gap: 10px; }
.choice-btn { border: 1px solid var(--slate-300); background: var(--white); color: var(--slate-900); border-radius: 11px; padding: 12px; font-weight: 700; }
.choice-btn.selected { border-color: var(--teal-600); background: var(--teal-100); color: var(--teal-600); }

.loading-shell { display: grid; place-items: center; min-height: 320px; text-align: center; }
.loader-ring { width: 58px; height: 58px; border: 5px solid var(--slate-200); border-top-color: var(--teal-600); border-radius: 50%; animation: spin .9s linear infinite; }
.loader-steps { display: grid; gap: 8px; margin-top: 20px; width: min(100%, 420px); }
.loader-step { display: flex; align-items: center; gap: 9px; text-align: right; padding: 9px 12px; border-radius: 9px; background: var(--slate-100); color: var(--slate-600); }
.loader-step.active { background: var(--teal-100); color: var(--teal-600); }
.loader-step.done::before { content: "✓"; font-weight: 900; color: var(--green-700); }
.skeleton { position: relative; overflow: hidden; background: var(--slate-200); border-radius: 8px; }
.skeleton::after { content: ""; position: absolute; inset: 0; transform: translateX(100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); animation: shimmer 1.2s infinite; }
.skeleton-line { height: 15px; margin-bottom: 10px; }
.skeleton-line.short { width: 58%; }

.guidance-grid { display: grid; gap: 12px; margin-top: 18px; }
.guidance-item { border: 1px solid var(--slate-200); border-radius: 13px; padding: 16px; background: #fbfcfe; }
.guidance-item span { display: block; color: var(--slate-600); font-size: .82rem; }
.guidance-item strong { display: block; margin-top: 4px; }
.danger-panel { border: 2px solid #d34a57; background: var(--red-100); color: #6e1219; border-radius: var(--radius); padding: 18px; }
.legal-note { margin-top: 16px; border-right: 4px solid var(--blue-600); background: #eef6fd; padding: 13px 15px; border-radius: 9px; color: var(--slate-700); font-size: .88rem; }
.info-panel { margin-top: 13px; border-right: 4px solid var(--teal-500); background: #f2faf9; padding: 13px 15px; border-radius: 9px; }
.info-panel.muted { border-color: var(--slate-400); background: var(--slate-100); }
.info-panel p { margin: 4px 0 0; color: var(--slate-700); }
.warning-panel { border-right: 4px solid var(--amber-600); background: var(--amber-100); padding: 14px; border-radius: 10px; }
.error-panel { border-right: 4px solid var(--red-700); background: var(--red-100); padding: 14px; border-radius: 10px; color: #6e1219; }
.success-panel { border-right: 4px solid var(--green-700); background: var(--green-100); padding: 14px; border-radius: 10px; color: #0d4f30; }

.partner-card { background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm); }
.partner-head { display: grid; gap: 16px; border-bottom: 1px solid var(--slate-200); padding-bottom: 16px; }
.partner-head h2 { margin: 7px 0 2px; }
.partner-head p { margin: 0; color: var(--slate-600); }
.rating-block { display: grid; gap: 2px; }
.rating-block small { color: var(--slate-600); }
.stars { color: #d98b00; letter-spacing: 2px; white-space: nowrap; }
.partner-metrics { display: grid; gap: 10px; margin-top: 16px; }
.partner-metrics > div { border: 1px solid var(--slate-200); border-radius: 11px; padding: 12px; }
.partner-metrics span, .partner-metrics small { display: block; color: var(--slate-600); font-size: .8rem; }
.partner-metrics strong { display: block; margin: 2px 0; }
.discount-box { display: grid; gap: 5px; margin-top: 14px; border: 1px dashed var(--teal-600); background: var(--teal-100); border-radius: 12px; padding: 14px; }
.discount-box small { color: var(--slate-700); }

.request-header { background: var(--navy-900); color: var(--white); border-radius: var(--radius-lg); padding: 22px; margin-bottom: 18px; }
.request-header h1 { margin: 3px 0; }
.request-header p { margin: 0; color: #c5d1df; }
.request-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.request-meta span { background: rgba(255,255,255,.1); padding: 6px 10px; border-radius: 999px; font-size: .8rem; }
.timeline { display: grid; gap: 0; }
.timeline-item { display: grid; grid-template-columns: 24px 1fr; gap: 10px; position: relative; padding-bottom: 18px; }
.timeline-item:not(:last-child)::before { content: ""; position: absolute; right: 11px; top: 22px; bottom: 0; width: 2px; background: var(--slate-200); }
.timeline-dot { width: 24px; height: 24px; border-radius: 50%; background: var(--teal-100); color: var(--teal-600); display: grid; place-items: center; font-size: .72rem; font-weight: 900; z-index: 1; }
.timeline-body { border: 1px solid var(--slate-200); border-radius: 11px; padding: 12px; background: var(--white); }
.timeline-body strong { display: block; }
.timeline-body small { color: var(--slate-600); }

.tabs { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 7px; margin-bottom: 18px; scrollbar-width: thin; }
.tab-btn { min-width: max-content; border: 1px solid var(--slate-300); background: var(--white); border-radius: 999px; padding: 8px 13px; color: var(--slate-700); font-weight: 800; }
.tab-btn.active { background: var(--navy-900); color: var(--white); border-color: var(--navy-900); }
.tab-panel:not(.active) { display: none; }
.dashboard-grid { display: grid; gap: 18px; }
.table-wrap { overflow-x: auto; border: 1px solid var(--slate-200); border-radius: var(--radius); background: var(--white); }
table { width: 100%; border-collapse: collapse; min-width: 760px; }
th, td { padding: 12px 13px; border-bottom: 1px solid var(--slate-200); text-align: right; vertical-align: top; }
th { background: var(--slate-100); color: var(--slate-700); font-size: .84rem; }
td { font-size: .9rem; }
.table-actions { display: flex; flex-wrap: wrap; gap: 6px; }
.empty-state { text-align: center; padding: 38px 18px; border: 1px dashed var(--slate-300); border-radius: var(--radius); background: var(--white); }
.empty-state h2, .empty-state h3 { margin: 8px 0; }
.empty-state p { color: var(--slate-600); }

.dialog {
  width: min(calc(100% - 28px), 620px);
  border: 0;
  border-radius: var(--radius-lg);
  padding: 0;
  box-shadow: 0 28px 80px rgba(0,0,0,.25);
}
.dialog::backdrop { background: rgba(7,20,38,.65); }
.dialog-shell { padding: 20px; }
.dialog-head { display: flex; justify-content: space-between; gap: 12px; align-items: start; margin-bottom: 14px; }
.dialog-head h2 { margin: 0; }
.dialog-close { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--slate-300); background: var(--white); }

.toast-region { position: fixed; bottom: 16px; inset-inline: 16px; z-index: 2000; display: grid; gap: 8px; pointer-events: none; }
.toast { max-width: 520px; margin-inline: auto; padding: 12px 15px; border-radius: 11px; background: var(--navy-900); color: var(--white); box-shadow: var(--shadow); pointer-events: auto; }
.toast-success { background: var(--green-700); }
.toast-error { background: var(--red-700); }

.site-footer { background: var(--navy-950); color: var(--white); padding: 46px 0 18px; }
.footer-grid { display: grid; gap: 24px; }
.footer-grid > div { display: grid; align-content: start; gap: 7px; }
.footer-grid p, .footer-grid a, .footer-grid small { color: #b8c6d8; }
.footer-grid a:hover { color: var(--white); }
.footer-bottom { margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.12); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; color: #9fb0c5; font-size: .8rem; }
.footer-brand .brand-mark { width: 38px; height: 38px; }
.noscript-banner { background: var(--red-700); color: var(--white); padding: 10px; text-align: center; font-weight: 800; }

.receipt { max-width: 760px; margin-inline: auto; background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm); }
.receipt-head { display: flex; justify-content: space-between; gap: 15px; border-bottom: 1px solid var(--slate-200); padding-bottom: 14px; }
.receipt-row { display: flex; justify-content: space-between; gap: 14px; padding: 11px 0; border-bottom: 1px dashed var(--slate-200); }
.receipt-total { font-size: 1.25rem; font-weight: 900; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes shimmer { to { transform: translateX(-100%); } }

@media (min-width: 680px) {
  .other-services, .service-choice-grid, .cards-grid, .portal-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .service-choice-grid .service-choice.primary { grid-column: 1 / -1; }
  .form-grid.two, .inline-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .choice-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .guidance-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .partner-head { grid-template-columns: 1fr auto; }
  .partner-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .footer-grid { grid-template-columns: 1.6fr 1fr 1fr; }
  .toast-region { right: auto; left: 18px; width: 420px; }
}

@media (min-width: 900px) {
  .nav-toggle { display: none; }
  .main-nav { position: static; display: flex; flex-direction: row; padding: 0; border: 0; box-shadow: none; background: transparent; }
  .hero-grid { grid-template-columns: 1.15fr .85fr; }
  .flow-layout { grid-template-columns: 270px minmax(0, 1fr); }
  .flow-sidebar { position: sticky; top: 92px; }
  .flow-screen { padding: 30px; }
  .dashboard-grid.two { grid-template-columns: 1.25fr .75fr; }
}

@media print {
  .site-header, .site-footer, .btn, .screen-actions, .no-print { display: none !important; }
  body { background: var(--white); }
  .receipt, .card, .partner-card { box-shadow: none; border-color: #aaa; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}

```

## `assets/track.js`

```javascript
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

```

## `assets/workshop-login.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;

  const init = () => {
    $("#loginForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const code = WA.Storage.sanitizeText($("#partnerCode").value, 30).toUpperCase();
      const pin = WA.Storage.sanitizeText($("#partnerPin").value, 12);
      const credentials = WA.Storage.get("wa_sessions").find((row) => row.type === "demo_credentials" && row.partnerCode === code && row.pin === pin);
      if (!credentials) {
        WA.UI.showToast("بيانات الدخول غير صحيحة", "error");
        return;
      }
      const sessions = WA.Storage.get("wa_sessions").filter((row) => row.type !== "partner_session");
      sessions.push({
        id: WA.Storage.randomToken("session"),
        type: "partner_session",
        partnerId: credentials.partnerId,
        createdAt: WA.Storage.now(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
      });
      WA.Storage.set("wa_sessions", sessions);
      location.href = "workshop-dashboard.html";
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

```

## `customer.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta name="description" content="ابدأ طلبك في منصة وين أوديها دون حساب أو كلمة مرور.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>ابدأ طلبك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="customer">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى JavaScript لتشغيل الرحلة والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main id="main-content" class="flow-shell">
    <div class="container flow-layout">
      <aside class="flow-sidebar" aria-label="تقدم الطلب">
        <div class="demo-badge">MVP تجريبي</div>
        <h1>طلب جديد</h1>
        <p id="flowServiceLabel">اختر الخدمة التي تحتاجها، وسنحفظ تقدمك تلقائيًا.</p>
        <div class="progress-wrap">
          <div class="progress-meta"><span id="progressLabel">اختيار الخدمة</span><span id="progressPercent">0%</span></div>
          <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="progressBar" class="progress-bar"></div></div>
        </div>
        <div class="legal-note mt-24">لا نعرض تشخيصًا نهائيًا أو سعرًا تقديريًا، ولا نظهر أي شريك قبل إنشاء الطلب والإحالة.</div>
      </aside>

      <div class="flow-content" aria-live="polite">
        <section class="flow-screen active" data-screen="service" tabindex="-1">
          <div class="kicker">الخطوة الأولى</div>
          <h2>وش تحتاج لسيارتك؟</h2>
          <p>المسار الرئيسي هو مشكلة السيارة. الخدمات الأخرى أقصر ولا تتضمن تحليلًا تشخيصيًا.</p>
          <div class="service-choice-grid" id="serviceChoices">
            <button class="service-choice primary" type="button" data-service="problem"><strong>عندي مشكلة في السيارة</strong><span>اكتب المشكلة بطريقتك ونحدد التخصص والاستعجال والخطوة التالية.</span></button>
            <button class="service-choice" type="button" data-service="parts"><strong>أبحث عن محل قطع غيار</strong><span>لا نطلب اسم القطعة؛ ندلك على محل مناسب لنوع السيارة.</span></button>
            <button class="service-choice" type="button" data-service="tow"><strong>أحتاج سطحة</strong><span>المدينة والموقع الدقيق وحالة السيارة.</span></button>
            <button class="service-choice" type="button" data-service="maintenance"><strong>أبحث عن صيانة دورية</strong><span>اختر الخدمة الدورية المطلوبة.</span></button>
          </div>
          <div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button id="serviceNext" class="btn btn-primary" type="button" disabled>التالي</button></div>
        </section>

        <section class="flow-screen" data-screen="customer" tabindex="-1">
          <div class="kicker">بيانات التواصل</div>
          <h2>بيانات بسيطة دون إنشاء حساب</h2>
          <p>نستخدم الاسم الأول والجوال لربط طلباتك ورسائل المتابعة التشغيلية فقط.</p>
          <form id="customerForm" novalidate>
            <div class="form-grid two">
              <div class="form-field"><label class="required" for="firstName">الاسم الأول</label><input id="firstName" name="firstName" autocomplete="given-name" maxlength="40" required><span class="field-error" data-error-for="firstName"></span></div>
              <div class="form-field"><label class="required" for="phone">رقم الجوال</label><input id="phone" name="phone" inputmode="tel" autocomplete="tel" placeholder="05XXXXXXXX" maxlength="10" required><span class="field-error" data-error-for="phone"></span></div>
            </div>
            <div class="checkbox-stack mt-24">
              <label class="checkbox-line"><input id="privacyAccepted" type="checkbox" required><span>أوافق على <a href="privacy.html" target="_blank" rel="noopener">سياسة الخصوصية</a> واستخدام البيانات لتشغيل الطلب.</span></label>
              <label class="checkbox-line"><input id="termsAccepted" type="checkbox" required><span>أوافق على <a href="terms.html" target="_blank" rel="noopener">الشروط وحدود مسؤولية المنصة</a>.</span></label>
              <label class="checkbox-line"><input id="marketingMessages" type="checkbox"><span>أوافق اختياريًا على الرسائل التسويقية. إيقافها لا يؤثر على رسائل متابعة الطلب.</span></label>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="service">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="vehicle" tabindex="-1">
          <div class="kicker">بيانات السيارة</div>
          <h2>اختر الشركة ثم الموديل</h2>
          <p>لن نعرض قائمة موديلات لا تخص الشركة المختارة.</p>
          <form id="vehicleForm" novalidate>
            <div class="form-grid two">
              <div class="form-field"><label class="required" for="make">الشركة المصنعة</label><select id="make" required></select><span class="field-error" data-error-for="make"></span></div>
              <div class="form-field" id="makeOtherField" hidden><label class="required" for="makeOther">اسم الشركة</label><input id="makeOther" maxlength="60"><span class="field-error" data-error-for="makeOther"></span></div>
              <div class="form-field"><label class="required" for="model">الموديل</label><select id="model" required disabled><option value="">اختر الشركة أولًا</option></select><span class="field-error" data-error-for="model"></span></div>
              <div class="form-field" id="modelOtherField" hidden><label class="required" for="modelOther">اسم الموديل</label><input id="modelOther" maxlength="60"><span class="field-error" data-error-for="modelOther"></span></div>
              <div class="form-field"><label id="yearLabel" class="required" for="year">سنة الصنع</label><select id="year" required></select><span class="field-error" data-error-for="year"></span></div>
              <div class="form-field" id="mileageField"><label class="required" for="mileage">ممشى السيارة</label><select id="mileage"></select><span class="field-hint">يطلب لمسار المشكلة والصيانة الدورية فقط.</span><span class="field-error" data-error-for="mileage"></span></div>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="customer">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="location" tabindex="-1">
          <div class="kicker">الموقع</div>
          <h2>ابدأ بالمدينة</h2>
          <p id="locationHelp">الموقع الدقيق اختياري، ولن نطلبه إلا عند الحاجة التشغيلية.</p>
          <form id="locationForm" novalidate>
            <div class="form-grid">
              <div class="form-field"><label class="required" for="city">المدينة</label><select id="city" required></select><span class="field-error" data-error-for="city"></span></div>
              <div class="form-field" id="preciseLocationField"><label id="preciseLocationLabel" for="preciseLocation">الموقع الدقيق أو وصف نقطة الالتقاء</label><input id="preciseLocation" maxlength="180" placeholder="مثال: حي الريان، قرب محطة كذا"><span class="field-hint" id="preciseLocationHint">اختياري لتحسين المطابقة، ولا تظهر مسافة غير موثقة.</span><span class="field-error" data-error-for="preciseLocation"></span></div>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="vehicle">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="path" tabindex="-1">
          <div class="kicker">تفاصيل الطلب</div>
          <h2 id="pathTitle">وش المشكلة في سيارتك؟</h2>
          <p id="pathDescription">اكتب وصفك بطريقتك ولا تحتاج إلى مصطلحات فنية.</p>
          <form id="pathForm" novalidate>
            <div id="problemFields">
              <div class="form-field"><label class="required" for="problem">وصف المشكلة</label><textarea id="problem" maxlength="1200" placeholder="مثال: السيارة ترج إذا وقفت عند الإشارة وأحيانًا تظهر لمبة المكينة"></textarea><span class="field-hint">اكتب متى تظهر المشكلة وأي لمبة أو صوت لاحظته.</span><span class="field-error" data-error-for="problem"></span></div>
            </div>
            <div id="partsFields" hidden><div class="info-panel"><strong>لا نطلب اسم القطعة في هذه النسخة</strong><p>سنرشح محلًا مناسبًا لنوع سيارتك، ثم تتأكد معه مباشرة من التوفر والسعر والمطابقة.</p></div></div>
            <div id="towFields" hidden>
              <div class="form-grid two">
                <div class="form-field"><label class="required" for="vehicleMoves">هل السيارة تتحرك؟</label><select id="vehicleMoves"></select><span class="field-error" data-error-for="vehicleMoves"></span></div>
                <div class="form-field"><label for="towDestination">الوجهة إن كانت معروفة</label><input id="towDestination" maxlength="180" placeholder="مثال: ورشة في بريدة"></div>
              </div>
              <div class="form-field mt-16"><label for="towNotes">وصف مختصر للحالة</label><textarea id="towNotes" maxlength="500" placeholder="مثال: السيارة لا تشتغل وموقفة في مكان آمن"></textarea></div>
            </div>
            <div id="maintenanceFields" hidden>
              <div class="form-field"><label class="required" for="maintenanceService">نوع الصيانة</label><select id="maintenanceService"></select><span class="field-error" data-error-for="maintenanceService"></span></div>
              <div class="form-field mt-16"><label for="maintenanceNotes">ملاحظة اختيارية</label><textarea id="maintenanceNotes" maxlength="500" placeholder="أي تفاصيل تساعد المركز على فهم الطلب"></textarea></div>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="location">السابق</button><button class="btn btn-primary" type="submit" id="pathSubmit">تحليل الطلب</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="analyzing" tabindex="-1">
          <div class="loading-shell">
            <div>
              <div class="loader-ring" aria-hidden="true"></div>
              <h2 class="mt-16">نفهم وصفك مبدئيًا</h2>
              <p class="muted">المحرك محلي وقائم على قواعد تجريبية، ولا يرسل بياناتك إلى خدمة خارجية.</p>
              <div class="loader-steps" id="analysisSteps">
                <div class="loader-step active">قراءة وصف العميل</div>
                <div class="loader-step">قياس كفاية المعلومات</div>
                <div class="loader-step">فحص مؤشرات الخطر</div>
                <div class="loader-step">تحديد التخصص والخطوة التالية</div>
              </div>
            </div>
          </div>
        </section>

        <section class="flow-screen" data-screen="questions" tabindex="-1">
          <div class="kicker">أسئلة توضيحية</div>
          <h2 id="questionTitle">سؤال 1 من 3</h2>
          <p id="questionText"></p>
          <div class="choice-grid" id="answerChoices" role="group" aria-label="خيارات الإجابة"></div>
          <div class="screen-actions"><button class="btn btn-ghost" type="button" id="questionBack">السابق</button><button class="btn btn-primary" type="button" id="questionNext" disabled>التالي</button></div>
        </section>

        <section class="flow-screen" data-screen="guidance" tabindex="-1">
          <div class="kicker">فهمنا مشكلتك</div>
          <h2>التوجيه الفني المبدئي</h2>
          <div id="dangerPanel" class="danger-panel" hidden></div>
          <div class="guidance-grid">
            <div class="guidance-item"><span>المشكلة المتوقعة مبدئيًا</span><strong id="expectedIssue"></strong></div>
            <div class="guidance-item"><span>التخصص المناسب</span><strong id="specialty"></strong></div>
            <div class="guidance-item"><span>درجة الاستعجال</span><strong id="urgency"></strong></div>
            <div class="guidance-item"><span>ما الذي يجب فعله الآن؟</span><strong id="nextStep"></strong></div>
          </div>
          <div class="legal-note" id="legalNotice"></div>
          <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="path">تعديل الوصف</button><button class="btn btn-primary" type="button" id="findPartner">وين أوديها؟</button></div>
        </section>

        <section class="flow-screen" data-screen="review" tabindex="-1">
          <div class="kicker">مراجعة الطلب</div>
          <h2>تأكد من التفاصيل قبل المطابقة</h2>
          <div id="reviewContent" class="guidance-grid"></div>
          <div id="serviceDisclaimer" class="legal-note"></div>
          <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="path">تعديل</button><button class="btn btn-primary" type="button" id="reviewMatch">ابحث عن شريك مناسب</button></div>
        </section>

        <section class="flow-screen" data-screen="matching" tabindex="-1">
          <div class="loading-shell">
            <div>
              <div class="loader-ring" aria-hidden="true"></div>
              <h2 class="mt-16">نطابق طلبك مع بيانات الشركاء</h2>
              <p class="muted">لن نغيّر مدينة شريك أو نخترع مسافة أو توفرًا.</p>
              <div class="loader-steps">
                <div class="loader-step active">تثبيت الطلب وحفظه</div>
                <div class="loader-step">تطبيق المدينة ونوع الخدمة</div>
                <div class="loader-step">استبعاد الشركاء غير النشطين</div>
                <div class="loader-step">تسجيل الإحالة قبل عرض البيانات</div>
              </div>
            </div>
          </div>
        </section>

        <section class="flow-screen" data-screen="result" tabindex="-1">
          <div id="resultHeader" class="request-header"></div>
          <div id="partnerResult"></div>
          <div class="card mt-16">
            <h3>رابط طلبك الخاص</h3>
            <p class="muted">لا يحتوي الرابط على رقم جوالك. احتفظ به للمتابعة وطلب بديل والتقييم.</p>
            <div class="form-field"><label for="privateLink">الرابط</label><input id="privateLink" readonly></div>
            <div class="button-row mt-16">
              <button class="btn btn-light" type="button" id="copyPrivateLink">نسخ الرابط</button>
              <a class="btn btn-dark" id="openTrackLink" href="track.html">فتح صفحة المتابعة</a>
            </div>
          </div>
          <div class="screen-actions"><a class="btn btn-ghost" href="index.html">الصفحة الرئيسية</a><div class="button-row"><button class="btn btn-light" type="button" id="copyWhatsapp">نسخ رسالة واتساب</button><a class="btn btn-primary" id="whatsappLink" href="index.html" target="_blank" rel="noopener">التواصل عبر واتساب</a></div></div>
        </section>

        <section class="flow-screen" data-screen="noMatch" tabindex="-1">
          <div class="empty-state">
            <div class="path-icon">!</div>
            <h2>لا يوجد تطابق حاليًا</h2>
            <p id="noMatchReason"></p>
            <div class="button-row mt-16"><button class="btn btn-light" type="button" data-back="location">تعديل المدينة</button><a class="btn btn-primary" href="index.html">العودة للرئيسية</a></div>
          </div>
        </section>
      </div>
    </div>
  </main>

  <div data-site-footer></div>
  <script defer src="assets/config.js"></script>
  <script defer src="assets/automotive-data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/seed.js"></script>
  <script defer src="assets/ai-engine.js"></script>
  <script defer src="assets/matching-engine.js"></script>
  <script defer src="assets/lifecycle.js"></script>
  <script defer src="assets/common.js"></script>
  <script defer src="assets/customer.js"></script>
</body>
</html>

```

## `index.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta name="description" content="وين أوديها منصة ويب عربية تساعد صاحب السيارة على فهم المشكلة مبدئيًا والوصول إلى شريك واحد مناسب.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>وين أوديها؟ — عندك مشكلة في السيارة؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="home">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main id="main-content">
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">منصة توجيه وإحالة سيارات — نسخة MVP تجريبية</div>
          <h1>عندك مشكلة في السيارة؟<br><span>قل لنا وش فيها… ونقول لك وين توديها.</span></h1>
          <p>نفهم وصفك مبدئيًا، ونحدد التخصص ودرجة الاستعجال والخطوة التالية، ثم نرشح لك شريكًا واحدًا مناسبًا داخل مدينتك. لا تشخيص نهائي، ولا أسعار تقديرية، ولا قائمة تربكك.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="customer.html?service=problem&fresh=1">ابدأ مسار المشكلة</a>
            <a class="btn btn-light" href="track.html">متابعة طلب سابق</a>
          </div>
          <div class="hero-assurances" aria-label="مزايا الخدمة">
            <span>بدون تطبيق</span><span>بدون كلمة مرور</span><span>شريك واحد كل مرة</span><span>متابعة عبر رابط خاص</span>
          </div>
        </div>

        <div class="hero-panel">
          <div class="demo-badge">بيانات الشركاء في العرض تجريبية وليست حقيقية</div>
          <div class="main-path-card">
            <div class="path-icon" aria-hidden="true">!</div>
            <h2>عندي مشكلة في السيارة</h2>
            <p>اشرح المشكلة بطريقتك، ونساعدك على فهم الاحتمال الأقرب والوصول إلى التخصص المناسب.</p>
            <a class="btn btn-primary btn-block mt-16" href="customer.html?service=problem&fresh=1">ابدأ طلبك</a>
          </div>
          <h3 class="mt-24">خدمات أخرى</h3>
          <div class="other-services">
            <a class="service-card" href="customer.html?service=parts&fresh=1"><div class="path-icon">ق</div><h3>محل قطع غيار</h3><p>ندلك على محل مناسب لنوع سيارتك.</p></a>
            <a class="service-card" href="customer.html?service=tow&fresh=1"><div class="path-icon">س</div><h3>أحتاج سطحة</h3><p>حدد موقع السيارة ونرشح مقدم خدمة واحدًا.</p></a>
            <a class="service-card" href="customer.html?service=maintenance&fresh=1"><div class="path-icon">ص</div><h3>صيانة دورية</h3><p>اختر الخدمة والسيارة والمدينة.</p></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">كيف تعمل المنصة؟</div>
          <h2>رحلة قصيرة، وقرار أوضح</h2>
          <p>نقلل المدخلات ونحتفظ بكل شيء داخل الطلب، بحيث لا تبدأ من الصفر عند طلب شريك بديل.</p>
        </div>
        <div class="cards-grid">
          <article class="card"><span class="pill">1</span><h3>اختر الخدمة</h3><p>المشكلة هي المسار الرئيسي، والخدمات الأخرى أبسط وأقصر.</p></article>
          <article class="card"><span class="pill">2</span><h3>أدخل بيانات السيارة</h3><p>الموديلات تتغير حسب الشركة، والموقع الدقيق لا يطلب إلا عند الحاجة.</p></article>
          <article class="card"><span class="pill">3</span><h3>نحدد التخصص</h3><p>محرك AI محلي تجريبي يقدم توقعًا احتماليًا واستعجالًا وخطوة تالية.</p></article>
          <article class="card"><span class="pill">4</span><h3>شريك واحد</h3><p>تُسجل الإحالة أولًا، ثم تظهر بيانات الشريك وواتساب ورابط المتابعة.</p></article>
          <article class="card"><span class="pill">5</span><h3>متابعة موثقة</h3><p>تأكيد الوصول وبدء الاستقبال، وتقييم مرتبط بإحالة فعلية.</p></article>
          <article class="card"><span class="pill">6</span><h3>بديل دون إعادة</h3><p>حتى ثلاثة شركاء داخل نفس الطلب مع استبعاد السابق.</p></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">بوابات مترابطة</div>
          <h2>نسخة تشغيلية للعميل والشريك</h2>
          <p>الحفظ والمحاكاة تتم محليًا داخل متصفحك عبر localStorage.</p>
        </div>
        <div class="portal-grid">
          <a class="card" href="customer.html?fresh=1"><div class="path-icon">ع</div><h3>بوابة العميل</h3><p>المسارات الأربعة، المطابقة، المتابعة، البدائل، والتقييم.</p><strong class="mt-16">ابدأ التجربة ←</strong></a>
          <a class="card" href="workshop-login.html"><div class="path-icon">ش</div><h3>بوابة الشريك</h3><p>الإحالات والحالات والاعتراضات والخصومات والرسوم والمطالبات.</p><strong class="mt-16">دخول تجريبي ←</strong></a>
          <a class="card" href="join.html"><div class="path-icon">+</div><h3>انضم كشريك</h3><p>نموذج متكيف للورش ومحلات القطع والسطحات ومراكز الصيانة.</p><strong class="mt-16">قدّم طلبًا ←</strong></a>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head"><div class="kicker">حدود الخدمة</div><h2>نقول الأمر كما هو</h2></div>
        <div class="cards-grid">
          <article class="card"><h3>ليست جهة تشخيص</h3><p>النتيجة مبدئية واحتمالية، والفحص النهائي لدى مقدم الخدمة المستقل.</p></article>
          <article class="card"><h3>لا نعرض أسعارًا متوقعة</h3><p>السعر والتوفر والمطابقة النهائية تتأكد مباشرة مع مقدم الخدمة.</p></article>
          <article class="card"><h3>لا نخترع شريكًا</h3><p>إذا لم يوجد تطابق في بيانات Seed، تظهر حالة واضحة بدل تغيير المدينة أو اختلاق مسافة.</p></article>
        </div>
      </div>
    </section>
  </main>

  <div data-site-footer></div>
  <script defer src="assets/config.js"></script>
  <script defer src="assets/automotive-data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/seed.js"></script>
  <script defer src="assets/lifecycle.js"></script>
  <script defer src="assets/common.js"></script>
</body>
</html>

```

## `join-status.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>حالة طلب الانضمام — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="join-status"><div data-site-header></div>
<main id="main-content" class="section"><div class="container">
  <section id="joinLookup" class="card"><div class="section-head"><div class="kicker">متابعة طلب الشراكة</div><h1>حالة طلب الانضمام</h1><p>استخدم الرابط الخاص أو رقم الطلب والجوال.</p></div><form id="joinLookupForm" class="form-grid two"><div class="form-field"><label class="required" for="joinNumber">رقم الطلب</label><input id="joinNumber" placeholder="JOIN-12345" required></div><div class="form-field"><label class="required" for="joinPhone">رقم الجوال</label><input id="joinPhone" inputmode="tel" maxlength="10" required></div><button class="btn btn-primary" type="submit">عرض الحالة</button></form></section>
  <section id="joinResult" class="card" hidden><div class="demo-badge">طلب تجريبي</div><div id="joinResultContent"></div><div class="button-row mt-16"><a class="btn btn-light" href="join-status.html">بحث آخر</a><a class="btn btn-primary" href="index.html">الرئيسية</a></div></section>
  <section id="joinNotFound" class="empty-state" hidden><h1>لم يتم العثور على الطلب</h1><p>تحقق من البيانات أو الرابط.</p><a class="btn btn-primary" href="join-status.html">المحاولة مرة أخرى</a></section>
</div></main><div data-site-footer></div>
<script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/join-status.js"></script>
</body></html>

```

## `join.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>انضم كشريك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="join">
  <div data-site-header></div>
  <main id="main-content" class="flow-shell">
    <div class="container flow-layout">
      <aside class="flow-sidebar">
        <div class="demo-badge">طلب انضمام تجريبي</div>
        <h1>انضم إلى شبكة الشركاء</h1>
        <p>النموذج يتكيف مع الورشة أو محل قطع الغيار أو مقدم السطحة.</p>
        <div class="progress-wrap"><div class="progress-meta"><span id="joinProgressLabel">نوع الشريك</span><span id="joinProgressPercent">25%</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25"><div id="joinProgressBar" class="progress-bar"></div></div></div>
        <div class="legal-note mt-24">لا يطلب نموذج محل القطع إدخال المخزون، ولا يطلب نموذج السطحة بيانات ورشة لا تخصه.</div>
      </aside>

      <div class="flow-content">
        <form id="joinForm" novalidate>
          <section class="flow-screen active" data-join-step="1" tabindex="-1">
            <div class="kicker">الخطوة 1 من 4</div><h2>نوع الشريك والبيانات الأساسية</h2>
            <div class="form-grid two">
              <div class="form-field"><label class="required" for="partnerType">نوع الشريك</label><select id="partnerType" required><option value="">اختر</option><option value="workshop">ورشة أو مركز فحص</option><option value="maintenance">مركز صيانة دورية</option><option value="parts">محل قطع غيار</option><option value="tow">مقدم خدمة سطحة</option></select></div>
              <div class="form-field"><label class="required" for="businessName">اسم المنشأة أو مقدم الخدمة</label><input id="businessName" maxlength="100" required></div>
              <div class="form-field"><label class="required" for="joinCity">المدينة الرئيسية</label><select id="joinCity" required></select></div>
              <div class="form-field"><label class="required" for="joinWhatsapp">رقم واتساب</label><input id="joinWhatsapp" inputmode="tel" placeholder="05XXXXXXXX" maxlength="10" required></div>
              <div class="form-field"><label class="required" for="exactLocation">الموقع أو وصفه</label><input id="exactLocation" maxlength="180" required></div>
              <div class="form-field"><label class="required" for="workingHours">ساعات العمل</label><input id="workingHours" maxlength="100" placeholder="مثال: 8 ص إلى 10 م" required></div>
            </div>
            <div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button class="btn btn-primary" type="button" data-join-next="2">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="2" tabindex="-1">
            <div class="kicker">الخطوة 2 من 4</div><h2>الخدمات والتغطية</h2>
            <div class="form-field"><label class="required" for="coverageCities">مدن أو مناطق التغطية</label><select id="coverageCities" multiple size="6" required></select><span class="field-hint">استخدم Ctrl أو Command لاختيار أكثر من مدينة.</span></div>
            <div id="workshopAdaptive" class="mt-16" hidden>
              <div class="form-grid two"><div class="form-field"><label class="required" for="mainSpecialty">التخصص الرئيسي</label><select id="mainSpecialty"><option value="">اختر</option><option>فحص وتشخيص عام</option><option>ميكانيكا وكهرباء محرك</option><option>كهرباء سيارات</option><option>تكييف سيارات</option><option>عفشة وتعليق وتوجيه</option><option>فرامل</option><option>ناقل حركة</option></select></div><div class="form-field"><label for="subSpecialties">تخصصات إضافية</label><input id="subSpecialties" maxlength="250" placeholder="افصل بينها بفاصلة"></div></div>
            </div>
            <div id="partsAdaptive" class="mt-16" hidden><div class="info-panel"><strong>لا نطلب مخزون القطع</strong><p>يكفي تحديد الشركات التي يخدمها المحل. توفر القطعة يتأكد منه العميل مباشرة.</p></div></div>
            <div id="towAdaptive" class="mt-16" hidden><div class="form-field"><label class="required" for="towVehicleTypes">أنواع المركبات الممكن نقلها</label><input id="towVehicleTypes" maxlength="250" placeholder="سيارات ركوب، دفع رباعي..."> </div></div>
            <div id="maintenanceAdaptive" class="mt-16" hidden><div class="form-field"><label class="required" for="maintenanceServicesJoin">خدمات الصيانة</label><select id="maintenanceServicesJoin" multiple size="6"></select></div></div>
            <div id="makesAdaptive" class="mt-16"><div class="form-field"><label class="required" for="servedMakes">الشركات المصنعة التي تخدمها</label><select id="servedMakes" multiple size="8"></select><span class="field-hint">حدد الشركات الفعلية فقط.</span></div></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="1">السابق</button><button class="btn btn-primary" type="button" data-join-next="3">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="3" tabindex="-1">
            <div class="kicker">الخطوة 3 من 4</div><h2>الخصم الاختياري</h2>
            <p>لا يظهر الخصم للعملاء إلا إذا كانت النسبة والخدمات والشروط والمدة واضحة.</p>
            <label class="checkbox-line"><input id="offersDiscount" type="checkbox"><span>أرغب بتقديم خصم لعملاء وين أوديها</span></label>
            <div id="discountJoinFields" class="form-grid two mt-16" hidden>
              <div class="form-field"><label class="required" for="joinDiscountPercent">نسبة الخصم %</label><input id="joinDiscountPercent" type="number" min="1" max="50"></div>
              <div class="form-field"><label class="required" for="joinDiscountServices">الخدمات المشمولة</label><input id="joinDiscountServices" maxlength="180"></div>
              <div class="form-field"><label class="required" for="joinDiscountConditions">الشروط والاستثناءات</label><textarea id="joinDiscountConditions" maxlength="500"></textarea></div>
              <div class="form-grid two"><div class="form-field"><label class="required" for="joinDiscountStart">يبدأ</label><input id="joinDiscountStart" type="date"></div><div class="form-field"><label class="required" for="joinDiscountEnd">ينتهي</label><input id="joinDiscountEnd" type="date"></div></div>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="2">السابق</button><button class="btn btn-primary" type="button" data-join-next="4">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="4" tabindex="-1">
            <div class="kicker">الخطوة 4 من 4</div><h2>الموافقات وإرسال الطلب</h2>
            <div id="joinReview" class="guidance-grid"></div>
            <div class="checkbox-stack mt-24">
              <label class="checkbox-line"><input id="agreementAccepted" type="checkbox" required><span>أوافق على اتفاقية الشراكة، ومنها استحقاق الرسم عند وصول العميل وبدء الاستقبال أو الفحص.</span></label>
              <label class="checkbox-line"><input id="feesAccepted" type="checkbox" required><span>أوافق على الرسوم الثابتة والتسوية عند 100 ريال أو نهاية الشهر.</span></label>
              <label class="checkbox-line"><input id="ratingsAccepted" type="checkbox" required><span>أوافق على التقييمات الموثقة وسياسة الاعتراضات دون حذف مباشر.</span></label>
              <label class="checkbox-line"><input id="privacyTrustAccepted" type="checkbox" required><span>أوافق على سياسة الخصوصية والثقة وعدم استخدام بيانات العميل للتسويق دون موافقته.</span></label>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="3">السابق</button><button class="btn btn-primary" type="submit">إرسال طلب الانضمام</button></div>
          </section>
        </form>

        <section id="joinSuccess" class="flow-screen" tabindex="-1">
          <div class="success-panel"><strong>تم إرسال طلب الانضمام</strong><p>احتفظ برقم الطلب والجوال لمتابعة الحالة.</p></div>
          <div class="guidance-grid mt-16"><div class="guidance-item"><span>رقم طلب الانضمام</span><strong id="joinApplicationNumber"></strong></div><div class="guidance-item"><span>الحالة</span><strong>تم الاستلام — مراجعة تجريبية</strong></div></div>
          <div class="screen-actions"><a id="joinStatusLink" class="btn btn-primary" href="join-status.html">متابعة الطلب</a><a class="btn btn-light" href="index.html">الرئيسية</a></div>
        </section>
      </div>
    </div>
  </main>
  <div data-site-footer></div>
  <script defer src="assets/config.js"></script>
  <script defer src="assets/automotive-data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/seed.js"></script>
  <script defer src="assets/lifecycle.js"></script>
  <script defer src="assets/common.js"></script>
  <script defer src="assets/join.js"></script>
</body>
</html>

```

## `netlify.toml`

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(self), camera=(), microphone=(), payment=()"
    Cross-Origin-Opener-Policy = "same-origin"

```

## `payment.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>سداد المطالبة — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="payment"><div data-site-header></div>
<main id="main-content" class="section"><div class="container">
  <section id="paymentCard" class="card"><div class="demo-badge">عملية دفع تجريبية — لا يتم خصم أي مبلغ حقيقي</div><div class="section-head"><div class="kicker">تسوية رسوم الشريك</div><h1>سداد مطالبة مالية</h1><p>هذه الصفحة تحاكي الدفع فقط، ولا تجمع بيانات بطاقة أو حساب مصرفي.</p></div><div id="claimSummary" class="guidance-grid"></div><form id="paymentForm" class="form-grid mt-24"><fieldset class="form-field"><legend class="required">طريقة السداد التجريبية</legend><label class="radio-line"><input type="radio" name="paymentMethod" value="demo_bank_transfer" checked> تحويل بنكي تجريبي</label><label class="radio-line"><input type="radio" name="paymentMethod" value="demo_sadad"> سداد تجريبي</label></fieldset><label class="checkbox-line"><input id="confirmDemoPayment" type="checkbox" required><span>أفهم أن هذه عملية تجريبية ولا تمثل دفعًا حقيقيًا.</span></label><button class="btn btn-primary" type="submit">تسجيل السداد التجريبي</button></form></section>
  <section id="paymentMissing" class="empty-state" hidden><h1>المطالبة غير موجودة</h1><p>تحقق من الرابط أو ارجع إلى لوحة الشريك.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة للوحة</a></section>
</div></main><div data-site-footer></div>
<script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/payment.js"></script>
</body></html>

```

## `privacy.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>سياسة الخصوصية — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="privacy"><div data-site-header></div>
<main id="main-content" class="section"><article class="container card"><div class="section-head"><div class="kicker">نسخة MVP تجريبية</div><h1>سياسة الخصوصية</h1><p>توضح هذه الصفحة طريقة تعامل النموذج التجريبي مع البيانات داخل المتصفح.</p></div>
<h2>البيانات التي نجمعها</h2><p>الاسم الأول، رقم الجوال، بيانات السيارة، المدينة، الموقع الدقيق عند الحاجة، وصف المشكلة، الإجابات، بيانات الطلب والإحالات، تأكيدات الوصول، والتقييمات.</p>
<h2>أغراض الاستخدام</h2><p>إنشاء الطلب، تحليل الاحتياج بصورة مبدئية، اختيار الشريك، تسجيل الإحالة، المتابعة، التقييم، إدارة الاعتراضات، وتحسين جودة التشغيل.</p>
<h2>مكان التخزين في النسخة التجريبية</h2><p>تخزن البيانات في localStorage داخل المتصفح المستخدم. لا يوجد خادم خلفي أو مزامنة بين الأجهزة في هذه النسخة. حذف بيانات الموقع من المتصفح يحذف النسخة المحلية.</p>
<h2>مشاركة البيانات</h2><p>لا يعرض للشريك إلا ما يلزم لفهم الإحالة والتعامل معها. لا تستخدم بيانات العميل للتسويق من الشريك دون موافقة مستقلة.</p>
<h2>الرسائل التشغيلية والتسويقية</h2><p>الموافقة على الرسائل التشغيلية لازمة لمتابعة طلب قائم. الموافقة التسويقية اختيارية، ويمكن رفضها دون التأثير على رسائل الطلب الضرورية.</p>
<h2>الاحتفاظ والحذف</h2><p>الإغلاق الإداري لا يحذف السجل. قبل الإطلاق الفعلي يجب اعتماد سياسة احتفاظ وحذف متوافقة مع الأنظمة السعودية، وتوفير قناة رسمية لطلبات الوصول والتصحيح والحذف.</p>
<div class="warning-panel mt-24"><strong>تنبيه قانوني</strong><p>هذه صياغة تشغيلية أولية للعرض وليست استشارة قانونية نهائية. يلزم مراجعتها واعتمادها نظاميًا قبل الإطلاق التجاري.</p></div></article></main>
<div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script>
</body></html>

```

## `receipt.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>إيصال تجريبي — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="receipt"><div data-site-header></div>
<main id="main-content" class="section"><div class="container"><section id="receiptCard" class="receipt"><div class="receipt-head"><div><div class="demo-badge">إيصال تجريبي غير مالي</div><h1>إيصال سداد</h1></div><div class="brand"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>رسوم الشريك</small></span></div></div><div id="receiptContent"></div><div class="button-row mt-24 no-print"><button class="btn btn-primary" type="button" id="printReceipt">طباعة</button><a class="btn btn-light" href="workshop-dashboard.html">العودة للوحة</a></div></section><section id="receiptMissing" class="empty-state" hidden><h1>الإيصال غير موجود</h1><p>لا يمكن إنشاء إيصال دون سجل دفع صحيح.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة للوحة</a></section></div></main><div data-site-footer></div>
<script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/receipt.js"></script>
</body></html>

```

## `terms.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>الشروط وحدود المسؤولية — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="terms"><div data-site-header></div>
<main id="main-content" class="section"><article class="container card"><div class="section-head"><div class="kicker">حدود الخدمة</div><h1>الشروط وحدود المسؤولية</h1><p>تنظم هذه الصفحة استخدام النموذج التشغيلي التجريبي.</p></div>
<h2>طبيعة المنصة</h2><p>«وين أوديها» منصة توجيه وإحالة. لا تفحص السيارة، ولا تقدم تشخيصًا نهائيًا، ولا تنفذ إصلاحًا أو بيع قطع أو نقلًا أو صيانة.</p>
<h2>التوجيه الفني</h2><p>أي توقع فني يظهر هو احتمال مبدئي مبني على البيانات المدخلة، ولا يغني عن الفحص الفعلي. لا ينبغي استبدال قطعة أو اتخاذ قرار إصلاحي بناءً عليه وحده.</p>
<h2>السلامة</h2><p>عند ظهور مؤشرات خطر مثل ضعف الفرامل أو رائحة الوقود أو ارتفاع الحرارة أو توقف السيارة في موقع خطر، يجب عدم الاستمرار في القيادة إذا كان ذلك غير آمن، واستخدام السطحة أو التواصل مع الجهة المناسبة للحالة.</p>
<h2>مسؤولية مقدم الخدمة</h2><p>مقدم الخدمة شريك مستقل وهو المسؤول عن الفحص والتشخيص النهائي وجودة العمل والضمانات والاتفاق المالي مع العميل.</p>
<h2>الأسعار والتوفر</h2><p>لا تعرض المنصة أسعارًا تقديرية. السعر والتوفر والموعد والمطابقة النهائية تتأكد مباشرة مع مقدم الخدمة.</p>
<h2>الإحالات والرسوم</h2><p>تسجل الإحالة قبل إظهار بيانات الشريك. يستحق رسم المنصة على الشريك عند وصول العميل وبدء استقباله أو فحصه، وفق اتفاقية الشراكة، وليس عند فتح واتساب أو انتظار اكتمال الإصلاح.</p>
<h2>التقييمات والاعتراضات</h2><p>التقييمات مرتبطة بطلب وإحالة وتجربة مؤكدة. لا يحذف الشريك تقييمًا بنفسه، ويمكنه تقديم اعتراض يخضع للمراجعة.</p>
<h2>بيانات Seed</h2><p>جميع أسماء الشركاء وأرقامهم ومواقعهم وتقييماتهم في النسخة الحالية بيانات تجريبية للعرض وليست بيانات منشآت حقيقية.</p>
<div class="warning-panel mt-24"><strong>قبل الإطلاق</strong><p>يلزم إعداد اتفاقية شراكة وسياسة خصوصية وشروط استخدام معتمدة ومراجعة نظامية وتقنية مستقلة.</p></div></article></main>
<div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script>
</body></html>

```

## `tests/qa-unit.js`

```javascript
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { webcrypto } = require('crypto');

class LocalStorageMock {
  constructor() { this.store = new Map(); }
  getItem(key) { return this.store.has(key) ? this.store.get(key) : null; }
  setItem(key, value) { this.store.set(key, String(value)); }
  removeItem(key) { this.store.delete(key); }
  clear() { this.store.clear(); }
}

const context = {
  console,
  Date,
  Math,
  Intl,
  JSON,
  Array,
  Object,
  String,
  Number,
  Boolean,
  RegExp,
  Error,
  Map,
  Set,
  Uint8Array,
  localStorage: new LocalStorageMock(),
  crypto: webcrypto,
  setTimeout,
  clearTimeout
};
context.window = context;
context.globalThis = context;
vm.createContext(context);

const root = path.resolve(__dirname, '..');
[
  'assets/config.js',
  'assets/automotive-data.js',
  'assets/storage.js',
  'assets/seed.js',
  'assets/ai-engine.js',
  'assets/matching-engine.js',
  'assets/lifecycle.js'
].forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file }));

const { WA } = context;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const log = (message) => console.log(`✓ ${message}`);

WA.Storage.init();
WA.Seed.run();

assert(WA.Config.storageKeys.every((key) => context.localStorage.getItem(key) !== null), 'All storage keys should exist');
log('إنشاء جميع مفاتيح localStorage المطلوبة');

const partners = WA.Storage.get('wa_partners');
assert(partners.length === 60, `Expected 60 demo partners, got ${partners.length}`);
assert(partners.every((partner) => partner.isDemo && partner.demoNotice), 'All seed partners must be marked demo');
log('Seed غير هدّام وموسوم بوضوح كتجريبي');

const danger = WA.AIEngine.assess({ description: 'الفرامل ما تمسك وفيه ريحة بنزين والسيارة واقفة في طريق سريع' });
assert(danger.urgency === 'خطرة' && danger.questions.length === 0, 'Danger path failed');
log('اكتشاف الأعراض الخطرة دون طرح أسئلة أو طمأنة غير مناسبة');

const clear = WA.AIEngine.assess({ description: 'السيارة ترج بقوة إذا وقفت عند الإشارة وتظهر لمبة المكينة والعزم صار ضعيف' });
assert(clear.specialty === 'ميكانيكا وكهرباء محرك', 'Engine classification failed');
assert(clear.questions.length <= 3, 'Question limit exceeded');
log('التوجيه الاحتمالي والأسئلة من صفر إلى ثلاثة غالبًا');

const vague = WA.AIEngine.assess({ description: 'فيها مشكلة' });
assert(vague.expectedIssue.includes('لا تتوفر معلومات كافية'), 'Insufficient-information fallback failed');
log('عدم اختلاق مشكلة متوقعة عند نقص المعلومات');

const payload = {
  serviceType: 'problem',
  customer: { firstName: 'اختبار', phone: '0551234567' },
  consents: { privacyAccepted: true, termsAccepted: true, marketingMessages: false },
  vehicle: { make: 'تويوتا', model: 'كامري', year: '2022', mileage: 'من 50 إلى 100 ألف كم' },
  city: 'بريدة',
  problem: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة',
  ai: WA.AIEngine.finalize({ description: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة', vehicle: { make: 'تويوتا' }, questions: [], answers: [] })
};
const created = WA.Lifecycle.createRequest(payload);
assert(created.request.publicToken && !created.request.publicToken.includes(payload.customer.phone), 'Public token leaked phone');
log('إنشاء publicToken عشوائي دون رقم الجوال');

const match = WA.Matching.match({ request: created.request, excludedPartnerIds: [] });
assert(match.partner && match.partner.city === 'بريدة', 'Matching fabricated or ignored city');
assert(match.partner.coverageCities.includes('بريدة'), 'Coverage mismatch');
log('مطابقة تعتمد على المدينة والتغطية دون تعديل بيانات الشريك');

const referral1 = WA.Lifecycle.createReferral(created.request.id, match.partner.id, match.reason);
WA.Lifecycle.markReferralShown(referral1.id);
assert(WA.Storage.findById('wa_requests', created.request.id).activeReferralId === referral1.id, 'Referral not attached');
log('إنشاء الطلب والإحالة قبل عرض الشريك');

const serviceRequests = [
  { serviceType: 'parts', city: 'بريدة', maintenanceService: '' },
  { serviceType: 'tow', city: 'بريدة', preciseLocation: 'حي تجريبي', vehicleMoves: 'لا تتحرك' },
  { serviceType: 'maintenance', city: 'بريدة', maintenanceService: 'تغيير الزيت والفلاتر' }
];
for (const item of serviceRequests) {
  const probe = { ...created.request, ...item, id: `PROBE-${item.serviceType}`, activeReferralId: '', referralCount: 0 };
  const result = WA.Matching.match({ request: probe, excludedPartnerIds: [] });
  assert(result.partner && result.partner.type === WA.Matching.typeForService(item.serviceType), `Matching failed for ${item.serviceType}`);
}
log('نجاح المطابقة للمسارات الأربعة من بيانات Seed');

const noMatchProbe = { ...created.request, id: 'PROBE-NOMATCH', city: 'البدائع', serviceType: 'problem' };
const noMatch = WA.Matching.match({ request: noMatchProbe, excludedPartnerIds: [] });
assert(!noMatch.partner && noMatch.reason.includes('لا يوجد شريك'), 'No-match state failed');
log('إظهار حالة واضحة عند عدم وجود تطابق دون اختلاق شريك');

WA.Lifecycle.saveDraft({ screen: 'vehicle', serviceType: 'problem', marker: 'qa' });
assert(WA.Lifecycle.loadDraft().marker === 'qa', 'Draft restoration failed');
WA.Lifecycle.clearDraft();
assert(WA.Lifecycle.loadDraft() === null, 'Draft clearing failed');
log('حفظ المسودة واستعادتها بعد إعادة التحميل');

WA.Lifecycle.confirmArrival(referral1.id, 'customer');
assert(!WA.Storage.get('wa_fees').some((fee) => fee.referralId === referral1.id), 'Fee created on arrival only');
log('عدم استحقاق الرسم عند الوصول وحده');

WA.Lifecycle.confirmIntake(referral1.id, 'partner');
const referralFee = WA.Storage.get('wa_fees').filter((fee) => fee.referralId === referral1.id);
assert(referralFee.length === 1, 'Fee not created after arrival + intake');
WA.Lifecycle.ensureFee(referral1.id);
assert(WA.Storage.get('wa_fees').filter((fee) => fee.referralId === referral1.id).length === 1, 'Duplicate fee created');
log('استحقاق رسم واحد فقط بعد الوصول وبدء الاستقبال أو الفحص');

const excluded1 = WA.Lifecycle.requestAlternative(created.request.id, 'لم يتم الرد');
const requestAfter1 = WA.Storage.findById('wa_requests', created.request.id);
const match2 = WA.Matching.match({ request: requestAfter1, excludedPartnerIds: excluded1 });
assert(match2.partner && match2.partner.id !== match.partner.id, 'Previous partner not excluded');
const referral2 = WA.Lifecycle.createReferral(created.request.id, match2.partner.id, match2.reason);
const excluded2 = WA.Lifecycle.requestAlternative(created.request.id, 'لم نتفق على الموعد');
const match3 = WA.Matching.match({ request: WA.Storage.findById('wa_requests', created.request.id), excludedPartnerIds: excluded2 });
assert(match3.partner && !excluded2.includes(match3.partner.id), 'Third partner exclusion failed');
WA.Lifecycle.createReferral(created.request.id, match3.partner.id, match3.reason);
let fourthBlocked = false;
try { WA.Lifecycle.requestAlternative(created.request.id, 'سبب آخر'); } catch (_) { fourthBlocked = true; }
assert(fourthBlocked, 'Fourth referral should be blocked');
log('ثلاث إحالات بحد أقصى مع استبعاد الشركاء السابقين');

let ratingBlocked = false;
const payload2 = { ...payload, customer: { firstName: 'اختبار2', phone: '0551234568' } };
const created2 = WA.Lifecycle.createRequest(payload2);
const matchSecondRequest = WA.Matching.match({ request: created2.request, excludedPartnerIds: [] });
const untouchedReferral = WA.Lifecycle.createReferral(created2.request.id, matchSecondRequest.partner.id, matchSecondRequest.reason);
try {
  WA.Lifecycle.createRating({ requestId: created2.request.id, referralId: untouchedReferral.id, overall: 5, treatment: 5, commitment: 5, clarity: 5, serviceQuality: 5, fairness: 5, recommend: 'yes' });
} catch (_) { ratingBlocked = true; }
assert(ratingBlocked, 'Unverified rating should be blocked');
log('منع التقييم قبل تجربة فعلية مؤكدة');

const rating = WA.Lifecycle.createRating({ requestId: created.request.id, referralId: referral1.id, overall: 5, treatment: 5, commitment: 4, clarity: 5, serviceQuality: 4, fairness: 4, recommend: 'yes', comment: '<script>test</script> تجربة جيدة' });
assert(rating.isVerified && !rating.comment.includes('<'), 'Rating sanitization/verification failed');
log('تقييم موثق وتعقيم المحتوى المدخل');

const objection = WA.Lifecycle.createObjection({ partnerId: match.partner.id, referralId: referral1.id, type: 'referral', reason: 'العميل لم يصل', details: 'اعتراض تجريبي' });
assert(objection.status === 'new', 'Objection not created');
assert(WA.Storage.get('wa_fees').find((fee) => fee.referralId === referral1.id).status === 'disputed', 'Disputed fee not held');
log('تعليق الرسم المتنازع عليه عند الاعتراض');

const feePartner = match.partner.id;
for (let i = 0; i < 4; i += 1) {
  const rid = `REF-QA-${i}`;
  const qreq = `REQ-QA-${i}`;
  WA.Storage.upsert('wa_requests', { id: qreq, humanId: `WA-QA-${i}`, publicToken: `qa_token_${i}`, customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'problem', city: 'بريدة', status: 'intake_started', lastActivityAt: WA.Storage.now() });
  WA.Storage.upsert('wa_referrals', { id: rid, requestId: qreq, partnerId: feePartner, order: 1, status: 'intake_started', customerArrivalConfirmedAt: WA.Storage.now(), partnerIntakeConfirmedAt: WA.Storage.now() });
  WA.Storage.insertUnique('wa_fees', { id: `FEE-QA-${i}`, referralId: rid, partnerId: feePartner, amount: 25, event: 'arrival_and_intake_started', status: 'unclaimed', eligibleAt: WA.Storage.now() }, ['referralId']);
}
const claim = WA.Lifecycle.issueClaim(feePartner, 'threshold');
assert(claim && claim.amount >= 100, 'Threshold claim not issued');
log('إصدار مطالبة عند بلوغ 100 ريال');

const payment = WA.Lifecycle.registerPayment(claim.id, 'demo_bank_transfer');
assert(payment.status === 'paid' && WA.Storage.findById('wa_claims', claim.id).status === 'paid', 'Payment not applied');
log('تسجيل دفع وإيصال تجريبي وإغلاق المطالبة');

const feePartnerIdsBeforeMonthly = new Set(WA.Storage.get('wa_fees').map((row) => row.partnerId));
const monthlyPartner = partners.find((row) => row.id !== feePartner && row.type === 'workshop' && !feePartnerIdsBeforeMonthly.has(row.id));
WA.Storage.upsert('wa_requests', { id: 'REQ-MONTHLY-QA', humanId: 'WA-MONTHLY-QA', publicToken: 'monthly_qa_token', customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'problem', city: monthlyPartner.city, status: 'intake_started', lastActivityAt: WA.Storage.now() });
WA.Storage.upsert('wa_referrals', { id: 'REF-MONTHLY-QA', requestId: 'REQ-MONTHLY-QA', partnerId: monthlyPartner.id, order: 1, status: 'intake_started', customerArrivalConfirmedAt: WA.Storage.now(), partnerIntakeConfirmedAt: WA.Storage.now() });
WA.Storage.upsert('wa_fees', { id: 'FEE-MONTHLY-QA', referralId: 'REF-MONTHLY-QA', partnerId: monthlyPartner.id, amount: 25, event: 'arrival_and_intake_started', status: 'unclaimed', eligibleAt: new Date(Date.now() - 40 * 86400000).toISOString() });
WA.Lifecycle.maybeIssueClaims();
const monthlyClaim = WA.Storage.get('wa_claims').find((row) => row.partnerId === monthlyPartner.id && row.reason === 'monthly_settlement');
assert(monthlyClaim && monthlyClaim.amount === 25, 'Monthly settlement claim failed');
log('إصدار مطالبة شهرية حتى لو كان الرصيد أقل من 100 ريال');

WA.Storage.upsert('wa_claims', { ...monthlyClaim, status: 'issued', dueAt: new Date(Date.now() - 86400000).toISOString() });
WA.Lifecycle.runSweep();
const suspendedPartner = WA.Storage.findById('wa_partners', monthlyPartner.id);
assert(suspendedPartner.paymentStatus === 'overdue' && suspendedPartner.partnershipStatus === 'suspended_financial', 'Overdue suspension failed');
log('تعليق الشريك المتأخر عن السداد واستبعاده من المطابقة');
const monthlyPayment = WA.Lifecycle.registerPayment(monthlyClaim.id, 'demo_bank_transfer');
const reactivatedPartner = WA.Storage.findById('wa_partners', monthlyPartner.id);
assert(monthlyPayment.status === 'paid' && reactivatedPartner.paymentStatus === 'current' && reactivatedPartner.partnershipStatus === 'active', 'Reactivation after payment failed');
log('إعادة تفعيل الشريك بعد تسوية المطالبة');

const oldRequest = WA.Storage.upsert('wa_requests', { id: 'REQ-OLD-QA', humanId: 'WA-OLD-QA', publicToken: 'old_qa_token', customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'parts', city: 'بريدة', status: 'referred', lastActivityAt: new Date(Date.now() - 6 * 86400000).toISOString() });
WA.Lifecycle.runSweep();
assert(WA.Storage.findById('wa_requests', oldRequest.id).status === 'administratively_closed', 'Administrative closure failed');
log('الإغلاق الإداري بعد خمسة أيام دون حذف السجل');

const issues = WA.Storage.integrityCheck();
assert(issues.length === 0, `Integrity issues: ${issues.join('; ')}`);
log('سلامة العلاقات المرجعية بين الجداول');

console.log('\nALL_UNIT_QA_PASSED');

```

## `tests/static_audit.py`

```python
from pathlib import Path
from bs4 import BeautifulSoup
import re, sys, json

root = Path(__file__).resolve().parents[1]
html_files = sorted(root.glob('*.html'))
issues = []
metrics = {'html_files': len(html_files), 'links': 0, 'scripts': 0, 'controls': 0}

for file in html_files:
    soup = BeautifulSoup(file.read_text(encoding='utf-8'), 'html.parser')
    if soup.html is None or soup.html.get('lang') != 'ar' or soup.html.get('dir') != 'rtl':
        issues.append(f'{file.name}: missing Arabic RTL')
    if not soup.find('meta', attrs={'name':'viewport'}):
        issues.append(f'{file.name}: missing viewport')
    if not soup.find('meta', attrs={'http-equiv':'Content-Security-Policy'}):
        issues.append(f'{file.name}: missing CSP meta')
    ids = [tag.get('id') for tag in soup.find_all(attrs={'id': True})]
    duplicates = sorted({x for x in ids if ids.count(x) > 1})
    if duplicates:
        issues.append(f'{file.name}: duplicate ids {duplicates}')
    for tag in soup.find_all(['a','link','script']):
        attr = 'href' if tag.name in ('a','link') else 'src'
        value = tag.get(attr)
        if not value:
            continue
        if tag.name == 'script': metrics['scripts'] += 1
        else: metrics['links'] += 1
        clean = value.split('?')[0].split('#')[0]
        if not clean or clean.startswith(('http://','https://','mailto:','tel:','data:','javascript:')):
            continue
        target = (file.parent / clean).resolve()
        if not target.exists():
            issues.append(f'{file.name}: dead local reference {value}')
    for control in soup.find_all(['input','select','textarea']):
        if control.get('type') == 'hidden':
            continue
        metrics['controls'] += 1
        cid = control.get('id')
        labelled = cid and soup.find('label', attrs={'for': cid})
        wrapped = control.find_parent('label')
        aria = control.get('aria-label') or control.get('aria-labelledby')
        if not (labelled or wrapped or aria):
            issues.append(f'{file.name}: unlabelled control {cid or control.name}')
    for button in soup.find_all('button'):
        if not button.get('type'):
            issues.append(f'{file.name}: button without type')

css = (root / 'assets/styles.css').read_text(encoding='utf-8')
if css.count('{') != css.count('}'):
    issues.append('styles.css: unbalanced braces')
if '@media (prefers-reduced-motion: reduce)' not in css:
    issues.append('styles.css: missing reduced motion support')

required_keys = [
  'wa_customers','wa_vehicles','wa_requests','wa_partners','wa_referrals','wa_ratings',
  'wa_objections','wa_discounts','wa_fees','wa_claims','wa_payments','wa_join_applications',
  'wa_consents','wa_sessions','wa_meta'
]
config = (root / 'assets/config.js').read_text(encoding='utf-8')
for key in required_keys:
    if key not in config:
        issues.append(f'config.js: missing {key}')

prohibited = [r'سعر متوقع', r'تكلفة متوقعة', r'الأرخص']
for file in list(root.glob('*.html')) + list((root/'assets').glob('*.js')):
    text = file.read_text(encoding='utf-8')
    for pattern in prohibited:
        if re.search(pattern, text) and 'لا نعرض' not in text and 'لا تعرض' not in text:
            issues.append(f'{file.name}: potentially prohibited pricing claim: {pattern}')

print(json.dumps({'metrics': metrics, 'issues': issues}, ensure_ascii=False, indent=2))
if issues:
    sys.exit(1)

```

## `track.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta name="description" content="متابعة طلب وين أوديها عبر رابط خاص دون كلمة مرور.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>متابعة الطلب — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="track">
  <div data-site-header></div>
  <main id="main-content" class="section">
    <div class="container">
      <section id="lookupSection" class="card">
        <div class="section-head"><div class="kicker">متابعة دون كلمة مرور</div><h1>افتح رابط طلبك الخاص</h1><p>الرابط الخاص هو الأسهل. ويمكن الاسترجاع يدويًا برقم الطلب والجوال دون وضع الجوال في عنوان الصفحة.</p></div>
        <form id="lookupForm" class="form-grid two" novalidate>
          <div class="form-field"><label class="required" for="requestNumber">رقم الطلب</label><input id="requestNumber" placeholder="WA-12345" autocomplete="off" required></div>
          <div class="form-field"><label class="required" for="lookupPhone">رقم الجوال</label><input id="lookupPhone" inputmode="tel" placeholder="05XXXXXXXX" maxlength="10" required></div>
          <div class="button-row"><button class="btn btn-primary" type="submit">عرض الطلب</button><a class="btn btn-light" href="customer.html?fresh=1">بدء طلب جديد</a></div>
        </form>
      </section>

      <section id="requestSection" hidden>
        <div id="requestHeader" class="request-header"></div>
        <div id="closedNotice" class="warning-panel mb-0" hidden></div>

        <div class="dashboard-grid two mt-16">
          <div>
            <div id="activePartner"></div>
            <div id="requestActions" class="card mt-16"></div>
            <div id="ratingPanel" class="card mt-16"></div>
          </div>
          <aside>
            <section class="card">
              <h2>ملخص الطلب</h2>
              <div id="requestSummary" class="guidance-grid"></div>
            </section>
            <section class="card mt-16">
              <h2>سجل الإحالات</h2>
              <div id="referralTimeline" class="timeline"></div>
            </section>
          </aside>
        </div>
      </section>

      <section id="notFoundSection" class="empty-state" hidden>
        <div class="path-icon">!</div><h1>تعذر العثور على الطلب</h1><p>تحقق من الرابط أو رقم الطلب والجوال. لم يتم عرض أي بيانات جزئية.</p><a class="btn btn-primary" href="track.html">المحاولة مرة أخرى</a>
      </section>
    </div>
  </main>

  <dialog id="alternativeDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="alternativeForm">
      <div class="dialog-head"><div><div class="kicker">شريك بديل</div><h2>لماذا لم تستمر مع الشريك الحالي؟</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
      <div class="form-field"><label for="alternativeReason">السبب اختياري</label><select id="alternativeReason"><option value="">بدون تحديد</option><option>لم يتم الرد</option><option>لم نتفق على الموعد</option><option>لم يتم التفاهم على السعر</option><option>الخدمة غير متوفرة</option><option>الموقع غير مناسب</option><option>لم أرغب في الاستمرار</option><option>سبب آخر</option></select></div>
      <div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button id="confirmAlternative" class="btn btn-primary" value="default" type="submit">ابحث عن بديل</button></div>
    </form>
  </dialog>

  <dialog id="ratingDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="ratingForm">
      <div class="dialog-head"><div><div class="kicker">تقييم موثق</div><h2>قيّم تجربتك</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
      <div class="form-grid two">
        <div class="form-field"><label class="required" for="ratingOverall">التقييم العام</label><select id="ratingOverall" required><option value="">اختر</option><option value="5">5 — ممتاز</option><option value="4">4 — جيد جدًا</option><option value="3">3 — جيد</option><option value="2">2 — ضعيف</option><option value="1">1 — سيئ</option></select></div>
        <div class="form-field"><label class="required" for="ratingTreatment">جودة التعامل</label><select id="ratingTreatment" required><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
        <div class="form-field"><label class="required" for="ratingCommitment">الالتزام</label><select id="ratingCommitment" required><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
        <div class="form-field"><label class="required" for="ratingClarity">وضوح التعامل</label><select id="ratingClarity" required><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
        <div class="form-field"><label class="required" for="ratingService">جودة الخدمة</label><select id="ratingService" required><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
        <div class="form-field"><label class="required" for="ratingFairness">عدالة الأسعار</label><select id="ratingFairness" required><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
      </div>
      <fieldset class="form-field mt-16"><legend class="required">هل تنصح بالشريك؟</legend><div class="button-row"><label class="radio-line"><input type="radio" name="recommend" value="yes" required> نعم</label><label class="radio-line"><input type="radio" name="recommend" value="no"> لا</label></div></fieldset>
      <div class="form-field mt-16"><label for="ratingComment">تعليق اختياري</label><textarea id="ratingComment" maxlength="600"></textarea></div>
      <div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button class="btn btn-primary" value="default" type="submit">إرسال التقييم</button></div>
    </form>
  </dialog>

  <div data-site-footer></div>
  <script defer src="assets/config.js"></script>
  <script defer src="assets/automotive-data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/seed.js"></script>
  <script defer src="assets/matching-engine.js"></script>
  <script defer src="assets/lifecycle.js"></script>
  <script defer src="assets/common.js"></script>
  <script defer src="assets/track.js"></script>
</body>
</html>

```

## `workshop-dashboard.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>لوحة الشريك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="partner-dashboard">
  <div data-site-header></div>
  <main id="main-content" class="section">
    <div class="container">
      <div id="partnerHeader" class="request-header"></div>
      <div class="tabs" role="tablist" aria-label="أقسام لوحة الشريك">
        <button class="tab-btn active" type="button" data-tab="overview" role="tab" aria-selected="true">نظرة عامة</button>
        <button class="tab-btn" type="button" data-tab="referrals" role="tab" aria-selected="false">الإحالات</button>
        <button class="tab-btn" type="button" data-tab="objections" role="tab" aria-selected="false">الاعتراضات</button>
        <button class="tab-btn" type="button" data-tab="ratings" role="tab" aria-selected="false">التقييمات</button>
        <button class="tab-btn" type="button" data-tab="discounts" role="tab" aria-selected="false">الخصومات</button>
        <button class="tab-btn" type="button" data-tab="billing" role="tab" aria-selected="false">الرسوم والتسوية</button>
        <button class="tab-btn" type="button" data-tab="profile" role="tab" aria-selected="false">الملف والإشعارات</button>
      </div>

      <section class="tab-panel active" data-panel="overview" role="tabpanel">
        <div id="overviewStats" class="stats-grid"></div>
        <div class="dashboard-grid two mt-16">
          <section class="card"><h2>آخر الإحالات</h2><div id="latestReferrals"></div></section>
          <aside class="card"><h2>حالة الحساب</h2><div id="accountStatus"></div></aside>
        </div>
      </section>

      <section class="tab-panel" data-panel="referrals" role="tabpanel">
        <div class="section-head"><h2>إدارة الإحالات</h2><p>يمكن تأكيد الوصول وبدء الاستقبال أو الفحص وتحديث نتيجة التعامل.</p></div>
        <div id="referralsTable"></div>
      </section>

      <section class="tab-panel" data-panel="objections" role="tabpanel">
        <div class="section-head"><h2>سجل الاعتراضات</h2><p>الاعتراض لا يلغي الرسم أو التقييم تلقائيًا، بل يحوله للمراجعة.</p></div>
        <div id="objectionsTable"></div>
      </section>

      <section class="tab-panel" data-panel="ratings" role="tabpanel">
        <div class="section-head"><h2>التقييمات الموثقة</h2><p>لا يستطيع الشريك حذف التقييم بنفسه، ويمكن تقديم اعتراض مسبب.</p></div>
        <div id="ratingsList"></div>
      </section>

      <section class="tab-panel" data-panel="discounts" role="tabpanel">
        <div class="dashboard-grid two">
          <section class="card"><h2>الخصومات الحالية</h2><div id="discountsList"></div></section>
          <section class="card"><h2>إضافة خصم تجريبي</h2>
            <form id="discountForm" class="form-grid" novalidate>
              <div class="form-field"><label class="required" for="discountPercent">النسبة %</label><input id="discountPercent" type="number" min="1" max="50" required></div>
              <div class="form-field"><label class="required" for="discountServices">الخدمات المشمولة</label><input id="discountServices" maxlength="160" placeholder="مثال: أجور اليد لفحص المحرك" required></div>
              <div class="form-field"><label class="required" for="discountConditions">الشروط</label><textarea id="discountConditions" maxlength="500" required></textarea></div>
              <div class="form-grid two"><div class="form-field"><label class="required" for="discountStart">يبدأ</label><input id="discountStart" type="date" required></div><div class="form-field"><label class="required" for="discountEnd">ينتهي</label><input id="discountEnd" type="date" required></div></div>
              <button class="btn btn-primary" type="submit">اعتماد داخل النسخة التجريبية</button>
            </form>
          </section>
        </div>
      </section>

      <section class="tab-panel" data-panel="billing" role="tabpanel">
        <div id="billingStats" class="stats-grid"></div>
        <div class="card mt-16"><div class="button-row"><button id="issueClaim" class="btn btn-dark" type="button">إصدار مطالبة حسب السياسة</button><span class="muted small">عند 100 ريال أو تسوية شهرية.</span></div></div>
        <div class="dashboard-grid two mt-16">
          <section class="card"><h2>المطالبات</h2><div id="claimsList"></div></section>
          <section class="card"><h2>المدفوعات والإيصالات</h2><div id="paymentsList"></div></section>
        </div>
        <section class="card mt-16"><h2>سجل الرسوم</h2><div id="feesList"></div></section>
      </section>

      <section class="tab-panel" data-panel="profile" role="tabpanel">
        <div class="dashboard-grid two">
          <section class="card"><h2>بيانات الشريك</h2><div id="profileData"></div></section>
          <section class="card"><h2>إشعارات المنصة</h2><div id="notificationsList"></div></section>
        </div>
        <button id="logoutButton" class="btn btn-danger mt-16" type="button">تسجيل الخروج</button>
      </section>
    </div>
  </main>

  <dialog id="objectionDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="objectionForm">
      <div class="dialog-head"><div><div class="kicker">اعتراض</div><h2 id="objectionTitle">اعتراض على الإحالة</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
      <input id="objectionReferralId" type="hidden"><input id="objectionRatingId" type="hidden"><input id="objectionType" type="hidden">
      <div class="form-field"><label class="required" for="objectionReason">السبب</label><select id="objectionReason" required></select></div>
      <div class="form-field mt-16"><label for="objectionDetails">التوضيح</label><textarea id="objectionDetails" maxlength="800"></textarea></div>
      <div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button class="btn btn-primary" type="submit" value="default">إرسال الاعتراض</button></div>
    </form>
  </dialog>

  <div data-site-footer></div>
  <script defer src="assets/config.js"></script>
  <script defer src="assets/automotive-data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/seed.js"></script>
  <script defer src="assets/lifecycle.js"></script>
  <script defer src="assets/common.js"></script>
  <script defer src="assets/dashboard.js"></script>
</body>
</html>

```

## `workshop-login.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>دخول الشريك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="partner-login">
  <div data-site-header></div>
  <main id="main-content" class="section">
    <div class="container">
      <div class="dashboard-grid two">
        <section class="card">
          <div class="section-head"><div class="kicker">بوابة الشريك</div><h1>تسجيل دخول تجريبي</h1><p>هذه النسخة لا تستخدم Backend حقيقيًا. بيانات الدخول تحفظ محليًا لأغراض العرض فقط.</p></div>
          <form id="loginForm" class="form-grid" novalidate>
            <div class="form-field"><label class="required" for="partnerCode">رمز الشريك</label><input id="partnerCode" autocomplete="username" value="WA-DEMO" required></div>
            <div class="form-field"><label class="required" for="partnerPin">الرمز السري</label><input id="partnerPin" type="password" inputmode="numeric" autocomplete="current-password" value="1234" maxlength="8" required></div>
            <button class="btn btn-primary" type="submit">دخول لوحة الشريك</button>
          </form>
        </section>
        <aside class="card">
          <div class="demo-badge">حساب تجريبي</div>
          <h2>بيانات الدخول</h2>
          <div class="guidance-grid">
            <div class="guidance-item"><span>رمز الشريك</span><strong>WA-DEMO</strong></div>
            <div class="guidance-item"><span>الرمز السري</span><strong>1234</strong></div>
          </div>
          <div class="legal-note">لا تستخدم هذه الآلية في إطلاق إنتاجي. يلزم Backend ومصادقة آمنة قبل التشغيل التجاري.</div>
          <a class="btn btn-light btn-block mt-16" href="join.html">لست شريكًا؟ قدّم طلب انضمام</a>
        </aside>
      </div>
    </div>
  </main>
  <div data-site-footer></div>
  <script defer src="assets/config.js"></script>
  <script defer src="assets/automotive-data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/seed.js"></script>
  <script defer src="assets/lifecycle.js"></script>
  <script defer src="assets/common.js"></script>
  <script defer src="assets/workshop-login.js"></script>
</body>
</html>

```
