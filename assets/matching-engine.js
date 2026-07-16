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
