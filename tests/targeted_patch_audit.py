from pathlib import Path
import re, json, sys

ROOT=Path(__file__).resolve().parents[1]
issues=[]
checks=[]

def check(name, ok, detail=''):
    checks.append({'name':name,'ok':bool(ok),'detail':'' if ok else detail})
    if not ok: issues.append(f'{name}: {detail}')

customer=(ROOT/'customer.html').read_text()
track=(ROOT/'track.html').read_text()
join=(ROOT/'join.html').read_text()
join_js=(ROOT/'assets/join.js').read_text()
dashboard=(ROOT/'workshop-dashboard.html').read_text()
dash_js=(ROOT/'assets/dashboard.js').read_text()
common=(ROOT/'assets/common.js').read_text()
styles=(ROOT/'assets/styles.css').read_text()

check('ترتيب التواصل بعد بطاقة الشريك وقبل رابط الطلب', customer.find('id="partnerResult"') < customer.find('contact-card mt-16') < customer.find('private-link-card mt-24'), 'ترتيب customer.html غير صحيح')
check('إزالة إرسال الرابط عبر واتساب', 'sendPrivateLinkWhatsapp' not in customer and 'إرسال رابط الطلب' not in customer, 'ما زال عنصر إرسال الرابط موجودًا')
check('رابط الطلب في نهاية صفحة العميل', customer.rfind('private-link-card mt-24') > customer.rfind('id="partnerResult"'), 'رابط الطلب ليس في النهاية')
check('رابط الطلب والبديل في المتابعة', 'id="requestLinkPanel"' in track and 'alternative' in (ROOT/'assets/track.js').read_text(), 'لوحة الرابط أو البديل ناقصة')
check('التنقل العام أعلى الصفحات', 'data-go-back' in common and 'الرئيسية' in common and 'السابق' in common, 'أزرار التنقل العامة ناقصة')
check('إرشاد أسفل الصفحات', 'page-guidance' in common, 'شرح الصفحة السفلي غير موجود')
check('ساعات أسبوعية مستقلة', 'dailyScheduleEditor' in join and 'السبت' in (ROOT/'assets/automotive-data.js').read_text() and 'period2' in join_js, 'محرر الساعات الأسبوعي ناقص')
check('التحقق الزمني للفترات', 'row.period1.from<row.period1.to' in join_js and 'row.period2.from<row.period2.to' in join_js, 'لا يوجد تحقق صحيح من ترتيب الوقت')
check('خصومات جميع أو مختارة', 'joinDiscountScope' in join and 'joinDiscountServices' in join and 'joinDiscountEnd' in join, 'حقول الخصم الشرطية ناقصة')
check('خصم لوحة الشريك مترابط', 'name="discountScope"' in dashboard and 'id="discountEnd"' in dashboard and 'updateDiscountForm' in dash_js, 'خصومات Dashboard ناقصة')
check('نموذج السطحة المخصص', all(x in join for x in ['operationCardNumber','operationCardExpiry','towVehiclePlate','towVehicleTypes']), 'حقول السطحة الأساسية ناقصة')
check('فصل وثائق السطحة عن السجل التجاري', 'id="towDocuments"' in join and 'id="businessDocuments"' in join, 'أقسام الوثائق غير منفصلة')
check('نماذج القطع والصيانة المخصصة', all(x in join for x in ['maintenanceAdaptive','partsAdaptive','partTypesJoin','maintenanceServicesJoin']), 'حقول القطاعات المخصصة ناقصة')
check('Dashboard يغطي الأقسام المطلوبة', all(x in dashboard for x in ['referrals','ratings','discounts','objections','billing','profile']), 'أقسام لوحة الشريك ناقصة')
check('لا إخفاء للصفحة عند تعطل JavaScript', 'body { opacity: 0' not in styles, 'CSS يخفي الصفحة افتراضيًا')

# Visible terms in HTML only
banned=[]
for p in ROOT.glob('*.html'):
    text=p.read_text()
    for term in ['MVP','Seed','تجريبي']:
        if term in text: banned.append(f'{p.name}:{term}')
check('إزالة أوصاف النسخة المحدودة من الواجهات', not banned, ', '.join(banned))

print(json.dumps({'checks':checks,'issues':issues},ensure_ascii=False,indent=2))
sys.exit(1 if issues else 0)
