# الكود الكامل لجميع الملفات المعدلة

## `404.html`

```html
<!doctype html>
<html dir="rtl" lang="ar"><head><meta charset="utf-8"/><meta content="الصفحة غير موجودة في منصة وين أوديها." name="description"/><meta content="width=device-width, initial-scale=1" name="viewport"/><meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/><title>الصفحة غير موجودة — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/></head>
<body data-page="not-found"><header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">الصفحة غير موجودة</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><div class="container empty-state"><div class="path-icon" data-icon="search"></div><h1>الصفحة غير موجودة</h1><p>قد يكون الرابط غير صحيح أو تغيّر مسار الصفحة. اختر وجهتك من الخيارات التالية.</p><div class="button-row"><a class="btn btn-primary" href="index.html">الرئيسية</a><a class="btn btn-light" href="track.html">متابعة طلب</a></div></div></main><footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script></body></html>
```

## `customer.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<meta content="#0b1d33" name="theme-color"/>
<meta content="ابدأ طلبك في منصة وين أوديها دون حساب أو كلمة مرور." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>ابدأ طلبك — وين أوديها؟</title>

<link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="customer">
<noscript><div class="noscript-banner">فعّل JavaScript في المتصفح لإكمال طلبك وحفظ تقدمك.</div></noscript>

<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">ابدأ طلبك</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a aria-current="page" href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="flow-shell" id="main-content">
<div class="container flow-layout">
<aside aria-label="تقدم الطلب" class="flow-sidebar">
<div class="kicker">خطوات واضحة من البداية</div>
<h1>طلب جديد</h1>
<p id="flowServiceLabel">اختر ما تحتاجه، وسنحفظ تقدمك تلقائيًا على هذا الجهاز.</p>
<div class="progress-wrap"><div class="progress-meta"><span id="progressLabel">اختيار الخدمة</span><span id="progressPercent">0%</span></div><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" class="progress-track" role="progressbar"><div class="progress-bar" id="progressBar"></div></div></div>
<div class="legal-note mt-24">التوجيه مبدئي، والسعر والتشخيص النهائي لدى مقدم الخدمة بعد الفحص.</div>
</aside>
<div aria-live="polite" class="flow-content">
<section class="flow-screen active" data-screen="service" tabindex="-1">
<div class="kicker">ابدأ من احتياجك</div><h2>وش تحتاج لسيارتك؟</h2><p>اختر الخدمة الأقرب لحالتك، وستظهر لك الخطوات المطلوبة فقط.</p>
<div class="service-choice-grid" id="serviceChoices">
<button class="service-choice primary" data-service="problem" type="button"><span aria-hidden="true" class="service-choice-icon" data-service-icon="problem"></span><span class="service-choice-copy"><strong>عندي مشكلة في السيارة</strong><span>صف الأعراض وأجب عن أربعة أسئلة قصيرة لمعرفة التخصص والاستعجال.</span></span></button>
<button class="service-choice" data-service="parts" type="button"><span aria-hidden="true" class="service-choice-icon" data-service-icon="parts"></span><span class="service-choice-copy"><strong>أبحث عن قطع غيار</strong><span>أدخل القطعة المطلوبة ورقم الهيكل إن توفر، واختر وكالة أو تجارية.</span></span></button>
<button class="service-choice urgent-choice" data-service="tow" type="button"><span aria-hidden="true" class="service-choice-icon" data-service-icon="tow"></span><span class="service-choice-copy"><strong>أحتاج سطحة — عاجل</strong><span>شارك موقع السيارة واكتب وصف المكان للوصول إليك بسرعة.</span></span></button>
<button class="service-choice" data-service="maintenance" type="button"><span aria-hidden="true" class="service-choice-icon" data-service-icon="maintenance"></span><span class="service-choice-copy"><strong>أبحث عن صيانة دورية</strong><span>اختر الخدمة وبيانات السيارة والمنطقة والمدينة.</span></span></button>
</div>
<div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button class="btn btn-primary" disabled="" id="serviceNext" type="button">التالي</button></div>
</section>
<section class="flow-screen" data-screen="customer" tabindex="-1">
<div class="kicker">بيانات التواصل</div><h2>عرّفنا بك</h2><p>نحتاج الاسم الأول والجوال لربط الطلب ومتابعته دون إنشاء حساب.</p>
<form id="customerForm" novalidate="">
<div class="form-grid two"><div class="form-field"><label class="required" for="firstName">الاسم الأول</label><input autocomplete="given-name" id="firstName" maxlength="40" required=""/><span class="field-error" data-error-for="firstName"></span></div><div class="form-field"><label class="required" for="phone">رقم الجوال</label><input autocomplete="tel" id="phone" inputmode="tel" maxlength="10" placeholder="05XXXXXXXX" required=""/><span class="field-error" data-error-for="phone"></span></div></div>
<div class="checkbox-stack mt-24"><label class="checkbox-line"><input id="privacyAccepted" required="" type="checkbox"/><span>أوافق على <a href="privacy.html" rel="noopener" target="_blank">سياسة الخصوصية</a> واستخدام البيانات لتشغيل الطلب.</span></label><label class="checkbox-line"><input id="termsAccepted" required="" type="checkbox"/><span>أوافق على <a href="terms.html" rel="noopener" target="_blank">الشروط وحدود مسؤولية المنصة</a>.</span></label><label class="checkbox-line"><input id="marketingMessages" type="checkbox"/><span>أرغب اختياريًا في تلقي العروض والخدمات الجديدة. رسائل متابعة الطلب ستصلك عند الحاجة.</span></label></div>
<div class="screen-actions"><button class="btn btn-ghost" data-back="service" type="button">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
</form>
</section>
<section class="flow-screen" data-screen="vehicle" tabindex="-1">
<div class="kicker">بيانات السيارة</div><h2>اختر سيارتك</h2><p>بعد اختيار الشركة ستظهر لك الموديلات التابعة لها.</p>
<form id="vehicleForm" novalidate="">
<div class="form-grid two">
<div class="form-field"><label class="required" for="make">الشركة المصنعة</label><select id="make" required=""></select><span class="field-error" data-error-for="make"></span></div>
<div class="form-field" hidden="" id="makeOtherField"><label class="required" for="makeOther">اسم الشركة</label><input id="makeOther" maxlength="60"/><span class="field-error" data-error-for="makeOther"></span></div>
<div class="form-field"><label class="required" for="model">الموديل</label><select disabled="" id="model" required=""><option value="">اختر الشركة أولًا</option></select><span class="field-error" data-error-for="model"></span></div>
<div class="form-field" hidden="" id="modelOtherField"><label class="required" for="modelOther">اسم الموديل</label><input id="modelOther" maxlength="60"/><span class="field-error" data-error-for="modelOther"></span></div>
<div class="form-field"><label class="required" for="year" id="yearLabel">سنة الصنع</label><select id="year"></select><span class="field-error" data-error-for="year"></span></div>
<div class="form-field" id="mileageField"><label class="required" for="mileage">ممشى السيارة</label><select id="mileage"></select><span class="field-error" data-error-for="mileage"></span></div>
<div class="form-field" hidden="" id="fuelField"><label class="required" for="fuelType">نوع الوقود</label><select id="fuelType"></select><span class="field-error" data-error-for="fuelType"></span></div>
</div>
<div class="screen-actions"><button class="btn btn-ghost" data-back="customer" type="button">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
</form>
</section>
<section class="flow-screen" data-screen="location" tabindex="-1">
<div class="kicker">موقع الخدمة</div><h2>حدد المنطقة ثم المدينة</h2><p id="locationHelp">شارك الموقع الدقيق عند الحاجة لتحسين المطابقة.</p>
<form id="locationForm" novalidate="">
<div class="form-grid two"><div class="form-field"><label class="required" for="region">المنطقة</label><select id="region" required=""></select><span class="field-error" data-error-for="region"></span></div><div class="form-field"><label class="required" for="city">المدينة</label><select disabled="" id="city" required=""><option value="">اختر المنطقة أولًا</option></select><span class="field-error" data-error-for="city"></span></div></div>
<div class="location-capture mt-16"><button class="btn btn-light" data-icon="location" id="detectLocation" type="button">تحديد موقعي تلقائيًا</button><div class="field-hint" id="locationStatus" role="status">لم تتم مشاركة الموقع.</div></div>
<div class="form-field mt-16"><label for="preciseLocation" id="preciseLocationLabel">الموقع الدقيق أو نقطة الالتقاء</label><input id="preciseLocation" maxlength="400" placeholder="مثال: حي الريان، قرب محطة كذا"/><span class="field-hint" id="preciseLocationHint">يمكن كتابة الموقع يدويًا، لكن السطحة تتطلب أيضًا مشاركة الإحداثيات.</span><span class="field-error" data-error-for="preciseLocation"></span></div>
<div class="screen-actions"><button class="btn btn-ghost" data-back="vehicle" type="button">السابق</button><button class="btn btn-primary" type="submit">التالي</button></div>
</form>
</section>
<section class="flow-screen" data-screen="path" tabindex="-1">
<div class="kicker">تفاصيل الطلب</div><h2 id="pathTitle">وش المشكلة في سيارتك؟</h2><p id="pathDescription">اكتب وصفك بطريقتك.</p>
<form id="pathForm" novalidate="">
<div id="problemFields"><div class="form-field"><label class="required" for="problem">وصف المشكلة</label><textarea id="problem" maxlength="1200" placeholder="مثال: السيارة ترج إذا وقفت عند الإشارة وتظهر لمبة المكينة"></textarea><span class="field-hint">اكتب متى تظهر المشكلة وأي لمبة أو صوت لاحظته.</span><span class="field-error" data-error-for="problem"></span></div></div>
<div hidden="" id="partsFields">
<div class="form-field"><label for="vin">رقم الهيكل — يفضل كتابته</label><input autocomplete="off" id="vin" maxlength="40" placeholder="VIN / رقم الهيكل"/><span class="field-hint">يساعد المحل على التحقق بصورة أدق من مطابقة القطعة.</span></div>
<div class="form-field mt-16"><label class="required" for="partName">اسم القطعة المطلوبة بدقة</label><input id="partName" maxlength="200" placeholder="مثال: كمبروسر مكيف أو مساعد أمامي يمين"/><span class="field-error" data-error-for="partName"></span></div>
<div class="form-field mt-16"><label class="required" for="partType">نوع القطعة المفضل</label><select id="partType"></select><span class="field-error" data-error-for="partType"></span></div>
</div>
<div hidden="" id="towFields">
<div class="urgent-panel"><strong>طلب سطحة عاجل</strong><p>موقع السيارة التلقائي ووصف المكان مطلوبان قبل الإحالة.</p></div>
<div class="form-grid two"><div class="form-field"><label class="required" for="vehicleMoves">هل السيارة تتحرك؟</label><select id="vehicleMoves"></select><span class="field-error" data-error-for="vehicleMoves"></span></div><div class="form-field"><label for="towDestination">الوجهة إن كانت معروفة</label><input id="towDestination" maxlength="300" placeholder="مثال: ورشة في حي كذا"/></div></div>
<div class="form-field mt-16"><label class="required" for="placeDescription">وصف مكان السيارة</label><textarea id="placeDescription" maxlength="500" placeholder="مثال: طريق الملك عبدالعزيز، بجوار المحطة، السيارة على الجهة اليمنى"></textarea><span class="field-error" data-error-for="placeDescription"></span></div>
<div class="form-field mt-16"><label for="towNotes">وصف مختصر للحالة</label><textarea id="towNotes" maxlength="500" placeholder="مثال: السيارة لا تشتغل والإطار الأمامي متضرر"></textarea></div>
</div>
<div hidden="" id="maintenanceFields"><div class="form-field"><label class="required" for="maintenanceService">الخدمة المطلوبة</label><select id="maintenanceService"></select><span class="field-error" data-error-for="maintenanceService"></span></div><div class="form-field mt-16"><label for="maintenanceNotes">ملاحظة اختيارية</label><textarea id="maintenanceNotes" maxlength="500"></textarea></div></div>
<div class="screen-actions"><button class="btn btn-ghost" data-back="location" type="button">السابق</button><button class="btn btn-primary" id="pathSubmit" type="submit">متابعة</button></div>
</form>
</section>
<section class="flow-screen" data-screen="analyzing" tabindex="-1"><div class="loading-shell"><div class="skeleton-icon"></div><h2>نراجع الأعراض التي وصفتها</h2><p>نرتب المعلومات ونجهز أسئلة قصيرة تساعدك على معرفة الاتجاه المناسب مبدئيًا.</p><div class="loader-steps" id="analysisSteps"><div class="loader-step">فهم وصف المشكلة</div><div class="loader-step">تحديد التخصص المحتمل</div><div class="loader-step">إعداد أربعة أسئلة مناسبة</div></div></div></section>
<section class="flow-screen" data-screen="questions" tabindex="-1"><div class="kicker" id="questionTitle">سؤال 1 من 4</div><h2 id="questionText"></h2><p>اختر الإجابة الأقرب. لا تقلق إن لم تكن متأكدًا.</p><div class="choice-row" id="answerChoices"></div><div class="screen-actions"><button class="btn btn-ghost" id="questionBack" type="button">السابق</button><button class="btn btn-primary" disabled="" id="questionNext" type="button">التالي</button></div></section>
<section class="flow-screen" data-screen="guidance" tabindex="-1"><div class="kicker">النتيجة المبدئية</div><h2>هذا هو الاتجاه الأقرب</h2><div class="danger-panel" hidden="" id="dangerPanel"></div><div class="guidance-grid"><div class="guidance-item"><span>المشكلة المتوقعة مبدئيًا</span><strong id="expectedIssue"></strong></div><div class="guidance-item"><span>التخصص المناسب</span><strong id="specialty"></strong></div><div class="guidance-item"><span>درجة الاستعجال</span><strong id="urgency"></strong></div><div class="guidance-item"><span>ما يجب فعله الآن</span><strong id="nextStep"></strong></div></div><div class="legal-note mt-16" id="legalNotice"></div><div class="screen-actions"><button class="btn btn-ghost" data-back="path" type="button">تعديل الوصف</button><button class="btn btn-primary" data-icon="search" id="findPartner" type="button">وين أوديها؟</button></div></section>
<section class="flow-screen" data-screen="review" tabindex="-1"><div class="kicker">قبل الترشيح</div><h2>راجع بيانات طلبك</h2><div class="guidance-grid" id="reviewContent"></div><div class="legal-note mt-16" id="serviceDisclaimer"></div><div class="screen-actions"><button class="btn btn-ghost" data-back="path" type="button">تعديل</button><button class="btn btn-primary" data-icon="search" id="reviewMatch" type="button">ابحث عن شريك</button></div></section>
<section class="flow-screen" data-screen="matching" tabindex="-1"><div class="loading-shell"><div class="skeleton-icon"></div><h2>نبحث عن الشريك الأنسب لطلبك</h2><div class="loader-steps"><div class="loader-step">تأكيد بيانات الطلب</div><div class="loader-step">مطابقة الخدمة والمدينة</div><div class="loader-step">تجهيز بيانات التواصل</div></div></div></section>
<section class="flow-screen" data-screen="result" tabindex="-1"><div class="success-panel" id="resultHeader"></div><div id="partnerResult"></div><section aria-labelledby="contactPartnerTitle" class="contact-card mt-16"><div><div class="kicker">جاهز للتواصل</div><h2 id="contactPartnerTitle">تواصل مع الشريك</h2><p>جهزنا رسالة مختصرة تحتوي على رقم الطلب وتفاصيل الخدمة.</p></div><div class="button-row contact-actions"><a class="btn btn-primary" href="#" id="whatsappLink" rel="noopener" target="_blank">التواصل عبر واتساب</a><button class="btn btn-light" id="copyWhatsapp" type="button">نسخ الرسالة</button></div></section><section class="private-link-card mt-24"><div><span class="pill">احتفظ به</span><h2>رابط طلبك الخاص</h2><p>للعودة والمتابعة دون كلمة مرور.</p></div><div class="compact-link-row"><input aria-label="رابط الطلب الخاص" id="privateLink" readonly=""/><button aria-label="نسخ رابط الطلب" class="icon-action" id="copyPrivateLink" type="button">نسخ</button><a aria-label="فتح متابعة الطلب" class="icon-action" href="track.html" id="openTrackLink">فتح</a><a aria-label="طلب شريك آخر" class="icon-action alternative-action" href="track.html" id="requestAlternativeLink">↻ <span>أريد ورشة أخرى</span></a></div></section></section>
<section class="flow-screen" data-screen="noMatch" tabindex="-1"><div class="empty-state"><h2>لا يوجد تطابق حاليًا</h2><p id="noMatchReason"></p><p>عدّل المدينة أو الموقع، أو أعد المحاولة لاحقًا عند توفر شريك مناسب.</p><div class="screen-actions"><button class="btn btn-light" data-back="location" type="button">تعديل الموقع</button><a class="btn btn-primary" href="index.html">الرئيسية</a></div></div></section>
</div>
</div>
</main>

<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/ai-engine.js"></script><script defer="" src="assets/matching-engine.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script><script defer="" src="assets/customer.js"></script>
</body>
</html>
```

## `index.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<meta content="#0b1d33" name="theme-color"/>
<meta content="وين أوديها تساعدك على فهم مشكلة سيارتك مبدئيًا والوصول إلى مقدم خدمة مناسب بخطوات واضحة ومباشرة." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>وين أوديها؟ — وجهتك للخدمة المناسبة</title>

<link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="home">
<div aria-label="مزايا وين أوديها" class="announcement-ticker" role="region">
<div class="announcement-ticker__track">
<div class="announcement-ticker__group">
<span>🚗 صف مشكلتك باختصار</span>
<span>💸 خدمة مجانية 100%</span>
<span>🎁 خصومات حصرية لعملاء الموقع</span>
<span>🛡️ اهتمام وأولوية من الورش لعملائنا</span>
<span>🔧 ورش مختارة بعناية</span>
<span>🎯 خيارات مطابقة لطلبك</span>
<span>⭐ قيّم الخدمة وشاركنا تجربتك</span>
</div>
<div aria-hidden="true" class="announcement-ticker__group">
<span>🚗 صف مشكلتك باختصار</span>
<span>💸 خدمة مجانية 100%</span>
<span>🎁 خصومات حصرية لعملاء الموقع</span>
<span>🛡️ اهتمام وأولوية من الورش لعملائنا</span>
<span>🔧 ورش مختارة بعناية</span>
<span>🎯 خيارات مطابقة لطلبك</span>
<span>⭐ قيّم الخدمة وشاركنا تجربتك</span>
</div>
</div>
</div>
<noscript>
<div class="noscript-banner">فعّل JavaScript في المتصفح لإكمال طلبك وحفظ تقدمك.</div>
</noscript>

<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">الرئيسية</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a aria-current="page" href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="home-main" id="main-content">
<section aria-labelledby="home-title" class="home-hero">
<div class="container home-hero__content">
<div class="eyebrow">أقرب درب للورشة الصح</div>
<h1 id="home-title">
          عندك مشكلة في السيارة؟
          <span>قل لنا وش فيها… ونقول لك وين توديها...</span>
</h1>
<p class="home-hero__description">
        ونوفر عليك الوقت والدراهم
        </p>
<div class="home-hero__actions">
<a class="btn btn-primary home-primary-cta" data-icon="car" href="customer.html?service=problem&amp;fresh=1">
              اضغط هنا.. اوصف المشكلة.. وندلّك
          </a>
<a class="home-track-link" data-icon="track" href="track.html">تابع طلبك السابق</a>
</div>
<div style="margin-top: 24px; margin-bottom: 12px; font-size: 0.85rem; font-weight: 700; color: #59677d;"> خدمات إضافية وخصومات حصرية لعملاء وين أوديها:</div>
<nav aria-label="خدمات أخرى" class="home-service-pills">
<a class="home-service-pill home-service-pill--parts" data-service-icon="parts" href="customer.html?service=parts&amp;fresh=1">
<span>قطع الغيار</span>
</a>
<a class="home-service-pill home-service-pill--tow" data-service-icon="tow" href="customer.html?service=tow&amp;fresh=1">
<span>اطلب سطحة</span>
</a>
<a class="home-service-pill home-service-pill--maintenance" data-service-icon="maintenance" href="customer.html?service=maintenance&amp;fresh=1">
<span>خدمات صيانة دورية</span>
</a>
</nav>
</div>
</section>
</main>

<footer class="site-footer unified-site-footer home-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a aria-current="page" href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script>
<script defer="" src="assets/automotive-data.js"></script>
<script defer="" src="assets/storage.js"></script>
<script defer="" src="assets/seed.js"></script>
<script defer="" src="assets/lifecycle.js"></script>
<script defer="" src="assets/common.js"></script>
</body>
</html>
```

## `join-status.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/><meta content="متابعة حالة طلب الانضمام إلى شبكة شركاء وين أوديها." name="description"/><meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/><meta content="#0b1d33" name="theme-color"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>حالة طلب الانضمام — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="join-status">
<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">متابعة الانضمام</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><div class="container">
<section class="card" id="joinLookup"><div class="section-head"><div class="kicker">متابعة طلب الشراكة</div><h1>حالة طلب الانضمام</h1><p>أدخل رقم طلب الانضمام ورقم الجوال للاطلاع على آخر تحديث.</p></div><form class="form-grid two" id="joinLookupForm"><div class="form-field"><label class="required" for="joinNumber">رقم الطلب</label><input id="joinNumber" placeholder="JOIN-12345" required=""/></div><div class="form-field"><label class="required" for="joinPhone">رقم الجوال</label><input id="joinPhone" inputmode="tel" maxlength="10" required=""/></div><button class="btn btn-primary" type="submit">عرض الحالة</button></form></section>
<section class="card" hidden="" id="joinResult"><div class="kicker">طلب الشراكة</div><div id="joinResultContent"></div><div class="button-row mt-16"><a class="btn btn-light" href="join-status.html">بحث آخر</a><a class="btn btn-primary" href="index.html">الرئيسية</a></div></section>
<section class="empty-state" hidden="" id="joinNotFound"><h1>لم نعثر على طلب الانضمام</h1><p>تحقق من رقم الطلب والجوال ثم أعد المحاولة.</p><a class="btn btn-primary" href="join-status.html">المحاولة مرة أخرى</a></section>
</div></main>
<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script><script defer="" src="assets/join-status.js"></script>
</body></html>
```

## `join.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<meta content="#0b1d33" name="theme-color"/>
<meta content="قدّم طلب انضمام كشريك في منصة وين أوديها وفق نوع نشاطك." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>انضم كشريك — وين أوديها؟</title>

<link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="join">

<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">انضم كشريك</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a aria-current="page" href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="flow-shell" id="main-content">
<div class="container flow-layout">
<aside class="flow-sidebar">
<div class="kicker light-kicker">ابدأ شراكتك بخطوات واضحة</div>
<h1>انضم إلى شبكة الشركاء</h1>
<p>اختر نوع نشاطك وأكمل البيانات التي تساعدنا على مطابقة الإحالات المناسبة لك.</p>
<div class="progress-wrap">
<div class="progress-meta"><span id="joinProgressLabel">البيانات الأساسية</span><span id="joinProgressPercent">20%</span></div>
<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="20" class="progress-track" role="progressbar"><div class="progress-bar" id="joinProgressBar"></div></div>
</div>
<div class="legal-note mt-24">أدخل بيانات دقيقة؛ فهي الأساس في مطابقة الطلبات وعرض معلومات نشاطك للعملاء.</div>
</aside>
<div class="flow-content">
<form id="joinForm" novalidate="">
<section class="flow-screen active" data-join-step="1" tabindex="-1">
<div class="kicker">الخطوة 1 من 5</div>
<h2>نوع الشريك والبيانات الأساسية</h2>
<p>ستظهر لك الوثائق والحقول المناسبة لنوع نشاطك.</p>
<div class="form-grid two">
<div class="form-field"><label class="required" for="partnerType">نوع الشريك</label><select id="partnerType" required=""><option value="">اختر</option><option value="workshop">ورشة إصلاح وتشخيص</option><option value="maintenance">مركز صيانة دورية</option><option value="parts">محل قطع غيار</option><option value="tow">مقدم خدمة سطحة</option></select></div>
<div class="form-field"><label class="required" for="businessName">اسم المنشأة أو مقدم الخدمة</label><input id="businessName" maxlength="100" required=""/></div>
<div class="form-field"><label class="required" for="tradeName">الاسم التجاري</label><input id="tradeName" maxlength="100" required=""/></div>
<div class="form-field"><label class="required" for="activityDescription">وصف مختصر للنشاط</label><textarea id="activityDescription" maxlength="500" required=""></textarea></div>
<div class="form-field"><label class="required" for="joinRegion">المنطقة</label><select id="joinRegion" required=""></select></div>
<div class="form-field"><label class="required" for="joinCity">المدينة</label><select disabled="" id="joinCity" required=""><option value="">اختر المنطقة أولًا</option></select></div>
<div class="form-field"><label class="required" for="address">العنوان</label><input id="address" maxlength="250" required=""/></div>
<div class="form-field"><label class="required" for="googleMapsUrl">رابط الموقع على خرائط Google</label><input id="googleMapsUrl" maxlength="1200" placeholder="https://maps.google.com/..." required="" type="url"/></div>
<div class="form-field"><label class="required" for="joinWhatsapp">رقم واتساب</label><input id="joinWhatsapp" inputmode="tel" maxlength="10" placeholder="05XXXXXXXX" required=""/></div>
<div class="form-field"><label for="secondaryPhone">رقم تواصل إضافي</label><input id="secondaryPhone" inputmode="tel" maxlength="10"/></div>
</div>
<section class="activity-block mt-24" hidden="" id="businessDocuments">
<div class="section-head compact"><h3>الوثائق النظامية</h3><p>مطلوبة للورش ومراكز الصيانة ومحلات قطع الغيار.</p></div>
<div class="form-grid two">
<div class="form-field"><label class="required" for="commercialRegistration">رقم السجل التجاري</label><input id="commercialRegistration" maxlength="40"/></div>
<div class="form-field"><label class="required" for="registeredName">اسم المنشأة حسب السجل</label><input id="registeredName" maxlength="120"/></div>
<div class="form-field"><label for="commercialExpiry">تاريخ انتهاء السجل</label><input id="commercialExpiry" type="date"/></div>
</div>
</section>
<section class="activity-block mt-24" hidden="" id="towDocuments">
<div class="section-head compact"><h3>بيانات تشغيل السطحة</h3><p>أدخل بيانات بطاقة التشغيل والمركبة المستخدمة لتقديم الخدمة.</p></div>
<div class="form-grid two">
<div class="form-field"><label class="required" for="operationCardNumber">رقم بطاقة التشغيل</label><input id="operationCardNumber" maxlength="50"/></div>
<div class="form-field"><label class="required" for="operationCardExpiry">تاريخ انتهاء بطاقة التشغيل</label><input id="operationCardExpiry" type="date"/></div>
<div class="form-field"><label class="required" for="towVehiclePlate">رقم لوحة مركبة السطحة</label><input id="towVehiclePlate" maxlength="30"/></div>
</div>
</section>
<div class="screen-actions"><a class="btn btn-ghost" href="index.html">إلغاء</a><button class="btn btn-primary" data-join-next="2" type="button">التالي</button></div>
</section>
<section class="flow-screen" data-join-step="2" tabindex="-1">
<div class="kicker">الخطوة 2 من 5</div>
<h2>ساعات العمل لكل يوم</h2>
<p>حدد مواعيد الاستقبال لكل يوم، وأضف فترة ثانية عند الحاجة.</p>
<div class="button-row mt-16"><button class="btn btn-light btn-sm" id="copySundaySchedule" type="button">نسخ ساعات الأحد لبقية الأيام المفتوحة</button><button class="btn btn-ghost btn-sm" id="openAllDays" type="button">فتح جميع الأيام</button></div>
<div class="daily-schedule-list mt-16" id="dailyScheduleEditor"></div>
<div class="screen-actions"><button class="btn btn-ghost" data-join-back="1" type="button">السابق</button><button class="btn btn-primary" data-join-next="3" type="button">التالي</button></div>
</section>
<section class="flow-screen" data-join-step="3" tabindex="-1">
<div class="kicker">الخطوة 3 من 5</div>
<h2>التغطية والخدمات</h2>
<div class="form-field"><label class="required" for="coverageCities">مدن التغطية</label><select id="coverageCities" multiple="" required="" size="7"></select><span class="field-hint">تُضاف مدينتك الأساسية تلقائيًا، ويمكنك تحديد مدن إضافية تخدمها.</span></div>
<section class="activity-block mt-24" hidden="" id="workshopAdaptive">
<div class="section-head compact"><h3>تخصصات الورشة</h3><p>اختر تخصصاتك ورتبها حسب الأولوية، وسيُعتمد الأول كتخصص رئيسي.</p></div>
<div class="priority-selector" id="specialtySelector"><div><h3>التخصصات المتاحة</h3><div class="selector-list" id="availableSpecialties"></div></div><div><h3>التخصصات المختارة</h3><ol class="selected-priority-list" id="selectedSpecialties"></ol></div></div>
</section>
<section class="activity-block mt-24" hidden="" id="makeAndFuelAdaptive">
<div class="section-head compact"><h3 id="makeSectionTitle">الشركات المصنعة التي تخدمها</h3><p>اختر العلامات التي تخدمها ورتبها حسب الأولوية.</p></div>
<div class="priority-selector" id="makeSelector"><div><h3>الشركات المتاحة</h3><div class="selector-list" id="availableMakes"></div></div><div><h3>الشركات المختارة</h3><ol class="selected-priority-list" id="selectedMakes"></ol></div></div>
<fieldset class="form-field mt-24" id="fuelTypesField"><legend class="required">أنواع الوقود التي تخدمها</legend><div class="checkbox-grid" id="fuelTypesJoin"></div></fieldset>
</section>
<section class="activity-block mt-24" hidden="" id="towAdaptive">
<div class="section-head compact"><h3>نطاق خدمة السطحة</h3><p>حدد أنواع المركبات التي تستطيع نقلها ضمن نطاق تغطيتك.</p></div>
<div class="form-field"><label class="required" for="towVehicleTypes">أنواع المركبات الممكن نقلها</label><textarea id="towVehicleTypes" maxlength="250" placeholder="مثال: سيدان، دفع رباعي، بيك أب"></textarea></div>
</section>
<section class="activity-block mt-24" hidden="" id="maintenanceAdaptive">
<div class="section-head compact"><h3>خدمات الصيانة الدورية</h3><p>اختر خدمات الصيانة المتوفرة لديك.</p></div>
<div class="form-field"><label class="required" for="maintenanceServicesJoin">الخدمات المتاحة</label><select id="maintenanceServicesJoin" multiple="" size="8"></select></div>
</section>
<section class="activity-block mt-24" hidden="" id="partsAdaptive">
<div class="section-head compact"><h3>أنواع قطع الغيار</h3><p>حدد أنواع القطع التي يوفرها المحل عادةً، وسيؤكد العميل التوفر مباشرة معك.</p></div>
<fieldset class="form-field"><legend class="required">أنواع القطع التي يوفرها المحل عادةً</legend><div class="checkbox-grid"><label class="checkbox-line"><input name="partTypesJoin" type="checkbox" value="وكالة"/><span>وكالة</span></label><label class="checkbox-line"><input name="partTypesJoin" type="checkbox" value="تجارية"/><span>تجارية</span></label></div></fieldset>
</section>
<div class="screen-actions"><button class="btn btn-ghost" data-join-back="2" type="button">السابق</button><button class="btn btn-primary" data-join-next="4" type="button">التالي</button></div>
</section>
<section class="flow-screen" data-join-step="4" tabindex="-1">
<div class="kicker">الخطوة 4 من 5</div>
<h2>خصم عملاء «وين أوديها»</h2>
<label class="checkbox-line"><input id="offersDiscount" type="checkbox"/><span>أقدم خصمًا لعملاء «وين أوديها»</span></label>
<div class="mt-16" hidden="" id="discountJoinFields">
<div class="form-grid two">
<div class="form-field"><label class="required" for="joinDiscountPercent">نسبة الخصم %</label><input id="joinDiscountPercent" max="50" min="1" type="number"/></div>
<div class="form-field"><label class="required" for="joinDiscountStart">تاريخ البداية</label><input id="joinDiscountStart" type="date"/></div>
</div>
<fieldset class="form-field mt-16"><legend class="required">نطاق الخصم</legend><div class="button-row"><label class="radio-line"><input checked="" name="joinDiscountScope" type="radio" value="all"/> جميع الخدمات</label><label class="radio-line"><input name="joinDiscountScope" type="radio" value="selected"/> خدمات مختارة</label></div></fieldset>
<div class="form-field mt-16" hidden="" id="joinSelectedServicesField"><label for="joinDiscountServices">اكتب الخدمات المختارة — اختياري</label><textarea id="joinDiscountServices" maxlength="500" placeholder="مثال: أجور اليد للميكانيكا والكهرباء"></textarea></div>
<div class="form-field mt-16"><label for="joinDiscountConditions">الشروط والاستثناءات</label><textarea id="joinDiscountConditions" maxlength="700"></textarea></div>
<label class="checkbox-line mt-16"><input checked="" id="continuousDiscount" type="checkbox"/><span>يستمر الخصم حتى أوقفه بنفسي من صفحة الشريك</span></label>
<div class="form-field mt-16" hidden="" id="joinDiscountEndField"><label class="required" for="joinDiscountEnd">تاريخ انتهاء الخصم</label><input id="joinDiscountEnd" type="date"/></div>
</div>
<div class="screen-actions"><button class="btn btn-ghost" data-join-back="3" type="button">السابق</button><button class="btn btn-primary" data-join-next="5" type="button">التالي</button></div>
</section>
<section class="flow-screen" data-join-step="5" tabindex="-1">
<div class="kicker">الخطوة 5 من 5</div>
<h2>الموافقات والتعهد</h2>
<div class="guidance-grid" id="joinReview"></div>
<div class="fee-policy-box mt-24"><h3>شرائح رسوم الوساطة</h3><ul><li>أقل من 50 ريالًا: بلا رسوم.</li><li>50–أقل من 200: 5 ريالات.</li><li>200–400: 10 ريالات.</li><li>أكثر من 400: 25 ريالًا.</li></ul><p>تصدر الفاتورة في اليوم الأول من الشهر، ويصبح السداد إلزاميًا عند بلوغ الرصيد 100 ريال. مهلة الاعتراض 15 يومًا.</p></div>
<div class="checkbox-stack mt-24">
<label class="checkbox-line"><input id="agreementAccepted" required="" type="checkbox"/><span>أوافق على اتفاقية الشراكة وآلية الإحالات.</span></label>
<label class="checkbox-line"><input id="feesAccepted" required="" type="checkbox"/><span>أوافق على شرائح الرسوم والفوترة وحد السداد ومهلة الاعتراض.</span></label>
<label class="checkbox-line"><input id="ratingsAccepted" required="" type="checkbox"/><span>أوافق على التقييمات الموثقة وسياسة الاعتراضات.</span></label>
<label class="checkbox-line"><input id="privacyTrustAccepted" required="" type="checkbox"/><span>ألتزم بحماية بيانات العملاء وعدم استخدامها للتسويق دون موافقة.</span></label>
<label class="checkbox-line honesty-pledge"><input id="honestyPledge" required="" type="checkbox"/><span>أتعهد أمام الله تعالى ثم أمام منصة «وين أوديها» بأن جميع البيانات التي قدمتها صحيحة، وأن أتعامل مع إحالات العملاء ورسوم الوساطة بأمانة وصدق، وألا أخفي أي خدمة تمت عن طريق المنصة، وأن ألتزم بالخصومات المعلنة، وبحقوق العملاء، وبالشروط والسياسات المعتمدة. وأتحمل مسؤولية أي بيانات أو تأكيدات غير صحيحة أقدمها.</span></label>
</div>
<div class="screen-actions"><button class="btn btn-ghost" data-join-back="4" type="button">السابق</button><button class="btn btn-primary" type="submit">إرسال طلب الانضمام</button></div>
</section>
</form>
<section class="flow-screen" id="joinSuccess" tabindex="-1">
<div class="success-panel"><strong>وصلنا طلب انضمامك</strong><p>احتفظ برقم الطلب لمتابعة حالة الانضمام في أي وقت.</p></div>
<div class="guidance-grid mt-16"><div class="guidance-item"><span>رقم طلب الانضمام</span><strong id="joinApplicationNumber"></strong></div><div class="guidance-item"><span>الحالة</span><strong>تم الاستلام — قيد المراجعة</strong></div></div>
<div class="screen-actions"><a class="btn btn-primary" href="join-status.html" id="joinStatusLink">متابعة الطلب</a><a class="btn btn-light" href="index.html">الرئيسية</a></div>
</section>
</div>
</div>
</main>

<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a aria-current="page" href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script><script defer="" src="assets/join.js"></script>
</body>
</html>
```

## `payment.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/><meta content="#0b1d33" name="theme-color"/>
<meta content="مراجعة وسداد فاتورة رسوم الوساطة لشركاء وين أوديها." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>سداد الفاتورة — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="payment">
<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">سداد الفاتورة</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><div class="container payment-layout">
<section class="card" id="paymentCard"><div class="section-head"><div class="kicker">تسوية حساب الشريك</div><h1>سداد فاتورة رسوم الوساطة</h1><p>راجع تفاصيل الفاتورة، ثم اختر طريقة السداد وسجّل العملية.</p></div><div class="guidance-grid" id="claimSummary"></div><form class="form-grid mt-24" id="paymentForm"><fieldset class="form-field"><legend class="required">طريقة السداد</legend><label class="radio-line payment-method"><input checked="" name="paymentMethod" type="radio" value="bank_transfer"/><span>تحويل بنكي</span></label><label class="radio-line payment-method"><input name="paymentMethod" type="radio" value="sadad"/><span>سداد</span></label></fieldset><label class="checkbox-line"><input id="confirmPayment" required="" type="checkbox"/><span>أؤكد صحة بيانات السداد المدخلة.</span></label><button class="btn btn-primary" data-icon="payment" type="submit">تسجيل السداد</button></form></section>
<section class="empty-state" hidden="" id="paymentMissing"><h1>الفاتورة غير موجودة</h1><p>تحقق من الرابط أو ارجع إلى لوحة الشريك لفتح الفاتورة الصحيحة.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة إلى اللوحة</a></section>
</div></main>
<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script><script defer="" src="assets/payment.js"></script>
</body></html>
```

## `privacy.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/><meta content="#0b1d33" name="theme-color"/>
<meta content="سياسة خصوصية منصة وين أوديها واستخدام بيانات العملاء والشركاء." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>سياسة الخصوصية — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="privacy">
<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">الخصوصية</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a aria-current="page" href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><article class="container legal-document"><div class="section-head"><div class="kicker">خصوصيتك مهمة</div><h1>سياسة الخصوصية</h1><p>توضح هذه السياسة البيانات التي نحتاجها لتشغيل الخدمة وكيف نستخدمها ونحافظ عليها.</p></div>
<section><h2>البيانات التي نجمعها</h2><p>قد تشمل البيانات الاسم الأول، رقم الجوال، بيانات السيارة، رقم الهيكل عند إدخاله، المنطقة والمدينة، الموقع الدقيق عند الحاجة، وصف الطلب، الإجابات، بيانات الإحالات، فئة تكلفة الخدمة بعد تنفيذها، والتقييمات.</p></section>
<section><h2>لماذا نستخدم البيانات؟</h2><p>نستخدمها لإنشاء الطلب، وفهم الاحتياج مبدئيًا، واختيار الشريك، وتسجيل الإحالة، ومتابعة النتيجة، وإدارة التقييمات والاعتراضات والرسوم والفواتير، وتحسين جودة الخدمة.</p></section>
<section><h2>حفظ البيانات</h2><p>تُحفظ بيانات الطلب والجلسة على الجهاز المستخدم لتسهيل المتابعة والعودة إلى الطلب. حذف بيانات الموقع من المتصفح قد يؤدي إلى فقدان النسخة المحفوظة على هذا الجهاز.</p></section>
<section><h2>مشاركة البيانات</h2><p>لا يظهر لمقدم الخدمة إلا ما يحتاج إليه للتعامل مع الإحالة. ولا يجوز له استخدام بيانات العميل للتسويق دون موافقة مستقلة.</p></section>
<section><h2>الرسائل التشغيلية والتسويقية</h2><p>رسائل متابعة الطلب مرتبطة بالخدمة القائمة. أما الرسائل التسويقية فهي اختيارية، ولا تؤثر الموافقة عليها أو رفضها في متابعة طلبك.</p></section>
<section><h2>حقوق المستخدم</h2><p>يمكن للمستخدم طلب تصحيح بياناته أو الاستفسار عن استخدامها وفق القنوات المعتمدة لدى المنصة، مع مراعاة السجلات التي يلزم الاحتفاظ بها لأغراض التشغيل والرسوم والاعتراضات.</p></section>
<div class="info-panel mt-24"><strong>مبدأنا</strong><p>نجمع الحد الأدنى من البيانات اللازمة لتشغيل الخدمة، ولا نشاركها خارج الغرض الذي جُمعت من أجله.</p></div></article></main>
<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a aria-current="page" href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script>
</body></html>
```

## `receipt.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/><meta content="إيصال سداد رسوم الوساطة لشركاء وين أوديها." name="description"/><meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/><meta content="#0b1d33" name="theme-color"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>إيصال سداد — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="receipt">
<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">إيصال السداد</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><div class="container"><section class="receipt" id="receiptCard"><div class="receipt-head"><div><div class="kicker">إيصال السداد</div><h1>إيصال سداد</h1></div><div class="brand"><span class="brand-mark">و</span><span><strong>وين أوديها؟</strong><small>رسوم الشريك</small></span></div></div><div id="receiptContent"></div><div class="button-row mt-24 no-print"><button class="btn btn-primary" id="printReceipt" type="button">طباعة</button><a class="btn btn-light" href="workshop-dashboard.html">العودة للوحة</a></div></section><section class="empty-state" hidden="" id="receiptMissing"><h1>الإيصال غير موجود</h1><p>تحقق من رابط الإيصال أو ارجع إلى لوحة الشريك لمراجعة المدفوعات.</p><a class="btn btn-primary" href="workshop-dashboard.html">العودة للوحة</a></section></div></main>
<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script><script defer="" src="assets/receipt.js"></script>
</body></html>
```

## `terms.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/><meta content="#0b1d33" name="theme-color"/>
<meta content="شروط استخدام منصة وين أوديها وحدود المسؤولية وآلية الإحالات والرسوم." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>الشروط وحدود المسؤولية — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="terms">
<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">الشروط</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a aria-current="page" href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><article class="container legal-document"><div class="section-head"><div class="kicker">استخدام واضح ومسؤول</div><h1>الشروط وحدود المسؤولية</h1><p>باستخدام المنصة فإنك تقر بفهم طبيعة خدمة التوجيه والإحالة وحدود دور كل طرف.</p></div>
<section><h2>طبيعة المنصة</h2><p>«وين أوديها» منصة توجيه وإحالة تساعد المستخدم على الوصول إلى مقدم خدمة مناسب. لا تفحص السيارة، ولا تقدم تشخيصًا نهائيًا، ولا تنفذ الإصلاح أو بيع القطع أو النقل أو الصيانة.</p></section>
<section><h2>التوجيه الفني</h2><p>أي نتيجة فنية تظهر هي توقع مبدئي مبني على البيانات المدخلة، ولا تغني عن الفحص الفعلي. لا ينبغي استبدال قطعة أو اتخاذ قرار إصلاحي بناءً على النتيجة وحدها.</p></section>
<section><h2>السلامة</h2><p>عند ظهور مؤشرات خطر مثل ضعف الفرامل أو رائحة الوقود أو ارتفاع الحرارة أو توقف السيارة في موقع خطر، لا تستمر في القيادة إذا كان ذلك غير آمن، واستخدم السطحة أو تواصل مع الجهة المناسبة للحالة.</p></section>
<section><h2>مسؤولية مقدم الخدمة</h2><p>مقدم الخدمة شريك مستقل ومسؤول عن الفحص والتشخيص النهائي وجودة العمل والضمانات والموعد والسعر والاتفاق المباشر مع العميل.</p></section>
<section><h2>الأسعار والتوفر</h2><p>لا تعرض المنصة أسعارًا تقديرية. تتأكد من السعر والتوفر والموعد والمطابقة النهائية مباشرة مع مقدم الخدمة قبل تنفيذ العمل.</p></section>
<section><h2>الإحالات ورسوم الوساطة</h2><p>تُسجل الإحالة قبل إظهار بيانات الشريك. لا يستحق رسم الوساطة لمجرد عرض البيانات أو فتح واتساب. بعد تأكيد تلقي الخدمة تُسجل فئة التكلفة وتُحتسب الرسوم وفق الشرائح المعتمدة: أقل من 50 ريالًا بلا رسوم، ومن 50 إلى أقل من 200 بخمسة ريالات، ومن 200 إلى 400 بعشرة ريالات، وأكثر من 400 بخمسة وعشرين ريالًا.</p></section>
<section><h2>الفوترة والاعتراضات</h2><p>تصدر الفاتورة في اليوم الأول من الشهر، ويصبح السداد إلزاميًا عند بلوغ الرصيد 100 ريال. ويحق للشريك الاعتراض على العملية المالية خلال 15 يومًا من تاريخ إصدار الفاتورة.</p></section>
<section><h2>التقييمات</h2><p>لا يُقبل التقييم إلا عندما يرتبط بطلب وإحالة وخدمة مؤكدة. يمكن للشريك تقديم اعتراض مسبب، ولا يملك حذف التقييم مباشرة.</p></section>
<div class="info-panel mt-24"><strong>حدود المسؤولية</strong><p>دور «وين أوديها» هو التوجيه والإحالة والمتابعة، أما تنفيذ الخدمة ونتيجتها وضمانها والاتفاق المالي النهائي فهي مسؤولية مقدم الخدمة والعميل.</p></div></article></main>
<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a aria-current="page" href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script>
</body></html>
```

## `track.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<meta content="#0b1d33" name="theme-color"/>
<meta content="متابعة طلب وين أوديها عبر رابط خاص دون كلمة مرور." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>متابعة الطلب — وين أوديها؟</title>

<link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="track">

<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">متابعة الطلب</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a aria-current="page" href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content">
<div class="container">
<section class="card" id="lookupSection">
<div class="section-head"><div class="kicker">كل تفاصيل طلبك في مكان واحد</div><h1>تابع طلبك</h1><p>استخدم رابط الطلب الخاص، أو أدخل رقم الطلب والجوال لاستعادة التفاصيل بأمان.</p></div>
<form class="form-grid two" id="lookupForm" novalidate="">
<div class="form-field"><label class="required" for="requestNumber">رقم الطلب</label><input autocomplete="off" id="requestNumber" placeholder="WA-12345" required=""/></div>
<div class="form-field"><label class="required" for="lookupPhone">رقم الجوال</label><input id="lookupPhone" inputmode="tel" maxlength="10" placeholder="05XXXXXXXX" required=""/></div>
<div class="button-row"><button class="btn btn-primary" type="submit">عرض الطلب</button><a class="btn btn-light" href="customer.html?fresh=1">ابدأ طلبًا جديدًا</a></div>
</form>
</section>
<section hidden="" id="requestSection">
<div class="request-header" id="requestHeader"></div>
<div class="warning-panel mb-0" hidden="" id="closedNotice"></div>
<div class="dashboard-grid two mt-16">
<div>
<div id="activePartner"></div>
<div class="card mt-16" id="requestActions"></div>
<div class="card mt-16" id="ratingPanel"></div>
</div>
<aside>
<section class="card">
<h2>تفاصيل الطلب</h2>
<div class="guidance-grid" id="requestSummary"></div>
</section>
<section class="card mt-16">
<h2>سجل الشركاء</h2>
<div class="timeline" id="referralTimeline"></div>
</section>
</aside>
</div>
<section aria-label="رابط الطلب والإحالة البديلة" class="private-link-card mt-24" id="requestLinkPanel"></section>
</section>
<section class="empty-state" hidden="" id="notFoundSection">
<div class="path-icon" data-icon="search"></div><h1>لم نعثر على الطلب</h1><p>تحقق من رقم الطلب والجوال، أو افتح الرابط الخاص المرسل لك عند إنشاء الطلب.</p><a class="btn btn-primary" href="track.html">المحاولة مرة أخرى</a>
</section>
</div>
</main>
<dialog class="dialog" id="alternativeDialog">
<form class="dialog-shell" id="alternativeForm" method="dialog">
<div class="dialog-head"><div><div class="kicker">خيار آخر</div><h2>وش سبب طلب شريك بديل؟</h2></div><button aria-label="إغلاق" class="dialog-close" type="submit" value="cancel">×</button></div>
<div class="form-field"><label for="alternativeReason">السبب اختياري</label><select id="alternativeReason"><option value="">بدون تحديد</option><option>لم يتم الرد</option><option>لم نتفق على الموعد</option><option>لم يتم التفاهم على السعر</option><option>الخدمة غير متوفرة</option><option>الموقع غير مناسب</option><option>لم أرغب في الاستمرار</option><option>سبب آخر</option></select></div>
<div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button class="btn btn-primary" data-icon="refresh" id="confirmAlternative" type="submit" value="default">ابحث عن بديل</button></div>
</form>
</dialog>
<dialog class="dialog" id="ratingDialog">
<form class="dialog-shell" id="ratingForm" method="dialog">
<div class="dialog-head"><div><div class="kicker">رأيك يهمنا</div><h2>قيّم تجربتك مع الشريك</h2></div><button aria-label="إغلاق" class="dialog-close" type="submit" value="cancel">×</button></div>
<div class="form-grid two">
<div class="form-field"><label class="required" for="ratingCostBand">فئة تكلفة الخدمة</label><select id="ratingCostBand" required=""></select></div>
<div class="form-field"><label class="required" for="ratingOverall">التقييم العام</label><select id="ratingOverall" required=""><option value="">اختر</option><option value="5">5 — ممتاز</option><option value="4">4 — جيد جدًا</option><option value="3">3 — جيد</option><option value="2">2 — ضعيف</option><option value="1">1 — سيئ</option></select></div>
<div class="form-field"><label class="required" for="ratingTreatment">جودة التعامل</label><select id="ratingTreatment" required=""><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
<div class="form-field"><label class="required" for="ratingCommitment">الالتزام</label><select id="ratingCommitment" required=""><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
<div class="form-field"><label class="required" for="ratingClarity">وضوح التعامل</label><select id="ratingClarity" required=""><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
<div class="form-field"><label class="required" for="ratingService">جودة الخدمة</label><select id="ratingService" required=""><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
<div class="form-field"><label class="required" for="ratingFairness">عدالة الأسعار</label><select id="ratingFairness" required=""><option value="">اختر</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>
</div>
<fieldset class="form-field mt-16"><legend class="required">هل تنصح بالشريك؟</legend><div class="button-row"><label class="radio-line"><input name="recommend" required="" type="radio" value="yes"/> نعم</label><label class="radio-line"><input name="recommend" type="radio" value="no"/> لا</label></div></fieldset>
<div class="form-field mt-16"><label for="ratingComment">تعليق اختياري</label><textarea id="ratingComment" maxlength="600"></textarea></div>
<div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button class="btn btn-primary" type="submit" value="default">إرسال التقييم</button></div>
</form>
</dialog>

<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a aria-current="page" href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script>
<script defer="" src="assets/automotive-data.js"></script>
<script defer="" src="assets/storage.js"></script>
<script defer="" src="assets/seed.js"></script>
<script defer="" src="assets/matching-engine.js"></script>
<script defer="" src="assets/lifecycle.js"></script>
<script defer="" src="assets/common.js"></script>
<script defer="" src="assets/track.js"></script>
</body>
</html>
```

## `workshop-dashboard.html`

```html
<!doctype html>
<html dir="rtl" lang="ar"><head><meta charset="utf-8"/><meta content="لوحة شريك وين أوديها لإدارة الإحالات والخصومات والتقييمات والفواتير." name="description"/><meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/><meta content="#0b1d33" name="theme-color"/><meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/><title>لوحة الشريك — وين أوديها؟</title><link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/></head>
<body data-page="partner-dashboard"><header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">لوحة الشريك</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section" id="main-content"><div class="container">
<div class="request-header" id="partnerHeader"></div>
<div aria-label="أقسام لوحة الشريك" class="tabs" role="tablist"><button aria-selected="true" class="tab-btn active" data-tab="overview" role="tab" type="button">نظرة عامة</button><button aria-selected="false" class="tab-btn" data-tab="referrals" role="tab" type="button">الإحالات</button><button aria-selected="false" class="tab-btn" data-tab="objections" role="tab" type="button">الاعتراضات</button><button aria-selected="false" class="tab-btn" data-tab="ratings" role="tab" type="button">التقييمات</button><button aria-selected="false" class="tab-btn" data-tab="discounts" role="tab" type="button">الخصومات</button><button aria-selected="false" class="tab-btn" data-tab="billing" role="tab" type="button">الفواتير والسداد</button><button aria-selected="false" class="tab-btn" data-tab="profile" role="tab" type="button">بيانات الشريك</button></div>
<section class="tab-panel active" data-panel="overview" role="tabpanel"><div class="stats-grid" id="overviewStats"></div><div class="dashboard-grid two mt-16"><section class="card"><h2>آخر الإحالات</h2><div id="latestReferrals"></div></section><aside class="card"><h2>حالة الحساب</h2><div id="accountStatus"></div></aside></div></section>
<section class="tab-panel" data-panel="referrals" role="tabpanel"><div class="section-head"><h2>إدارة الإحالات والخدمات</h2><p>حدّث حالة الإحالة، وأكد الخدمة، وأدخل فئة التكلفة عند الحاجة مع حفظ مصدر التحديث.</p></div><div id="referralsTable"></div></section>
<section class="tab-panel" data-panel="objections" role="tabpanel"><div class="section-head"><h2>سجل الاعتراضات</h2><p>راجع الاعتراضات ومهلتها وقراراتها من هذا القسم.</p></div><div id="objectionsTable"></div></section>
<section class="tab-panel" data-panel="ratings" role="tabpanel"><div class="section-head"><h2>التقييمات الموثقة</h2><p>راجع تقييمات العملاء، وقدّم اعتراضًا مسببًا عند الحاجة.</p></div><div id="ratingsList"></div></section>
<section class="tab-panel" data-panel="discounts" role="tabpanel"><div class="dashboard-grid two"><section class="card"><h2>الخصومات الحالية</h2><p class="muted">أدر الخصومات النشطة، وحدد الخدمات والشروط بوضوح.</p><div id="discountsList"></div></section><section class="card"><h2>إضافة خصم</h2><form class="form-grid" id="discountForm" novalidate=""><div class="form-field"><label class="required" for="discountPercent">النسبة %</label><input id="discountPercent" max="50" min="1" required="" type="number"/></div><div class="form-field"><label class="required" for="discountStart">تاريخ البداية</label><input id="discountStart" required="" type="date"/></div><fieldset class="form-field"><legend class="required">نطاق الخصم</legend><div class="button-row"><label class="radio-line"><input checked="" name="discountScope" type="radio" value="all"/> جميع الخدمات</label><label class="radio-line"><input name="discountScope" type="radio" value="selected"/> خدمات مختارة</label></div></fieldset><div class="form-field" hidden="" id="discountServicesField"><label for="discountServices">اكتب الخدمات المختارة — اختياري</label><textarea id="discountServices" maxlength="500"></textarea></div><div class="form-field"><label for="discountConditions">الشروط والاستثناءات</label><textarea id="discountConditions" maxlength="700"></textarea></div><label class="checkbox-line"><input checked="" id="discountContinuous" type="checkbox"/><span>يستمر حتى أوقفه بنفسي</span></label><div class="form-field" hidden="" id="discountEndField"><label class="required" for="discountEnd">تاريخ الانتهاء</label><input id="discountEnd" type="date"/></div><button class="btn btn-primary" type="submit">تفعيل الخصم</button></form></section></div></section>
<section class="tab-panel" data-panel="billing" role="tabpanel"><div class="stats-grid" id="billingStats"></div><div class="card mt-16"><div class="button-row"><button class="btn btn-dark" id="issueInvoice" type="button">تحديث الفواتير المستحقة</button><span class="muted small">تُحدّث الفواتير وفق دورة الحساب وحد السداد.</span></div></div><div class="dashboard-grid two mt-16"><section class="card"><h2>الفواتير</h2><div id="invoicesList"></div></section><section class="card"><h2>المدفوعات والإيصالات</h2><div id="paymentsList"></div></section></div><section class="card mt-16"><h2>سجل رسوم الوساطة</h2><div id="feesList"></div></section></section>
<section class="tab-panel" data-panel="profile" role="tabpanel"><div class="dashboard-grid two"><section class="card"><h2>بيانات الشريك</h2><div id="profileData"></div></section><section class="card"><h2>إشعارات المنصة</h2><div id="notificationsList"></div></section></div><button class="btn btn-danger mt-16" id="logoutButton" type="button">تسجيل الخروج</button></section>
</div></main>
<dialog class="dialog" id="objectionDialog"><form class="dialog-shell" id="objectionForm" method="dialog"><div class="dialog-head"><div><div class="kicker">اعتراض</div><h2 id="objectionTitle">اعتراض</h2></div><button aria-label="إغلاق" class="dialog-close" type="submit" value="cancel">×</button></div><input id="objectionReferralId" type="hidden"/><input id="objectionRatingId" type="hidden"/><input id="objectionInvoiceId" type="hidden"/><input id="objectionType" type="hidden"/><div class="form-field"><label class="required" for="objectionReason">السبب</label><select id="objectionReason" required=""></select></div><div class="form-field mt-16" hidden="" id="requestedCostBandField"><label for="requestedCostBand">فئة التكلفة المقترحة</label><select id="requestedCostBand"></select></div><div class="form-field mt-16"><label for="objectionDetails">التوضيح</label><textarea id="objectionDetails" maxlength="1000"></textarea></div><div class="screen-actions"><button class="btn btn-light" type="submit" value="cancel">إلغاء</button><button class="btn btn-primary" type="submit" value="default">إرسال الاعتراض</button></div></form></dialog>
<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script><script defer="" src="assets/automotive-data.js"></script><script defer="" src="assets/storage.js"></script><script defer="" src="assets/seed.js"></script><script defer="" src="assets/lifecycle.js"></script><script defer="" src="assets/common.js"></script><script defer="" src="assets/dashboard.js"></script></body></html>
```

## `workshop-login.html`

```html
<!doctype html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<meta content="#0b1d33" name="theme-color"/>
<meta content="دخول شركاء وين أوديها لإدارة الإحالات والتقييمات والخصومات والفواتير." name="description"/>
<meta content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" http-equiv="Content-Security-Policy"/>
<title>دخول الشريك — وين أوديها؟</title>

<link href="assets/images/favicon.png" rel="icon" type="image/png"/><link href="assets/styles.css" rel="stylesheet"/>
</head>
<body data-page="partner-login">

<header class="site-header unified-site-header" data-unified-header=""><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div class="container nav-shell unified-header-shell"><a aria-label="وين أوديها — الرئيسية" class="brand unified-brand" href="index.html"><img alt="وين أوديها" class="brand-logo" height="283" src="assets/images/logo.png" width="900"/></a><span aria-current="page" class="current-page-label">دخول الشريك</span><button aria-controls="mainNav" aria-expanded="false" aria-label="فتح قائمة التنقل" class="nav-toggle" data-icon="menu" type="button"><span>القائمة</span></button><nav aria-label="التنقل الرئيسي" class="main-nav unified-main-nav" id="mainNav"><a href="index.html">الرئيسية</a><a href="customer.html?fresh=1">ابدأ طلبك</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a aria-current="page" href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav></div></header><main class="section auth-section" id="main-content">
<div class="container auth-layout">
<section class="card auth-card">
<div class="section-head"><div class="kicker">بوابة الشريك</div><h1>مرحبًا بعودتك</h1><p>أدخل رمز الشريك والرمز السري للوصول إلى الإحالات والحساب والفواتير.</p></div>
<form class="form-grid" id="loginForm" novalidate="">
<div class="form-field"><label class="required" for="partnerCode">رمز الشريك</label><input autocomplete="username" id="partnerCode" placeholder="أدخل رمز الشريك" required=""/></div>
<div class="form-field"><label class="required" for="partnerPin">الرمز السري</label><input autocomplete="current-password" id="partnerPin" inputmode="numeric" maxlength="8" placeholder="••••" required="" type="password"/></div>
<button class="btn btn-primary btn-block" data-icon="partner" type="submit">دخول لوحة الشريك</button>
</form>
</section>
<aside class="auth-aside">
<div aria-hidden="true" class="card-icon" data-icon="shield"></div>
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

<footer class="site-footer unified-site-footer" data-unified-footer=""><div class="container unified-footer-shell"><a aria-label="وين أوديها — الرئيسية" class="footer-logo-link" href="index.html"><span class="footer-logo-plate"><img alt="وين أوديها" class="footer-logo" height="283" src="assets/images/logo.png" width="900"/></span></a><nav aria-label="روابط الموقع" class="unified-footer-nav"><a href="index.html">الرئيسية</a><a href="track.html">متابعة الطلب</a><a href="join.html">انضم كشريك</a><a aria-current="page" href="workshop-login.html">دخول الشريك</a><a href="privacy.html">الخصوصية</a><a href="terms.html">الشروط</a></nav><span class="unified-footer-copy">© 2026 وين أوديها</span></div></footer><script defer="" src="assets/config.js"></script>
<script defer="" src="assets/automotive-data.js"></script>
<script defer="" src="assets/storage.js"></script>
<script defer="" src="assets/seed.js"></script>
<script defer="" src="assets/lifecycle.js"></script>
<script defer="" src="assets/common.js"></script>
<script defer="" src="assets/workshop-login.js"></script>
</body>
</html>
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
    qsa("[data-unified-header]").forEach((header) => {
      const toggle = qs(".nav-toggle", header);
      const nav = qs(".main-nav", header);
      if (!toggle || !nav) return;

      const closeMenu = () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      };

      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("open", !open);
        toggle.setAttribute("aria-label", open ? "فتح قائمة التنقل" : "إغلاق قائمة التنقل");
      });

      nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
          toggle.focus();
        }
      });

      document.addEventListener("click", (event) => {
        if (!header.contains(event.target)) closeMenu();
      });
    });
  };

  const initSelect = (select, options, placeholder = "اختر") => { if (select) select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}`; };
  const setButtonBusy = (button, busy, text = "جاري التنفيذ...") => { if (!button) return; if (busy) { button.dataset.originalText = button.textContent; button.textContent = text; button.disabled = true; button.setAttribute("aria-busy", "true"); } else { button.textContent = button.dataset.originalText || button.textContent; button.disabled = false; button.removeAttribute("aria-busy"); delete button.dataset.iconDecorated; decorateIcons(button.parentElement || document); } };
  const setActiveNav = () => {
    const page = location.pathname.split("/").pop() || "index.html";
    qsa(".main-nav a, .unified-footer-nav a").forEach((link) => {
      const target = (link.getAttribute("href") || "").split("?")[0].split("#")[0];
      if (target === page) link.setAttribute("aria-current", "page");
    });
  };
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

/* الصفحة الرئيسية المختصرة — Zero Scrolling */

body[data-page="home"] {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  height: 100vh;
  height: 100dvh;
  overflow-x: hidden;
  padding-bottom: 0;
  background:
    radial-gradient(circle at 12% 20%, rgba(15, 148, 135, .13), transparent 32%),
    radial-gradient(circle at 88% 78%, rgba(23, 105, 170, .11), transparent 34%),
    linear-gradient(155deg, #fbfdfd 0%, #edf4f8 100%);
}

body[data-page="home"] > .announcement-ticker,
body[data-page="home"] > [data-site-header],
body[data-page="home"] > .home-footer,
body[data-page="home"] > noscript {
  flex-shrink: 0;
}

body[data-page="home"] > [data-site-header]:empty {
  min-height: clamp(3.35rem, 7vh, 4.05rem);
}

body[data-page="home"] .site-header {
  position: relative;
  top: auto;
  flex-shrink: 0;
  background: rgba(255, 255, 255, .96);
  box-shadow: 0 6px 20px rgba(7, 29, 51, .055);
}

body[data-page="home"] .utility-strip {
  display: none;
}

body[data-page="home"] .nav-shell {
  min-height: clamp(3.35rem, 7vh, 4.05rem);
  gap: clamp(.45rem, 1.4vw, 1rem);
}

body[data-page="home"] .brand {
  gap: clamp(.45rem, 1vw, .7rem);
}

body[data-page="home"] .brand-mark {
  width: clamp(2.35rem, 5.2vh, 2.7rem);
  height: clamp(2.35rem, 5.2vh, 2.7rem);
  border-radius: clamp(.7rem, 1.5vw, .9rem);
  font-size: clamp(1rem, 2.3vh, 1.18rem);
}

body[data-page="home"] .brand strong {
  font-size: clamp(.9rem, 2vh, 1rem);
}

body[data-page="home"] .brand small {
  font-size: clamp(.64rem, 1.45vh, .72rem);
}

body[data-page="home"] .main-nav a {
  min-height: clamp(2.35rem, 5.2vh, 2.75rem);
  padding: clamp(.35rem, .9vh, .55rem) clamp(.55rem, 1.2vw, .85rem);
  font-size: clamp(.78rem, 1.7vh, .9rem);
}

body[data-page="home"] .nav-toggle {
  min-height: 2.55rem;
  min-width: 2.55rem;
}

.announcement-ticker {
  position: relative;
  z-index: 120;
  display: flex;
  align-items: center;
  min-height: clamp(1.85rem, 4vh, 2.25rem);
  overflow: hidden;
  color: var(--white);
  background: linear-gradient(135deg, var(--navy-950), var(--navy-800));
  border-bottom: 1px solid rgba(255, 255, 255, .12);
}

.announcement-ticker::before,
.announcement-ticker::after {
  content: "";
  position: absolute;
  inset-block: 0;
  z-index: 2;
  width: clamp(.8rem, 4vw, 3.5rem);
  pointer-events: none;
}

.announcement-ticker::before {
  inset-inline-start: 0;
  background: linear-gradient(to left, transparent, var(--navy-950));
}

.announcement-ticker::after {
  inset-inline-end: 0;
  background: linear-gradient(to right, transparent, var(--navy-950));
}

.announcement-ticker__track {
  display: flex;
  flex: 0 0 auto;
  width: max-content;
  min-width: max-content;
  direction: rtl;
  will-change: transform;
  animation: home-ticker-rtl 52s linear infinite;
}

.announcement-ticker__group {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  min-width: max-content;
  white-space: nowrap;
}

.announcement-ticker__group span {
  display: inline-flex;
  align-items: center;
  min-height: clamp(1.85rem, 4vh, 2.25rem);
  padding-inline: clamp(.65rem, 1.4vw, 1.05rem);
  white-space: nowrap;
  font-size: clamp(.68rem, 1.55vh, .79rem);
  font-weight: 800;
  line-height: 1;
}

.announcement-ticker__group span:not(:last-child)::after {
  content: "•";
  margin-inline-start: clamp(1.1rem, 2.5vw, 1.9rem);
  color: #7fe1d5;
}

.announcement-ticker:hover .announcement-ticker__track,
.announcement-ticker:focus-within .announcement-ticker__track {
  animation-play-state: paused;
}

@keyframes home-ticker-rtl {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(50%, 0, 0);
  }
}

.home-main {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
}

.home-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  padding-block: clamp(.85rem, 3.2vh, 2.25rem);
}

.home-hero::before,
.home-hero::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
}

.home-hero::before {
  width: min(54vw, 36rem);
  aspect-ratio: 1;
  inset-block-start: -40%;
  inset-inline-end: -18%;
  border: 1px solid rgba(10, 125, 114, .10);
  box-shadow:
    0 0 0 clamp(2rem, 5vw, 4rem) rgba(10, 125, 114, .03),
    0 0 0 clamp(4rem, 10vw, 8rem) rgba(23, 105, 170, .02);
}

.home-hero::after {
  width: clamp(9rem, 24vw, 20rem);
  aspect-ratio: 1;
  inset-block-end: -35%;
  inset-inline-start: -8%;
  background: rgba(15, 148, 135, .055);
  filter: blur(1px);
}

.home-hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(.55rem, 1.75vh, 1.05rem);
  max-width: 58rem;
  min-height: 0;
  text-align: center;
}

.home-hero .eyebrow {
  display: inline-flex;
  align-items: center;
  min-height: clamp(1.75rem, 3.6vh, 2.1rem);
  padding: .24rem clamp(.65rem, 1.4vw, .85rem);
  border: 1px solid rgba(10, 125, 114, .18);
  border-radius: 999px;
  background: rgba(255, 255, 255, .72);
  color: var(--teal-600);
  box-shadow: 0 6px 18px rgba(7, 20, 38, .04);
  font-size: clamp(.68rem, 1.55vh, .82rem);
  font-weight: 900;
  line-height: 1.2;
}

.home-hero h1 {
  max-width: 56rem;
  margin: 0;
  color: var(--navy-950);
  font-size: clamp(2rem, min(7.2vw, 7.6vh), 4.5rem);
  line-height: 1.08;
  letter-spacing: -.04em;
  text-wrap: balance;
}

.home-hero h1 span {
  display: block;
  margin-top: clamp(.2rem, .8vh, .45rem);
  color: var(--teal-600);
}

.home-hero__description {
  max-width: 46rem;
  margin: 0;
  color: var(--slate-700);
  font-size: clamp(.88rem, min(2.7vw, 2.15vh), 1.08rem);
  line-height: 1.65;
  text-wrap: balance;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(.35rem, 1vh, .7rem) clamp(.65rem, 1.5vw, 1rem);
}

.home-primary-cta {
  min-width: clamp(11.5rem, 23vw, 14.5rem);
  min-height: clamp(2.9rem, 6.4vh, 3.45rem);
  padding: clamp(.6rem, 1.2vh, .8rem) clamp(1.2rem, 2.8vw, 1.8rem);
  border-radius: clamp(.75rem, 1.4vw, .95rem);
  font-size: clamp(.92rem, 2vh, 1.05rem);
  box-shadow: 0 13px 28px rgba(10, 125, 114, .23);
}

.home-track-link {
  display: inline-flex;
  align-items: center;
  gap: .38rem;
  min-height: clamp(2.45rem, 5.2vh, 2.8rem);
  padding: .35rem .55rem;
  border-radius: .65rem;
  color: var(--slate-700);
  font-size: clamp(.78rem, 1.75vh, .9rem);
  font-weight: 800;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: .28rem;
  transition: color .18s ease, background .18s ease, text-decoration-color .18s ease;
}

.home-track-link:hover {
  color: var(--teal-600);
  background: rgba(255, 255, 255, .62);
  text-decoration-color: currentColor;
}

.home-track-link .ui-icon {
  color: var(--teal-600);
}

.home-trust-points {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(.35rem, 1vw, .55rem);
}

.home-trust-points span {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  min-height: clamp(1.85rem, 4vh, 2.2rem);
  padding: .28rem clamp(.5rem, 1.2vw, .7rem);
  color: var(--slate-700);
  background: rgba(255, 255, 255, .75);
  border: 1px solid rgba(199, 207, 218, .78);
  border-radius: 999px;
  font-size: clamp(.67rem, 1.48vh, .79rem);
  font-weight: 800;
  line-height: 1.15;
  box-shadow: 0 6px 18px rgba(7, 20, 38, .035);
}

.home-trust-points .ui-icon {
  color: var(--teal-600);
}

.home-service-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(.4rem, 1vw, .65rem);
}

.home-service-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .42rem;
  min-height: clamp(2rem, 4.3vh, 2.45rem);
  padding: .35rem clamp(.7rem, 1.5vw, .95rem);
  border: 1px solid;
  border-radius: 999px;
  background: rgba(255, 255, 255, .82);
  font-size: clamp(.72rem, 1.6vh, .84rem);
  font-weight: 900;
  line-height: 1;
  box-shadow: 0 7px 18px rgba(7, 20, 38, .045);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}

.home-service-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 11px 24px rgba(7, 20, 38, .09);
  background: var(--white);
}

.home-service-pill > svg {
  width: clamp(1rem, 2.1vh, 1.2rem);
  height: clamp(1rem, 2.1vh, 1.2rem);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.home-service-pill--parts {
  color: #87520a;
  border-color: #e5c88f;
}

.home-service-pill--tow {
  color: var(--red-700);
  border-color: #e9bbc0;
}

.home-service-pill--maintenance {
  color: var(--teal-600);
  border-color: #abd9d3;
}

.home-footer {
  flex-shrink: 0;
  color: #d6e1ec;
  background: var(--navy-950);
  border-top: 1px solid rgba(255, 255, 255, .10);
}

.home-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(.25rem, .7vh, .45rem) clamp(.55rem, 1.5vw, .95rem);
  min-height: clamp(2.55rem, 5.3vh, 3.2rem);
  padding-block: clamp(.25rem, .65vh, .42rem);
}

.home-footer__copyright {
  color: #aebed0;
  font-size: clamp(.67rem, 1.48vh, .78rem);
  white-space: nowrap;
}

.home-footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: .12rem clamp(.55rem, 1.5vw, .9rem);
}

.home-footer__links a {
  display: inline-flex;
  align-items: center;
  min-height: clamp(1.85rem, 3.8vh, 2.15rem);
  padding: .18rem .28rem;
  border-radius: .4rem;
  color: #c4d2e0;
  font-size: clamp(.66rem, 1.46vh, .78rem);
  font-weight: 700;
}

.home-footer__links a:hover,
.home-footer__links a:focus-visible {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: .22rem;
}

@media (min-width: 900px) {
  .home-footer__inner {
    justify-content: space-between;
  }

  .announcement-ticker__group span {
    padding-inline: clamp(.85rem, 1.6vw, 1.25rem);
  }
}

@media (max-width: 679px) {
  body[data-page="home"] .brand small {
    display: none;
  }

  body[data-page="home"] .nav-shell {
    min-height: clamp(3.15rem, 6.6vh, 3.65rem);
  }

  body[data-page="home"] .main-nav {
    top: clamp(3.2rem, 6.8vh, 3.75rem);
  }

  .home-hero__content {
    gap: clamp(.46rem, 1.45vh, .8rem);
  }

  .home-hero h1 {
    max-width: 23rem;
    font-size: clamp(1.62rem, min(8.3vw, 6.25vh), 2.45rem);
    line-height: 1.1;
  }

  .home-hero__description {
    max-width: 23rem;
    font-size: clamp(.82rem, min(3.6vw, 1.95vh), .96rem);
    line-height: 1.55;
  }

  .home-hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .home-primary-cta {
    width: min(100%, 21rem);
  }

  .home-trust-points,
  .home-service-pills {
    max-width: 24rem;
  }

  .home-trust-points span,
  .home-service-pill {
    min-height: 2rem;
  }

  .home-footer__inner {
    align-content: center;
    gap: .12rem .45rem;
  }

  .home-footer__links {
    gap: .05rem .5rem;
  }
}

@media (max-height: 700px) {
  .home-hero {
    padding-block: .55rem;
  }

  .home-hero__content {
    gap: .42rem;
  }

  .home-hero .eyebrow {
    min-height: 1.55rem;
    font-size: .67rem;
  }

  .home-hero h1 {
    font-size: clamp(1.75rem, min(7vw, 6.8vh), 3.25rem);
  }

  .home-hero__description {
    font-size: clamp(.78rem, 1.8vh, .9rem);
    line-height: 1.45;
  }

  .home-primary-cta {
    min-height: 2.65rem;
  }

  .home-trust-points span,
  .home-service-pill {
    min-height: 1.75rem;
    padding-block: .2rem;
  }

  .home-footer__inner {
    min-height: 2.7rem;
    padding-block: .28rem;
  }
}

@media (max-height: 620px) {
  .home-hero .eyebrow {
    display: none;
  }

  .home-trust-points span {
    padding-inline: .42rem;
    font-size: .65rem;
  }

  .home-service-pill {
    font-size: .68rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .announcement-ticker {
    overflow-x: auto;
    scrollbar-width: none;
  }

  .announcement-ticker::-webkit-scrollbar {
    display: none;
  }

  .announcement-ticker::before,
  .announcement-ticker::after {
    display: none;
  }

  .announcement-ticker__track {
    animation: none !important;
    transform: none !important;
  }

  .announcement-ticker__group[aria-hidden="true"] {
    display: none;
  }
}

@media (min-width: 900px) {
  body[data-page="home"] .nav-toggle {
    display: none;
  }
}


@media (min-height: 700px) {
  body[data-page="home"] {
    overflow-y: clip;
  }
}

@media (max-height: 699px) {
  body[data-page="home"] {
    height: auto;
    overflow-y: auto;
  }
}

/* توحيد الواجهات المختصرة والمرنة في جميع الصفحات */
body:not([data-page="home"]) {display:flex;flex-direction:column;min-height:100vh;min-height:100dvh;overflow-x:hidden}
body:not([data-page="home"])>[data-site-header],body:not([data-page="home"])>[data-site-footer]{flex-shrink:0}
body:not([data-page="home"])>main{flex:1 1 auto;min-height:0}
.brand-logo{display:block;width:clamp(8.8rem,16vw,11.5rem);height:auto;max-height:3rem;object-fit:contain}
.footer-brand .brand-logo{filter:brightness(0) invert(1);opacity:.96;max-height:2.6rem}
.nav-shell{min-height:clamp(3.6rem,7vh,4.4rem)}
.utility-strip{flex-shrink:0}.utility-actions{min-height:2.15rem}
.flow-shell{padding:clamp(.75rem,2vh,1.4rem) 0 clamp(1.2rem,3vh,2.2rem)}
.flow-layout{gap:clamp(.75rem,2vw,1.25rem)}
.flow-sidebar{padding:clamp(.9rem,2vw,1.25rem);border-radius:clamp(.9rem,2vw,1.35rem)}
.flow-screen{padding:clamp(1rem,2.4vw,1.6rem);border-radius:clamp(.9rem,2vw,1.35rem)}
.flow-screen h2{font-size:clamp(1.2rem,3vw,1.65rem)}
.form-grid{gap:clamp(.75rem,1.5vh,1rem)}
.form-field{gap:.35rem}.form-field input,.form-field select,.form-field textarea{min-height:clamp(2.75rem,5.5vh,3.1rem);padding:.55rem .7rem}
.form-field textarea{min-height:clamp(5.5rem,15vh,8rem)}
.screen-actions{margin-top:clamp(.9rem,2vh,1.25rem);padding-top:clamp(.75rem,1.8vh,1rem)}
.section{padding:clamp(1.25rem,4vh,2.6rem) 0}.section-head{margin-bottom:clamp(.9rem,2vh,1.4rem)}
.card,.partner-card,.activity-block{padding:clamp(.9rem,2vw,1.25rem)}
.auth-section{min-height:auto;align-items:center}.auth-layout{gap:clamp(.8rem,2vw,1.2rem)}
.tabs{position:sticky;top:0;z-index:20;margin-bottom:.8rem;background:#eaf0f5;padding:.35rem;border-radius:.8rem}
.tab-panel{max-height:calc(100dvh - 12rem);overflow:auto;padding-inline:.15rem}
.dashboard-grid{gap:clamp(.75rem,1.8vw,1rem)}
.site-footer{padding:clamp(1.1rem,3vh,1.8rem) 0 .75rem;margin-top:0}.page-guidance{margin-bottom:1rem;padding:.75rem 1rem}.footer-grid{gap:1rem}.footer-bottom{margin-top:1rem;padding-top:.65rem}
.btn{min-height:clamp(2.75rem,5.5vh,3rem);padding:.55rem 1rem}
.empty-state{padding:clamp(1.25rem,4vh,2rem)}
@media(max-width:899px){.brand-logo{width:clamp(7.6rem,34vw,9.5rem)}.main-nav{top:3.8rem}.flow-sidebar{position:static}.tab-panel{max-height:none;overflow:visible}.site-footer .page-guidance{display:none}.footer-grid{grid-template-columns:1fr 1fr}.footer-grid>div:first-child{grid-column:1/-1}}
@media(max-width:679px){.utility-actions{justify-content:space-between}.flow-shell{padding-top:.55rem}.flow-sidebar p,.flow-sidebar .legal-note{display:none}.flow-sidebar h1{font-size:1rem}.progress-wrap{margin-top:.55rem}.screen-actions{position:sticky;bottom:0;z-index:18;margin-inline:-1rem;margin-bottom:-1rem;padding:.65rem 1rem calc(.65rem + env(safe-area-inset-bottom));background:rgba(255,255,255,.97);box-shadow:0 -8px 20px rgba(7,29,51,.08)}.footer-grid{grid-template-columns:1fr}.footer-grid>div:first-child{display:none}.site-footer{padding:.75rem 0}.footer-bottom{justify-content:center;text-align:center}.brand-logo{width:7.8rem}}
@media(max-height:700px) and (min-width:700px){.site-footer{padding:.55rem 0}.site-footer .page-guidance,.site-footer .footer-grid>div:first-child p{display:none}.footer-grid{grid-template-columns:1fr 1fr 1fr}.footer-bottom{margin-top:.45rem;padding-top:.4rem}.section{padding:1rem 0}.auth-section{min-height:0}.flow-shell{padding:.55rem 0}.flow-screen{padding:1rem}.tab-panel{max-height:calc(100dvh - 10.5rem)}}


/* Header and Footer الموحدان — قبول إلزامي لجميع الصفحات */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
}

body > main {
  flex: 1 0 auto;
  width: 100%;
}

body > .site-header,
body > .site-footer,
body > .announcement-ticker,
body > noscript {
  flex-shrink: 0;
}

.unified-site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  margin: 0;
  background: rgba(255, 255, 255, .97);
  border-bottom: 1px solid var(--slate-200);
  box-shadow: 0 7px 22px rgba(7, 29, 51, .065);
  backdrop-filter: blur(12px);
}

.unified-header-shell {
  position: relative;
  min-height: clamp(3.65rem, 7vh, 4.4rem);
  display: flex;
  align-items: center;
  gap: clamp(.55rem, 1.5vw, 1.05rem);
}

.unified-brand {
  flex: 0 0 auto;
  min-width: 0;
  padding-block: .28rem;
}

.brand-logo {
  display: block;
  width: clamp(8.3rem, 15vw, 11rem);
  height: auto;
  max-height: clamp(2.5rem, 5.5vh, 3rem);
  object-fit: contain;
  object-position: center;
}

.current-page-label {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  min-height: 1.8rem;
  padding: .22rem .62rem;
  border: 1px solid #cce5e1;
  border-radius: 999px;
  color: var(--teal-600);
  background: var(--teal-100);
  font-size: clamp(.68rem, 1.5vw, .8rem);
  font-weight: 900;
  white-space: nowrap;
}

.unified-main-nav {
  margin-inline-start: auto;
}

.unified-main-nav a[aria-current="page"] {
  color: var(--teal-600);
  background: var(--teal-100);
  box-shadow: inset 0 0 0 1px rgba(8, 125, 115, .12);
}

.unified-site-header .nav-toggle {
  flex: 0 0 auto;
}

.unified-site-footer {
  margin-top: auto;
  padding: clamp(.75rem, 2vh, 1rem) 0;
  color: #d6e1ec;
  background: var(--navy-950);
  border-top: 1px solid rgba(255, 255, 255, .12);
}

.unified-footer-shell {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(.65rem, 2vw, 1.25rem);
}

.footer-logo-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: .65rem;
}

.footer-logo-plate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .26rem .48rem;
  border-radius: .65rem;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, .15);
}

.footer-logo {
  display: block;
  width: clamp(7.2rem, 13vw, 9rem);
  height: auto;
  max-height: 2.35rem;
  object-fit: contain;
}

.unified-footer-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: .15rem clamp(.45rem, 1.4vw, .8rem);
}

.unified-footer-nav a {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: .2rem .35rem;
  border-radius: .45rem;
  color: #c5d3e1;
  font-size: clamp(.68rem, 1.45vw, .8rem);
  font-weight: 800;
}

.unified-footer-nav a:hover,
.unified-footer-nav a:focus-visible,
.unified-footer-nav a[aria-current="page"] {
  color: #fff;
  background: rgba(255, 255, 255, .1);
  text-decoration: underline;
  text-underline-offset: .22rem;
}

.unified-footer-copy {
  color: #aebed0;
  font-size: clamp(.66rem, 1.35vw, .76rem);
  white-space: nowrap;
}

body[data-page="home"] > .site-header {
  flex-shrink: 0;
}

body[data-page="home"] > .home-footer {
  flex-shrink: 0;
  margin-top: 0;
}

body[data-page="home"] .unified-site-header {
  position: relative;
}

@media (min-width: 900px) {
  .unified-site-header .nav-toggle {
    display: none;
  }

  .unified-site-header .main-nav {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .12rem;
    margin-inline-start: auto;
    padding: 0;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .unified-site-header .main-nav a {
    min-height: 2.45rem;
    padding: .4rem clamp(.48rem, .8vw, .72rem);
    font-size: clamp(.73rem, .95vw, .85rem);
    white-space: nowrap;
  }
}

@media (max-width: 899px) {
  .unified-header-shell {
    min-height: 3.65rem;
  }

  .brand-logo {
    width: clamp(7.5rem, 28vw, 9.2rem);
    max-height: 2.55rem;
  }

  .current-page-label {
    margin-inline-start: auto;
  }

  .unified-site-header .main-nav {
    top: calc(100% + .35rem);
    inset-inline: 0;
    max-height: min(70vh, 28rem);
    overflow-y: auto;
  }

  .unified-site-header .main-nav a {
    min-height: 2.75rem;
  }
}

@media (max-width: 560px) {
  .unified-header-shell {
    gap: .4rem;
  }

  .brand-logo {
    width: clamp(6.8rem, 31vw, 8rem);
  }

  .current-page-label {
    max-width: 7.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .unified-site-header .nav-toggle {
    width: 2.65rem;
    min-width: 2.65rem;
    padding: .45rem;
  }

  .unified-site-header .nav-toggle > span:not(.ui-icon) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .unified-footer-shell {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: .5rem;
  }

  .footer-logo {
    width: 7.2rem;
  }

  .unified-footer-nav {
    gap: .08rem .38rem;
  }

  .unified-footer-nav a {
    min-height: 1.85rem;
    font-size: .68rem;
  }
}

@media print {
  .unified-site-header,
  .unified-site-footer {
    display: none !important;
  }
}
```
