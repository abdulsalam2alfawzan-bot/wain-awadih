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
