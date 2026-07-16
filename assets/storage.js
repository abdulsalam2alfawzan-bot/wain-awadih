(() => {
  "use strict";
  window.WA = window.WA || {};

  const memory = new Map();
  const arrayKeys = new Set(WA.Config.storageKeys.filter((key) => key !== "wa_meta"));
  const now = () => new Date().toISOString();
  const deepClone = (value) => JSON.parse(JSON.stringify(value));

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
    try { return raw == null ? fallback : JSON.parse(raw); }
    catch (_) { return fallback; }
  };

  const rawGet = (key) => {
    try { return localStorage.getItem(key); }
    catch (_) { return memory.has(key) ? memory.get(key) : null; }
  };

  const rawSet = (key, value) => {
    const serialized = JSON.stringify(value);
    try { localStorage.setItem(key, serialized); }
    catch (_) { memory.set(key, serialized); }
    return value;
  };

  const get = (key) => {
    const fallback = arrayKeys.has(key) ? [] : {};
    const value = parse(rawGet(key), fallback);
    if (arrayKeys.has(key)) return Array.isArray(value) ? value : [];
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  };

  const set = (key, value) => rawSet(key, value);

  const normalizeRecord = (record) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) return record;
    const copy = {};
    Object.entries(record).forEach(([key, value]) => {
      if (typeof value === "string") copy[key] = sanitizeText(value, key.toLowerCase().includes("url") ? 1200 : 2500);
      else if (Array.isArray(value)) copy[key] = value.map((item) => typeof item === "string" ? sanitizeText(item, 600) : normalizeRecord(item));
      else if (value && typeof value === "object") copy[key] = normalizeRecord(value);
      else copy[key] = value;
    });
    return copy;
  };

  const createId = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const randomToken = (prefix = "tok") => {
    const bytes = new Uint8Array(16);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    return `${prefix}_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  };

  const upsert = (key, record, identity = "id") => {
    if (!arrayKeys.has(key)) throw new Error(`المفتاح ${key} ليس جدولًا`);
    const rows = get(key);
    const clean = normalizeRecord(record);
    const timestamp = now();
    const index = rows.findIndex((row) => row?.[identity] === clean?.[identity]);
    if (index >= 0) rows[index] = { ...rows[index], ...clean, updatedAt: timestamp };
    else rows.push({ ...clean, createdAt: clean.createdAt || timestamp, updatedAt: timestamp });
    set(key, rows);
    return deepClone(index >= 0 ? rows[index] : rows[rows.length - 1]);
  };

  const insertUnique = (key, record, uniqueFields = ["id"]) => {
    const duplicate = get(key).find((row) => uniqueFields.every((field) => row?.[field] === record?.[field]));
    return duplicate ? deepClone(duplicate) : upsert(key, record);
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
    try { return callback(); }
    catch (error) {
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

  const ensureKeys = () => WA.Config.storageKeys.forEach((key) => {
    if (rawGet(key) === null) set(key, arrayKeys.has(key) ? [] : {});
  });

  const migrateLegacy = () => {
    const meta = get("wa_meta");
    const currentVersion = Number(meta.dataVersion || 0);
    if (currentVersion >= WA.Config.dataVersion) return;

    const requests = get("wa_requests").map((request) => ({
      ...request,
      publicToken: request.publicToken || randomToken("req"),
      humanId: request.humanId || request.id,
      region: request.region || WA.Automotive.getRegionForCity(request.city),
      status: request.status || "referred",
      lastActivityAt: request.lastActivityAt || request.updatedAt || request.createdAt || now()
    }));

    const referrals = get("wa_referrals").map((referral) => ({
      ...referral,
      partnerId: referral.partnerId || referral.workshopId || "",
      order: referral.order || 1,
      status: referral.status || "registered",
      serviceReceivedAt: referral.serviceReceivedAt || (referral.intakeStartedAt ? referral.intakeStartedAt : ""),
      costBand: referral.costBand || "",
      costSource: referral.costSource || "",
      costPartnerConfirmedAt: referral.costPartnerConfirmedAt || ""
    }));

    const partners = get("wa_partners").map((partner) => ({
      ...partner,
      type: partner.type || "workshop",
      region: partner.region || WA.Automotive.getRegionForCity(partner.city),
      coverageCities: partner.coverageCities?.length ? partner.coverageCities : (partner.city ? [partner.city] : []),
      specialtiesPriority: partner.specialtiesPriority || partner.specialties || [],
      makesPriority: partner.makesPriority || partner.servedMakes || [],
      fuelTypes: partner.fuelTypes || ["بنزين"],
      partnershipStatus: partner.partnershipStatus || "active",
      paymentStatus: partner.paymentStatus || "current",
      isDemo: typeof partner.isDemo === "boolean" ? partner.isDemo : true
    }));

    const discounts = get("wa_discounts").map((discount) => ({
      ...discount,
      scope: discount.scope || ((discount.includedServices || []).some((item) => item === "جميع الخدمات") ? "all" : "selected"),
      includedServices: discount.includedServices || [],
      continuousUntilStopped: discount.continuousUntilStopped !== false,
      endsAt: discount.continuousUntilStopped === false ? (discount.endsAt || "") : ""
    }));

    const legacyClaims = get("wa_claims");
    if (!get("wa_invoices").length && legacyClaims.length) {
      set("wa_invoices", legacyClaims.map((claim) => ({
        ...claim,
        number: claim.number || claim.id,
        issueReason: claim.reason || "legacy_migration",
        objectionDeadline: claim.objectionDeadline || "",
        legacyMigrated: true
      })));
    }

    set("wa_requests", requests);
    set("wa_referrals", referrals);
    set("wa_partners", partners);
    set("wa_discounts", discounts);
    set("wa_meta", { ...meta, dataVersion: WA.Config.dataVersion, migratedAt: now(), updatedAt: now() });
  };

  const integrityCheck = () => {
    const issues = [];
    const ids = (key) => new Set(get(key).map((row) => row.id));
    const customers = ids("wa_customers");
    const vehicles = ids("wa_vehicles");
    const requests = ids("wa_requests");
    const partners = ids("wa_partners");
    const referrals = ids("wa_referrals");
    const invoices = ids("wa_invoices");

    get("wa_vehicles").forEach((row) => { if (!customers.has(row.customerId)) issues.push(`المركبة ${row.id} مرتبطة بعميل غير موجود`); });
    get("wa_requests").forEach((row) => {
      if (!customers.has(row.customerId)) issues.push(`الطلب ${row.id} مرتبط بعميل غير موجود`);
      if (!vehicles.has(row.vehicleId)) issues.push(`الطلب ${row.id} مرتبط بمركبة غير موجودة`);
    });
    get("wa_referrals").forEach((row) => {
      if (!requests.has(row.requestId)) issues.push(`الإحالة ${row.id} مرتبطة بطلب غير موجود`);
      if (!partners.has(row.partnerId)) issues.push(`الإحالة ${row.id} مرتبطة بشريك غير موجود`);
    });
    get("wa_ratings").forEach((row) => { if (!referrals.has(row.referralId)) issues.push(`التقييم ${row.id} مرتبط بإحالة غير موجودة`); });
    get("wa_fees").forEach((row) => {
      if (!referrals.has(row.referralId)) issues.push(`الرسم ${row.id} مرتبط بإحالة غير موجودة`);
      if (!partners.has(row.partnerId)) issues.push(`الرسم ${row.id} مرتبط بشريك غير موجود`);
    });
    get("wa_payments").forEach((row) => { if (row.invoiceId && !invoices.has(row.invoiceId)) issues.push(`الدفعة ${row.id} مرتبطة بفاتورة غير موجودة`); });
    return issues;
  };

  const init = () => {
    ensureKeys();
    migrateLegacy();
    const meta = get("wa_meta");
    set("wa_meta", { ...meta, dataVersion: WA.Config.dataVersion, initializedAt: meta.initializedAt || now(), updatedAt: now() });
  };

  WA.Storage = { init, get, set, upsert, insertUnique, remove, findById, transaction, createId, randomToken, sanitizeText, sanitizePhone, normalizeWhatsapp, deepClone, now, integrityCheck };
})();
