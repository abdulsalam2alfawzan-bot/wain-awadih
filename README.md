# وين أوديها — نسخة Header وFooter الموحدين

هذه النسخة تثبّت Header وFooter وشعار «وين أوديها» داخل كل صفحة HTML مباشرة، دون الاعتماد على حقن الواجهة بعد تحميل JavaScript.

## التشغيل محليًا

من داخل مجلد المشروع شغّل:

```bash
python -m http.server 8000
```

ثم افتح:

```text
http://localhost:8000/index.html
```

يفضل التشغيل عبر خادم محلي بدل فتح الملفات مباشرة، حتى تعمل الروابط والتخزين المحلي بصورة مماثلة للاستضافة.

## الصفحات

- `index.html` — الرئيسية.
- `customer.html` — رحلة العميل ونتيجة الترشيح.
- `track.html` — متابعة الطلب والتقييم والبدائل.
- `join.html` — انضمام الشريك.
- `join-status.html` — متابعة طلب الانضمام.
- `workshop-login.html` — دخول الشريك.
- `workshop-dashboard.html` — لوحة الشريك.
- `payment.html` — سداد الفاتورة.
- `receipt.html` — إيصال السداد.
- `privacy.html` — سياسة الخصوصية.
- `terms.html` — الشروط وحدود المسؤولية.
- `404.html` — الصفحة غير الموجودة.

## الواجهة الموحدة

كل صفحة تحتوي داخل HTML نفسه على:

- Header موحد بشعار `assets/images/logo.png`.
- رابط الشعار إلى `index.html`.
- قائمة تنقل متجاوبة مع الجوال.
- مؤشر للصفحة الحالية باستخدام `aria-current="page"`.
- Footer موحد بالشعار نفسه وروابط الموقع الأساسية.

## البيانات والوظائف

لم تتغير بنية `localStorage` أو منطق الطلبات والإحالات والتقييمات والاعتراضات والفواتير والمدفوعات. التعديل التشغيلي الوحيد في `assets/common.js` هو تشغيل قائمة الجوال الموجودة داخل HTML بدل إنشاء Header وFooter برمجيًا.

## التحقق

راجع:

- `HEADER_FOOTER_QA_REPORT.md`
- `HEADER_FOOTER_MATRIX.md`
- `tests/header_footer_qa.json`
- `FULL_MODIFIED_SOURCE.md`
