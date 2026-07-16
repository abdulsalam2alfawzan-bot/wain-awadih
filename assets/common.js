(() => {
  "use strict";

  const APP_DATA_VERSION = 3;
  const memoryStore = {};

  const safeStorage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (_) {
        return Object.prototype.hasOwnProperty.call(memoryStore, key)
          ? memoryStore[key]
          : fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (_) {
        memoryStore[key] = value;
      }
      return value;
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (_) {
        delete memoryStore[key];
      }
    }
  };

  const cities = [
    "بريدة",
    "عنيزة",
    "الرس",
    "البكيرية",
    "المذنب",
    "البدائع",
    "الأسياح",
    "النبهانية",
    "عيون الجواء",
    "رياض الخبراء",
    "الشماسية",
    "عقلة الصقور",
    "ضرية",
    "أبانات"
  ];

  const makes = [
    "تويوتا", "هيونداي", "نيسان", "كيا", "فورد", "لكزس",
    "شفروليه", "جي إم سي", "هوندا", "مازدا", "ميتسوبيشي",
    "مرسيدس", "بي إم دبليو", "أودي", "رينو", "سوزوكي", "أخرى"
  ];

  const maintenanceServices = [
    "تغيير زيت المحرك",
    "تغيير الفلاتر",
    "تغيير الكفرات",
    "تغيير البطارية",
    "فحص الفرامل",
    "تغيير المساحات",
    "فحص المكيف",
    "خدمة أخرى"
  ];

  const referralStatuses = [
    "تم ترشيحها للعميل",
    "تواصل العميل",
    "تم تحديد موعد",
    "وصل العميل",
    "تمت الخدمة",
    "لم يتم التفاهم",
    "لم يتم التواصل"
  ];

  const workshopCandidates = {
    engine: [
      {
        id: "WS-101",
        name: "مركز نبض المحرك",
        city: "بريدة",
        whatsapp: "966550000101",
        rating: 4.8,
        ratingsCount: 53,
        fairness: 4.6,
        recommend: 92,
        specialty: "ميكانيكا وكهرباء محرك",
        cars: "تويوتا ولكزس والسيارات اليابانية",
        distance: "4.2 كم",
        commitment: "مرتفع",
        reason: "متخصصة في نوع سيارتك وتقدم الفحص المناسب لأعراض المحرك، مع تقييمات موثقة مرتفعة في الالتزام وعدالة الأسعار."
      },
      {
        id: "WS-102",
        name: "ورشة خط السير",
        city: "بريدة",
        whatsapp: "966550000102",
        rating: 4.7,
        ratingsCount: 41,
        fairness: 4.7,
        recommend: 90,
        specialty: "ميكانيكا وكهرباء سيارات",
        cars: "السيارات اليابانية والكورية",
        distance: "6.1 كم",
        commitment: "مرتفع",
        reason: "خيار شريك آخر مناسب لنفس التخصص وله سجل جيد في الفحص التشخيصي والالتزام بالتعامل."
      },
      {
        id: "WS-103",
        name: "مركز أداء المركبة",
        city: "عنيزة",
        whatsapp: "966550000103",
        rating: 4.6,
        ratingsCount: 35,
        fairness: 4.5,
        recommend: 88,
        specialty: "فحص المحرك والكهرباء",
        cars: "معظم أنواع السيارات",
        distance: "8.4 كم",
        commitment: "جيد جدًا",
        reason: "يمتلك خبرة في الفحص التشخيصي للمحرك والكهرباء ويخدم نوع سيارتك ضمن نطاق المدينة."
      }
    ],
    ac: [
      {
        id: "WS-201",
        name: "مركز برودة المركبة",
        city: "بريدة",
        whatsapp: "966550000201",
        rating: 4.9,
        ratingsCount: 67,
        fairness: 4.5,
        recommend: 94,
        specialty: "تكييف وكهرباء سيارات",
        cars: "معظم أنواع السيارات",
        distance: "3.7 كم",
        commitment: "مرتفع",
        reason: "متخصصة في أنظمة التكييف وتناسب المشكلة المرتبطة بضعف التبريد، مع تقييم عام مرتفع وتجارب موثقة جيدة."
      },
      {
        id: "WS-202",
        name: "ورشة مناخ السيارة",
        city: "عنيزة",
        whatsapp: "966550000202",
        rating: 4.7,
        ratingsCount: 38,
        fairness: 4.6,
        recommend: 89,
        specialty: "تكييف وتشخيص كهربائي",
        cars: "السيارات اليابانية والكورية",
        distance: "5.4 كم",
        commitment: "مرتفع",
        reason: "ورشة شريكة بديلة ضمن نفس التخصص وتقدم فحصًا مناسبًا لأعطال التكييف والكهرباء المرتبطة بها."
      },
      {
        id: "WS-203",
        name: "مركز هواء القصيم",
        city: "الرس",
        whatsapp: "966550000203",
        rating: 4.6,
        ratingsCount: 29,
        fairness: 4.6,
        recommend: 87,
        specialty: "تكييف سيارات",
        cars: "معظم أنواع السيارات",
        distance: "7.8 كم",
        commitment: "جيد جدًا",
        reason: "متخصص في فحص أنظمة التكييف ويقدم الخدمة المناسبة ضمن شبكة الورش الشريكة."
      }
    ],
    suspension: [
      {
        id: "WS-301",
        name: "مركز ثبات المركبة",
        city: "بريدة",
        whatsapp: "966550000301",
        rating: 4.8,
        ratingsCount: 58,
        fairness: 4.7,
        recommend: 93,
        specialty: "عفشة وتعليق وتوجيه",
        cars: "معظم أنواع السيارات",
        distance: "4.9 كم",
        commitment: "مرتفع",
        reason: "متخصصة في أنظمة التعليق والتوجيه وتناسب الأعراض المرتبطة بالأصوات عند المطبات، مع مستوى التزام مرتفع."
      },
      {
        id: "WS-302",
        name: "ورشة ميزان الطريق",
        city: "عنيزة",
        whatsapp: "966550000302",
        rating: 4.6,
        ratingsCount: 44,
        fairness: 4.8,
        recommend: 91,
        specialty: "عفشة وميزان وأجزاء أمامية",
        cars: "معظم أنواع السيارات",
        distance: "7.0 كم",
        commitment: "مرتفع",
        reason: "خيار بديل مناسب لفحص الأجزاء الأمامية والتعليق وله تقييم قوي في عدالة الأسعار بحسب تجارب العملاء."
      },
      {
        id: "WS-303",
        name: "مركز اتزان القصيم",
        city: "الرس",
        whatsapp: "966550000303",
        rating: 4.5,
        ratingsCount: 31,
        fairness: 4.5,
        recommend: 86,
        specialty: "تعليق وتوجيه وميزان",
        cars: "معظم أنواع السيارات",
        distance: "8.2 كم",
        commitment: "جيد جدًا",
        reason: "يقدم فحصًا متخصصًا لمكونات التعليق والتوجيه ومناسب للحالة التي وصفتها."
      }
    ],
    maintenance: [
      {
        id: "WS-401",
        name: "مركز عناية السيارة",
        city: "بريدة",
        whatsapp: "966550000401",
        rating: 4.8,
        ratingsCount: 72,
        fairness: 4.7,
        recommend: 94,
        specialty: "صيانة دورية وخدمات سريعة",
        cars: "معظم أنواع السيارات",
        distance: "3.1 كم",
        commitment: "مرتفع",
        reason: "تقدم الخدمة الدورية المطلوبة وتخدم نوع سيارتك، مع مستوى التزام مرتفع وتقييم موثق جيد لعدالة الأسعار."
      },
      {
        id: "WS-402",
        name: "محطة صيانة بلس",
        city: "عنيزة",
        whatsapp: "966550000402",
        rating: 4.7,
        ratingsCount: 49,
        fairness: 4.6,
        recommend: 91,
        specialty: "زيوت وفلاتر وإطارات وبطاريات",
        cars: "معظم أنواع السيارات",
        distance: "5.6 كم",
        commitment: "مرتفع",
        reason: "ورشة شريكة بديلة تقدم خدمات الصيانة الدورية السريعة وتناسب طلبك ونوع المركبة."
      },
      {
        id: "WS-403",
        name: "مركز الخدمة اليومية",
        city: "الرس",
        whatsapp: "966550000403",
        rating: 4.6,
        ratingsCount: 37,
        fairness: 4.7,
        recommend: 89,
        specialty: "صيانة دورية متعددة الخدمات",
        cars: "معظم أنواع السيارات",
        distance: "7.2 كم",
        commitment: "جيد جدًا",
        reason: "خيار شريك آخر يقدم الخدمة الدورية المطلوبة ويتمتع بتقييم جيد في الالتزام وعدالة الأسعار."
      }
    ],
    general: [
      {
        id: "WS-501",
        name: "مركز تشخيص المسار",
        city: "بريدة",
        whatsapp: "966550000501",
        rating: 4.8,
        ratingsCount: 61,
        fairness: 4.6,
        recommend: 92,
        specialty: "فحص وتشخيص متعدد الأنظمة",
        cars: "معظم أنواع السيارات",
        distance: "4.5 كم",
        commitment: "مرتفع",
        reason: "تقدم فحصًا تشخيصيًا عامًا يناسب الحالات التي تحتاج تحديد النظام المرتبط بالمشكلة قبل توجيهها إلى إصلاح متخصص."
      },
      {
        id: "WS-502",
        name: "ورشة نقطة فحص",
        city: "عنيزة",
        whatsapp: "966550000502",
        rating: 4.7,
        ratingsCount: 46,
        fairness: 4.7,
        recommend: 90,
        specialty: "فحص وتشخيص سيارات",
        cars: "معظم أنواع السيارات",
        distance: "6.3 كم",
        commitment: "مرتفع",
        reason: "ورشة شريكة بديلة مناسبة لبدء الفحص التشخيصي وتحديد مسار الإصلاح الصحيح دون افتراض سبب نهائي."
      },
      {
        id: "WS-503",
        name: "مركز الفحص الذكي",
        city: "الرس",
        whatsapp: "966550000503",
        rating: 4.5,
        ratingsCount: 28,
        fairness: 4.6,
        recommend: 86,
        specialty: "فحص شامل وتشخيص",
        cars: "معظم أنواع السيارات",
        distance: "8.0 كم",
        commitment: "جيد جدًا",
        reason: "يوفر فحصًا أوليًا متعدد الأنظمة ويلائم الطلبات التي تحتاج تحديد التخصص المناسب قبل الإصلاح."
      }
    ]
  };


  const cityCode = (city = "") => city
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 18) || "CITY";

  const getWorkshopPool = (category = "general", city = "", excludedIds = []) => {
    const source = workshopCandidates[category] || workshopCandidates.general;
    const excluded = new Set(excludedIds.filter(Boolean));
    const distances = ["3.4 كم", "5.8 كم", "7.6 كم"];
    return source.map((workshop, index) => {
      const localizedId = city && city !== workshop.city
        ? `${workshop.id}-${cityCode(city)}`
        : workshop.id;
      return {
        ...workshop,
        id: localizedId,
        city: city || workshop.city,
        distance: distances[index] || workshop.distance,
        isDemo: true,
        reason: `${workshop.reason} وتمت مطابقتها ضمن نطاق ${city || workshop.city}.`
      };
    }).filter((workshop) => !excluded.has(workshop.id));
  };

  const normalizeSaudiWhatsapp = (value = "") => {
    const digits = String(value).replace(/\D/g, "");
    if (digits.startsWith("966")) return digits;
    if (digits.startsWith("05")) return `966${digits.slice(1)}`;
    if (digits.startsWith("5") && digits.length === 9) return `966${digits}`;
    return digits;
  };

  const buildWhatsappMessage = (request, workshop) => {
    const requestText = request.type === "maintenance"
      ? request.service
      : `فحص المشكلة التالية: ${request.problem?.length > 140 ? `${request.problem.slice(0, 137)}...` : request.problem}`;
    return `السلام عليكم،
معك ${request.customer.name}، وصلت إليكم عن طريق «وين أوديها» بخصوص الطلب رقم ${request.id}.

السيارة: ${request.vehicle.make} ${request.vehicle.model} ${request.vehicle.year}
الطلب: ${requestText}
المدينة: ${request.city}
الورشة المقترحة: ${workshop?.name || "الورشة الشريكة"}

أرغب بالتنسيق معكم.`;
  };

  const buildWhatsappUrl = (request, workshop) => {
    const rawNumber = normalizeSaudiWhatsapp(workshop?.whatsapp || "");
    const number = workshop?.isDemo || /0000/.test(rawNumber) ? "" : rawNumber;
    const base = number ? `https://wa.me/${number}` : "https://wa.me/";
    return `${base}?text=${encodeURIComponent(buildWhatsappMessage(request, workshop))}`;
  };

  const updateFlatReferral = (referralId, patch = {}) => {
    const referrals = safeStorage.get("wa_referrals", []);
    const stored = referrals.find((item) => item.referralId === referralId);
    if (!stored) return null;
    Object.assign(stored, patch, { updatedAt: new Date().toISOString() });
    safeStorage.set("wa_referrals", referrals);
    return stored;
  };

  const saveRequest = (request) => {
    const requests = safeStorage.get("wa_requests", []);
    const index = requests.findIndex((item) => item.id === request.id);
    if (index >= 0) requests[index] = request;
    else requests.unshift(request);
    safeStorage.set("wa_requests", requests);
    return request;
  };

  const createAlternativeReferral = (request, reason = "غير محدد") => {
    if (!request || !Array.isArray(request.referrals)) return { error: "تعذر قراءة الطلب." };
    if (request.referrals.length >= 3) return { error: "وصل الطلب إلى الحد الأقصى: 3 ورش." };

    const current = request.referrals[request.currentReferral || 0];
    if (current) {
      current.status = "لم يتم التفاهم";
      current.reason = reason || "غير محدد";
      updateFlatReferral(current.referralId, { status: current.status, reason: current.reason });
    }

    const category = request.type === "maintenance" ? "maintenance" : (request.scenario || "general");
    const excluded = request.referrals.map((item) => item.workshop?.id);
    const workshop = getWorkshopPool(category, request.city, excluded)[0];
    if (!workshop) return { error: "لا توجد ورشة بديلة متاحة ضمن البيانات التجريبية." };

    const now = new Date().toISOString();
    const referral = {
      referralId: randomId("RF", 5),
      order: request.referrals.length + 1,
      workshop,
      status: "تم ترشيحها للعميل",
      createdAt: now
    };
    request.referrals.push(referral);
    request.currentReferral = request.referrals.length - 1;
    request.status = "تم ترشيح ورشة بديلة";
    request.customerConfirmation = "بانتظار المتابعة";
    request.rated = false;
    saveRequest(request);

    const referrals = safeStorage.get("wa_referrals", []);
    referrals.unshift({
      referralId: referral.referralId,
      requestId: request.id,
      customer: request.customer.name,
      phone: request.customer.phone,
      car: `${request.vehicle.make} ${request.vehicle.model} ${request.vehicle.year}`,
      city: request.city,
      service: request.type === "maintenance" ? request.service : (request.problem || "").slice(0, 80),
      specialty: request.specialty,
      status: referral.status,
      createdAt: now,
      updatedAt: now,
      feeEligible: false,
      feeId: null,
      workshopId: workshop.id
    });
    safeStorage.set("wa_referrals", referrals);
    return { request, referral, workshop };
  };

  const markWhatsappOpened = (request) => {
    const referral = request?.referrals?.[request.currentReferral || 0];
    if (!request || !referral) return;
    if (["تم ترشيحها للعميل", "تم فتح واتساب"].includes(referral.status)) referral.status = "تواصل العميل";
    request.status = "تم فتح واتساب";
    saveRequest(request);
    updateFlatReferral(referral.referralId, { status: referral.status });
  };

  const registerFeeForReferral = (request, referral) => {
    if (!request || !referral) return null;
    const fees = safeStorage.get("wa_fees", []);
    const existing = fees.find((fee) => fee.referralId === referral.referralId);
    if (existing) return existing;
    const profile = safeStorage.get("wa_workshop_profile", {});
    const workshopId = referral.workshop?.id || "WS-101";
    const fee = {
      id: randomId("FEE", 5),
      referralId: referral.referralId,
      requestId: request.id,
      workshopId,
      event: profile.agreementEvent || "إتمام الخدمة",
      amount: Number(profile.demoFee || 30),
      status: "غير مدفوع",
      createdAt: new Date().toISOString()
    };
    fees.unshift(fee);
    safeStorage.set("wa_fees", fees);
    referral.feeEligible = true;
    referral.feeId = fee.id;
    updateFlatReferral(referral.referralId, { feeEligible: true, feeId: fee.id });
    saveRequest(request);
    return fee;
  };

  const seedData = () => {
    if (safeStorage.get("wa_seed_version", 0) !== APP_DATA_VERSION) {
      const now = new Date();
      const iso = (daysAgo) => {
        const d = new Date(now);
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString();
      };

      safeStorage.set("wa_workshop_profile", {
        id: "WS-101",
        name: "مركز نبض المحرك",
        owner: "محمد السالم",
        city: "بريدة",
        whatsapp: "0550000101",
        status: "شريك نشط",
        rating: 4.8,
        fairness: 4.6,
        commitment: 94,
        trustIndex: 92,
        threshold: 100,
        agreementEvent: "إتمام الخدمة",
        demoFee: 30,
        note: "جميع القيم المالية في النموذج محاكاة للعرض ولا تمثل سياسة تجارية معتمدة."
      });

      safeStorage.set("wa_referrals", [
        {
          referralId: "RF-3101",
          requestId: "WA-10425",
          customer: "عبدالسلام",
          phone: "0500000001",
          car: "تويوتا كامري 2020",
          city: "بريدة",
          service: "فحص رجفة أثناء الوقوف",
          specialty: "ميكانيكا وكهرباء محرك",
          status: "تمت الخدمة",
          createdAt: iso(6),
          updatedAt: iso(5),
          feeEligible: true,
          feeId: "FEE-5001",
          workshopId: "WS-101"
        },
        {
          referralId: "RF-3102",
          requestId: "WA-10467",
          customer: "سلمان",
          phone: "0500000002",
          car: "هيونداي سوناتا 2021",
          city: "بريدة",
          service: "فحص ضعف عزم",
          specialty: "ميكانيكا وكهرباء محرك",
          status: "وصل العميل",
          createdAt: iso(3),
          updatedAt: iso(2),
          feeEligible: false,
          feeId: null,
          workshopId: "WS-101"
        },
        {
          referralId: "RF-3103",
          requestId: "WA-10510",
          customer: "ناصر",
          phone: "0500000003",
          car: "تويوتا أفالون 2019",
          city: "عنيزة",
          service: "لمبة مكينة وتقطيع",
          specialty: "ميكانيكا وكهرباء محرك",
          status: "تم تحديد موعد",
          createdAt: iso(1),
          updatedAt: iso(1),
          feeEligible: false,
          feeId: null,
          workshopId: "WS-101"
        },
        {
          referralId: "RF-3104",
          requestId: "WA-10522",
          customer: "خالد",
          phone: "0500000004",
          car: "لكزس ES 2022",
          city: "بريدة",
          service: "فحص اهتزاز المحرك",
          specialty: "ميكانيكا وكهرباء محرك",
          status: "تم ترشيحها للعميل",
          createdAt: iso(0),
          updatedAt: iso(0),
          feeEligible: false,
          feeId: null,
          workshopId: "WS-101"
        }
      ]);

      safeStorage.set("wa_fees", [
        {
          id: "FEE-5001",
          referralId: "RF-3101",
          requestId: "WA-10425",
          event: "إتمام الخدمة",
          amount: 30,
          status: "غير مدفوع",
          createdAt: iso(5),
          workshopId: "WS-101"
        },
        {
          id: "FEE-4992",
          referralId: "RF-3088",
          requestId: "WA-10380",
          event: "إتمام الخدمة",
          amount: 30,
          status: "غير مدفوع",
          createdAt: iso(11),
          workshopId: "WS-101"
        },
        {
          id: "FEE-4975",
          referralId: "RF-3062",
          requestId: "WA-10294",
          event: "إتمام الخدمة",
          amount: 30,
          status: "مدفوع",
          createdAt: iso(18),
          paymentId: "PAY-8001",
          workshopId: "WS-101"
        },
        {
          id: "FEE-4960",
          referralId: "RF-3049",
          requestId: "WA-10220",
          event: "إتمام الخدمة",
          amount: 30,
          status: "غير مدفوع",
          createdAt: iso(24),
          workshopId: "WS-101"
        }
      ]);

      safeStorage.set("wa_payments", [
        {
          id: "PAY-8001",
          receiptId: "RCPT-8001",
          amount: 30,
          method: "بطاقة مدى — محاكاة",
          status: "مكتمل",
          paidAt: iso(17),
          feeIds: ["FEE-4975"],
          workshopId: "WS-101",
          cardLast4: "4242"
        }
      ]);

      safeStorage.set("wa_ratings", [
        {
          requestId: "WA-10425",
          referralId: "RF-3101",
          workshopId: "WS-101",
          customer: "عبدالسلام",
          overall: 5,
          treatment: 5,
          commitment: 5,
          clarity: 4,
          quality: 5,
          fairness: 4,
          recommend: "نعم",
          comment: "تعامل ممتاز وشرح واضح قبل بدء الخدمة.",
          createdAt: iso(4)
        },
        {
          requestId: "WA-10294",
          referralId: "RF-3062",
          workshopId: "WS-101",
          customer: "فهد",
          overall: 4,
          treatment: 5,
          commitment: 4,
          clarity: 4,
          quality: 4,
          fairness: 5,
          recommend: "نعم",
          comment: "موعد جيد والسعر كان عادلًا حسب تجربتي.",
          createdAt: iso(16)
        }
      ]);

      safeStorage.set("wa_requests", [
        {
          id: "WA-10425",
          createdAt: iso(6),
          type: "problem",
          customer: { name: "عبدالسلام", phone: "0500000001" },
          vehicle: { make: "تويوتا", model: "كامري", year: "2020", mileage: "من 100 إلى 150 ألف كم" },
          city: "بريدة",
          problem: "السيارة ترج إذا وقفت عند الإشارة وأحيانًا تظهر لمبة المكينة.",
          service: "فحص وتشخيص للمشكلة",
          specialty: "ميكانيكا وكهرباء محرك",
          scenario: "engine",
          guidance: "المشكلة قد تكون مرتبطة بأداء المحرك أو أحد الأنظمة المؤثرة على عمله أثناء الوقوف، وتحتاج إلى فحص متخصص قبل تحديد السبب النهائي.",
          answers: ["نعم", "نعم", "غير متأكد", "نعم"],
          status: "تمت الخدمة",
          customerConfirmation: "تمت الخدمة",
          referrals: [
            {
              referralId: "RF-3101",
              order: 1,
              workshop: workshopCandidates.engine[0],
              status: "تمت الخدمة",
              createdAt: iso(6),
              feeEligible: true,
              feeId: "FEE-5001"
            }
          ],
          currentReferral: 0,
          rated: true
        }
      ]);

      safeStorage.set("wa_join_applications", []);
      safeStorage.set("wa_seeded", true);
      safeStorage.set("wa_seed_version", APP_DATA_VERSION);
    }
  };

  const randomId = (prefix, digits = 5) => {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return `${prefix}-${Math.floor(min + Math.random() * (max - min))}`;
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    try {
      return new Intl.DateTimeFormat("ar-SA", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(iso));
    } catch (_) {
      return iso;
    }
  };

  const formatMoney = (value) => `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;

  const getQuery = (name) => new URLSearchParams(window.location.search).get(name);

  const escapeHTML = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const fillSelect = (selector, values, placeholder = "اختر") => {
    const element = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!element) return;
    element.innerHTML = `<option value="">${escapeHTML(placeholder)}</option>` +
      values.map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join("");
  };

  const statusBadgeClass = (status = "") => {
    if (["تمت الخدمة", "وصل العميل", "مكتمل", "مدفوع", "مقبول مبدئيًا"].includes(status)) return "success";
    if (["لم يتم التفاهم", "لم يتم التواصل", "مرفوض"].includes(status)) return "danger";
    if (["تم تحديد موعد", "قيد المراجعة", "غير مدفوع"].includes(status)) return "warning";
    return "info";
  };

  const getOutstandingBalance = () => {
    return safeStorage.get("wa_fees", [])
      .filter((fee) => fee.status === "غير مدفوع")
      .reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
  };

  const ensureHeader = () => {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;
    const active = document.body.dataset.page || "";
    const current = (name) => active === name ? ' aria-current="page" class="active"' : "";
    mount.innerHTML = `
      <header class="site-header">
        <a class="skip-link" href="#main-content">تجاوز إلى المحتوى الرئيسي</a>
        <div class="container header-inner">
          <a class="logo" href="index.html" aria-label="وين أوديها — الصفحة الرئيسية">
            <span class="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 14.5 5.8 9A2.5 2.5 0 0 1 8.2 7.3h7.6A2.5 2.5 0 0 1 18.2 9l1.8 5.5"/>
                <path d="M3 14.5h18v3.3a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 17.8z"/>
                <circle cx="6.6" cy="16.7" r="1.1"/><circle cx="17.4" cy="16.7" r="1.1"/>
              </svg>
            </span>
            <span>وين أوديها؟<small>منصة الوصول للورشة المناسبة</small></span>
          </a>
          <nav class="desktop-nav" aria-label="التنقل الرئيسي">
            <a${current("home")} href="index.html">الرئيسية</a>
            <a${current("customer")} href="customer.html">ابدأ طلبك</a>
            <a${current("track")} href="track.html">متابعة طلب</a>
            <a${current("join")} href="join.html">انضم كورشة</a>
          </nav>
          <div class="header-actions">
            <a class="btn btn-light btn-sm" href="workshop-login.html">بوابة الورشة</a>
            <a class="btn btn-primary btn-sm" href="customer.html?fresh=1">ابدأ طلبك</a>
            <button class="mobile-menu-btn" id="mobileMenuButton" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="فتح القائمة">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <nav class="mobile-nav" id="mobileNav" aria-label="التنقل على الجوال" hidden>
          <div class="container">
            <a${current("home")} href="index.html">الرئيسية</a>
            <a${current("customer")} href="customer.html">ابدأ طلبك</a>
            <a${current("track")} href="track.html">متابعة طلب</a>
            <a href="workshop-login.html">بوابة الورشة</a>
            <a${current("join")} href="join.html">انضم كورشة</a>
          </div>
        </nav>
      </header>`;
    const button = document.querySelector("#mobileMenuButton");
    const mobileNav = document.querySelector("#mobileNav");
    button?.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "فتح القائمة" : "إغلاق القائمة");
      mobileNav.hidden = open;
      document.body.classList.toggle("menu-open", !open);
    });
  };

  const ensureFooter = () => {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="footer-title">وين أوديها؟</div>
              <div class="footer-text">منصة تجريبية تساعد صاحب السيارة على تحديد مسار الخدمة المناسب والوصول إلى ورشة شريكة واحدة في كل مرة.</div>
            </div>
            <div>
              <div class="footer-title">للعميل</div>
              <div class="footer-links">
                <a href="customer.html">ابدأ طلبًا</a>
                <a href="track.html">متابعة طلب</a>
              </div>
            </div>
            <div>
              <div class="footer-title">للورش</div>
              <div class="footer-links">
                <a href="workshop-login.html">دخول الورشة</a>
                <a href="join.html">طلب الانضمام</a>
                <a href="join-status.html">متابعة الانضمام</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">نموذج HTML تفاعلي للعرض فقط — لا توجد خدمات أو مدفوعات حقيقية.</div>
        </div>
      </footer>`;
  };

  let lastFocusedElement = null;

  const ensureGlobalUI = () => {
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";
    if (!document.querySelector("#waModalBackdrop")) {
      document.body.insertAdjacentHTML("beforeend", `
        <div class="modal-backdrop" id="waModalBackdrop"></div>
        <div class="toast" id="waToast" role="status" aria-live="polite"></div>`);
      document.querySelector("#waModalBackdrop").addEventListener("click", () => closeModals());
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModals();
      });
    }
  };

  const openModal = (selector) => {
    ensureGlobalUI();
    lastFocusedElement = document.activeElement;
    document.querySelectorAll(".modal.show").forEach((modal) => modal.classList.remove("show"));
    const modal = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!modal) return;
    document.querySelector("#waModalBackdrop").classList.add("show");
    modal.classList.add("show");
    document.body.classList.add("no-scroll");
    setTimeout(() => modal.querySelector("button, input, select, textarea")?.focus(), 220);
  };

  const closeModals = () => {
    document.querySelectorAll(".modal.show").forEach((modal) => modal.classList.remove("show"));
    document.querySelector("#waModalBackdrop")?.classList.remove("show");
    document.body.classList.remove("no-scroll");
    lastFocusedElement?.focus?.();
  };

  const toast = (message) => {
    ensureGlobalUI();
    const element = document.querySelector("#waToast");
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove("show"), 2600);
  };

  const initYearSelects = () => {
    document.querySelectorAll("select[data-year-select]").forEach((select) => {
      const selected = select.dataset.selected || "";
      select.innerHTML = '<option value="">اختر السنة</option>';
      for (let year = new Date().getFullYear(); year >= 1990; year -= 1) {
        const option = document.createElement("option");
        option.value = String(year);
        option.textContent = String(year);
        option.selected = String(year) === selected;
        select.appendChild(option);
      }
    });
  };

  const initCommon = () => {
    seedData();
    ensureHeader();
    ensureFooter();
    ensureGlobalUI();
    initYearSelects();
    document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
  };

  window.WA = {
    storage: safeStorage,
    cities,
    makes,
    maintenanceServices,
    referralStatuses,
    workshopCandidates,
    getWorkshopPool,
    buildWhatsappMessage,
    buildWhatsappUrl,
    updateFlatReferral,
    saveRequest,
    createAlternativeReferral,
    markWhatsappOpened,
    registerFeeForReferral,
    randomId,
    formatDate,
    formatMoney,
    getQuery,
    escapeHTML,
    fillSelect,
    statusBadgeClass,
    getOutstandingBalance,
    openModal,
    closeModals,
    toast,
    initCommon,
    seedData
  };

  document.addEventListener("DOMContentLoaded", initCommon);
})();
