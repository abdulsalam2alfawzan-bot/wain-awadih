(() => {
  "use strict";
  window.WA = window.WA || {};

  WA.Config = Object.freeze({
    appName: "وين أوديها",
    dataVersion: 10,
    maxReferralsPerRequest: 3,
    administrativeCloseDays: 5,
    paymentThreshold: 100,
    paymentDueDays: 10,
    objectionWindowDays: 15,
    invoiceIssueDay: 1,
    serviceTypes: Object.freeze({
      problem: "مشكلة في السيارة",
      parts: "محل قطع غيار",
      tow: "سطحة عاجلة",
      maintenance: "صيانة دورية"
    }),
    partnerTypes: Object.freeze({
      workshop: "ورشة إصلاح وتشخيص",
      parts: "محل قطع غيار",
      tow: "مقدم خدمة سطحة",
      maintenance: "مركز صيانة دورية"
    }),
    storageKeys: Object.freeze([
      "wa_customers", "wa_vehicles", "wa_requests", "wa_partners",
      "wa_referrals", "wa_ratings", "wa_objections", "wa_discounts",
      "wa_fees", "wa_invoices", "wa_claims", "wa_payments",
      "wa_join_applications", "wa_consents", "wa_sessions", "wa_meta"
    ]),
    costBands: Object.freeze({
      under_50: Object.freeze({ label: "أقل من 50 ريالًا", fee: 0, min: 0, maxExclusive: 50 }),
      from_50_to_199: Object.freeze({ label: "من 50 إلى أقل من 200 ريال", fee: 5, min: 50, maxExclusive: 200 }),
      from_200_to_400: Object.freeze({ label: "من 200 إلى 400 ريال", fee: 10, min: 200, maxInclusive: 400 }),
      over_400: Object.freeze({ label: "أكثر من 400 ريال", fee: 25, minExclusive: 400 })
    }),
    referralStatuses: Object.freeze({
      registered: "مسجلة",
      shown: "ظهرت للعميل",
      whatsapp_opened: "تم فتح واتساب",
      no_contact: "لم يتواصل العميل",
      contacted_not_arrived: "تواصل ولم يصل",
      arrived: "وصل العميل",
      service_received: "تلقى العميل الخدمة",
      arrived_no_service: "وصل ولم يتلق الخدمة",
      service_not_received: "لم يتلق الخدمة",
      not_agreed: "لم يتم التفاهم",
      alternative_requested: "تم طلب بديل",
      cost_pending: "بانتظار فئة التكلفة",
      partner_cost_confirmation: "بانتظار تأكيد الشريك للتكلفة",
      cost_disputed: "اختلاف على فئة التكلفة",
      disputed: "معترض عليها",
      under_review: "تحت المراجعة",
      confirmed: "مؤكدة",
      closed: "مغلقة"
    }),
    requestStatuses: Object.freeze({
      draft: "مسودة",
      matching: "جاري المطابقة",
      no_match: "لا يوجد تطابق حاليًا",
      referred: "تم ترشيح شريك",
      awaiting_result: "بانتظار نتيجة الإحالة",
      service_received: "تم تلقي الخدمة",
      alternative_requested: "تم طلب شريك بديل",
      cost_pending: "بانتظار فئة تكلفة الخدمة",
      rated: "تم التقييم",
      administratively_closed: "مغلق إداريًا",
      finally_closed: "مغلق نهائيًا"
    })
  });
})();
