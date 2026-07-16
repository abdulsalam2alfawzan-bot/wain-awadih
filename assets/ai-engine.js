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
