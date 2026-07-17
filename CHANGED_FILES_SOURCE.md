# الكود الكامل للملفات المتغيرة

## `404.html`

```html
<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="description" content="الصفحة غير موجودة في منصة وين أوديها."><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"><title>الصفحة غير موجودة — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css"></head>
<body><div data-site-header></div><main id="main-content" class="section"><div class="container empty-state"><div class="path-icon" data-icon="search"></div><h1>الصفحة غير موجودة</h1><p>قد يكون الرابط غير صحيح أو تغيّر مسار الصفحة. اختر وجهتك من الخيارات التالية.</p><div class="button-row"><a class="btn btn-primary" href="index.html">الرئيسية</a><a class="btn btn-light" href="track.html">متابعة طلب</a></div></div></main><div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script></body></html>

```

## `assets/common.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const escapeHtml = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
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
  const statusLabel = (status, source = "request") => source === "referral" ? (WA.Config.referralStatuses[status] || status) : (WA.Config.requestStatuses[status] || status);

  const pageGuidance = {
    "index.html": "اختر الخدمة التي تناسب احتياجك، وسنظهر لك الحقول المطلوبة فقط.",
    "customer.html": "أكمل الخطوات الظاهرة، وسيُحفظ تقدمك تلقائيًا على هذا الجهاز.",
    "track.html": "تابع حالة طلبك، وتواصل مع الشريك، واطلب بديلًا أو قيّم الخدمة من الصفحة نفسها.",
    "join.html": "اختر نوع نشاطك بدقة لتظهر لك المتطلبات المرتبطة بخدماتك فقط.",
    "join-status.html": "استخدم رقم طلب الانضمام ورقم الجوال للاطلاع على آخر تحديث.",
    "workshop-login.html": "أدخل بيانات الشريك التي زودتك بها المنصة للوصول إلى لوحة الإدارة.",
    "workshop-dashboard.html": "حدّث الإحالات والخدمات والخصومات والفواتير أولًا بأول للحفاظ على دقة الحساب.",
    "payment.html": "راجع تفاصيل الفاتورة وطريقة السداد قبل تأكيد العملية.",
    "receipt.html": "احتفظ بالإيصال أو اطبعه، ويمكنك الرجوع إلى لوحة الشريك في أي وقت.",
    "privacy.html": "تعرف على البيانات التي نستخدمها لتشغيل الطلب وحماية حقوقك.",
    "terms.html": "توضح الشروط دور المنصة ومسؤولية مقدم الخدمة وآلية الرسوم والاعتراضات.",
    "404.html": "استخدم الرئيسية أو متابعة الطلب للوصول إلى الصفحة الصحيحة."
  };

  const iconPaths = {
    home: '<path d="M3.5 10.5 12 3l8.5 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/>',
    back: '<path d="m15 18-6-6 6-6"/><path d="M9 12h11"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    car: '<path d="M5 16h14l-1.5-6h-11L5 16Z"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/><path d="M7 10 9 6h6l2 4"/>',
    parts: '<path d="m14.7 6.3 3-3a4 4 0 0 1-5.2 5.2l-6.9 6.9a2 2 0 1 0 2.8 2.8l6.9-6.9a4 4 0 0 1 5.2-5.2l-3 3"/>',
    tow: '<path d="M3 6h11v10H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M7 6V3h4v3"/>',
    maintenance: '<path d="M14.7 6.3a4 4 0 0 1-5.2 5.2l-5.8 5.8a2 2 0 1 0 2.8 2.8l5.8-5.8a4 4 0 0 1 5.2-5.2l-2.8 2.8-2.6-2.6 2.6-3Z"/>',
    whatsapp: '<path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.4 2.4 2.1 4.1 4.5 4.8l1.2-1.1 1.8.8c-.4 1.5-1.4 2.2-2.8 2-3.5-.6-6.2-3.4-6.7-6.8-.2-1.3.5-2.4 2-2.8l.9 1.8L9 8.5Z"/>',
    copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    track: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    partner: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2"/><path d="M16 11a3 3 0 0 0 0-6M16 14a5 5 0 0 1 5 5v1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3 7.5 7.5 9.5 4.5-2 7.5-5 7.5-9.5V6L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    refresh: '<path d="M20 7v5h-5"/><path d="M18.5 16a8 8 0 1 1 1.1-8L20 12"/>',
    alert: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
    invoice: '<path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h6M9 8h2"/>',
    payment: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
    print: '<path d="M7 9V3h10v6M7 17v4h10v-4"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M16 13h1"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    location: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    money: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H5v2M17 15h2v-2"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    save: '<path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>'
  };

  const iconSvg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.arrow}</svg>`;
  const inferIcon = (element) => {
    const text = element.textContent.trim();
    if (/واتساب/.test(text)) return "whatsapp";
    if (/نسخ/.test(text)) return "copy";
    if (/الرئيسية/.test(text)) return "home";
    if (/السابق|العودة/.test(text)) return "back";
    if (/متابعة|عرض الطلب|عرض الحالة/.test(text)) return "track";
    if (/موقع|الخريطة/.test(text)) return "location";
    if (/طباعة/.test(text)) return "print";
    if (/سداد|دفع/.test(text)) return "payment";
    if (/فاتورة|كشف/.test(text)) return "invoice";
    if (/اعتراض|تنبيه/.test(text)) return "alert";
    if (/بديل|أخرى/.test(text)) return "refresh";
    if (/إلغاء|إغلاق/.test(text)) return "close";
    if (/حفظ/.test(text)) return "save";
    if (/انضم|شريك|دخول/.test(text)) return "partner";
    if (/ابدأ|التالي|إرسال|تفعيل|تسجيل|فتح|ابحث|متابعة/.test(text)) return "arrow";
    return "";
  };

  const decorateIcons = (root = document) => {
    qsa("[data-icon], .btn, .utility-btn, .icon-action, .text-link, .nav-toggle", root).forEach((element) => {
      if (element.dataset.iconDecorated === "true") return;
      const name = element.dataset.icon || inferIcon(element);
      if (!name) return;
      const holder = document.createElement("span");
      holder.className = "ui-icon";
      holder.setAttribute("aria-hidden", "true");
      holder.innerHTML = iconSvg(name);
      element.prepend(holder);
      element.dataset.iconDecorated = "true";
    });
    qsa("[data-service-icon]", root).forEach((element) => {
      if (element.dataset.iconDecorated === "true") return;
      element.innerHTML = iconSvg(element.dataset.serviceIcon);
      element.dataset.iconDecorated = "true";
    });
    qsa(".card-icon[data-icon]", root).forEach((element) => {
      if (element.dataset.cardIconDecorated === "true") return;
      element.innerHTML = iconSvg(element.dataset.icon);
      element.dataset.cardIconDecorated = "true";
    });
  };

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
    try { await navigator.clipboard.writeText(text); showToast("تم النسخ", "success"); return true; }
    catch (_) {
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

  const vehicleText = (vehicle) => `${vehicle.makeOther || vehicle.make} ${vehicle.modelOther || vehicle.model}${vehicle.year ? ` ${vehicle.year}` : ""}`.trim();
  const buildWhatsappMessage = ({ request, customer, vehicle }) => {
    const lines = ["السلام عليكم،", `معك ${customer.firstName}، وصلت إليكم عن طريق «وين أوديها» بخصوص الطلب رقم ${request.humanId}.`, "", `السيارة: ${vehicleText(vehicle)}.`];
    if (request.serviceType === "problem") lines.push(`الطلب: فحص مشكلة — ${request.problem}.`);
    if (request.serviceType === "parts") {
      if (vehicle.vin) lines.push(`رقم الهيكل: ${vehicle.vin}.`);
      lines.push(`القطعة المطلوبة: ${request.partName}.`, `النوع المفضل: ${request.partType}.`, "أرغب بالتأكد من التوفر والسعر والمطابقة للسيارة.");
    }
    if (request.serviceType === "tow") {
      lines.push(`موقع السيارة: ${request.preciseLocation}.`, `وصف المكان: ${request.placeDescription}.`, `حالة السيارة: ${request.vehicleMoves}.`);
      if (request.towDestination) lines.push(`الوجهة: ${request.towDestination}.`);
      lines.push("الطلب عاجل، وأرغب بالتنسيق معكم.");
    }
    if (request.serviceType === "maintenance") lines.push(`الخدمة المطلوبة: ${request.maintenanceService}.`, `نوع الوقود: ${vehicle.fuelType || "غير محدد"}.`, request.notes ? `ملاحظة: ${request.notes}.` : "", "أرغب بالتنسيق معكم.");
    if (request.serviceType === "problem") lines.push("", "أرغب بالتنسيق معكم.");
    return lines.filter(Boolean).join("\n");
  };

  const availabilityText = (partner) => partner.availability?.status === "verified"
    ? `تم تحديث قابلية الاستقبال بتاريخ ${formatDate(partner.availability.verifiedAt, { time: false })}. يرجى تأكيد الموعد عبر واتساب.`
    : (partner.availability?.note || "الشريك يستقبل عادةً هذا النوع من الطلبات، ويرجى التأكد من الموعد عبر واتساب.");

  const weekdayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const scheduleForToday = (partner) => {
    const item = (partner.schedule || []).find((row) => row.day === weekdayNames[new Date().getDay()]);
    if (!item) return partner.hours || "تأكد عبر واتساب";
    if (!item.open) return "مغلق اليوم";
    if (item.allDay) return "مفتوح 24 ساعة";
    const slots = [item.period1, item.period2].filter(Boolean).map((slot) => `${slot.from}–${slot.to}`);
    return slots.join("، ") || "تأكد عبر واتساب";
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
    const ratingHtml = Number(partner.ratingCount || 0) > 0
      ? `${renderStars(partner.ratingOverall)}<strong>${escapeHtml(partner.ratingOverall)} / 5</strong><small>بناءً على ${escapeHtml(partner.ratingCount)} تقييمًا موثقًا</small>`
      : "<strong>شريك جديد</strong><small>لا توجد تقييمات كافية بعد</small>";
    const discountServices = discount?.scope === "all" ? "جميع الخدمات" : ((discount?.includedServices || []).join("، ") || "خدمات مختارة");
    const discountHtml = discount ? `<section class="discount-box"><strong>${escapeHtml(discount.title)}: ${escapeHtml(discount.percent)}%</strong><span>${escapeHtml(discountServices)}</span><small>${escapeHtml(discount.conditions || "")}${discount.continuousUntilStopped ? " — مستمر حتى يوقفه الشريك." : ` — حتى ${escapeHtml(discount.endsAt)}`}</small></section>` : "";
    const mapLink = partner.googleMapsUrl ? `<a class="text-link" data-icon="location" href="${escapeHtml(partner.googleMapsUrl)}" target="_blank" rel="noopener noreferrer">فتح الموقع على خرائط Google</a>` : "";
    return `<article class="partner-card ${compact ? "partner-card-compact" : ""}">
      <div class="partner-head"><div><span class="pill">${escapeHtml(WA.Config.partnerTypes[partner.type] || partner.type)}</span><h2>${escapeHtml(partner.name)}</h2><p>${escapeHtml(partner.region || "")} — ${escapeHtml(partner.city)} — ${escapeHtml(partner.address || partner.exactLocation || "")}</p>${mapLink}</div><div class="rating-block">${ratingHtml}</div></div>
      <div class="partner-metrics"><div><span>عدالة الأسعار</span><strong>${escapeHtml(partner.fairnessRating || "—")} / 5</strong><small>${escapeHtml(partner.fairnessCount || 0)} تقييمًا موثقًا</small></div><div><span>الالتزام</span><strong>${escapeHtml(partner.commitment || "—")}</strong><small>مستوى الالتزام المسجل</small></div><div><span>ساعات اليوم</span><strong>${escapeHtml(scheduleForToday(partner))}</strong><small>أكد الموعد عبر واتساب</small></div></div>
      <div class="info-panel"><strong>لماذا رُشح لك؟</strong><p>${escapeHtml(matchReason || referral?.matchReason || "يناسب نوع الخدمة والمدينة المسجلة في طلبك.")}</p></div>
      <div class="info-panel muted"><strong>الاستقبال</strong><p>${escapeHtml(availabilityText(partner))}</p></div>${discountHtml}
    </article>`;
  };

  const injectLayout = () => {
    qsa("[data-site-header]").forEach((slot) => {
      slot.innerHTML = `<header class="site-header"><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="utility-strip"><div class="container utility-actions"><a class="utility-btn" data-icon="home" href="index.html"><span>الرئيسية</span></a><button class="utility-btn" data-icon="back" type="button" data-go-back><span>السابق</span></button></div></div><div class="container nav-shell"><a class="brand" href="index.html" aria-label="وين أوديها — الرئيسية"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>وجهتك للخدمة المناسبة</small></span></a><button class="nav-toggle" data-icon="menu" type="button" aria-expanded="false" aria-controls="mainNav"><span>القائمة</span></button><nav id="mainNav" class="main-nav" aria-label="التنقل الرئيسي"><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a></nav></div></header>`;
      const toggle = qs(".nav-toggle", slot);
      const nav = qs(".main-nav", slot);
      toggle?.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("open", !open);
      });
      qs("[data-go-back]", slot)?.addEventListener("click", () => { if (history.length > 1) history.back(); else location.href = "index.html"; });
    });
    const page = location.pathname.split("/").pop() || "index.html";
    qsa("[data-site-footer]").forEach((slot) => {
      slot.innerHTML = `<footer class="site-footer"><div class="container page-guidance"><span class="guidance-icon" data-icon="check" aria-hidden="true"></span><div><strong>معلومة تساعدك</strong><p>${escapeHtml(pageGuidance[page] || "استخدم أزرار الرئيسية والسابق أعلى الصفحة للتنقل بسهولة.")}</p></div></div><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>وجهتك للخدمة المناسبة</small></span></a><p>نساعد صاحب السيارة على فهم احتياجه والوصول إلى مقدم خدمة مناسب، مع متابعة واضحة للطلب من البداية إلى التقييم.</p></div><div><strong>خدمات العملاء</strong><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="privacy.html">سياسة الخصوصية</a><a href="terms.html">الشروط وحدود المسؤولية</a></div><div><strong>للشركاء</strong><a href="join.html">الانضمام إلى الشبكة</a><a href="join-status.html">متابعة طلب الانضمام</a><a href="workshop-login.html">دخول الشريك</a></div></div><div class="container footer-bottom"><span>© 2026 وين أوديها. جميع الحقوق محفوظة.</span><span>خدمة توجيه وإحالة لمقدمي خدمات السيارات</span></div></footer>`;
    });
  };

  const initSelect = (select, options, placeholder = "اختر") => { if (select) select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}`; };
  const setButtonBusy = (button, busy, text = "جاري التنفيذ...") => { if (!button) return; if (busy) { button.dataset.originalText = button.textContent; button.textContent = text; button.disabled = true; button.setAttribute("aria-busy", "true"); } else { button.textContent = button.dataset.originalText || button.textContent; button.disabled = false; button.removeAttribute("aria-busy"); delete button.dataset.iconDecorated; decorateIcons(button.parentElement || document); } };
  const setActiveNav = () => { const page = location.pathname.split("/").pop() || "index.html"; qsa(".main-nav a").forEach((link) => { if (link.getAttribute("href").split("?")[0] === page) link.setAttribute("aria-current", "page"); }); };
  const init = () => {
    WA.Storage.init();
    WA.Seed.run();
    WA.Lifecycle.runSweep();
    injectLayout();
    setActiveNav();
    decorateIcons();
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => { if (node.nodeType === Node.ELEMENT_NODE) decorateIcons(node); })));
    observer.observe(document.body, { childList: true, subtree: true });
    document.documentElement.classList.add("js");
    document.body.classList.add("page-ready");
  };

  WA.UI = { qs, qsa, escapeHtml, formatDate, formatMoney, serviceLabel, statusLabel, showToast, copyText, whatsappUrl, buildWhatsappMessage, availabilityText, renderStars, renderPartnerCard, getRequestBundle, initSelect, setButtonBusy, vehicleText, scheduleForToday, decorateIcons, iconSvg };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();

```

## `assets/customer.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  const $$ = WA.UI.qsa;
  const validServices = Object.keys(WA.Config.serviceTypes);
  const progress = { service:[7,"اختيار الخدمة"], customer:[18,"بيانات التواصل"], vehicle:[31,"بيانات السيارة"], location:[44,"المنطقة والموقع"], path:[58,"تفاصيل الطلب"], analyzing:[68,"التحليل"], questions:[78,"أربعة أسئلة"], guidance:[86,"التوجيه"], review:[86,"المراجعة"], matching:[95,"المطابقة والإحالة"], result:[100,"اكتمل"], noMatch:[100,"نتيجة المطابقة"] };

  const defaultState = () => ({
    screen:"service", serviceType:"",
    customer:{ firstName:"", phone:"" }, consents:{ privacyAccepted:false, termsAccepted:false, marketingMessages:false },
    vehicle:{ make:"", makeOther:"", model:"", modelOther:"", year:"", mileage:"", fuelType:"", vin:"" },
    region:"", city:"", preciseLocation:"", locationCoordinates:null, placeDescription:"",
    problem:"", partName:"", partType:"", vehicleMoves:"", towDestination:"", towNotes:"",
    maintenanceService:"", maintenanceNotes:"", ai:null, questions:[], answers:[], questionIndex:0,
    requestId:"", referralId:""
  });
  let state = defaultState();
  let draftTimer;

  const saveDraft = () => { clearTimeout(draftTimer); draftTimer = setTimeout(() => WA.Lifecycle.saveDraft(state), 100); };
  const setProgress = (screen) => { const [percent,label] = progress[screen] || [0,"بداية الطلب"]; $("#progressBar").style.width=`${percent}%`; $("#progressPercent").textContent=`${percent}%`; $("#progressLabel").textContent=label; $(".progress-track").setAttribute("aria-valuenow", String(percent)); };
  const showScreen = (screen, focus=true) => { $$(".flow-screen").forEach((item)=>item.classList.toggle("active", item.dataset.screen===screen)); state.screen=screen; setProgress(screen); const active=$(`.flow-screen[data-screen="${screen}"]`); if(active&&focus){ active.focus({preventScroll:false}); active.scrollIntoView({block:"start",behavior:"smooth"}); } saveDraft(); };
  const setError = (id,message="") => { const target=$(`[data-error-for="${id}"]`); const field=$(`#${id}`); if(target)target.textContent=message; if(field)field.setAttribute("aria-invalid",message?"true":"false"); };
  const required = (id,message) => { const field=$(`#${id}`); const ok=Boolean(field?.value?.trim()); setError(id,ok?"":message); return ok; };

  const updateModels = (selected="") => { const make=$("#make").value; const select=$("#model"); if(!make){ select.disabled=true; select.innerHTML='<option value="">اختر الشركة أولًا</option>'; return; } select.disabled=false; WA.UI.initSelect(select,WA.Automotive.getModels(make),"اختر الموديل"); if(selected)select.value=selected; };
  const updateCities = (selected="") => { const region=$("#region").value; const select=$("#city"); if(!region){ select.disabled=true; select.innerHTML='<option value="">اختر المنطقة أولًا</option>'; return; } select.disabled=false; WA.UI.initSelect(select,WA.Automotive.getCities(region),"اختر المدينة"); if(selected)select.value=selected; };
  const updateOtherFields = () => { const otherMake=$("#make").value==="أخرى"; const otherModel=$("#model").value==="أخرى"||otherMake; $("#makeOtherField").hidden=!otherMake; $("#modelOtherField").hidden=!otherModel; $("#makeOther").required=otherMake; $("#modelOther").required=otherModel; };

  const updateConditionalFields = () => {
    const service=state.serviceType;
    const mileage=["problem","maintenance"].includes(service);
    $("#mileageField").hidden=!mileage; $("#mileage").required=mileage;
    $("#fuelField").hidden=service!=="maintenance"; $("#fuelType").required=service==="maintenance";
    const yearRequired=service!=="tow"; $("#year").required=yearRequired; $("#yearLabel").classList.toggle("required",yearRequired);
    const tow=service==="tow";
    $("#preciseLocationLabel").classList.toggle("required",tow); $("#preciseLocation").required=tow;
    $("#locationHelp").textContent=tow?"خدمة السطحة عاجلة: مشاركة الموقع التلقائي وكتابة نقطة الالتقاء مطلوبان.":"ابدأ بالمنطقة ثم المدينة. مشاركة الموقع اختيارية لتحسين المطابقة.";
    $("#problemFields").hidden=service!=="problem"; $("#partsFields").hidden=service!=="parts"; $("#towFields").hidden=service!=="tow"; $("#maintenanceFields").hidden=service!=="maintenance";
    $("#problem").required=service==="problem"; $("#partName").required=service==="parts"; $("#partType").required=service==="parts"; $("#vehicleMoves").required=tow; $("#placeDescription").required=tow; $("#maintenanceService").required=service==="maintenance";
    const titles={ problem:["وش المشكلة في سيارتك؟","صف الأعراض بطريقتك، ثم أجب عن أربعة أسئلة قصيرة."], parts:["وش القطعة المطلوبة؟","اكتب اسم القطعة بدقة، وأضف رقم الهيكل إن توفر، ثم اختر النوع المفضل."], tow:["طلب سطحة عاجل","شارك موقع السيارة واكتب وصف المكان وحالة السيارة والوجهة إن كانت معروفة."], maintenance:["وش الصيانة المطلوبة؟","اختر الخدمة وأضف ملاحظة عند الحاجة."] };
    const [title,desc]=titles[service]||["تفاصيل الطلب","أكمل البيانات."]; $("#pathTitle").textContent=title; $("#pathDescription").textContent=desc; $("#pathSubmit").textContent=service==="problem"?"تحليل المشكلة":"مراجعة الطلب";
  };

  const selectService = (service) => { if(!validServices.includes(service))return; state.serviceType=service; $$('[data-service]').forEach((button)=>button.classList.toggle("selected",button.dataset.service===service)); $("#serviceNext").disabled=false; $("#flowServiceLabel").textContent=WA.Config.serviceTypes[service]; updateConditionalFields(); saveDraft(); };

  const sync = () => {
    state.customer.firstName=WA.Storage.sanitizeText($("#firstName").value,40); state.customer.phone=WA.Storage.sanitizePhone($("#phone").value);
    state.consents={ privacyAccepted:$("#privacyAccepted").checked, termsAccepted:$("#termsAccepted").checked, marketingMessages:$("#marketingMessages").checked };
    state.vehicle.make=$("#make").value; state.vehicle.makeOther=WA.Storage.sanitizeText($("#makeOther").value,60); state.vehicle.model=$("#model").value; state.vehicle.modelOther=WA.Storage.sanitizeText($("#modelOther").value,60); state.vehicle.year=$("#year").value; state.vehicle.mileage=$("#mileage").value; state.vehicle.fuelType=$("#fuelType").value; state.vehicle.vin=WA.Storage.sanitizeText($("#vin").value,40).toUpperCase();
    state.region=$("#region").value; state.city=$("#city").value; state.preciseLocation=WA.Storage.sanitizeText($("#preciseLocation").value,400);
    state.problem=WA.Storage.sanitizeText($("#problem").value,1200); state.partName=WA.Storage.sanitizeText($("#partName").value,200); state.partType=$("#partType").value;
    state.vehicleMoves=$("#vehicleMoves").value; state.towDestination=WA.Storage.sanitizeText($("#towDestination").value,300); state.placeDescription=WA.Storage.sanitizeText($("#placeDescription").value,500); state.towNotes=WA.Storage.sanitizeText($("#towNotes").value,500);
    state.maintenanceService=$("#maintenanceService").value; state.maintenanceNotes=WA.Storage.sanitizeText($("#maintenanceNotes").value,500);
  };

  const hydrate = () => {
    $("#firstName").value=state.customer.firstName||""; $("#phone").value=state.customer.phone||""; $("#privacyAccepted").checked=!!state.consents.privacyAccepted; $("#termsAccepted").checked=!!state.consents.termsAccepted; $("#marketingMessages").checked=!!state.consents.marketingMessages;
    $("#make").value=state.vehicle.make||""; updateModels(state.vehicle.model); $("#model").value=state.vehicle.model||""; $("#makeOther").value=state.vehicle.makeOther||""; $("#modelOther").value=state.vehicle.modelOther||""; $("#year").value=state.vehicle.year||""; $("#mileage").value=state.vehicle.mileage||""; $("#fuelType").value=state.vehicle.fuelType||""; $("#vin").value=state.vehicle.vin||"";
    $("#region").value=state.region||""; updateCities(state.city); $("#city").value=state.city||""; $("#preciseLocation").value=state.preciseLocation||"";
    $("#problem").value=state.problem||""; $("#partName").value=state.partName||""; $("#partType").value=state.partType||""; $("#vehicleMoves").value=state.vehicleMoves||""; $("#towDestination").value=state.towDestination||""; $("#placeDescription").value=state.placeDescription||""; $("#towNotes").value=state.towNotes||""; $("#maintenanceService").value=state.maintenanceService||""; $("#maintenanceNotes").value=state.maintenanceNotes||"";
    if(state.locationCoordinates) $("#locationStatus").textContent=`تم حفظ الموقع: ${state.locationCoordinates.lat.toFixed(5)}, ${state.locationCoordinates.lng.toFixed(5)}`;
    updateOtherFields(); if(state.serviceType)selectService(state.serviceType);
  };

  const validateCustomer = () => { let ok=required("firstName","اكتب الاسم الأول"); const phone=WA.Storage.sanitizePhone($("#phone").value); const phoneOk=/^05\d{8}$/.test(phone); setError("phone",phoneOk?"":"أدخل رقم جوال سعودي بصيغة 05XXXXXXXX"); ok=ok&&phoneOk; if(!$("#privacyAccepted").checked||!$("#termsAccepted").checked){ WA.UI.showToast("يلزم قبول الخصوصية والشروط","error"); ok=false; } return ok; };
  const validateVehicle = () => { let ok=true; ["make","model"].forEach((id)=>{ok=required(id,"هذا الحقل مطلوب")&&ok;}); if(state.serviceType!=="tow")ok=required("year","اختر سنة الصنع")&&ok; if($("#make").value==="أخرى")ok=required("makeOther","اكتب اسم الشركة")&&ok; if($("#model").value==="أخرى"||$("#make").value==="أخرى")ok=required("modelOther","اكتب اسم الموديل")&&ok; if(["problem","maintenance"].includes(state.serviceType))ok=required("mileage","اختر الممشى")&&ok; if(state.serviceType==="maintenance")ok=required("fuelType","اختر نوع الوقود")&&ok; return ok; };
  const validateLocation = () => { let ok=required("region","اختر المنطقة"); ok=required("city","اختر المدينة")&&ok; if(state.serviceType==="tow"){ ok=required("preciseLocation","موقع السيارة مطلوب")&&ok; if(!state.locationCoordinates){ $("#locationStatus").textContent="يجب مشاركة الموقع التلقائي لخدمة السطحة."; $("#locationStatus").classList.add("error-text"); ok=false; } } return ok; };
  const validatePath = () => { let ok=true; if(state.serviceType==="problem"){ const clean=WA.Storage.sanitizeText($("#problem").value,1200); ok=clean.length>=8; setError("problem",ok?"":"اكتب وصفًا أوضح بما لا يقل عن 8 أحرف"); } if(state.serviceType==="parts"){ ok=required("partName","اكتب اسم القطعة بدقة")&&ok; ok=required("partType","اختر نوع القطعة")&&ok; } if(state.serviceType==="tow"){ ok=required("vehicleMoves","حدد حالة حركة السيارة")&&ok; ok=required("placeDescription","اكتب وصف مكان السيارة")&&ok; } if(state.serviceType==="maintenance")ok=required("maintenanceService","اختر خدمة الصيانة")&&ok; return ok; };

  const animate = (selector,done) => { const steps=$$(selector); steps.forEach((step)=>step.classList.remove("active","done")); steps[0]?.classList.add("active"); steps.forEach((step,index)=>setTimeout(()=>{step.classList.remove("active");step.classList.add("done");steps[index+1]?.classList.add("active");if(index===steps.length-1)setTimeout(done,250);},360*(index+1))); };
  const runAnalysis = () => { showScreen("analyzing"); animate("#analysisSteps .loader-step",()=>{ state.ai=WA.AIEngine.assess({description:state.problem,vehicle:state.vehicle}); state.questions=(state.ai.questions||[]).slice(0,4); while(state.questions.length<4)state.questions.push("هل توجد علامة أو صوت إضافي لاحظته مع المشكلة؟"); state.answers=[]; state.questionIndex=0; renderQuestion(); }); };
  const renderQuestion = () => { const question=state.questions[state.questionIndex]; if(!question){ state.ai=WA.AIEngine.finalize({description:state.problem,vehicle:state.vehicle,questions:state.questions,answers:state.answers}); renderGuidance(); return; } $("#questionTitle").textContent=`سؤال ${state.questionIndex+1} من 4`; $("#questionText").textContent=question; const holder=$("#answerChoices"); holder.replaceChildren(); ["نعم","لا","غير متأكد"].forEach((answer)=>{const button=document.createElement("button");button.type="button";button.className="choice-btn";button.textContent=answer;button.classList.toggle("selected",state.answers[state.questionIndex]===answer);button.addEventListener("click",()=>{state.answers[state.questionIndex]=answer;$$('.choice-btn',holder).forEach((item)=>item.classList.remove("selected"));button.classList.add("selected");$("#questionNext").disabled=false;saveDraft();});holder.appendChild(button);}); $("#questionBack").disabled=state.questionIndex===0; $("#questionNext").disabled=!state.answers[state.questionIndex]; $("#questionNext").textContent=state.questionIndex===3?"عرض النتيجة":"التالي"; showScreen("questions"); };
  const renderGuidance = () => { state.ai=state.ai?.answers?state.ai:WA.AIEngine.finalize({description:state.problem,vehicle:state.vehicle,questions:state.questions,answers:state.answers}); $("#expectedIssue").textContent=state.ai.expectedIssue; $("#specialty").textContent=state.ai.specialty; $("#urgency").textContent=state.ai.urgency; $("#nextStep").textContent=state.ai.nextStep; $("#legalNotice").textContent=state.ai.legalNotice; const danger=state.ai.urgency==="خطرة"; $("#dangerPanel").hidden=!danger; $("#dangerPanel").innerHTML=danger?`<strong>توجيه سلامة عاجل</strong><p>${WA.UI.escapeHtml(state.ai.nextStep)}</p>`:""; $("#findPartner").textContent=danger?"استخدم خدمة السطحة":"وين أوديها؟"; showScreen("guidance"); };

  const renderReview = () => { const data=[["الخدمة",WA.Config.serviceTypes[state.serviceType]],["السيارة",WA.UI.vehicleText(state.vehicle)],["المنطقة",state.region],["المدينة",state.city]]; if(state.serviceType==="parts")data.push(["رقم الهيكل",state.vehicle.vin||"لم يدخل"],["القطعة",state.partName],["النوع",state.partType]); if(state.serviceType==="tow")data.push(["الموقع",state.preciseLocation],["وصف المكان",state.placeDescription],["حالة الحركة",state.vehicleMoves],["الوجهة",state.towDestination||"غير محددة"]); if(state.serviceType==="maintenance")data.push(["الصيانة",state.maintenanceService],["نوع الوقود",state.vehicle.fuelType],["الممشى",state.vehicle.mileage]); $("#reviewContent").innerHTML=data.map(([label,value])=>`<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value)}</strong></div>`).join(""); const notes={parts:"تأكد من توفر القطعة وسعرها ومطابقتها مباشرة مع المحل، ويفضل تزويده برقم الهيكل.",tow:"أكد وقت الوصول والسعر مباشرة مع مقدم السطحة. الطلب مصنف عاجل.",maintenance:"اتفق على السعر والموعد والتفاصيل النهائية مباشرة مع مركز الصيانة."}; $("#serviceDisclaimer").textContent=notes[state.serviceType]||""; showScreen("review"); };

  const payload = () => ({ requestId:state.requestId, serviceType:state.serviceType, customer:state.customer, consents:state.consents, vehicle:state.vehicle, region:state.region, city:state.city, preciseLocation:state.preciseLocation, locationCoordinates:state.locationCoordinates, placeDescription:state.placeDescription, problem:state.problem, partName:state.partName, partType:state.partType, vehicleMoves:state.vehicleMoves, towDestination:state.towDestination, notes:state.serviceType==="tow"?state.towNotes:state.maintenanceNotes, maintenanceService:state.maintenanceService, ai:state.serviceType==="problem"?{...state.ai,questions:state.questions,answers:state.answers}:null });

  const runMatching = () => { showScreen("matching"); let created; try{created=WA.Lifecycle.createRequest(payload());state.requestId=created.request.id;}catch(error){WA.UI.showToast(error.message,"error");showScreen("path");return;} animate(".flow-screen[data-screen='matching'] .loader-step",()=>{ const excluded=WA.Storage.get("wa_referrals").filter((row)=>row.requestId===created.request.id).map((row)=>row.partnerId); const result=WA.Matching.match({request:created.request,excludedPartnerIds:excluded}); if(!result.partner){WA.Storage.upsert("wa_requests",{...created.request,status:"no_match",lastActivityAt:WA.Storage.now()});$("#noMatchReason").textContent=result.reason;showScreen("noMatch");return;} try{const referral=WA.Lifecycle.createReferral(created.request.id,result.partner.id,result.reason);state.referralId=referral.id;WA.Lifecycle.markReferralShown(referral.id);renderResult(created.request.id,referral.id);}catch(error){WA.UI.showToast(error.message,"error");showScreen("noMatch");} }); };

  const alternativeLabel = (type) => ({ problem:"أريد ورشة أخرى", parts:"أريد محلًا آخر", tow:"أريد سطحة أخرى", maintenance:"أريد مركزًا آخر" }[type] || "أريد شريكًا آخر");
  const renderResult = (requestId,referralId) => {
    const request=WA.Storage.findById("wa_requests",requestId);
    const referral=WA.Storage.findById("wa_referrals",referralId);
    const bundle=WA.UI.getRequestBundle(request);
    if(!bundle?.partner)return;
    const {customer,vehicle,partner,discount}=bundle;
    $("#resultHeader").innerHTML=`<strong>طلبك جاهز والتواصل متاح الآن</strong><p>رقم الطلب: ${WA.UI.escapeHtml(request.humanId)}</p>`;
    $("#partnerResult").innerHTML=WA.UI.renderPartnerCard({partner,referral,discount,matchReason:referral.matchReason});
    const trackPath=`track.html?token=${encodeURIComponent(request.publicToken)}`;
    const link=new URL(trackPath,location.href).href;
    $("#privateLink").value=link;
    $("#openTrackLink").href=trackPath;
    $("#requestAlternativeLink").href=`${trackPath}#alternative`;
    $("#requestAlternativeLink span").textContent=alternativeLabel(request.serviceType);
    const message=WA.UI.buildWhatsappMessage({request,customer,vehicle,partner});
    $("#whatsappLink").href=WA.UI.whatsappUrl(partner.whatsapp,message);
    $("#whatsappLink").onclick=()=>WA.Lifecycle.markWhatsappOpened(referral.id);
    $("#copyWhatsapp").onclick=()=>WA.UI.copyText(message);
    $("#copyPrivateLink").onclick=()=>WA.UI.copyText(link);
    WA.Lifecycle.clearDraft();
    showScreen("result");
  };

  const detectLocation = () => { const button=$("#detectLocation"); if(!navigator.geolocation){$("#locationStatus").textContent="المتصفح لا يدعم تحديد الموقع.";return;} WA.UI.setButtonBusy(button,true,"جاري تحديد الموقع..."); navigator.geolocation.getCurrentPosition((position)=>{state.locationCoordinates={lat:position.coords.latitude,lng:position.coords.longitude,accuracy:position.coords.accuracy,capturedAt:WA.Storage.now()}; const text=`إحداثيات ${state.locationCoordinates.lat.toFixed(5)}, ${state.locationCoordinates.lng.toFixed(5)}`; if(!$("#preciseLocation").value)$("#preciseLocation").value=text; $("#locationStatus").textContent=`تم تحديد الموقع بدقة تقريبية ${Math.round(position.coords.accuracy)} متر.`; $("#locationStatus").classList.remove("error-text"); WA.UI.setButtonBusy(button,false); sync(); saveDraft();},(error)=>{const messages={1:"لم تمنح إذن الموقع.",2:"تعذر تحديد الموقع.",3:"انتهت مهلة تحديد الموقع."};$("#locationStatus").textContent=messages[error.code]||"تعذر تحديد الموقع.";$("#locationStatus").classList.add("error-text");WA.UI.setButtonBusy(button,false);},{enableHighAccuracy:true,timeout:12000,maximumAge:60000}); };

  const initData = () => { WA.UI.initSelect($("#make"),WA.Automotive.makes,"اختر الشركة"); WA.UI.initSelect($("#year"),WA.Automotive.buildYears(),"اختر السنة"); WA.UI.initSelect($("#mileage"),WA.Automotive.mileages,"اختر الممشى"); WA.UI.initSelect($("#fuelType"),WA.Automotive.fuels,"اختر الوقود"); WA.UI.initSelect($("#region"),WA.Automotive.regionNames,"اختر المنطقة"); WA.UI.initSelect($("#partType"),WA.Automotive.partTypes,"اختر النوع"); WA.UI.initSelect($("#vehicleMoves"),WA.Automotive.vehicleMovementOptions,"اختر الحالة"); WA.UI.initSelect($("#maintenanceService"),WA.Automotive.maintenanceServices,"اختر الصيانة"); };

  const bind = () => {
    $$('[data-service]').forEach((button)=>button.addEventListener("click",()=>selectService(button.dataset.service)));
    $("#serviceNext").addEventListener("click",()=>showScreen("customer"));
    $$('[data-back]').forEach((button)=>button.addEventListener("click",()=>showScreen(button.dataset.back)));
    $("#make").addEventListener("change",()=>{updateModels();updateOtherFields();sync();saveDraft();}); $("#model").addEventListener("change",()=>{updateOtherFields();sync();saveDraft();});
    $("#region").addEventListener("change",()=>{updateCities();sync();saveDraft();}); $("#detectLocation").addEventListener("click",detectLocation);
    $("#customerForm").addEventListener("submit",(event)=>{event.preventDefault();if(!validateCustomer())return;sync();showScreen("vehicle");});
    $("#vehicleForm").addEventListener("submit",(event)=>{event.preventDefault();if(!validateVehicle())return;sync();showScreen("location");});
    $("#locationForm").addEventListener("submit",(event)=>{event.preventDefault();sync();if(!validateLocation())return;showScreen("path");});
    $("#pathForm").addEventListener("submit",(event)=>{event.preventDefault();sync();if(!validatePath())return;if(state.serviceType==="problem")runAnalysis();else renderReview();});
    $("#questionNext").addEventListener("click",()=>{if(!state.answers[state.questionIndex])return;state.questionIndex+=1;renderQuestion();}); $("#questionBack").addEventListener("click",()=>{if(state.questionIndex>0){state.questionIndex-=1;renderQuestion();}});
    $("#findPartner").addEventListener("click",()=>{if(state.ai?.urgency==="خطرة"){selectService("tow");state.screen="location";showScreen("location");WA.UI.showToast("رصدنا مؤشرات تستدعي عدم مواصلة القيادة. أكمل بيانات السطحة وشارك موقع السيارة.","info");}else runMatching();});
    $("#reviewMatch").addEventListener("click",runMatching);
    $$('input,select,textarea').forEach((field)=>field.addEventListener("change",()=>{sync();saveDraft();}));
  };

  const init = () => { initData(); const params=new URLSearchParams(location.search); if(params.get("fresh")==="1")WA.Lifecycle.clearDraft(); const draft=params.get("fresh")==="1"?null:WA.Lifecycle.loadDraft(); if(draft)state={...defaultState(),...draft,customer:{...defaultState().customer,...draft.customer},vehicle:{...defaultState().vehicle,...draft.vehicle},consents:{...defaultState().consents,...draft.consents}}; const service=params.get("service"); if(validServices.includes(service))state.serviceType=service; hydrate(); bind(); if(state.serviceType)selectService(state.serviceType); showScreen(draft?.screen&&progress[draft.screen]?draft.screen:"service",false); if(state.screen==="questions"&&state.questions.length)renderQuestion(); if(state.screen==="guidance"&&state.ai)renderGuidance(); };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();

```

## `assets/lifecycle.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const touchRequest = (request, patch = {}) => WA.Storage.upsert("wa_requests", { ...request, ...patch, lastActivityAt: WA.Storage.now() });
  const findCustomer = (phone) => WA.Storage.get("wa_customers").find((row) => row.phone === WA.Storage.sanitizePhone(phone)) || null;
  const findRequestByToken = (token) => WA.Storage.get("wa_requests").find((row) => row.publicToken === token) || null;
  const findRequestByHumanId = (humanId) => WA.Storage.get("wa_requests").find((row) => row.humanId === String(humanId || "").toUpperCase()) || null;
  const feeForBand = (band) => WA.Config.costBands[band]?.fee ?? null;
  const bandLabel = (band) => WA.Config.costBands[band]?.label || band || "غير محددة";

  const saveCustomerAndVehicle = ({ customer, vehicle, consents = {} }) => WA.Storage.transaction(() => {
    const phone = WA.Storage.sanitizePhone(customer.phone);
    if (!/^05\d{8}$/.test(phone)) throw new Error("رقم الجوال غير صالح");
    const existingCustomer = findCustomer(phone);
    const customerRecord = WA.Storage.upsert("wa_customers", {
      id: existingCustomer?.id || WA.Storage.createId("CUS"),
      firstName: WA.Storage.sanitizeText(customer.firstName, 40),
      phone,
      operationalMessages: true,
      marketingMessages: Boolean(consents.marketingMessages)
    });

    WA.Storage.insertUnique("wa_consents", {
      id: WA.Storage.createId("CNS"),
      customerId: customerRecord.id,
      privacyAccepted: Boolean(consents.privacyAccepted),
      termsAccepted: Boolean(consents.termsAccepted),
      marketingMessages: Boolean(consents.marketingMessages),
      source: "customer_flow",
      acceptedAt: WA.Storage.now()
    }, ["customerId", "source"]);

    const make = WA.Storage.sanitizeText(vehicle.make, 60);
    const model = WA.Storage.sanitizeText(vehicle.model, 60);
    const year = WA.Storage.sanitizeText(vehicle.year, 4);
    const vin = WA.Storage.sanitizeText(vehicle.vin, 40).toUpperCase();
    const existingVehicle = WA.Storage.get("wa_vehicles").find((row) => row.customerId === customerRecord.id
      && row.make === make && row.model === model && row.year === year && (row.vin || "") === vin);
    const vehicleRecord = WA.Storage.upsert("wa_vehicles", {
      id: existingVehicle?.id || WA.Storage.createId("VEH"),
      customerId: customerRecord.id,
      make,
      makeOther: WA.Storage.sanitizeText(vehicle.makeOther, 60),
      model,
      modelOther: WA.Storage.sanitizeText(vehicle.modelOther, 60),
      year,
      mileage: WA.Storage.sanitizeText(vehicle.mileage, 60),
      fuelType: WA.Storage.sanitizeText(vehicle.fuelType, 30),
      vin
    });
    return { customer: customerRecord, vehicle: vehicleRecord };
  });

  const createRequest = (payload) => WA.Storage.transaction(() => {
    if (!WA.Config.serviceTypes[payload.serviceType]) throw new Error("نوع الخدمة غير صالح");
    const saved = saveCustomerAndVehicle(payload);
    const current = payload.requestId ? WA.Storage.findById("wa_requests", payload.requestId) : null;
    const request = WA.Storage.upsert("wa_requests", {
      id: current?.id || WA.Storage.createId("REQ"),
      humanId: current?.humanId || `WA-${String(Date.now()).slice(-6)}`,
      publicToken: current?.publicToken || WA.Storage.randomToken("req"),
      customerId: saved.customer.id,
      vehicleId: saved.vehicle.id,
      serviceType: payload.serviceType,
      region: WA.Storage.sanitizeText(payload.region, 80),
      city: WA.Storage.sanitizeText(payload.city, 80),
      preciseLocation: WA.Storage.sanitizeText(payload.preciseLocation, 400),
      locationCoordinates: payload.locationCoordinates || null,
      placeDescription: WA.Storage.sanitizeText(payload.placeDescription, 500),
      problem: WA.Storage.sanitizeText(payload.problem, 1200),
      partName: WA.Storage.sanitizeText(payload.partName, 200),
      partType: WA.Storage.sanitizeText(payload.partType, 30),
      towDestination: WA.Storage.sanitizeText(payload.towDestination, 300),
      vehicleMoves: WA.Storage.sanitizeText(payload.vehicleMoves, 80),
      maintenanceService: WA.Storage.sanitizeText(payload.maintenanceService, 120),
      notes: WA.Storage.sanitizeText(payload.notes, 600),
      ai: payload.ai || null,
      vehicleSnapshot: saved.vehicle,
      status: current?.status || "matching",
      activeReferralId: current?.activeReferralId || "",
      lastActivityAt: WA.Storage.now(),
      administrativeClosedAt: current?.administrativeClosedAt || ""
    });
    return { request, ...saved };
  });

  const createReferral = (requestId, partnerId, matchReason = "") => WA.Storage.transaction(() => {
    const request = WA.Storage.findById("wa_requests", requestId);
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (!request || !partner) throw new Error("تعذر إنشاء الإحالة بسبب بيانات ناقصة");
    const previous = WA.Storage.get("wa_referrals").filter((row) => row.requestId === requestId).sort((a, b) => a.order - b.order);
    if (previous.length >= WA.Config.maxReferralsPerRequest) throw new Error("وصل الطلب إلى الحد الأقصى: ثلاثة شركاء");
    if (previous.some((row) => row.partnerId === partnerId)) throw new Error("لا يمكن ترشيح الشريك نفسه مرتين للطلب");
    const referral = WA.Storage.upsert("wa_referrals", {
      id: WA.Storage.createId("REF"),
      requestId,
      partnerId,
      serviceType: request.serviceType,
      order: previous.length + 1,
      status: "registered",
      matchReason: WA.Storage.sanitizeText(matchReason, 800),
      registeredAt: WA.Storage.now(),
      shownAt: "",
      whatsappOpenedAt: "",
      customerArrivalConfirmedAt: "",
      partnerArrivalConfirmedAt: "",
      serviceReceivedAt: "",
      serviceConfirmationSource: "",
      costBand: "",
      costBandLabel: "",
      costSource: "",
      costPreviousBand: "",
      costChangeReason: "",
      costDisputeStatus: "",
      feeId: "",
      objectionStatus: ""
    });
    touchRequest(request, { activeReferralId: referral.id, status: "referred" });
    return referral;
  });

  const markReferralShown = (referralId) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const updated = WA.Storage.upsert("wa_referrals", { ...referral, status: "shown", shownAt: referral.shownAt || WA.Storage.now() });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) touchRequest(request, { status: "awaiting_result" });
    return updated;
  };

  const markWhatsappOpened = (referralId) => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) return null;
    return WA.Storage.upsert("wa_referrals", { ...referral, status: "whatsapp_opened", whatsappOpenedAt: WA.Storage.now() });
  };

  const confirmArrival = (referralId, source = "customer") => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    return WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: "arrived",
      customerArrivalConfirmedAt: source === "customer" ? (referral.customerArrivalConfirmedAt || WA.Storage.now()) : referral.customerArrivalConfirmedAt,
      partnerArrivalConfirmedAt: source === "partner" ? (referral.partnerArrivalConfirmedAt || WA.Storage.now()) : referral.partnerArrivalConfirmedAt
    });
  };

  const registerCostBand = (referralId, costBand, source = "customer", reason = "") => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    if (!WA.Config.costBands[costBand]) throw new Error("فئة التكلفة غير صالحة");

    if (referral.costBand && referral.costBand !== costBand && referral.costSource && referral.costSource !== source) {
      WA.Storage.upsert("wa_referrals", {
        ...referral,
        status: "cost_disputed",
        costPreviousBand: referral.costBand,
        requestedCostBand: costBand,
        costChangeReason: WA.Storage.sanitizeText(reason, 500),
        costDisputeStatus: "under_review"
      });
      const fee = referral.feeId ? WA.Storage.findById("wa_fees", referral.feeId) : null;
      if (fee && fee.status !== "paid") WA.Storage.upsert("wa_fees", { ...fee, status: "disputed", heldAt: WA.Storage.now() });
      return { disputed: true, referral: WA.Storage.findById("wa_referrals", referralId) };
    }

    const updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      costBand,
      costBandLabel: bandLabel(costBand),
      costSource: source,
      costConfirmedAt: WA.Storage.now(),
      costChangeReason: WA.Storage.sanitizeText(reason, 500),
      status: referral.serviceReceivedAt ? "service_received" : "cost_pending"
    });
    const fee = updated.serviceReceivedAt ? ensureFee(updated.id) : null;
    return { disputed: false, referral: updated, fee };
  });

  const confirmServiceReceived = (referralId, source = "customer", costBand = "") => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    let updated = WA.Storage.upsert("wa_referrals", {
      ...referral,
      status: costBand || referral.costBand ? "service_received" : "cost_pending",
      serviceReceivedAt: referral.serviceReceivedAt || WA.Storage.now(),
      serviceConfirmationSource: source,
      serviceCustomerConfirmedAt: source === "customer" ? WA.Storage.now() : referral.serviceCustomerConfirmedAt,
      servicePartnerConfirmedAt: source === "partner" ? WA.Storage.now() : referral.servicePartnerConfirmedAt
    });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) touchRequest(request, { status: costBand || referral.costBand ? "service_received" : "cost_pending" });
    if (costBand) {
      registerCostBand(referralId, costBand, source);
      updated = WA.Storage.findById("wa_referrals", referralId);
    } else if (updated.costBand) ensureFee(updated.id);
    return updated;
  });

  const ensureFee = (referralId) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral?.serviceReceivedAt || !referral.costBand || referral.costDisputeStatus === "under_review") return null;
    const existing = WA.Storage.get("wa_fees").find((row) => row.referralId === referralId);
    if (existing) return existing;
    const amount = feeForBand(referral.costBand);
    if (amount === null) return null;
    const fee = WA.Storage.upsert("wa_fees", {
      id: WA.Storage.createId("FEE"),
      referralId,
      requestId: referral.requestId,
      partnerId: referral.partnerId,
      type: "brokerage_by_confirmed_cost_band",
      costBand: referral.costBand,
      costBandLabel: bandLabel(referral.costBand),
      amount,
      event: "تأكيد تلقي الخدمة وتحديد فئة التكلفة",
      status: amount === 0 ? "exempt" : "unbilled",
      eligibleAt: WA.Storage.now(),
      invoiceIds: [],
      paidAt: ""
    });
    WA.Storage.upsert("wa_referrals", { ...referral, feeId: fee.id, status: "confirmed" });
    return fee;
  });

  const updateReferralStatus = (referralId, status, source = "partner") => {
    if (!WA.Config.referralStatuses[status]) throw new Error("حالة الإحالة غير صالحة");
    const referral = WA.Storage.findById("wa_referrals", referralId);
    if (!referral) throw new Error("الإحالة غير موجودة");
    const updated = WA.Storage.upsert("wa_referrals", { ...referral, status, statusSource: source, statusUpdatedAt: WA.Storage.now() });
    const request = WA.Storage.findById("wa_requests", referral.requestId);
    if (request) touchRequest(request);
    return updated;
  };

  const requestAlternative = (requestId, reason = "") => WA.Storage.transaction(() => {
    const request = WA.Storage.findById("wa_requests", requestId);
    if (!request) throw new Error("الطلب غير موجود");
    const referrals = WA.Storage.get("wa_referrals").filter((row) => row.requestId === requestId).sort((a, b) => a.order - b.order);
    if (referrals.length >= WA.Config.maxReferralsPerRequest) throw new Error("وصل الطلب إلى الحد الأقصى: ثلاثة شركاء");
    const active = referrals.find((row) => row.id === request.activeReferralId) || referrals[referrals.length - 1];
    if (active) WA.Storage.upsert("wa_referrals", { ...active, status: "alternative_requested", alternativeReason: WA.Storage.sanitizeText(reason, 300), alternativeRequestedAt: WA.Storage.now() });
    touchRequest(request, { status: "alternative_requested", activeReferralId: "" });
    return referrals.map((row) => row.partnerId);
  });

  const createRating = (payload) => WA.Storage.transaction(() => {
    const referral = WA.Storage.findById("wa_referrals", payload.referralId);
    const request = WA.Storage.findById("wa_requests", payload.requestId);
    if (!referral || !request || referral.requestId !== request.id || !referral.serviceReceivedAt) throw new Error("لا يمكن التقييم دون إحالة وتجربة مؤكدة");
    const existing = WA.Storage.get("wa_ratings").find((row) => row.referralId === referral.id);
    if (existing) return existing;
    const rating = WA.Storage.upsert("wa_ratings", {
      id: WA.Storage.createId("RAT"),
      requestId: request.id,
      referralId: referral.id,
      partnerId: referral.partnerId,
      overall: Number(payload.overall),
      treatment: Number(payload.treatment),
      commitment: Number(payload.commitment),
      clarity: Number(payload.clarity),
      serviceQuality: Number(payload.serviceQuality),
      fairness: Number(payload.fairness),
      recommend: payload.recommend === "yes" || payload.recommend === true,
      costBand: referral.costBand,
      comment: WA.Storage.sanitizeText(payload.comment, 800),
      status: "published",
      submittedAt: WA.Storage.now()
    });
    touchRequest(request, { status: "rated" });
    return rating;
  });

  const createObjection = (payload) => WA.Storage.transaction(() => {
    const referral = payload.referralId ? WA.Storage.findById("wa_referrals", payload.referralId) : null;
    const invoice = payload.invoiceId ? WA.Storage.findById("wa_invoices", payload.invoiceId) : null;
    if (payload.invoiceId) {
      if (!invoice || invoice.partnerId !== payload.partnerId) throw new Error("بيانات الفاتورة غير متطابقة");
      if (invoice.objectionDeadline && new Date(invoice.objectionDeadline).getTime() < Date.now()) throw new Error("انتهت مهلة الاعتراض البالغة 15 يومًا");
    } else if (!referral || referral.partnerId !== payload.partnerId) throw new Error("بيانات الاعتراض غير متطابقة");

    const objection = WA.Storage.upsert("wa_objections", {
      id: WA.Storage.createId("OBJ"),
      requestId: referral?.requestId || "",
      referralId: referral?.id || "",
      invoiceId: invoice?.id || "",
      partnerId: payload.partnerId,
      ratingId: payload.ratingId || "",
      type: payload.type,
      reason: WA.Storage.sanitizeText(payload.reason, 250),
      details: WA.Storage.sanitizeText(payload.details, 1000),
      requestedCostBand: payload.requestedCostBand || "",
      status: "new",
      decision: "",
      submittedAt: WA.Storage.now(),
      closedAt: ""
    });

    if (referral) {
      WA.Storage.upsert("wa_referrals", { ...referral, status: "disputed", objectionStatus: "new" });
      const fee = WA.Storage.get("wa_fees").find((row) => row.referralId === referral.id);
      if (fee && fee.status !== "paid") WA.Storage.upsert("wa_fees", { ...fee, status: "disputed", heldAt: WA.Storage.now() });
    }
    if (payload.ratingId) {
      const rating = WA.Storage.findById("wa_ratings", payload.ratingId);
      if (rating) WA.Storage.upsert("wa_ratings", { ...rating, status: "under_review" });
    }
    if (invoice) WA.Storage.upsert("wa_invoices", { ...invoice, status: "under_review", objectionId: objection.id });
    return objection;
  });

  const outstandingFees = (partnerId) => WA.Storage.get("wa_fees").filter((fee) => fee.partnerId === partnerId && !["paid", "exempt"].includes(fee.status));

  const issueInvoice = (partnerId, reason = "monthly", at = new Date()) => WA.Storage.transaction(() => {
    const fees = outstandingFees(partnerId).filter((fee) => fee.status !== "disputed");
    if (!fees.length) return null;
    const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const cycle = `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, "0")}`;
    const issuedAt = at.toISOString();
    const objectionDeadline = new Date(at);
    objectionDeadline.setDate(objectionDeadline.getDate() + WA.Config.objectionWindowDays);
    const dueAt = new Date(at);
    dueAt.setDate(dueAt.getDate() + WA.Config.paymentDueDays);
    const paymentRequired = total >= WA.Config.paymentThreshold;

    const currentCycle = WA.Storage.get("wa_invoices").find((row) => row.partnerId === partnerId
      && row.cycle === cycle && !["paid", "cancelled", "rolled_forward"].includes(row.status));

    WA.Storage.get("wa_invoices")
      .filter((row) => row.partnerId === partnerId && row.cycle !== cycle && row.status === "carried_forward")
      .forEach((row) => WA.Storage.upsert("wa_invoices", { ...row, status: "rolled_forward", rolledForwardAt: issuedAt }));

    const invoice = WA.Storage.upsert("wa_invoices", {
      ...(currentCycle || {}),
      id: currentCycle?.id || WA.Storage.createId("INV"),
      number: currentCycle?.number || `INV-${at.getFullYear()}${String(at.getMonth() + 1).padStart(2, "0")}-${String(Date.now()).slice(-5)}`,
      partnerId,
      cycle,
      issueReason: paymentRequired ? "threshold" : reason,
      feeIds: fees.map((fee) => fee.id),
      amount: total,
      paymentRequired,
      status: paymentRequired ? "payment_required" : "carried_forward",
      issuedAt: currentCycle?.issuedAt || issuedAt,
      updatedAt: issuedAt,
      dueAt: paymentRequired ? (currentCycle?.dueAt || dueAt.toISOString()) : "",
      objectionDeadline: currentCycle?.objectionDeadline || objectionDeadline.toISOString(),
      paidAt: currentCycle?.paidAt || ""
    });

    fees.forEach((fee) => WA.Storage.upsert("wa_fees", {
      ...fee,
      invoiceIds: [...new Set([...(fee.invoiceIds || []), invoice.id])],
      status: paymentRequired ? "invoiced_due" : "statemented"
    }));
    const partner = WA.Storage.findById("wa_partners", partnerId);
    if (partner) WA.Storage.upsert("wa_partners", { ...partner, paymentStatus: paymentRequired ? "awaiting_payment" : partner.paymentStatus });
    return invoice;
  });

  const maybeIssueInvoices = (at = new Date()) => {
    WA.Storage.get("wa_partners").forEach((partner) => {
      const total = outstandingFees(partner.id).filter((fee) => fee.status !== "disputed").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
      if (total >= WA.Config.paymentThreshold) issueInvoice(partner.id, "threshold", at);
      else if (at.getDate() === WA.Config.invoiceIssueDay) issueInvoice(partner.id, "monthly", at);
    });
  };

  const registerPayment = (invoiceId, method = "bank_transfer") => WA.Storage.transaction(() => {
    const invoice = WA.Storage.findById("wa_invoices", invoiceId) || WA.Storage.findById("wa_claims", invoiceId);
    if (!invoice) throw new Error("الفاتورة غير موجودة");
    if (["under_review", "rolled_forward", "cancelled"].includes(invoice.status)) throw new Error("لا يمكن سداد هذه الفاتورة في حالتها الحالية");
    if (Number(invoice.amount || 0) <= 0) throw new Error("لا يوجد مبلغ مستحق في الفاتورة");
    const existing = WA.Storage.get("wa_payments").find((row) => row.invoiceId === invoice.id || row.claimId === invoice.id);
    if (existing) return existing;
    const payment = WA.Storage.upsert("wa_payments", {
      id: WA.Storage.createId("PAY"),
      invoiceId: invoice.id,
      partnerId: invoice.partnerId,
      amount: invoice.amount,
      method,
      status: "paid",
      receiptNumber: `RC-${Date.now().toString().slice(-8)}`,
      paidAt: WA.Storage.now(),
      isDemo: true
    });
    WA.Storage.upsert("wa_invoices", { ...invoice, status: "paid", paidAt: payment.paidAt });
    (invoice.feeIds || []).forEach((feeId) => {
      const fee = WA.Storage.findById("wa_fees", feeId);
      if (fee) WA.Storage.upsert("wa_fees", { ...fee, status: "paid", paidAt: payment.paidAt });
    });
    const partner = WA.Storage.findById("wa_partners", invoice.partnerId);
    if (partner) WA.Storage.upsert("wa_partners", { ...partner, paymentStatus: "current", partnershipStatus: partner.partnershipStatus === "suspended_financial" ? "active" : partner.partnershipStatus });
    return payment;
  });

  const sweepOverdueInvoices = (at = new Date()) => {
    WA.Storage.get("wa_invoices").forEach((invoice) => {
      if (invoice.status !== "payment_required" || !invoice.dueAt || new Date(invoice.dueAt).getTime() >= at.getTime()) return;
      WA.Storage.upsert("wa_invoices", { ...invoice, status: "overdue" });
      const partner = WA.Storage.findById("wa_partners", invoice.partnerId);
      if (partner) WA.Storage.upsert("wa_partners", {
        ...partner,
        paymentStatus: "overdue",
        partnershipStatus: "suspended_financial",
        notifications: [...(partner.notifications || []), { id: WA.Storage.createId("NOT"), text: "تم تعليق الإحالات الجديدة مؤقتًا بسبب تأخر فاتورة واجبة السداد.", createdAt: WA.Storage.now(), read: false }]
      });
    });
  };

  const sweepAdministrativeClosures = (at = new Date()) => {
    const cutoff = at.getTime() - WA.Config.administrativeCloseDays * 86400000;
    WA.Storage.get("wa_requests").forEach((request) => {
      if (["rated", "administratively_closed", "finally_closed"].includes(request.status)) return;
      const last = new Date(request.lastActivityAt || request.updatedAt || request.createdAt).getTime();
      if (Number.isFinite(last) && last < cutoff) touchRequest(request, { status: "administratively_closed", administrativeClosedAt: at.toISOString() });
    });
  };

  const saveDraft = (draft) => {
    const sessions = WA.Storage.get("wa_sessions").filter((row) => row.type !== "customer_draft");
    sessions.push({ id: "CUSTOMER-DRAFT", type: "customer_draft", draft: WA.Storage.deepClone(draft), updatedAt: WA.Storage.now(), expiresAt: new Date(Date.now() + 7 * 86400000).toISOString() });
    WA.Storage.set("wa_sessions", sessions);
  };
  const loadDraft = () => {
    const session = WA.Storage.get("wa_sessions").find((row) => row.type === "customer_draft");
    return !session || new Date(session.expiresAt).getTime() < Date.now() ? null : WA.Storage.deepClone(session.draft);
  };
  const clearDraft = () => WA.Storage.remove("wa_sessions", (row) => row.type === "customer_draft");
  const referralEventState = (referral) => ({
    arrivalConfirmed: Boolean(referral?.customerArrivalConfirmedAt || referral?.partnerArrivalConfirmedAt),
    serviceReceived: Boolean(referral?.serviceReceivedAt),
    costConfirmed: Boolean(referral?.costBand),
    feeCreated: Boolean(referral?.feeId)
  });
  const runSweep = () => { maybeIssueInvoices(); sweepOverdueInvoices(); sweepAdministrativeClosures(); };

  WA.Lifecycle = {
    findCustomer, findRequestByToken, findRequestByHumanId, saveCustomerAndVehicle, createRequest,
    createReferral, markReferralShown, markWhatsappOpened, confirmArrival, confirmServiceReceived,
    registerCostBand, ensureFee, updateReferralStatus, requestAlternative, createRating, createObjection,
    issueInvoice, maybeIssueInvoices, registerPayment, sweepOverdueInvoices, sweepAdministrativeClosures,
    saveDraft, loadDraft, clearDraft, referralEventState, feeForBand, bandLabel, outstandingFees,
    // توافق خلفي مع أسماء النسخة السابقة
    confirmIntake: (referralId, source) => confirmServiceReceived(referralId, source),
    issueClaim: (partnerId, reason) => issueInvoice(partnerId, reason === "threshold" ? "threshold" : "monthly"),
    maybeIssueClaims: () => maybeIssueInvoices()
  };
})();

```

## `assets/matching-engine.js`

```javascript
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

```

## `assets/payment.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  let invoice = null;

  const renderMissing = () => {
    $("#paymentCard").hidden = true;
    $("#paymentMissing").hidden = false;
  };

  const init = () => {
    const params = new URLSearchParams(location.search);
    const invoiceId = params.get("invoice") || params.get("claim");
    invoice = invoiceId
      ? (WA.Storage.findById("wa_invoices", invoiceId) || WA.Storage.findById("wa_claims", invoiceId))
      : null;

    if (!invoice) {
      renderMissing();
      return;
    }

    const partner = WA.Storage.findById("wa_partners", invoice.partnerId);
    const objectionDeadline = invoice.objectionDeadline || invoice.disputeDeadline;
    $("#claimSummary").innerHTML = `
      <div class="guidance-item"><span>رقم الفاتورة</span><strong>${WA.UI.escapeHtml(invoice.number || invoice.id)}</strong></div>
      <div class="guidance-item"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div>
      <div class="guidance-item"><span>دورة الفاتورة</span><strong>${WA.UI.escapeHtml(invoice.cycle || "—")}</strong></div>
      <div class="guidance-item"><span>المبلغ</span><strong>${WA.UI.formatMoney(invoice.amount)}</strong></div>
      <div class="guidance-item"><span>تاريخ الاستحقاق</span><strong>${WA.UI.formatDate(invoice.dueAt)}</strong></div>
      <div class="guidance-item"><span>نهاية مهلة الاعتراض</span><strong>${WA.UI.formatDate(objectionDeadline)}</strong></div>`;

    if (invoice.status === "paid") {
      const payment = WA.Storage.get("wa_payments").find((row) => row.invoiceId === invoice.id || row.claimId === invoice.id);
      $("#paymentForm").innerHTML = `
        <div class="success-panel">
          <strong>تم سداد هذه الفاتورة</strong>
          <p>${payment ? `<a href="receipt.html?payment=${encodeURIComponent(payment.id)}">عرض الإيصال</a>` : "سجل الدفع غير متاح."}</p>
        </div>`;
      return;
    }

    if (invoice.status === "under_review") {
      $("#paymentForm").innerHTML = `
        <div class="warning-panel">
          <strong>الفاتورة تحت المراجعة</strong>
          <p>تم تعليق السداد المتنازع عليه حتى تسجيل قرار الاعتراض.</p>
        </div>`;
      return;
    }

    $("#paymentForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!$("#confirmPayment").checked) {
        WA.UI.showToast("أكد صحة بيانات السداد", "error");
        return;
      }
      const method = new FormData(event.currentTarget).get("paymentMethod");
      try {
        const payment = WA.Lifecycle.registerPayment(invoice.id, method);
        location.replace(`receipt.html?payment=${encodeURIComponent(payment.id)}`);
      } catch (error) {
        WA.UI.showToast(error.message, "error");
      }
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
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
    if (!payment) {
      $("#receiptCard").hidden = true;
      $("#receiptMissing").hidden = false;
      return;
    }

    const invoiceId = payment.invoiceId || payment.claimId;
    const invoice = WA.Storage.findById("wa_invoices", invoiceId) || WA.Storage.findById("wa_claims", invoiceId);
    const partner = WA.Storage.findById("wa_partners", payment.partnerId);
    const methodLabel = ({ bank_transfer: "تحويل بنكي", sadad: "سداد", demo_bank_transfer: "تحويل بنكي", demo_sadad: "سداد" })[payment.method] || payment.method;
    $("#receiptContent").innerHTML = `
      <div class="receipt-row"><span>رقم الإيصال</span><strong>${WA.UI.escapeHtml(payment.receiptNumber)}</strong></div>
      <div class="receipt-row"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div>
      <div class="receipt-row"><span>رقم الفاتورة</span><strong>${WA.UI.escapeHtml(invoice?.number || invoice?.id || invoiceId || "—")}</strong></div>
      <div class="receipt-row"><span>دورة الفاتورة</span><strong>${WA.UI.escapeHtml(invoice?.cycle || "—")}</strong></div>
      <div class="receipt-row"><span>طريقة السداد</span><strong>${WA.UI.escapeHtml(methodLabel)}</strong></div>
      <div class="receipt-row"><span>تاريخ السداد</span><strong>${WA.UI.formatDate(payment.paidAt)}</strong></div>
      <div class="receipt-row receipt-total"><span>الإجمالي</span><strong>${WA.UI.formatMoney(payment.amount)}</strong></div>
      <div class="legal-note">هذا الإيصال يوثق السداد المسجل في المنصة، ويخضع اعتماده المالي للسياسات والفوترة النظامية.</div>`;
    $("#printReceipt").addEventListener("click", () => window.print());
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

```

## `assets/seed.js`

```javascript
(() => {
  "use strict";
  window.WA = window.WA || {};

  const seedVersion = 10;
  const qassimCities = ["بريدة", "عنيزة", "الرس", "البكيرية", "المذنب"];
  const makes = ["تويوتا", "نيسان", "هيونداي", "كيا", "فورد", "شيفروليه", "لكزس", "جي إم سي", "مازدا", "هوندا"];
  const schedules = WA.Automotive.weekdays.map((day) => ({
    day,
    open: !["الجمعة"].includes(day),
    allDay: false,
    period1: { from: "08:00", to: "12:00" },
    period2: { from: "16:00", to: "22:00" }
  }));

  const definitions = {
    workshop: {
      names: ["مركز الفحص المتخصص", "ورشة المسار", "مركز تشخيص المركبات"],
      specialties: ["فحص وتشخيص عام", "ميكانيكا وكهرباء محرك", "فحص فرامل", "تكييف وكهرباء سيارات", "عفشة وتعليق وتوجيه", "كهرباء سيارات", "فحص ناقل حركة"],
      services: ["فحص وتشخيص عام", "فحص المحرك", "فحص الفرامل", "فحص التكييف", "فحص الكهرباء", "فحص العفشة", "فحص ناقل الحركة"]
    },
    parts: {
      names: ["محل قطع المركبة", "مركز قطع السيارات", "مستودع القطع"],
      specialties: ["قطع غيار سيارات"],
      services: ["قطع وكالة", "قطع تجارية", "الاستفسار عن قطع الغيار"]
    },
    tow: {
      names: ["سطحة المساندة", "نقل المركبات", "سطحة الطريق"],
      specialties: ["نقل وسحب المركبات"],
      services: ["نقل سيارات سيدان", "نقل مركبات دفع رباعي", "نقل مركبات متعطلة", "طلبات عاجلة"]
    },
    maintenance: {
      names: ["مركز الخدمة السريعة", "عناية السيارة", "مركز الصيانة الدورية"],
      specialties: ["صيانة دورية وخدمات سريعة"],
      services: [...WA.Automotive.maintenanceServices]
    }
  };

  const buildPartner = (type, city, cityIndex, typeIndex, variantIndex = 0) => {
    const def = definitions[type];
    const id = variantIndex === 0 ? `DEMO-${type.toUpperCase()}-${cityIndex + 1}` : `DEMO-${type.toUpperCase()}-${cityIndex + 1}-${variantIndex + 1}`;
    const partnerMakes = type === "tow" ? ["جميع الشركات"] : [...makes.slice(typeIndex), ...makes.slice(0, typeIndex)];
    return {
      id,
      type,
      name: `${def.names[(cityIndex + typeIndex + variantIndex) % def.names.length]} — ${city}${variantIndex ? ` ${variantIndex + 1}` : ""}`,
      tradeName: `منشأة ${id}`,
      description: `شريك يقدم خدمات ${WA.Config.partnerTypes[type]} ضمن نطاق التغطية المسجل.`,
      region: "منطقة القصيم",
      city,
      address: `داخل مدينة ${city}`,
      exactLocation: `مدينة ${city}`,
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(city)}`,
      whatsapp: `0500${String(typeIndex * 100 + cityIndex * 10 + variantIndex).padStart(6, "0")}`.slice(0, 10),
      secondaryPhone: "",
      commercialRegistration: type === "tow" ? "" : `CR-${type.toUpperCase()}-${cityIndex + 1}`,
      operationCardNumber: type === "tow" ? `OP-${cityIndex + 1}${variantIndex + 1}` : "",
      operationCardExpiry: type === "tow" ? "2027-12-31" : "",
      towVehiclePlate: type === "tow" ? `ق ص م ${1000 + cityIndex * 10 + variantIndex}` : "",
      schedule: schedules,
      hours: "الأحد–الخميس والسبت: 8:00–12:00 و4:00–10:00",
      specialties: def.specialties,
      specialtiesPriority: def.specialties,
      services: def.services,
      servedMakes: partnerMakes,
      makesPriority: partnerMakes,
      fuelTypes: type === "parts" || type === "tow" ? ["غير محدد"] : ["بنزين", "ديزل", "هجين"],
      coverageCities: type === "tow" ? [city, qassimCities[(cityIndex + 1) % qassimCities.length]] : [city],
      towVehicleTypes: type === "tow" ? ["سيدان", "دفع رباعي", "بيك أب"] : [],
      partTypes: type === "parts" ? ["وكالة", "تجارية"] : [],
      availability: { status: "typical", note: "الشريك يستقبل عادةً هذا النوع من الطلبات، ويرجى التأكد من الموعد عبر واتساب." },
      ratingOverall: Number((4.1 + ((cityIndex + typeIndex + variantIndex) % 7) / 10).toFixed(1)),
      ratingCount: 12 + cityIndex * 3 + typeIndex + variantIndex * 2,
      fairnessRating: Number((4.0 + ((cityIndex + typeIndex + variantIndex + 2) % 7) / 10).toFixed(1)),
      fairnessCount: 9 + cityIndex * 2 + typeIndex + variantIndex,
      commitment: ["مرتفع", "جيد جدًا", "جيد"][cityIndex % 3],
      responseScore: 80 + ((cityIndex + typeIndex) % 15),
      trustScore: 82 + ((cityIndex * 2 + typeIndex) % 14),
      partnershipStatus: "active",
      paymentStatus: "current",
      acceptsUrgent: type === "tow",
      demoNotice: "",
      isDemo: true,
      seedVersion
    };
  };

  const buildPartners = () => {
    const types = Object.keys(definitions);
    return qassimCities.flatMap((city, cityIndex) => types.flatMap((type, typeIndex) =>
      [0, 1, 2].map((variantIndex) => buildPartner(type, city, cityIndex, typeIndex, variantIndex))));
  };

  const run = () => {
    const meta = WA.Storage.get("wa_meta");
    const builtPartners = buildPartners();
    const builtIds = new Set(builtPartners.map((partner) => partner.id));
    const existing = WA.Storage.get("wa_partners");
    // نحدّث البيانات الأولية المعروفة فقط، ولا نمس أي شريك أضافه المستخدم.
    WA.Storage.set("wa_partners", existing.filter((row) => !row.isDemo || builtIds.has(row.id)));
    builtPartners.forEach((partner) => {
      const previous = WA.Storage.findById("wa_partners", partner.id);
      if (!previous || previous.isDemo) WA.Storage.upsert("wa_partners", { ...previous, ...partner, createdAt: previous?.createdAt || WA.Storage.now() });
    });

    const discounts = WA.Storage.get("wa_discounts");
    ["DEMO-WORKSHOP-1", "DEMO-PARTS-1", "DEMO-MAINTENANCE-1"].forEach((partnerId, index) => {
      const id = `DEMO-DISCOUNT-${index + 1}`;
      if (!discounts.some((row) => row.id === id)) {
        WA.Storage.upsert("wa_discounts", {
          id,
          partnerId,
          title: "خصم عملاء وين أوديها",
          percent: [10, 7, 12][index],
          scope: "selected",
          includedServices: index === 1 ? ["قطع مختارة وفق تأكيد المحل"] : ["أجور اليد للخدمات المحددة"],
          conditions: "يسري بعد إظهار رقم الطلب، ولا يجمع مع عرض آخر إلا بموافقة الشريك.",
          exclusions: "القطع والمواد غير مشمولة إلا إذا نص العرض على ذلك.",
          startsAt: "2026-07-01",
          endsAt: "",
          continuousUntilStopped: true,
          status: "approved",
          approvedAt: WA.Storage.now(),
          history: [{ action: "created", at: WA.Storage.now(), note: "خصم مستمر حتى الإيقاف" }],
          isDemo: true
        });
      }
    });

    const sessions = WA.Storage.get("wa_sessions");
    const credentials = { id: "DEMO-CREDENTIALS", type: "demo_credentials", partnerId: "DEMO-WORKSHOP-1", partnerCode: "WA-PARTNER", pin: "1234", isDemo: true, createdAt: WA.Storage.now(), updatedAt: WA.Storage.now() };
    const cleanedSessions = sessions.filter((row, index, rows) => row.type !== "demo_credentials" || rows.findIndex((item) => item.type === "demo_credentials") === index);
    const credentialIndex = cleanedSessions.findIndex((row) => row.type === "demo_credentials");
    if (credentialIndex >= 0) cleanedSessions[credentialIndex] = { ...cleanedSessions[credentialIndex], ...credentials, createdAt: cleanedSessions[credentialIndex].createdAt || credentials.createdAt };
    else cleanedSessions.push(credentials);
    WA.Storage.set("wa_sessions", cleanedSessions);

    WA.Storage.set("wa_meta", { ...meta, seedVersion, seedAppliedAt: meta.seedAppliedAt || WA.Storage.now(), seedNotice: "تم تجهيز بيانات الشركاء للتشغيل.", updatedAt: WA.Storage.now() });
  };

  WA.Seed = { run, buildPartners };
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

/* تشغيل المسارات الجديدة ونموذج الشريك */
.error-text { min-height: 1.25em; margin: 5px 0 0; color: var(--red-700); font-size: .82rem; font-weight: 700; }
.urgent-choice { border-color: #d34a57 !important; background: linear-gradient(145deg, #fff, var(--red-100)); }
.urgent-choice .path-icon { background: var(--red-100); color: var(--red-700); }
.urgent-panel { border: 2px solid #d34a57; background: var(--red-100); color: #6e1219; border-radius: var(--radius); padding: 16px; }
.location-capture { display: grid; gap: 10px; padding: 14px; border: 1px dashed var(--teal-600); border-radius: 12px; background: var(--teal-100); }
.location-capture strong, .location-capture small { display: block; }
.location-capture small { color: var(--slate-700); }
.sticky-action-card { position: sticky; bottom: max(10px, env(safe-area-inset-bottom)); z-index: 20; padding: 12px; background: rgba(255,255,255,.94); border: 1px solid var(--slate-200); border-radius: 14px; box-shadow: 0 10px 35px rgba(7,31,58,.15); backdrop-filter: blur(10px); }
.cost-confirmation { display: grid; gap: 10px; padding: 15px; border: 1px solid var(--slate-200); border-radius: 12px; background: var(--slate-100); }
.action-align { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.vertical { flex-direction: column; align-items: stretch; }
.day-picker { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; }
.day-chip { position: relative; display: flex; align-items: center; justify-content: center; min-height: 48px; padding: 9px 12px; border: 1px solid var(--slate-300); border-radius: 11px; background: var(--white); cursor: pointer; font-weight: 800; }
.day-chip input { position: absolute; opacity: 0; pointer-events: none; }
.day-chip:has(input:checked) { border-color: var(--teal-600); background: var(--teal-100); color: var(--navy-900); box-shadow: inset 0 0 0 1px var(--teal-600); }
.day-chip:focus-within { outline: 3px solid rgba(26,148,137,.25); outline-offset: 2px; }
.priority-selector { display: grid; gap: 14px; }
.selector-list, .selected-priority-list { display: grid; gap: 8px; min-height: 120px; padding: 10px; border: 1px solid var(--slate-300); border-radius: 12px; background: var(--white); }
.selector-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border: 1px solid var(--slate-200); border-radius: 10px; background: var(--slate-100); }
.selector-item button { flex: 0 0 auto; }
.selected-priority-list { counter-reset: priority; background: #f7fbfb; }
.selected-priority-list .selector-item { counter-increment: priority; border-color: #b8ddd8; background: var(--white); }
.selected-priority-list .selector-item::before { content: counter(priority); width: 25px; height: 25px; display: grid; place-items: center; border-radius: 50%; background: var(--navy-900); color: var(--white); font-size: .75rem; font-weight: 900; }
.priority-actions { display: flex; gap: 5px; margin-inline-start: auto; }
.checkbox-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
.honesty-pledge { padding: 15px; border: 2px solid var(--navy-900); border-radius: 12px; background: #f8fbff; line-height: 1.9; }
.fee-policy-box { display: grid; gap: 7px; padding: 15px; border-radius: 12px; background: var(--navy-900); color: var(--white); }
.fee-policy-box strong { font-size: 1.02rem; }
.fee-policy-box small { color: #c4d1e0; }

@media (min-width: 680px) {
  .day-picker { grid-template-columns: repeat(4, minmax(0,1fr)); }
  .priority-selector { grid-template-columns: 1fr 1fr; }
  .checkbox-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
}

@media (max-width: 679px) {
  .sticky-action-card .btn, .sticky-action-card a.btn { width: 100%; }
  .selector-item { align-items: flex-start; }
  .priority-actions { margin-inline-start: 0; }
}

/* تحسينات التنقل والترتيب البصري والنماذج المخصصة */
body { animation: page-enter .22s ease both; }
@keyframes page-enter { from { opacity: .01; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.utility-strip { border-bottom: 1px solid var(--slate-200); background: #f8fafc; }
.utility-actions { min-height: 38px; display: flex; align-items: center; justify-content: flex-start; gap: 8px; }
.utility-btn { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 5px 10px; border: 0; border-radius: 9px; background: transparent; color: var(--navy-800); font-weight: 800; font-size: .82rem; }
.utility-btn:hover { background: var(--teal-100); color: var(--teal-600); }
.page-guidance { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: start; margin-bottom: 26px; padding: 15px 17px; border: 1px solid rgba(255,255,255,.14); border-radius: var(--radius); background: rgba(255,255,255,.06); }
.page-guidance strong { color: #d9fff9; }
.page-guidance p { margin: 0; color: #c3d0df; }
.light-kicker { color: #8de1d6; }
.section-head.compact { margin-bottom: 14px; }
.section-head.compact h3 { margin: 0 0 4px; }
.activity-block { padding: 18px; border: 1px solid var(--slate-200); border-radius: var(--radius); background: #fbfcfe; }
.contact-card { display: grid; gap: 16px; padding: 20px; border-radius: var(--radius-lg); background: linear-gradient(145deg, var(--navy-900), var(--navy-800)); color: var(--white); box-shadow: var(--shadow); }
.contact-card h2 { margin: 2px 0 5px; }
.contact-card p { margin: 0; color: #c8d6e5; }
.contact-card .kicker { color: #83e0d4; }
.contact-actions .btn-light { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.1); color: var(--white); }
.private-link-card { display: grid; gap: 16px; padding: 18px; border: 1px solid var(--slate-200); border-radius: var(--radius); background: var(--white); box-shadow: var(--shadow-sm); }
.private-link-card h2 { margin: 7px 0 2px; font-size: 1.1rem; }
.private-link-card p { margin: 0; color: var(--slate-600); }
.compact-link-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto; gap: 8px; align-items: center; }
.compact-link-row input { min-width: 0; height: 44px; border: 1px solid var(--slate-300); border-radius: 10px; padding: 8px 11px; direction: ltr; text-align: left; background: var(--slate-100); }
.icon-action { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; padding: 8px 12px; border: 1px solid var(--slate-300); border-radius: 10px; background: var(--white); color: var(--navy-900); font-weight: 800; }
.alternative-action { border-color: #e0a038; background: var(--amber-100); color: #7b4200; }
.daily-schedule-list { display: grid; gap: 12px; }
.day-schedule { padding: 16px; border: 1px solid var(--slate-200); border-radius: var(--radius); background: var(--white); }
.day-schedule-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
.switch-line { display: inline-flex; align-items: center; gap: 9px; font-weight: 900; }
.switch-line input { width: 21px; height: 21px; accent-color: var(--teal-600); }
.day-periods { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--slate-200); }
.period-row { display: grid; grid-template-columns: 1fr; gap: 8px; align-items: end; }
.period-row label { display: grid; gap: 5px; color: var(--slate-600); font-size: .84rem; }
.period-row select { width: 100%; }
.second-period-toggle { margin: 12px 0; }
.schedule-summary { padding: 14px; border: 1px solid var(--slate-200); border-radius: 12px; background: var(--slate-100); }
.schedule-summary h3 { margin-top: 0; }
.schedule-summary-row { display: flex; justify-content: space-between; gap: 14px; padding: 8px 0; border-bottom: 1px dashed var(--slate-300); }
.schedule-summary-row:last-child { border-bottom: 0; }

@media (min-width: 680px) {
  .contact-card { grid-template-columns: 1fr auto; align-items: center; }
  .private-link-card { grid-template-columns: minmax(180px,.5fr) minmax(0,1.5fr); align-items: center; }
  .period-row { grid-template-columns: 130px repeat(2,minmax(0,1fr)); }
}
@media (max-width: 679px) {
  .section { padding: 38px 0; }
  .flow-shell { padding-top: 16px; }
  .flow-screen, .card, .partner-card { padding: 16px; }
  .compact-link-row { grid-template-columns: 1fr auto; }
  .compact-link-row input { grid-column: 1 / -1; }
  .alternative-action { grid-column: 1 / -1; }
  .contact-actions .btn { width: 100%; }
  .utility-actions { justify-content: space-between; }
}

/* الهوية النهائية وتجربة النشر */
:root {
  --navy-950: #061321;
  --navy-900: #0a2038;
  --navy-800: #123b5c;
  --teal-600: #087d73;
  --teal-500: #0d9789;
  --teal-100: #e2f7f4;
  --page: #f5f7fa;
  --surface: #ffffff;
  --radius-sm: 11px;
  --radius: 17px;
  --radius-lg: 26px;
  --shadow-sm: 0 8px 24px rgba(6, 27, 48, .065);
  --shadow: 0 22px 60px rgba(6, 27, 48, .12);
  --container: 1160px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Tahoma, Arial, sans-serif;
}

body {
  min-width: 320px;
  background:
    linear-gradient(180deg, rgba(228, 238, 246, .45), transparent 320px),
    var(--page);
  font-size: 16px;
  line-height: 1.72;
}

h1, h2, h3 { color: var(--navy-950); letter-spacing: -.018em; }
p { text-wrap: pretty; }
.container { width: min(calc(100% - 28px), var(--container)); }
.section { padding: clamp(42px, 7vw, 78px) 0; }
.section-head { margin-bottom: clamp(22px, 4vw, 34px); }
.section-head h1, .section-head h2 { font-weight: 900; }
.section-head h2 { font-size: clamp(1.65rem, 4vw, 2.45rem); }
.kicker, .eyebrow { font-size: .82rem; letter-spacing: .025em; }

.ui-icon {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 1.15em;
  height: 1.15em;
  line-height: 1;
}
.ui-icon svg, [data-service-icon] svg, .card-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.site-header { box-shadow: 0 7px 24px rgba(7, 29, 51, .055); }
.utility-strip { background: #f7fafc; }
.utility-actions { min-height: 36px; }
.utility-btn {
  min-height: 34px;
  border-radius: 999px;
  padding-inline: 11px;
  color: var(--slate-700);
}
.utility-btn .ui-icon { color: var(--teal-600); }
.nav-shell { min-height: 68px; }
.brand-mark { width: 44px; height: 44px; border-radius: 14px; }
.brand strong { font-size: 1.02rem; }
.brand small { font-size: .72rem; }
.nav-toggle { min-height: 42px; display: inline-flex; align-items: center; gap: 7px; }
.main-nav a { min-height: 44px; display: flex; align-items: center; }

.hero {
  padding: clamp(52px, 8vw, 92px) 0 clamp(48px, 7vw, 78px);
  background:
    radial-gradient(circle at 8% 14%, rgba(13,151,137,.18), transparent 30%),
    radial-gradient(circle at 92% 78%, rgba(23,105,170,.14), transparent 32%),
    linear-gradient(155deg, #fbfdfd 0%, #edf4f8 100%);
}
.hero-grid { gap: clamp(30px, 6vw, 68px); }
.hero-copy { position: relative; z-index: 1; }
.hero h1 { max-width: 820px; margin: 12px 0 18px; font-size: clamp(2.25rem, 8vw, 4.65rem); line-height: 1.13; }
.hero h1 span { display: inline-block; margin-top: 4px; }
.hero p { max-width: 680px; font-size: clamp(1rem, 2vw, 1.14rem); line-height: 1.9; }
.hero-actions .btn { min-width: 150px; }
.hero-assurances span { display: inline-flex; align-items: center; gap: 6px; padding: 7px 11px; }
.hero-assurances .ui-icon { color: var(--teal-600); }
.hero-panel { padding: clamp(18px, 4vw, 28px); border-color: rgba(255,255,255,.95); }
.main-path-card { padding: 22px; }
.other-services { gap: 10px; }
.service-card { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 13px; padding: 15px; }
.service-card h3 { margin-top: 0; }
.service-card .path-icon { width: 44px; height: 44px; }
.urgent-service { border-color: rgba(161,36,45,.22); }
.urgent-service .path-icon { color: var(--red-700); background: var(--red-100); }

.btn {
  min-height: 48px;
  border-radius: 13px;
  padding: 11px 18px;
  font-size: .94rem;
  box-shadow: none;
}
.btn-primary { box-shadow: 0 11px 25px rgba(8,125,115,.20); }
.btn-light { background: rgba(255,255,255,.94); }
.btn:active { transform: translateY(0) scale(.985); }
.btn .ui-icon { font-size: 1.08rem; }
.icon-action { min-height: 46px; }

.card, .partner-card, .flow-screen, .private-link-card, .day-schedule, .activity-block {
  border-color: #dfe6ed;
  box-shadow: var(--shadow-sm);
}
.card, .partner-card { padding: clamp(17px, 3vw, 23px); }
.card:hover { border-color: #c8d8e2; }
.path-icon, .card-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 15px;
  background: var(--teal-100);
  color: var(--teal-600);
}
.path-icon svg, .card-icon svg { width: 25px; height: 25px; }

.journey-grid { display: grid; gap: 14px; }
.journey-card {
  position: relative;
  padding: 22px;
  border: 1px solid var(--slate-200);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow-sm);
}
.journey-card h3 { margin: 16px 0 7px; }
.journey-card p { margin: 0; color: var(--slate-600); }
.step-number { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--navy-900); color: var(--white); font-weight: 900; }
.value-section { background: linear-gradient(150deg, #f5fbfa, #f5f7fa); }
.value-grid { display: grid; gap: 30px; align-items: center; }
.benefit-list { display: grid; gap: 12px; }
.benefit-item { display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: start; padding: 18px; background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.benefit-item > .ui-icon { width: 42px; height: 42px; padding: 10px; border-radius: 13px; color: var(--teal-600); background: var(--teal-100); }
.benefit-item h3 { margin: 0 0 5px; }
.benefit-item p { margin: 0; color: var(--slate-600); }
.partner-cta-section { padding-block: 42px; }
.partner-cta { display: grid; gap: 22px; align-items: center; padding: clamp(24px, 5vw, 42px); border-radius: var(--radius-lg); color: var(--white); background: linear-gradient(135deg, var(--navy-950), var(--navy-800)); box-shadow: var(--shadow); }
.partner-cta h2 { margin: 6px 0 9px; color: var(--white); }
.partner-cta p { margin: 0; color: #cad7e4; }
.partner-cta .btn-light { border-color: rgba(255,255,255,.35); background: rgba(255,255,255,.10); color: var(--white); }
.trust-cards .card-icon { margin-bottom: 13px; }
.mobile-action-bar { display: none; }

.flow-shell { padding-top: 22px; }
.flow-sidebar { background: linear-gradient(160deg, var(--navy-950), var(--navy-800)); }
.flow-screen { padding: clamp(18px, 4vw, 30px); }
.flow-screen h2 { font-size: clamp(1.35rem, 4vw, 1.9rem); }
.progress-track { height: 9px; }
.service-choice { min-height: 92px; transition: border-color .18s ease, transform .18s ease, background .18s ease; }
.service-choice:hover { border-color: var(--teal-500); transform: translateY(-1px); }
.form-field input, .form-field select, .form-field textarea { min-height: 50px; border-radius: 12px; background: #fff; }
.form-field textarea { min-height: 126px; }
.field-hint { line-height: 1.6; }
.screen-actions { position: relative; margin-top: 26px; }
.loading-shell { min-height: 350px; }
.loader-step { border: 1px solid var(--slate-200); }
.success-panel, .warning-panel, .danger-panel, .legal-note { border-radius: 14px; }
.contact-card { padding: clamp(20px, 4vw, 28px); }
.private-link-card { background: #fbfcfe; }
.compact-link-row input { background: var(--white); }

.partner-head { gap: 18px; }
.partner-head h2 { margin-bottom: 5px; }
.partner-metrics > div, .guidance-item { border-radius: 13px; }
.discount-box { border-radius: 14px; }
.info-panel { border-radius: 13px; }
.rating-block { min-width: 150px; }

.tabs { scrollbar-width: thin; border-radius: 14px; padding: 6px; background: #eaf0f5; }
.tab-btn { min-height: 42px; border-radius: 10px; white-space: nowrap; }
.tab-btn.active { background: var(--white); color: var(--teal-600); box-shadow: 0 4px 14px rgba(7,29,51,.08); }
.table-wrap { border-radius: 14px; }
.dialog-shell { border-radius: 20px; }
.empty-state { border-radius: var(--radius-lg); }
.empty-state .path-icon { margin-inline: auto; }

.site-footer { margin-top: 24px; }
.page-guidance { grid-template-columns: auto 1fr; background: rgba(255,255,255,.075); }
.guidance-icon { display: grid; place-items: center; width: 38px; height: 38px; padding: 9px; border-radius: 12px; background: rgba(13,151,137,.18); color: #8fe2d8; }
.footer-grid { gap: 28px; }
.footer-grid > div { align-content: start; }
.footer-grid a { width: fit-content; }
.footer-bottom { gap: 10px; }

.noscript-banner { padding: 12px 16px; text-align: center; background: var(--amber-100); color: #734100; font-weight: 800; }
.toast { border-radius: 13px; box-shadow: var(--shadow); }

@media (min-width: 680px) {
  .journey-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .value-grid { grid-template-columns: .9fr 1.1fr; gap: 54px; }
  .partner-cta { grid-template-columns: 1fr auto; }
}

@media (min-width: 900px) {
  .journey-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .main-nav { gap: 2px; }
  .main-nav a { padding-inline: 13px; }
}

@media (max-width: 679px) {
  body { padding-bottom: 0; }
  .container { width: min(calc(100% - 22px), var(--container)); }
  .utility-actions { justify-content: flex-start; }
  .utility-btn { flex: 0 0 auto; }
  .nav-shell { min-height: 62px; }
  .brand-mark { width: 40px; height: 40px; }
  .brand small { display: none; }
  .nav-toggle span:not(.ui-icon) { display: none; }
  .nav-toggle { width: 42px; padding: 8px; justify-content: center; }
  .main-nav { inset-inline: 11px; top: 64px; }
  .hero { padding-top: 44px; }
  .hero h1 { font-size: clamp(2.1rem, 11vw, 3.2rem); }
  .hero-actions { display: grid; grid-template-columns: 1fr; }
  .hero-actions .btn { width: 100%; }
  .hero-assurances { gap: 6px; }
  .hero-assurances span { font-size: .76rem; }
  .service-card { padding: 14px; }
  .partner-cta .button-row { display: grid; }
  .partner-cta .btn { width: 100%; }
  .flow-layout { gap: 14px; }
  .flow-sidebar { border-radius: 18px; padding: 17px; }
  .flow-sidebar .legal-note { display: none; }
  .flow-screen { border-radius: 18px; }
  .screen-actions {
    position: sticky;
    bottom: max(0px, env(safe-area-inset-bottom));
    z-index: 12;
    margin-inline: -16px;
    margin-bottom: -16px;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    background: rgba(255,255,255,.96);
    box-shadow: 0 -10px 24px rgba(7,29,51,.08);
    backdrop-filter: blur(10px);
  }
  .screen-actions .btn { flex: 1 1 130px; }
  .partner-head { display: grid; }
  .rating-block { width: 100%; }
  .partner-metrics { grid-template-columns: 1fr; }
  .contact-card { border-radius: 18px; }
  .private-link-card { border-radius: 16px; }
  .tabs { margin-inline: -2px; overflow-x: auto; flex-wrap: nowrap; }
  .tab-btn { flex: 0 0 auto; }
  .footer-grid { gap: 24px; }
  .footer-bottom { align-items: flex-start; }
  body[data-page="home"] { padding-bottom: calc(76px + env(safe-area-inset-bottom)); }
  .mobile-action-bar {
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 90;
    display: block;
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
    border-top: 1px solid var(--slate-200);
    background: rgba(255,255,255,.96);
    box-shadow: 0 -12px 30px rgba(7,29,51,.12);
    backdrop-filter: blur(12px);
  }
  .mobile-action-bar .btn { min-height: 52px; }
}

@media (prefers-reduced-motion: no-preference) {
  .flow-screen.active, .tab-panel.active { animation: content-in .22s ease both; }
  @keyframes content-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
}
.service-choice { display: grid; grid-template-columns: auto minmax(0,1fr); gap: 13px; align-items: center; }
.service-choice-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 14px; color: var(--teal-600); background: var(--teal-100); }
.service-choice-icon svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.service-choice-copy { min-width: 0; }
.urgent-choice .service-choice-icon { color: var(--red-700); background: var(--red-100); }
.auth-section { min-height: 68vh; display: grid; align-items: center; }
.auth-layout { display: grid; gap: 18px; align-items: stretch; }
.auth-card { align-self: stretch; }
.auth-aside { padding: clamp(22px, 5vw, 36px); border-radius: var(--radius-lg); color: var(--white); background: linear-gradient(145deg, var(--navy-950), var(--navy-800)); box-shadow: var(--shadow); }
.auth-aside h2 { color: var(--white); margin: 16px 0 10px; }
.auth-aside .card-icon { color: #91e4da; background: rgba(255,255,255,.1); }
.auth-aside .legal-note { color: #d2deea; background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.12); }
.feature-checklist { display: grid; gap: 10px; margin: 16px 0 22px; padding: 0; list-style: none; }
.feature-checklist li { position: relative; padding-inline-start: 26px; color: #dbe6ef; }
.feature-checklist li::before { content: "✓"; position: absolute; inset-inline-start: 0; top: 0; color: #75d8cc; font-weight: 900; }
.legal-document { max-width: 900px; padding: clamp(22px, 5vw, 44px); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); background: var(--white); box-shadow: var(--shadow-sm); }
.legal-document section { padding: 22px 0; border-top: 1px solid var(--slate-200); }
.legal-document section:first-of-type { border-top: 0; }
.legal-document h2 { margin: 0 0 8px; font-size: 1.25rem; }
.legal-document p { margin: 0; color: var(--slate-700); }
.payment-layout { max-width: 820px; }
.payment-method { min-height: 50px; padding: 12px 14px; border: 1px solid var(--slate-200); border-radius: 12px; background: var(--slate-100); }
@media (min-width: 760px) { .auth-layout { grid-template-columns: minmax(0,1fr) minmax(300px,.78fr); } }
@media (max-width: 679px) {
  .screen-actions {
    position: static;
    margin-inline: 0;
    margin-bottom: 0;
    padding: 18px 0 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }
}

```

## `assets/track.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  let currentRequest = null;

  const setView = (view) => {
    $("#lookupSection").hidden = view !== "lookup";
    $("#requestSection").hidden = view !== "request";
    $("#notFoundSection").hidden = view !== "notFound";
  };

  const alternativeLabel = (type) => ({ problem:"أريد ورشة أخرى", parts:"أريد محل قطع غيار آخر", tow:"أريد سطحة أخرى", maintenance:"أريد مركز صيانة آخر" }[type] || "أريد شريكًا آخر");

  const renderSummary = ({request,vehicle,customer}) => {
    const rows = [["العميل",customer.firstName],["السيارة",WA.UI.vehicleText(vehicle)],["الخدمة",WA.Config.serviceTypes[request.serviceType]],["المنطقة",request.region],["المدينة",request.city]];
    if(request.serviceType==="problem")rows.push(["المشكلة",request.problem],["التخصص",request.ai?.specialty||"—"],["الاستعجال",request.ai?.urgency||"—"]);
    if(request.serviceType==="parts")rows.push(["رقم الهيكل",vehicle.vin||"لم يدخل"],["القطعة",request.partName],["النوع",request.partType]);
    if(request.serviceType==="tow")rows.push(["الموقع",request.preciseLocation],["وصف المكان",request.placeDescription],["الوجهة",request.towDestination||"غير محددة"]);
    if(request.serviceType==="maintenance")rows.push(["الصيانة",request.maintenanceService],["نوع الوقود",vehicle.fuelType||"غير محدد"]);
    $("#requestSummary").innerHTML=rows.map(([label,value])=>`<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value)}</strong></div>`).join("");
  };

  const renderTimeline = (referrals) => {
    $("#referralTimeline").innerHTML=referrals.length?referrals.map((referral)=>{const partner=WA.Storage.findById("wa_partners",referral.partnerId);return `<article class="timeline-item"><span>${referral.order}</span><div><strong>${WA.UI.escapeHtml(partner?.name||"شريك غير موجود")}</strong><p>${WA.UI.escapeHtml(WA.UI.statusLabel(referral.status,"referral"))}</p><small>${WA.UI.formatDate(referral.registeredAt||referral.createdAt)}</small>${referral.costBand?`<small>التكلفة: ${WA.UI.escapeHtml(WA.Lifecycle.bandLabel(referral.costBand))}</small>`:""}</div></article>`;}).join(""):'<div class="empty-state"><p>لا توجد إحالات.</p></div>';
  };

  const costOptions = (selected="") => `<option value="">اختر فئة التكلفة</option>${Object.entries(WA.Config.costBands).map(([key,item])=>`<option value="${WA.UI.escapeHtml(key)}" ${selected===key?"selected":""}>${WA.UI.escapeHtml(item.label)}</option>`).join("")}`;

  const renderActions = (bundle) => {
    const {request,customer,vehicle,activeReferral,partner,referrals}=bundle;
    if(!activeReferral||!partner){$("#requestActions").innerHTML='<div class="empty-state"><h3>لا يوجد شريك حالي</h3><p>لا توجد إحالة نشطة حاليًا. حاول تحديث الطلب أو طلب بديل عند توفره.</p></div>';return;}
    const event=WA.Lifecycle.referralEventState(activeReferral);
    const message=WA.UI.buildWhatsappMessage({request,customer,vehicle,partner});
    const whatsapp=WA.UI.whatsappUrl(partner.whatsapp,message);
    const limitReached=referrals.length>=WA.Config.maxReferralsPerRequest;
    const costBlock=event.serviceReceived?`<section class="cost-confirmation"><h3>كم كانت تكلفة خدمتك؟</h3><p>اختر الفئة التي تمثل المبلغ الفعلي للخدمة. لا تُعرض هذه المعلومة كتقدير للعملاء.</p><div class="form-grid two"><div class="form-field"><label for="trackCostBand">فئة التكلفة</label><select id="trackCostBand" ${activeReferral.costDisputeStatus==="under_review"?"disabled":""}>${costOptions(activeReferral.costBand)}</select></div><div class="form-field action-align"><button id="saveCostBand" class="btn btn-dark" type="button" ${activeReferral.costBand||activeReferral.costDisputeStatus==="under_review"?"disabled":""}>${activeReferral.costBand?"تم حفظ الفئة":"حفظ الفئة"}</button></div></div>${activeReferral.costDisputeStatus==="under_review"?'<div class="warning-panel">يوجد اختلاف على فئة التكلفة وتحولت العملية للمراجعة.</div>':""}</section>`:"";
    $("#requestActions").innerHTML=`<h2>تواصل وتابع طلبك</h2><p class="muted">افتح واتساب برسالة جاهزة، ثم حدّث حالة الخدمة عند حدوثها.</p><div class="button-row"><a id="trackWhatsapp" class="btn btn-primary" href="${WA.UI.escapeHtml(whatsapp)}" target="_blank" rel="noopener">التواصل عبر واتساب</a><button id="copyTrackWhatsapp" class="btn btn-light" type="button">نسخ الرسالة</button></div><div class="cards-grid mt-16"><div class="card"><h3>هل تواصلت؟</h3><p>يمكنك تحديث الحالة لاحقًا من هذه الصفحة.</p><button id="markNoContact" class="btn btn-light btn-sm" type="button">لم أتواصل بعد</button></div><div class="card"><h3>هل تلقيت الخدمة؟</h3><p>${event.serviceReceived?"تم تأكيد تلقي الخدمة.":"أكد بعد أن يقدم الشريك خدمة فعلية لسيارتك."}</p><button id="confirmService" class="btn btn-dark btn-sm" type="button" ${event.serviceReceived?"disabled":""}>${event.serviceReceived?"تم التأكيد":"نعم، تلقيت الخدمة"}</button><button id="arrivedNoService" class="btn btn-light btn-sm mt-8" type="button" ${event.serviceReceived?"disabled":""}>وصلت ولم أتلق خدمة</button></div></div>${costBlock}`;
    $("#trackWhatsapp")?.addEventListener("click",()=>WA.Lifecycle.markWhatsappOpened(activeReferral.id));
    $("#copyTrackWhatsapp")?.addEventListener("click",()=>WA.UI.copyText(message));
    $("#markNoContact")?.addEventListener("click",()=>{WA.Lifecycle.updateReferralStatus(activeReferral.id,"no_contact","customer");WA.UI.showToast("تم حفظ الحالة","success");renderRequest(request);});
    $("#confirmService")?.addEventListener("click",()=>{try{WA.Lifecycle.confirmServiceReceived(activeReferral.id,"customer");WA.UI.showToast("تم تأكيد تلقي الخدمة. حدد فئة التكلفة.","success");renderRequest(request);}catch(error){WA.UI.showToast(error.message,"error");}});
    $("#arrivedNoService")?.addEventListener("click",()=>{WA.Lifecycle.updateReferralStatus(activeReferral.id,"arrived_no_service","customer");WA.UI.showToast("تم حفظ: وصلت ولم تتلق خدمة","success");renderRequest(request);});
    $("#saveCostBand")?.addEventListener("click",()=>{const band=$("#trackCostBand").value;if(!band){WA.UI.showToast("اختر فئة التكلفة","error");return;}try{WA.Lifecycle.registerCostBand(activeReferral.id,band,"customer");WA.UI.showToast("تم حفظ فئة التكلفة واحتساب الرسم تلقائيًا","success");renderRequest(request);}catch(error){WA.UI.showToast(error.message,"error");}});
  };


  const renderPrivateLink = ({ request, referrals }) => {
    const path=`track.html?token=${encodeURIComponent(request.publicToken)}`;
    const absolute=new URL(path,location.href).href;
    const limitReached=referrals.length>=WA.Config.maxReferralsPerRequest;
    $("#requestLinkPanel").innerHTML=`<div><span class="pill">احتفظ بالرابط</span><h2>رابط طلبك الخاص</h2><p>احتفظ به للمتابعة دون كلمة مرور.</p></div><div class="compact-link-row"><input id="trackPrivateLink" aria-label="رابط الطلب الخاص" readonly value="${WA.UI.escapeHtml(absolute)}"><button id="copyTrackPrivateLink" class="icon-action" type="button">نسخ</button><button id="requestAlternative" class="icon-action alternative-action" type="button" ${limitReached?"disabled":""}><span>${WA.UI.escapeHtml(limitReached?"اكتمل حد البدائل":alternativeLabel(request.serviceType))}</span></button></div>`;
    $("#copyTrackPrivateLink")?.addEventListener("click",()=>WA.UI.copyText(absolute));
    $("#requestAlternative")?.addEventListener("click",()=>$("#alternativeDialog").showModal());
  };

  const renderRating = ({request,activeReferral}) => {
    const existing=activeReferral?WA.Storage.get("wa_ratings").find((row)=>row.referralId===activeReferral.id):null;
    if(existing){$("#ratingPanel").innerHTML=`<div class="success-panel"><strong>شكرًا، وصلنا تقييمك</strong><p>التقييم العام: ${WA.UI.escapeHtml(existing.overall)} من 5.</p></div>`;return;}
    if(!activeReferral?.serviceReceivedAt||!activeReferral.costBand){$("#ratingPanel").innerHTML='<h2>التقييم</h2><p class="muted">يتاح بعد تأكيد تلقي الخدمة وتحديد فئة التكلفة.</p>';return;}
    $("#ratingPanel").innerHTML='<h2>قيّم تجربتك</h2><p class="muted">سيظهر تقييمك ضمن التقييمات المرتبطة بالخدمة.</p><button id="openRating" class="btn btn-primary" type="button">فتح نموذج التقييم</button>';
    $("#openRating")?.addEventListener("click",()=>{$("#ratingCostBand").innerHTML=costOptions(activeReferral.costBand);$("#ratingCostBand").value=activeReferral.costBand;$("#ratingCostBand").disabled=true;$("#ratingDialog").showModal();});
  };

  const renderRequest = (request) => {
    currentRequest=WA.Storage.findById("wa_requests",request.id)||request;
    const bundle=WA.UI.getRequestBundle(currentRequest);
    if(!bundle?.customer||!bundle.vehicle){setView("notFound");return;}
    const {customer,activeReferral,partner,discount,referrals}=bundle;
    $("#requestHeader").innerHTML=`<div class="kicker">أهلًا ${WA.UI.escapeHtml(customer.firstName)}</div><h1>${WA.UI.escapeHtml(currentRequest.humanId)}</h1><p>${WA.UI.escapeHtml(WA.Config.serviceTypes[currentRequest.serviceType])} — آخر تحديث ${WA.UI.formatDate(currentRequest.updatedAt)}</p><div class="request-meta"><span>${WA.UI.escapeHtml(WA.UI.statusLabel(currentRequest.status))}</span><span>${referrals.length} من 3 إحالات</span><span>متابعة آمنة عبر الرابط الخاص</span></div>`;
    const closed=["administratively_closed","finally_closed"].includes(currentRequest.status);$("#closedNotice").hidden=!closed;if(closed)$("#closedNotice").textContent="تم إغلاق الطلب بعد انتهاء مدة المتابعة، وتبقى بياناته محفوظة للرجوع إليها.";
    $("#activePartner").innerHTML=partner&&activeReferral?WA.UI.renderPartnerCard({partner,referral:activeReferral,discount,matchReason:activeReferral.matchReason}):'<div class="empty-state"><h2>لا يوجد شريك حالي</h2><p>لا توجد إحالة نشطة.</p></div>';
    renderActions(bundle);renderRating(bundle);renderSummary(bundle);renderTimeline(referrals);renderPrivateLink(bundle);setView("request");
    if(location.hash==="#alternative"&&referrals.length<WA.Config.maxReferralsPerRequest){setTimeout(()=>$("#alternativeDialog").showModal(),120);history.replaceState({},"",`track.html?token=${encodeURIComponent(currentRequest.publicToken)}`);}
  };

  const handleAlternative = (event) => {event.preventDefault();if(!currentRequest)return;try{const excluded=WA.Lifecycle.requestAlternative(currentRequest.id,$("#alternativeReason").value);const request=WA.Storage.findById("wa_requests",currentRequest.id);const result=WA.Matching.match({request,excludedPartnerIds:excluded});if(!result.partner){WA.Storage.upsert("wa_requests",{...request,status:"no_match",lastActivityAt:WA.Storage.now()});$("#alternativeDialog").close();WA.UI.showToast("لا يوجد شريك بديل مطابق حاليًا","error");renderRequest(request);return;}const referral=WA.Lifecycle.createReferral(request.id,result.partner.id,result.reason);WA.Lifecycle.markReferralShown(referral.id);$("#alternativeDialog").close();WA.UI.showToast("تم تسجيل إحالة بديلة داخل الطلب نفسه","success");renderRequest(request);}catch(error){WA.UI.showToast(error.message,"error");}};
  const handleRating = (event) => {event.preventDefault();if(!currentRequest)return;const bundle=WA.UI.getRequestBundle(currentRequest);const form=$("#ratingForm");if(!form.checkValidity()){form.reportValidity();return;}try{WA.Lifecycle.createRating({requestId:currentRequest.id,referralId:bundle.activeReferral.id,overall:$("#ratingOverall").value,treatment:$("#ratingTreatment").value,commitment:$("#ratingCommitment").value,clarity:$("#ratingClarity").value,serviceQuality:$("#ratingService").value,fairness:$("#ratingFairness").value,recommend:form.elements.recommend.value,comment:$("#ratingComment").value});$("#ratingDialog").close();WA.UI.showToast("تم تسجيل التقييم الموثق","success");renderRequest(currentRequest);}catch(error){WA.UI.showToast(error.message,"error");}};

  const init = () => {
    const token=new URLSearchParams(location.search).get("token");if(token){const request=WA.Lifecycle.findRequestByToken(token);request?renderRequest(request):setView("notFound");}else setView("lookup");
    $("#lookupForm").addEventListener("submit",(event)=>{event.preventDefault();const human=WA.Storage.sanitizeText($("#requestNumber").value,30).toUpperCase();const phone=WA.Storage.sanitizePhone($("#lookupPhone").value);const request=WA.Lifecycle.findRequestByHumanId(human);const customer=request?WA.Storage.findById("wa_customers",request.customerId):null;if(!request||!customer||customer.phone!==phone){setView("notFound");return;}history.replaceState({},"",`track.html?token=${encodeURIComponent(request.publicToken)}`);renderRequest(request);});
    $("#alternativeForm").addEventListener("submit",handleAlternative);$("#ratingForm").addEventListener("submit",handleRating);
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
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
  <noscript><div class="noscript-banner">فعّل JavaScript في المتصفح لإكمال طلبك وحفظ تقدمك.</div></noscript>
  <div data-site-header></div>
  <main id="main-content" class="flow-shell">
    <div class="container flow-layout">
      <aside class="flow-sidebar" aria-label="تقدم الطلب">
        <div class="kicker">خطوات واضحة من البداية</div>
        <h1>طلب جديد</h1>
        <p id="flowServiceLabel">اختر ما تحتاجه، وسنحفظ تقدمك تلقائيًا على هذا الجهاز.</p>
        <div class="progress-wrap"><div class="progress-meta"><span id="progressLabel">اختيار الخدمة</span><span id="progressPercent">0%</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="progressBar" class="progress-bar"></div></div></div>
        <div class="legal-note mt-24">التوجيه مبدئي، والسعر والتشخيص النهائي لدى مقدم الخدمة بعد الفحص.</div>
      </aside>

      <div class="flow-content" aria-live="polite">
        <section class="flow-screen active" data-screen="service" tabindex="-1">
          <div class="kicker">ابدأ من احتياجك</div><h2>وش تحتاج لسيارتك؟</h2><p>اختر الخدمة الأقرب لحالتك، وستظهر لك الخطوات المطلوبة فقط.</p>
          <div class="service-choice-grid" id="serviceChoices">
            <button class="service-choice primary" type="button" data-service="problem"><span class="service-choice-icon" data-service-icon="problem" aria-hidden="true"></span><span class="service-choice-copy"><strong>عندي مشكلة في السيارة</strong><span>صف الأعراض وأجب عن أربعة أسئلة قصيرة لمعرفة التخصص والاستعجال.</span></span></button>
            <button class="service-choice" type="button" data-service="parts"><span class="service-choice-icon" data-service-icon="parts" aria-hidden="true"></span><span class="service-choice-copy"><strong>أبحث عن قطع غيار</strong><span>أدخل القطعة المطلوبة ورقم الهيكل إن توفر، واختر وكالة أو تجارية.</span></span></button>
            <button class="service-choice urgent-choice" type="button" data-service="tow"><span class="service-choice-icon" data-service-icon="tow" aria-hidden="true"></span><span class="service-choice-copy"><strong>أحتاج سطحة — عاجل</strong><span>شارك موقع السيارة واكتب وصف المكان للوصول إليك بسرعة.</span></span></button>
            <button class="service-choice" type="button" data-service="maintenance"><span class="service-choice-icon" data-service-icon="maintenance" aria-hidden="true"></span><span class="service-choice-copy"><strong>أبحث عن صيانة دورية</strong><span>اختر الخدمة وبيانات السيارة والمنطقة والمدينة.</span></span></button>
          </div>
          <div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button id="serviceNext" class="btn btn-primary" type="button" disabled>التالي</button></div>
        </section>

        <section class="flow-screen" data-screen="customer" tabindex="-1">
          <div class="kicker">بيانات التواصل</div><h2>عرّفنا بك</h2><p>نحتاج الاسم الأول والجوال لربط الطلب ومتابعته دون إنشاء حساب.</p>
          <form id="customerForm" novalidate>
            <div class="form-grid two"><div class="form-field"><label class="required" for="firstName">الاسم الأول</label><input id="firstName" autocomplete="given-name" maxlength="40" required><span class="field-error" data-error-for="firstName"></span></div><div class="form-field"><label class="required" for="phone">رقم الجوال</label><input id="phone" inputmode="tel" autocomplete="tel" placeholder="05XXXXXXXX" maxlength="10" required><span class="field-error" data-error-for="phone"></span></div></div>
            <div class="checkbox-stack mt-24"><label class="checkbox-line"><input id="privacyAccepted" type="checkbox" required><span>أوافق على <a href="privacy.html" target="_blank" rel="noopener">سياسة الخصوصية</a> واستخدام البيانات لتشغيل الطلب.</span></label><label class="checkbox-line"><input id="termsAccepted" type="checkbox" required><span>أوافق على <a href="terms.html" target="_blank" rel="noopener">الشروط وحدود مسؤولية المنصة</a>.</span></label><label class="checkbox-line"><input id="marketingMessages" type="checkbox"><span>أرغب اختياريًا في تلقي العروض والخدمات الجديدة. رسائل متابعة الطلب ستصلك عند الحاجة.</span></label></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="service">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="vehicle" tabindex="-1">
          <div class="kicker">بيانات السيارة</div><h2>اختر سيارتك</h2><p>بعد اختيار الشركة ستظهر لك الموديلات التابعة لها.</p>
          <form id="vehicleForm" novalidate>
            <div class="form-grid two">
              <div class="form-field"><label class="required" for="make">الشركة المصنعة</label><select id="make" required></select><span class="field-error" data-error-for="make"></span></div>
              <div class="form-field" id="makeOtherField" hidden><label class="required" for="makeOther">اسم الشركة</label><input id="makeOther" maxlength="60"><span class="field-error" data-error-for="makeOther"></span></div>
              <div class="form-field"><label class="required" for="model">الموديل</label><select id="model" required disabled><option value="">اختر الشركة أولًا</option></select><span class="field-error" data-error-for="model"></span></div>
              <div class="form-field" id="modelOtherField" hidden><label class="required" for="modelOther">اسم الموديل</label><input id="modelOther" maxlength="60"><span class="field-error" data-error-for="modelOther"></span></div>
              <div class="form-field"><label id="yearLabel" class="required" for="year">سنة الصنع</label><select id="year"></select><span class="field-error" data-error-for="year"></span></div>
              <div class="form-field" id="mileageField"><label class="required" for="mileage">ممشى السيارة</label><select id="mileage"></select><span class="field-error" data-error-for="mileage"></span></div>
              <div class="form-field" id="fuelField" hidden><label class="required" for="fuelType">نوع الوقود</label><select id="fuelType"></select><span class="field-error" data-error-for="fuelType"></span></div>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="customer">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="location" tabindex="-1">
          <div class="kicker">موقع الخدمة</div><h2>حدد المنطقة ثم المدينة</h2><p id="locationHelp">شارك الموقع الدقيق عند الحاجة لتحسين المطابقة.</p>
          <form id="locationForm" novalidate>
            <div class="form-grid two"><div class="form-field"><label class="required" for="region">المنطقة</label><select id="region" required></select><span class="field-error" data-error-for="region"></span></div><div class="form-field"><label class="required" for="city">المدينة</label><select id="city" required disabled><option value="">اختر المنطقة أولًا</option></select><span class="field-error" data-error-for="city"></span></div></div>
            <div class="location-capture mt-16"><button id="detectLocation" class="btn btn-light" data-icon="location" type="button">تحديد موقعي تلقائيًا</button><div id="locationStatus" class="field-hint" role="status">لم تتم مشاركة الموقع.</div></div>
            <div class="form-field mt-16"><label id="preciseLocationLabel" for="preciseLocation">الموقع الدقيق أو نقطة الالتقاء</label><input id="preciseLocation" maxlength="400" placeholder="مثال: حي الريان، قرب محطة كذا"><span class="field-hint" id="preciseLocationHint">يمكن كتابة الموقع يدويًا، لكن السطحة تتطلب أيضًا مشاركة الإحداثيات.</span><span class="field-error" data-error-for="preciseLocation"></span></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="vehicle">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="path" tabindex="-1">
          <div class="kicker">تفاصيل الطلب</div><h2 id="pathTitle">وش المشكلة في سيارتك؟</h2><p id="pathDescription">اكتب وصفك بطريقتك.</p>
          <form id="pathForm" novalidate>
            <div id="problemFields"><div class="form-field"><label class="required" for="problem">وصف المشكلة</label><textarea id="problem" maxlength="1200" placeholder="مثال: السيارة ترج إذا وقفت عند الإشارة وتظهر لمبة المكينة"></textarea><span class="field-hint">اكتب متى تظهر المشكلة وأي لمبة أو صوت لاحظته.</span><span class="field-error" data-error-for="problem"></span></div></div>
            <div id="partsFields" hidden>
              <div class="form-field"><label for="vin">رقم الهيكل — يفضل كتابته</label><input id="vin" maxlength="40" autocomplete="off" placeholder="VIN / رقم الهيكل"><span class="field-hint">يساعد المحل على التحقق بصورة أدق من مطابقة القطعة.</span></div>
              <div class="form-field mt-16"><label class="required" for="partName">اسم القطعة المطلوبة بدقة</label><input id="partName" maxlength="200" placeholder="مثال: كمبروسر مكيف أو مساعد أمامي يمين"><span class="field-error" data-error-for="partName"></span></div>
              <div class="form-field mt-16"><label class="required" for="partType">نوع القطعة المفضل</label><select id="partType"></select><span class="field-error" data-error-for="partType"></span></div>
            </div>
            <div id="towFields" hidden>
              <div class="urgent-panel"><strong>طلب سطحة عاجل</strong><p>موقع السيارة التلقائي ووصف المكان مطلوبان قبل الإحالة.</p></div>
              <div class="form-grid two"><div class="form-field"><label class="required" for="vehicleMoves">هل السيارة تتحرك؟</label><select id="vehicleMoves"></select><span class="field-error" data-error-for="vehicleMoves"></span></div><div class="form-field"><label for="towDestination">الوجهة إن كانت معروفة</label><input id="towDestination" maxlength="300" placeholder="مثال: ورشة في حي كذا"></div></div>
              <div class="form-field mt-16"><label class="required" for="placeDescription">وصف مكان السيارة</label><textarea id="placeDescription" maxlength="500" placeholder="مثال: طريق الملك عبدالعزيز، بجوار المحطة، السيارة على الجهة اليمنى"></textarea><span class="field-error" data-error-for="placeDescription"></span></div>
              <div class="form-field mt-16"><label for="towNotes">وصف مختصر للحالة</label><textarea id="towNotes" maxlength="500" placeholder="مثال: السيارة لا تشتغل والإطار الأمامي متضرر"></textarea></div>
            </div>
            <div id="maintenanceFields" hidden><div class="form-field"><label class="required" for="maintenanceService">الخدمة المطلوبة</label><select id="maintenanceService"></select><span class="field-error" data-error-for="maintenanceService"></span></div><div class="form-field mt-16"><label for="maintenanceNotes">ملاحظة اختيارية</label><textarea id="maintenanceNotes" maxlength="500"></textarea></div></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="location">السابق</button><button id="pathSubmit" class="btn btn-primary" type="submit">متابعة</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="analyzing" tabindex="-1"><div class="loading-shell"><div class="skeleton-icon"></div><h2>نراجع الأعراض التي وصفتها</h2><p>نرتب المعلومات ونجهز أسئلة قصيرة تساعدك على معرفة الاتجاه المناسب مبدئيًا.</p><div id="analysisSteps" class="loader-steps"><div class="loader-step">فهم وصف المشكلة</div><div class="loader-step">تحديد التخصص المحتمل</div><div class="loader-step">إعداد أربعة أسئلة مناسبة</div></div></div></section>

        <section class="flow-screen" data-screen="questions" tabindex="-1"><div class="kicker" id="questionTitle">سؤال 1 من 4</div><h2 id="questionText"></h2><p>اختر الإجابة الأقرب. لا تقلق إن لم تكن متأكدًا.</p><div id="answerChoices" class="choice-row"></div><div class="screen-actions"><button id="questionBack" class="btn btn-ghost" type="button">السابق</button><button id="questionNext" class="btn btn-primary" type="button" disabled>التالي</button></div></section>

        <section class="flow-screen" data-screen="guidance" tabindex="-1"><div class="kicker">النتيجة المبدئية</div><h2>هذا هو الاتجاه الأقرب</h2><div id="dangerPanel" class="danger-panel" hidden></div><div class="guidance-grid"><div class="guidance-item"><span>المشكلة المتوقعة مبدئيًا</span><strong id="expectedIssue"></strong></div><div class="guidance-item"><span>التخصص المناسب</span><strong id="specialty"></strong></div><div class="guidance-item"><span>درجة الاستعجال</span><strong id="urgency"></strong></div><div class="guidance-item"><span>ما يجب فعله الآن</span><strong id="nextStep"></strong></div></div><div id="legalNotice" class="legal-note mt-16"></div><div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="path">تعديل الوصف</button><button id="findPartner" class="btn btn-primary" data-icon="search" type="button">وين أوديها؟</button></div></section>

        <section class="flow-screen" data-screen="review" tabindex="-1"><div class="kicker">قبل الترشيح</div><h2>راجع بيانات طلبك</h2><div id="reviewContent" class="guidance-grid"></div><div id="serviceDisclaimer" class="legal-note mt-16"></div><div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="path">تعديل</button><button id="reviewMatch" class="btn btn-primary" data-icon="search" type="button">ابحث عن شريك</button></div></section>

        <section class="flow-screen" data-screen="matching" tabindex="-1"><div class="loading-shell"><div class="skeleton-icon"></div><h2>نبحث عن الشريك الأنسب لطلبك</h2><div class="loader-steps"><div class="loader-step">تأكيد بيانات الطلب</div><div class="loader-step">مطابقة الخدمة والمدينة</div><div class="loader-step">تجهيز بيانات التواصل</div></div></div></section>

        <section class="flow-screen" data-screen="result" tabindex="-1"><div id="resultHeader" class="success-panel"></div><div id="partnerResult"></div><section class="contact-card mt-16" aria-labelledby="contactPartnerTitle"><div><div class="kicker">جاهز للتواصل</div><h2 id="contactPartnerTitle">تواصل مع الشريك</h2><p>جهزنا رسالة مختصرة تحتوي على رقم الطلب وتفاصيل الخدمة.</p></div><div class="button-row contact-actions"><a id="whatsappLink" class="btn btn-primary" href="#" target="_blank" rel="noopener">التواصل عبر واتساب</a><button id="copyWhatsapp" class="btn btn-light" type="button">نسخ الرسالة</button></div></section><section class="private-link-card mt-24"><div><span class="pill">احتفظ به</span><h2>رابط طلبك الخاص</h2><p>للعودة والمتابعة دون كلمة مرور.</p></div><div class="compact-link-row"><input id="privateLink" aria-label="رابط الطلب الخاص" readonly><button id="copyPrivateLink" class="icon-action" type="button" aria-label="نسخ رابط الطلب">نسخ</button><a id="openTrackLink" class="icon-action" href="track.html" aria-label="فتح متابعة الطلب">فتح</a><a id="requestAlternativeLink" class="icon-action alternative-action" href="track.html" aria-label="طلب شريك آخر">↻ <span>أريد ورشة أخرى</span></a></div></section></section>

        <section class="flow-screen" data-screen="noMatch" tabindex="-1"><div class="empty-state"><h2>لا يوجد تطابق حاليًا</h2><p id="noMatchReason"></p><p>عدّل المدينة أو الموقع، أو أعد المحاولة لاحقًا عند توفر شريك مناسب.</p><div class="screen-actions"><button class="btn btn-light" type="button" data-back="location">تعديل الموقع</button><a class="btn btn-primary" href="index.html">الرئيسية</a></div></div></section>
      </div>
    </div>
  </main>
  <div data-site-footer></div>
  <script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/ai-engine.js"></script><script defer src="assets/matching-engine.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/customer.js"></script>
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
  <meta name="description" content="وين أوديها تساعدك على فهم مشكلة سيارتك مبدئيًا والوصول إلى ورشة أو مقدم خدمة مناسب بخطوات واضحة.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>وين أوديها؟ — وجهتك للخدمة المناسبة</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="home">
  <noscript><div class="noscript-banner">فعّل JavaScript في المتصفح لإكمال طلبك وحفظ تقدمك.</div></noscript>
  <div data-site-header></div>

  <main id="main-content">
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">وجهتك تبدأ من وصف بسيط</div>
          <h1>عندك مشكلة في السيارة؟<br><span>قل لنا وش فيها… ونقول لك وين توديها.</span></h1>
          <p>صف المشكلة بطريقتك، ونساعدك على معرفة الاحتمال الأقرب والتخصص المناسب ودرجة الاستعجال، ثم نرشح لك مقدم خدمة واحدًا يناسب طلبك.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" data-icon="car" href="customer.html?service=problem&fresh=1">ابدأ طلبك</a>
            <a class="btn btn-light" data-icon="track" href="track.html">تابع طلبك</a>
          </div>
          <div class="hero-assurances" aria-label="مزايا الخدمة">
            <span data-icon="phone">من الجوال مباشرة</span>
            <span data-icon="lock">دون كلمة مرور</span>
            <span data-icon="partner">شريك واحد في كل مرة</span>
            <span data-icon="link">متابعة برابط خاص</span>
          </div>
        </div>

        <div class="hero-panel" id="services">
          <div class="kicker">ابدأ من احتياجك</div>
          <div class="main-path-card">
            <div class="path-icon" data-service-icon="problem" aria-hidden="true"></div>
            <h2>عندي مشكلة في السيارة</h2>
            <p>اشرح الأعراض، وأجب عن أربعة أسئلة قصيرة، ثم اعرف التخصص والخطوة المناسبة.</p>
            <a class="btn btn-primary btn-block mt-16" data-icon="arrow" href="customer.html?service=problem&fresh=1">ابدأ مسار المشكلة</a>
          </div>
          <h3 class="mt-24">خدمات أخرى</h3>
          <div class="other-services">
            <a class="service-card" href="customer.html?service=parts&fresh=1">
              <div class="path-icon" data-service-icon="parts" aria-hidden="true"></div>
              <div><h3>أبحث عن قطع غيار</h3><p>أدخل بيانات السيارة والقطعة المطلوبة، وتواصل مع محل مناسب.</p></div>
            </a>
            <a class="service-card urgent-service" href="customer.html?service=tow&fresh=1">
              <div class="path-icon" data-service-icon="tow" aria-hidden="true"></div>
              <div><h3>أحتاج سطحة</h3><p>طلب عاجل يعتمد على موقع السيارة ووصف مكانها.</p></div>
            </a>
            <a class="service-card" href="customer.html?service=maintenance&fresh=1">
              <div class="path-icon" data-service-icon="maintenance" aria-hidden="true"></div>
              <div><h3>صيانة دورية</h3><p>اختر الخدمة والسيارة والمدينة للوصول إلى مركز مناسب.</p></div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">كيف تعمل الخدمة؟</div>
          <h2>من وصف المشكلة إلى التواصل في خطوات واضحة</h2>
          <p>نختصر عليك البحث، ونحفظ بيانات الطلب حتى تتمكن من المتابعة أو طلب بديل دون إعادة الخطوات.</p>
        </div>
        <div class="journey-grid">
          <article class="journey-card"><span class="step-number">1</span><h3>صف احتياجك</h3><p>اختر الخدمة وأدخل بيانات السيارة والموقع المطلوب.</p></article>
          <article class="journey-card"><span class="step-number">2</span><h3>نعرف وجهتك</h3><p>في مسار المشكلة نحدد التخصص والاستعجال والتصرف المناسب مبدئيًا.</p></article>
          <article class="journey-card"><span class="step-number">3</span><h3>نرشح شريكًا واحدًا</h3><p>يُختار الشريك من بيانات النشاط والتغطية والخدمات المسجلة.</p></article>
          <article class="journey-card"><span class="step-number">4</span><h3>تواصل وتابع</h3><p>افتح واتساب، وارجع إلى رابط طلبك متى احتجت إلى متابعة أو بديل.</p></article>
        </div>
      </div>
    </section>

    <section class="section value-section">
      <div class="container value-grid">
        <div class="section-head">
          <div class="kicker">قرار أوضح، وقت أقل</div>
          <h2>لا قائمة طويلة ولا بحث عشوائي</h2>
          <p>نقدم لك خيارًا واحدًا في كل مرة، مع بيانات واضحة وتقييمات موثقة، لتتواصل مباشرة وتتخذ قرارك بهدوء.</p>
          <a class="btn btn-primary mt-16" data-icon="arrow" href="customer.html?fresh=1">اختر خدمتك</a>
        </div>
        <div class="benefit-list">
          <article class="benefit-item" data-icon="check"><div><h3>توجيه مبدئي مفهوم</h3><p>نوضح الاحتمال الأقرب والتخصص ودرجة الاستعجال دون تشخيص نهائي.</p></div></article>
          <article class="benefit-item" data-icon="shield"><div><h3>بيانات شريك واضحة</h3><p>لا يظهر الشريك إلا بعد إنشاء الطلب وتسجيل الإحالة.</p></div></article>
          <article class="benefit-item" data-icon="refresh"><div><h3>بديل دون إعادة الطلب</h3><p>إذا لم يتم التفاهم، ارجع إلى الرابط نفسه واطلب شريكًا آخر.</p></div></article>
        </div>
      </div>
    </section>

    <section class="section partner-cta-section">
      <div class="container partner-cta">
        <div>
          <div class="kicker light-kicker">للورش ومقدمي خدمات السيارات</div>
          <h2>استقبل إحالات تناسب نشاطك وتغطيتك</h2>
          <p>انضم إلى شبكة الشركاء، وحدد خدماتك ومدنك وساعات عملك وخصوماتك من البداية.</p>
        </div>
        <div class="button-row">
          <a class="btn btn-primary" data-icon="plus" href="join.html">انضم كشريك</a>
          <a class="btn btn-light" data-icon="partner" href="workshop-login.html">دخول الشريك</a>
        </div>
      </div>
    </section>

    <section class="section alt trust-section">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">وضوح من البداية</div>
          <h2>التوجيه مبدئي، والخدمة لدى الشريك</h2>
          <p>نساعدك على الوصول، بينما يبقى الفحص النهائي والسعر والتنفيذ والضمان مسؤولية مقدم الخدمة.</p>
        </div>
        <div class="cards-grid trust-cards">
          <article class="card"><div class="card-icon" data-icon="search"></div><h3>فهم أولي لا تشخيص نهائي</h3><p>النتيجة تساعدك على معرفة الاتجاه المناسب قبل الفحص الفعلي.</p></article>
          <article class="card"><div class="card-icon" data-icon="money"></div><h3>لا أسعار تقديرية</h3><p>السعر والتوفر والموعد تتأكد منها مباشرة مع مقدم الخدمة.</p></article>
          <article class="card"><div class="card-icon" data-icon="location"></div><h3>مطابقة وفق البيانات المسجلة</h3><p>عند عدم وجود شريك مطابق تظهر لك رسالة واضحة بدل بيانات غير دقيقة.</p></article>
        </div>
      </div>
    </section>
  </main>

  <div class="mobile-action-bar" aria-label="إجراء سريع">
    <a class="btn btn-primary btn-block" data-icon="car" href="customer.html?service=problem&fresh=1">ابدأ طلبك</a>
  </div>
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
  <meta charset="utf-8"><meta name="description" content="متابعة حالة طلب الانضمام إلى شبكة شركاء وين أوديها."><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>حالة طلب الانضمام — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="join-status"><div data-site-header></div>
<main id="main-content" class="section"><div class="container">
  <section id="joinLookup" class="card"><div class="section-head"><div class="kicker">متابعة طلب الشراكة</div><h1>حالة طلب الانضمام</h1><p>أدخل رقم طلب الانضمام ورقم الجوال للاطلاع على آخر تحديث.</p></div><form id="joinLookupForm" class="form-grid two"><div class="form-field"><label class="required" for="joinNumber">رقم الطلب</label><input id="joinNumber" placeholder="JOIN-12345" required></div><div class="form-field"><label class="required" for="joinPhone">رقم الجوال</label><input id="joinPhone" inputmode="tel" maxlength="10" required></div><button class="btn btn-primary" type="submit">عرض الحالة</button></form></section>
  <section id="joinResult" class="card" hidden><div class="kicker">طلب الشراكة</div><div id="joinResultContent"></div><div class="button-row mt-16"><a class="btn btn-light" href="join-status.html">بحث آخر</a><a class="btn btn-primary" href="index.html">الرئيسية</a></div></section>
  <section id="joinNotFound" class="empty-state" hidden><h1>لم نعثر على طلب الانضمام</h1><p>تحقق من رقم الطلب والجوال ثم أعد المحاولة.</p><a class="btn btn-primary" href="join-status.html">المحاولة مرة أخرى</a></section>
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
  <meta name="description" content="قدّم طلب انضمام كشريك في منصة وين أوديها وفق نوع نشاطك.">
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
        <div class="kicker light-kicker">ابدأ شراكتك بخطوات واضحة</div>
        <h1>انضم إلى شبكة الشركاء</h1>
        <p>اختر نوع نشاطك وأكمل البيانات التي تساعدنا على مطابقة الإحالات المناسبة لك.</p>
        <div class="progress-wrap">
          <div class="progress-meta"><span id="joinProgressLabel">البيانات الأساسية</span><span id="joinProgressPercent">20%</span></div>
          <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"><div id="joinProgressBar" class="progress-bar"></div></div>
        </div>
        <div class="legal-note mt-24">أدخل بيانات دقيقة؛ فهي الأساس في مطابقة الطلبات وعرض معلومات نشاطك للعملاء.</div>
      </aside>

      <div class="flow-content">
        <form id="joinForm" novalidate>
          <section class="flow-screen active" data-join-step="1" tabindex="-1">
            <div class="kicker">الخطوة 1 من 5</div>
            <h2>نوع الشريك والبيانات الأساسية</h2>
            <p>ستظهر لك الوثائق والحقول المناسبة لنوع نشاطك.</p>
            <div class="form-grid two">
              <div class="form-field"><label class="required" for="partnerType">نوع الشريك</label><select id="partnerType" required><option value="">اختر</option><option value="workshop">ورشة إصلاح وتشخيص</option><option value="maintenance">مركز صيانة دورية</option><option value="parts">محل قطع غيار</option><option value="tow">مقدم خدمة سطحة</option></select></div>
              <div class="form-field"><label class="required" for="businessName">اسم المنشأة أو مقدم الخدمة</label><input id="businessName" maxlength="100" required></div>
              <div class="form-field"><label class="required" for="tradeName">الاسم التجاري</label><input id="tradeName" maxlength="100" required></div>
              <div class="form-field"><label class="required" for="activityDescription">وصف مختصر للنشاط</label><textarea id="activityDescription" maxlength="500" required></textarea></div>
              <div class="form-field"><label class="required" for="joinRegion">المنطقة</label><select id="joinRegion" required></select></div>
              <div class="form-field"><label class="required" for="joinCity">المدينة</label><select id="joinCity" required disabled><option value="">اختر المنطقة أولًا</option></select></div>
              <div class="form-field"><label class="required" for="address">العنوان</label><input id="address" maxlength="250" required></div>
              <div class="form-field"><label class="required" for="googleMapsUrl">رابط الموقع على خرائط Google</label><input id="googleMapsUrl" type="url" maxlength="1200" placeholder="https://maps.google.com/..." required></div>
              <div class="form-field"><label class="required" for="joinWhatsapp">رقم واتساب</label><input id="joinWhatsapp" inputmode="tel" maxlength="10" placeholder="05XXXXXXXX" required></div>
              <div class="form-field"><label for="secondaryPhone">رقم تواصل إضافي</label><input id="secondaryPhone" inputmode="tel" maxlength="10"></div>
            </div>

            <section id="businessDocuments" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>الوثائق النظامية</h3><p>مطلوبة للورش ومراكز الصيانة ومحلات قطع الغيار.</p></div>
              <div class="form-grid two">
                <div class="form-field"><label class="required" for="commercialRegistration">رقم السجل التجاري</label><input id="commercialRegistration" maxlength="40"></div>
                <div class="form-field"><label class="required" for="registeredName">اسم المنشأة حسب السجل</label><input id="registeredName" maxlength="120"></div>
                <div class="form-field"><label for="commercialExpiry">تاريخ انتهاء السجل</label><input id="commercialExpiry" type="date"></div>
              </div>
            </section>

            <section id="towDocuments" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>بيانات تشغيل السطحة</h3><p>أدخل بيانات بطاقة التشغيل والمركبة المستخدمة لتقديم الخدمة.</p></div>
              <div class="form-grid two">
                <div class="form-field"><label class="required" for="operationCardNumber">رقم بطاقة التشغيل</label><input id="operationCardNumber" maxlength="50"></div>
                <div class="form-field"><label class="required" for="operationCardExpiry">تاريخ انتهاء بطاقة التشغيل</label><input id="operationCardExpiry" type="date"></div>
                <div class="form-field"><label class="required" for="towVehiclePlate">رقم لوحة مركبة السطحة</label><input id="towVehiclePlate" maxlength="30"></div>
              </div>
            </section>
            <div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button class="btn btn-primary" type="button" data-join-next="2">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="2" tabindex="-1">
            <div class="kicker">الخطوة 2 من 5</div>
            <h2>ساعات العمل لكل يوم</h2>
            <p>حدد مواعيد الاستقبال لكل يوم، وأضف فترة ثانية عند الحاجة.</p>
            <div class="button-row mt-16"><button id="copySundaySchedule" class="btn btn-light btn-sm" type="button">نسخ ساعات الأحد لبقية الأيام المفتوحة</button><button id="openAllDays" class="btn btn-ghost btn-sm" type="button">فتح جميع الأيام</button></div>
            <div id="dailyScheduleEditor" class="daily-schedule-list mt-16"></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="1">السابق</button><button class="btn btn-primary" type="button" data-join-next="3">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="3" tabindex="-1">
            <div class="kicker">الخطوة 3 من 5</div>
            <h2>التغطية والخدمات</h2>
            <div class="form-field"><label class="required" for="coverageCities">مدن التغطية</label><select id="coverageCities" multiple size="7" required></select><span class="field-hint">تُضاف مدينتك الأساسية تلقائيًا، ويمكنك تحديد مدن إضافية تخدمها.</span></div>

            <section id="workshopAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>تخصصات الورشة</h3><p>اختر تخصصاتك ورتبها حسب الأولوية، وسيُعتمد الأول كتخصص رئيسي.</p></div>
              <div id="specialtySelector" class="priority-selector"><div><h3>التخصصات المتاحة</h3><div id="availableSpecialties" class="selector-list"></div></div><div><h3>التخصصات المختارة</h3><ol id="selectedSpecialties" class="selected-priority-list"></ol></div></div>
            </section>

            <section id="makeAndFuelAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3 id="makeSectionTitle">الشركات المصنعة التي تخدمها</h3><p>اختر العلامات التي تخدمها ورتبها حسب الأولوية.</p></div>
              <div id="makeSelector" class="priority-selector"><div><h3>الشركات المتاحة</h3><div id="availableMakes" class="selector-list"></div></div><div><h3>الشركات المختارة</h3><ol id="selectedMakes" class="selected-priority-list"></ol></div></div>
              <fieldset id="fuelTypesField" class="form-field mt-24"><legend class="required">أنواع الوقود التي تخدمها</legend><div id="fuelTypesJoin" class="checkbox-grid"></div></fieldset>
            </section>

            <section id="towAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>نطاق خدمة السطحة</h3><p>حدد أنواع المركبات التي تستطيع نقلها ضمن نطاق تغطيتك.</p></div>
              <div class="form-field"><label class="required" for="towVehicleTypes">أنواع المركبات الممكن نقلها</label><textarea id="towVehicleTypes" maxlength="250" placeholder="مثال: سيدان، دفع رباعي، بيك أب"></textarea></div>
            </section>

            <section id="maintenanceAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>خدمات الصيانة الدورية</h3><p>اختر خدمات الصيانة المتوفرة لديك.</p></div>
              <div class="form-field"><label class="required" for="maintenanceServicesJoin">الخدمات المتاحة</label><select id="maintenanceServicesJoin" multiple size="8"></select></div>
            </section>

            <section id="partsAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>أنواع قطع الغيار</h3><p>حدد أنواع القطع التي يوفرها المحل عادةً، وسيؤكد العميل التوفر مباشرة معك.</p></div>
              <fieldset class="form-field"><legend class="required">أنواع القطع التي يوفرها المحل عادةً</legend><div class="checkbox-grid"><label class="checkbox-line"><input type="checkbox" name="partTypesJoin" value="وكالة"><span>وكالة</span></label><label class="checkbox-line"><input type="checkbox" name="partTypesJoin" value="تجارية"><span>تجارية</span></label></div></fieldset>
            </section>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="2">السابق</button><button class="btn btn-primary" type="button" data-join-next="4">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="4" tabindex="-1">
            <div class="kicker">الخطوة 4 من 5</div>
            <h2>خصم عملاء «وين أوديها»</h2>
            <label class="checkbox-line"><input id="offersDiscount" type="checkbox"><span>أقدم خصمًا لعملاء «وين أوديها»</span></label>
            <div id="discountJoinFields" class="mt-16" hidden>
              <div class="form-grid two">
                <div class="form-field"><label class="required" for="joinDiscountPercent">نسبة الخصم %</label><input id="joinDiscountPercent" type="number" min="1" max="50"></div>
                <div class="form-field"><label class="required" for="joinDiscountStart">تاريخ البداية</label><input id="joinDiscountStart" type="date"></div>
              </div>
              <fieldset class="form-field mt-16"><legend class="required">نطاق الخصم</legend><div class="button-row"><label class="radio-line"><input type="radio" name="joinDiscountScope" value="all" checked> جميع الخدمات</label><label class="radio-line"><input type="radio" name="joinDiscountScope" value="selected"> خدمات مختارة</label></div></fieldset>
              <div id="joinSelectedServicesField" class="form-field mt-16" hidden><label for="joinDiscountServices">اكتب الخدمات المختارة — اختياري</label><textarea id="joinDiscountServices" maxlength="500" placeholder="مثال: أجور اليد للميكانيكا والكهرباء"></textarea></div>
              <div class="form-field mt-16"><label for="joinDiscountConditions">الشروط والاستثناءات</label><textarea id="joinDiscountConditions" maxlength="700"></textarea></div>
              <label class="checkbox-line mt-16"><input id="continuousDiscount" type="checkbox" checked><span>يستمر الخصم حتى أوقفه بنفسي من صفحة الشريك</span></label>
              <div id="joinDiscountEndField" class="form-field mt-16" hidden><label class="required" for="joinDiscountEnd">تاريخ انتهاء الخصم</label><input id="joinDiscountEnd" type="date"></div>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="3">السابق</button><button class="btn btn-primary" type="button" data-join-next="5">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="5" tabindex="-1">
            <div class="kicker">الخطوة 5 من 5</div>
            <h2>الموافقات والتعهد</h2>
            <div id="joinReview" class="guidance-grid"></div>
            <div class="fee-policy-box mt-24"><h3>شرائح رسوم الوساطة</h3><ul><li>أقل من 50 ريالًا: بلا رسوم.</li><li>50–أقل من 200: 5 ريالات.</li><li>200–400: 10 ريالات.</li><li>أكثر من 400: 25 ريالًا.</li></ul><p>تصدر الفاتورة في اليوم الأول من الشهر، ويصبح السداد إلزاميًا عند بلوغ الرصيد 100 ريال. مهلة الاعتراض 15 يومًا.</p></div>
            <div class="checkbox-stack mt-24">
              <label class="checkbox-line"><input id="agreementAccepted" type="checkbox" required><span>أوافق على اتفاقية الشراكة وآلية الإحالات.</span></label>
              <label class="checkbox-line"><input id="feesAccepted" type="checkbox" required><span>أوافق على شرائح الرسوم والفوترة وحد السداد ومهلة الاعتراض.</span></label>
              <label class="checkbox-line"><input id="ratingsAccepted" type="checkbox" required><span>أوافق على التقييمات الموثقة وسياسة الاعتراضات.</span></label>
              <label class="checkbox-line"><input id="privacyTrustAccepted" type="checkbox" required><span>ألتزم بحماية بيانات العملاء وعدم استخدامها للتسويق دون موافقة.</span></label>
              <label class="checkbox-line honesty-pledge"><input id="honestyPledge" type="checkbox" required><span>أتعهد أمام الله تعالى ثم أمام منصة «وين أوديها» بأن جميع البيانات التي قدمتها صحيحة، وأن أتعامل مع إحالات العملاء ورسوم الوساطة بأمانة وصدق، وألا أخفي أي خدمة تمت عن طريق المنصة، وأن ألتزم بالخصومات المعلنة، وبحقوق العملاء، وبالشروط والسياسات المعتمدة. وأتحمل مسؤولية أي بيانات أو تأكيدات غير صحيحة أقدمها.</span></label>
            </div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="4">السابق</button><button class="btn btn-primary" type="submit">إرسال طلب الانضمام</button></div>
          </section>
        </form>

        <section id="joinSuccess" class="flow-screen" tabindex="-1">
          <div class="success-panel"><strong>وصلنا طلب انضمامك</strong><p>احتفظ برقم الطلب لمتابعة حالة الانضمام في أي وقت.</p></div>
          <div class="guidance-grid mt-16"><div class="guidance-item"><span>رقم طلب الانضمام</span><strong id="joinApplicationNumber"></strong></div><div class="guidance-item"><span>الحالة</span><strong>تم الاستلام — قيد المراجعة</strong></div></div>
          <div class="screen-actions"><a id="joinStatusLink" class="btn btn-primary" href="join-status.html">متابعة الطلب</a><a class="btn btn-light" href="index.html">الرئيسية</a></div>
        </section>
      </div>
    </div>
  </main>
  <div data-site-footer></div>
  <script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/join.js"></script>
</body>
</html>

```

## `payment.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta name="description" content="مراجعة وسداد فاتورة رسوم الوساطة لشركاء وين أوديها.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>سداد الفاتورة — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="payment"><div data-site-header></div>
<main id="main-content" class="section"><div class="container payment-layout">
  <section id="paymentCard" class="card"><div class="section-head"><div class="kicker">تسوية حساب الشريك</div><h1>سداد فاتورة رسوم الوساطة</h1><p>راجع تفاصيل الفاتورة، ثم اختر طريقة السداد وسجّل العملية.</p></div><div id="claimSummary" class="guidance-grid"></div><form id="paymentForm" class="form-grid mt-24"><fieldset class="form-field"><legend class="required">طريقة السداد</legend><label class="radio-line payment-method"><input type="radio" name="paymentMethod" value="bank_transfer" checked><span>تحويل بنكي</span></label><label class="radio-line payment-method"><input type="radio" name="paymentMethod" value="sadad"><span>سداد</span></label></fieldset><label class="checkbox-line"><input id="confirmPayment" type="checkbox" required><span>أؤكد صحة بيانات السداد المدخلة.</span></label><button class="btn btn-primary" data-icon="payment" type="submit">تسجيل السداد</button></form></section>
  <section id="paymentMissing" class="empty-state" hidden><h1>الفاتورة غير موجودة</h1><p>تحقق من الرابط أو ارجع إلى لوحة الشريك لفتح الفاتورة الصحيحة.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة إلى اللوحة</a></section>
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
  <meta name="description" content="سياسة خصوصية منصة وين أوديها واستخدام بيانات العملاء والشركاء.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>سياسة الخصوصية — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="privacy"><div data-site-header></div>
<main id="main-content" class="section"><article class="container legal-document"><div class="section-head"><div class="kicker">خصوصيتك مهمة</div><h1>سياسة الخصوصية</h1><p>توضح هذه السياسة البيانات التي نحتاجها لتشغيل الخدمة وكيف نستخدمها ونحافظ عليها.</p></div>
<section><h2>البيانات التي نجمعها</h2><p>قد تشمل البيانات الاسم الأول، رقم الجوال، بيانات السيارة، رقم الهيكل عند إدخاله، المنطقة والمدينة، الموقع الدقيق عند الحاجة، وصف الطلب، الإجابات، بيانات الإحالات، فئة تكلفة الخدمة بعد تنفيذها، والتقييمات.</p></section>
<section><h2>لماذا نستخدم البيانات؟</h2><p>نستخدمها لإنشاء الطلب، وفهم الاحتياج مبدئيًا، واختيار الشريك، وتسجيل الإحالة، ومتابعة النتيجة، وإدارة التقييمات والاعتراضات والرسوم والفواتير، وتحسين جودة الخدمة.</p></section>
<section><h2>حفظ البيانات</h2><p>تُحفظ بيانات الطلب والجلسة على الجهاز المستخدم لتسهيل المتابعة والعودة إلى الطلب. حذف بيانات الموقع من المتصفح قد يؤدي إلى فقدان النسخة المحفوظة على هذا الجهاز.</p></section>
<section><h2>مشاركة البيانات</h2><p>لا يظهر لمقدم الخدمة إلا ما يحتاج إليه للتعامل مع الإحالة. ولا يجوز له استخدام بيانات العميل للتسويق دون موافقة مستقلة.</p></section>
<section><h2>الرسائل التشغيلية والتسويقية</h2><p>رسائل متابعة الطلب مرتبطة بالخدمة القائمة. أما الرسائل التسويقية فهي اختيارية، ولا تؤثر الموافقة عليها أو رفضها في متابعة طلبك.</p></section>
<section><h2>حقوق المستخدم</h2><p>يمكن للمستخدم طلب تصحيح بياناته أو الاستفسار عن استخدامها وفق القنوات المعتمدة لدى المنصة، مع مراعاة السجلات التي يلزم الاحتفاظ بها لأغراض التشغيل والرسوم والاعتراضات.</p></section>
<div class="info-panel mt-24"><strong>مبدأنا</strong><p>نجمع الحد الأدنى من البيانات اللازمة لتشغيل الخدمة، ولا نشاركها خارج الغرض الذي جُمعت من أجله.</p></div></article></main>
<div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script>
</body></html>

```

## `receipt.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="description" content="إيصال سداد رسوم الوساطة لشركاء وين أوديها."><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>إيصال سداد — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="receipt"><div data-site-header></div>
<main id="main-content" class="section"><div class="container"><section id="receiptCard" class="receipt"><div class="receipt-head"><div><div class="kicker">إيصال السداد</div><h1>إيصال سداد</h1></div><div class="brand"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>رسوم الشريك</small></span></div></div><div id="receiptContent"></div><div class="button-row mt-24 no-print"><button class="btn btn-primary" type="button" id="printReceipt">طباعة</button><a class="btn btn-light" href="workshop-dashboard.html">العودة للوحة</a></div></section><section id="receiptMissing" class="empty-state" hidden><h1>الإيصال غير موجود</h1><p>تحقق من رابط الإيصال أو ارجع إلى لوحة الشريك لمراجعة المدفوعات.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة للوحة</a></section></div></main><div data-site-footer></div>
<script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/receipt.js"></script>
</body></html>

```

## `terms.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta name="description" content="شروط استخدام منصة وين أوديها وحدود المسؤولية وآلية الإحالات والرسوم.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>الشروط وحدود المسؤولية — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="terms"><div data-site-header></div>
<main id="main-content" class="section"><article class="container legal-document"><div class="section-head"><div class="kicker">استخدام واضح ومسؤول</div><h1>الشروط وحدود المسؤولية</h1><p>باستخدام المنصة فإنك تقر بفهم طبيعة خدمة التوجيه والإحالة وحدود دور كل طرف.</p></div>
<section><h2>طبيعة المنصة</h2><p>«وين أوديها» منصة توجيه وإحالة تساعد المستخدم على الوصول إلى مقدم خدمة مناسب. لا تفحص السيارة، ولا تقدم تشخيصًا نهائيًا، ولا تنفذ الإصلاح أو بيع القطع أو النقل أو الصيانة.</p></section>
<section><h2>التوجيه الفني</h2><p>أي نتيجة فنية تظهر هي توقع مبدئي مبني على البيانات المدخلة، ولا تغني عن الفحص الفعلي. لا ينبغي استبدال قطعة أو اتخاذ قرار إصلاحي بناءً على النتيجة وحدها.</p></section>
<section><h2>السلامة</h2><p>عند ظهور مؤشرات خطر مثل ضعف الفرامل أو رائحة الوقود أو ارتفاع الحرارة أو توقف السيارة في موقع خطر، لا تستمر في القيادة إذا كان ذلك غير آمن، واستخدم السطحة أو تواصل مع الجهة المناسبة للحالة.</p></section>
<section><h2>مسؤولية مقدم الخدمة</h2><p>مقدم الخدمة شريك مستقل ومسؤول عن الفحص والتشخيص النهائي وجودة العمل والضمانات والموعد والسعر والاتفاق المباشر مع العميل.</p></section>
<section><h2>الأسعار والتوفر</h2><p>لا تعرض المنصة أسعارًا تقديرية. تتأكد من السعر والتوفر والموعد والمطابقة النهائية مباشرة مع مقدم الخدمة قبل تنفيذ العمل.</p></section>
<section><h2>الإحالات ورسوم الوساطة</h2><p>تُسجل الإحالة قبل إظهار بيانات الشريك. لا يستحق رسم الوساطة لمجرد عرض البيانات أو فتح واتساب. بعد تأكيد تلقي الخدمة تُسجل فئة التكلفة وتُحتسب الرسوم وفق الشرائح المعتمدة: أقل من 50 ريالًا بلا رسوم، ومن 50 إلى أقل من 200 بخمسة ريالات، ومن 200 إلى 400 بعشرة ريالات، وأكثر من 400 بخمسة وعشرين ريالًا.</p></section>
<section><h2>الفوترة والاعتراضات</h2><p>تصدر الفاتورة في اليوم الأول من الشهر، ويصبح السداد إلزاميًا عند بلوغ الرصيد 100 ريال. ويحق للشريك الاعتراض على العملية المالية خلال 15 يومًا من تاريخ إصدار الفاتورة.</p></section>
<section><h2>التقييمات</h2><p>لا يُقبل التقييم إلا عندما يرتبط بطلب وإحالة وخدمة مؤكدة. يمكن للشريك تقديم اعتراض مسبب، ولا يملك حذف التقييم مباشرة.</p></section>
<div class="info-panel mt-24"><strong>حدود المسؤولية</strong><p>دور «وين أوديها» هو التوجيه والإحالة والمتابعة، أما تنفيذ الخدمة ونتيجتها وضمانها والاتفاق المالي النهائي فهي مسؤولية مقدم الخدمة والعميل.</p></div></article></main>
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
  console, Date, Math, Intl, JSON, Array, Object, String, Number, Boolean,
  RegExp, Error, Map, Set, Uint8Array, localStorage: new LocalStorageMock(),
  crypto: webcrypto, setTimeout, clearTimeout
};
context.window = context;
context.globalThis = context;
vm.createContext(context);

const root = path.resolve(__dirname, '..');
[
  'assets/config.js', 'assets/automotive-data.js', 'assets/storage.js',
  'assets/seed.js', 'assets/ai-engine.js', 'assets/matching-engine.js',
  'assets/lifecycle.js'
].forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file }));

const { WA } = context;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const log = (message) => console.log(`✓ ${message}`);
const isoDaysAgo = (days) => new Date(Date.now() - days * 86400000).toISOString();

WA.Storage.init();
WA.Seed.run();

const requiredKeys = [
  'wa_customers','wa_vehicles','wa_requests','wa_partners','wa_referrals','wa_ratings',
  'wa_objections','wa_discounts','wa_fees','wa_invoices','wa_payments',
  'wa_join_applications','wa_consents','wa_sessions','wa_meta'
];
assert(requiredKeys.every((key) => context.localStorage.getItem(key) !== null), 'Missing storage keys');
log('إنشاء جداول localStorage الموحدة المطلوبة');

const partners = WA.Storage.get('wa_partners');
assert(partners.length === 60, `Expected 60 seed partners, got ${partners.length}`);
assert(partners.every((row) => row.region && row.googleMapsUrl && row.schedule?.length === 7), 'Partner details/schedule failed');
assert(partners.filter((row) => row.type === 'tow').every((row) => row.operationCardNumber && row.coverageCities.length >= 1), 'Tow documents/coverage missing');
WA.Seed.run();
const credentialRows = WA.Storage.get('wa_sessions').filter((row) => row.type === 'demo_credentials');
assert(credentialRows.length === 1 && credentialRows[0].partnerCode === 'WA-PARTNER', 'Partner credentials duplicated or invalid');
log('بيانات الشركاء المحلية آمنة وغير هدّامة مع وثائق وتغطية وساعات أسبوعية');

const aiCases = [
  'السيارة ترج إذا وقفت وتظهر لمبة المكينة',
  'المكيف يبرد أثناء المشي ويضعف عند الوقوف',
  'صوت طقطقة من الأمام عند المطبات',
  'القير ينتع عند التبديل'
];
aiCases.forEach((description) => {
  const result = WA.AIEngine.assess({ description });
  assert(result.questions.length === 4, `Expected exactly four questions for: ${description}`);
  assert(result.expectedIssue && result.specialty && result.urgency && result.nextStep, 'Incomplete AI guidance');
});
const danger = WA.AIEngine.assess({ description: 'الفرامل ما تمسك وفيه ريحة بنزين والسيارة وسط طريق سريع' });
assert(danger.questions.length === 4 && danger.urgency === 'خطرة' && danger.nextStep.includes('لا تستمر'), 'Danger flow failed');
const vague = WA.AIEngine.assess({ description: 'فيها مشكلة' });
assert(vague.questions.length === 4 && vague.expectedIssue.includes('لا تتوفر معلومات كافية'), 'Vague fallback failed');
log('أربعة أسئلة ديناميكية وتوجيه احتمالي ومسار خطر دون تشخيص نهائي');

const basePayload = {
  serviceType: 'problem',
  customer: { firstName: 'اختبار', phone: '0551234567' },
  consents: { privacyAccepted: true, termsAccepted: true, marketingMessages: false },
  vehicle: { make: 'تويوتا', model: 'كامري', year: '2022', mileage: 'من 50 إلى 100 ألف كم', fuelType: 'بنزين', vin: '' },
  region: 'منطقة القصيم', city: 'بريدة',
  problem: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة',
  ai: WA.AIEngine.finalize({
    description: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة',
    vehicle: { make: 'تويوتا' },
    questions: WA.AIEngine.assess({ description: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة' }).questions,
    answers: ['نعم','نعم','غير متأكد','لا']
  })
};
const created = WA.Lifecycle.createRequest(basePayload);
assert(created.request.publicToken && !created.request.publicToken.includes(basePayload.customer.phone), 'Token leaked phone');
const duplicate = WA.Lifecycle.createRequest({ ...basePayload, requestId: created.request.id });
assert(duplicate.customer.id === created.customer.id && duplicate.vehicle.id === created.vehicle.id, 'Customer/vehicle dedupe failed');
log('معرفات مرجعية ومنع التكرار ورابط خاص دون بيانات حساسة');

const serviceProbes = [
  { serviceType: 'problem', region: 'منطقة القصيم', city: 'بريدة', ai: basePayload.ai },
  { serviceType: 'parts', region: 'منطقة القصيم', city: 'بريدة', partName: 'كمبروسر مكيف', partType: 'وكالة', vehicleSnapshot: basePayload.vehicle },
  { serviceType: 'tow', region: 'منطقة القصيم', city: 'بريدة', preciseLocation: '26.35,43.96', placeDescription: 'بجوار محطة', vehicleMoves: 'لا تتحرك', vehicleSnapshot: basePayload.vehicle },
  { serviceType: 'maintenance', region: 'منطقة القصيم', city: 'بريدة', maintenanceService: 'تغيير الزيت والفلاتر', vehicleSnapshot: basePayload.vehicle }
];
serviceProbes.forEach((probe) => {
  const result = WA.Matching.match({ request: { ...created.request, ...probe, id: `PROBE-${probe.serviceType}` }, excludedPartnerIds: [] });
  assert(result.partner, `No match for ${probe.serviceType}`);
  assert(result.partner.region === probe.region, 'Region fabricated');
  assert(result.partner.city === probe.city || result.partner.coverageCities.includes(probe.city), 'City/coverage fabricated');
  const expectedType = { problem: 'workshop', parts: 'parts', tow: 'tow', maintenance: 'maintenance' }[probe.serviceType];
  assert(result.partner.type === expectedType, 'Wrong partner type');
});
const noMatch = WA.Matching.match({ request: { ...created.request, id: 'NO-MATCH', region: 'منطقة الرياض', city: 'الرياض' }, excludedPartnerIds: [] });
assert(!noMatch.partner && /لم (?:نجد|يوجد)/.test(noMatch.reason), 'No-match state failed');
log('محرك المطابقة للمسارات الأربعة دون اختلاق مدينة أو توفر');

const match = WA.Matching.match({ request: created.request, excludedPartnerIds: [] });
const referral1 = WA.Lifecycle.createReferral(created.request.id, match.partner.id, match.reason);
WA.Lifecycle.markReferralShown(referral1.id);
assert(WA.Storage.findById('wa_requests', created.request.id).activeReferralId === referral1.id, 'Referral not linked');
assert(WA.Storage.get('wa_referrals').filter((row) => row.requestId === created.request.id).length === 1, 'Referral duplicated');
log('إنشاء الطلب والإحالة قبل إظهار شريك واحد');

WA.Lifecycle.saveDraft({ screen: 'path', serviceType: 'parts', vin: 'JTTESTVIN', partName: 'مساعد أمامي يمين' });
assert(WA.Lifecycle.loadDraft().partName === 'مساعد أمامي يمين', 'Draft restore failed');
WA.Lifecycle.clearDraft();
assert(WA.Lifecycle.loadDraft() === null, 'Draft clear failed');
log('حفظ المسودة والاستعادة بعد التحديث');

assert(WA.Storage.get('wa_fees').length === 0, 'Fee created before service');
WA.Lifecycle.confirmServiceReceived(referral1.id, 'customer');
assert(WA.Storage.get('wa_fees').length === 0, 'Fee created without cost band');
log('عدم احتساب رسم قبل تلقي الخدمة وتحديد فئة التكلفة');

const feeBands = [
  ['under_50', 0], ['from_50_to_199', 5], ['from_200_to_400', 10], ['over_400', 25]
];
const feePartner = match.partner;
const feeRecords = [];
for (let i = 0; i < feeBands.length; i += 1) {
  const [band, expected] = feeBands[i];
  const req = WA.Storage.upsert('wa_requests', {
    id: `REQ-FEE-${i}`, humanId: `WA-FEE-${i}`, publicToken: `fee_token_${i}`,
    customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'problem',
    region: 'منطقة القصيم', city: 'بريدة', status: 'awaiting_result', lastActivityAt: WA.Storage.now()
  });
  const ref = WA.Storage.upsert('wa_referrals', {
    id: `REF-FEE-${i}`, requestId: req.id, partnerId: feePartner.id, order: 1,
    serviceType: 'problem', status: 'shown', registeredAt: WA.Storage.now()
  });
  WA.Lifecycle.confirmServiceReceived(ref.id, 'customer', band);
  const fee = WA.Storage.get('wa_fees').find((row) => row.referralId === ref.id);
  assert(fee && fee.amount === expected, `Wrong fee for ${band}: ${fee?.amount}`);
  feeRecords.push(fee);
}
WA.Lifecycle.ensureFee('REF-FEE-3');
assert(WA.Storage.get('wa_fees').filter((row) => row.referralId === 'REF-FEE-3').length === 1, 'Duplicate fee');
log('شرائح الرسوم 0 و5 و10 و25 ومنع التكرار');

const costDisputeRequest = WA.Storage.upsert('wa_requests', {
  id: 'REQ-COST-DISPUTE', humanId: 'WA-COST-D', publicToken: 'cost_dispute_token', customerId: created.customer.id,
  vehicleId: created.vehicle.id, serviceType: 'maintenance', region: 'منطقة القصيم', city: 'بريدة', status: 'awaiting_result', lastActivityAt: WA.Storage.now()
});
const costDisputeReferral = WA.Storage.upsert('wa_referrals', {
  id: 'REF-COST-DISPUTE', requestId: costDisputeRequest.id, partnerId: 'DEMO-MAINTENANCE-1', order: 1,
  serviceType: 'maintenance', status: 'shown', registeredAt: WA.Storage.now()
});
WA.Lifecycle.confirmServiceReceived(costDisputeReferral.id, 'customer', 'from_200_to_400');
const disputed = WA.Lifecycle.registerCostBand(costDisputeReferral.id, 'from_50_to_199', 'partner', 'الفئة غير صحيحة');
assert(disputed.disputed && disputed.referral.costDisputeStatus === 'under_review', 'Cost dispute not held');
assert(WA.Storage.findById('wa_fees', disputed.referral.feeId).status === 'disputed', 'Fee not held on cost dispute');
log('تسجيل اختلاف فئة التكلفة وتعليق الرسم للمراجعة');

const excluded1 = WA.Lifecycle.requestAlternative(created.request.id, 'لم يتم الرد');
const secondMatch = WA.Matching.match({ request: WA.Storage.findById('wa_requests', created.request.id), excludedPartnerIds: excluded1 });
const referral2 = WA.Lifecycle.createReferral(created.request.id, secondMatch.partner.id, secondMatch.reason);
const excluded2 = WA.Lifecycle.requestAlternative(created.request.id, 'الموقع غير مناسب');
const thirdMatch = WA.Matching.match({ request: WA.Storage.findById('wa_requests', created.request.id), excludedPartnerIds: excluded2 });
WA.Lifecycle.createReferral(created.request.id, thirdMatch.partner.id, thirdMatch.reason);
let blockedFourth = false;
try { WA.Lifecycle.requestAlternative(created.request.id, 'سبب آخر'); } catch (_) { blockedFourth = true; }
assert(blockedFourth && referral2.partnerId !== referral1.partnerId, 'Referral max/exclusion failed');
log('ثلاث إحالات كحد أقصى مع استبعاد السابق');

let ratingBlocked = false;
try { WA.Lifecycle.createRating({ requestId: created.request.id, referralId: referral2.id, overall: 5 }); } catch (_) { ratingBlocked = true; }
assert(ratingBlocked, 'Unverified rating accepted');
const rating = WA.Lifecycle.createRating({
  requestId: 'REQ-FEE-1', referralId: 'REF-FEE-1', overall: 5, treatment: 4, commitment: 5,
  clarity: 4, serviceQuality: 5, fairness: 4, recommend: 'yes', comment: '<script>bad</script> تجربة جيدة'
});
assert(rating.status === 'published' && !rating.comment.includes('<'), 'Rating verification/sanitization failed');
log('تقييم موثق فقط بعد خدمة فعلية مع تعقيم المدخلات');

const objection = WA.Lifecycle.createObjection({
  partnerId: feePartner.id, referralId: 'REF-FEE-3', type: 'referral', reason: 'لم نقدم خدمة', details: 'اعتراض QA'
});
assert(objection.status === 'new' && WA.Storage.findById('wa_fees', 'FEE-NOT-REAL') === null, 'Objection failed');
assert(WA.Storage.get('wa_fees').find((row) => row.referralId === 'REF-FEE-3').status === 'disputed', 'Fee not disputed');
log('الاعتراض على الخدمة يعلّق الرسم ولا يحذفه');

// Create enough confirmed non-disputed fees for threshold invoice.
for (let i = 0; i < 4; i += 1) {
  const reqId = `REQ-TH-${i}`; const refId = `REF-TH-${i}`;
  WA.Storage.upsert('wa_requests', { id: reqId, humanId: `WA-TH-${i}`, publicToken: `th_${i}`, customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'problem', region: 'منطقة القصيم', city: 'بريدة', status: 'awaiting_result', lastActivityAt: WA.Storage.now() });
  WA.Storage.upsert('wa_referrals', { id: refId, requestId: reqId, partnerId: feePartner.id, order: 1, serviceType: 'problem', status: 'shown', registeredAt: WA.Storage.now() });
  WA.Lifecycle.confirmServiceReceived(refId, 'customer', 'over_400');
}
const thresholdInvoice = WA.Lifecycle.issueInvoice(feePartner.id, 'threshold', new Date('2026-07-16T12:00:00Z'));
assert(thresholdInvoice && thresholdInvoice.amount >= 100 && thresholdInvoice.status === 'payment_required', 'Threshold invoice failed');
assert(new Date(thresholdInvoice.objectionDeadline) - new Date(thresholdInvoice.issuedAt) === 15 * 86400000, 'Objection window not 15 days');
log('فاتورة واجبة السداد عند 100 ريال ومهلة اعتراض 15 يومًا');

const monthlyPartner = partners.find((row) => row.type === 'parts' && row.id !== feePartner.id);
WA.Storage.upsert('wa_requests', { id: 'REQ-MONTH', humanId: 'WA-MONTH', publicToken: 'month_token', customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'parts', region: 'منطقة القصيم', city: monthlyPartner.city, status: 'awaiting_result', lastActivityAt: WA.Storage.now() });
WA.Storage.upsert('wa_referrals', { id: 'REF-MONTH', requestId: 'REQ-MONTH', partnerId: monthlyPartner.id, order: 1, serviceType: 'parts', status: 'shown', registeredAt: WA.Storage.now() });
WA.Lifecycle.confirmServiceReceived('REF-MONTH', 'partner', 'from_50_to_199');
WA.Lifecycle.maybeIssueInvoices(new Date('2026-08-01T08:00:00Z'));
const monthlyInvoice = WA.Storage.get('wa_invoices').find((row) => row.partnerId === monthlyPartner.id && row.cycle === '2026-08');
assert(monthlyInvoice && monthlyInvoice.amount === 5 && monthlyInvoice.status === 'carried_forward', 'Monthly invoice/rollover failed');
const monthlyAgain = WA.Lifecycle.issueInvoice(monthlyPartner.id, 'monthly', new Date('2026-08-01T10:00:00Z'));
assert(monthlyAgain.id === monthlyInvoice.id && WA.Storage.get('wa_invoices').filter((row) => row.partnerId === monthlyPartner.id && row.cycle === '2026-08').length === 1, 'Duplicate monthly invoice');
log('إصدار فاتورة يوم 1 وترحيل الرصيد الأقل من 100 دون تكرار');

let lateObjectionBlocked = false;
WA.Storage.upsert('wa_invoices', { ...monthlyInvoice, objectionDeadline: isoDaysAgo(1) });
try { WA.Lifecycle.createObjection({ partnerId: monthlyPartner.id, invoiceId: monthlyInvoice.id, type: 'invoice', reason: 'عملية مكررة' }); } catch (_) { lateObjectionBlocked = true; }
assert(lateObjectionBlocked, 'Late invoice objection accepted');
log('منع اعتراض الفاتورة بعد انقضاء 15 يومًا');

const payment = WA.Lifecycle.registerPayment(thresholdInvoice.id, 'demo_bank_transfer');
assert(payment.status === 'paid' && WA.Storage.findById('wa_invoices', thresholdInvoice.id).status === 'paid', 'Payment failed');
assert(WA.Storage.get('wa_payments').filter((row) => row.invoiceId === thresholdInvoice.id).length === 1, 'Duplicate payment');
log('سداد وإيصال وربط الفاتورة بالمدفوعات');

const overduePartner = partners.find((row) => row.type === 'maintenance');
const overdueInvoice = WA.Storage.upsert('wa_invoices', {
  id: 'INV-OVERDUE-QA', number: 'INV-OVERDUE-QA', partnerId: overduePartner.id, cycle: '2026-06',
  feeIds: [], amount: 100, paymentRequired: true, status: 'payment_required', issuedAt: isoDaysAgo(20),
  dueAt: isoDaysAgo(1), objectionDeadline: isoDaysAgo(5)
});
WA.Lifecycle.sweepOverdueInvoices(new Date());
assert(WA.Storage.findById('wa_partners', overduePartner.id).partnershipStatus === 'suspended_financial', 'Overdue suspension failed');
WA.Lifecycle.registerPayment(overdueInvoice.id, 'demo_bank_transfer');
assert(WA.Storage.findById('wa_partners', overduePartner.id).partnershipStatus === 'active', 'Reactivation failed');
log('تعليق الشريك المتأخر وإعادة تفعيله بعد السداد');

WA.Storage.upsert('wa_requests', { id: 'REQ-OLD', humanId: 'WA-OLD', publicToken: 'old_token', customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'tow', region: 'منطقة القصيم', city: 'بريدة', status: 'awaiting_result', lastActivityAt: isoDaysAgo(6) });
WA.Lifecycle.sweepAdministrativeClosures(new Date());
assert(WA.Storage.findById('wa_requests', 'REQ-OLD').status === 'administratively_closed', 'Five-day closure failed');
log('الإغلاق الإداري بعد خمسة أيام دون حذف السجل');

const issues = WA.Storage.integrityCheck();
assert(issues.length === 0, `Integrity issues: ${issues.join('; ')}`);
log('سلامة العلاقات المرجعية في قاعدة JSON المحلية');

console.log('\nALL_UNIT_QA_PASSED');

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
        <div class="section-head"><div class="kicker">كل تفاصيل طلبك في مكان واحد</div><h1>تابع طلبك</h1><p>استخدم رابط الطلب الخاص، أو أدخل رقم الطلب والجوال لاستعادة التفاصيل بأمان.</p></div>
        <form id="lookupForm" class="form-grid two" novalidate>
          <div class="form-field"><label class="required" for="requestNumber">رقم الطلب</label><input id="requestNumber" placeholder="WA-12345" autocomplete="off" required></div>
          <div class="form-field"><label class="required" for="lookupPhone">رقم الجوال</label><input id="lookupPhone" inputmode="tel" placeholder="05XXXXXXXX" maxlength="10" required></div>
          <div class="button-row"><button class="btn btn-primary" type="submit">عرض الطلب</button><a class="btn btn-light" href="customer.html?fresh=1">ابدأ طلبًا جديدًا</a></div>
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
              <h2>تفاصيل الطلب</h2>
              <div id="requestSummary" class="guidance-grid"></div>
            </section>
            <section class="card mt-16">
              <h2>سجل الشركاء</h2>
              <div id="referralTimeline" class="timeline"></div>
            </section>
          </aside>
        </div>
        <section id="requestLinkPanel" class="private-link-card mt-24" aria-label="رابط الطلب والإحالة البديلة"></section>
      </section>

      <section id="notFoundSection" class="empty-state" hidden>
        <div class="path-icon" data-icon="search"></div><h1>لم نعثر على الطلب</h1><p>تحقق من رقم الطلب والجوال، أو افتح الرابط الخاص المرسل لك عند إنشاء الطلب.</p><a class="btn btn-primary" href="track.html">المحاولة مرة أخرى</a>
      </section>
    </div>
  </main>

  <dialog id="alternativeDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="alternativeForm">
      <div class="dialog-head"><div><div class="kicker">خيار آخر</div><h2>وش سبب طلب شريك بديل؟</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
      <div class="form-field"><label for="alternativeReason">السبب اختياري</label><select id="alternativeReason"><option value="">بدون تحديد</option><option>لم يتم الرد</option><option>لم نتفق على الموعد</option><option>لم يتم التفاهم على السعر</option><option>الخدمة غير متوفرة</option><option>الموقع غير مناسب</option><option>لم أرغب في الاستمرار</option><option>سبب آخر</option></select></div>
      <div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button id="confirmAlternative" class="btn btn-primary" data-icon="refresh" value="default" type="submit">ابحث عن بديل</button></div>
    </form>
  </dialog>

  <dialog id="ratingDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="ratingForm">
      <div class="dialog-head"><div><div class="kicker">رأيك يهمنا</div><h2>قيّم تجربتك مع الشريك</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
      <div class="form-grid two">
        <div class="form-field"><label class="required" for="ratingCostBand">فئة تكلفة الخدمة</label><select id="ratingCostBand" required></select></div>
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
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="description" content="لوحة شريك وين أوديها لإدارة الإحالات والخصومات والتقييمات والفواتير."><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"><title>لوحة الشريك — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css"></head>
<body data-page="partner-dashboard"><div data-site-header></div><main id="main-content" class="section"><div class="container">
  <div id="partnerHeader" class="request-header"></div>
  <div class="tabs" role="tablist" aria-label="أقسام لوحة الشريك"><button class="tab-btn active" type="button" data-tab="overview" role="tab" aria-selected="true">نظرة عامة</button><button class="tab-btn" type="button" data-tab="referrals" role="tab" aria-selected="false">الإحالات</button><button class="tab-btn" type="button" data-tab="objections" role="tab" aria-selected="false">الاعتراضات</button><button class="tab-btn" type="button" data-tab="ratings" role="tab" aria-selected="false">التقييمات</button><button class="tab-btn" type="button" data-tab="discounts" role="tab" aria-selected="false">الخصومات</button><button class="tab-btn" type="button" data-tab="billing" role="tab" aria-selected="false">الفواتير والسداد</button><button class="tab-btn" type="button" data-tab="profile" role="tab" aria-selected="false">بيانات الشريك</button></div>

  <section class="tab-panel active" data-panel="overview" role="tabpanel"><div id="overviewStats" class="stats-grid"></div><div class="dashboard-grid two mt-16"><section class="card"><h2>آخر الإحالات</h2><div id="latestReferrals"></div></section><aside class="card"><h2>حالة الحساب</h2><div id="accountStatus"></div></aside></div></section>
  <section class="tab-panel" data-panel="referrals" role="tabpanel"><div class="section-head"><h2>إدارة الإحالات والخدمات</h2><p>حدّث حالة الإحالة، وأكد الخدمة، وأدخل فئة التكلفة عند الحاجة مع حفظ مصدر التحديث.</p></div><div id="referralsTable"></div></section>
  <section class="tab-panel" data-panel="objections" role="tabpanel"><div class="section-head"><h2>سجل الاعتراضات</h2><p>راجع الاعتراضات ومهلتها وقراراتها من هذا القسم.</p></div><div id="objectionsTable"></div></section>
  <section class="tab-panel" data-panel="ratings" role="tabpanel"><div class="section-head"><h2>التقييمات الموثقة</h2><p>راجع تقييمات العملاء، وقدّم اعتراضًا مسببًا عند الحاجة.</p></div><div id="ratingsList"></div></section>
  <section class="tab-panel" data-panel="discounts" role="tabpanel"><div class="dashboard-grid two"><section class="card"><h2>الخصومات الحالية</h2><p class="muted">أدر الخصومات النشطة، وحدد الخدمات والشروط بوضوح.</p><div id="discountsList"></div></section><section class="card"><h2>إضافة خصم</h2><form id="discountForm" class="form-grid" novalidate><div class="form-field"><label class="required" for="discountPercent">النسبة %</label><input id="discountPercent" type="number" min="1" max="50" required></div><div class="form-field"><label class="required" for="discountStart">تاريخ البداية</label><input id="discountStart" type="date" required></div><fieldset class="form-field"><legend class="required">نطاق الخصم</legend><div class="button-row"><label class="radio-line"><input type="radio" name="discountScope" value="all" checked> جميع الخدمات</label><label class="radio-line"><input type="radio" name="discountScope" value="selected"> خدمات مختارة</label></div></fieldset><div id="discountServicesField" class="form-field" hidden><label for="discountServices">اكتب الخدمات المختارة — اختياري</label><textarea id="discountServices" maxlength="500"></textarea></div><div class="form-field"><label for="discountConditions">الشروط والاستثناءات</label><textarea id="discountConditions" maxlength="700"></textarea></div><label class="checkbox-line"><input id="discountContinuous" type="checkbox" checked><span>يستمر حتى أوقفه بنفسي</span></label><div id="discountEndField" class="form-field" hidden><label class="required" for="discountEnd">تاريخ الانتهاء</label><input id="discountEnd" type="date"></div><button class="btn btn-primary" type="submit">تفعيل الخصم</button></form></section></div></section>
  <section class="tab-panel" data-panel="billing" role="tabpanel"><div id="billingStats" class="stats-grid"></div><div class="card mt-16"><div class="button-row"><button id="issueInvoice" class="btn btn-dark" type="button">تحديث الفواتير المستحقة</button><span class="muted small">تُحدّث الفواتير وفق دورة الحساب وحد السداد.</span></div></div><div class="dashboard-grid two mt-16"><section class="card"><h2>الفواتير</h2><div id="invoicesList"></div></section><section class="card"><h2>المدفوعات والإيصالات</h2><div id="paymentsList"></div></section></div><section class="card mt-16"><h2>سجل رسوم الوساطة</h2><div id="feesList"></div></section></section>
  <section class="tab-panel" data-panel="profile" role="tabpanel"><div class="dashboard-grid two"><section class="card"><h2>بيانات الشريك</h2><div id="profileData"></div></section><section class="card"><h2>إشعارات المنصة</h2><div id="notificationsList"></div></section></div><button id="logoutButton" class="btn btn-danger mt-16" type="button">تسجيل الخروج</button></section>
</div></main>
<dialog id="objectionDialog" class="dialog"><form method="dialog" class="dialog-shell" id="objectionForm"><div class="dialog-head"><div><div class="kicker">اعتراض</div><h2 id="objectionTitle">اعتراض</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div><input id="objectionReferralId" type="hidden"><input id="objectionRatingId" type="hidden"><input id="objectionInvoiceId" type="hidden"><input id="objectionType" type="hidden"><div class="form-field"><label class="required" for="objectionReason">السبب</label><select id="objectionReason" required></select></div><div id="requestedCostBandField" class="form-field mt-16" hidden><label for="requestedCostBand">فئة التكلفة المقترحة</label><select id="requestedCostBand"></select></div><div class="form-field mt-16"><label for="objectionDetails">التوضيح</label><textarea id="objectionDetails" maxlength="1000"></textarea></div><div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button class="btn btn-primary" type="submit" value="default">إرسال الاعتراض</button></div></form></dialog>
<div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/dashboard.js"></script></body></html>

```

## `workshop-login.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1d33">
  <meta name="description" content="دخول شركاء وين أوديها لإدارة الإحالات والتقييمات والخصومات والفواتير.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>دخول الشريك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="partner-login">
  <div data-site-header></div>
  <main id="main-content" class="section auth-section">
    <div class="container auth-layout">
      <section class="card auth-card">
        <div class="section-head"><div class="kicker">بوابة الشريك</div><h1>مرحبًا بعودتك</h1><p>أدخل رمز الشريك والرمز السري للوصول إلى الإحالات والحساب والفواتير.</p></div>
        <form id="loginForm" class="form-grid" novalidate>
          <div class="form-field"><label class="required" for="partnerCode">رمز الشريك</label><input id="partnerCode" autocomplete="username" placeholder="أدخل رمز الشريك" required></div>
          <div class="form-field"><label class="required" for="partnerPin">الرمز السري</label><input id="partnerPin" type="password" inputmode="numeric" autocomplete="current-password" placeholder="••••" maxlength="8" required></div>
          <button class="btn btn-primary btn-block" data-icon="partner" type="submit">دخول لوحة الشريك</button>
        </form>
      </section>
      <aside class="auth-aside">
        <div class="card-icon" data-icon="shield" aria-hidden="true"></div>
        <h2>كل أعمالك في مكان واحد</h2>
        <ul class="feature-checklist">
          <li>متابعة الإحالات وتحديث حالتها.</li>
          <li>إدارة الخصومات والتقييمات والاعتراضات.</li>
          <li>مراجعة الرصيد والفواتير والمدفوعات.</li>
        </ul>
        <div class="legal-note">حافظ على سرية بيانات الدخول، وسجّل الخروج عند استخدام جهاز مشترك.</div>
        <a class="btn btn-light btn-block mt-16" data-icon="plus" href="join.html">انضم إلى شبكة الشركاء</a>
      </aside>
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
