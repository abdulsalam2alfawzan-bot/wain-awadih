# الكود الكامل للملفات المتغيرة فقط

عدد الملفات: 23

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
    "index.html": "ابدأ من المسار الرئيسي أو اختر خدمة أخرى، وستظهر لك الخطوات المطلوبة فقط.",
    "customer.html": "أكمل الحقول الظاهرة فقط؛ يحفظ تقدمك تلقائيًا على هذا الجهاز.",
    "track.html": "من هنا تتابع الإحالة وتتواصل وتطلب بديلًا وتقيّم تجربتك.",
    "join.html": "اختر نوع نشاطك لتظهر الحقول المرتبطة به دون متطلبات زائدة.",
    "join-status.html": "استخدم رقم طلب الانضمام والجوال للاطلاع على آخر حالة مسجلة.",
    "workshop-login.html": "سجّل الدخول لعرض الإحالات والرسوم والخصومات وبيانات الشريك.",
    "workshop-dashboard.html": "تُحفظ كل تحديثات الإحالات والخصومات والاعتراضات والفواتير مباشرة.",
    "payment.html": "راجع الفاتورة قبل تسجيل السداد؛ لا تُحفظ بيانات بطاقة مصرفية.",
    "receipt.html": "يمكن طباعة الإيصال أو الرجوع إلى لوحة الشريك لمراجعة الحساب.",
    "privacy.html": "توضح السياسة البيانات المطلوبة لتشغيل الطلب وكيفية استخدامها.",
    "terms.html": "راجع حدود دور المنصة ومسؤولية مقدم الخدمة وآلية الرسوم.",
    "404.html": "ارجع إلى الرئيسية أو افتح متابعة الطلب للوصول إلى المسار الصحيح."
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
    const mapLink = partner.googleMapsUrl ? `<a class="text-link" href="${escapeHtml(partner.googleMapsUrl)}" target="_blank" rel="noopener noreferrer">فتح الموقع على خرائط Google</a>` : "";
    return `<article class="partner-card ${compact ? "partner-card-compact" : ""}">
      <div class="partner-head"><div><span class="pill">${escapeHtml(WA.Config.partnerTypes[partner.type] || partner.type)}</span><h2>${escapeHtml(partner.name)}</h2><p>${escapeHtml(partner.region || "")} — ${escapeHtml(partner.city)} — ${escapeHtml(partner.address || partner.exactLocation || "")}</p>${mapLink}</div><div class="rating-block">${ratingHtml}</div></div>
      <div class="partner-metrics"><div><span>عدالة الأسعار</span><strong>${escapeHtml(partner.fairnessRating || "—")} / 5</strong><small>${escapeHtml(partner.fairnessCount || 0)} تقييمًا موثقًا</small></div><div><span>الالتزام</span><strong>${escapeHtml(partner.commitment || "—")}</strong><small>مؤشر أداء الشريك</small></div><div><span>ساعات اليوم</span><strong>${escapeHtml(scheduleForToday(partner))}</strong><small>تأكد من الموعد عبر واتساب</small></div></div>
      <div class="info-panel"><strong>سبب الترشيح</strong><p>${escapeHtml(matchReason || referral?.matchReason || "مطابق لنوع الخدمة والمدينة.")}</p></div>
      <div class="info-panel muted"><strong>التوفر</strong><p>${escapeHtml(availabilityText(partner))}</p></div>${discountHtml}
    </article>`;
  };

  const injectLayout = () => {
    qsa("[data-site-header]").forEach((slot) => {
      slot.innerHTML = `<header class="site-header"><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="utility-strip"><div class="container utility-actions"><a class="utility-btn" href="index.html" aria-label="الانتقال إلى الرئيسية">⌂ <span>الرئيسية</span></a><button class="utility-btn" type="button" data-go-back aria-label="العودة إلى الصفحة السابقة">↩ <span>السابق</span></button></div></div><div class="container nav-shell"><a class="brand" href="index.html" aria-label="الصفحة الرئيسية"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>توجيه وإحالة ذكية</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mainNav">القائمة</button><nav id="mainNav" class="main-nav" aria-label="التنقل الرئيسي"><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">بوابة الشريك</a></nav></div></header>`;
      const toggle = qs(".nav-toggle", slot);
      const nav = qs(".main-nav", slot);
      toggle?.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("open", !open); });
      qs("[data-go-back]", slot)?.addEventListener("click", () => { if (history.length > 1) history.back(); else location.href = "index.html"; });
    });
    const page = location.pathname.split("/").pop() || "index.html";
    qsa("[data-site-footer]").forEach((slot) => {
      slot.innerHTML = `<footer class="site-footer"><div class="container page-guidance"><strong>معلومة سريعة</strong><p>${escapeHtml(pageGuidance[page] || "استخدم أزرار الرئيسية والسابق أعلى الصفحة للتنقل بسهولة.")}</p></div><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>توجيه وإحالة ذكية</small></span></a><p>منصة تساعدك على الوصول إلى مقدم الخدمة المناسب، بينما يبقى الفحص والتنفيذ والاتفاق المالي مسؤولية مقدم الخدمة.</p></div><div><strong>روابط مهمة</strong><a href="privacy.html">سياسة الخصوصية</a><a href="terms.html">الشروط وحدود المسؤولية</a><a href="track.html">متابعة الطلب</a></div><div><strong>للشركاء</strong><a href="join.html">طلب انضمام</a><a href="join-status.html">حالة الطلب</a><a href="workshop-login.html">تسجيل الدخول</a></div></div><div class="container footer-bottom"><span>© 2026 وين أوديها</span><span>واجهة ويب عربية متجاوبة</span></div></footer>`;
    });
  };

  const initSelect = (select, options, placeholder = "اختر") => { if (select) select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}`; };
  const setButtonBusy = (button, busy, text = "جاري التنفيذ...") => { if (!button) return; if (busy) { button.dataset.originalText = button.textContent; button.textContent = text; button.disabled = true; button.setAttribute("aria-busy", "true"); } else { button.textContent = button.dataset.originalText || button.textContent; button.disabled = false; button.removeAttribute("aria-busy"); } };
  const setActiveNav = () => { const page = location.pathname.split("/").pop() || "index.html"; qsa(".main-nav a").forEach((link) => { if (link.getAttribute("href").split("?")[0] === page) link.setAttribute("aria-current", "page"); }); };
  const init = () => { WA.Storage.init(); WA.Seed.run(); WA.Lifecycle.runSweep(); injectLayout(); setActiveNav(); document.documentElement.classList.add("js"); document.body.classList.add("page-ready"); };

  WA.UI = { qs, qsa, escapeHtml, formatDate, formatMoney, serviceLabel, statusLabel, showToast, copyText, whatsappUrl, buildWhatsappMessage, availabilityText, renderStars, renderPartnerCard, getRequestBundle, initSelect, setButtonBusy, vehicleText, scheduleForToday };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
```

## `assets/config.js`

```javascript
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
    const titles={ problem:["وش المشكلة في سيارتك؟","اكتب الوصف بطريقتك، ثم ستجيب عن أربعة أسئلة مخصصة."], parts:["وش القطعة المطلوبة؟","اكتب الاسم بدقة، وأضف رقم الهيكل إن توفر، واختر وكالة أو تجارية."], tow:["طلب سطحة عاجل","أكد موقع السيارة ووصف المكان وحالتها والوجهة إن كانت معروفة."], maintenance:["وش الصيانة المطلوبة؟","اختر الخدمة وأضف ملاحظة عند الحاجة."] };
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

  const renderReview = () => { const data=[["الخدمة",WA.Config.serviceTypes[state.serviceType]],["السيارة",WA.UI.vehicleText(state.vehicle)],["المنطقة",state.region],["المدينة",state.city]]; if(state.serviceType==="parts")data.push(["رقم الهيكل",state.vehicle.vin||"لم يدخل"],["القطعة",state.partName],["النوع",state.partType]); if(state.serviceType==="tow")data.push(["الموقع",state.preciseLocation],["وصف المكان",state.placeDescription],["حالة الحركة",state.vehicleMoves],["الوجهة",state.towDestination||"غير محددة"]); if(state.serviceType==="maintenance")data.push(["الصيانة",state.maintenanceService],["نوع الوقود",state.vehicle.fuelType],["الممشى",state.vehicle.mileage]); $("#reviewContent").innerHTML=data.map(([label,value])=>`<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value)}</strong></div>`).join(""); const notes={parts:"توفر القطعة وسعرها ومطابقتها يتم التأكد منها مباشرة مع المحل، ويفضل تزويده برقم الهيكل.",tow:"وقت الوصول والسعر يتأكدان مباشرة مع مقدم السطحة. الطلب مصنف عاجل.",maintenance:"السعر والموعد والتفاصيل النهائية تتفق عليها مباشرة مع مركز الصيانة."}; $("#serviceDisclaimer").textContent=notes[state.serviceType]||""; showScreen("review"); };

  const payload = () => ({ requestId:state.requestId, serviceType:state.serviceType, customer:state.customer, consents:state.consents, vehicle:state.vehicle, region:state.region, city:state.city, preciseLocation:state.preciseLocation, locationCoordinates:state.locationCoordinates, placeDescription:state.placeDescription, problem:state.problem, partName:state.partName, partType:state.partType, vehicleMoves:state.vehicleMoves, towDestination:state.towDestination, notes:state.serviceType==="tow"?state.towNotes:state.maintenanceNotes, maintenanceService:state.maintenanceService, ai:state.serviceType==="problem"?{...state.ai,questions:state.questions,answers:state.answers}:null });

  const runMatching = () => { showScreen("matching"); let created; try{created=WA.Lifecycle.createRequest(payload());state.requestId=created.request.id;}catch(error){WA.UI.showToast(error.message,"error");showScreen("path");return;} animate(".flow-screen[data-screen='matching'] .loader-step",()=>{ const excluded=WA.Storage.get("wa_referrals").filter((row)=>row.requestId===created.request.id).map((row)=>row.partnerId); const result=WA.Matching.match({request:created.request,excludedPartnerIds:excluded}); if(!result.partner){WA.Storage.upsert("wa_requests",{...created.request,status:"no_match",lastActivityAt:WA.Storage.now()});$("#noMatchReason").textContent=result.reason;showScreen("noMatch");return;} try{const referral=WA.Lifecycle.createReferral(created.request.id,result.partner.id,result.reason);state.referralId=referral.id;WA.Lifecycle.markReferralShown(referral.id);renderResult(created.request.id,referral.id);}catch(error){WA.UI.showToast(error.message,"error");showScreen("noMatch");} }); };

  const alternativeLabel = (type) => ({ problem:"أريد ورشة أخرى", parts:"أريد محلًا آخر", tow:"أريد سطحة أخرى", maintenance:"أريد مركزًا آخر" }[type] || "أريد شريكًا آخر");
  const renderResult = (requestId,referralId) => {
    const request=WA.Storage.findById("wa_requests",requestId);
    const referral=WA.Storage.findById("wa_referrals",referralId);
    const bundle=WA.UI.getRequestBundle(request);
    if(!bundle?.partner)return;
    const {customer,vehicle,partner,discount}=bundle;
    $("#resultHeader").innerHTML=`<strong>تم إنشاء طلبك وترشيح الشريك</strong><p>رقم الطلب: ${WA.UI.escapeHtml(request.humanId)}</p>`;
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
    $("#findPartner").addEventListener("click",()=>{if(state.ai?.urgency==="خطرة"){selectService("tow");state.screen="location";showScreen("location");WA.UI.showToast("تم تحويلك إلى مسار السطحة العاجل. شارك موقع السيارة.","info");}else runMatching();});
    $("#reviewMatch").addEventListener("click",runMatching);
    $$('input,select,textarea').forEach((field)=>field.addEventListener("change",()=>{sync();saveDraft();}));
  };

  const init = () => { initData(); const params=new URLSearchParams(location.search); if(params.get("fresh")==="1")WA.Lifecycle.clearDraft(); const draft=params.get("fresh")==="1"?null:WA.Lifecycle.loadDraft(); if(draft)state={...defaultState(),...draft,customer:{...defaultState().customer,...draft.customer},vehicle:{...defaultState().vehicle,...draft.vehicle},consents:{...defaultState().consents,...draft.consents}}; const service=params.get("service"); if(validServices.includes(service))state.serviceType=service; hydrate(); bind(); if(state.serviceType)selectService(state.serviceType); showScreen(draft?.screen&&progress[draft.screen]?draft.screen:"service",false); if(state.screen==="questions"&&state.questions.length)renderQuestion(); if(state.screen==="guidance"&&state.ai)renderGuidance(); };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
```

## `assets/dashboard.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  const $$ = WA.UI.qsa;
  let partner = null;

  const getSession = () => WA.Storage.get("wa_sessions").find((row)=>row.type==="partner_session"&&new Date(row.expiresAt).getTime()>Date.now())||null;
  const referrals = () => WA.Storage.get("wa_referrals").filter((row)=>row.partnerId===partner.id).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const fees = () => WA.Storage.get("wa_fees").filter((row)=>row.partnerId===partner.id);
  const invoices = () => WA.Storage.get("wa_invoices").filter((row)=>row.partnerId===partner.id).sort((a,b)=>new Date(b.issuedAt||b.createdAt)-new Date(a.issuedAt||a.createdAt));
  const payments = () => WA.Storage.get("wa_payments").filter((row)=>row.partnerId===partner.id).sort((a,b)=>new Date(b.paidAt)-new Date(a.paidAt));
  const ratings = () => WA.Storage.get("wa_ratings").filter((row)=>row.partnerId===partner.id).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const objections = () => WA.Storage.get("wa_objections").filter((row)=>row.partnerId===partner.id).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
  const table = (headers,rows,empty="لا توجد بيانات") => rows.length?`<div class="table-wrap"><table><thead><tr>${headers.map((h)=>`<th>${WA.UI.escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`:`<div class="empty-state"><p>${WA.UI.escapeHtml(empty)}</p></div>`;
  const costOptions = (selected="") => `<option value="">اختر</option>${Object.entries(WA.Config.costBands).map(([key,item])=>`<option value="${key}" ${selected===key?"selected":""}>${WA.UI.escapeHtml(item.label)}</option>`).join("")}`;

  const loadPartner = () => {const session=getSession();if(!session){location.replace("workshop-login.html");return false;}partner=WA.Storage.findById("wa_partners",session.partnerId);if(!partner){location.replace("workshop-login.html");return false;}return true;};
  const renderHeader = () => {$("#partnerHeader").innerHTML=`<div class="kicker">${WA.UI.escapeHtml(WA.Config.partnerTypes[partner.type])}</div><h1>${WA.UI.escapeHtml(partner.name)}</h1><p>${WA.UI.escapeHtml(partner.region||"")} — ${WA.UI.escapeHtml(partner.city)} — ساعات اليوم: ${WA.UI.escapeHtml(WA.UI.scheduleForToday(partner))}</p><div class="request-meta"><span>الشراكة: ${WA.UI.escapeHtml(partner.partnershipStatus)}</span><span>السداد: ${WA.UI.escapeHtml(partner.paymentStatus)}</span><span>الثقة: ${WA.UI.escapeHtml(partner.trustScore)}/100</span></div>`;};

  const renderOverview = () => {const refs=referrals();const allFees=fees();const allInvoices=invoices();const outstanding=allFees.filter((row)=>!["paid","exempt"].includes(row.status)).reduce((sum,row)=>sum+Number(row.amount||0),0);$("#overviewStats").innerHTML=[[refs.length,"إجمالي الإحالات"],[refs.filter((row)=>row.serviceReceivedAt).length,"خدمات مؤكدة"],[ratings().length,"تقييمات موثقة"],[WA.UI.formatMoney(outstanding),"رصيد رسوم غير مسدد"]].map(([value,label])=>`<div class="stat-card"><strong>${WA.UI.escapeHtml(value)}</strong><span>${WA.UI.escapeHtml(label)}</span></div>`).join("");$("#latestReferrals").innerHTML=`<div class="timeline">${refs.slice(0,5).map((ref)=>{const req=WA.Storage.findById("wa_requests",ref.requestId);return `<div class="timeline-item"><span>${ref.order}</span><div><strong>${WA.UI.escapeHtml(req?.humanId||ref.requestId)}</strong><p>${WA.UI.escapeHtml(WA.UI.statusLabel(ref.status,"referral"))}</p><small>${WA.UI.formatDate(ref.updatedAt)}</small></div></div>`;}).join("")||'<div class="empty-state"><p>لا توجد إحالات.</p></div>'}</div>`;const openInvoices=allInvoices.filter((row)=>["payment_required","overdue","under_review"].includes(row.status));$("#accountStatus").innerHTML=`<div class="guidance-grid"><div class="guidance-item"><span>حالة الشراكة</span><strong>${WA.UI.escapeHtml(partner.partnershipStatus)}</strong></div><div class="guidance-item"><span>حالة السداد</span><strong>${WA.UI.escapeHtml(partner.paymentStatus)}</strong></div><div class="guidance-item"><span>فواتير مفتوحة</span><strong>${openInvoices.length}</strong></div><div class="guidance-item"><span>حد السداد</span><strong>${WA.UI.formatMoney(WA.Config.paymentThreshold)}</strong></div></div><div class="legal-note">الرسوم حسب فئة تكلفة الخدمة: 0 أو 5 أو 10 أو 25 ريالًا، بعد تأكيد تلقي الخدمة.</div>`;};

  const renderReferrals = () => {
    const rows=referrals().map((ref)=>{const req=WA.Storage.findById("wa_requests",ref.requestId);const vehicle=req?WA.Storage.findById("wa_vehicles",req.vehicleId):null;const costSource=ref.costSource==="customer"?"العميل":ref.costSource==="partner"?"الشريك":"—";const costControl=ref.costBand?`<strong>${WA.UI.escapeHtml(WA.Lifecycle.bandLabel(ref.costBand))}</strong><small>المصدر: ${costSource}</small>${ref.costSource==="customer"?`<button class="btn btn-light btn-sm request-cost-change" type="button" data-referral-id="${ref.id}">طلب تعديل</button>`:""}`:`<select class="partner-cost-band" data-referral-id="${ref.id}">${costOptions()}</select><button class="btn btn-dark btn-sm save-partner-cost" type="button" data-referral-id="${ref.id}" ${!ref.serviceReceivedAt?"disabled":""}>تأكيد الفئة</button>`;return `<tr><td><strong>${WA.UI.escapeHtml(req?.humanId||"—")}</strong><br><small>${WA.UI.escapeHtml(WA.Config.serviceTypes[req?.serviceType]||"—")}</small></td><td>${WA.UI.escapeHtml(vehicle?WA.UI.vehicleText(vehicle):"—")}</td><td>${WA.UI.escapeHtml(req?.city||"—")}</td><td>${WA.UI.escapeHtml(WA.UI.statusLabel(ref.status,"referral"))}</td><td>${ref.serviceReceivedAt?`<strong>مؤكدة</strong><small>${WA.UI.formatDate(ref.serviceReceivedAt)}</small>`:`<button class="btn btn-primary btn-sm confirm-partner-service" type="button" data-referral-id="${ref.id}">تأكيد تلقي الخدمة</button>`}</td><td><div class="table-actions vertical">${costControl}</div></td><td><button class="btn btn-light btn-sm objection-referral" type="button" data-referral-id="${ref.id}">اعتراض</button></td></tr>`;});
    $("#referralsTable").innerHTML=table(["الطلب","السيارة","المدينة","الحالة","تلقي الخدمة","فئة التكلفة","إجراء"],rows,"لا توجد إحالات");
    $$(".confirm-partner-service").forEach((button)=>button.addEventListener("click",()=>{try{WA.Lifecycle.confirmServiceReceived(button.dataset.referralId,"partner");WA.UI.showToast("تم تأكيد تلقي الخدمة. أدخل فئة التكلفة إذا لم يدخلها العميل.","success");refresh();}catch(error){WA.UI.showToast(error.message,"error");}}));
    $$(".save-partner-cost").forEach((button)=>button.addEventListener("click",()=>{const select=$(`.partner-cost-band[data-referral-id="${button.dataset.referralId}"]`);if(!select.value){WA.UI.showToast("اختر فئة التكلفة","error");return;}try{WA.Lifecycle.registerCostBand(button.dataset.referralId,select.value,"partner","أؤكد صحة فئة التكلفة المدخلة");WA.UI.showToast("تم تأكيد فئة التكلفة واحتساب الرسم","success");refresh();}catch(error){WA.UI.showToast(error.message,"error");}}));
    $$(".request-cost-change").forEach((button)=>button.addEventListener("click",()=>openObjection("cost",button.dataset.referralId)));
    $$(".objection-referral").forEach((button)=>button.addEventListener("click",()=>openObjection("referral",button.dataset.referralId)));
  };

  const renderObjections = () => {const rows=objections().map((obj)=>{const req=obj.requestId?WA.Storage.findById("wa_requests",obj.requestId):null;return `<tr><td>${WA.UI.escapeHtml(obj.id)}</td><td>${WA.UI.escapeHtml(req?.humanId||obj.invoiceId||"—")}</td><td>${WA.UI.escapeHtml(obj.type)}</td><td>${WA.UI.escapeHtml(obj.reason)}</td><td>${WA.UI.escapeHtml(obj.status)}</td><td>${WA.UI.escapeHtml(obj.decision||"بانتظار المراجعة")}</td><td>${WA.UI.formatDate(obj.submittedAt)}</td></tr>`;});$("#objectionsTable").innerHTML=table(["رقم الاعتراض","المرجع","النوع","السبب","الحالة","القرار","التاريخ"],rows,"لا توجد اعتراضات");};
  const renderRatings = () => {const list=ratings();$("#ratingsList").innerHTML=list.length?list.map((rating)=>{const req=WA.Storage.findById("wa_requests",rating.requestId);return `<article class="card mt-16"><div class="button-row"><span class="status-badge">${WA.UI.escapeHtml(rating.status)}</span>${WA.UI.renderStars(rating.overall)}<strong>${rating.overall}/5</strong></div><h3>${WA.UI.escapeHtml(req?.humanId||rating.requestId)}</h3><div class="guidance-grid"><div class="guidance-item"><span>جودة التعامل</span><strong>${rating.treatment}/5</strong></div><div class="guidance-item"><span>الالتزام</span><strong>${rating.commitment}/5</strong></div><div class="guidance-item"><span>عدالة الأسعار</span><strong>${rating.fairness}/5</strong></div><div class="guidance-item"><span>فئة التكلفة</span><strong>${WA.UI.escapeHtml(WA.Lifecycle.bandLabel(rating.costBand))}</strong></div></div>${rating.comment?`<p>${WA.UI.escapeHtml(rating.comment)}</p>`:""}<button class="btn btn-light btn-sm objection-rating" type="button" data-referral-id="${rating.referralId}" data-rating-id="${rating.id}">اعتراض على التقييم</button></article>`;}).join(""):'<div class="empty-state"><p>لا توجد تقييمات موثقة.</p></div>';$$(".objection-rating").forEach((button)=>button.addEventListener("click",()=>openObjection("rating",button.dataset.referralId,button.dataset.ratingId)));};

  const renderDiscounts = () => {
    const list=WA.Storage.get("wa_discounts").filter((row)=>row.partnerId===partner.id);
    $("#discountsList").innerHTML=list.length?list.map((discount)=>{
      const scope=discount.scope==="all"?"جميع الخدمات":((discount.includedServices||[]).join("، ")||"خدمات مختارة");
      const duration=discount.continuousUntilStopped?"مستمر حتى الإيقاف":`حتى ${discount.endsAt||"—"}`;
      return `<div class="discount-box"><strong>${discount.percent}% — ${WA.UI.escapeHtml(discount.title)}</strong><span>${WA.UI.escapeHtml(scope)}</span><small>${WA.UI.escapeHtml(discount.conditions||"دون شروط إضافية")} — ${WA.UI.escapeHtml(duration)} — الحالة: ${WA.UI.escapeHtml(discount.status)}</small><button class="btn btn-light btn-sm disable-discount" type="button" data-id="${discount.id}" ${discount.status!=="approved"?"disabled":""}>إيقاف الخصم</button></div>`;
    }).join(""):'<div class="empty-state"><h3>لا توجد خصومات</h3><p>أنشئ خصمًا وحدد إن كان لجميع الخدمات أو لخدمات مختارة.</p></div>';
    $$(".disable-discount").forEach((button)=>button.addEventListener("click",()=>{
      const discount=WA.Storage.findById("wa_discounts",button.dataset.id);
      if(discount)WA.Storage.upsert("wa_discounts",{...discount,status:"inactive",stoppedAt:WA.Storage.now(),history:[...(discount.history||[]),{action:"stopped",at:WA.Storage.now()}]});
      WA.UI.showToast("تم إيقاف الخصم","success");renderDiscounts();
    }));
  };

  const renderBilling = () => {const allFees=fees();const allInvoices=invoices();const allPayments=payments();const outstanding=allFees.filter((row)=>!["paid","exempt"].includes(row.status)).reduce((sum,row)=>sum+Number(row.amount||0),0);const payable=allInvoices.filter((row)=>["payment_required","overdue"].includes(row.status)).reduce((sum,row)=>sum+Number(row.amount||0),0);const paid=allPayments.reduce((sum,row)=>sum+Number(row.amount||0),0);$("#billingStats").innerHTML=[[WA.UI.formatMoney(outstanding),"الرصيد المتراكم"],[WA.UI.formatMoney(payable),"واجب السداد"],[WA.UI.formatMoney(paid),"إجمالي المدفوع"],[WA.UI.formatMoney(WA.Config.paymentThreshold),"حد السداد الإلزامي"]].map(([v,l])=>`<div class="stat-card"><strong>${v}</strong><span>${l}</span></div>`).join("");
    const invoiceRows=allInvoices.map((inv)=>{const canObject=inv.objectionDeadline&&new Date(inv.objectionDeadline).getTime()>=Date.now()&&!['paid'].includes(inv.status);return `<tr><td>${WA.UI.escapeHtml(inv.number||inv.id)}</td><td>${WA.UI.escapeHtml(inv.cycle||"—")}</td><td>${WA.UI.formatMoney(inv.amount)}</td><td>${WA.UI.escapeHtml(inv.status)}</td><td>${WA.UI.formatDate(inv.objectionDeadline)}</td><td><div class="table-actions">${["payment_required","overdue"].includes(inv.status)?`<a class="btn btn-primary btn-sm" href="payment.html?invoice=${encodeURIComponent(inv.id)}">سداد</a>`:""}${canObject?`<button class="btn btn-light btn-sm objection-invoice" type="button" data-invoice-id="${inv.id}">اعتراض</button>`:""}</div></td></tr>`;});$("#invoicesList").innerHTML=table(["الفاتورة","الدورة","الإجمالي","الحالة","نهاية الاعتراض","إجراء"],invoiceRows,"لا توجد فواتير");
    const paymentRows=allPayments.map((p)=>`<tr><td>${WA.UI.escapeHtml(p.receiptNumber)}</td><td>${WA.UI.formatMoney(p.amount)}</td><td>${WA.UI.escapeHtml(p.method)}</td><td>${WA.UI.formatDate(p.paidAt)}</td><td><a class="btn btn-light btn-sm" href="receipt.html?payment=${encodeURIComponent(p.id)}">الإيصال</a></td></tr>`);$("#paymentsList").innerHTML=table(["الإيصال","المبلغ","الطريقة","التاريخ","عرض"],paymentRows,"لا توجد مدفوعات");
    const feeRows=allFees.map((fee)=>{const req=WA.Storage.findById("wa_requests",fee.requestId);return `<tr><td>${WA.UI.escapeHtml(req?.humanId||"—")}</td><td>${WA.UI.escapeHtml(fee.costBandLabel||"—")}</td><td>${WA.UI.formatMoney(fee.amount)}</td><td>${WA.UI.escapeHtml(fee.status)}</td><td>${WA.UI.formatDate(fee.eligibleAt)}</td></tr>`;});$("#feesList").innerHTML=table(["الطلب","فئة التكلفة","الرسم","الحالة","التاريخ"],feeRows,"لا توجد رسوم");$$(".objection-invoice").forEach((button)=>button.addEventListener("click",()=>openObjection("invoice","","",button.dataset.invoiceId)));};

  const renderProfile = () => {const scheduleHtml=(partner.schedule||[]).map((row)=>{const hours=!row.open?"مغلق":row.allDay?"24 ساعة":[row.period1,row.period2].filter(Boolean).map((slot)=>`${slot.from}–${slot.to}`).join("، ");return `<div class="schedule-summary-row"><strong>${WA.UI.escapeHtml(row.day)}</strong><span>${WA.UI.escapeHtml(hours)}</span></div>`;}).join("");const typeRows=[];if(partner.type==="tow")typeRows.push(["بطاقة التشغيل",partner.operationCardNumber||"—"],["انتهاء البطاقة",partner.operationCardExpiry||"—"],["لوحة السطحة",partner.towVehiclePlate||"—"],["المركبات الممكن نقلها",Array.isArray(partner.towVehicleTypes)?partner.towVehicleTypes.join("، "):partner.towVehicleTypes||"—"]);if(partner.type==="workshop")typeRows.push(["التخصصات حسب الأولوية",(partner.specialtiesPriority||partner.specialties||[]).join(" ← ")],["العلامات حسب الأولوية",(partner.makesPriority||partner.servedMakes||[]).join(" ← ")],["أنواع الوقود",(partner.fuelTypes||[]).join("، ")]);if(partner.type==="maintenance")typeRows.push(["خدمات الصيانة",(partner.services||[]).join("، ")],["العلامات",(partner.makesPriority||partner.servedMakes||[]).join(" ← ")],["أنواع الوقود",(partner.fuelTypes||[]).join("، ")]);if(partner.type==="parts")typeRows.push(["أنواع القطع",(partner.partTypes||[]).join("، ")],["العلامات",(partner.makesPriority||partner.servedMakes||[]).join(" ← ")]);$("#profileData").innerHTML=`<div class="guidance-grid"><div class="guidance-item"><span>النوع</span><strong>${WA.UI.escapeHtml(WA.Config.partnerTypes[partner.type])}</strong></div><div class="guidance-item"><span>الوصف</span><strong>${WA.UI.escapeHtml(partner.description||"—")}</strong></div><div class="guidance-item"><span>المنطقة والمدينة</span><strong>${WA.UI.escapeHtml(`${partner.region||""} — ${partner.city}`)}</strong></div><div class="guidance-item"><span>التغطية</span><strong>${WA.UI.escapeHtml((partner.coverageCities||[]).join("، "))}</strong></div>${typeRows.map(([label,value])=>`<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value)}</strong></div>`).join("")}</div><div class="schedule-summary mt-16"><h3>ساعات العمل</h3>${scheduleHtml||'<p class="muted">لم تسجل ساعات العمل.</p>'}</div>`;const list=partner.notifications||[];$("#notificationsList").innerHTML=list.length?list.map((n)=>`<div class="info-panel"><strong>${WA.UI.escapeHtml(n.text)}</strong><p>${WA.UI.formatDate(n.createdAt)}</p></div>`).join(""):'<div class="empty-state"><h3>لا توجد إشعارات</h3><p>ستظهر هنا تحديثات الحساب والفواتير والإحالات.</p></div>';};

  const openObjection = (type,referralId="",ratingId="",invoiceId="") => {$("#objectionType").value=type;$("#objectionReferralId").value=referralId;$("#objectionRatingId").value=ratingId;$("#objectionInvoiceId").value=invoiceId;$("#requestedCostBandField").hidden=type!=="cost";$("#requestedCostBand").innerHTML=costOptions();const reasons={rating:["التقييم لا يخص المنشأة","العميل لم يتعامل معنا","الخدمة لم تقدم لدينا","معلومات غير صحيحة","إساءة أو بيانات شخصية","سبب آخر"],referral:["العميل لم يصل","تواصل فقط","لم نقدم خدمة","الخدمة لدى شريك آخر","طلب غير معروف","عملية مكررة","سبب آخر"],cost:["فئة التكلفة المدخلة غير صحيحة","العميل أدخل فئة قبل الاتفاق النهائي","سبب آخر"],invoice:["الخدمة لم تقدم","فئة التكلفة غير صحيحة","الطلب لا يخص الشريك","عملية مكررة","سبب آخر"]};$("#objectionTitle").textContent={rating:"اعتراض على تقييم",referral:"اعتراض على تلقي الخدمة",cost:"طلب تعديل فئة التكلفة",invoice:"اعتراض على فاتورة"}[type]||"اعتراض";WA.UI.initSelect($("#objectionReason"),reasons[type]||["سبب آخر"],"اختر السبب");$("#objectionDetails").value="";$("#objectionDialog").showModal();};
  const handleObjection = (event) => {event.preventDefault();const form=$("#objectionForm");if(!form.checkValidity()){form.reportValidity();return;}try{WA.Lifecycle.createObjection({partnerId:partner.id,referralId:$("#objectionReferralId").value,ratingId:$("#objectionRatingId").value,invoiceId:$("#objectionInvoiceId").value,type:$("#objectionType").value,reason:$("#objectionReason").value,details:$("#objectionDetails").value,requestedCostBand:$("#requestedCostBand").value});$("#objectionDialog").close();WA.UI.showToast("تم تسجيل الاعتراض وتحويله للمراجعة","success");refresh();}catch(error){WA.UI.showToast(error.message,"error");}};
  const discountScope = () => document.querySelector('input[name="discountScope"]:checked')?.value || "all";
  const updateDiscountForm = () => {const selected=discountScope()==="selected";$("#discountServicesField").hidden=!selected;const continuous=$("#discountContinuous").checked;$("#discountEndField").hidden=continuous;$("#discountEnd").required=!continuous;};
  const handleDiscount = (event) => {event.preventDefault();const form=$("#discountForm");if(!form.checkValidity()){form.reportValidity();return;}if(!$("#discountContinuous").checked&&$("#discountEnd").value<$("#discountStart").value){WA.UI.showToast("تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية","error");return;}const scope=discountScope();WA.Storage.upsert("wa_discounts",{id:WA.Storage.createId("DISC"),partnerId:partner.id,title:"خصم عملاء وين أوديها",percent:Number($("#discountPercent").value),scope,includedServices:scope==="all"?["جميع الخدمات"]:[WA.Storage.sanitizeText($("#discountServices").value,500)].filter(Boolean),conditions:WA.Storage.sanitizeText($("#discountConditions").value,700),startsAt:$("#discountStart").value,endsAt:$("#discountContinuous").checked?"":$("#discountEnd").value,continuousUntilStopped:$("#discountContinuous").checked,status:"approved",approvedAt:WA.Storage.now(),history:[{action:"created",at:WA.Storage.now()}]});form.reset();$("#discountContinuous").checked=true;document.querySelector('input[name="discountScope"][value="all"]').checked=true;updateDiscountForm();WA.UI.showToast("تم تفعيل الخصم","success");renderDiscounts();};

  const refresh = () => {partner=WA.Storage.findById("wa_partners",partner.id)||partner;renderHeader();renderOverview();renderReferrals();renderObjections();renderRatings();renderDiscounts();renderBilling();renderProfile();};
  const initTabs = () => {$$(".tab-btn").forEach((button)=>button.addEventListener("click",()=>{$$(".tab-btn").forEach((item)=>{item.classList.toggle("active",item===button);item.setAttribute("aria-selected",String(item===button));});$$(".tab-panel").forEach((panel)=>panel.classList.toggle("active",panel.dataset.panel===button.dataset.tab));}));};
  const init = () => {if(!loadPartner())return;initTabs();$("#objectionForm").addEventListener("submit",handleObjection);$("#discountForm").addEventListener("submit",handleDiscount);$$('input[name="discountScope"]').forEach((input)=>input.addEventListener("change",updateDiscountForm));$("#discountContinuous").addEventListener("change",updateDiscountForm);updateDiscountForm();$("#issueInvoice").addEventListener("click",()=>{const before=new Set(invoices().map((row)=>row.id));WA.Lifecycle.maybeIssueInvoices();const created=invoices().find((row)=>!before.has(row.id));WA.UI.showToast(created?"تم إصدار فاتورة وفق السياسة":"لا توجد فاتورة جديدة: لم يبلغ الرصيد 100 ريال وليس يوم الإصدار الشهري",created?"success":"info");refresh();});$("#logoutButton").addEventListener("click",()=>{WA.Storage.remove("wa_sessions",(row)=>row.type==="partner_session");location.replace("workshop-login.html");});refresh();};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
```

## `assets/join-status.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  const show = (name) => { $("#joinLookup").hidden = name !== "lookup"; $("#joinResult").hidden = name !== "result"; $("#joinNotFound").hidden = name !== "notFound"; };
  const render = (application) => {
    $("#joinResultContent").innerHTML = `<div class="section-head"><div class="kicker">${WA.UI.escapeHtml(application.applicationNumber)}</div><h1>${WA.UI.escapeHtml(application.businessName)}</h1><p>${WA.UI.escapeHtml(application.statusLabel || application.status || "قيد المراجعة")}</p></div><div class="guidance-grid"><div class="guidance-item"><span>نوع الشريك</span><strong>${WA.UI.escapeHtml(WA.Config.partnerTypes[application.partnerType])}</strong></div><div class="guidance-item"><span>الموقع</span><strong>${WA.UI.escapeHtml([application.region, application.city].filter(Boolean).join(" — "))}</strong></div><div class="guidance-item"><span>التغطية</span><strong>${WA.UI.escapeHtml((application.coverageCities || [application.city].filter(Boolean)).join("، "))}</strong></div><div class="guidance-item"><span>تاريخ التقديم</span><strong>${WA.UI.formatDate(application.submittedAt)}</strong></div></div><div class="legal-note">حالة الطلب المعروضة هي آخر حالة محفوظة في النظام.</div>`;
    show("result");
  };
  const init = () => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      const app = WA.Storage.get("wa_join_applications").find((row) => row.publicToken === token);
      app ? render(app) : show("notFound");
    } else show("lookup");
    $("#joinLookupForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const number = WA.Storage.sanitizeText($("#joinNumber").value, 30).toUpperCase();
      const phone = WA.Storage.sanitizePhone($("#joinPhone").value);
      const app = WA.Storage.get("wa_join_applications").find((row) => row.applicationNumber === number && row.phone === phone);
      app ? render(app) : show("notFound");
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
```

## `assets/join.js`

```javascript
(() => {
  "use strict";
  const $ = WA.UI.qs;
  const $$ = WA.UI.qsa;
  let step = 1;
  let selectedSpecialties = [];
  let selectedMakes = [];
  const selectedValues = (select) => [...select.selectedOptions].map((option) => option.value);
  const checkedValues = (selector) => $$(selector).filter((input) => input.checked).map((input) => input.value);
  const progress = {1:[20,"البيانات الأساسية"],2:[40,"ساعات العمل"],3:[60,"الخدمات والتغطية"],4:[80,"الخصم"],5:[100,"الموافقات"]};

  const showStep = (next) => {
    step = next;
    $$('[data-join-step]').forEach((section) => section.classList.toggle("active", Number(section.dataset.joinStep) === step));
    $("#joinSuccess").classList.remove("active");
    const [percent,label] = progress[step];
    $("#joinProgressBar").style.width = `${percent}%`;
    $("#joinProgressPercent").textContent = `${percent}%`;
    $("#joinProgressLabel").textContent = label;
    $(".progress-track").setAttribute("aria-valuenow", String(percent));
    const active = $(`[data-join-step="${step}"]`);
    active?.focus();
    active?.scrollIntoView({behavior:"smooth",block:"start"});
  };

  const renderPriority = (availableId, selectedId, source, selected, setter, primaryLabel) => {
    const available = $(availableId);
    const ordered = $(selectedId);
    available.innerHTML = source.filter((item) => !selected.includes(item)).map((item) => `<button class="selector-item" type="button" data-add="${WA.UI.escapeHtml(item)}">${WA.UI.escapeHtml(item)} <span>+</span></button>`).join("") || '<p class="muted">تم اختيار جميع العناصر المتاحة.</p>';
    ordered.innerHTML = selected.map((item,index) => `<li><span><strong>${index+1}</strong>${WA.UI.escapeHtml(item)}${index===0?`<small>${WA.UI.escapeHtml(primaryLabel)}</small>`:""}</span><span class="priority-actions"><button type="button" data-up="${index}" aria-label="رفع الأولوية">↑</button><button type="button" data-down="${index}" aria-label="خفض الأولوية">↓</button><button type="button" data-remove="${index}" aria-label="إزالة">×</button></span></li>`).join("") || '<li class="muted">لم تختر شيئًا بعد.</li>';
    $$('[data-add]',available).forEach((button) => button.addEventListener("click", () => setter([...selected,button.dataset.add])));
    $$('[data-remove]',ordered).forEach((button) => button.addEventListener("click", () => {const next=[...selected];next.splice(Number(button.dataset.remove),1);setter(next);}));
    $$('[data-up]',ordered).forEach((button) => button.addEventListener("click", () => {const i=Number(button.dataset.up);if(i<1)return;const next=[...selected];[next[i-1],next[i]]=[next[i],next[i-1]];setter(next);}));
    $$('[data-down]',ordered).forEach((button) => button.addEventListener("click", () => {const i=Number(button.dataset.down);if(i>=selected.length-1)return;const next=[...selected];[next[i+1],next[i]]=[next[i],next[i+1]];setter(next);}));
  };
  const setSpecialties = (next) => {selectedSpecialties=next;renderPriority("#availableSpecialties","#selectedSpecialties",WA.Automotive.specialties,selectedSpecialties,setSpecialties,"التخصص الرئيسي");};
  const setMakes = (next) => {selectedMakes=next;renderPriority("#availableMakes","#selectedMakes",["جميع الشركات",...WA.Automotive.makes.filter((item)=>item!=="أخرى"),"أخرى"],selectedMakes,setMakes,"الأولوية الأولى");};

  const updateCities = () => {
    const region = $("#joinRegion").value;
    const city = $("#joinCity");
    if (!region) {city.disabled=true;city.innerHTML='<option value="">اختر المنطقة أولًا</option>';return;}
    city.disabled=false;
    WA.UI.initSelect(city,WA.Automotive.getCities(region),"اختر المدينة");
    updateCoverage();
  };
  const updateCoverage = () => {
    const region=$("#joinRegion").value;
    const basic=$("#joinCity").value;
    const current=selectedValues($("#coverageCities"));
    $("#coverageCities").innerHTML=WA.Automotive.getCities(region).map((city)=>`<option value="${WA.UI.escapeHtml(city)}" ${(current.includes(city)||city===basic)?"selected":""}>${WA.UI.escapeHtml(city)}</option>`).join("");
  };

  const setRequired = (ids, required) => ids.forEach((id) => {const field=$("#"+id);if(field)field.required=required;});
  const updateAdaptive = () => {
    const type=$("#partnerType").value;
    const businessType=["workshop","maintenance","parts"].includes(type);
    $("#businessDocuments").hidden=!businessType;
    setRequired(["commercialRegistration","registeredName"],businessType);
    $("#towDocuments").hidden=type!=="tow";
    setRequired(["operationCardNumber","operationCardExpiry","towVehiclePlate"],type==="tow");
    $("#workshopAdaptive").hidden=type!=="workshop";
    $("#makeAndFuelAdaptive").hidden=!["workshop","maintenance","parts"].includes(type);
    $("#fuelTypesField").hidden=type==="parts";
    $("#towAdaptive").hidden=type!=="tow";
    $("#maintenanceAdaptive").hidden=type!=="maintenance";
    $("#partsAdaptive").hidden=type!=="parts";
    $("#towVehicleTypes").required=type==="tow";
    $("#maintenanceServicesJoin").required=type==="maintenance";
    $("#makeSectionTitle").textContent=type==="parts"?"الشركات المصنعة التي يوفر لها قطعًا":type==="maintenance"?"الشركات المصنعة التي يخدمها المركز":"الشركات المصنعة التي تخدمها الورشة";
    if(type!=="workshop")selectedSpecialties=[];
    setSpecialties(selectedSpecialties);
  };

  const timeOptions = () => WA.Automotive.timeOptions().map((time)=>`<option value="${time}">${time}</option>`).join("");
  const renderSchedule = () => {
    const options=timeOptions();
    $("#dailyScheduleEditor").innerHTML=WA.Automotive.weekdays.map((day,index)=>{
      const open=day!=="الجمعة";
      return `<article class="day-schedule" data-day="${WA.UI.escapeHtml(day)}">
        <div class="day-schedule-head"><label class="switch-line"><input class="day-open" type="checkbox" ${open?"checked":""}><span>${WA.UI.escapeHtml(day)}</span></label><label class="checkbox-line"><input class="day-all-day" type="checkbox" ${open?"":"disabled"}><span>24 ساعة</span></label></div>
        <div class="day-periods" ${open?"":"hidden"}>
          <div class="period-row"><strong>الفترة الأولى</strong><label>من<select class="p1-from">${options}</select></label><label>إلى<select class="p1-to">${options}</select></label></div>
          <label class="checkbox-line second-period-toggle"><input class="second-enabled" type="checkbox"><span>إضافة فترة ثانية</span></label>
          <div class="period-row second-period" hidden><strong>الفترة الثانية</strong><label>من<select class="p2-from">${options}</select></label><label>إلى<select class="p2-to">${options}</select></label></div>
        </div>
      </article>`;
    }).join("");
    $$(".day-schedule").forEach((card)=>{
      card.querySelector(".p1-from").value="08:00";card.querySelector(".p1-to").value="12:00";card.querySelector(".p2-from").value="16:00";card.querySelector(".p2-to").value="22:00";
      const refresh=()=>{const open=card.querySelector(".day-open").checked;const allDay=card.querySelector(".day-all-day").checked;card.querySelector(".day-periods").hidden=!open;card.querySelector(".day-all-day").disabled=!open;card.querySelectorAll("select,.second-enabled").forEach((field)=>field.disabled=!open||allDay);if(!open)card.querySelector(".day-all-day").checked=false;card.querySelector(".second-period").hidden=!card.querySelector(".second-enabled").checked||!open||allDay;};
      card.querySelector(".day-open").addEventListener("change",refresh);card.querySelector(".day-all-day").addEventListener("change",refresh);card.querySelector(".second-enabled").addEventListener("change",refresh);refresh();
    });
  };
  const schedule = () => $$(".day-schedule").map((card)=>{
    const open=card.querySelector(".day-open").checked;
    const allDay=open&&card.querySelector(".day-all-day").checked;
    const second=open&&!allDay&&card.querySelector(".second-enabled").checked;
    return {day:card.dataset.day,open,allDay,period1:open&&!allDay?{from:card.querySelector(".p1-from").value,to:card.querySelector(".p1-to").value}:null,period2:second?{from:card.querySelector(".p2-from").value,to:card.querySelector(".p2-to").value}:null};
  });
  const copySunday = () => {
    const source=$$('.day-schedule')[0];
    if(!source)return;
    $$(".day-schedule").slice(1).forEach((card)=>{if(!card.querySelector(".day-open").checked)return;["p1-from","p1-to","p2-from","p2-to"].forEach((cls)=>card.querySelector("."+cls).value=source.querySelector("."+cls).value);card.querySelector(".day-all-day").checked=source.querySelector(".day-all-day").checked;card.querySelector(".second-enabled").checked=source.querySelector(".second-enabled").checked;card.querySelector(".day-all-day").dispatchEvent(new Event("change"));card.querySelector(".second-enabled").dispatchEvent(new Event("change"));});
    WA.UI.showToast("تم نسخ ساعات الأحد إلى الأيام المفتوحة","success");
  };

  const discountScope = () => document.querySelector('input[name="joinDiscountScope"]:checked')?.value || "all";
  const updateDiscountFields = () => {
    const enabled=$("#offersDiscount").checked;
    $("#discountJoinFields").hidden=!enabled;
    setRequired(["joinDiscountPercent","joinDiscountStart"],enabled);
    const selected=enabled&&discountScope()==="selected";
    $("#joinSelectedServicesField").hidden=!selected;
    const continuous=$("#continuousDiscount").checked;
    $("#joinDiscountEndField").hidden=!enabled||continuous;
    $("#joinDiscountEnd").required=enabled&&!continuous;
  };

  const validateStep = (number) => {
    if(number===1){
      const type=$("#partnerType").value;
      const ids=["partnerType","businessName","tradeName","activityDescription","joinRegion","joinCity","address","googleMapsUrl","joinWhatsapp"];
      if(["workshop","maintenance","parts"].includes(type))ids.push("commercialRegistration","registeredName");
      if(type==="tow")ids.push("operationCardNumber","operationCardExpiry","towVehiclePlate");
      let valid=ids.every((id)=>Boolean($("#"+id).value.trim()));
      const phone=/^05\d{8}$/.test(WA.Storage.sanitizePhone($("#joinWhatsapp").value));
      try{new URL($("#googleMapsUrl").value);}catch(_){valid=false;}
      if(!valid||!phone)WA.UI.showToast("أكمل البيانات المرتبطة بنوع النشاط وتحقق من واتساب ورابط الخرائط","error");
      return valid&&phone;
    }
    if(number===2){
      const rows=schedule();
      let valid=rows.some((row)=>row.open);
      rows.forEach((row)=>{if(row.open&&!row.allDay){valid=valid&&Boolean(row.period1?.from)&&Boolean(row.period1?.to)&&row.period1.from<row.period1.to;if(row.period2)valid=valid&&Boolean(row.period2.from)&&Boolean(row.period2.to)&&row.period2.from<row.period2.to;}});
      if(!valid)WA.UI.showToast("افتح يومًا واحدًا على الأقل وتحقق من أوقات الفترات","error");
      return valid;
    }
    if(number===3){
      const type=$("#partnerType").value;
      let valid=selectedValues($("#coverageCities")).length>0;
      if(type==="workshop")valid=valid&&selectedSpecialties.length>0&&selectedMakes.length>0&&checkedValues('#fuelTypesJoin input[type="checkbox"]').length>0;
      if(type==="maintenance")valid=valid&&selectedMakes.length>0&&checkedValues('#fuelTypesJoin input[type="checkbox"]').length>0&&selectedValues($("#maintenanceServicesJoin")).length>0;
      if(type==="parts")valid=valid&&selectedMakes.length>0&&checkedValues('input[name="partTypesJoin"]').length>0;
      if(type==="tow")valid=valid&&Boolean($("#towVehicleTypes").value.trim());
      if(!valid)WA.UI.showToast("أكمل التغطية والحقول الخاصة بنوع النشاط","error");
      return valid;
    }
    if(number===4&&$("#offersDiscount").checked){
      let valid=Boolean($("#joinDiscountPercent").value)&&Boolean($("#joinDiscountStart").value);
      if(!$("#continuousDiscount").checked)valid=valid&&Boolean($("#joinDiscountEnd").value)&&$("#joinDiscountEnd").value>=$("#joinDiscountStart").value;
      if(!valid)WA.UI.showToast("أكمل نسبة الخصم وتواريخه بصورة صحيحة","error");
      return valid;
    }
    return true;
  };

  const review = () => {
    const type=$("#partnerType").value;
    const openDays=schedule().filter((row)=>row.open).map((row)=>row.day).join("، ");
    const serviceSummary=type==="workshop"?selectedSpecialties.join(" ← "):type==="maintenance"?selectedValues($("#maintenanceServicesJoin")).join("، "):type==="parts"?checkedValues('input[name="partTypesJoin"]').join("، "):$("#towVehicleTypes").value;
    const discountText=$("#offersDiscount").checked?`${$("#joinDiscountPercent").value}% — ${discountScope()==="all"?"جميع الخدمات":"خدمات مختارة"}${$("#continuousDiscount").checked?" — مستمر حتى الإيقاف":` — حتى ${$("#joinDiscountEnd").value}`}`:"لا يوجد";
    const items=[["نوع الشريك",WA.Config.partnerTypes[type]],["الاسم التجاري",$("#tradeName").value],["الموقع",`${$("#joinRegion").value} — ${$("#joinCity").value}`],["أيام العمل",openDays],["الخدمات",serviceSummary],["التغطية",selectedValues($("#coverageCities")).join("، ")],["الخصم",discountText]];
    $("#joinReview").innerHTML=items.map(([label,value])=>`<div class="guidance-item"><span>${WA.UI.escapeHtml(label)}</span><strong>${WA.UI.escapeHtml(value||"—")}</strong></div>`).join("");
  };

  const submit = (event) => {
    event.preventDefault();
    const form=$("#joinForm");
    if(!form.checkValidity()){form.reportValidity();return;}
    if(!["agreementAccepted","feesAccepted","ratingsAccepted","privacyTrustAccepted","honestyPledge"].every((id)=>$("#"+id).checked)){WA.UI.showToast("يلزم قبول جميع الموافقات والتعهد بالأمانة","error");return;}
    const phone=WA.Storage.sanitizePhone($("#joinWhatsapp").value);
    const name=WA.Storage.sanitizeText($("#businessName").value,100);
    const duplicate=WA.Storage.get("wa_join_applications").find((row)=>row.phone===phone&&row.businessName===name&&!["rejected","cancelled"].includes(row.status));
    if(duplicate){WA.UI.showToast(`يوجد طلب سابق برقم ${duplicate.applicationNumber}`,"info");showSuccess(duplicate);return;}
    const type=$("#partnerType").value;
    const scope=discountScope();
    const application=WA.Storage.upsert("wa_join_applications",{
      id:WA.Storage.createId("APP"),applicationNumber:`JOIN-${Math.floor(10000+Math.random()*90000)}`,publicToken:WA.Storage.randomToken("join"),partnerType:type,
      businessName:name,tradeName:WA.Storage.sanitizeText($("#tradeName").value,100),description:WA.Storage.sanitizeText($("#activityDescription").value,500),region:$("#joinRegion").value,city:$("#joinCity").value,address:WA.Storage.sanitizeText($("#address").value,250),googleMapsUrl:$("#googleMapsUrl").value,phone,secondaryPhone:WA.Storage.sanitizePhone($("#secondaryPhone").value),
      documents:{commercialRegistration:type==="tow"?"":WA.Storage.sanitizeText($("#commercialRegistration").value,40),registeredName:type==="tow"?"":WA.Storage.sanitizeText($("#registeredName").value,120),commercialExpiry:type==="tow"?"":$("#commercialExpiry").value,operationCardNumber:type==="tow"?WA.Storage.sanitizeText($("#operationCardNumber").value,50):"",operationCardExpiry:type==="tow"?$("#operationCardExpiry").value:"",towVehiclePlate:type==="tow"?WA.Storage.sanitizeText($("#towVehiclePlate").value,30):""},
      schedule:schedule(),coverageCities:selectedValues($("#coverageCities")),specialtiesPriority:type==="workshop"?selectedSpecialties:[],makesPriority:["workshop","maintenance","parts"].includes(type)?selectedMakes:[],fuelTypes:["workshop","maintenance"].includes(type)?checkedValues('#fuelTypesJoin input[type="checkbox"]'):[],towVehicleTypes:type==="tow"?WA.Storage.sanitizeText($("#towVehicleTypes").value,250):"",maintenanceServices:type==="maintenance"?selectedValues($("#maintenanceServicesJoin")):[],partTypes:type==="parts"?checkedValues('input[name="partTypesJoin"]'):[],
      discount:$("#offersDiscount").checked?{percent:Number($("#joinDiscountPercent").value),scope,services:scope==="selected"?WA.Storage.sanitizeText($("#joinDiscountServices").value,500):"جميع الخدمات",conditions:WA.Storage.sanitizeText($("#joinDiscountConditions").value,700),startsAt:$("#joinDiscountStart").value,endsAt:$("#continuousDiscount").checked?"":$("#joinDiscountEnd").value,continuousUntilStopped:$("#continuousDiscount").checked}:null,
      agreements:{partnership:true,feeBands:true,monthlyInvoice:true,paymentThreshold100:true,objectionWindow15Days:true,ratingsAndObjections:true,privacyAndTrust:true,honestyPledge:true},status:"submitted",statusLabel:"تم الاستلام — قيد المراجعة",submittedAt:WA.Storage.now()
    });
    showSuccess(application);
  };
  const showSuccess = (application) => {$("#joinApplicationNumber").textContent=application.applicationNumber;$("#joinStatusLink").href=`join-status.html?token=${encodeURIComponent(application.publicToken)}`;$$('[data-join-step]').forEach((section)=>section.classList.remove("active"));$("#joinSuccess").classList.add("active");$("#joinSuccess").focus();};

  const init = () => {
    WA.UI.initSelect($("#joinRegion"),WA.Automotive.regionNames,"اختر المنطقة");
    WA.Automotive.maintenanceServices.forEach((service)=>$("#maintenanceServicesJoin").add(new Option(service,service)));
    renderSchedule();
    $("#fuelTypesJoin").innerHTML=WA.Automotive.fuels.map((fuel,index)=>`<label class="checkbox-line"><input type="checkbox" value="${WA.UI.escapeHtml(fuel)}" ${index===0?"checked":""}><span>${WA.UI.escapeHtml(fuel)}</span></label>`).join("");
    setSpecialties([]);setMakes([]);
    $("#joinRegion").addEventListener("change",updateCities);$("#joinCity").addEventListener("change",updateCoverage);$("#partnerType").addEventListener("change",updateAdaptive);
    $("#copySundaySchedule").addEventListener("click",copySunday);
    $("#openAllDays").addEventListener("click",()=>{$$(".day-open").forEach((input)=>{input.checked=true;input.dispatchEvent(new Event("change"));});});
    $("#offersDiscount").addEventListener("change",updateDiscountFields);$$('input[name="joinDiscountScope"]').forEach((input)=>input.addEventListener("change",updateDiscountFields));$("#continuousDiscount").addEventListener("change",updateDiscountFields);
    $$('[data-join-next]').forEach((button)=>button.addEventListener("click",()=>{if(!validateStep(step))return;const next=Number(button.dataset.joinNext);if(next===5)review();showStep(next);}));
    $$('[data-join-back]').forEach((button)=>button.addEventListener("click",()=>showStep(Number(button.dataset.joinBack))));
    $("#joinForm").addEventListener("submit",submit);
    updateAdaptive();updateDiscountFields();
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
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
      if (!$("#confirmDemoPayment").checked) {
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
    $("#receiptContent").innerHTML = `
      <div class="receipt-row"><span>رقم الإيصال</span><strong>${WA.UI.escapeHtml(payment.receiptNumber)}</strong></div>
      <div class="receipt-row"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div>
      <div class="receipt-row"><span>رقم الفاتورة</span><strong>${WA.UI.escapeHtml(invoice?.number || invoice?.id || invoiceId || "—")}</strong></div>
      <div class="receipt-row"><span>دورة الفاتورة</span><strong>${WA.UI.escapeHtml(invoice?.cycle || "—")}</strong></div>
      <div class="receipt-row"><span>طريقة السداد</span><strong>${WA.UI.escapeHtml(payment.method)}</strong></div>
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

    WA.Storage.set("wa_meta", { ...meta, seedVersion, seedAppliedAt: meta.seedAppliedAt || WA.Storage.now(), seedNotice: "بيانات الشركاء المحلية جاهزة للعرض والإدارة.", updatedAt: WA.Storage.now() });
  };

  WA.Seed = { run, buildPartners };
})();
```

## `assets/storage.js`

```javascript
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
    if(!activeReferral||!partner){$("#requestActions").innerHTML='<div class="empty-state"><h3>لا يوجد شريك حالي</h3><p>قد لا يوجد تطابق أو تم طلب بديل ولم يسجل بعد.</p></div>';return;}
    const event=WA.Lifecycle.referralEventState(activeReferral);
    const message=WA.UI.buildWhatsappMessage({request,customer,vehicle,partner});
    const whatsapp=WA.UI.whatsappUrl(partner.whatsapp,message);
    const limitReached=referrals.length>=WA.Config.maxReferralsPerRequest;
    const costBlock=event.serviceReceived?`<section class="cost-confirmation"><h3>كم كانت تكلفة خدمتك؟</h3><p>لا تعرض المنصة هذه الفئة كتقدير سعري؛ تستخدم فقط لحساب رسم الوساطة.</p><div class="form-grid two"><div class="form-field"><label for="trackCostBand">فئة التكلفة</label><select id="trackCostBand" ${activeReferral.costDisputeStatus==="under_review"?"disabled":""}>${costOptions(activeReferral.costBand)}</select></div><div class="form-field action-align"><button id="saveCostBand" class="btn btn-dark" type="button" ${activeReferral.costBand||activeReferral.costDisputeStatus==="under_review"?"disabled":""}>${activeReferral.costBand?"تم حفظ الفئة":"حفظ الفئة"}</button></div></div>${activeReferral.costDisputeStatus==="under_review"?'<div class="warning-panel">يوجد اختلاف على فئة التكلفة وتحولت العملية للمراجعة.</div>':""}</section>`:"";
    $("#requestActions").innerHTML=`<h2>التواصل والمتابعة</h2><p class="muted">تواصل برسالة جاهزة، ثم حدّث نتيجة الإحالة عند حدوثها.</p><div class="button-row"><a id="trackWhatsapp" class="btn btn-primary" href="${WA.UI.escapeHtml(whatsapp)}" target="_blank" rel="noopener">التواصل عبر واتساب</a><button id="copyTrackWhatsapp" class="btn btn-light" type="button">نسخ الرسالة</button></div><div class="cards-grid mt-16"><div class="card"><h3>هل تواصلت؟</h3><p>يُسجل فتح واتساب تلقائيًا عند استخدام الزر.</p><button id="markNoContact" class="btn btn-light btn-sm" type="button">لم أتواصل بعد</button></div><div class="card"><h3>هل تلقيت الخدمة؟</h3><p>${event.serviceReceived?"تم تأكيد تلقي الخدمة.":"أكد فقط إذا نفذ الشريك خدمة فعلية."}</p><button id="confirmService" class="btn btn-dark btn-sm" type="button" ${event.serviceReceived?"disabled":""}>${event.serviceReceived?"تم التأكيد":"نعم، تلقيت الخدمة"}</button><button id="arrivedNoService" class="btn btn-light btn-sm mt-8" type="button" ${event.serviceReceived?"disabled":""}>وصلت ولم أتلق خدمة</button></div></div>${costBlock}`;
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
    $("#requestLinkPanel").innerHTML=`<div><span class="pill">العودة السريعة</span><h2>رابط طلبك الخاص</h2><p>احتفظ به للمتابعة دون كلمة مرور.</p></div><div class="compact-link-row"><input id="trackPrivateLink" aria-label="رابط الطلب الخاص" readonly value="${WA.UI.escapeHtml(absolute)}"><button id="copyTrackPrivateLink" class="icon-action" type="button">نسخ</button><button id="requestAlternative" class="icon-action alternative-action" type="button" ${limitReached?"disabled":""}>↻ <span>${WA.UI.escapeHtml(limitReached?"اكتمل حد البدائل":alternativeLabel(request.serviceType))}</span></button></div>`;
    $("#copyTrackPrivateLink")?.addEventListener("click",()=>WA.UI.copyText(absolute));
    $("#requestAlternative")?.addEventListener("click",()=>$("#alternativeDialog").showModal());
  };

  const renderRating = ({request,activeReferral}) => {
    const existing=activeReferral?WA.Storage.get("wa_ratings").find((row)=>row.referralId===activeReferral.id):null;
    if(existing){$("#ratingPanel").innerHTML=`<div class="success-panel"><strong>تم استلام تقييمك الموثق</strong><p>التقييم العام: ${WA.UI.escapeHtml(existing.overall)} من 5.</p></div>`;return;}
    if(!activeReferral?.serviceReceivedAt||!activeReferral.costBand){$("#ratingPanel").innerHTML='<h2>التقييم</h2><p class="muted">يتاح بعد تأكيد تلقي الخدمة وتحديد فئة التكلفة.</p>';return;}
    $("#ratingPanel").innerHTML='<h2>قيّم تجربتك</h2><p class="muted">تقييم موثق مرتبط بالطلب والإحالة.</p><button id="openRating" class="btn btn-primary" type="button">فتح نموذج التقييم</button>';
    $("#openRating")?.addEventListener("click",()=>{$("#ratingCostBand").innerHTML=costOptions(activeReferral.costBand);$("#ratingCostBand").value=activeReferral.costBand;$("#ratingCostBand").disabled=true;$("#ratingDialog").showModal();});
  };

  const renderRequest = (request) => {
    currentRequest=WA.Storage.findById("wa_requests",request.id)||request;
    const bundle=WA.UI.getRequestBundle(currentRequest);
    if(!bundle?.customer||!bundle.vehicle){setView("notFound");return;}
    const {customer,activeReferral,partner,discount,referrals}=bundle;
    $("#requestHeader").innerHTML=`<div class="kicker">أهلًا ${WA.UI.escapeHtml(customer.firstName)}</div><h1>${WA.UI.escapeHtml(currentRequest.humanId)}</h1><p>${WA.UI.escapeHtml(WA.Config.serviceTypes[currentRequest.serviceType])} — آخر تحديث ${WA.UI.formatDate(currentRequest.updatedAt)}</p><div class="request-meta"><span>${WA.UI.escapeHtml(WA.UI.statusLabel(currentRequest.status))}</span><span>${referrals.length} من 3 إحالات</span><span>الرابط الخاص لا يكشف رقم الجوال</span></div>`;
    const closed=["administratively_closed","finally_closed"].includes(currentRequest.status);$("#closedNotice").hidden=!closed;if(closed)$("#closedNotice").textContent="الطلب مغلق إداريًا بعد خمسة أيام دون حذف سجلاته.";
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
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى JavaScript لتشغيل الرحلة والحفظ المحلي.</div></noscript>
  <div data-site-header></div>
  <main id="main-content" class="flow-shell">
    <div class="container flow-layout">
      <aside class="flow-sidebar" aria-label="تقدم الطلب">
        <div class="kicker">رحلة مبسطة ومترابطة</div>
        <h1>طلب جديد</h1>
        <p id="flowServiceLabel">اختر الخدمة، وسنحفظ تقدمك تلقائيًا على هذا الجهاز.</p>
        <div class="progress-wrap"><div class="progress-meta"><span id="progressLabel">اختيار الخدمة</span><span id="progressPercent">0%</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="progressBar" class="progress-bar"></div></div></div>
        <div class="legal-note mt-24">لا نعرض تشخيصًا نهائيًا أو سعرًا تقديريًا، ولا نظهر بيانات الشريك قبل إنشاء الطلب والإحالة.</div>
      </aside>

      <div class="flow-content" aria-live="polite">
        <section class="flow-screen active" data-screen="service" tabindex="-1">
          <div class="kicker">الخطوة الأولى</div><h2>وش تحتاج لسيارتك؟</h2><p>المشكلة هي المسار الرئيسي. الخدمات الأخرى منفصلة وأقصر.</p>
          <div class="service-choice-grid" id="serviceChoices">
            <button class="service-choice primary" type="button" data-service="problem"><strong>عندي مشكلة في السيارة</strong><span>صف المشكلة ثم أجب عن أربعة أسئلة لتحديد التوقع والتخصص والاستعجال.</span></button>
            <button class="service-choice" type="button" data-service="parts"><strong>أبحث عن محل قطع غيار</strong><span>رقم الهيكل الموصى به، اسم القطعة، ووكالة أو تجارية.</span></button>
            <button class="service-choice urgent-choice" type="button" data-service="tow"><strong>أحتاج سطحة — عاجل</strong><span>الموقع التلقائي ووصف مكان السيارة إلزاميان.</span></button>
            <button class="service-choice" type="button" data-service="maintenance"><strong>أبحث عن صيانة دورية</strong><span>اختر الصيانة ونوع الوقود والمنطقة والمدينة.</span></button>
          </div>
          <div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button id="serviceNext" class="btn btn-primary" type="button" disabled>التالي</button></div>
        </section>

        <section class="flow-screen" data-screen="customer" tabindex="-1">
          <div class="kicker">بيانات التواصل</div><h2>بيانات بسيطة دون حساب</h2><p>نستخدمها لتشغيل الطلب وإرسال رابط المتابعة.</p>
          <form id="customerForm" novalidate>
            <div class="form-grid two"><div class="form-field"><label class="required" for="firstName">الاسم الأول</label><input id="firstName" autocomplete="given-name" maxlength="40" required><span class="field-error" data-error-for="firstName"></span></div><div class="form-field"><label class="required" for="phone">رقم الجوال</label><input id="phone" inputmode="tel" autocomplete="tel" placeholder="05XXXXXXXX" maxlength="10" required><span class="field-error" data-error-for="phone"></span></div></div>
            <div class="checkbox-stack mt-24"><label class="checkbox-line"><input id="privacyAccepted" type="checkbox" required><span>أوافق على <a href="privacy.html" target="_blank" rel="noopener">سياسة الخصوصية</a> واستخدام البيانات لتشغيل الطلب.</span></label><label class="checkbox-line"><input id="termsAccepted" type="checkbox" required><span>أوافق على <a href="terms.html" target="_blank" rel="noopener">الشروط وحدود مسؤولية المنصة</a>.</span></label><label class="checkbox-line"><input id="marketingMessages" type="checkbox"><span>أوافق اختياريًا على الرسائل التسويقية. رسائل الطلب التشغيلية لا تتوقف.</span></label></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="service">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
          </form>
        </section>

        <section class="flow-screen" data-screen="vehicle" tabindex="-1">
          <div class="kicker">بيانات السيارة</div><h2>اختر الشركة ثم الموديل</h2><p>الموديلات تتغير حسب الشركة المختارة.</p>
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
          <div class="kicker">المنطقة والموقع</div><h2>ابدأ بالمنطقة ثم المدينة</h2><p id="locationHelp">الموقع الدقيق اختياري إلا لخدمة السطحة.</p>
          <form id="locationForm" novalidate>
            <div class="form-grid two"><div class="form-field"><label class="required" for="region">المنطقة</label><select id="region" required></select><span class="field-error" data-error-for="region"></span></div><div class="form-field"><label class="required" for="city">المدينة</label><select id="city" required disabled><option value="">اختر المنطقة أولًا</option></select><span class="field-error" data-error-for="city"></span></div></div>
            <div class="location-capture mt-16"><button id="detectLocation" class="btn btn-light" type="button">تحديد موقعي تلقائيًا</button><div id="locationStatus" class="field-hint" role="status">لم تتم مشاركة الموقع.</div></div>
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

        <section class="flow-screen" data-screen="analyzing" tabindex="-1"><div class="loading-shell"><div class="skeleton-icon"></div><h2>نفهم وصف المشكلة مبدئيًا</h2><p>نحلل الوصف وفق قواعد واضحة، والنتيجة توجيه مبدئي وليست تشخيصًا نهائيًا.</p><div id="analysisSteps" class="loader-steps"><div class="loader-step">تنظيف الوصف وفهم الكلمات</div><div class="loader-step">تحديد السيناريو المحتمل</div><div class="loader-step">إعداد أربعة أسئلة مناسبة</div></div></div></section>

        <section class="flow-screen" data-screen="questions" tabindex="-1"><div class="kicker" id="questionTitle">سؤال 1 من 4</div><h2 id="questionText"></h2><p>اختر الإجابة الأقرب. لا تقلق إن لم تكن متأكدًا.</p><div id="answerChoices" class="choice-row"></div><div class="screen-actions"><button id="questionBack" class="btn btn-ghost" type="button">السابق</button><button id="questionNext" class="btn btn-primary" type="button" disabled>التالي</button></div></section>

        <section class="flow-screen" data-screen="guidance" tabindex="-1"><div class="kicker">فهمنا مشكلتك مبدئيًا</div><h2>التوجيه الفني الأولي</h2><div id="dangerPanel" class="danger-panel" hidden></div><div class="guidance-grid"><div class="guidance-item"><span>المشكلة المتوقعة مبدئيًا</span><strong id="expectedIssue"></strong></div><div class="guidance-item"><span>التخصص المناسب</span><strong id="specialty"></strong></div><div class="guidance-item"><span>درجة الاستعجال</span><strong id="urgency"></strong></div><div class="guidance-item"><span>ما يجب فعله الآن</span><strong id="nextStep"></strong></div></div><div id="legalNotice" class="legal-note mt-16"></div><div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="path">تعديل الوصف</button><button id="findPartner" class="btn btn-primary" type="button">وين أوديها؟</button></div></section>

        <section class="flow-screen" data-screen="review" tabindex="-1"><div class="kicker">مراجعة سريعة</div><h2>راجع الطلب قبل المطابقة</h2><div id="reviewContent" class="guidance-grid"></div><div id="serviceDisclaimer" class="legal-note mt-16"></div><div class="screen-actions"><button class="btn btn-ghost" type="button" data-back="path">تعديل</button><button id="reviewMatch" class="btn btn-primary" type="button">ابحث عن شريك</button></div></section>

        <section class="flow-screen" data-screen="matching" tabindex="-1"><div class="loading-shell"><div class="skeleton-icon"></div><h2>نسجل الطلب ثم نختار شريكًا واحدًا</h2><div class="loader-steps"><div class="loader-step">حفظ العميل والسيارة والطلب</div><div class="loader-step">فحص بيانات الشركاء والتغطية</div><div class="loader-step">تسجيل الإحالة قبل عرض الشريك</div></div></div></section>

        <section class="flow-screen" data-screen="result" tabindex="-1"><div id="resultHeader" class="success-panel"></div><div id="partnerResult"></div><section class="contact-card mt-16" aria-labelledby="contactPartnerTitle"><div><div class="kicker">خطوتك التالية</div><h2 id="contactPartnerTitle">تواصل مع الشريك</h2><p>رسالة الطلب جاهزة، ويمكنك نسخها أو فتح واتساب مباشرة.</p></div><div class="button-row contact-actions"><a id="whatsappLink" class="btn btn-primary" href="#" target="_blank" rel="noopener">التواصل عبر واتساب</a><button id="copyWhatsapp" class="btn btn-light" type="button">نسخ الرسالة</button></div></section><section class="private-link-card mt-24"><div><span class="pill">احتفظ به</span><h2>رابط طلبك الخاص</h2><p>للعودة والمتابعة دون كلمة مرور.</p></div><div class="compact-link-row"><input id="privateLink" aria-label="رابط الطلب الخاص" readonly><button id="copyPrivateLink" class="icon-action" type="button" aria-label="نسخ رابط الطلب">نسخ</button><a id="openTrackLink" class="icon-action" href="track.html" aria-label="فتح متابعة الطلب">فتح</a><a id="requestAlternativeLink" class="icon-action alternative-action" href="track.html" aria-label="طلب شريك آخر">↻ <span>أريد ورشة أخرى</span></a></div></section></section>

        <section class="flow-screen" data-screen="noMatch" tabindex="-1"><div class="empty-state"><h2>لا يوجد تطابق حاليًا</h2><p id="noMatchReason"></p><p>يمكنك تعديل الموقع أو المحاولة لاحقًا عند انضمام شريك مناسب.</p><div class="screen-actions"><button class="btn btn-light" type="button" data-back="location">تعديل الموقع</button><a class="btn btn-primary" href="index.html">الرئيسية</a></div></div></section>
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
  <meta name="description" content="وين أوديها منصة ويب عربية تساعد صاحب السيارة على فهم المشكلة مبدئيًا والوصول إلى شريك واحد مناسب.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>وين أوديها؟ — عندك مشكلة في السيارة؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="home">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main id="main-content">
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">منصة توجيه وإحالة سيارات</div>
          <h1>عندك مشكلة في السيارة؟<br><span>قل لنا وش فيها… ونقول لك وين توديها.</span></h1>
          <p>نفهم وصفك مبدئيًا، ونحدد التخصص ودرجة الاستعجال والخطوة التالية، ثم نرشح لك شريكًا واحدًا مناسبًا داخل مدينتك. لا تشخيص نهائي، ولا أسعار تقديرية، ولا قائمة تربكك.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="customer.html?service=problem&fresh=1">ابدأ مسار المشكلة</a>
            <a class="btn btn-light" href="track.html">متابعة طلب سابق</a>
          </div>
          <div class="hero-assurances" aria-label="مزايا الخدمة">
            <span>بدون تطبيق</span><span>بدون كلمة مرور</span><span>شريك واحد كل مرة</span><span>متابعة عبر رابط خاص</span>
          </div>
        </div>

        <div class="hero-panel">
          <div class="kicker">اختيار واضح بخطوات قليلة</div>
          <div class="main-path-card">
            <div class="path-icon" aria-hidden="true">!</div>
            <h2>عندي مشكلة في السيارة</h2>
            <p>اشرح المشكلة بطريقتك، ونساعدك على فهم الاحتمال الأقرب والوصول إلى التخصص المناسب.</p>
            <a class="btn btn-primary btn-block mt-16" href="customer.html?service=problem&fresh=1">ابدأ طلبك</a>
          </div>
          <h3 class="mt-24">خدمات أخرى</h3>
          <div class="other-services">
            <a class="service-card" href="customer.html?service=parts&fresh=1"><div class="path-icon">ق</div><h3>محل قطع غيار</h3><p>اكتب القطعة ورقم الهيكل الموصى به، ونرشح محلًا مناسبًا.</p></a>
            <a class="service-card" href="customer.html?service=tow&fresh=1"><div class="path-icon">س</div><h3>أحتاج سطحة</h3><p>طلب عاجل يعتمد على موقع السيارة ووصف المكان.</p></a>
            <a class="service-card" href="customer.html?service=maintenance&fresh=1"><div class="path-icon">ص</div><h3>صيانة دورية</h3><p>اختر الخدمة والسيارة والمدينة.</p></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">كيف تعمل المنصة؟</div>
          <h2>رحلة قصيرة، وقرار أوضح</h2>
          <p>نقلل المدخلات ونحتفظ بكل شيء داخل الطلب، بحيث لا تبدأ من الصفر عند طلب شريك بديل.</p>
        </div>
        <div class="cards-grid">
          <article class="card"><span class="pill">1</span><h3>اختر الخدمة</h3><p>المشكلة هي المسار الرئيسي، والخدمات الأخرى أبسط وأقصر.</p></article>
          <article class="card"><span class="pill">2</span><h3>أدخل بيانات السيارة</h3><p>الموديلات تتغير حسب الشركة، والموقع الدقيق لا يطلب إلا عند الحاجة.</p></article>
          <article class="card"><span class="pill">3</span><h3>نحدد التخصص</h3><p>أربعة أسئلة ديناميكية تساعد محرك AI المحلي على تقديم توقع احتمالي واستعجال وخطوة تالية.</p></article>
          <article class="card"><span class="pill">4</span><h3>شريك واحد</h3><p>تُسجل الإحالة أولًا، ثم تظهر بيانات الشريك وواتساب ورابط المتابعة.</p></article>
          <article class="card"><span class="pill">5</span><h3>متابعة موثقة</h3><p>تأكيد تلقي الخدمة، وتسجيل فئة التكلفة، وتقييم مرتبط بإحالة فعلية.</p></article>
          <article class="card"><span class="pill">6</span><h3>بديل دون إعادة</h3><p>حتى ثلاثة شركاء داخل نفس الطلب مع استبعاد السابق.</p></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">بوابات مترابطة</div>
          <h2>رحلة متكاملة للعميل والشريك</h2>
          <p>ترتبط الطلبات والإحالات والمتابعة ولوحة الشريك ضمن تجربة واحدة.</p>
        </div>
        <div class="portal-grid">
          <a class="card" href="customer.html?fresh=1"><div class="path-icon">ع</div><h3>بوابة العميل</h3><p>المسارات الأربعة، المطابقة، المتابعة، البدائل، والتقييم.</p><strong class="mt-16">ابدأ التجربة ←</strong></a>
          <a class="card" href="workshop-login.html"><div class="path-icon">ش</div><h3>بوابة الشريك</h3><p>الإحالات والخدمات والتكلفة والاعتراضات والخصومات والرسوم والفواتير.</p><strong class="mt-16">دخول الشريك ←</strong></a>
          <a class="card" href="join.html"><div class="path-icon">+</div><h3>انضم كشريك</h3><p>نموذج متكيف للورش ومحلات القطع والسطحات ومراكز الصيانة.</p><strong class="mt-16">قدّم طلبًا ←</strong></a>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head"><div class="kicker">حدود الخدمة</div><h2>نقول الأمر كما هو</h2></div>
        <div class="cards-grid">
          <article class="card"><h3>ليست جهة تشخيص</h3><p>النتيجة مبدئية واحتمالية، والفحص النهائي لدى مقدم الخدمة المستقل.</p></article>
          <article class="card"><h3>لا نعرض أسعارًا متوقعة</h3><p>السعر والتوفر والمطابقة النهائية تتأكد مباشرة مع مقدم الخدمة.</p></article>
          <article class="card"><h3>لا نخترع شريكًا</h3><p>إذا لم يوجد شريك مطابق، تظهر حالة واضحة بدل عرض بيانات غير دقيقة.</p></article>
        </div>
      </div>
    </section>
  </main>

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
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>حالة طلب الانضمام — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="join-status"><div data-site-header></div>
<main id="main-content" class="section"><div class="container">
  <section id="joinLookup" class="card"><div class="section-head"><div class="kicker">متابعة طلب الشراكة</div><h1>حالة طلب الانضمام</h1><p>استخدم الرابط الخاص أو رقم الطلب والجوال.</p></div><form id="joinLookupForm" class="form-grid two"><div class="form-field"><label class="required" for="joinNumber">رقم الطلب</label><input id="joinNumber" placeholder="JOIN-12345" required></div><div class="form-field"><label class="required" for="joinPhone">رقم الجوال</label><input id="joinPhone" inputmode="tel" maxlength="10" required></div><button class="btn btn-primary" type="submit">عرض الحالة</button></form></section>
  <section id="joinResult" class="card" hidden><div class="kicker">طلب الشراكة</div><div id="joinResultContent"></div><div class="button-row mt-16"><a class="btn btn-light" href="join-status.html">بحث آخر</a><a class="btn btn-primary" href="index.html">الرئيسية</a></div></section>
  <section id="joinNotFound" class="empty-state" hidden><h1>لم يتم العثور على الطلب</h1><p>تحقق من البيانات أو الرابط.</p><a class="btn btn-primary" href="join-status.html">المحاولة مرة أخرى</a></section>
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
        <div class="kicker light-kicker">شراكة واضحة من البداية</div>
        <h1>انضم إلى شبكة الشركاء</h1>
        <p>اختر نشاطك، وستظهر لك الحقول المرتبطة به فقط.</p>
        <div class="progress-wrap">
          <div class="progress-meta"><span id="joinProgressLabel">البيانات الأساسية</span><span id="joinProgressPercent">20%</span></div>
          <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"><div id="joinProgressBar" class="progress-bar"></div></div>
        </div>
        <div class="legal-note mt-24">راجع البيانات قبل الإرسال؛ فهي تستخدم في المطابقة وظهور معلومات الشريك للعملاء.</div>
      </aside>

      <div class="flow-content">
        <form id="joinForm" novalidate>
          <section class="flow-screen active" data-join-step="1" tabindex="-1">
            <div class="kicker">الخطوة 1 من 5</div>
            <h2>نوع الشريك والبيانات الأساسية</h2>
            <p>تتغير الوثائق والحقول تلقائيًا حسب النشاط.</p>
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
              <div class="section-head compact"><h3>بيانات تشغيل السطحة</h3><p>لا يطلب هذا المسار سجلًا تجاريًا أو تخصصات أو شركات مصنعة.</p></div>
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
            <p>خصص كل يوم على حدة، بما في ذلك السبت، واختر فترة ثانية عند الحاجة.</p>
            <div class="button-row mt-16"><button id="copySundaySchedule" class="btn btn-light btn-sm" type="button">نسخ ساعات الأحد لبقية الأيام المفتوحة</button><button id="openAllDays" class="btn btn-ghost btn-sm" type="button">فتح جميع الأيام</button></div>
            <div id="dailyScheduleEditor" class="daily-schedule-list mt-16"></div>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="1">السابق</button><button class="btn btn-primary" type="button" data-join-next="3">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="3" tabindex="-1">
            <div class="kicker">الخطوة 3 من 5</div>
            <h2>التغطية والخدمات</h2>
            <div class="form-field"><label class="required" for="coverageCities">مدن التغطية</label><select id="coverageCities" multiple size="7" required></select><span class="field-hint">المدينة الأساسية تضاف تلقائيًا، ويمكن اختيار مدن إضافية.</span></div>

            <section id="workshopAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>تخصصات الورشة</h3><p>رتب التخصصات حسب الأولوية؛ الأول هو التخصص الرئيسي.</p></div>
              <div id="specialtySelector" class="priority-selector"><div><h3>التخصصات المتاحة</h3><div id="availableSpecialties" class="selector-list"></div></div><div><h3>التخصصات المختارة</h3><ol id="selectedSpecialties" class="selected-priority-list"></ol></div></div>
            </section>

            <section id="makeAndFuelAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3 id="makeSectionTitle">الشركات المصنعة التي تخدمها</h3><p>رتب العلامات حسب الأولوية التشغيلية.</p></div>
              <div id="makeSelector" class="priority-selector"><div><h3>الشركات المتاحة</h3><div id="availableMakes" class="selector-list"></div></div><div><h3>الشركات المختارة</h3><ol id="selectedMakes" class="selected-priority-list"></ol></div></div>
              <fieldset id="fuelTypesField" class="form-field mt-24"><legend class="required">أنواع الوقود التي تخدمها</legend><div id="fuelTypesJoin" class="checkbox-grid"></div></fieldset>
            </section>

            <section id="towAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>نطاق خدمة السطحة</h3><p>حدد المركبات التي يمكن نقلها ضمن مدن التغطية المختارة.</p></div>
              <div class="form-field"><label class="required" for="towVehicleTypes">أنواع المركبات الممكن نقلها</label><textarea id="towVehicleTypes" maxlength="250" placeholder="مثال: سيدان، دفع رباعي، بيك أب"></textarea></div>
            </section>

            <section id="maintenanceAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>خدمات الصيانة الدورية</h3><p>اختر الخدمات التي يقدمها المركز فعلًا.</p></div>
              <div class="form-field"><label class="required" for="maintenanceServicesJoin">الخدمات المتاحة</label><select id="maintenanceServicesJoin" multiple size="8"></select></div>
            </section>

            <section id="partsAdaptive" class="activity-block mt-24" hidden>
              <div class="section-head compact"><h3>أنواع قطع الغيار</h3><p>لا نطلب إدخال مخزون القطع؛ التوفر يؤكد مباشرة مع العميل.</p></div>
              <fieldset class="form-field"><legend class="required">أنواع القطع التي يوفرها المحل عادةً</legend><div class="checkbox-grid"><label class="checkbox-line"><input type="checkbox" name="partTypesJoin" value="وكالة"><span>وكالة</span></label><label class="checkbox-line"><input type="checkbox" name="partTypesJoin" value="تجارية"><span>تجارية</span></label></div></fieldset>
            </section>
            <div class="screen-actions"><button class="btn btn-ghost" type="button" data-join-back="2">السابق</button><button class="btn btn-primary" type="button" data-join-next="4">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="4" tabindex="-1">
            <div class="kicker">الخطوة 4 من 5</div>
            <h2>الخصم الاختياري</h2>
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
          <div class="success-panel"><strong>تم إرسال طلب الانضمام</strong><p>احتفظ برقم الطلب والجوال لمتابعة الحالة.</p></div>
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
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>سداد الفاتورة — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="payment"><div data-site-header></div>
<main id="main-content" class="section"><div class="container">
  <section id="paymentCard" class="card"><div class="kicker">تسجيل سداد الفاتورة</div><div class="section-head"><div class="kicker">تسوية رسوم الشريك</div><h1>سداد فاتورة رسوم الوساطة</h1><p>تسجل الصفحة حالة السداد داخل النظام، ولا تطلب بيانات بطاقة مصرفية.</p></div><div id="claimSummary" class="guidance-grid"></div><form id="paymentForm" class="form-grid mt-24"><fieldset class="form-field"><legend class="required">طريقة السداد</legend><label class="radio-line"><input type="radio" name="paymentMethod" value="demo_bank_transfer" checked> تحويل بنكي</label><label class="radio-line"><input type="radio" name="paymentMethod" value="demo_sadad"> سداد</label></fieldset><label class="checkbox-line"><input id="confirmDemoPayment" type="checkbox" required><span>أؤكد صحة بيانات السداد المسجلة.</span></label><button class="btn btn-primary" type="submit">تسجيل السداد</button></form></section>
  <section id="paymentMissing" class="empty-state" hidden><h1>الفاتورة غير موجودة</h1><p>تحقق من الرابط أو ارجع إلى لوحة الشريك.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة للوحة</a></section>
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
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>سياسة الخصوصية — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="privacy"><div data-site-header></div>
<main id="main-content" class="section"><article class="container card"><div class="section-head"><div class="kicker">حماية بيانات المستخدم</div><h1>سياسة الخصوصية</h1><p>توضح هذه الصفحة طريقة تعامل المنصة مع البيانات اللازمة لتشغيل الخدمة.</p></div>
<h2>البيانات التي نجمعها</h2><p>الاسم الأول، رقم الجوال، بيانات السيارة، رقم الهيكل عند إدخاله لمسار قطع الغيار، المنطقة والمدينة، الموقع الدقيق عند الحاجة، وصف المشكلة، الإجابات، بيانات الطلب والإحالات، فئة تكلفة الخدمة بعد تنفيذها، والتقييمات.</p>
<h2>أغراض الاستخدام</h2><p>إنشاء الطلب، تحليل الاحتياج بصورة مبدئية، اختيار الشريك، تسجيل الإحالة، المتابعة، احتساب رسوم الوساطة وفق فئة تكلفة خدمة مؤكدة، التقييم، إدارة الاعتراضات والفواتير، وتحسين جودة التشغيل.</p>
<h2>مكان التخزين</h2><p>تخزن البيانات في localStorage داخل المتصفح المستخدم. لا يوجد خادم خلفي أو مزامنة بين الأجهزة في الواجهة الحالية. حذف بيانات الموقع من المتصفح يحذف النسخة المحلية.</p>
<h2>مشاركة البيانات</h2><p>لا يعرض للشريك إلا ما يلزم لفهم الإحالة والتعامل معها. لا تستخدم بيانات العميل للتسويق من الشريك دون موافقة مستقلة.</p>
<h2>الرسائل التشغيلية والتسويقية</h2><p>الموافقة على الرسائل التشغيلية لازمة لمتابعة طلب قائم. الموافقة التسويقية اختيارية، ويمكن رفضها دون التأثير على رسائل الطلب الضرورية.</p>
<h2>الاحتفاظ والحذف</h2><p>الإغلاق الإداري لا يحذف السجل. قبل الإطلاق الفعلي يجب اعتماد سياسة احتفاظ وحذف متوافقة مع الأنظمة السعودية، وتوفير قناة رسمية لطلبات الوصول والتصحيح والحذف.</p>
<div class="warning-panel mt-24"><strong>تنبيه قانوني</strong><p>هذه صياغة تشغيلية أولية للعرض وليست استشارة قانونية نهائية. يلزم مراجعتها واعتمادها نظاميًا قبل الإطلاق التجاري.</p></div></article></main>
<div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script>
</body></html>
```

## `receipt.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>إيصال سداد — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="receipt"><div data-site-header></div>
<main id="main-content" class="section"><div class="container"><section id="receiptCard" class="receipt"><div class="receipt-head"><div><div class="kicker">إيصال السداد</div><h1>إيصال سداد</h1></div><div class="brand"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>رسوم الشريك</small></span></div></div><div id="receiptContent"></div><div class="button-row mt-24 no-print"><button class="btn btn-primary" type="button" id="printReceipt">طباعة</button><a class="btn btn-light" href="workshop-dashboard.html">العودة للوحة</a></div></section><section id="receiptMissing" class="empty-state" hidden><h1>الإيصال غير موجود</h1><p>لا يمكن إنشاء إيصال دون سجل دفع صحيح.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة للوحة</a></section></div></main><div data-site-footer></div>
<script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script><script defer src="assets/receipt.js"></script>
</body></html>
```

## `terms.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>الشروط وحدود المسؤولية — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="terms"><div data-site-header></div>
<main id="main-content" class="section"><article class="container card"><div class="section-head"><div class="kicker">حدود الخدمة</div><h1>الشروط وحدود المسؤولية</h1><p>تنظم هذه الصفحة استخدام منصة «وين أوديها» وحدود دورها.</p></div>
<h2>طبيعة المنصة</h2><p>«وين أوديها» منصة توجيه وإحالة. لا تفحص السيارة، ولا تقدم تشخيصًا نهائيًا، ولا تنفذ إصلاحًا أو بيع قطع أو نقلًا أو صيانة.</p>
<h2>التوجيه الفني</h2><p>أي توقع فني يظهر هو احتمال مبدئي مبني على البيانات المدخلة، ولا يغني عن الفحص الفعلي. لا ينبغي استبدال قطعة أو اتخاذ قرار إصلاحي بناءً عليه وحده.</p>
<h2>السلامة</h2><p>عند ظهور مؤشرات خطر مثل ضعف الفرامل أو رائحة الوقود أو ارتفاع الحرارة أو توقف السيارة في موقع خطر، يجب عدم الاستمرار في القيادة إذا كان ذلك غير آمن، واستخدام السطحة أو التواصل مع الجهة المناسبة للحالة.</p>
<h2>مسؤولية مقدم الخدمة</h2><p>مقدم الخدمة شريك مستقل وهو المسؤول عن الفحص والتشخيص النهائي وجودة العمل والضمانات والاتفاق المالي مع العميل.</p>
<h2>الأسعار والتوفر</h2><p>لا تعرض المنصة أسعارًا تقديرية. السعر والتوفر والموعد والمطابقة النهائية تتأكد مباشرة مع مقدم الخدمة.</p>
<h2>الإحالات والرسوم</h2><p>تسجل الإحالة قبل إظهار بيانات الشريك. لا يستحق رسم الوساطة لمجرد إظهار الشريك أو فتح واتساب. بعد تأكيد تلقي الخدمة تسجل فئة التكلفة، وتحتسب الرسوم بالشرائح: أقل من 50 ريالًا بلا رسوم، ومن 50 إلى أقل من 200 بخمسة ريالات، ومن 200 إلى 400 بعشرة ريالات، وأكثر من 400 بخمسة وعشرين ريالًا. تصدر الفاتورة في اليوم الأول شهريًا، ويصبح السداد إلزاميًا عند بلوغ الرصيد 100 ريال، ويحق للشريك الاعتراض خلال 15 يومًا من إصدار الفاتورة.</p>
<h2>التقييمات والاعتراضات</h2><p>التقييمات مرتبطة بطلب وإحالة وتجربة مؤكدة. لا يحذف الشريك تقييمًا بنفسه، ويمكنه تقديم اعتراض يخضع للمراجعة.</p>

<div class="warning-panel mt-24"><strong>قبل الإطلاق</strong><p>يلزم إعداد اتفاقية شراكة وسياسة خصوصية وشروط استخدام معتمدة ومراجعة نظامية وتقنية مستقلة.</p></div></article></main>
<div data-site-footer></div><script defer src="assets/config.js"></script><script defer src="assets/automotive-data.js"></script><script defer src="assets/storage.js"></script><script defer src="assets/seed.js"></script><script defer src="assets/lifecycle.js"></script><script defer src="assets/common.js"></script>
</body></html>
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
        <div class="section-head"><div class="kicker">متابعة دون كلمة مرور</div><h1>افتح رابط طلبك الخاص</h1><p>الرابط الخاص هو الأسهل. ويمكن الاسترجاع يدويًا برقم الطلب والجوال دون وضع الجوال في عنوان الصفحة.</p></div>
        <form id="lookupForm" class="form-grid two" novalidate>
          <div class="form-field"><label class="required" for="requestNumber">رقم الطلب</label><input id="requestNumber" placeholder="WA-12345" autocomplete="off" required></div>
          <div class="form-field"><label class="required" for="lookupPhone">رقم الجوال</label><input id="lookupPhone" inputmode="tel" placeholder="05XXXXXXXX" maxlength="10" required></div>
          <div class="button-row"><button class="btn btn-primary" type="submit">عرض الطلب</button><a class="btn btn-light" href="customer.html?fresh=1">بدء طلب جديد</a></div>
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
              <h2>ملخص الطلب</h2>
              <div id="requestSummary" class="guidance-grid"></div>
            </section>
            <section class="card mt-16">
              <h2>سجل الإحالات</h2>
              <div id="referralTimeline" class="timeline"></div>
            </section>
          </aside>
        </div>
        <section id="requestLinkPanel" class="private-link-card mt-24" aria-label="رابط الطلب والإحالة البديلة"></section>
      </section>

      <section id="notFoundSection" class="empty-state" hidden>
        <div class="path-icon">!</div><h1>تعذر العثور على الطلب</h1><p>تحقق من الرابط أو رقم الطلب والجوال. لم يتم عرض أي بيانات جزئية.</p><a class="btn btn-primary" href="track.html">المحاولة مرة أخرى</a>
      </section>
    </div>
  </main>

  <dialog id="alternativeDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="alternativeForm">
      <div class="dialog-head"><div><div class="kicker">شريك بديل</div><h2>لماذا لم تستمر مع الشريك الحالي؟</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
      <div class="form-field"><label for="alternativeReason">السبب اختياري</label><select id="alternativeReason"><option value="">بدون تحديد</option><option>لم يتم الرد</option><option>لم نتفق على الموعد</option><option>لم يتم التفاهم على السعر</option><option>الخدمة غير متوفرة</option><option>الموقع غير مناسب</option><option>لم أرغب في الاستمرار</option><option>سبب آخر</option></select></div>
      <div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button id="confirmAlternative" class="btn btn-primary" value="default" type="submit">ابحث عن بديل</button></div>
    </form>
  </dialog>

  <dialog id="ratingDialog" class="dialog">
    <form method="dialog" class="dialog-shell" id="ratingForm">
      <div class="dialog-head"><div><div class="kicker">تقييم موثق</div><h2>قيّم تجربتك</h2></div><button class="dialog-close" type="submit" value="cancel" aria-label="إغلاق">×</button></div>
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
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0b1d33"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"><title>لوحة الشريك — وين أوديها؟</title><link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css"></head>
<body data-page="partner-dashboard"><div data-site-header></div><main id="main-content" class="section"><div class="container">
  <div id="partnerHeader" class="request-header"></div>
  <div class="tabs" role="tablist" aria-label="أقسام لوحة الشريك"><button class="tab-btn active" type="button" data-tab="overview" role="tab" aria-selected="true">نظرة عامة</button><button class="tab-btn" type="button" data-tab="referrals" role="tab" aria-selected="false">الإحالات</button><button class="tab-btn" type="button" data-tab="objections" role="tab" aria-selected="false">الاعتراضات</button><button class="tab-btn" type="button" data-tab="ratings" role="tab" aria-selected="false">التقييمات</button><button class="tab-btn" type="button" data-tab="discounts" role="tab" aria-selected="false">الخصومات</button><button class="tab-btn" type="button" data-tab="billing" role="tab" aria-selected="false">الفواتير والسداد</button><button class="tab-btn" type="button" data-tab="profile" role="tab" aria-selected="false">الملف والإشعارات</button></div>

  <section class="tab-panel active" data-panel="overview" role="tabpanel"><div id="overviewStats" class="stats-grid"></div><div class="dashboard-grid two mt-16"><section class="card"><h2>آخر الإحالات</h2><div id="latestReferrals"></div></section><aside class="card"><h2>حالة الحساب</h2><div id="accountStatus"></div></aside></div></section>
  <section class="tab-panel" data-panel="referrals" role="tabpanel"><div class="section-head"><h2>إدارة الإحالات والخدمات</h2><p>أكد تلقي الخدمة، ثم أدخل فئة التكلفة فقط إذا لم يدخلها العميل. لا تعدلها بصمت.</p></div><div id="referralsTable"></div></section>
  <section class="tab-panel" data-panel="objections" role="tabpanel"><div class="section-head"><h2>سجل الاعتراضات</h2><p>اعتراض الفاتورة متاح خلال 15 يومًا من إصدارها.</p></div><div id="objectionsTable"></div></section>
  <section class="tab-panel" data-panel="ratings" role="tabpanel"><div class="section-head"><h2>التقييمات الموثقة</h2><p>يمكن الاعتراض المسبب، ولا يستطيع الشريك الحذف المباشر.</p></div><div id="ratingsList"></div></section>
  <section class="tab-panel" data-panel="discounts" role="tabpanel"><div class="dashboard-grid two"><section class="card"><h2>الخصومات الحالية</h2><p class="muted">يمكن إيقاف الخصم أو إنشاء خصم جديد بنطاق واضح.</p><div id="discountsList"></div></section><section class="card"><h2>إضافة خصم</h2><form id="discountForm" class="form-grid" novalidate><div class="form-field"><label class="required" for="discountPercent">النسبة %</label><input id="discountPercent" type="number" min="1" max="50" required></div><div class="form-field"><label class="required" for="discountStart">تاريخ البداية</label><input id="discountStart" type="date" required></div><fieldset class="form-field"><legend class="required">نطاق الخصم</legend><div class="button-row"><label class="radio-line"><input type="radio" name="discountScope" value="all" checked> جميع الخدمات</label><label class="radio-line"><input type="radio" name="discountScope" value="selected"> خدمات مختارة</label></div></fieldset><div id="discountServicesField" class="form-field" hidden><label for="discountServices">اكتب الخدمات المختارة — اختياري</label><textarea id="discountServices" maxlength="500"></textarea></div><div class="form-field"><label for="discountConditions">الشروط والاستثناءات</label><textarea id="discountConditions" maxlength="700"></textarea></div><label class="checkbox-line"><input id="discountContinuous" type="checkbox" checked><span>يستمر حتى أوقفه بنفسي</span></label><div id="discountEndField" class="form-field" hidden><label class="required" for="discountEnd">تاريخ الانتهاء</label><input id="discountEnd" type="date"></div><button class="btn btn-primary" type="submit">تفعيل الخصم</button></form></section></div></section>
  <section class="tab-panel" data-panel="billing" role="tabpanel"><div id="billingStats" class="stats-grid"></div><div class="card mt-16"><div class="button-row"><button id="issueInvoice" class="btn btn-dark" type="button">تشغيل إصدار الفاتورة حسب السياسة</button><span class="muted small">اليوم الأول شهريًا، أو عند بلوغ 100 ريال.</span></div></div><div class="dashboard-grid two mt-16"><section class="card"><h2>الفواتير</h2><div id="invoicesList"></div></section><section class="card"><h2>المدفوعات والإيصالات</h2><div id="paymentsList"></div></section></div><section class="card mt-16"><h2>سجل رسوم الوساطة</h2><div id="feesList"></div></section></section>
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
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
  <title>دخول الشريك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="partner-login">
  <div data-site-header></div>
  <main id="main-content" class="section">
    <div class="container">
      <div class="dashboard-grid two">
        <section class="card">
          <div class="section-head"><div class="kicker">بوابة الشريك</div><h1>تسجيل دخول الشريك</h1><p>تُحفظ جلسة الدخول على هذا الجهاز للوصول إلى بيانات الشريك المرتبطة بها.</p></div>
          <form id="loginForm" class="form-grid" novalidate>
            <div class="form-field"><label class="required" for="partnerCode">رمز الشريك</label><input id="partnerCode" autocomplete="username" value="WA-PARTNER" required></div>
            <div class="form-field"><label class="required" for="partnerPin">الرمز السري</label><input id="partnerPin" type="password" inputmode="numeric" autocomplete="current-password" value="1234" maxlength="8" required></div>
            <button class="btn btn-primary" type="submit">دخول لوحة الشريك</button>
          </form>
        </section>
        <aside class="card">
          <div class="kicker">حساب الشريك</div>
          <h2>بيانات الدخول</h2>
          <div class="guidance-grid">
            <div class="guidance-item"><span>رمز الشريك</span><strong>WA-PARTNER</strong></div>
            <div class="guidance-item"><span>الرمز السري</span><strong>1234</strong></div>
          </div>
          <div class="legal-note">استخدم رمز الشريك والرمز السري المرتبطين بحسابك، ولا تشارك بيانات الدخول.</div>
          <a class="btn btn-light btn-block mt-16" href="join.html">لست شريكًا؟ قدّم طلب انضمام</a>
        </aside>
      </div>
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

