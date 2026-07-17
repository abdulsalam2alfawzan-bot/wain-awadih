(() => {
  "use strict";
  window.WA = window.WA || {};

  const normalize = (value) => String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[^\u0600-\u06FFa-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const dangerRules = [
    { keys: ["فرامل ما تمسك", "فرامل ضعيفه جدا", "فقدت الفرامل", "بريك ما يمسك"], label: "ضعف أو فقدان واضح في الفرامل" },
    { keys: ["دركسون قفل", "ما اقدر اوجه", "فقد التوجيه", "الدركسون ما يتحرك"], label: "خلل خطير محتمل في التوجيه" },
    { keys: ["الحراره للاخير", "غليان", "المكينه تحتر", "حراره مرتفعه جدا"], label: "ارتفاع شديد في حرارة المحرك" },
    { keys: ["ريحه بنزين", "رائحه وقود", "تسريب بنزين", "تسرب وقود"], label: "احتمال وجود رائحة أو تسرب وقود" },
    { keys: ["دخان كثيف", "دخان كثير", "دخان من المكينه"], label: "خروج دخان كثيف" },
    { keys: ["وسط الطريق", "طريق سريع", "مكان خطر", "واقف بالشارع"], label: "توقف المركبة في موقع خطر" }
  ];

  const scenarios = [
    {
      id: "brakes",
      keywords: ["فرامل", "بريك", "دعسه الفرامل", "صوت مع الفرامل", "رجفه فرامل"],
      expectedIssue: "قد تكون الأعراض مرتبطة بنظام الفرامل أو أحد مكوناته، ولا يمكن تأكيد السبب إلا بعد الفحص الفعلي.",
      specialty: "فحص فرامل",
      urgency: "عالية",
      nextStep: "قلل القيادة غير الضرورية وتوجه إلى ورشة متخصصة لفحص نظام الفرامل في أقرب وقت.",
      questions: ["هل تشعر أن مسافة التوقف أصبحت أطول؟", "هل تظهر لمبة تحذير للفرامل؟", "هل يوجد صوت طحن أو احتكاك؟", "هل تميل السيارة عند الضغط على الفرامل؟"]
    },
    {
      id: "engine",
      keywords: ["رجفه", "رج", "تقطيع", "تنتيع", "ضعف عزم", "عزم", "مكينه", "محرك", "لمبه المكينه"],
      expectedIssue: "قد تكون الأعراض مرتبطة بأداء المحرك أو أحد الأنظمة المؤثرة على الاحتراق أو دخول الهواء، ولا يمكن تأكيد السبب إلا بعد الفحص.",
      specialty: "ميكانيكا وكهرباء محرك",
      urgency: "متوسطة",
      nextStep: "أجرِ فحصًا متخصصًا للمحرك وقراءة أنظمة السيارة قبل استبدال أي قطعة.",
      questions: ["هل تظهر لمبة المكينة أو لمبة تحذير أخرى؟", "هل تحدث المشكلة أثناء الوقوف فقط؟", "هل لاحظت ضعفًا واضحًا في العزم؟", "هل بدأت المشكلة بصورة مفاجئة؟"]
    },
    {
      id: "ac",
      keywords: ["مكيف", "تبريد", "يبرد", "هواء حار", "كمبروسر", "المكيف حار"],
      expectedIssue: "قد تكون المشكلة مرتبطة بكفاءة نظام التكييف أو أحد مكوناته الكهربائية أو الميكانيكية، ولا يمكن تحديد السبب قبل الفحص.",
      specialty: "تكييف وكهرباء سيارات",
      urgency: "منخفضة",
      nextStep: "احجز فحصًا لنظام التكييف وتأكد من سبب ضعف التبريد قبل تنفيذ أي إصلاح.",
      questions: ["هل يبرد المكيف بصورة أفضل أثناء المشي؟", "هل قوة الهواء من الفتحات طبيعية؟", "هل تسمع صوتًا غير معتاد عند تشغيل المكيف؟", "هل يتوقف التبريد بعد مدة من التشغيل؟"]
    },
    {
      id: "suspension",
      keywords: ["طقطقه", "مطب", "مطبات", "عفشه", "مساعد", "اهتزاز", "صوت من الامام", "دركسون يهتز"],
      expectedIssue: "قد تكون الأعراض مرتبطة بأحد مكونات التعليق أو التوجيه أو الأجزاء الأمامية، ويحتاج السبب إلى فحص مباشر.",
      specialty: "عفشة وتعليق وتوجيه",
      urgency: "متوسطة",
      nextStep: "أجرِ فحصًا للعفشة والتوجيه والأجزاء الأمامية قبل الاستمرار في الرحلات الطويلة.",
      questions: ["هل يظهر الصوت أكثر عند المطبات؟", "هل تشعر باهتزاز في المقود؟", "هل تميل السيارة إلى جهة أثناء السير؟", "هل يزداد الصوت عند لف الدركسون؟"]
    },
    {
      id: "electrical",
      keywords: ["بطاريه", "ما تشتغل", "سلف", "انوار", "كهرباء", "تطفى", "تشغيل"],
      expectedIssue: "قد تكون الأعراض مرتبطة بمنظومة التشغيل أو الشحن أو أحد الدوائر الكهربائية، ولا يمكن الجزم قبل القياس والفحص.",
      specialty: "كهرباء سيارات",
      urgency: "متوسطة",
      nextStep: "أجرِ فحصًا كهربائيًا لمنظومة التشغيل والشحن قبل تغيير أي مكوّن.",
      questions: ["هل تسمع صوت السلف عند محاولة التشغيل؟", "هل تضعف الأنوار عند التشغيل؟", "هل توقفت السيارة أثناء القيادة؟", "هل ظهرت المشكلة بعد توقف السيارة مدة طويلة؟"]
    },
    {
      id: "transmission",
      keywords: ["قير", "ناقل", "تعشيق", "نتعه قير", "ما يغير", "تبديل"],
      expectedIssue: "قد تكون الأعراض مرتبطة بعمل ناقل الحركة أو نظام التحكم به، ولا يمكن تحديد السبب دون فحص متخصص.",
      specialty: "فحص ناقل حركة",
      urgency: "عالية",
      nextStep: "تجنب الضغط على السيارة واحجز فحصًا متخصصًا لناقل الحركة في أقرب وقت.",
      questions: ["هل تظهر المشكلة عند التعشيق؟", "هل تحدث أثناء تبديل السرعات؟", "هل ظهرت لمبة تحذير؟", "هل تسمع صوتًا غير معتاد مع التبديل؟"]
    }
  ];

  const containsAny = (text, keys) => keys.some((key) => text.includes(normalize(key)));

  const detectDanger = (description, answers = []) => {
    const combined = normalize(`${description} ${answers.join(" ")}`);
    const matches = dangerRules.filter((rule) => containsAny(combined, rule.keys));
    return { isDangerous: matches.length > 0, reasons: matches.map((match) => match.label) };
  };

  const classify = (description) => {
    const text = normalize(description);
    const ranked = scenarios.map((scenario) => ({
      scenario,
      score: scenario.keywords.reduce((total, keyword) => total + (text.includes(normalize(keyword)) ? 1 : 0), 0)
    })).sort((a, b) => b.score - a.score);
    return ranked[0]?.score > 0 ? ranked[0] : { scenario: null, score: 0 };
  };

  const generalQuestions = [
    "هل ظهرت لمبة تحذير في الطبلون؟",
    "هل بدأت المشكلة بصورة مفاجئة؟",
    "هل تؤثر المشكلة على قدرة السيارة على الحركة؟",
    "هل توجد حرارة مرتفعة أو رائحة أو دخان غير معتاد؟"
  ];

  const assess = ({ description = "", vehicle = {}, answers = [] }) => {
    const clean = WA.Storage.sanitizeText(description, 1200);
    const danger = detectDanger(clean, answers);
    const classification = classify(clean);
    const baseLegal = "هذا توقع وتوجيه فني مبدئي مبني على المعلومات التي أدخلتها، ويهدف إلى مساعدتك في فهم الاحتمال الأقرب والوصول إلى التخصص المناسب. لا يمثل تشخيصًا نهائيًا، وقد تختلف النتيجة بعد فحص السيارة فعليًا.";

    if (danger.isDangerous) {
      return {
        scenarioId: "danger",
        confidence: "مؤشر خطر يحتاج تصرفًا احترازيًا",
        questions: generalQuestions,
        expectedIssue: `توجد مؤشرات خطرة محتملة: ${danger.reasons.join("، ")}. لا يمكن تأكيد السبب دون فحص فعلي.`,
        specialty: "مساندة عاجلة ونقل آمن للمركبة",
        urgency: "خطرة",
        nextStep: "قد يكون استمرار القيادة غير آمن. أوقف السيارة في موقع آمن إن أمكن، ولا تستمر في القيادة، واستخدم خدمة سطحة أو تواصل مع الجهة المناسبة للحالة.",
        legalNotice: `${baseLegal} عند وجود خطر مباشر على الأشخاص أو الطريق تواصل مع جهة الطوارئ المناسبة.`,
        dangerReasons: danger.reasons
      };
    }

    if (!classification.scenario) {
      return {
        scenarioId: "general",
        confidence: "المعلومات محدودة",
        questions: generalQuestions,
        expectedIssue: "لا تتوفر معلومات كافية لتحديد المشكلة المتوقعة بدقة، لكن البداية الأنسب هي فحص وتشخيص عام.",
        specialty: "فحص وتشخيص عام",
        urgency: "غير محددة",
        nextStep: "ابدأ بفحص تشخيصي عام لدى ورشة مؤهلة، وامتنع عن القيادة إذا ظهرت أعراض تجعلها غير آمنة.",
        legalNotice: baseLegal,
        dangerReasons: []
      };
    }

    const scenario = classification.scenario;
    return {
      scenarioId: scenario.id,
      confidence: classification.score >= 2 ? "توجيه أولي جيد" : "توجيه يحتاج تأكيدًا عبر الأسئلة",
      questions: scenario.questions,
      expectedIssue: scenario.expectedIssue,
      specialty: scenario.specialty,
      urgency: scenario.urgency,
      nextStep: scenario.nextStep,
      legalNotice: baseLegal,
      dangerReasons: []
    };
  };

  const finalize = ({ description, vehicle, questions = [], answers = [] }) => {
    const merged = assess({ description, vehicle, answers });
    const danger = detectDanger(description, answers);
    if (danger.isDangerous) return { ...merged, questions, answers };
    const uncertainCount = answers.filter((answer) => answer === "غير متأكد").length;
    return {
      ...merged,
      questions,
      answers,
      confidence: uncertainCount >= 3 ? "توجيه محدود بسبب عدم اليقين في الإجابات" : "توجيه أولي بعد أربعة أسئلة توضيحية"
    };
  };

  WA.AIEngine = { assess, finalize, detectDanger, normalize };
})();
