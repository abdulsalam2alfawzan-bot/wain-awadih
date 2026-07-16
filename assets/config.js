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
