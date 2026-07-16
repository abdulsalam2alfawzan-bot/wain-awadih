# الكود الكامل لمشروع «وين أوديها»

هذا الملف يجمع النص الكامل لجميع ملفات الواجهة والتشغيل والإعدادات في النسخة النهائية. الملفات نفسها موجودة منفصلة داخل المشروع وتبقى هي المرجع التنفيذي.

## هيكل الملفات

```text
.nojekyll
_headers
netlify.toml
index.html
customer.html
track.html
workshop-login.html
workshop-dashboard.html
payment.html
receipt.html
join.html
join-status.html
404.html
assets/styles.css
assets/common.js
assets/customer.js
assets/track.js
assets/workshop-login.js
assets/dashboard.js
assets/payment.js
assets/receipt.js
assets/join.js
assets/join-status.js
assets/icons/favicon.svg
```

## `.nojekyll`

```text

```

## `_headers`

```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(self)
```

## `netlify.toml`

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(self)"
```

## `index.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="وين أوديها منصة سعودية تساعدك على تحديد مسار خدمة سيارتك والوصول إلى ورشة شريكة واحدة مناسبة في كل مرة.">
  <title>وين أوديها؟ — قل لنا وش مشكلة سيارتك</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="home">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main id="main-content">
    <section class="hero home-hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow"><span class="eyebrow-dot"></span> نموذج تفاعلي لمنصة سعودية</div>
          <h1>سيارتك تحتاج خدمة؟<br><span>نقول لك وين توديها.</span></h1>
          <p>اختر صيانة دورية أو اشرح المشكلة بطريقتك. نحدد الخدمة أو التخصص المناسب، ثم نرشح لك ورشة شريكة واحدة فقط، دون قوائم مربكة أو أسعار إصلاح متوقعة.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="customer.html?fresh=1">ابدأ طلبك الآن</a>
            <a class="btn btn-light" href="track.html">عندي طلب سابق</a>
          </div>
          <div class="hero-assurances" aria-label="مزايا الخدمة">
            <span>بدون تطبيق</span><span>بدون كلمة مرور</span><span>ورشة واحدة كل مرة</span><span>تواصل عبر واتساب</span>
          </div>
        </div>

        <div class="hero-card" aria-label="عرض مختصر لرحلة العميل">
          <div class="hero-phone">
            <div class="phone-notch"></div>
            <div class="phone-brand"><span class="logo-mark small-mark" aria-hidden="true">؟</span><div><strong>وين أوديها؟</strong><small>طلب جديد</small></div></div>
            <div class="mini-card active-mini"><strong>1. وش تحتاج سيارتك؟</strong><span>صيانة دورية أو مشكلة تواجهك</span><div class="mini-pulse" style="width:100%"></div></div>
            <div class="mini-card"><strong>2. نحدد المسار</strong><span>خدمة واضحة أو توجيه فني مبدئي</span><div class="mini-pulse" style="width:76%"></div></div>
            <div class="mini-card"><strong>3. ورشة واحدة مناسبة</strong><span>إحالة مسجلة قبل عرض بيانات الورشة</span><div class="mini-pulse" style="width:52%"></div></div>
            <a class="btn btn-dark btn-block" href="customer.html?fresh=1">ابدأ التجربة</a>
          </div>
        </div>
      </div>
    </section>

    <section class="trust-strip">
      <div class="container trust-grid">
        <div><strong>قرار أوضح</strong><span>بدل البحث العشوائي بين عشرات الورش</span></div>
        <div><strong>مطابقة أدق</strong><span>حسب التخصص والسيارة والمدينة</span></div>
        <div><strong>متابعة محفوظة</strong><span>بنفس رقم الطلب حتى 3 إحالات</span></div>
        <div><strong>تقييم موثق</strong><span>مرتبط بطلب وتجربة فعلية</span></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">رحلة مختصرة وواضحة</div>
          <h2>من وصف الاحتياج إلى التواصل مع الورشة</h2>
          <p>كل خطوة مصممة لتقليل الحيرة والمحافظة على بساطة التجربة على الجوال.</p>
        </div>
        <div class="journey-grid">
          <article class="journey-card"><span>01</span><div class="card-icon">⌁</div><h3>اختر المسار</h3><p>صيانة دورية لخدمة واضحة، أو مشكلة تحتاج فهمًا مبدئيًا.</p></article>
          <article class="journey-card"><span>02</span><div class="card-icon navy">▣</div><h3>أدخل بياناتك</h3><p>الاسم الأول، الجوال، السيارة، الممشى، والمدينة فقط.</p></article>
          <article class="journey-card"><span>03</span><div class="card-icon green">✓</div><h3>نحدد التخصص</h3><p>أسئلة توضيحية لمسار المشكلة فقط، دون تشخيص نهائي.</p></article>
          <article class="journey-card"><span>04</span><div class="card-icon">1</div><h3>استلم ترشيحًا واحدًا</h3><p>ورشة شريكة واحدة، ثم بديل داخل نفس الطلب عند الحاجة.</p></article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container split-section">
        <div class="section-head">
          <div class="kicker">لماذا «وين أوديها»؟</div>
          <h2>نقلل الخيارات… ونرفع وضوح القرار</h2>
          <p>القيمة ليست في عرض أكبر عدد من الورش، بل في اختيار ورشة مناسبة ومتابعة نتيجة كل إحالة.</p>
          <a class="btn btn-dark mt-16" href="customer.html?fresh=1">جرّب رحلة العميل</a>
        </div>
        <div class="benefit-list">
          <article><span>01</span><div><h3>لا قوائم مزدحمة</h3><p>العميل يرى ورشة واحدة فقط في كل مرة.</p></div></article>
          <article><span>02</span><div><h3>لا أسعار إصلاح متوقعة</h3><p>لا نقدّم تقديرًا غير موثوق قبل الفحص الفعلي.</p></div></article>
          <article><span>03</span><div><h3>الطلب لا يضيع</h3><p>يمكن الرجوع إليه بالجوال ورقم الطلب وطلب بديل.</p></div></article>
          <article><span>04</span><div><h3>الثقة قابلة للقياس</h3><p>التقييمات والإحالات والنتائج محفوظة داخل النظام.</p></div></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <div class="kicker">ثلاث بوابات مترابطة</div>
          <h2>نموذج تشغيل كامل للعرض والاختبار</h2>
          <p>جميع البوابات تعمل محليًا باستخدام localStorage وبيانات تجريبية.</p>
        </div>
        <div class="cards-3 portal-cards">
          <a class="card hover" href="customer.html?fresh=1">
            <div class="card-icon"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 14.5 5.8 9A2.5 2.5 0 0 1 8.2 7.3h7.6A2.5 2.5 0 0 1 18.2 9l1.8 5.5"/><path d="M3 14.5h18v3.3a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 17.8z"/></svg></div>
            <div class="portal-label">للعميل</div><h3>ابدأ طلب سيارة</h3><p>مسارا الصيانة الدورية والمشكلة، ثم المطابقة وواتساب والمتابعة والتقييم.</p><span class="card-link">ابدأ الطلب ←</span>
          </a>
          <a class="card hover" href="workshop-login.html">
            <div class="card-icon navy"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 21V10l8-6 8 6v11"/><path d="M9 21v-6h6v6"/><path d="M3 10h18"/></svg></div>
            <div class="portal-label">للشريك</div><h3>بوابة الورشة</h3><p>إدارة الإحالات، تحديث الحالات، قراءة التقييمات، وكشف الرسوم والمدفوعات.</p><span class="card-link">دخول تجريبي ←</span>
          </a>
          <a class="card hover" href="join.html">
            <div class="card-icon green"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="9"/></svg></div>
            <div class="portal-label">للورش الجديدة</div><h3>طلب انضمام</h3><p>نموذج متعدد الخطوات للمنشأة والموقع والتخصصات والوثائق والاتفاقية.</p><span class="card-link">قدّم طلبك ←</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section workshop-cta-section">
      <div class="container workshop-cta">
        <div><div class="eyebrow"><span class="eyebrow-dot"></span> للورش المختارة</div><h2>استقبل إحالات تناسب تخصصك بدل الطلبات العشوائية</h2><p>كل إحالة مرتبطة بطلب واضح، وسيارة محددة، واحتياج فعلي، مع متابعة للنتيجة وتقييم موثق.</p></div>
        <div class="cta-actions"><a class="btn btn-primary" href="join.html">انضم كورشة شريكة</a><a class="btn btn-light" href="workshop-login.html">شاهد لوحة الورشة</a></div>
      </div>
    </section>

    <section class="section">
      <div class="container faq-shell">
        <div class="section-head"><div class="kicker">أسئلة مهمة</div><h2>قبل أن تبدأ</h2></div>
        <div class="faq-grid">
          <details><summary>هل تقدم المنصة تشخيصًا نهائيًا؟</summary><p>لا. التوجيه فني مبدئي هدفه تحديد التخصص المناسب، والتشخيص النهائي يتم بعد فحص السيارة لدى الورشة.</p></details>
          <details><summary>هل تعرض المنصة أسعار إصلاح متوقعة؟</summary><p>لا. النسخة الأولى لا تعرض سعرًا متوقعًا أو نطاق تكلفة أو مقارنة بين أسعار الإصلاح.</p></details>
          <details><summary>ماذا لو لم أتفق مع الورشة؟</summary><p>تعود إلى نفس الطلب وتختار «أريد ورشة أخرى». تُستبعد الورشة السابقة وتُسجل إحالة جديدة، بحد أقصى ثلاث ورش.</p></details>
          <details><summary>هل أحتاج إلى إنشاء حساب؟</summary><p>لا تحتاج إلى كلمة مرور. يكفي الاسم الأول ورقم الجوال، ويمكن استرجاع الطلب برقم الطلب والجوال.</p></details>
        </div>
      </div>
    </section>
  </main>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
</body>
</html>
```

## `customer.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="ابدأ طلب سيارتك عبر مسار الصيانة الدورية أو وصف المشكلة، ثم احصل على ترشيح ورشة واحدة مناسبة.">
  <title>ابدأ طلبك — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="customer">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <section class="page-banner">
    <div class="container">
      <div>
        <h1>ابدأ طلب سيارتك</h1>
        <p>اختر المسار المناسب، وأكمل البيانات، ثم تحصل على ورشة شريكة واحدة فقط.</p>
      </div>
      <div class="page-banner-icon" aria-hidden="true">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 14.5 5.8 9A2.5 2.5 0 0 1 8.2 7.3h7.6A2.5 2.5 0 0 1 18.2 9l1.8 5.5"/><path d="M3 14.5h18v3.3a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 17.8z"/></svg>
      </div>
    </div>
  </section>

  <main class="page narrow">
    <div class="container">
      <div class="progress-shell" id="flowProgressShell">
        <div class="progress-meta"><span id="flowStepText">بداية الطلب</span><span id="flowPercent">0%</span></div>
        <div class="progress-track"><div class="progress-bar" id="flowProgressBar" style="width:0%"></div></div>
      </div>

      <section class="flow-screen active" data-screen="mode">
        <div class="flow-title">
          <div class="step">الخطوة الأولى</div>
          <h1>وش تحتاج سيارتك؟</h1>
          <p>اختر المسار الأقرب لاحتياجك. لا نخلط الصيانة الدورية مع تحليل الأعطال.</p>
        </div>
        <div class="choice-grid">
          <button class="choice-card" type="button" data-mode="maintenance">
            <span class="choice-check">✓</span>
            <span class="choice-icon" aria-hidden="true">
              <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 21h14M7 21V8l5-5 5 5v13"/><path d="M9 12h6M9 16h6"/></svg>
            </span>
            <h3>صيانة دورية</h3>
            <p>اختر خدمة واضحة مثل الزيت أو الفلاتر أو البطارية، بدون تحليل ذكاء اصطناعي أو أسئلة تشخيصية.</p>
          </button>

          <button class="choice-card" type="button" data-mode="problem">
            <span class="choice-check">✓</span>
            <span class="choice-icon" aria-hidden="true">
              <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 2.8 20h18.4z"/><path d="M12 9v5M12 17h.01"/></svg>
            </span>
            <h3>مشكلة تواجهك</h3>
            <p>صف المشكلة بطريقتك، ثم نحاكي فهمها مبدئيًا وطرح أسئلة مرتبطة بالحالة لتحديد التخصص.</p>
          </button>
        </div>
        <div class="form-actions">
          <a class="btn btn-light" href="index.html">العودة للرئيسية</a>
          <button class="btn btn-primary" id="modeNext" type="button" disabled>متابعة</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="maintenance">
        <div class="flow-title">
          <div class="step">الصيانة الدورية</div>
          <h2>اختر الخدمة المطلوبة</h2>
          <p>اختيار مباشر وسريع. لا يوجد تحليل عطل أو تقدير سعر إصلاح.</p>
        </div>
        <div class="service-grid" id="maintenanceServices"></div>
        <div class="field mt-16 hidden" id="otherServiceField">
          <label for="otherService">اكتب الخدمة الأخرى</label>
          <input id="otherService" type="text" maxlength="80" placeholder="مثال: فحص سوائل السيارة">
          <div class="error">اكتب اسم الخدمة.</div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" data-back="mode">رجوع</button>
          <button class="btn btn-primary" id="maintenanceNext" type="button" disabled>التالي</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="problem">
        <div class="flow-title">
          <div class="step">وصف المشكلة</div>
          <h2>وش المشكلة في سيارتك؟</h2>
          <p>اشرحها بطريقتك ولا تحتاج إلى معرفة المصطلحات الفنية. الإدخال نصي فقط.</p>
        </div>
        <div class="form-card">
          <div class="field" data-field="problem">
            <label for="problemText">وصف المشكلة</label>
            <textarea id="problemText" maxlength="600" placeholder="مثال: السيارة ترج إذا وقفت عند الإشارة وأحيانًا تظهر لمبة المكينة."></textarea>
            <div class="hint"><span id="problemCount">0</span> / 600 حرف</div>
            <div class="error">اكتب وصفًا واضحًا من 12 حرفًا على الأقل.</div>
          </div>
          <div class="inline-actions mt-12">
            <button class="btn btn-light btn-sm example-problem" type="button" data-text="السيارة ترج إذا وقفت عند الإشارة وأحيانًا تظهر لمبة المكينة.">رجفة عند الوقوف</button>
            <button class="btn btn-light btn-sm example-problem" type="button" data-text="المكيف يبرد أثناء المشي ويضعف إذا وقفت السيارة.">المكيف يضعف</button>
            <button class="btn btn-light btn-sm example-problem" type="button" data-text="أسمع صوت طقطقة من الأمام عند المطبات.">طقطقة عند المطبات</button>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" data-back="mode">رجوع</button>
          <button class="btn btn-primary" id="problemNext" type="button">التالي</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="customer">
        <div class="flow-title">
          <div class="step">بيانات العميل</div>
          <h2>خلّنا نعرفك</h2>
          <p>الاسم الأول ورقم الجوال يكفيان في النموذج الأولي.</p>
        </div>
        <div class="form-card form-grid">
          <div class="field" data-field="name">
            <label for="customerName">الاسم الأول</label>
            <input id="customerName" type="text" maxlength="30" autocomplete="given-name" placeholder="مثال: عبدالسلام">
            <div class="error">اكتب الاسم الأول.</div>
          </div>
          <div class="field" data-field="phone">
            <label for="customerPhone">رقم الجوال</label>
            <input id="customerPhone" type="tel" inputmode="numeric" maxlength="10" dir="ltr" autocomplete="tel" placeholder="05XXXXXXXX">
            <div class="error">أدخل رقم جوال سعودي صحيح يبدأ بـ 05.</div>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" id="customerBack">رجوع</button>
          <button class="btn btn-primary" id="customerNext" type="button">التالي</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="vehicle">
        <div class="flow-title">
          <div class="step">بيانات السيارة</div>
          <h2>وش سيارتك؟</h2>
          <p>تساعد بيانات السيارة في اختيار التخصص والورشة المناسبة.</p>
        </div>
        <div class="form-card form-grid">
          <div class="field" data-field="make">
            <label for="vehicleMake">الشركة المصنعة</label>
            <select id="vehicleMake"></select>
            <div class="error">اختر الشركة.</div>
          </div>
          <div class="field" data-field="model">
            <label for="vehicleModel">الموديل</label>
            <input id="vehicleModel" type="text" maxlength="40" placeholder="مثال: كامري">
            <div class="error">اكتب الموديل.</div>
          </div>
          <div class="field" data-field="year">
            <label for="vehicleYear">سنة الصنع</label>
            <select id="vehicleYear" data-year-select></select>
            <div class="error">اختر سنة الصنع.</div>
          </div>
          <div class="field" data-field="mileage">
            <label for="vehicleMileage">ممشى السيارة</label>
            <select id="vehicleMileage">
              <option value="">اختر الممشى</option>
              <option>أقل من 50 ألف كم</option>
              <option>من 50 إلى 100 ألف كم</option>
              <option>من 100 إلى 150 ألف كم</option>
              <option>من 150 إلى 200 ألف كم</option>
              <option>أكثر من 200 ألف كم</option>
            </select>
            <div class="error">اختر الممشى.</div>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" data-back="customer">رجوع</button>
          <button class="btn btn-primary" id="vehicleNext" type="button">التالي</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="location">
        <div class="flow-title">
          <div class="step">الموقع</div>
          <h2>وين تبحث عن ورشة؟</h2>
          <p>اختر إحدى مدن ومحافظات القصيم، أو استخدم تحديد موقع تجريبي.</p>
        </div>
        <div class="form-card form-grid one">
          <button class="btn btn-light btn-block" id="useMockLocation" type="button">استخدام موقعي الحالي — محاكاة</button>
          <div class="field" data-field="city">
            <label for="customerCity">المدينة أو المحافظة</label>
            <select id="customerCity"></select>
            <div class="error">اختر موقع البحث.</div>
          </div>
          <div class="notice success hidden" id="locationNotice">تم تحديد موقع تجريبي داخل بريدة.</div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" data-back="vehicle">رجوع</button>
          <button class="btn btn-primary" id="locationNext" type="button">متابعة</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="analyzing" aria-live="polite">
        <div class="form-card ai-loader">
          <div class="ai-core" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6l1 3 3 1v10l-3 1-1 3H9l-1-3-3-1V7l3-1z"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><path d="M8.5 15h7"/></svg>
          </div>
          <h2>نفهم المشكلة مبدئيًا…</h2>
          <p class="text-muted">نراجع وصفك وبيانات السيارة لنختار أسئلة مرتبطة بالحالة، دون تقديم تشخيص نهائي.</p>
          <div class="loader-steps" id="analysisSteps">
            <div class="loader-step active"><span class="dot"></span><span>قراءة وصف المشكلة</span></div>
            <div class="loader-step"><span class="dot"></span><span>ربط الأعراض ببيانات السيارة</span></div>
            <div class="loader-step"><span class="dot"></span><span>تحديد الأسئلة والتخصص المتوقع</span></div>
          </div>
        </div>
      </section>

      <section class="flow-screen" data-screen="questions">
        <div class="flow-title">
          <div class="step">أسئلة توضيحية</div>
          <h2>كم سؤال بسيط ونكون أوضح</h2>
          <p>الأسئلة تتغير بحسب وصف المشكلة وليست قائمة ثابتة.</p>
        </div>
        <div class="form-card">
          <div class="badge info" id="questionCount">السؤال 1 من 4</div>
          <h2 id="questionText" class="mt-16">—</h2>
          <div class="answer-grid" id="answerGrid"></div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" id="questionBack" type="button">السابق</button>
          <button class="btn btn-primary" id="questionNext" type="button" disabled>التالي</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="guidance">
        <div class="flow-title">
          <div class="step">التوجيه المبدئي</div>
          <h2>فهمنا مشكلتك</h2>
          <p>نعرض مسارًا فنيًا مبدئيًا لتحديد التخصص، وليس تشخيصًا نهائيًا.</p>
        </div>
        <div class="form-card info-list">
          <div class="info-row"><div class="info-label">السيارة</div><div class="info-value" id="guidanceVehicle">—</div></div>
          <div class="info-row"><div class="info-label">المشكلة التي وصفتها</div><div class="info-value" id="guidanceProblem">—</div></div>
          <div class="info-row"><div class="info-label">التوجيه الفني المبدئي</div><div class="info-value" id="guidanceText">—</div></div>
          <div class="info-row"><div class="info-label">التخصص المناسب</div><div class="info-value"><span class="badge info" id="guidanceSpecialty">—</span></div></div>
          <div class="info-row"><div class="info-label">الخدمة المقترحة كبداية</div><div class="info-value">فحص وتشخيص للمشكلة</div></div>
        </div>
        <div class="notice warning mt-12">التوجيه المعروض مبدئي ويهدف إلى مساعدتك في الوصول إلى التخصص المناسب، ولا يمثل تشخيصًا نهائيًا للعطل.</div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" data-back="questions">مراجعة الإجابات</button>
          <button class="btn btn-dark" id="guidanceMatch" type="button">وين أوديها؟</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="maintenanceSummary">
        <div class="flow-title">
          <div class="step">مراجعة الطلب</div>
          <h2>طلب الصيانة جاهز</h2>
          <p>الخدمة واضحة، لذلك انتقلنا مباشرة للمطابقة دون تحليل أو أسئلة تشخيصية.</p>
        </div>
        <div class="form-card info-list">
          <div class="info-row"><div class="info-label">الخدمة المطلوبة</div><div class="info-value" id="maintenanceSummaryService">—</div></div>
          <div class="info-row"><div class="info-label">السيارة</div><div class="info-value" id="maintenanceSummaryVehicle">—</div></div>
          <div class="info-row"><div class="info-label">المدينة</div><div class="info-value" id="maintenanceSummaryCity">—</div></div>
          <div class="info-row"><div class="info-label">التخصص المطلوب</div><div class="info-value"><span class="badge info">صيانة دورية وخدمات سريعة</span></div></div>
        </div>
        <div class="notice info mt-12">لا تعرض المنصة سعرًا متوقعًا للخدمة أو الإصلاح. يتم التنسيق مباشرة مع الورشة بعد الترشيح.</div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" data-back="location">تعديل الموقع</button>
          <button class="btn btn-dark" id="maintenanceMatch" type="button">رشّح لي ورشة</button>
        </div>
      </section>

      <section class="flow-screen" data-screen="matching" aria-live="polite">
        <div class="form-card ai-loader">
          <div class="ai-core" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          </div>
          <h2>نطابق طلبك مع الورش الشريكة</h2>
          <p class="text-muted">نراجع التخصص ونوع السيارة والموقع والتقييمات والالتزام لاختيار ورشة واحدة فقط.</p>
          <div class="loader-steps">
            <div class="loader-step done"><span class="dot">✓</span><span>تم إنشاء رقم الطلب</span></div>
            <div class="loader-step active"><span class="dot"></span><span>مقارنة الورش المناسبة</span></div>
            <div class="loader-step"><span class="dot"></span><span>تسجيل الإحالة قبل إظهار الورشة</span></div>
          </div>
        </div>
      </section>

      <section class="flow-screen" data-screen="result" aria-live="polite">
        <div class="flow-title">
          <div class="step">الورشة المقترحة</div>
          <h2>هذه الورشة الأنسب لطلبك</h2>
          <p id="resultIntro">تم اختيار ورشة شريكة واحدة فقط وتسجيل الإحالة.</p>
        </div>
        <article class="workshop-card">
          <div class="workshop-cover">
            <div class="workshop-heading">
              <div class="workshop-logo" aria-hidden="true">
                <svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m14.7 6.3 3-3a3.5 3.5 0 0 1-4.5 4.5l-7.6 7.6a2 2 0 1 0 2.8 2.8l7.6-7.6a3.5 3.5 0 0 1 4.5-4.5l-3 3"/></svg>
              </div>
              <div><h2 id="resultWorkshopName">—</h2><p>ورشة شريكة في وين أوديها</p></div>
            </div>
          </div>
          <div class="workshop-body">
            <div class="request-strip"><span>رقم الطلب</span><strong id="resultRequestId">—</strong></div>
            <div class="metric-grid">
              <div class="metric"><small>التقييم العام</small><strong><span class="stars">★</span> <span id="resultRating">—</span> من 5</strong></div>
              <div class="metric"><small>عدالة الأسعار</small><strong><span class="stars">★</span> <span id="resultFairness">—</span> من 5</strong></div>
              <div class="metric"><small>التقييمات الموثقة</small><strong id="resultRatingsCount">—</strong></div>
              <div class="metric"><small>المسافة</small><strong id="resultDistance">—</strong></div>
            </div>
            <div class="info-list mt-16">
              <div class="info-row"><div class="info-label">المدينة</div><div class="info-value" id="resultCity">—</div></div>
              <div class="info-row"><div class="info-label">التخصص</div><div class="info-value" id="resultSpecialty">—</div></div>
              <div class="info-row"><div class="info-label">مستوى الالتزام</div><div class="info-value" id="resultCommitment">—</div></div>
              <div class="info-row"><div class="info-label">ينصح بها العملاء</div><div class="info-value" id="resultRecommend">—</div></div>
            </div>
            <div class="why-box"><strong>لماذا تم ترشيح هذه الورشة؟</strong><p id="resultReason">—</p></div>
            <div class="inline-actions">
              <button class="btn btn-success" id="openWhatsapp" type="button">التواصل عبر واتساب</button>
              <a class="btn btn-light" id="trackRequestLink" href="track.html">متابعة الطلب</a>
              <button class="btn btn-light" id="anotherWorkshop" type="button">أريد ورشة أخرى</button>
            </div>
          </div>
        </article>
        <div class="notice info mt-12">يمكن ترشيح حتى 3 ورش داخل نفس الطلب، لكن لا تظهر أكثر من ورشة واحدة في الوقت نفسه.</div>
      </section>
    </div>
  </main>

  <div class="modal" id="whatsappModal" role="dialog" aria-modal="true" aria-labelledby="whatsappTitle">
    <div class="modal-head">
      <div><h3 id="whatsappTitle">رسالة واتساب جاهزة</h3><p>ستفتح المحادثة في نافذة جديدة، ولن تُرسل الرسالة حتى تضغط إرسال داخل واتساب.</p></div>
      <button class="modal-close" type="button" data-close-modal aria-label="إغلاق">×</button>
    </div>
    <div class="notice success" id="whatsappMessage" style="white-space:pre-line"></div>
    <div class="inline-actions mt-16">
      <a class="btn btn-success" id="openWhatsappLink" href="https://wa.me/" target="_blank" rel="noopener">فتح واتساب</a>
      <button class="btn btn-light" id="copyWhatsappMessage" type="button">نسخ الرسالة</button>
    </div>
  </div>

  <div class="modal" id="anotherModal" role="dialog" aria-modal="true" aria-labelledby="anotherTitle">
    <div class="modal-head">
      <div><h3 id="anotherTitle">سبب طلب ورشة أخرى</h3><p>اختيار السبب اختياري ويساعد في تسجيل نتيجة الإحالة السابقة.</p></div>
      <button class="modal-close" type="button" data-close-modal aria-label="إغلاق">×</button>
    </div>
    <div class="form-grid one" id="anotherReasons">
      <label class="check-card"><input type="radio" name="anotherReason" value="لم يتم الرد">لم يتم الرد</label>
      <label class="check-card"><input type="radio" name="anotherReason" value="لم نتفق على الموعد">لم نتفق على الموعد</label>
      <label class="check-card"><input type="radio" name="anotherReason" value="لم يتم التفاهم على السعر">لم يتم التفاهم على السعر</label>
      <label class="check-card"><input type="radio" name="anotherReason" value="الخدمة غير متوفرة">الخدمة غير متوفرة</label>
      <label class="check-card"><input type="radio" name="anotherReason" value="لم أرغب في الاستمرار مع الورشة">لم أرغب في الاستمرار مع الورشة</label>
      <label class="check-card"><input type="radio" name="anotherReason" value="سبب آخر">سبب آخر</label>
    </div>
    <button class="btn btn-dark btn-block mt-16" id="confirmAnotherWorkshop" type="button">رشّح لي ورشة أخرى</button>
  </div>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/customer.js"></script>
</body>
</html>
```

## `track.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="متابعة طلب وين أوديها، التواصل مع الورشة، طلب ورشة بديلة، وتقييم التجربة الموثقة.">
  <title>متابعة الطلب — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="track">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <section class="page-banner">
    <div class="container">
      <div>
        <h1>طلبك محفوظ… كمل من هنا</h1>
        <p>تابع الإحالة الحالية، افتح واتساب، أكد النتيجة، أو اطلب ورشة أخرى دون إعادة بياناتك.</p>
      </div>
      <div class="page-banner-icon" aria-hidden="true">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>
      </div>
    </div>
  </section>

  <main class="page narrow" id="main-content">
    <div class="container">
      <form class="form-card" id="requestSearchForm" novalidate>
        <div class="flow-title">
          <div class="step">استرجاع آمن وبسيط</div>
          <h2>أدخل رقم الطلب والجوال</h2>
          <p>رقم الطلب ثابت حتى عند ترشيح ورشة ثانية أو ثالثة.</p>
        </div>
        <div class="form-grid">
          <div class="field" data-field="trackId">
            <label for="trackId">رقم الطلب</label>
            <input id="trackId" dir="ltr" autocomplete="off" placeholder="WA-10425" aria-describedby="trackIdError">
            <div class="error" id="trackIdError">أدخل رقم الطلب.</div>
          </div>
          <div class="field" data-field="trackPhone">
            <label for="trackPhone">رقم الجوال</label>
            <input id="trackPhone" type="tel" inputmode="numeric" maxlength="10" dir="ltr" autocomplete="tel" placeholder="05XXXXXXXX" aria-describedby="trackPhoneError">
            <div class="error" id="trackPhoneError">أدخل رقم الجوال المرتبط بالطلب.</div>
          </div>
        </div>
        <div class="inline-actions mt-16">
          <button class="btn btn-dark" id="searchRequest" type="submit">عرض الطلب</button>
          <button class="btn btn-light" id="loadDemoRequest" type="button">فتح الطلب التجريبي</button>
        </div>
      </form>

      <section id="requestView" class="hidden mt-20" aria-live="polite">
        <div class="dashboard-head">
          <div><h1 id="trackRequestTitle">الطلب —</h1><p id="trackRequestMeta">—</p></div>
          <span class="badge info" id="trackRequestStatus">—</span>
        </div>

        <div class="stats-grid">
          <div class="stat-card"><div class="stat-label">نوع الطلب</div><div class="stat-value compact" id="trackType">—</div></div>
          <div class="stat-card"><div class="stat-label">السيارة</div><div class="stat-value compact" id="trackVehicle">—</div></div>
          <div class="stat-card"><div class="stat-label">المدينة</div><div class="stat-value compact" id="trackCity">—</div></div>
          <div class="stat-card highlight"><div class="stat-label">عدد الإحالات</div><div class="stat-value" id="trackReferralCount">—</div><div class="stat-meta">الحد الأقصى 3</div></div>
        </div>

        <div class="card request-summary-card">
          <div class="section-row">
            <div><h3 class="mt-0">ملخص الطلب</h3><p>بياناتك محفوظة داخل الطلب نفسه.</p></div>
            <button class="btn btn-light btn-sm" id="copyRequestId" type="button">نسخ رقم الطلب</button>
          </div>
          <div class="info-list" id="requestDetails"></div>
        </div>

        <div class="two-column-grid mt-20">
          <div class="card">
            <h3 class="mt-0">مسار الإحالة الحالية</h3>
            <div class="timeline mt-16" id="requestTimeline"></div>
          </div>
          <div class="card referral-current-card">
            <div class="section-row">
              <h3 class="mt-0">الورشة الحالية</h3>
              <span class="badge info">ورشة واحدة فقط</span>
            </div>
            <div id="currentReferralCard" class="mt-16"></div>
          </div>
        </div>

        <div class="card mt-20">
          <div class="section-row">
            <div><h3 class="mt-0">ما نتيجة الإحالة الحالية؟</h3><p>اختر آخر نتيجة فعلية وصلت إليها.</p></div>
          </div>
          <div class="inline-actions confirmation-actions">
            <button class="btn btn-light confirmation-btn" data-confirmation="لم أتواصل معها" type="button">لم أتواصل</button>
            <button class="btn btn-light confirmation-btn" data-confirmation="تواصلت ولم أصل" type="button">تواصلت ولم أصل</button>
            <button class="btn btn-primary confirmation-btn" data-confirmation="وصلت إلى الورشة" type="button">وصلت للورشة</button>
            <button class="btn btn-success confirmation-btn" data-confirmation="تمت الخدمة" type="button">تمت الخدمة</button>
          </div>
          <div class="notice success mt-16 hidden" id="confirmationNotice" role="status"></div>
          <div class="request-alternative mt-16" id="alternativeAction">
            <div><strong>ما اتفقت مع الورشة؟</strong><span>اطلب بديلًا داخل نفس الطلب، وسنستبعد الورشة السابقة.</span></div>
            <button class="btn btn-light" id="requestAlternative" type="button">أريد ورشة أخرى</button>
          </div>
        </div>

        <div class="card mt-20">
          <div class="section-row"><div><h3 class="mt-0">سجل الإحالات</h3><p>كل ورشة تظهر كسجل مستقل داخل رقم الطلب نفسه.</p></div></div>
          <div class="referral-history" id="referralHistory"></div>
        </div>

        <div class="card mt-20 hidden" id="ratingSection">
          <div class="flow-title">
            <div class="step">تقييم موثق</div>
            <h2>قيّم تجربتك مع الورشة</h2>
            <p>يظهر التقييم بعد تأكيد إتمام الخدمة، ويرتبط بالإحالة الحالية فقط.</p>
          </div>
          <form id="ratingForm" novalidate>
            <div class="rating-grid" id="ratingFields"></div>
            <div class="form-grid mt-16">
              <div class="field" data-field="recommendWorkshop">
                <label for="recommendWorkshop">هل تنصح بالورشة؟</label>
                <select id="recommendWorkshop"><option value="">اختر</option><option>نعم</option><option>لا</option></select>
                <div class="error">اختر نعم أو لا.</div>
              </div>
              <div class="field">
                <label for="ratingComment">تعليق اختياري</label>
                <textarea id="ratingComment" maxlength="300" placeholder="شاركنا ملاحظتك باختصار"></textarea>
              </div>
            </div>
            <button class="btn btn-dark mt-16" type="submit">إرسال التقييم الموثق</button>
          </form>
          <div class="notice success hidden" id="ratingSuccess" role="status"></div>
        </div>
      </section>
    </div>
  </main>

  <div class="modal" id="trackAnotherModal" role="dialog" aria-modal="true" aria-labelledby="trackAnotherTitle">
    <div class="modal-head">
      <div><h3 id="trackAnotherTitle">لماذا تريد ورشة أخرى؟</h3><p>السبب اختياري، ويساعد في تحسين المطابقة ومتابعة أداء الورش.</p></div>
      <button class="modal-close" type="button" data-close-modal aria-label="إغلاق">×</button>
    </div>
    <div class="form-grid one">
      <label class="check-card"><input type="radio" name="trackAnotherReason" value="لم يتم الرد">لم يتم الرد</label>
      <label class="check-card"><input type="radio" name="trackAnotherReason" value="لم نتفق على الموعد">لم نتفق على الموعد</label>
      <label class="check-card"><input type="radio" name="trackAnotherReason" value="لم يتم التفاهم على السعر">لم يتم التفاهم على السعر</label>
      <label class="check-card"><input type="radio" name="trackAnotherReason" value="الخدمة غير متوفرة">الخدمة غير متوفرة</label>
      <label class="check-card"><input type="radio" name="trackAnotherReason" value="لم أرغب في الاستمرار مع الورشة">لم أرغب في الاستمرار مع الورشة</label>
      <label class="check-card"><input type="radio" name="trackAnotherReason" value="سبب آخر">سبب آخر</label>
    </div>
    <button class="btn btn-dark btn-block mt-16" id="confirmTrackAlternative" type="button">ترشيح ورشة بديلة</button>
  </div>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/track.js"></script>
</body>
</html>
```

## `workshop-login.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="دخول الورشة التجريبي إلى لوحة إحالات وين أوديها.">
  <title>دخول الورشة — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="workshop-login">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main class="login-shell">
    <section class="login-side">
      <div class="eyebrow"><span class="eyebrow-dot"></span> بوابة الشركاء</div>
      <h1>إحالات أوضح…<br><span>وتشغيل أبسط للورشة.</span></h1>
      <p>تابع الطلبات المحالة، حدّث حالاتها، راجع التقييمات والرصيد، وسدّد الرسوم المستحقة وفق اتفاقية الشراكة.</p>
    </section>

    <section class="login-form-wrap">
      <div class="login-card form-card">
        <h2>تسجيل دخول الورشة</h2>
        <p>دخول تجريبي لعرض لوحة التحكم. لا يوجد تحقق حقيقي أو إرسال رموز.</p>
        <form id="workshopLoginForm" class="form-grid one">
          <div class="field" data-field="loginPhone">
            <label for="loginPhone">رقم الجوال المسجل</label>
            <input id="loginPhone" type="tel" inputmode="numeric" dir="ltr" maxlength="10" autocomplete="username" placeholder="05XXXXXXXX">
            <div class="error">أدخل رقم الدخول التجريبي.</div>
          </div>
          <div class="field" data-field="loginCode">
            <label for="loginCode">رمز الدخول</label>
            <input id="loginCode" type="password" inputmode="numeric" dir="ltr" maxlength="4" autocomplete="current-password" placeholder="••••">
            <div class="error">رمز الدخول غير صحيح.</div>
          </div>
          <button class="btn btn-dark btn-block" type="submit">دخول لوحة التحكم</button>
        </form>
        <div class="demo-credentials">
          <strong>بيانات الدخول التجريبية</strong><br>
          الجوال: <span class="ltr">0550000101</span> — الرمز: <span class="ltr">1234</span>
          <button class="btn btn-light btn-sm mt-12" id="fillDemoLogin" type="button">تعبئة البيانات التجريبية</button>
        </div>
        <div class="inline-actions mt-16">
          <a class="btn btn-light btn-sm" href="join.html">غير شريك؟ قدّم طلب انضمام</a>
          <a class="btn btn-light btn-sm" href="index.html">الرئيسية</a>
        </div>
      </div>
    </section>
  </main>

  <script src="assets/common.js"></script>
  <script src="assets/workshop-login.js"></script>
</body>
</html>
```

## `workshop-dashboard.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="لوحة الورشة لإدارة الإحالات والتقييمات والرسوم والمدفوعات التجريبية.">
  <title>لوحة الورشة — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="workshop-dashboard">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main class="page">
    <div class="container portal-grid">
      <aside class="sidebar">
        <div class="sidebar-title">
          <strong id="sidebarWorkshopName">مركز نبض المحرك</strong>
          <small>شريك نشط</small>
        </div>
        <nav class="sidebar-nav" aria-label="لوحة الورشة">
          <button class="active" type="button" data-tab="overview">نظرة عامة</button>
          <button type="button" data-tab="referrals">الإحالات</button>
          <button type="button" data-tab="ratings">التقييمات</button>
          <button type="button" data-tab="statement">كشف الحساب</button>
          <a href="payment.html">دفع الرسوم</a>
          <button class="danger-link" id="logoutWorkshop" type="button">تسجيل الخروج</button>
        </nav>
      </aside>

      <div class="portal-main">
        <section class="portal-panel active" data-panel="overview">
          <div class="dashboard-head">
            <div>
              <h1>مرحبًا، <span id="ownerName">محمد السالم</span></h1>
              <p>متابعة تشغيل الورشة والإحالات والرصيد من مكان واحد.</p>
            </div>
            <a class="btn btn-primary" href="payment.html">دفع الرصيد المستحق</a>
          </div>

          <div class="stats-grid">
            <div class="stat-card"><div class="stat-label">إجمالي الإحالات</div><div class="stat-value" id="statReferrals">0</div><div class="stat-meta">الإحالات المسجلة للعرض</div></div>
            <div class="stat-card"><div class="stat-label">تمت الخدمة</div><div class="stat-value" id="statCompleted">0</div><div class="stat-meta">حالات مؤكدة</div></div>
            <div class="stat-card"><div class="stat-label">التقييم العام</div><div class="stat-value"><span class="stars">★</span> <span id="statRating">4.8</span></div><div class="stat-meta">من تقييمات موثقة</div></div>
            <div class="stat-card highlight"><div class="stat-label">الرصيد المستحق</div><div class="stat-value" id="statBalance">0 ر.س</div><div class="stat-meta">حد المطالبة: 100 ر.س</div></div>
          </div>

          <div class="cards-3">
            <div class="card">
              <h3>مؤشر الالتزام</h3>
              <div class="stat-value mt-12" id="commitmentValue">94%</div>
              <div class="progress-track mt-12"><div class="progress-bar" id="commitmentBar" style="width:94%"></div></div>
              <p class="mt-12">يعكس تحديث الحالات والتعامل والمتابعة.</p>
            </div>
            <div class="card">
              <h3>مؤشر الثقة الداخلي</h3>
              <div class="stat-value mt-12" id="trustValue">92%</div>
              <div class="progress-track mt-12"><div class="progress-bar" id="trustBar" style="width:92%"></div></div>
              <p class="mt-12">مؤشر داخلي لا يظهر للعميل.</p>
            </div>
            <div class="card">
              <h3>عدالة الأسعار</h3>
              <div class="stat-value mt-12"><span class="stars">★</span> <span id="fairnessValue">4.6</span></div>
              <p class="mt-12">رأي العملاء في عدالة السعر مقارنة بالخدمة والتجربة، وليس حكمًا بأن الورشة الأرخص.</p>
            </div>
          </div>

          <div class="card mt-20">
            <div class="dashboard-head">
              <div><h3 class="mt-0">أحدث الإحالات</h3><p>حدّث الحالة بدقة حتى تكون المتابعة واضحة.</p></div>
              <button class="btn btn-light btn-sm" type="button" data-switch-tab="referrals">عرض جميع الإحالات</button>
            </div>
            <div class="table-wrap"><table><thead><tr><th>الطلب</th><th>العميل والسيارة</th><th>الخدمة</th><th>الحالة</th><th>آخر تحديث</th></tr></thead><tbody id="latestReferralsBody"></tbody></table></div>
          </div>
        </section>

        <section class="portal-panel" data-panel="referrals">
          <div class="dashboard-head">
            <div><h1>إدارة الإحالات</h1><p>كل إحالة مرتبطة بطلب وورشة وحالة مستقلة.</p></div>
            <div class="inline-actions">
              <label class="sr-only" for="referralFilter">تصفية الإحالات حسب الحالة</label><select id="referralFilter" style="width:auto"><option value="">كل الحالات</option></select>
              <button class="btn btn-light btn-sm" id="resetReferralDemo" type="button">إعادة البيانات التجريبية</button>
            </div>
          </div>
          <div class="notice info mb-12">عند تحديث الحالة إلى «تمت الخدمة» تتم محاكاة تسجيل رسم ثابت وفق الاتفاقية. القيمة المالية تجريبية للعرض فقط ولا تمثل سياسة معتمدة.</div>
          <div class="table-wrap"><table><thead><tr><th>الإحالة</th><th>الطلب</th><th>العميل</th><th>السيارة والخدمة</th><th>الحالة</th><th>الإجراء</th></tr></thead><tbody id="referralsBody"></tbody></table></div>
        </section>

        <section class="portal-panel" data-panel="ratings">
          <div class="dashboard-head">
            <div><h1>التقييمات الموثقة</h1><p>كل تقييم مرتبط بإحالة وتجربة أكد العميل حدوثها.</p></div>
          </div>
          <div class="stats-grid">
            <div class="stat-card"><div class="stat-label">متوسط التقييم العام</div><div class="stat-value" id="ratingOverall">—</div></div>
            <div class="stat-card"><div class="stat-label">جودة التعامل</div><div class="stat-value" id="ratingTreatment">—</div></div>
            <div class="stat-card"><div class="stat-label">الالتزام</div><div class="stat-value" id="ratingCommitment">—</div></div>
            <div class="stat-card"><div class="stat-label">عدالة الأسعار</div><div class="stat-value" id="ratingFairness">—</div></div>
          </div>
          <div id="ratingsList" class="form-grid one"></div>
        </section>

        <section class="portal-panel" data-panel="statement">
          <div class="dashboard-head">
            <div><h1>كشف الحساب</h1><p>الإحالات والرسوم المسجلة والمدفوعات والرصيد الحالي.</p></div>
            <a class="btn btn-primary" href="payment.html">دفع الرسوم</a>
          </div>
          <div class="stats-grid">
            <div class="stat-card"><div class="stat-label">إجمالي الرسوم</div><div class="stat-value" id="feesTotal">—</div></div>
            <div class="stat-card"><div class="stat-label">المدفوع</div><div class="stat-value" id="feesPaid">—</div></div>
            <div class="stat-card highlight"><div class="stat-label">الرصيد الحالي</div><div class="stat-value" id="feesOutstanding">—</div></div>
            <div class="stat-card"><div class="stat-label">آخر سداد</div><div class="stat-value" id="lastPayment" style="font-size:14px">—</div></div>
          </div>
          <div class="notice warning mb-12" id="balanceNotice"></div>
          <div class="table-wrap"><table><thead><tr><th>رقم الرسم</th><th>الإحالة والطلب</th><th>الحدث المستحق</th><th>القيمة التجريبية</th><th>الحالة</th><th>التاريخ</th></tr></thead><tbody id="feesBody"></tbody></table></div>
          <h3 class="mt-20">سجل المدفوعات</h3>
          <div class="table-wrap"><table><thead><tr><th>رقم الدفع</th><th>القيمة</th><th>الطريقة</th><th>الحالة</th><th>التاريخ</th><th>الإيصال</th></tr></thead><tbody id="paymentsBody"></tbody></table></div>
        </section>
      </div>
    </div>
  </main>

  <div class="modal" id="referralModal" role="dialog" aria-modal="true" aria-labelledby="referralModalTitle">
    <div class="modal-head">
      <div><h3 id="referralModalTitle">تحديث الإحالة</h3><p>اختر الحالة الجديدة وسجّلها في النموذج.</p></div>
      <button class="modal-close" type="button" data-close-modal>×</button>
    </div>
    <div id="referralModalContent"></div>
  </div>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/dashboard.js"></script>
</body>
</html>
```

## `payment.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="صفحة دفع تجريبية لرسوم منصة وين أوديها.">
  <title>دفع الرسوم — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="payment">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <section class="page-banner">
    <div class="container">
      <div><h1>دفع رسوم المنصة</h1><p>محاكاة دفع للرسوم المسجلة وفق اتفاقية الشراكة، مع إصدار إيصال تجريبي.</p></div>
      <div class="page-banner-icon" aria-hidden="true"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg></div>
    </div>
  </section>

  <main class="page">
    <div class="container">
      <div class="payment-layout">
        <section class="form-card">
          <div class="dashboard-head">
            <div><h2 class="mt-0">اختر الرسوم المراد سدادها</h2><p>القيم المعروضة تجريبية للعرض، ولا تمثل سعر إصلاح أو سياسة تجارية معتمدة.</p></div>
            <a class="btn btn-light btn-sm" href="workshop-dashboard.html">العودة للوحة</a>
          </div>

          <div id="unpaidFeesList" class="form-grid one"></div>
          <div class="notice info mt-16">رسوم المنصة مستقلة عن قيمة إصلاح السيارة أو الفاتورة، وترتبط بالحدث المستحق المحدد في الاتفاقية.</div>

          <div class="mt-20">
            <h3>بيانات البطاقة — محاكاة</h3>
            <div class="card-preview" aria-hidden="true">
              <div class="card-chip"></div>
              <div class="card-number" id="cardPreviewNumber">•••• •••• •••• ••••</div>
              <div class="card-meta"><span>اسم حامل البطاقة<strong id="cardPreviewName">اسم الورشة</strong></span><span>الانتهاء<strong id="cardPreviewExpiry" class="ltr">MM/YY</strong></span></div>
            </div>
            <form id="paymentForm" class="form-grid" autocomplete="off" novalidate>
              <div class="field full" data-field="cardNumber">
                <label for="cardNumber">رقم البطاقة</label>
                <input id="cardNumber" inputmode="numeric" dir="ltr" maxlength="19" placeholder="0000 0000 0000 0000">
                <div class="error">أدخل رقم بطاقة تجريبي من 16 رقمًا.</div>
              </div>
              <div class="field" data-field="cardName">
                <label for="cardName">اسم حامل البطاقة</label>
                <input id="cardName" maxlength="60" placeholder="محمد السالم">
                <div class="error">اكتب اسم حامل البطاقة.</div>
              </div>
              <div class="field" data-field="expiry">
                <label for="expiry">تاريخ الانتهاء</label>
                <input id="expiry" inputmode="numeric" dir="ltr" maxlength="5" placeholder="MM/YY">
                <div class="error">أدخل تاريخًا بصيغة MM/YY.</div>
              </div>
              <div class="field" data-field="cvv">
                <label for="cvv">رمز التحقق</label>
                <input id="cvv" type="password" inputmode="numeric" dir="ltr" maxlength="3" placeholder="•••">
                <div class="error">أدخل 3 أرقام.</div>
              </div>
              <div class="field">
                <label>نوع العملية</label>
                <input value="دفع إلكتروني تجريبي — لا توجد عملية مالية حقيقية" disabled>
              </div>
              <div class="notice info full">لا يتم حفظ رقم البطاقة أو رمز التحقق. يحفظ النموذج آخر أربعة أرقام فقط داخل سجل الإيصال التجريبي.</div>
              <button class="btn btn-success btn-block full" id="payButton" type="submit">إتمام الدفع التجريبي</button>
            </form>
          </div>
        </section>

        <aside class="payment-summary">
          <h3>ملخص السداد</h3>
          <div class="payment-row"><span>الورشة</span><strong id="summaryWorkshop">—</strong></div>
          <div class="payment-row"><span>عدد الرسوم المحددة</span><strong id="summaryCount">0</strong></div>
          <div class="payment-row"><span>الحدث المستحق</span><strong id="summaryEvent">وفق الاتفاقية</strong></div>
          <div class="payment-row"><span>حالة العملية</span><strong>محاكاة</strong></div>
          <div class="payment-total"><span>الإجمالي</span><strong id="summaryTotal">0 ر.س</strong></div>
          <div class="notice warning mt-16" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.12);color:#d4dbe5">لن يتم خصم أي مبلغ حقيقي. الصفحة مخصصة لعرض تجربة المستخدم فقط.</div>
        </aside>
      </div>
    </div>
  </main>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/payment.js"></script>
</body>
</html>
```

## `receipt.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="إيصال الدفع التجريبي لرسوم منصة وين أوديها.">
  <title>إيصال الدفع — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="receipt">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <main class="page">
    <div class="container">
      <article class="receipt" id="receiptCard">
        <div class="receipt-head">
          <div class="receipt-check">✓</div>
          <h1>تمت محاكاة الدفع بنجاح</h1>
          <p>إيصال تجريبي — لا توجد عملية مالية حقيقية.</p>
        </div>
        <div class="receipt-body">
          <div class="receipt-grid">
            <div class="receipt-item"><small>رقم الإيصال</small><strong id="receiptId" class="ltr">—</strong></div>
            <div class="receipt-item"><small>رقم عملية الدفع</small><strong id="paymentId" class="ltr">—</strong></div>
            <div class="receipt-item"><small>الورشة</small><strong id="receiptWorkshop">—</strong></div>
            <div class="receipt-item"><small>المبلغ التجريبي</small><strong id="receiptAmount">—</strong></div>
            <div class="receipt-item"><small>طريقة الدفع</small><strong id="receiptMethod">—</strong></div>
            <div class="receipt-item"><small>تاريخ العملية</small><strong id="receiptDate">—</strong></div>
            <div class="receipt-item"><small>آخر أربعة أرقام</small><strong id="receiptLast4" class="ltr">—</strong></div>
            <div class="receipt-item"><small>حالة العملية</small><strong class="text-success">مكتمل — محاكاة</strong></div>
          </div>
          <div class="notice info mt-16" id="receiptFees">—</div>
          <div class="inline-actions mt-20">
            <a class="btn btn-dark" href="workshop-dashboard.html">العودة إلى لوحة الورشة</a>
            <a class="btn btn-light" href="payment.html">صفحة الدفع</a>
            <button class="btn btn-light" id="printReceipt" type="button">طباعة الإيصال</button>
          </div>
        </div>
      </article>
    </div>
  </main>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/receipt.js"></script>
</body>
</html>
```

## `join.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="قدّم طلب انضمام ورشتك إلى شبكة وين أوديها عبر نموذج متعدد الخطوات.">
  <title>انضم كورشة شريكة — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="join">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <section class="page-banner">
    <div class="container">
      <div>
        <h1>انضم إلى شبكة الورش الشريكة</h1>
        <p>إحالات مناسبة لتخصصك، تقييمات موثقة، وتجربة تشغيل واضحة دون عرض العميل على عدة ورش في الوقت نفسه.</p>
      </div>
      <div class="page-banner-icon" aria-hidden="true">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="9"/></svg>
      </div>
    </div>
  </section>

  <main class="page">
    <div class="container">
      <section class="section-head center">
        <div class="kicker">الشراكة انتقائية وليست دليلًا مفتوحًا</div>
        <h2>ماذا تحصل عليه الورشة؟</h2>
        <p>نرسل إحالات تتوافق مع التخصص ونوع السيارات والخدمة والموقع، ونبني تقييمات مرتبطة بتجارب فعلية.</p>
      </section>

      <div class="cards-4 mb-12">
        <div class="card"><div class="card-icon">1</div><h3>إحالات مناسبة</h3><p>طلبات لها احتياج فعلي يناسب تخصص الورشة.</p></div>
        <div class="card"><div class="card-icon">2</div><h3>ورشة واحدة</h3><p>لا يعرض العميل نفسه على عدة ورش في اللحظة ذاتها.</p></div>
        <div class="card"><div class="card-icon">3</div><h3>تقييمات موثقة</h3><p>تقييمات مرتبطة بطلب وإحالة وتجربة فعلية.</p></div>
        <div class="card"><div class="card-icon">4</div><h3>تشغيل واضح</h3><p>متابعة الإحالات والرسوم والرصيد وفق الاتفاقية.</p></div>
      </div>

      <section class="form-card mt-20" id="joinWizard">
        <div class="dashboard-head">
          <div><h2 class="mt-0">طلب انضمام ورشة</h2><p>أكمل البيانات على مراحل. تحفظ المسودة محليًا في هذا المتصفح.</p></div>
          <a class="btn btn-light btn-sm" href="join-status.html">متابعة طلب سابق</a>
        </div>

        <div class="stepper" id="joinStepper">
          <div class="stepper-item active" data-stepper="1"><span class="stepper-circle">1</span><span>المنشأة</span></div>
          <div class="stepper-item" data-stepper="2"><span class="stepper-circle">2</span><span>الموقع والتواصل</span></div>
          <div class="stepper-item" data-stepper="3"><span class="stepper-circle">3</span><span>التخصصات</span></div>
          <div class="stepper-item" data-stepper="4"><span class="stepper-circle">4</span><span>الوثائق والتشغيل</span></div>
          <div class="stepper-item" data-stepper="5"><span class="stepper-circle">5</span><span>المراجعة</span></div>
        </div>

        <form id="joinForm">
          <section class="flow-screen active" data-join-step="1">
            <div class="flow-title"><div class="step">1 من 5</div><h2>بيانات المنشأة</h2><p>بيانات تعريفية أساسية عن الورشة وصاحب الطلب.</p></div>
            <div class="form-grid">
              <div class="field" data-field="workshopName"><label for="joinWorkshopName">اسم الورشة</label><input id="joinWorkshopName" maxlength="80" placeholder="مثال: مركز نبض المحرك"><div class="error">اكتب اسم الورشة.</div></div>
              <div class="field" data-field="ownerName"><label for="joinOwnerName">اسم المالك أو المسؤول</label><input id="joinOwnerName" maxlength="60" placeholder="الاسم الكامل"><div class="error">اكتب اسم المسؤول.</div></div>
              <div class="field" data-field="commercialNo"><label for="commercialNo">رقم السجل التجاري</label><input id="commercialNo" inputmode="numeric" maxlength="10" dir="ltr" placeholder="10 أرقام"><div class="error">أدخل رقمًا من 10 أرقام.</div></div>
              <div class="field"><label for="taxNo">الرقم الضريبي — اختياري</label><input id="taxNo" inputmode="numeric" maxlength="15" dir="ltr" placeholder="15 رقمًا إن وجد"></div>
              <div class="field full"><label for="workshopDescription">نبذة قصيرة عن الورشة</label><textarea id="workshopDescription" maxlength="300" placeholder="سنوات الخبرة وطبيعة العمل والخدمات الرئيسية"></textarea></div>
            </div>
            <div class="form-actions"><a class="btn btn-light" href="index.html">إلغاء</a><button class="btn btn-primary join-next" data-next-step="2" type="button">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="2">
            <div class="flow-title"><div class="step">2 من 5</div><h2>الموقع والتواصل</h2><p>بيانات وصول العميل والتواصل المباشر عبر واتساب.</p></div>
            <div class="form-grid">
              <div class="field" data-field="joinCity"><label for="joinCity">المدينة أو المحافظة</label><select id="joinCity"></select><div class="error">اختر المدينة.</div></div>
              <div class="field" data-field="district"><label for="joinDistrict">الحي</label><input id="joinDistrict" maxlength="60" placeholder="مثال: حي الريان"><div class="error">اكتب اسم الحي.</div></div>
              <div class="field full" data-field="address"><label for="joinAddress">العنوان المختصر أو وصف الموقع</label><input id="joinAddress" maxlength="140" placeholder="الشارع، أقرب معلم، أو رابط موقع تجريبي"><div class="error">اكتب وصف الموقع.</div></div>
              <div class="field" data-field="joinMobile"><label for="joinMobile">رقم التواصل</label><input id="joinMobile" type="tel" inputmode="numeric" maxlength="10" dir="ltr" placeholder="05XXXXXXXX"><div class="error">أدخل رقم جوال صحيحًا.</div></div>
              <div class="field" data-field="joinWhatsapp"><label for="joinWhatsapp">رقم واتساب</label><input id="joinWhatsapp" type="tel" inputmode="numeric" maxlength="10" dir="ltr" placeholder="05XXXXXXXX"><div class="error">أدخل رقم واتساب صحيحًا.</div></div>
              <div class="field"><label for="joinEmail">البريد الإلكتروني — اختياري</label><input id="joinEmail" type="email" dir="ltr" placeholder="name@example.com"></div>
              <div class="field"><label for="mapsLink">رابط الموقع — اختياري</label><input id="mapsLink" type="url" dir="ltr" placeholder="https://..."></div>
            </div>
            <div class="form-actions"><button class="btn btn-light join-back" data-prev-step="1" type="button">السابق</button><button class="btn btn-primary join-next" data-next-step="3" type="button">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="3">
            <div class="flow-title"><div class="step">3 من 5</div><h2>التخصصات والسيارات والخدمات</h2><p>اختر بدقة لأن المطابقة تعتمد على هذه البيانات.</p></div>
            <div class="field" data-field="mainSpecialty">
              <label for="mainSpecialty">التخصص الرئيسي</label>
              <select id="mainSpecialty">
                <option value="">اختر التخصص</option>
                <option>ميكانيكا وكهرباء محرك</option>
                <option>تكييف وكهرباء سيارات</option>
                <option>عفشة وتعليق وتوجيه</option>
                <option>فرامل وإطارات</option>
                <option>صيانة دورية وخدمات سريعة</option>
                <option>فحص وتشخيص عام</option>
                <option>سمكرة ودهان</option>
              </select>
              <div class="error">اختر التخصص الرئيسي.</div>
            </div>

            <div class="field mt-16" data-field="subSpecialties">
              <span class="field-label">التخصصات الفرعية</span>
              <div class="check-grid" id="subSpecialtiesGrid"></div>
              <div class="error">اختر تخصصًا فرعيًا واحدًا على الأقل.</div>
            </div>

            <div class="field mt-16" data-field="carMakes">
              <span class="field-label">أنواع السيارات التي تخدمها</span>
              <div class="check-grid" id="carMakesGrid"></div>
              <div class="error">اختر نوع سيارة واحدًا على الأقل.</div>
            </div>

            <div class="field mt-16" data-field="services">
              <span class="field-label">الخدمات الرئيسية</span>
              <div class="check-grid" id="servicesGrid"></div>
              <div class="error">اختر خدمة واحدة على الأقل.</div>
            </div>
            <div class="form-actions"><button class="btn btn-light join-back" data-prev-step="2" type="button">السابق</button><button class="btn btn-primary join-next" data-next-step="4" type="button">التالي</button></div>
          </section>

          <section class="flow-screen" data-join-step="4">
            <div class="flow-title"><div class="step">4 من 5</div><h2>الوثائق والتشغيل</h2><p>في هذا النموذج تحفظ أسماء الملفات فقط ولا يتم رفعها إلى خادم.</p></div>
            <div class="form-grid">
              <div class="field"><label for="commercialFile">صورة السجل التجاري</label><div class="upload-box"><strong>اختر ملفًا تجريبيًا</strong><span id="commercialFileName">لم يتم اختيار ملف</span><input id="commercialFile" type="file" accept=".pdf,.jpg,.jpeg,.png"></div></div>
              <div class="field"><label for="licenseFile">رخصة البلدية أو الترخيص</label><div class="upload-box"><strong>اختر ملفًا تجريبيًا</strong><span id="licenseFileName">لم يتم اختيار ملف</span><input id="licenseFile" type="file" accept=".pdf,.jpg,.jpeg,.png"></div></div>
              <div class="field"><label for="openingTime">بداية ساعات العمل</label><input id="openingTime" type="time" value="08:00"></div>
              <div class="field"><label for="closingTime">نهاية ساعات العمل</label><input id="closingTime" type="time" value="22:00"></div>
              <div class="field"><label for="availability">التوفر المعتاد</label><select id="availability"><option>متوفر غالبًا</option><option>بحسب الموعد</option><option>فترات محددة</option></select></div>
              <div class="field"><label for="dailyCapacity">القدرة اليومية التقريبية</label><select id="dailyCapacity"><option>أقل من 5 سيارات</option><option>من 5 إلى 10 سيارات</option><option>من 11 إلى 20 سيارة</option><option>أكثر من 20 سيارة</option></select></div>
            </div>
            <div class="notice info mt-16">لا يشترط في النسخة الأولى تكامل مع نظام الورشة أو رفع فاتورة لكل إحالة.</div>
            <div class="form-actions"><button class="btn btn-light join-back" data-prev-step="3" type="button">السابق</button><button class="btn btn-primary join-next" data-next-step="5" type="button">مراجعة الطلب</button></div>
          </section>

          <section class="flow-screen" data-join-step="5">
            <div class="flow-title"><div class="step">5 من 5</div><h2>مراجعة واتفاقية الشراكة</h2><p>راجع البيانات ثم وافق على المبادئ التشغيلية قبل الإرسال.</p></div>
            <div class="review-grid" id="joinReview"></div>
            <div class="form-grid one mt-16" data-field="agreements">
              <label class="check-card"><input id="agreePartnership" type="checkbox">أوافق على شروط الشراكة وتقديم معلومات صحيحة.</label>
              <label class="check-card"><input id="agreeReferrals" type="checkbox">أوافق على آلية تسجيل الإحالات ومتابعة نتائجها.</label>
              <label class="check-card"><input id="agreeFees" type="checkbox">أوافق على نموذج الرسوم الثابتة وفق الاتفاقية والحدث المستحق المحدد.</label>
              <label class="check-card"><input id="agreeTrust" type="checkbox">أوافق على سياسة الثقة والمتابعة والتقييمات الموثقة.</label>
              <div class="error">يجب الموافقة على جميع البنود.</div>
            </div>
            <div class="notice warning mt-16">لا تحدد هذه الصفحة قيمة تجارية معتمدة للرسوم. يتم اعتماد القيمة والحدث المستحق في اتفاقية الشراكة النهائية.</div>
            <div class="form-actions"><button class="btn btn-light join-back" data-prev-step="4" type="button">السابق</button><button class="btn btn-success" id="submitJoinApplication" type="submit">إرسال طلب الانضمام</button></div>
          </section>
        </form>
      </section>

      <section class="receipt hidden mt-20" id="joinSuccess">
        <div class="receipt-head">
          <div class="receipt-check">✓</div>
          <h1>تم إرسال طلب الانضمام</h1>
          <p>تم حفظ الطلب محليًا وإسناد رقم متابعة تجريبي.</p>
        </div>
        <div class="receipt-body">
          <div class="receipt-grid">
            <div class="receipt-item"><small>رقم طلب الانضمام</small><strong class="ltr" id="joinApplicationId">—</strong></div>
            <div class="receipt-item"><small>الحالة</small><strong class="text-success">قيد المراجعة</strong></div>
            <div class="receipt-item"><small>اسم الورشة</small><strong id="joinSuccessName">—</strong></div>
            <div class="receipt-item"><small>رقم التواصل</small><strong class="ltr" id="joinSuccessPhone">—</strong></div>
          </div>
          <div class="notice info mt-16">في التشغيل الفعلي تتم مراجعة البيانات والوثائق والتخصصات قبل قبول الورشة في الشبكة.</div>
          <div class="inline-actions mt-20">
            <a class="btn btn-dark" id="joinStatusLink" href="join-status.html">متابعة حالة الطلب</a>
            <a class="btn btn-light" href="index.html">العودة للرئيسية</a>
          </div>
        </div>
      </section>
    </div>
  </main>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/join.js"></script>
</body>
</html>
```

## `join-status.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="تابع حالة طلب انضمام ورشتك إلى شبكة وين أوديها.">
  <title>حالة انضمام الورشة — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="join">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل الرحلات والحفظ المحلي.</div></noscript>
  <div data-site-header></div>

  <section class="page-banner">
    <div class="container">
      <div><h1>متابعة طلب انضمام الورشة</h1><p>أدخل رقم الطلب ورقم التواصل لمراجعة حالة الانضمام.</p></div>
      <div class="page-banner-icon" aria-hidden="true"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
    </div>
  </section>

  <main class="page narrow">
    <div class="container">
      <form class="form-card" id="joinStatusForm" novalidate>
        <div class="flow-title"><div class="step">استرجاع طلب الانضمام</div><h2>بيانات المتابعة</h2><p>رقم طلب الانضمام يبدأ عادة بـ JOIN.</p></div>
        <div class="form-grid">
          <div class="field" data-field="statusId"><label for="statusId">رقم طلب الانضمام</label><input id="statusId" dir="ltr" placeholder="JOIN-12345"><div class="error">أدخل رقم الطلب.</div></div>
          <div class="field" data-field="statusPhone"><label for="statusPhone">رقم التواصل</label><input id="statusPhone" type="tel" inputmode="numeric" maxlength="10" dir="ltr" placeholder="05XXXXXXXX"><div class="error">أدخل رقم التواصل الصحيح.</div></div>
        </div>
        <div class="inline-actions mt-16">
          <button class="btn btn-dark" id="searchJoinStatus" type="submit">عرض الحالة</button>
          <a class="btn btn-light" href="join.html">تقديم طلب جديد</a>
        </div>
      </form>

      <section class="hidden mt-20" id="joinStatusResult">
        <div class="dashboard-head">
          <div><h1 id="statusWorkshopName">—</h1><p id="statusMeta">—</p></div>
          <span class="badge warning" id="statusBadge">قيد المراجعة</span>
        </div>
        <div class="cards-3" style="grid-template-columns:1fr 1fr">
          <div class="card">
            <h3>مراحل الطلب</h3>
            <div class="timeline mt-16" id="joinTimeline"></div>
          </div>
          <div class="card">
            <h3>ملخص البيانات</h3>
            <div class="info-list mt-16" id="joinStatusSummary"></div>
          </div>
        </div>
        <div class="notice info mt-16" id="joinReviewNote">—</div>
      </section>
    </div>
  </main>

  <div data-site-footer></div>
  <script src="assets/common.js"></script>
  <script src="assets/join-status.js"></script>
</body>
</html>
```

## `404.html`

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0b1729">
  <meta name="description" content="الصفحة المطلوبة غير موجودة في منصة وين أوديها.">
  <title>الصفحة غير موجودة — وين أوديها؟</title>
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body data-page="404">
  <noscript><div class="noscript-banner">يحتاج هذا النموذج إلى تفعيل JavaScript لتشغيل التنقل الكامل.</div></noscript>
  <div data-site-header></div>
  <main class="page" id="main-content">
    <div class="container">
      <section class="receipt">
        <div class="receipt-head"><div class="receipt-check">؟</div><h1>الصفحة غير موجودة</h1><p>الرابط غير صحيح أو تم نقل الصفحة.</p></div>
        <div class="receipt-body text-center"><div class="inline-actions" style="justify-content:center"><a class="btn btn-dark" href="index.html">العودة للرئيسية</a><a class="btn btn-primary" href="customer.html?fresh=1">ابدأ طلبك</a></div></div>
      </section>
    </div>
  </main>
  <div data-site-footer></div>
  <script src="assets/common.js"></script>
</body>
</html>
```

## `assets/styles.css`

```css
:root {
  --navy: #0b1729;
  --navy-2: #172844;
  --gold: #dba94c;
  --gold-2: #f2ca7b;
  --gold-soft: #fff7e7;
  --ink: #152033;
  --muted: #69758a;
  --line: #dde4ec;
  --bg: #f3f6f9;
  --surface: #ffffff;
  --success: #10865a;
  --success-soft: #eaf8f2;
  --warning: #a66a13;
  --warning-soft: #fff6e4;
  --danger: #b33d46;
  --danger-soft: #fff0f1;
  --info: #2b6cb0;
  --info-soft: #edf5ff;
  --shadow: 0 18px 50px rgba(11, 23, 41, .11);
  --shadow-soft: 0 10px 30px rgba(11, 23, 41, .07);
  --radius-xl: 28px;
  --radius-lg: 21px;
  --radius-md: 15px;
  --radius-sm: 11px;
  --max: 1180px;
  --ease: cubic-bezier(.22, .8, .28, 1);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: Tahoma, "Segoe UI", Arial, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at 95% 0, rgba(219, 169, 76, .12), transparent 27%),
    radial-gradient(circle at 0 100%, rgba(44, 83, 127, .09), transparent 30%),
    var(--bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body.no-scroll { overflow: hidden; }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
button { -webkit-tap-highlight-color: transparent; }
img, svg { max-width: 100%; }

.container { width: min(calc(100% - 32px), var(--max)); margin-inline: auto; }
.page { min-height: calc(100vh - 146px); padding: 32px 0 60px; }
.page.narrow .container { width: min(calc(100% - 32px), 820px); }

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(221, 228, 236, .86);
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(16px);
}
.header-inner {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.logo { display: inline-flex; align-items: center; gap: 10px; font-weight: 900; letter-spacing: -.4px; }
.logo-mark {
  width: 39px;
  height: 39px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--gold-2), var(--gold));
  color: var(--navy);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.45), 0 8px 18px rgba(166,106,19,.18);
}
.logo-mark svg { width: 24px; height: 24px; }
.logo small { display: block; color: var(--muted); font-size: 10px; font-weight: 700; margin-top: 2px; }
.desktop-nav { display: flex; align-items: center; gap: 6px; }
.desktop-nav a {
  padding: 10px 12px;
  border-radius: 11px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 900;
}
.desktop-nav a:hover, .desktop-nav a.active { background: var(--gold-soft); color: #7a500e; }
.header-actions { display: flex; align-items: center; gap: 8px; }
.mobile-menu-btn { display: none; }

.site-footer { background: var(--navy); color: #fff; padding: 30px 0; }
.footer-grid { display: grid; grid-template-columns: 1.25fr .75fr .75fr; gap: 28px; }
.footer-title { font-weight: 900; margin-bottom: 10px; }
.footer-text, .footer-links a { color: #aab6c7; font-size: 13px; line-height: 1.9; }
.footer-links { display: grid; gap: 5px; }
.footer-bottom { margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.1); color: #7f8da1; font-size: 11px; }

.hero {
  position: relative;
  overflow: hidden;
  padding: 66px 0 52px;
  background: var(--navy);
  color: #fff;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: .13;
  background-image:
    linear-gradient(rgba(255,255,255,.17) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.17) 1px, transparent 1px);
  background-size: 42px 42px;
}
.hero::after {
  content: "";
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  top: -230px;
  left: -120px;
  background: radial-gradient(circle, rgba(219,169,76,.32), transparent 68%);
}
.hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.1fr .9fr; align-items: center; gap: 52px; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 8px 11px; border-radius: 999px; color: var(--gold-2); border: 1px solid rgba(242,202,123,.34); background: rgba(255,255,255,.05); font-size: 12px; font-weight: 900; }
.eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 5px rgba(219,169,76,.13); }
.hero h1 { font-size: clamp(38px, 5.6vw, 67px); line-height: 1.12; letter-spacing: -2px; margin: 18px 0 16px; }
.hero h1 span { color: var(--gold-2); }
.hero p { color: #b6c0cf; line-height: 1.95; font-size: 17px; margin: 0 0 26px; max-width: 690px; }
.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-card {
  position: relative;
  min-height: 410px;
  border-radius: 34px;
  padding: 25px;
  background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.045));
  border: 1px solid rgba(255,255,255,.16);
  box-shadow: 0 30px 80px rgba(0,0,0,.22);
  backdrop-filter: blur(10px);
}
.hero-card::before { content: ""; position: absolute; inset: 22px; border-radius: 26px; border: 1px dashed rgba(242,202,123,.34); }
.hero-phone { position: relative; z-index: 1; width: 245px; min-height: 350px; margin-inline: auto; border-radius: 29px; background: #f7f9fb; color: var(--ink); padding: 18px; box-shadow: 0 18px 50px rgba(0,0,0,.28); }
.phone-notch { width: 75px; height: 7px; border-radius: 999px; background: #d8dee7; margin: 0 auto 22px; }
.mini-card { border: 1px solid var(--line); border-radius: 15px; padding: 13px; margin-bottom: 10px; background: #fff; }
.mini-card strong { display: block; font-size: 13px; margin-bottom: 5px; }
.mini-card span { color: var(--muted); font-size: 11px; line-height: 1.6; }
.mini-pulse { height: 6px; border-radius: 999px; background: linear-gradient(90deg, var(--gold), #f4d392); margin-top: 10px; }

.section { padding: 62px 0; }
.section.alt { background: rgba(255,255,255,.55); border-block: 1px solid rgba(221,228,236,.8); }
.section-head { max-width: 760px; margin-bottom: 28px; }
.section-head.center { text-align: center; margin-inline: auto; }
.section-head .kicker { color: #936113; font-size: 12px; font-weight: 900; margin-bottom: 8px; }
.section-head h2 { margin: 0 0 10px; font-size: clamp(28px, 4vw, 42px); letter-spacing: -1px; line-height: 1.28; }
.section-head p { margin: 0; color: var(--muted); line-height: 1.9; }

.cards-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cards-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: 0 9px 28px rgba(11,23,41,.045);
}
.card.hover { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
.card.hover:hover { transform: translateY(-3px); box-shadow: var(--shadow-soft); border-color: #cfd7e1; }
.card-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; background: var(--gold-soft); color: #845511; margin-bottom: 14px; }
.card-icon.navy { background: #edf2f8; color: var(--navy); }
.card-icon.green { background: var(--success-soft); color: var(--success); }
.card h3 { margin: 0 0 8px; font-size: 19px; }
.card p { margin: 0; color: var(--muted); line-height: 1.85; font-size: 13px; }
.card .card-link { display: inline-flex; align-items: center; gap: 5px; margin-top: 16px; color: #835511; font-weight: 900; font-size: 13px; }

.btn {
  min-height: 50px;
  border: 0;
  border-radius: 14px;
  padding: 11px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 900;
  transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
.btn-primary { color: var(--navy); background: linear-gradient(145deg, var(--gold-2), var(--gold)); box-shadow: 0 12px 26px rgba(166,106,19,.18); }
.btn-dark { color: #fff; background: var(--navy); box-shadow: 0 12px 26px rgba(11,23,41,.18); }
.btn-light { color: var(--ink); background: #fff; border: 1px solid var(--line); }
.btn-success { color: #fff; background: var(--success); }
.btn-danger { color: var(--danger); background: var(--danger-soft); border: 1px solid #f1cdd1; }
.btn-block { width: 100%; }
.btn-sm { min-height: 39px; padding: 8px 12px; border-radius: 11px; font-size: 12px; }
.btn-link { border: 0; background: transparent; color: var(--muted); font-weight: 900; cursor: pointer; padding: 8px; }

.badge { display: inline-flex; align-items: center; gap: 5px; padding: 7px 10px; border-radius: 999px; background: #eef2f6; color: var(--ink); font-size: 11px; font-weight: 900; white-space: nowrap; }
.badge.success { background: var(--success-soft); color: var(--success); }
.badge.warning { background: var(--warning-soft); color: var(--warning); }
.badge.danger { background: var(--danger-soft); color: var(--danger); }
.badge.info { background: var(--info-soft); color: var(--info); }

.page-banner { padding: 36px 0; background: linear-gradient(135deg, var(--navy), var(--navy-2)); color: #fff; }
.page-banner .container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.page-banner h1 { margin: 0 0 8px; font-size: clamp(28px, 4vw, 43px); }
.page-banner p { margin: 0; color: #b6c0cf; line-height: 1.8; }
.page-banner-icon { width: 82px; height: 82px; border-radius: 25px; display: grid; place-items: center; background: rgba(255,255,255,.08); color: var(--gold-2); border: 1px solid rgba(255,255,255,.13); flex: 0 0 auto; }

.portal-grid { display: grid; grid-template-columns: 230px minmax(0,1fr); gap: 20px; align-items: start; }
.sidebar { position: sticky; top: 90px; background: var(--navy); color: #fff; border-radius: 22px; padding: 14px; box-shadow: var(--shadow-soft); }
.sidebar-title { padding: 12px; border-bottom: 1px solid rgba(255,255,255,.1); margin-bottom: 10px; }
.sidebar-title strong { display: block; }
.sidebar-title small { color: #93a1b4; }
.sidebar-nav { display: grid; gap: 5px; }
.sidebar-nav button, .sidebar-nav a { width: 100%; border: 0; background: transparent; color: #b6c1d0; text-align: right; padding: 12px; border-radius: 12px; cursor: pointer; font-weight: 900; font-size: 13px; }
.sidebar-nav button:hover, .sidebar-nav button.active, .sidebar-nav a:hover, .sidebar-nav a.active { color: #fff; background: rgba(255,255,255,.09); }
.sidebar-nav .danger-link { color: #f2abb0; }
.portal-main { min-width: 0; }
.portal-panel { display: none; animation: fadeIn .3s var(--ease) both; }
.portal-panel.active { display: block; }
@keyframes fadeIn { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:none; } }

.dashboard-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 20px; }
.dashboard-head h1 { margin: 0 0 7px; font-size: 30px; }
.dashboard-head p { margin: 0; color: var(--muted); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; margin-bottom: 18px; }
.stat-card { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 17px; }
.stat-label { color: var(--muted); font-size: 11px; font-weight: 900; margin-bottom: 9px; }
.stat-value { font-size: 27px; font-weight: 900; letter-spacing: -.7px; }
.stat-meta { margin-top: 7px; color: var(--muted); font-size: 11px; }
.stat-card.highlight { background: linear-gradient(145deg, var(--navy), var(--navy-2)); color: #fff; border-color: transparent; }
.stat-card.highlight .stat-label, .stat-card.highlight .stat-meta { color: #aab5c5; }

.table-wrap { width: 100%; overflow-x: auto; background: #fff; border: 1px solid var(--line); border-radius: 18px; }
table { width: 100%; border-collapse: collapse; min-width: 720px; }
th, td { padding: 14px; text-align: right; border-bottom: 1px solid #edf0f3; font-size: 12px; vertical-align: middle; }
th { color: var(--muted); background: #fafbfd; font-weight: 900; }
tr:last-child td { border-bottom: 0; }
.table-title { font-weight: 900; display: block; margin-bottom: 3px; }
.table-sub { color: var(--muted); font-size: 10px; }

.form-card { background: #fff; border: 1px solid var(--line); border-radius: var(--radius-lg); padding: 21px; box-shadow: 0 9px 28px rgba(11,23,41,.04); }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 15px; }
.form-grid.one { grid-template-columns: 1fr; }
.form-grid.three { grid-template-columns: repeat(3,minmax(0,1fr)); }
.field { display: grid; gap: 8px; }
.field.full { grid-column: 1 / -1; }
.field label, .field-label { color: var(--ink); font-size: 12px; font-weight: 900; }
.field .hint { color: var(--muted); font-size: 10px; line-height: 1.6; }
.field .error { color: var(--danger); font-size: 10px; font-weight: 900; display: none; }
.field.invalid .error { display: block; }
.field.invalid input, .field.invalid select, .field.invalid textarea { border-color: #da7b82; background: #fffafb; }
input, select, textarea {
  width: 100%;
  min-height: 49px;
  border: 1px solid #d5dde6;
  border-radius: 13px;
  background: #fff;
  color: var(--ink);
  padding: 12px 13px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease;
}
textarea { min-height: 125px; resize: vertical; line-height: 1.8; }
input:focus, select:focus, textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(219,169,76,.14); }
input[type="checkbox"], input[type="radio"] { width: 18px; min-height: 18px; accent-color: #9b6816; }
.form-actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 20px; }
.inline-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.choice-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
.choice-card { position: relative; min-height: 175px; padding: 21px; border-radius: 20px; border: 1px solid var(--line); background: #fff; text-align: right; cursor: pointer; transition: .2s ease; }
.choice-card:hover, .choice-card.selected { border-color: var(--gold); background: #fffaf0; box-shadow: 0 10px 26px rgba(166,106,19,.09); transform: translateY(-2px); }
.choice-card .choice-icon { width: 48px; height: 48px; border-radius: 15px; display: grid; place-items: center; background: var(--gold-soft); color: #885913; margin-bottom: 16px; }
.choice-card h3 { margin: 0 0 7px; font-size: 19px; }
.choice-card p { margin: 0; color: var(--muted); line-height: 1.75; font-size: 12px; }
.choice-check { position: absolute; top: 14px; left: 14px; width: 24px; height: 24px; border: 2px solid #ccd5df; border-radius: 50%; display: grid; place-items: center; color: transparent; }
.choice-card.selected .choice-check { background: var(--success); border-color: var(--success); color: #fff; }

.service-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 11px; }
.service-card { border: 1px solid var(--line); border-radius: 16px; background: #fff; padding: 15px 10px; text-align: center; cursor: pointer; font-weight: 900; color: var(--ink); min-height: 105px; display: grid; place-items: center; gap: 8px; transition: .18s ease; }
.service-card:hover, .service-card.selected { border-color: var(--gold); background: var(--gold-soft); color: #79500f; transform: translateY(-2px); }
.service-card svg { width: 26px; height: 26px; }

.progress-shell { margin-bottom: 18px; }
.progress-meta { display: flex; justify-content: space-between; color: var(--muted); font-size: 10px; font-weight: 900; margin-bottom: 7px; }
.progress-track { height: 6px; background: #e5eaf0; border-radius: 999px; overflow: hidden; }
.progress-bar { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--gold), var(--gold-2)); transition: width .35s var(--ease); }
.flow-screen { display: none; animation: fadeIn .32s var(--ease) both; }
.flow-screen.active { display: block; }
.flow-title { margin-bottom: 18px; }
.flow-title .step { color: #976316; font-size: 11px; font-weight: 900; margin-bottom: 6px; }
.flow-title h1, .flow-title h2 { margin: 0 0 7px; font-size: clamp(25px,4vw,34px); }
.flow-title p { margin: 0; color: var(--muted); line-height: 1.8; font-size: 13px; }

.ai-loader { padding: 52px 20px; text-align: center; }
.ai-core { width: 96px; height: 96px; margin: 0 auto 23px; border-radius: 29px; display: grid; place-items: center; background: linear-gradient(145deg,var(--gold-2),var(--gold)); color: var(--navy); position: relative; box-shadow: 0 20px 48px rgba(166,106,19,.19); }
.ai-core::before, .ai-core::after { content:""; position:absolute; inset:-12px; border:1px solid rgba(219,169,76,.4); border-radius:36px; animation:pulse 1.8s ease-out infinite; }
.ai-core::after { animation-delay:.9s; }
@keyframes pulse { 0%{transform:scale(.82);opacity:0} 35%{opacity:1} 100%{transform:scale(1.25);opacity:0} }
.ai-core svg { width: 43px; }
.loader-steps { width:min(100%,390px); margin:24px auto 0; display:grid; gap:10px; text-align:right; }
.loader-step { display:flex; align-items:center; gap:9px; color:#9aa3af; font-size:12px; font-weight:900; }
.loader-step .dot { width:20px; height:20px; border:2px solid #d7dde5; border-radius:50%; display:grid; place-items:center; }
.loader-step.active { color:var(--ink); }
.loader-step.done { color:var(--success); }
.loader-step.active .dot { border-color:var(--gold); box-shadow:0 0 0 4px rgba(219,169,76,.12); }
.loader-step.done .dot { border-color:var(--success); background:var(--success); color:#fff; }

.answer-grid { display:grid; gap:9px; margin-top:18px; }
.answer-btn { min-height:54px; border:1px solid var(--line); border-radius:14px; background:#fff; color:var(--ink); text-align:right; padding:12px 14px; cursor:pointer; font-weight:900; }
.answer-btn.selected { border-color:var(--gold); background:var(--gold-soft); color:#744b0c; }

.info-list { display:grid; gap:0; }
.info-row { padding:14px 0; border-bottom:1px solid #edf0f4; }
.info-row:last-child { border-bottom:0; }
.info-label { color:var(--muted); font-size:10px; font-weight:900; margin-bottom:5px; }
.info-value { font-weight:900; line-height:1.75; font-size:13px; }
.notice { border-radius:15px; padding:13px 14px; font-size:11px; font-weight:800; line-height:1.8; }
.notice.warning { color:#775019; background:var(--warning-soft); border:1px solid #eed9b4; }
.notice.info { color:#285b8d; background:var(--info-soft); border:1px solid #cfe2f6; }
.notice.success { color:#087148; background:var(--success-soft); border:1px solid #cbe8da; }

.workshop-card { overflow:hidden; background:#fff; border:1px solid var(--line); border-radius:24px; box-shadow:var(--shadow-soft); }
.workshop-cover { min-height:145px; padding:20px; display:flex; align-items:flex-end; color:#fff; background: radial-gradient(circle at 15% 10%, rgba(219,169,76,.55), transparent 27%), linear-gradient(135deg,#344861,var(--navy) 62%); }
.workshop-heading { display:flex; align-items:center; gap:12px; }
.workshop-logo { width:55px; height:55px; border-radius:17px; display:grid; place-items:center; background:linear-gradient(145deg,var(--gold-2),var(--gold)); color:var(--navy); }
.workshop-heading h2 { margin:0 0 4px; font-size:24px; }
.workshop-heading p { margin:0; color:#b9c4d3; font-size:11px; }
.workshop-body { padding:20px; }
.metric-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
.metric { border:1px solid var(--line); border-radius:14px; padding:12px; }
.metric small { display:block; color:var(--muted); font-size:9px; font-weight:900; margin-bottom:5px; }
.metric strong { font-size:13px; }
.stars { color:#c7881f; }
.request-strip { display:flex; align-items:center; justify-content:space-between; gap:10px; border:1px dashed #ccd5df; border-radius:13px; padding:12px 13px; margin-bottom:14px; color:var(--muted); font-size:11px; font-weight:900; }
.request-strip strong { color:var(--ink); direction:ltr; font-size:14px; }
.why-box { margin:14px 0; border-radius:14px; background:#f5f7fa; padding:13px; }
.why-box strong { display:block; margin-bottom:5px; font-size:12px; }
.why-box p { margin:0; color:var(--muted); line-height:1.8; font-size:11px; }

.timeline { position:relative; display:grid; gap:15px; }
.timeline::before { content:""; position:absolute; top:16px; bottom:16px; right:15px; width:2px; background:#e0e6ed; }
.timeline-item { position:relative; padding-right:43px; }
.timeline-dot { position:absolute; right:5px; top:4px; width:22px; height:22px; border-radius:50%; background:#fff; border:3px solid #cbd4df; z-index:1; }
.timeline-item.done .timeline-dot { background:var(--success); border-color:var(--success); }
.timeline-item.current .timeline-dot { background:var(--gold); border-color:var(--gold); box-shadow:0 0 0 5px rgba(219,169,76,.13); }
.timeline-item h4 { margin:0 0 3px; font-size:13px; }
.timeline-item p { margin:0; color:var(--muted); font-size:10px; line-height:1.6; }

.rating-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:13px; }
.rating-field { border:1px solid var(--line); border-radius:14px; padding:13px; }
.rating-field label { display:block; font-size:11px; font-weight:900; margin-bottom:10px; }
.stars-input { display:flex; flex-direction:row-reverse; justify-content:flex-end; gap:3px; }
.stars-input input { position:absolute; opacity:0; pointer-events:none; }
.stars-input label { margin:0; font-size:28px; line-height:1; color:#d5dbe2; cursor:pointer; }
.stars-input input:checked ~ label, .stars-input label:hover, .stars-input label:hover ~ label { color:#d3982b; }

.login-shell { min-height:calc(100vh - 70px); display:grid; grid-template-columns:1fr 1fr; }
.login-side { padding:52px; display:flex; flex-direction:column; justify-content:center; background:var(--navy); color:#fff; position:relative; overflow:hidden; }
.login-side::before { content:""; position:absolute; inset:0; opacity:.12; background-image:linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px); background-size:42px 42px; }
.login-side > * { position:relative; z-index:1; }
.login-side h1 { font-size:clamp(35px,5vw,60px); line-height:1.2; margin:16px 0; }
.login-side h1 span { color:var(--gold-2); }
.login-side p { color:#b5c0cf; line-height:1.9; }
.login-form-wrap { display:grid; place-items:center; padding:32px; }
.login-card { width:min(100%,460px); }
.login-card h2 { margin:0 0 8px; font-size:29px; }
.login-card > p { margin:0 0 22px; color:var(--muted); line-height:1.8; }
.demo-credentials { margin-top:14px; border:1px solid #d3e3f4; background:#f0f6fd; color:#285b8d; border-radius:13px; padding:12px; font-size:11px; line-height:1.8; }

.stepper { display:flex; align-items:center; justify-content:space-between; gap:6px; margin-bottom:22px; }
.stepper-item { flex:1; text-align:center; position:relative; color:var(--muted); font-size:9px; font-weight:900; }
.stepper-item:not(:last-child)::after { content:""; position:absolute; height:2px; background:#dde4ec; top:15px; left:-50%; right:50%; z-index:0; }
.stepper-circle { position:relative; z-index:1; width:31px; height:31px; margin:0 auto 6px; border-radius:50%; display:grid; place-items:center; background:#e6ebf0; color:#7b8797; border:3px solid var(--bg); }
.stepper-item.active, .stepper-item.done { color:var(--ink); }
.stepper-item.active .stepper-circle { background:var(--gold); color:var(--navy); }
.stepper-item.done .stepper-circle { background:var(--success); color:#fff; }
.stepper-item.done:not(:last-child)::after { background:var(--success); }

.check-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:9px; }
.check-card { min-height:48px; display:flex; align-items:center; gap:8px; border:1px solid var(--line); border-radius:12px; padding:10px; cursor:pointer; font-size:11px; font-weight:900; }
.check-card:has(input:checked) { border-color:var(--gold); background:var(--gold-soft); }
.upload-box { border:1px dashed #bfc9d5; border-radius:15px; padding:18px; text-align:center; background:#fafbfd; }
.upload-box strong { display:block; margin-bottom:5px; font-size:12px; }
.upload-box span { color:var(--muted); font-size:10px; }

.review-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
.review-block { border:1px solid var(--line); border-radius:14px; padding:14px; }
.review-block h4 { margin:0 0 10px; font-size:13px; }
.review-block dl { margin:0; display:grid; gap:8px; }
.review-block dl div { display:grid; grid-template-columns:110px 1fr; gap:8px; font-size:10px; }
.review-block dt { color:var(--muted); }
.review-block dd { margin:0; font-weight:900; }

.payment-layout { display:grid; grid-template-columns:1fr 350px; gap:18px; align-items:start; }
.payment-summary { position:sticky; top:90px; background:var(--navy); color:#fff; border-radius:21px; padding:20px; }
.payment-summary h3 { margin:0 0 14px; }
.payment-row { display:flex; justify-content:space-between; gap:10px; padding:11px 0; border-bottom:1px solid rgba(255,255,255,.09); color:#b6c1d0; font-size:11px; }
.payment-row strong { color:#fff; }
.payment-total { display:flex; justify-content:space-between; gap:10px; padding-top:17px; font-size:17px; font-weight:900; }
.card-preview { min-height:180px; border-radius:20px; padding:20px; margin-bottom:17px; background:linear-gradient(135deg,#2b415e,var(--navy)); color:#fff; box-shadow:0 18px 45px rgba(11,23,41,.2); }
.card-chip { width:40px; height:29px; border-radius:8px; background:linear-gradient(145deg,#f0ce83,#bd8630); margin-bottom:30px; }
.card-number { direction:ltr; text-align:left; letter-spacing:2px; font-size:20px; margin-bottom:21px; }
.card-meta { display:flex; justify-content:space-between; color:#b7c1cf; font-size:10px; }
.card-meta strong { display:block; color:#fff; margin-top:3px; }

.receipt { max-width:760px; margin:0 auto; background:#fff; border:1px solid var(--line); border-radius:24px; overflow:hidden; box-shadow:var(--shadow); }
.receipt-head { padding:28px; text-align:center; background:var(--success-soft); border-bottom:1px solid #cae7d8; }
.receipt-check { width:70px; height:70px; margin:0 auto 14px; border-radius:50%; display:grid; place-items:center; background:var(--success); color:#fff; font-size:35px; }
.receipt-head h1 { margin:0 0 7px; font-size:28px; }
.receipt-head p { margin:0; color:#31775a; }
.receipt-body { padding:24px; }
.receipt-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
.receipt-item { border:1px solid var(--line); border-radius:13px; padding:13px; }
.receipt-item small { display:block; color:var(--muted); font-size:9px; margin-bottom:5px; }
.receipt-item strong { font-size:13px; }

.modal-backdrop { position:fixed; inset:0; z-index:100; background:rgba(11,23,41,.56); backdrop-filter:blur(5px); opacity:0; pointer-events:none; transition:.2s ease; }
.modal-backdrop.show { opacity:1; pointer-events:auto; }
.modal { position:fixed; z-index:110; top:50%; left:50%; width:min(calc(100% - 28px),560px); max-height:86vh; overflow:auto; transform:translate(-50%,-46%) scale(.98); opacity:0; pointer-events:none; background:#fff; border-radius:22px; padding:20px; box-shadow:0 28px 80px rgba(11,23,41,.3); transition:.25s var(--ease); }
.modal.show { transform:translate(-50%,-50%) scale(1); opacity:1; pointer-events:auto; }
.modal-head { display:flex; align-items:start; justify-content:space-between; gap:12px; margin-bottom:14px; }
.modal-head h3 { margin:0 0 5px; }
.modal-head p { margin:0; color:var(--muted); font-size:11px; line-height:1.7; }
.modal-close { width:34px; height:34px; border:0; border-radius:10px; background:#eef2f5; cursor:pointer; color:var(--ink); }

.toast { position:fixed; z-index:130; left:50%; bottom:24px; transform:translate(-50%,20px); width:min(calc(100% - 32px),430px); border-radius:14px; background:var(--navy); color:#fff; padding:13px 15px; text-align:center; font-size:11px; font-weight:900; opacity:0; pointer-events:none; transition:.2s ease; box-shadow:0 16px 44px rgba(11,23,41,.25); }
.toast.show { opacity:1; transform:translate(-50%,0); }

.empty-state { padding:38px 18px; text-align:center; color:var(--muted); }
.empty-state-icon { width:60px; height:60px; margin:0 auto 13px; border-radius:18px; display:grid; place-items:center; background:#eef2f6; color:#667488; }
.empty-state h3 { color:var(--ink); margin:0 0 6px; }
.empty-state p { margin:0; font-size:11px; line-height:1.7; }

.hidden { display:none !important; }
.text-muted { color:var(--muted); }
.text-success { color:var(--success); }
.text-danger { color:var(--danger); }
.mt-0 { margin-top:0; }
.mt-8 { margin-top:8px; }
.mt-12 { margin-top:12px; }
.mt-16 { margin-top:16px; }
.mt-20 { margin-top:20px; }
.mb-0 { margin-bottom:0; }
.mb-12 { margin-bottom:12px; }
.text-center { text-align:center; }
.ltr { direction:ltr; display:inline-block; }

@media (max-width: 980px) {
  .desktop-nav { display:none; }
  .mobile-menu-btn { display:inline-flex; }
  .hero-grid { grid-template-columns:1fr; }
  .hero-card { display:none; }
  .cards-4 { grid-template-columns:repeat(2,1fr); }
  .portal-grid { grid-template-columns:1fr; }
  .sidebar { position:static; }
  .sidebar-nav { display:flex; overflow:auto; }
  .sidebar-nav button, .sidebar-nav a { flex:0 0 auto; width:auto; white-space:nowrap; }
  .stats-grid { grid-template-columns:repeat(2,1fr); }
  .metric-grid { grid-template-columns:repeat(2,1fr); }
  .payment-layout { grid-template-columns:1fr; }
  .payment-summary { position:static; }
  .login-shell { grid-template-columns:1fr; }
  .login-side { min-height:340px; padding:40px 28px; }
}

@media (max-width: 720px) {
  .container { width:min(calc(100% - 24px),var(--max)); }
  .header-inner { min-height:64px; }
  .header-actions .btn-light { display:none; }
  .page { padding-top:22px; }
  .page-banner { padding:28px 0; }
  .page-banner-icon { width:62px; height:62px; border-radius:20px; }
  .hero { padding:52px 0 42px; }
  .hero h1 { font-size:39px; }
  .hero p { font-size:14px; }
  .cards-3, .cards-4, .choice-grid, .service-grid, .form-grid, .form-grid.three, .rating-grid, .review-grid, .receipt-grid { grid-template-columns:1fr; }
  .service-grid { grid-template-columns:repeat(2,1fr); }
  .footer-grid { grid-template-columns:1fr; }
  .dashboard-head { flex-direction:column; }
  .stats-grid { grid-template-columns:1fr 1fr; }
  .stat-value { font-size:22px; }
  .form-actions { position:sticky; bottom:0; z-index:20; background:rgba(243,246,249,.94); backdrop-filter:blur(10px); margin-inline:-12px; padding:12px; border-top:1px solid var(--line); }
  .check-grid { grid-template-columns:repeat(2,1fr); }
  .metric-grid { grid-template-columns:repeat(2,1fr); }
  .login-form-wrap { padding:24px 14px 42px; }
  .login-side { min-height:300px; }
  .login-side h1 { font-size:38px; }
  .stepper-item span:last-child { display:none; }
  .review-block dl div { grid-template-columns:90px 1fr; }
}

/* تحسينات الوصول وتجربة الجوال */
:focus-visible {
  outline: 3px solid rgba(166, 106, 19, .72);
  outline-offset: 3px;
}
.skip-link {
  position: fixed;
  top: 8px;
  right: 12px;
  z-index: 200;
  padding: 10px 14px;
  border-radius: 10px;
  background: #fff;
  color: var(--navy);
  font-weight: 900;
  transform: translateY(-150%);
  transition: transform .18s ease;
  box-shadow: var(--shadow-soft);
}
.skip-link:focus { transform: translateY(0); }
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.mobile-menu-btn {
  width: 42px;
  height: 42px;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}
.mobile-menu-btn span { width: 19px; height: 2px; border-radius: 9px; background: var(--navy); transition: .18s ease; }
.mobile-menu-btn[aria-expanded="true"] span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.mobile-menu-btn[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.mobile-menu-btn[aria-expanded="true"] span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.mobile-nav { border-top: 1px solid var(--line); background: rgba(255,255,255,.98); }
.mobile-nav .container { display: grid; padding-block: 8px 14px; }
.mobile-nav a { padding: 12px 4px; border-bottom: 1px solid #eef1f4; color: var(--muted); font-weight: 900; }
.mobile-nav a:last-child { border-bottom: 0; }
.mobile-nav a.active { color: #80520d; }
.section-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
.section-row p, .section-row span { display: block; margin: 5px 0 0; color: var(--muted); font-size: 12px; line-height: 1.7; }
.two-column-grid { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 16px; }
.stat-value.compact { font-size: 18px; line-height: 1.45; }
.request-summary-card { border-inline-start: 4px solid var(--gold); }
.request-alternative { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px; border: 1px dashed #d6dde6; border-radius: 16px; background: #fafbfd; }
.request-alternative strong, .request-alternative span { display: block; }
.request-alternative span { margin-top: 4px; color: var(--muted); font-size: 11px; line-height: 1.7; }
.referral-history { display: grid; gap: 10px; }
.history-item { display: grid; grid-template-columns: 36px 1fr; gap: 12px; padding: 14px; border: 1px solid var(--line); border-radius: 16px; background: #fff; }
.history-item.current { border-color: #d7ad62; background: #fffaf0; }
.history-number { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 11px; background: #edf1f5; font-weight: 900; }
.history-item.current .history-number { background: var(--gold); color: var(--navy); }
.history-content { min-width: 0; }
.history-content strong { display: block; }
.history-content .section-row > div > span { margin-top: 3px; }
.history-meta { display: flex; flex-wrap: wrap; gap: 6px 12px; margin-top: 9px; color: var(--muted); font-size: 10px; }
.rating-field { min-width: 0; margin: 0; padding: 14px; border: 1px solid var(--line); border-radius: 15px; }
.rating-field legend { padding-inline: 5px; font-size: 12px; font-weight: 900; }
.notice[role="status"] { scroll-margin-top: 90px; }

@media (max-width: 980px) {
  .header-actions .btn-primary { display: none; }
  .two-column-grid { grid-template-columns: 1fr; }
}

@media (max-width: 720px) {
  .logo small { display: none; }
  .logo { font-size: 14px; }
  .logo-mark { width: 36px; height: 36px; }
  .header-actions { gap: 6px; }
  .header-actions .btn-light { display: none; }
  .section-row, .request-alternative { align-items: stretch; flex-direction: column; }
  .request-alternative .btn { width: 100%; }
  .confirmation-actions .btn { flex: 1 1 calc(50% - 8px); }
  .history-item { grid-template-columns: 32px 1fr; padding: 12px; }
  .history-number { width: 30px; height: 30px; }
  .form-actions .btn { flex: 1; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

/* الصفحة الرئيسية المحسنة */
.home-hero { padding-block: 76px 64px; }
.hero-assurances { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.hero-assurances span { padding: 7px 10px; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; color: #c6cfdb; background: rgba(255,255,255,.055); font-size: 10px; font-weight: 800; }
.phone-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 16px; }
.phone-brand strong, .phone-brand small { display: block; }
.phone-brand small { color: var(--muted); margin-top: 2px; font-size: 9px; }
.small-mark { width: 34px; height: 34px; border-radius: 11px; font-weight: 900; }
.active-mini { border-color: #dfb664; box-shadow: 0 8px 20px rgba(166,106,19,.08); }
.trust-strip { background: #fff; border-bottom: 1px solid var(--line); }
.trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.trust-grid > div { padding: 22px 18px; border-inline-start: 1px solid var(--line); }
.trust-grid > div:first-child { border-inline-start: 0; }
.trust-grid strong, .trust-grid span { display: block; }
.trust-grid strong { font-size: 14px; }
.trust-grid span { color: var(--muted); font-size: 10px; line-height: 1.7; margin-top: 4px; }
.journey-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.journey-card { position: relative; padding: 21px; border: 1px solid var(--line); border-radius: var(--radius-lg); background: #fff; overflow: hidden; }
.journey-card > span { position: absolute; top: 14px; left: 16px; color: #cbd2db; font-size: 22px; font-weight: 900; }
.journey-card h3 { margin: 0 0 7px; }
.journey-card p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.8; }
.split-section { display: grid; grid-template-columns: .9fr 1.1fr; align-items: center; gap: 50px; }
.benefit-list { display: grid; gap: 10px; }
.benefit-list article { display: grid; grid-template-columns: 44px 1fr; gap: 12px; padding: 16px; border: 1px solid var(--line); background: #fff; border-radius: 17px; }
.benefit-list article > span { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; background: var(--gold-soft); color: #80520d; font-weight: 900; }
.benefit-list h3 { margin: 0 0 4px; font-size: 16px; }
.benefit-list p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.7; }
.portal-label { color: #916016; font-size: 10px; font-weight: 900; margin-bottom: 5px; }
.workshop-cta-section { background: var(--navy); color: #fff; }
.workshop-cta { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.workshop-cta h2 { max-width: 720px; margin: 16px 0 10px; font-size: clamp(28px, 4vw, 44px); line-height: 1.3; }
.workshop-cta p { max-width: 740px; margin: 0; color: #b6c0cf; line-height: 1.9; }
.cta-actions { display: grid; gap: 9px; min-width: 210px; }
.faq-shell { display: grid; grid-template-columns: .55fr 1.45fr; gap: 40px; align-items: start; }
.faq-grid { display: grid; gap: 10px; }
.faq-grid details { padding: 0 17px; border: 1px solid var(--line); border-radius: 16px; background: #fff; }
.faq-grid summary { cursor: pointer; padding: 17px 0; font-weight: 900; }
.faq-grid details[open] summary { color: #80520d; }
.faq-grid p { margin: 0 0 17px; color: var(--muted); font-size: 12px; line-height: 1.9; }

@media (max-width: 980px) {
  .trust-grid, .journey-grid { grid-template-columns: repeat(2, 1fr); }
  .split-section, .faq-shell { grid-template-columns: 1fr; gap: 24px; }
  .workshop-cta { align-items: stretch; flex-direction: column; }
  .cta-actions { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 720px) {
  .home-hero { padding-block: 54px 44px; }
  .trust-grid { grid-template-columns: 1fr 1fr; }
  .trust-grid > div { padding: 16px 10px; }
  .journey-grid { grid-template-columns: 1fr; }
  .cta-actions { grid-template-columns: 1fr; }
  .workshop-cta h2 { font-size: 30px; }
}
.noscript-banner { padding: 12px 16px; background: #fff0f1; color: #8f3038; border-bottom: 1px solid #efc7ca; text-align: center; font-weight: 900; font-size: 12px; }
```

## `assets/common.js`

```javascript
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
```

## `assets/customer.js`

```javascript
(() => {
  "use strict";

  const state = {
    mode: "",
    service: "",
    problem: "",
    customer: { name: "", phone: "" },
    vehicle: { make: "", model: "", year: "", mileage: "" },
    city: "",
    scenario: "general",
    specialty: "",
    guidance: "",
    questions: [],
    answers: [],
    questionIndex: 0,
    requestId: "",
    currentReferral: 0,
    request: null,
    pendingAlternativeReason: ""
  };

  const scenarioData = {
    engine: {
      keys: ["رج", "رجفة", "مكينة", "محرك", "عزم", "لمبة", "تقطيع", "تنتيع"],
      specialty: "ميكانيكا وكهرباء محرك",
      guidance: "المشكلة قد تكون مرتبطة بأداء المحرك أو أحد الأنظمة المؤثرة على عمله أثناء الوقوف، وتحتاج إلى فحص متخصص قبل تحديد السبب النهائي.",
      questions: [
        { text: "هل تظهر لمبة المكينة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تحدث المشكلة أثناء الوقوف فقط؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تخف المشكلة عند الضغط على دواسة الوقود؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل لاحظت ضعفًا في عزم السيارة؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    },
    ac: {
      keys: ["مكيف", "تبريد", "يبرد", "حر", "كمبروسر", "هواء"],
      specialty: "تكييف وكهرباء سيارات",
      guidance: "الوصف يشير مبدئيًا إلى مشكلة في كفاءة نظام التكييف أو أحد مكوناته المرتبطة بالتبريد، ويحتاج النظام إلى فحص متخصص لتحديد السبب.",
      questions: [
        { text: "هل يبرد المكيف بشكل أفضل أثناء المشي؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل الهواء الخارج من الفتحات قوي كالمعتاد؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تسمع صوتًا غير معتاد عند تشغيل المكيف؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    },
    suspension: {
      keys: ["طقطقة", "صوت", "مطب", "مطبات", "تعليق", "مساعد", "دركسون", "اهتزاز"],
      specialty: "عفشة وتعليق وتوجيه",
      guidance: "الأعراض قد تكون مرتبطة بأحد مكونات نظام التعليق أو التوجيه، ويحتاج تحديد السبب إلى فحص الجزء الأمامي ومكونات العفشة بشكل مباشر.",
      questions: [
        { text: "هل يظهر الصوت أكثر عند المطبات؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تشعر باهتزاز في المقود أثناء القيادة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل الصوت من جهة أمامية محددة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل لاحظت أن السيارة تميل إلى جهة أثناء القيادة؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    },
    general: {
      keys: [],
      specialty: "فحص وتشخيص عام",
      guidance: "الوصف يحتاج إلى فحص فني أولي لتحديد النظام المرتبط بالمشكلة بدقة قبل الوصول إلى سبب نهائي أو إجراء إصلاح.",
      questions: [
        { text: "هل بدأت المشكلة بشكل مفاجئ؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل تظهر المشكلة في كل مرة تستخدم فيها السيارة؟", answers: ["نعم", "لا", "غير متأكد"] },
        { text: "هل ظهرت أي لمبة تحذير في الطبلون؟", answers: ["نعم", "لا", "غير متأكد"] }
      ]
    }
  };

  const progress = {
    mode: [0, "بداية الطلب"],
    maintenance: [14, "اختيار الخدمة"],
    problem: [14, "وصف المشكلة"],
    customer: [28, "بيانات العميل"],
    vehicle: [42, "بيانات السيارة"],
    location: [56, "الموقع"],
    analyzing: [66, "التحليل المبدئي"],
    questions: [74, "الأسئلة التوضيحية"],
    guidance: [84, "التوجيه الفني"],
    maintenanceSummary: [84, "مراجعة الطلب"],
    matching: [93, "مطابقة الورش"],
    result: [100, "تم إنشاء الطلب"]
  };

  const screens = [...document.querySelectorAll(".flow-screen")];

  const showScreen = (name) => {
    screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === name));
    const [percent, label] = progress[name] || [0, ""];
    document.querySelector("#flowProgressBar").style.width = `${percent}%`;
    document.querySelector("#flowPercent").textContent = `${percent}%`;
    document.querySelector("#flowStepText").textContent = label;
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveDraft(name);
  };

  const saveDraft = (screen) => {
    WA.storage.set("wa_customer_draft", { ...state, screen, request: null });
  };

  const fieldInvalid = (name, invalid) => {
    document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", invalid);
  };

  const detectScenario = (text) => {
    const normalized = text.toLowerCase();
    const ranked = ["engine", "ac", "suspension"]
      .map((name) => ({
        name,
        score: scenarioData[name].keys.reduce((score, key) => score + (normalized.includes(key) ? 1 : 0), 0)
      }))
      .sort((a, b) => b.score - a.score);
    return ranked[0].score > 0 ? ranked[0].name : "general";
  };

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);

  const getNextReferralCandidate = () => {
    const poolKey = state.mode === "maintenance" ? "maintenance" : state.scenario;
    const excluded = state.request?.referrals?.map((item) => item.workshop?.id) || [];
    return WA.getWorkshopPool(poolKey, state.city, excluded)[0] || null;
  };

  const createRequest = () => {
    if (state.request) {
      const result = WA.createAlternativeReferral(state.request, state.pendingAlternativeReason || "غير محدد");
      state.pendingAlternativeReason = "";
      if (result.error) return result;
      state.request = result.request;
      state.currentReferral = result.request.currentReferral;
      return result;
    }

    const now = new Date().toISOString();
    const workshop = getNextReferralCandidate();
    if (!workshop) return { error: "لا توجد ورشة متاحة ضمن البيانات التجريبية." };
    const referralId = WA.randomId("RF", 5);
    const requestId = state.requestId || WA.randomId("WA", 5);
    state.requestId = requestId;

    const referral = {
      referralId,
      order: 1,
      workshop,
      status: "تم ترشيحها للعميل",
      createdAt: now
    };

    const request = {
      id: requestId,
      createdAt: now,
      type: state.mode,
      scenario: state.mode === "maintenance" ? "maintenance" : state.scenario,
      customer: { ...state.customer },
      vehicle: { ...state.vehicle },
      city: state.city,
      service: state.mode === "maintenance" ? state.service : "فحص وتشخيص للمشكلة",
      problem: state.mode === "problem" ? state.problem : "",
      specialty: state.mode === "maintenance" ? "صيانة دورية وخدمات سريعة" : state.specialty,
      guidance: state.mode === "problem" ? state.guidance : "",
      answers: state.mode === "problem" ? [...state.answers] : [],
      status: "تم ترشيح ورشة",
      customerConfirmation: "بانتظار المتابعة",
      referrals: [referral],
      currentReferral: 0,
      rated: false
    };
    WA.saveRequest(request);

    const referrals = WA.storage.get("wa_referrals", []);
    referrals.unshift({
      referralId,
      requestId,
      customer: state.customer.name,
      phone: state.customer.phone,
      car: `${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.year}`,
      city: state.city,
      service: state.mode === "maintenance" ? state.service : state.problem.slice(0, 80),
      specialty: request.specialty,
      status: "تم ترشيحها للعميل",
      createdAt: now,
      updatedAt: now,
      feeEligible: false,
      feeId: null,
      workshopId: workshop.id
    });
    WA.storage.set("wa_referrals", referrals);
    state.request = request;
    WA.storage.remove("wa_customer_draft");
    return { request, referral, workshop };
  };

  const runMatching = () => {
    showScreen("matching");
    setTimeout(() => {
      const result = createRequest();
      if (result.error) {
        WA.toast(result.error);
        showScreen(state.mode === "maintenance" ? "maintenanceSummary" : "guidance");
        return;
      }
      renderResult(result.workshop);
      showScreen("result");
    }, 1650);
  };

  const renderResult = (workshop) => {
    document.querySelector("#resultWorkshopName").textContent = workshop.name;
    document.querySelector("#resultRequestId").textContent = state.requestId;
    document.querySelector("#resultRating").textContent = workshop.rating;
    document.querySelector("#resultFairness").textContent = workshop.fairness;
    document.querySelector("#resultRatingsCount").textContent = `${workshop.ratingsCount} تقييمًا`;
    document.querySelector("#resultDistance").textContent = workshop.distance;
    document.querySelector("#resultCity").textContent = workshop.city;
    document.querySelector("#resultSpecialty").textContent = workshop.specialty;
    document.querySelector("#resultCommitment").textContent = workshop.commitment;
    document.querySelector("#resultRecommend").textContent = `${workshop.recommend}%`;
    document.querySelector("#resultReason").textContent = workshop.reason;
    document.querySelector("#trackRequestLink").href = `track.html?id=${encodeURIComponent(state.requestId)}&phone=${encodeURIComponent(state.customer.phone)}`;
    document.querySelector("#resultIntro").textContent = state.request.referrals.length === 1
      ? "تم إنشاء الطلب وتسجيل الإحالة قبل إظهار بيانات الورشة."
      : `تم استبعاد الورشة السابقة وتسجيل الإحالة رقم ${state.request.referrals.length} داخل نفس الطلب.`;
  };

  const createWhatsappMessage = () => {
    const current = state.request.referrals[state.request.currentReferral];
    return WA.buildWhatsappMessage(state.request, current.workshop);
  };

  const renderQuestion = () => {
    const question = state.questions[state.questionIndex];
    document.querySelector("#questionCount").textContent = `السؤال ${state.questionIndex + 1} من ${state.questions.length}`;
    document.querySelector("#questionText").textContent = question.text;
    const grid = document.querySelector("#answerGrid");
    grid.innerHTML = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-btn";
      button.textContent = answer;
      if (state.answers[state.questionIndex] === answer) button.classList.add("selected");
      button.addEventListener("click", () => {
        state.answers[state.questionIndex] = answer;
        [...grid.children].forEach((child) => child.classList.remove("selected"));
        button.classList.add("selected");
        document.querySelector("#questionNext").disabled = false;
      });
      grid.appendChild(button);
    });
    const next = document.querySelector("#questionNext");
    next.disabled = !state.answers[state.questionIndex];
    next.textContent = state.questionIndex === state.questions.length - 1 ? "عرض التوجيه المبدئي" : "التالي";
    document.querySelector("#questionBack").disabled = state.questionIndex === 0;
  };

  const runAnalysis = () => {
    showScreen("analyzing");
    const steps = [...document.querySelectorAll("#analysisSteps .loader-step")];
    steps.forEach((step, index) => {
      step.classList.remove("active", "done");
      step.querySelector(".dot").textContent = "";
      if (index === 0) step.classList.add("active");
    });
    let index = 0;
    const timer = setInterval(() => {
      steps[index].classList.remove("active");
      steps[index].classList.add("done");
      steps[index].querySelector(".dot").textContent = "✓";
      index += 1;
      if (index < steps.length) steps[index].classList.add("active");
      else {
        clearInterval(timer);
        state.scenario = detectScenario(state.problem);
        const scenario = scenarioData[state.scenario];
        state.specialty = scenario.specialty;
        state.guidance = scenario.guidance;
        state.questions = scenario.questions;
        state.answers = new Array(state.questions.length).fill(null);
        state.questionIndex = 0;
        setTimeout(() => {
          renderQuestion();
          showScreen("questions");
        }, 350);
      }
    }, 570);
  };

  const renderGuidance = () => {
    document.querySelector("#guidanceVehicle").textContent = `${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.year} — ${state.vehicle.mileage}`;
    document.querySelector("#guidanceProblem").textContent = state.problem;
    document.querySelector("#guidanceText").textContent = state.guidance;
    document.querySelector("#guidanceSpecialty").textContent = state.specialty;
  };

  const renderMaintenanceSummary = () => {
    document.querySelector("#maintenanceSummaryService").textContent = state.service;
    document.querySelector("#maintenanceSummaryVehicle").textContent = `${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.year} — ${state.vehicle.mileage}`;
    document.querySelector("#maintenanceSummaryCity").textContent = state.city;
  };

  const validateCustomer = () => {
    const name = document.querySelector("#customerName").value.trim();
    const phone = normalizePhone(document.querySelector("#customerPhone").value);
    const nameValid = name.length >= 2;
    const phoneValid = /^05\d{8}$/.test(phone);
    fieldInvalid("name", !nameValid);
    fieldInvalid("phone", !phoneValid);
    if (!nameValid || !phoneValid) return false;
    state.customer = { name, phone };
    return true;
  };

  const validateVehicle = () => {
    const vehicle = {
      make: document.querySelector("#vehicleMake").value,
      model: document.querySelector("#vehicleModel").value.trim(),
      year: document.querySelector("#vehicleYear").value,
      mileage: document.querySelector("#vehicleMileage").value
    };
    const validity = {
      make: Boolean(vehicle.make),
      model: vehicle.model.length >= 2,
      year: Boolean(vehicle.year),
      mileage: Boolean(vehicle.mileage)
    };
    Object.entries(validity).forEach(([key, valid]) => fieldInvalid(key, !valid));
    if (!Object.values(validity).every(Boolean)) return false;
    state.vehicle = vehicle;
    return true;
  };

  const initServices = () => {
    const icons = ["⛽", "▦", "◉", "▣", "◎", "⌁", "❄", "+"];
    const mount = document.querySelector("#maintenanceServices");
    mount.innerHTML = WA.maintenanceServices.map((service, index) => `
      <button class="service-card" type="button" data-service="${WA.escapeHTML(service)}">
        <span aria-hidden="true" style="font-size:24px">${icons[index]}</span>
        <span>${WA.escapeHTML(service)}</span>
      </button>`).join("");

    mount.querySelectorAll("[data-service]").forEach((button) => {
      button.addEventListener("click", () => {
        mount.querySelectorAll(".service-card").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        state.service = button.dataset.service;
        document.querySelector("#maintenanceNext").disabled = false;
        document.querySelector("#otherServiceField").classList.toggle("hidden", state.service !== "خدمة أخرى");
      });
    });
  };

  const init = () => {
    WA.fillSelect("#vehicleMake", WA.makes, "اختر الشركة");
    WA.fillSelect("#customerCity", WA.cities, "اختر المدينة أو المحافظة");
    initServices();

    document.querySelectorAll("[data-back]").forEach((button) => {
      button.addEventListener("click", () => showScreen(button.dataset.back));
    });

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-mode]").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        state.mode = button.dataset.mode;
        document.querySelector("#modeNext").disabled = false;
      });
    });

    document.querySelector("#modeNext").addEventListener("click", () => {
      if (!state.mode) return;
      showScreen(state.mode === "maintenance" ? "maintenance" : "problem");
    });

    document.querySelector("#maintenanceNext").addEventListener("click", () => {
      if (!state.service) return;
      if (state.service === "خدمة أخرى") {
        const other = document.querySelector("#otherService").value.trim();
        const valid = other.length >= 3;
        document.querySelector("#otherServiceField").classList.toggle("invalid", !valid);
        if (!valid) return;
        state.service = other;
      }
      showScreen("customer");
    });

    const problemText = document.querySelector("#problemText");
    problemText.addEventListener("input", () => {
      document.querySelector("#problemCount").textContent = problemText.value.length;
      fieldInvalid("problem", false);
    });
    document.querySelectorAll(".example-problem").forEach((button) => {
      button.addEventListener("click", () => {
        problemText.value = button.dataset.text;
        problemText.dispatchEvent(new Event("input"));
      });
    });
    document.querySelector("#problemNext").addEventListener("click", () => {
      const value = problemText.value.trim();
      const valid = value.length >= 12;
      fieldInvalid("problem", !valid);
      if (!valid) return;
      state.problem = value;
      showScreen("customer");
    });

    document.querySelector("#customerPhone").addEventListener("input", (event) => {
      event.target.value = normalizePhone(event.target.value);
      fieldInvalid("phone", false);
    });
    document.querySelector("#customerName").addEventListener("input", () => fieldInvalid("name", false));
    document.querySelector("#customerBack").addEventListener("click", () => showScreen(state.mode === "maintenance" ? "maintenance" : "problem"));
    document.querySelector("#customerNext").addEventListener("click", () => {
      if (validateCustomer()) showScreen("vehicle");
    });

    document.querySelector("#vehicleNext").addEventListener("click", () => {
      if (validateVehicle()) showScreen("location");
    });

    document.querySelector("#useMockLocation").addEventListener("click", () => {
      const button = document.querySelector("#useMockLocation");
      button.disabled = true;
      button.textContent = "جاري تحديد الموقع…";
      setTimeout(() => {
        state.city = "بريدة";
        document.querySelector("#customerCity").value = "بريدة";
        document.querySelector("#locationNotice").classList.remove("hidden");
        button.disabled = false;
        button.textContent = "استخدام موقعي الحالي — محاكاة";
        fieldInvalid("city", false);
      }, 700);
    });
    document.querySelector("#customerCity").addEventListener("change", (event) => {
      state.city = event.target.value;
      document.querySelector("#locationNotice").classList.add("hidden");
      fieldInvalid("city", false);
    });
    document.querySelector("#locationNext").addEventListener("click", () => {
      state.city = state.city || document.querySelector("#customerCity").value;
      fieldInvalid("city", !state.city);
      if (!state.city) return;
      if (state.mode === "maintenance") {
        renderMaintenanceSummary();
        showScreen("maintenanceSummary");
      } else {
        runAnalysis();
      }
    });

    document.querySelector("#questionBack").addEventListener("click", () => {
      if (state.questionIndex > 0) {
        state.questionIndex -= 1;
        renderQuestion();
      }
    });
    document.querySelector("#questionNext").addEventListener("click", () => {
      if (!state.answers[state.questionIndex]) return;
      if (state.questionIndex < state.questions.length - 1) {
        state.questionIndex += 1;
        renderQuestion();
      } else {
        renderGuidance();
        showScreen("guidance");
      }
    });

    document.querySelector("#guidanceMatch").addEventListener("click", runMatching);
    document.querySelector("#maintenanceMatch").addEventListener("click", runMatching);

    document.querySelector("#openWhatsapp").addEventListener("click", () => {
      const current = state.request.referrals[state.request.currentReferral];
      const message = createWhatsappMessage();
      document.querySelector("#whatsappMessage").textContent = message;
      document.querySelector("#openWhatsappLink").href = WA.buildWhatsappUrl(state.request, current.workshop);
      WA.openModal("#whatsappModal");
    });
    document.querySelector("#copyWhatsappMessage").addEventListener("click", async () => {
      const message = createWhatsappMessage();
      try {
        await navigator.clipboard.writeText(message);
        WA.toast("تم نسخ رسالة واتساب.");
      } catch (_) {
        WA.toast("تعذر النسخ التلقائي. يمكنك تحديد النص ونسخه يدويًا.");
      }
    });
    document.querySelector("#openWhatsappLink").addEventListener("click", () => {
      WA.markWhatsappOpened(state.request);
      WA.closeModals();
    });

    document.querySelector("#anotherWorkshop").addEventListener("click", () => {
      if (!state.request) return;
      if (state.request.referrals.length >= 3) {
        WA.toast("وصل الطلب إلى الحد الأقصى: 3 ورش.");
        return;
      }
      WA.openModal("#anotherModal");
    });
    document.querySelector("#confirmAnotherWorkshop").addEventListener("click", () => {
      const selected = document.querySelector('input[name="anotherReason"]:checked');
      state.pendingAlternativeReason = selected ? selected.value : "غير محدد";
      WA.closeModals();
      runMatching();
    });

    const draft = WA.storage.get("wa_customer_draft", null);
    if (draft && !WA.getQuery("fresh")) {
      // Keep the prototype predictable: restore only basic fields, not an in-progress request.
      if (draft.customer?.name) document.querySelector("#customerName").value = draft.customer.name;
      if (draft.customer?.phone) document.querySelector("#customerPhone").value = draft.customer.phone;
      if (draft.vehicle?.make) document.querySelector("#vehicleMake").value = draft.vehicle.make;
      if (draft.vehicle?.model) document.querySelector("#vehicleModel").value = draft.vehicle.model;
      if (draft.vehicle?.year) document.querySelector("#vehicleYear").value = draft.vehicle.year;
      if (draft.vehicle?.mileage) document.querySelector("#vehicleMileage").value = draft.vehicle.mileage;
      if (draft.city) document.querySelector("#customerCity").value = draft.city;
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/track.js`

```javascript
(() => {
  "use strict";

  let currentRequest = null;

  const ratingDimensions = [
    ["overall", "التقييم العام"],
    ["treatment", "جودة التعامل"],
    ["commitment", "الالتزام"],
    ["clarity", "وضوح التعامل"],
    ["quality", "جودة الخدمة"],
    ["fairness", "عدالة الأسعار"]
  ];

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
  const currentReferral = () => currentRequest?.referrals?.[currentRequest.currentReferral || 0] || null;
  const hasRating = (referralId) => WA.storage.get("wa_ratings", []).some((rating) => rating.referralId === referralId);

  const fieldInvalid = (name, invalid) => {
    document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", invalid);
  };

  const renderRatingFields = () => {
    document.querySelector("#ratingFields").innerHTML = ratingDimensions.map(([name, label]) => `
      <fieldset class="rating-field">
        <legend>${label}</legend>
        <div class="stars-input" aria-label="${label}">
          ${[5, 4, 3, 2, 1].map((value) => `
            <input type="radio" id="${name}-${value}" name="${name}" value="${value}">
            <label for="${name}-${value}" title="${value} من 5"><span class="sr-only">${value} من 5</span>★</label>`).join("")}
        </div>
      </fieldset>`).join("");
  };

  const renderTimeline = () => {
    const status = currentReferral()?.status || currentRequest.status;
    const stages = [
      ["تم إنشاء الطلب", true],
      ["تم تسجيل الإحالة", true],
      ["ظهرت الورشة للعميل", true],
      ["تم التواصل", ["تواصل العميل", "تم تحديد موعد", "وصل العميل", "تمت الخدمة"].includes(status)],
      ["وصل العميل", ["وصل العميل", "تمت الخدمة"].includes(status)],
      ["تمت الخدمة", status === "تمت الخدمة"]
    ];
    const activeIndex = stages.reduce((last, item, index) => item[1] ? index : last, 0);
    document.querySelector("#requestTimeline").innerHTML = stages.map(([title, done], index) => `
      <div class="timeline-item ${done ? "done" : ""} ${index === activeIndex && status !== "تمت الخدمة" ? "current" : ""}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <h4>${WA.escapeHTML(title)}</h4>
        <p>${done ? "مكتملة أو مؤكدة" : "بانتظار التحديث"}</p>
      </div>`).join("");
  };

  const renderCurrentReferral = () => {
    const referral = currentReferral();
    if (!referral) return;
    const workshop = referral.workshop;
    const whatsappUrl = WA.buildWhatsappUrl(currentRequest, workshop);
    document.querySelector("#currentReferralCard").innerHTML = `
      <div class="request-strip"><span>رقم الإحالة</span><strong class="ltr">${WA.escapeHTML(referral.referralId)}</strong></div>
      <div class="info-list">
        <div class="info-row"><div class="info-label">الورشة</div><div class="info-value">${WA.escapeHTML(workshop.name)}</div></div>
        <div class="info-row"><div class="info-label">المدينة</div><div class="info-value">${WA.escapeHTML(workshop.city || currentRequest.city)}</div></div>
        <div class="info-row"><div class="info-label">التخصص</div><div class="info-value">${WA.escapeHTML(workshop.specialty)}</div></div>
        <div class="info-row"><div class="info-label">الحالة</div><div class="info-value"><span class="badge ${WA.statusBadgeClass(referral.status)}">${WA.escapeHTML(referral.status)}</span></div></div>
        <div class="info-row"><div class="info-label">التقييم العام</div><div class="info-value"><span class="stars">★</span> ${workshop.rating} من 5</div></div>
        <div class="info-row"><div class="info-label">عدالة الأسعار</div><div class="info-value"><span class="stars">★</span> ${workshop.fairness} من 5</div></div>
      </div>
      <a class="btn btn-success btn-block mt-16" id="trackWhatsapp" href="${whatsappUrl}" target="_blank" rel="noopener">التواصل عبر واتساب</a>
      <button class="btn btn-light btn-block mt-8" id="copyTrackMessage" type="button">نسخ رسالة واتساب</button>`;

    document.querySelector("#trackWhatsapp").addEventListener("click", () => {
      WA.markWhatsappOpened(currentRequest);
      renderRequest();
    });
    document.querySelector("#copyTrackMessage").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(WA.buildWhatsappMessage(currentRequest, workshop));
        WA.toast("تم نسخ رسالة واتساب.");
      } catch (_) {
        WA.toast("تعذر النسخ التلقائي في هذا المتصفح.");
      }
    });
  };

  const renderHistory = () => {
    document.querySelector("#referralHistory").innerHTML = currentRequest.referrals.map((referral, index) => `
      <article class="history-item ${index === currentRequest.currentReferral ? "current" : ""}">
        <div class="history-number">${index + 1}</div>
        <div class="history-content">
          <div class="section-row">
            <div><strong>${WA.escapeHTML(referral.workshop.name)}</strong><span>${WA.escapeHTML(referral.workshop.specialty)}</span></div>
            <span class="badge ${WA.statusBadgeClass(referral.status)}">${WA.escapeHTML(referral.status)}</span>
          </div>
          <div class="history-meta"><span class="ltr">${WA.escapeHTML(referral.referralId)}</span><span>${WA.formatDate(referral.createdAt)}</span>${referral.reason ? `<span>السبب: ${WA.escapeHTML(referral.reason)}</span>` : ""}</div>
        </div>
      </article>`).join("");
  };

  const renderDetails = () => {
    const primary = currentRequest.type === "maintenance" ? currentRequest.service : currentRequest.problem;
    const secondary = currentRequest.type === "maintenance" ? "صيانة دورية وخدمات سريعة" : currentRequest.guidance;
    document.querySelector("#requestDetails").innerHTML = `
      <div class="info-row"><div class="info-label">الطلب</div><div class="info-value">${WA.escapeHTML(primary || "—")}</div></div>
      <div class="info-row"><div class="info-label">التخصص</div><div class="info-value">${WA.escapeHTML(currentRequest.specialty || "—")}</div></div>
      <div class="info-row"><div class="info-label">التوجيه</div><div class="info-value">${WA.escapeHTML(secondary || "—")}</div></div>
      <div class="info-row"><div class="info-label">الممشى</div><div class="info-value">${WA.escapeHTML(currentRequest.vehicle.mileage || "—")}</div></div>`;
  };

  const renderRating = () => {
    const referral = currentReferral();
    const completed = referral?.status === "تمت الخدمة" || currentRequest.customerConfirmation === "تمت الخدمة";
    const rated = referral ? hasRating(referral.referralId) : false;
    document.querySelector("#ratingSection").classList.toggle("hidden", !completed);
    document.querySelector("#ratingForm").classList.toggle("hidden", rated);
    document.querySelector("#ratingSuccess").classList.toggle("hidden", !rated);
    if (rated) document.querySelector("#ratingSuccess").textContent = "سبق إرسال تقييم موثق لهذه الإحالة. شكرًا لك.";
  };

  const renderRequest = () => {
    if (!currentRequest) return;
    document.querySelector("#requestView").classList.remove("hidden");
    document.querySelector("#trackRequestTitle").textContent = `الطلب ${currentRequest.id}`;
    document.querySelector("#trackRequestMeta").textContent = `أُنشئ في ${WA.formatDate(currentRequest.createdAt)} — باسم ${currentRequest.customer.name}`;
    document.querySelector("#trackRequestStatus").className = `badge ${WA.statusBadgeClass(currentRequest.status)}`;
    document.querySelector("#trackRequestStatus").textContent = currentRequest.status;
    document.querySelector("#trackType").textContent = currentRequest.type === "maintenance" ? "صيانة دورية" : "مشكلة تواجهك";
    document.querySelector("#trackVehicle").textContent = `${currentRequest.vehicle.make} ${currentRequest.vehicle.model} ${currentRequest.vehicle.year}`;
    document.querySelector("#trackCity").textContent = currentRequest.city;
    document.querySelector("#trackReferralCount").textContent = currentRequest.referrals.length;
    renderDetails();
    renderTimeline();
    renderCurrentReferral();
    renderHistory();
    renderRating();

    const completed = currentReferral()?.status === "تمت الخدمة";
    const maxed = currentRequest.referrals.length >= 3;
    document.querySelector("#alternativeAction").classList.toggle("hidden", completed || maxed);
  };

  const findRequest = (id, phone) => WA.storage.get("wa_requests", [])
    .find((request) => request.id.toUpperCase() === id.toUpperCase() && request.customer.phone === phone) || null;

  const search = (event) => {
    event?.preventDefault();
    const id = document.querySelector("#trackId").value.trim();
    const phone = normalizePhone(document.querySelector("#trackPhone").value);
    fieldInvalid("trackId", !id);
    fieldInvalid("trackPhone", !/^05\d{8}$/.test(phone));
    if (!id || !/^05\d{8}$/.test(phone)) return;
    currentRequest = findRequest(id, phone);
    if (!currentRequest) {
      document.querySelector("#requestView").classList.add("hidden");
      WA.toast("لم نجد طلبًا مطابقًا لرقم الطلب والجوال.");
      return;
    }
    renderRequest();
    document.querySelector("#requestView").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateConfirmation = (value) => {
    if (!currentRequest) return;
    const referral = currentReferral();
    currentRequest.customerConfirmation = value;
    if (value === "وصلت إلى الورشة") referral.status = "وصل العميل";
    if (value === "تمت الخدمة") referral.status = "تمت الخدمة";
    if (value === "لم أتواصل معها") referral.status = "لم يتم التواصل";
    if (value === "تواصلت ولم أصل") referral.status = "تواصل العميل";
    currentRequest.status = value === "تمت الخدمة" ? "تمت الخدمة" : value;
    WA.saveRequest(currentRequest);
    WA.updateFlatReferral(referral.referralId, { status: referral.status });
    if (value === "تمت الخدمة") WA.registerFeeForReferral(currentRequest, referral);
    document.querySelector("#confirmationNotice").classList.remove("hidden");
    document.querySelector("#confirmationNotice").textContent = `تم تسجيل تأكيدك: ${value}.`;
    renderRequest();
  };

  const submitRating = (event) => {
    event.preventDefault();
    const referral = currentReferral();
    if (!currentRequest || !referral || hasRating(referral.referralId)) return;
    const data = {};
    let valid = true;
    ratingDimensions.forEach(([name]) => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      if (!selected) valid = false;
      else data[name] = Number(selected.value);
    });
    const recommend = document.querySelector("#recommendWorkshop").value;
    fieldInvalid("recommendWorkshop", !recommend);
    if (!recommend) valid = false;
    if (!valid) {
      WA.toast("أكمل جميع عناصر التقييم واختر هل تنصح بالورشة.");
      return;
    }
    const ratings = WA.storage.get("wa_ratings", []);
    ratings.unshift({
      requestId: currentRequest.id,
      referralId: referral.referralId,
      workshopId: referral.workshop.id,
      customer: currentRequest.customer.name,
      ...data,
      recommend,
      comment: document.querySelector("#ratingComment").value.trim(),
      createdAt: new Date().toISOString()
    });
    WA.storage.set("wa_ratings", ratings);
    currentRequest.rated = true;
    currentRequest.status = "تم التقييم";
    WA.saveRequest(currentRequest);
    renderRequest();
    WA.toast("تم حفظ التقييم الموثق بنجاح.");
  };

  const requestAlternative = () => {
    if (!currentRequest) return;
    if (currentRequest.referrals.length >= 3) {
      WA.toast("وصل الطلب إلى الحد الأقصى: 3 ورش.");
      return;
    }
    WA.openModal("#trackAnotherModal");
  };

  const confirmAlternative = () => {
    const selected = document.querySelector('input[name="trackAnotherReason"]:checked');
    const result = WA.createAlternativeReferral(currentRequest, selected?.value || "غير محدد");
    if (result.error) {
      WA.toast(result.error);
      return;
    }
    currentRequest = result.request;
    WA.closeModals();
    renderRequest();
    WA.toast("تم تسجيل إحالة جديدة داخل نفس الطلب.");
  };

  const init = () => {
    renderRatingFields();
    document.querySelector("#requestSearchForm").addEventListener("submit", search);
    document.querySelector("#trackPhone").addEventListener("input", (event) => {
      event.target.value = normalizePhone(event.target.value);
      fieldInvalid("trackPhone", false);
    });
    document.querySelector("#trackId").addEventListener("input", () => fieldInvalid("trackId", false));
    document.querySelector("#loadDemoRequest").addEventListener("click", () => {
      document.querySelector("#trackId").value = "WA-10425";
      document.querySelector("#trackPhone").value = "0500000001";
      search();
    });
    document.querySelectorAll(".confirmation-btn").forEach((button) => {
      button.addEventListener("click", () => updateConfirmation(button.dataset.confirmation));
    });
    document.querySelector("#requestAlternative").addEventListener("click", requestAlternative);
    document.querySelector("#confirmTrackAlternative").addEventListener("click", confirmAlternative);
    document.querySelector("#ratingForm").addEventListener("submit", submitRating);
    document.querySelector("#copyRequestId").addEventListener("click", async () => {
      if (!currentRequest) return;
      try { await navigator.clipboard.writeText(currentRequest.id); WA.toast("تم نسخ رقم الطلب."); }
      catch (_) { WA.toast(`رقم الطلب: ${currentRequest.id}`); }
    });

    const queryId = WA.getQuery("id");
    const queryPhone = WA.getQuery("phone");
    if (queryId) document.querySelector("#trackId").value = queryId;
    if (queryPhone) document.querySelector("#trackPhone").value = queryPhone;
    if (queryId && queryPhone) setTimeout(search, 80);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/workshop-login.js`

```javascript
(() => {
  "use strict";
  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
  const init = () => {
    const phone = document.querySelector("#loginPhone");
    const code = document.querySelector("#loginCode");
    phone.addEventListener("input", () => { phone.value = normalizePhone(phone.value); });
    document.querySelector("#fillDemoLogin").addEventListener("click", () => {
      phone.value = "0550000101";
      code.value = "1234";
      document.querySelector('[data-field="loginPhone"]').classList.remove("invalid");
      document.querySelector('[data-field="loginCode"]').classList.remove("invalid");
      phone.focus();
    });
    document.querySelector("#workshopLoginForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const phoneValid = phone.value === "0550000101";
      const codeValid = code.value === "1234";
      document.querySelector('[data-field="loginPhone"]').classList.toggle("invalid", !phoneValid);
      document.querySelector('[data-field="loginCode"]').classList.toggle("invalid", !codeValid);
      if (!phoneValid || !codeValid) return;
      WA.storage.set("wa_workshop_session", { workshopId: "WS-101", loginAt: new Date().toISOString() });
      window.location.href = "workshop-dashboard.html";
    });
  };
  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/dashboard.js`

```javascript
(() => {
  "use strict";

  let currentReferralId = null;

  const getProfile = () => WA.storage.get("wa_workshop_profile", {});
  const getWorkshopId = () => WA.storage.get("wa_workshop_session", {})?.workshopId || getProfile().id || "WS-101";
  const getWorkshopReferrals = () => WA.storage.get("wa_referrals", []).filter((item) => !item.workshopId || item.workshopId === getWorkshopId());
  const getWorkshopRatings = () => {
    const referralIds = new Set(getWorkshopReferrals().map((item) => item.referralId));
    return WA.storage.get("wa_ratings", []).filter((item) => item.workshopId === getWorkshopId() || referralIds.has(item.referralId));
  };
  const getWorkshopFees = () => WA.storage.get("wa_fees", []).filter((item) => !item.workshopId || item.workshopId === getWorkshopId());
  const getWorkshopPayments = () => WA.storage.get("wa_payments", []).filter((item) => !item.workshopId || item.workshopId === getWorkshopId());

  const requireSession = () => {
    const session = WA.storage.get("wa_workshop_session", null);
    if (!session) {
      window.location.href = "workshop-login.html";
      return false;
    }
    return true;
  };

  const average = (items, key) => {
    if (!items.length) return 0;
    return items.reduce((sum, item) => sum + Number(item[key] || 0), 0) / items.length;
  };

  const renderOverview = () => {
    const profile = getProfile();
    const referrals = getWorkshopReferrals();
    const ratings = getWorkshopRatings();
    const balance = getWorkshopFees().filter((fee) => fee.status === "غير مدفوع").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);

    document.querySelector("#sidebarWorkshopName").textContent = profile.name;
    document.querySelector("#ownerName").textContent = profile.owner;
    document.querySelector("#statReferrals").textContent = referrals.length;
    document.querySelector("#statCompleted").textContent = referrals.filter((item) => item.status === "تمت الخدمة").length;
    document.querySelector("#statRating").textContent = ratings.length ? average(ratings, "overall").toFixed(1) : profile.rating;
    document.querySelector("#statBalance").textContent = WA.formatMoney(balance);
    document.querySelector("#commitmentValue").textContent = `${profile.commitment}%`;
    document.querySelector("#commitmentBar").style.width = `${profile.commitment}%`;
    document.querySelector("#trustValue").textContent = `${profile.trustIndex}%`;
    document.querySelector("#trustBar").style.width = `${profile.trustIndex}%`;
    document.querySelector("#fairnessValue").textContent = ratings.length ? average(ratings, "fairness").toFixed(1) : profile.fairness;

    const latest = referrals.slice(0, 4);
    document.querySelector("#latestReferralsBody").innerHTML = latest.length ? latest.map((item) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(item.requestId)}</span><span class="table-sub ltr">${WA.escapeHTML(item.referralId)}</span></td>
        <td><span class="table-title">${WA.escapeHTML(item.customer)}</span><span class="table-sub">${WA.escapeHTML(item.car)}</span></td>
        <td>${WA.escapeHTML(item.service)}</td>
        <td><span class="badge ${WA.statusBadgeClass(item.status)}">${WA.escapeHTML(item.status)}</span></td>
        <td>${WA.formatDate(item.updatedAt || item.createdAt)}</td>
      </tr>`).join("") : '<tr><td colspan="5"><div class="empty-state">لا توجد إحالات.</div></td></tr>';
  };

  const renderReferrals = () => {
    const filter = document.querySelector("#referralFilter").value;
    const referrals = getWorkshopReferrals().filter((item) => !filter || item.status === filter);
    document.querySelector("#referralsBody").innerHTML = referrals.length ? referrals.map((item) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(item.referralId)}</span><span class="table-sub">${WA.formatDate(item.createdAt)}</span></td>
        <td><span class="table-title ltr">${WA.escapeHTML(item.requestId)}</span><span class="table-sub">${WA.escapeHTML(item.city)}</span></td>
        <td><span class="table-title">${WA.escapeHTML(item.customer)}</span><span class="table-sub ltr">${WA.escapeHTML(item.phone)}</span></td>
        <td><span class="table-title">${WA.escapeHTML(item.car)}</span><span class="table-sub">${WA.escapeHTML(item.service)}</span></td>
        <td><span class="badge ${WA.statusBadgeClass(item.status)}">${WA.escapeHTML(item.status)}</span></td>
        <td><button class="btn btn-light btn-sm edit-referral" type="button" data-id="${WA.escapeHTML(item.referralId)}">تحديث الحالة</button></td>
      </tr>`).join("") : '<tr><td colspan="6"><div class="empty-state"><h3>لا توجد إحالات مطابقة</h3><p>غيّر فلتر الحالة أو أنشئ طلبًا من بوابة العميل.</p></div></td></tr>';

    document.querySelectorAll(".edit-referral").forEach((button) => {
      button.addEventListener("click", () => openReferralModal(button.dataset.id));
    });
  };

  const openReferralModal = (id) => {
    currentReferralId = id;
    const referral = getWorkshopReferrals().find((item) => item.referralId === id);
    if (!referral) return;
    document.querySelector("#referralModalTitle").textContent = `تحديث الإحالة ${id}`;
    document.querySelector("#referralModalContent").innerHTML = `
      <div class="form-grid one">
        <div class="notice info">الطلب ${WA.escapeHTML(referral.requestId)} — ${WA.escapeHTML(referral.customer)} — ${WA.escapeHTML(referral.car)}</div>
        <div class="field">
          <label for="modalStatus">الحالة الجديدة</label>
          <select id="modalStatus">${WA.referralStatuses.map((status) => `<option ${status === referral.status ? "selected" : ""}>${WA.escapeHTML(status)}</option>`).join("")}</select>
        </div>
        <div class="field">
          <label for="modalNote">ملاحظة داخلية اختيارية</label>
          <textarea id="modalNote" maxlength="200" placeholder="مثال: تم التنسيق للزيارة مساءً">${WA.escapeHTML(referral.note || "")}</textarea>
        </div>
        <button class="btn btn-dark btn-block" id="saveReferralStatus" type="button">حفظ التحديث</button>
      </div>`;
    document.querySelector("#saveReferralStatus").addEventListener("click", saveReferralStatus);
    WA.openModal("#referralModal");
  };

  const saveReferralStatus = () => {
    const status = document.querySelector("#modalStatus").value;
    const note = document.querySelector("#modalNote").value.trim();
    const referrals = WA.storage.get("wa_referrals", []);
    const referral = referrals.find((item) => item.referralId === currentReferralId);
    if (!referral) return;
    referral.status = status;
    referral.note = note;
    referral.updatedAt = new Date().toISOString();

    const profile = getProfile();
    if (status === "تمت الخدمة" && !referral.feeEligible) {
      const feeId = WA.randomId("FEE", 5);
      referral.feeEligible = true;
      referral.feeId = feeId;
      const fees = WA.storage.get("wa_fees", []);
      fees.unshift({
        id: feeId,
        referralId: referral.referralId,
        requestId: referral.requestId,
        event: profile.agreementEvent,
        amount: profile.demoFee,
        status: "غير مدفوع",
        createdAt: new Date().toISOString(),
        workshopId: getWorkshopId(),
        demo: true
      });
      WA.storage.set("wa_fees", fees);
    }
    WA.storage.set("wa_referrals", referrals);

    const requests = WA.storage.get("wa_requests", []);
    const request = requests.find((item) => item.id === referral.requestId);
    if (request) {
      const linked = request.referrals.find((item) => item.referralId === referral.referralId);
      if (linked) {
        linked.status = status;
        linked.note = note;
        linked.updatedAt = referral.updatedAt;
        linked.feeEligible = Boolean(referral.feeEligible);
        linked.feeId = referral.feeId || null;
      }
      request.status = status;
      if (status === "تمت الخدمة") request.customerConfirmation = "تمت الخدمة";
      WA.storage.set("wa_requests", requests);
    }

    WA.closeModals();
    renderAll();
    WA.toast(status === "تمت الخدمة" ? "تم تحديث الحالة ومحاكاة تسجيل الرسم وفق الاتفاقية." : "تم تحديث حالة الإحالة.");
  };

  const renderRatings = () => {
    const ratings = getWorkshopRatings();
    document.querySelector("#ratingOverall").textContent = ratings.length ? `${average(ratings, "overall").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingTreatment").textContent = ratings.length ? `${average(ratings, "treatment").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingCommitment").textContent = ratings.length ? `${average(ratings, "commitment").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingFairness").textContent = ratings.length ? `${average(ratings, "fairness").toFixed(1)} / 5` : "—";
    document.querySelector("#ratingsList").innerHTML = ratings.length ? ratings.map((rating) => `
      <article class="card">
        <div class="dashboard-head">
          <div><h3 class="mt-0">${WA.escapeHTML(rating.customer)} — <span class="ltr">${WA.escapeHTML(rating.requestId)}</span></h3><p>${WA.formatDate(rating.createdAt)}</p></div>
          <span class="badge success"><span class="stars">★</span> ${rating.overall} / 5</span>
        </div>
        <div class="metric-grid">
          <div class="metric"><small>جودة التعامل</small><strong>${rating.treatment} / 5</strong></div>
          <div class="metric"><small>الالتزام</small><strong>${rating.commitment} / 5</strong></div>
          <div class="metric"><small>جودة الخدمة</small><strong>${rating.quality} / 5</strong></div>
          <div class="metric"><small>عدالة الأسعار</small><strong>${rating.fairness} / 5</strong></div>
        </div>
        <div class="why-box"><strong>هل ينصح بالورشة؟ ${WA.escapeHTML(rating.recommend)}</strong><p>${WA.escapeHTML(rating.comment || "لا يوجد تعليق.")}</p></div>
      </article>`).join("") : '<div class="empty-state"><h3>لا توجد تقييمات بعد</h3><p>تظهر هنا التقييمات المرتبطة بتجارب فعلية.</p></div>';
  };

  const renderStatement = () => {
    const fees = getWorkshopFees();
    const payments = getWorkshopPayments();
    const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const outstanding = fees.filter((fee) => fee.status === "غير مدفوع").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    const paid = payments.filter((payment) => payment.status === "مكتمل").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    document.querySelector("#feesTotal").textContent = WA.formatMoney(total);
    document.querySelector("#feesPaid").textContent = WA.formatMoney(paid);
    document.querySelector("#feesOutstanding").textContent = WA.formatMoney(outstanding);
    document.querySelector("#lastPayment").textContent = payments.length ? WA.formatDate(payments[0].paidAt) : "لا يوجد";
    const profile = getProfile();
    const notice = document.querySelector("#balanceNotice");
    notice.textContent = outstanding >= profile.threshold
      ? `بلغ الرصيد المستحق حد المطالبة المالي التجريبي (${WA.formatMoney(profile.threshold)}). يمكنك الانتقال إلى صفحة الدفع.`
      : `الرصيد دون حد المطالبة التجريبي. القيم المعروضة محاكاة وليست سياسة تسعير معتمدة.`;

    document.querySelector("#feesBody").innerHTML = fees.length ? fees.map((fee) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(fee.id)}</span></td>
        <td><span class="table-title ltr">${WA.escapeHTML(fee.referralId)}</span><span class="table-sub ltr">${WA.escapeHTML(fee.requestId)}</span></td>
        <td>${WA.escapeHTML(fee.event)}</td>
        <td>${WA.formatMoney(fee.amount)}</td>
        <td><span class="badge ${WA.statusBadgeClass(fee.status)}">${WA.escapeHTML(fee.status)}</span></td>
        <td>${WA.formatDate(fee.createdAt)}</td>
      </tr>`).join("") : '<tr><td colspan="6"><div class="empty-state">لا توجد رسوم مسجلة.</div></td></tr>';

    document.querySelector("#paymentsBody").innerHTML = payments.length ? payments.map((payment) => `
      <tr>
        <td><span class="table-title ltr">${WA.escapeHTML(payment.id)}</span></td>
        <td>${WA.formatMoney(payment.amount)}</td>
        <td>${WA.escapeHTML(payment.method)}</td>
        <td><span class="badge success">${WA.escapeHTML(payment.status)}</span></td>
        <td>${WA.formatDate(payment.paidAt)}</td>
        <td><a class="btn btn-light btn-sm" href="receipt.html?id=${encodeURIComponent(payment.receiptId)}">عرض الإيصال</a></td>
      </tr>`).join("") : '<tr><td colspan="6"><div class="empty-state">لا توجد مدفوعات.</div></td></tr>';
  };

  const renderAll = () => {
    renderOverview();
    renderReferrals();
    renderRatings();
    renderStatement();
  };

  const switchTab = (name) => {
    document.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === name));
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const init = () => {
    if (!requireSession()) return;
    WA.fillSelect("#referralFilter", WA.referralStatuses, "كل الحالات");
    document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.tab)));
    document.querySelectorAll("[data-switch-tab]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.switchTab)));
    document.querySelector("#referralFilter").addEventListener("change", renderReferrals);
    document.querySelector("#logoutWorkshop").addEventListener("click", () => {
      WA.storage.remove("wa_workshop_session");
      window.location.href = "workshop-login.html";
    });
    document.querySelector("#resetReferralDemo").addEventListener("click", () => {
      WA.storage.remove("wa_seed_version");
      WA.storage.remove("wa_seeded");
      WA.seedData();
      renderAll();
      WA.toast("تمت إعادة البيانات التجريبية الأساسية.");
    });
    renderAll();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/payment.js`

```javascript
(() => {
  "use strict";

  const selectedFees = new Set();

  const requireSession = () => {
    if (!WA.storage.get("wa_workshop_session", null)) {
      window.location.href = "workshop-login.html";
      return false;
    }
    return true;
  };

  const getWorkshopId = () => WA.storage.get("wa_workshop_session", {})?.workshopId || WA.storage.get("wa_workshop_profile", {})?.id || "WS-101";
  const getUnpaidFees = () => WA.storage.get("wa_fees", []).filter((fee) => fee.status === "غير مدفوع" && (!fee.workshopId || fee.workshopId === getWorkshopId()));

  const renderFees = () => {
    const fees = getUnpaidFees();
    const mount = document.querySelector("#unpaidFeesList");
    if (!fees.length) {
      mount.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✓</div><h3>لا يوجد رصيد مستحق</h3><p>جميع الرسوم التجريبية مسددة.</p></div>';
      document.querySelector("#payButton").disabled = true;
      updateSummary();
      return;
    }
    fees.forEach((fee) => selectedFees.add(fee.id));
    mount.innerHTML = fees.map((fee) => `
      <label class="check-card" style="justify-content:space-between">
        <span style="display:flex;align-items:center;gap:9px">
          <input type="checkbox" class="fee-check" value="${WA.escapeHTML(fee.id)}" checked>
          <span><strong class="ltr">${WA.escapeHTML(fee.id)}</strong><br><small class="text-muted">${WA.escapeHTML(fee.requestId)} — ${WA.escapeHTML(fee.event)}</small></span>
        </span>
        <strong>${WA.formatMoney(fee.amount)}</strong>
      </label>`).join("");
    document.querySelectorAll(".fee-check").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) selectedFees.add(checkbox.value);
        else selectedFees.delete(checkbox.value);
        updateSummary();
      });
    });
    updateSummary();
  };

  const updateSummary = () => {
    const fees = getUnpaidFees().filter((fee) => selectedFees.has(fee.id));
    const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    document.querySelector("#summaryCount").textContent = fees.length;
    document.querySelector("#summaryTotal").textContent = WA.formatMoney(total);
    document.querySelector("#payButton").disabled = fees.length === 0;
  };

  const fieldInvalid = (name, invalid) => document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", invalid);

  const formatCard = (value) => value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const processPayment = (event) => {
    event.preventDefault();
    const number = document.querySelector("#cardNumber").value.replace(/\D/g, "");
    const name = document.querySelector("#cardName").value.trim();
    const expiry = document.querySelector("#expiry").value.trim();
    const cvv = document.querySelector("#cvv").value.replace(/\D/g, "");
    const valid = {
      cardNumber: number.length === 16,
      cardName: name.length >= 3,
      expiry: /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry),
      cvv: cvv.length === 3
    };
    Object.entries(valid).forEach(([key, value]) => fieldInvalid(key, !value));
    if (!Object.values(valid).every(Boolean)) return;

    const allFees = WA.storage.get("wa_fees", []);
    const feesToPay = allFees.filter((fee) => fee.status === "غير مدفوع" && selectedFees.has(fee.id) && (!fee.workshopId || fee.workshopId === getWorkshopId()));
    if (!feesToPay.length) {
      WA.toast("اختر رسمًا واحدًا على الأقل.");
      return;
    }

    const button = document.querySelector("#payButton");
    button.disabled = true;
    button.textContent = "جاري تنفيذ المحاكاة…";
    setTimeout(() => {
      const paymentId = WA.randomId("PAY", 5);
      const receiptId = WA.randomId("RCPT", 5);
      const total = feesToPay.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
      allFees.forEach((fee) => {
        if (selectedFees.has(fee.id) && fee.status === "غير مدفوع") {
          fee.status = "مدفوع";
          fee.paymentId = paymentId;
        }
      });
      WA.storage.set("wa_fees", allFees);
      const payments = WA.storage.get("wa_payments", []);
      payments.unshift({
        id: paymentId,
        receiptId,
        amount: total,
        method: "بطاقة مدى — محاكاة",
        cardLast4: number.slice(-4),
        status: "مكتمل",
        paidAt: new Date().toISOString(),
        workshopId: getWorkshopId(),
        feeIds: feesToPay.map((fee) => fee.id)
      });
      WA.storage.set("wa_payments", payments);
      window.location.href = `receipt.html?id=${encodeURIComponent(receiptId)}`;
    }, 1200);
  };

  const init = () => {
    if (!requireSession()) return;
    const profile = WA.storage.get("wa_workshop_profile", {});
    document.querySelector("#summaryWorkshop").textContent = profile.name;
    document.querySelector("#summaryEvent").textContent = profile.agreementEvent;
    renderFees();

    const cardNumber = document.querySelector("#cardNumber");
    cardNumber.addEventListener("input", () => {
      cardNumber.value = formatCard(cardNumber.value);
      document.querySelector("#cardPreviewNumber").textContent = cardNumber.value || "•••• •••• •••• ••••";
      fieldInvalid("cardNumber", false);
    });
    document.querySelector("#cardName").addEventListener("input", (event) => {
      document.querySelector("#cardPreviewName").textContent = event.target.value || "اسم الورشة";
      fieldInvalid("cardName", false);
    });
    document.querySelector("#expiry").addEventListener("input", (event) => {
      let value = event.target.value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = `${value.slice(0,2)}/${value.slice(2)}`;
      event.target.value = value;
      document.querySelector("#cardPreviewExpiry").textContent = value || "MM/YY";
      fieldInvalid("expiry", false);
    });
    document.querySelector("#cvv").addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 3);
      fieldInvalid("cvv", false);
    });
    document.querySelector("#paymentForm").addEventListener("submit", processPayment);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/receipt.js`

```javascript
(() => {
  "use strict";
  const init = () => {
    const receiptId = WA.getQuery("id");
    const payments = WA.storage.get("wa_payments", []);
    const payment = receiptId ? payments.find((item) => item.receiptId === receiptId) : payments[0];
    const profile = WA.storage.get("wa_workshop_profile", {});
    if (!payment) {
      document.querySelector("#receiptCard").innerHTML = '<div class="empty-state"><h3>لم يتم العثور على الإيصال</h3><p>ارجع إلى صفحة الدفع أو لوحة الورشة.</p><a class="btn btn-dark mt-16" href="workshop-dashboard.html">لوحة الورشة</a></div>';
      return;
    }
    document.querySelector("#receiptId").textContent = payment.receiptId;
    document.querySelector("#paymentId").textContent = payment.id;
    document.querySelector("#receiptWorkshop").textContent = profile.name || "ورشة تجريبية";
    document.querySelector("#receiptAmount").textContent = WA.formatMoney(payment.amount);
    document.querySelector("#receiptMethod").textContent = payment.method;
    document.querySelector("#receiptDate").textContent = WA.formatDate(payment.paidAt);
    document.querySelector("#receiptLast4").textContent = payment.cardLast4 ? `•••• ${payment.cardLast4}` : "غير متاح";
    document.querySelector("#receiptFees").textContent = `يشمل الإيصال الرسوم التالية: ${(payment.feeIds || []).join("، ") || "لا توجد تفاصيل"}. القيم المالية محاكاة للعرض ولا تمثل سياسة تجارية معتمدة.`;
    document.querySelector("#printReceipt").addEventListener("click", () => window.print());
  };
  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/join.js`

```javascript
(() => {
  "use strict";

  let currentStep = 1;
  const data = {
    establishment: {},
    contact: {},
    specialties: {},
    operations: {},
    agreements: {}
  };

  const subSpecialties = [
    "فحص كمبيوتر", "كهرباء محرك", "ميكانيكا محرك", "تكييف",
    "عفشة", "فرامل", "إطارات", "بطاريات", "زيوت وفلاتر",
    "ميزان أذرعة", "فحص شامل", "خدمات سريعة"
  ];

  const services = [
    "فحص وتشخيص", "صيانة دورية", "تغيير زيت", "تغيير فلاتر",
    "فحص فرامل", "تغيير بطارية", "تغيير كفرات", "فحص مكيف",
    "إصلاح كهرباء", "إصلاح ميكانيكا", "عفشة وتعليق", "خدمة أخرى"
  ];

  const normalizeDigits = (value, max) => value.replace(/\D/g, "").slice(0, max);
  const selectedValues = (selector) => [...document.querySelectorAll(`${selector}:checked`)].map((item) => item.value);
  const invalid = (name, value) => document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", value);

  const populateChecks = (mountId, name, values) => {
    document.querySelector(mountId).innerHTML = values.map((value) => `
      <label class="check-card"><input type="checkbox" name="${name}" value="${WA.escapeHTML(value)}">${WA.escapeHTML(value)}</label>`).join("");
  };

  const updateStepper = () => {
    document.querySelectorAll("[data-stepper]").forEach((item) => {
      const step = Number(item.dataset.stepper);
      item.classList.toggle("active", step === currentStep);
      item.classList.toggle("done", step < currentStep);
    });
    document.querySelectorAll("[data-join-step]").forEach((panel) => panel.classList.toggle("active", Number(panel.dataset.joinStep) === currentStep));
    window.scrollTo({ top: document.querySelector("#joinWizard").offsetTop - 80, behavior: "smooth" });
    WA.storage.set("wa_join_draft", { data, currentStep });
  };

  const validateStep1 = () => {
    const values = {
      workshopName: document.querySelector("#joinWorkshopName").value.trim(),
      ownerName: document.querySelector("#joinOwnerName").value.trim(),
      commercialNo: normalizeDigits(document.querySelector("#commercialNo").value, 10),
      taxNo: normalizeDigits(document.querySelector("#taxNo").value, 15),
      description: document.querySelector("#workshopDescription").value.trim()
    };
    const checks = {
      workshopName: values.workshopName.length >= 3,
      ownerName: values.ownerName.length >= 3,
      commercialNo: values.commercialNo.length === 10
    };
    Object.entries(checks).forEach(([key, valid]) => invalid(key, !valid));
    if (!Object.values(checks).every(Boolean)) return false;
    data.establishment = values;
    return true;
  };

  const validateStep2 = () => {
    const values = {
      city: document.querySelector("#joinCity").value,
      district: document.querySelector("#joinDistrict").value.trim(),
      address: document.querySelector("#joinAddress").value.trim(),
      mobile: normalizeDigits(document.querySelector("#joinMobile").value, 10),
      whatsapp: normalizeDigits(document.querySelector("#joinWhatsapp").value, 10),
      email: document.querySelector("#joinEmail").value.trim(),
      mapsLink: document.querySelector("#mapsLink").value.trim()
    };
    const checks = {
      joinCity: Boolean(values.city),
      district: values.district.length >= 2,
      address: values.address.length >= 5,
      joinMobile: /^05\d{8}$/.test(values.mobile),
      joinWhatsapp: /^05\d{8}$/.test(values.whatsapp)
    };
    Object.entries(checks).forEach(([key, valid]) => invalid(key, !valid));
    if (!Object.values(checks).every(Boolean)) return false;
    data.contact = values;
    return true;
  };

  const validateStep3 = () => {
    const values = {
      mainSpecialty: document.querySelector("#mainSpecialty").value,
      subSpecialties: selectedValues('input[name="subSpecialties"]'),
      carMakes: selectedValues('input[name="carMakes"]'),
      services: selectedValues('input[name="joinServices"]')
    };
    const checks = {
      mainSpecialty: Boolean(values.mainSpecialty),
      subSpecialties: values.subSpecialties.length > 0,
      carMakes: values.carMakes.length > 0,
      services: values.services.length > 0
    };
    Object.entries(checks).forEach(([key, valid]) => invalid(key, !valid));
    if (!Object.values(checks).every(Boolean)) return false;
    data.specialties = values;
    return true;
  };

  const collectStep4 = () => {
    data.operations = {
      commercialFile: document.querySelector("#commercialFile").files[0]?.name || "غير مرفق",
      licenseFile: document.querySelector("#licenseFile").files[0]?.name || "غير مرفق",
      openingTime: document.querySelector("#openingTime").value,
      closingTime: document.querySelector("#closingTime").value,
      availability: document.querySelector("#availability").value,
      dailyCapacity: document.querySelector("#dailyCapacity").value
    };
    return true;
  };

  const renderReview = () => {
    const e = data.establishment;
    const c = data.contact;
    const s = data.specialties;
    const o = data.operations;
    document.querySelector("#joinReview").innerHTML = `
      <div class="review-block">
        <h4>المنشأة</h4>
        <dl>
          <div><dt>اسم الورشة</dt><dd>${WA.escapeHTML(e.workshopName)}</dd></div>
          <div><dt>المسؤول</dt><dd>${WA.escapeHTML(e.ownerName)}</dd></div>
          <div><dt>السجل التجاري</dt><dd class="ltr">${WA.escapeHTML(e.commercialNo)}</dd></div>
        </dl>
      </div>
      <div class="review-block">
        <h4>الموقع والتواصل</h4>
        <dl>
          <div><dt>المدينة</dt><dd>${WA.escapeHTML(c.city)}</dd></div>
          <div><dt>الحي</dt><dd>${WA.escapeHTML(c.district)}</dd></div>
          <div><dt>واتساب</dt><dd class="ltr">${WA.escapeHTML(c.whatsapp)}</dd></div>
        </dl>
      </div>
      <div class="review-block">
        <h4>التخصص والخدمات</h4>
        <dl>
          <div><dt>الرئيسي</dt><dd>${WA.escapeHTML(s.mainSpecialty)}</dd></div>
          <div><dt>الفرعية</dt><dd>${WA.escapeHTML(s.subSpecialties.join("، "))}</dd></div>
          <div><dt>الخدمات</dt><dd>${WA.escapeHTML(s.services.join("، "))}</dd></div>
        </dl>
      </div>
      <div class="review-block">
        <h4>التشغيل والوثائق</h4>
        <dl>
          <div><dt>ساعات العمل</dt><dd class="ltr">${WA.escapeHTML(o.openingTime)} — ${WA.escapeHTML(o.closingTime)}</dd></div>
          <div><dt>التوفر</dt><dd>${WA.escapeHTML(o.availability)}</dd></div>
          <div><dt>الوثائق</dt><dd>${WA.escapeHTML(o.commercialFile)}، ${WA.escapeHTML(o.licenseFile)}</dd></div>
        </dl>
      </div>`;
  };

  const goNext = (step) => {
    let valid = true;
    if (currentStep === 1) valid = validateStep1();
    if (currentStep === 2) valid = validateStep2();
    if (currentStep === 3) valid = validateStep3();
    if (currentStep === 4) valid = collectStep4();
    if (!valid) {
      WA.toast("أكمل الحقول المطلوبة قبل المتابعة.");
      return;
    }
    currentStep = step;
    if (currentStep === 5) renderReview();
    updateStepper();
  };

  const submit = (event) => {
    event.preventDefault();
    const agreements = ["agreePartnership", "agreeReferrals", "agreeFees", "agreeTrust"];
    const allAgreed = agreements.every((id) => document.querySelector(`#${id}`).checked);
    invalid("agreements", !allAgreed);
    if (!allAgreed) {
      WA.toast("يجب الموافقة على جميع بنود الشراكة.");
      return;
    }
    data.agreements = {
      partnership: true,
      referrals: true,
      fees: true,
      trust: true
    };
    const applicationId = WA.randomId("JOIN", 5);
    const application = {
      id: applicationId,
      createdAt: new Date().toISOString(),
      status: "قيد المراجعة",
      reviewNote: "تم استلام الطلب وسيتم التحقق من البيانات والوثائق والتخصصات.",
      ...JSON.parse(JSON.stringify(data))
    };
    const applications = WA.storage.get("wa_join_applications", []);
    applications.unshift(application);
    WA.storage.set("wa_join_applications", applications);
    WA.storage.remove("wa_join_draft");

    document.querySelector("#joinWizard").classList.add("hidden");
    document.querySelector("#joinSuccess").classList.remove("hidden");
    document.querySelector("#joinApplicationId").textContent = applicationId;
    document.querySelector("#joinSuccessName").textContent = data.establishment.workshopName;
    document.querySelector("#joinSuccessPhone").textContent = data.contact.mobile;
    document.querySelector("#joinStatusLink").href = `join-status.html?id=${encodeURIComponent(applicationId)}&phone=${encodeURIComponent(data.contact.mobile)}`;
    window.scrollTo({ top: document.querySelector("#joinSuccess").offsetTop - 80, behavior: "smooth" });
  };

  const restoreDraft = () => {
    const draft = WA.storage.get("wa_join_draft", null);
    if (!draft?.data) return;
    Object.assign(data, draft.data);
    currentStep = Math.min(5, Math.max(1, Number(draft.currentStep || 1)));
    const e = data.establishment || {};
    const c = data.contact || {};
    const s = data.specialties || {};
    const o = data.operations || {};
    document.querySelector("#joinWorkshopName").value = e.workshopName || "";
    document.querySelector("#joinOwnerName").value = e.ownerName || "";
    document.querySelector("#commercialNo").value = e.commercialNo || "";
    document.querySelector("#taxNo").value = e.taxNo || "";
    document.querySelector("#workshopDescription").value = e.description || "";
    document.querySelector("#joinCity").value = c.city || "";
    document.querySelector("#joinDistrict").value = c.district || "";
    document.querySelector("#joinAddress").value = c.address || "";
    document.querySelector("#joinMobile").value = c.mobile || "";
    document.querySelector("#joinWhatsapp").value = c.whatsapp || "";
    document.querySelector("#joinEmail").value = c.email || "";
    document.querySelector("#mapsLink").value = c.mapsLink || "";
    document.querySelector("#mainSpecialty").value = s.mainSpecialty || "";
    (s.subSpecialties || []).forEach((value) => { const el = document.querySelector(`input[name="subSpecialties"][value="${CSS.escape(value)}"]`); if (el) el.checked = true; });
    (s.carMakes || []).forEach((value) => { const el = document.querySelector(`input[name="carMakes"][value="${CSS.escape(value)}"]`); if (el) el.checked = true; });
    (s.services || []).forEach((value) => { const el = document.querySelector(`input[name="joinServices"][value="${CSS.escape(value)}"]`); if (el) el.checked = true; });
    document.querySelector("#openingTime").value = o.openingTime || "08:00";
    document.querySelector("#closingTime").value = o.closingTime || "22:00";
    document.querySelector("#availability").value = o.availability || "متوفر غالبًا";
    document.querySelector("#dailyCapacity").value = o.dailyCapacity || "أقل من 5 سيارات";
  };

  const init = () => {
    WA.fillSelect("#joinCity", WA.cities, "اختر المدينة أو المحافظة");
    populateChecks("#subSpecialtiesGrid", "subSpecialties", subSpecialties);
    populateChecks("#carMakesGrid", "carMakes", [...WA.makes.filter((item) => item !== "أخرى"), "جميع الأنواع"]);
    populateChecks("#servicesGrid", "joinServices", services);
    restoreDraft();

    ["commercialNo", "taxNo", "joinMobile", "joinWhatsapp"].forEach((id) => {
      const element = document.querySelector(`#${id}`);
      const max = id === "taxNo" ? 15 : 10;
      element.addEventListener("input", () => { element.value = normalizeDigits(element.value, max); });
    });
    document.querySelector("#commercialFile").addEventListener("change", (event) => {
      document.querySelector("#commercialFileName").textContent = event.target.files[0]?.name || "لم يتم اختيار ملف";
    });
    document.querySelector("#licenseFile").addEventListener("change", (event) => {
      document.querySelector("#licenseFileName").textContent = event.target.files[0]?.name || "لم يتم اختيار ملف";
    });

    document.querySelectorAll(".join-next").forEach((button) => button.addEventListener("click", () => goNext(Number(button.dataset.nextStep))));
    document.querySelectorAll(".join-back").forEach((button) => button.addEventListener("click", () => {
      currentStep = Number(button.dataset.prevStep);
      updateStepper();
    }));
    document.querySelector("#joinForm").addEventListener("submit", submit);
    updateStepper();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/join-status.js`

```javascript
(() => {
  "use strict";

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);

  const render = (application) => {
    document.querySelector("#joinStatusResult").classList.remove("hidden");
    document.querySelector("#statusWorkshopName").textContent = application.establishment.workshopName;
    document.querySelector("#statusMeta").textContent = `${application.id} — أُرسل في ${WA.formatDate(application.createdAt)}`;
    document.querySelector("#statusBadge").className = `badge ${WA.statusBadgeClass(application.status)}`;
    document.querySelector("#statusBadge").textContent = application.status;
    const stages = [
      ["تم استلام الطلب", true],
      ["مراجعة بيانات المنشأة", true],
      ["مراجعة التخصصات والوثائق", application.status !== "قيد المراجعة"],
      ["التواصل مع الورشة", ["مقبول مبدئيًا", "مقبول"].includes(application.status)],
      ["تفعيل الشراكة", application.status === "مقبول"]
    ];
    const currentIndex = stages.reduce((last, item, index) => item[1] ? index : last, 0);
    document.querySelector("#joinTimeline").innerHTML = stages.map(([title, done], index) => `
      <div class="timeline-item ${done ? "done" : ""} ${index === currentIndex && application.status !== "مقبول" ? "current" : ""}">
        <span class="timeline-dot"></span><h4>${WA.escapeHTML(title)}</h4><p>${done ? "مكتملة" : "بانتظار المراجعة"}</p>
      </div>`).join("");
    document.querySelector("#joinStatusSummary").innerHTML = `
      <div class="info-row"><div class="info-label">المدينة</div><div class="info-value">${WA.escapeHTML(application.contact.city)}</div></div>
      <div class="info-row"><div class="info-label">التخصص الرئيسي</div><div class="info-value">${WA.escapeHTML(application.specialties.mainSpecialty)}</div></div>
      <div class="info-row"><div class="info-label">السيارات</div><div class="info-value">${WA.escapeHTML(application.specialties.carMakes.join("، "))}</div></div>
      <div class="info-row"><div class="info-label">واتساب</div><div class="info-value ltr">${WA.escapeHTML(application.contact.whatsapp)}</div></div>`;
    document.querySelector("#joinReviewNote").textContent = application.reviewNote;
    window.scrollTo({ top: document.querySelector("#joinStatusResult").offsetTop - 80, behavior: "smooth" });
  };

  const search = (event) => {
    event?.preventDefault();
    const id = document.querySelector("#statusId").value.trim();
    const phone = normalizePhone(document.querySelector("#statusPhone").value);
    document.querySelector('[data-field="statusId"]').classList.toggle("invalid", !id);
    document.querySelector('[data-field="statusPhone"]').classList.toggle("invalid", !/^05\d{8}$/.test(phone));
    if (!id || !/^05\d{8}$/.test(phone)) return;
    const application = WA.storage.get("wa_join_applications", []).find((item) => item.id.toUpperCase() === id.toUpperCase() && item.contact.mobile === phone);
    if (!application) {
      document.querySelector("#joinStatusResult").classList.add("hidden");
      WA.toast("لم نجد طلب انضمام مطابقًا للبيانات.");
      return;
    }
    render(application);
  };

  const init = () => {
    const queryId = WA.getQuery("id");
    const queryPhone = WA.getQuery("phone");
    if (queryId) document.querySelector("#statusId").value = queryId;
    if (queryPhone) document.querySelector("#statusPhone").value = queryPhone;
    document.querySelector("#statusPhone").addEventListener("input", (event) => { event.target.value = normalizePhone(event.target.value); });
    document.querySelector("#joinStatusForm").addEventListener("submit", search);
    if (queryId && queryPhone) setTimeout(search, 80);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
```

## `assets/icons/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="18" fill="#0b1729"/>
  <path d="M15 38l5-15c1-3 4-5 7-5h10c3 0 6 2 7 5l5 15" fill="none" stroke="#f2ca7b" stroke-width="4" stroke-linecap="round"/>
  <path d="M12 38h40v9c0 3-2 5-5 5H17c-3 0-5-2-5-5z" fill="#dba94c"/>
  <circle cx="22" cy="44" r="3" fill="#0b1729"/><circle cx="42" cy="44" r="3" fill="#0b1729"/>
</svg>
```
