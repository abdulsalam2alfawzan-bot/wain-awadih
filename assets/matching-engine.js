(() => {
  "use strict";
  window.WA = window.WA || {};

  const typeMap = { problem: "workshop", parts: "parts", tow: "tow", maintenance: "maintenance" };

  const getDiscount = (partnerId) => {
    const now = new Date();
    return WA.Storage.get("wa_discounts").find((discount) => {
      if (discount.partnerId !== partnerId || discount.status !== "approved") return false;
      if (discount.startsAt && new Date(`${discount.startsAt}T00:00:00`).getTime() > now.getTime()) return false;
      if (!discount.continuousUntilStopped && discount.endsAt && new Date(`${discount.endsAt}T23:59:59`).getTime() < now.getTime()) return false;
      return true;
    }) || null;
  };

  const supportsMake = (partner, vehicle) => {
    const make = vehicle.makeOther || vehicle.make;
    const supported = partner.makesPriority || partner.servedMakes || [];
    return supported.includes("جميع الشركات") || supported.includes(make) || supported.includes("أخرى");
  };

  const supportsFuel = (partner, vehicle) => {
    if (!vehicle.fuelType || vehicle.fuelType === "غير محدد") return true;
    const fuels = partner.fuelTypes || [];
    return fuels.includes("غير محدد") || fuels.includes("جميع الأنواع") || fuels.includes(vehicle.fuelType);
  };

  const supportsService = (partner, request) => {
    if (request.serviceType === "problem") {
      const specialty = request.ai?.specialty || "فحص وتشخيص عام";
      return (partner.specialtiesPriority || partner.specialties || []).includes(specialty)
        || (partner.services || []).includes(specialty)
        || (partner.specialties || []).includes("فحص وتشخيص عام");
    }
    if (request.serviceType === "maintenance") {
      return (partner.services || []).includes(request.maintenanceService) || (partner.services || []).includes("خدمة أخرى");
    }
    if (request.serviceType === "parts") {
      return (partner.services || []).includes("الاستفسار عن قطع الغيار")
        && (!request.partType || request.partType === "لا يهم" || request.partType === "غير متأكد" || (partner.partTypes || []).includes(request.partType));
    }
    if (request.serviceType === "tow") return partner.acceptsUrgent === true || (partner.services || []).includes("طلبات عاجلة");
    return false;
  };

  const eligibility = (partner, request, excluded) => {
    if (excluded.has(partner.id)) return false;
    if (partner.type !== typeMap[request.serviceType]) return false;
    if (partner.partnershipStatus !== "active") return false;
    if (!["current", "awaiting_payment"].includes(partner.paymentStatus)) return false;
    if (partner.region && request.region && partner.region !== request.region && request.serviceType !== "tow") return false;
    const coverage = partner.coverageCities || [];
    if (!coverage.includes(request.city)) return false;
    if (!supportsMake(partner, request.vehicleSnapshot || {})) return false;
    if (!supportsFuel(partner, request.vehicleSnapshot || {})) return false;
    return supportsService(partner, request);
  };

  const score = (partner, request) => {
    let total = 0;
    const vehicle = request.vehicleSnapshot || {};
    const make = vehicle.makeOther || vehicle.make;
    const specialty = request.ai?.specialty || "";
    const makes = partner.makesPriority || partner.servedMakes || [];
    const specialties = partner.specialtiesPriority || partner.specialties || [];
    const makeIndex = makes.indexOf(make);
    const specialtyIndex = specialties.indexOf(specialty);
    total += makeIndex >= 0 ? Math.max(4, 18 - makeIndex * 2) : 2;
    total += specialtyIndex >= 0 ? Math.max(5, 22 - specialtyIndex * 3) : 3;
    total += Number(partner.trustScore || 0) * 0.28;
    total += Number(partner.responseScore || 0) * 0.16;
    total += Number(partner.ratingOverall || 0) * 4;
    total += Math.min(Number(partner.ratingCount || 0), 50) * 0.12;
    total += getDiscount(partner.id) ? 2 : 0;
    if (request.serviceType === "tow" && partner.acceptsUrgent) total += 10;
    return total;
  };

  const match = ({ request, excludedPartnerIds = [] }) => {
    const excluded = new Set(excludedPartnerIds);
    const partners = WA.Storage.get("wa_partners")
      .filter((partner) => eligibility(partner, request, excluded))
      .map((partner) => ({ partner, score: score(partner, request) }))
      .sort((a, b) => b.score - a.score || String(a.partner.id).localeCompare(String(b.partner.id), "ar"));

    if (!partners.length) {
      return {
        partner: null,
        reason: `لم نجد حاليًا شريكًا مسجلًا يطابق نوع الخدمة والسيارة في مدينة ${request.city}. يمكنك تعديل المدينة أو المحاولة لاحقًا.`
      };
    }

    const selected = partners[0].partner;
    const reasonParts = [
      `نوعه ${WA.Config.partnerTypes[selected.type]}`,
      `مسجل لخدمة مدينة ${request.city}`,
      request.serviceType === "problem" ? `ويغطي تخصص ${request.ai?.specialty || "الفحص العام"}` : "ويقدم نوع الخدمة المطلوبة",
      supportsMake(selected, request.vehicleSnapshot || {}) ? "ويخدم علامة السيارة" : ""
    ].filter(Boolean);

    return {
      partner: selected,
      reason: `${reasonParts.join("، ")}.`
    };
  };

  WA.Matching = { match, getDiscount, supportsMake, supportsFuel };
})();
