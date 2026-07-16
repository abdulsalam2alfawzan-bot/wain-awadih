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
  console,
  Date,
  Math,
  Intl,
  JSON,
  Array,
  Object,
  String,
  Number,
  Boolean,
  RegExp,
  Error,
  Map,
  Set,
  Uint8Array,
  localStorage: new LocalStorageMock(),
  crypto: webcrypto,
  setTimeout,
  clearTimeout
};
context.window = context;
context.globalThis = context;
vm.createContext(context);

const root = path.resolve(__dirname, '..');
[
  'assets/config.js',
  'assets/automotive-data.js',
  'assets/storage.js',
  'assets/seed.js',
  'assets/ai-engine.js',
  'assets/matching-engine.js',
  'assets/lifecycle.js'
].forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file }));

const { WA } = context;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const log = (message) => console.log(`✓ ${message}`);

WA.Storage.init();
WA.Seed.run();

assert(WA.Config.storageKeys.every((key) => context.localStorage.getItem(key) !== null), 'All storage keys should exist');
log('إنشاء جميع مفاتيح localStorage المطلوبة');

const partners = WA.Storage.get('wa_partners');
assert(partners.length === 60, `Expected 60 demo partners, got ${partners.length}`);
assert(partners.every((partner) => partner.isDemo && partner.demoNotice), 'All seed partners must be marked demo');
log('Seed غير هدّام وموسوم بوضوح كتجريبي');

const danger = WA.AIEngine.assess({ description: 'الفرامل ما تمسك وفيه ريحة بنزين والسيارة واقفة في طريق سريع' });
assert(danger.urgency === 'خطرة' && danger.questions.length === 0, 'Danger path failed');
log('اكتشاف الأعراض الخطرة دون طرح أسئلة أو طمأنة غير مناسبة');

const clear = WA.AIEngine.assess({ description: 'السيارة ترج بقوة إذا وقفت عند الإشارة وتظهر لمبة المكينة والعزم صار ضعيف' });
assert(clear.specialty === 'ميكانيكا وكهرباء محرك', 'Engine classification failed');
assert(clear.questions.length <= 3, 'Question limit exceeded');
log('التوجيه الاحتمالي والأسئلة من صفر إلى ثلاثة غالبًا');

const vague = WA.AIEngine.assess({ description: 'فيها مشكلة' });
assert(vague.expectedIssue.includes('لا تتوفر معلومات كافية'), 'Insufficient-information fallback failed');
log('عدم اختلاق مشكلة متوقعة عند نقص المعلومات');

const payload = {
  serviceType: 'problem',
  customer: { firstName: 'اختبار', phone: '0551234567' },
  consents: { privacyAccepted: true, termsAccepted: true, marketingMessages: false },
  vehicle: { make: 'تويوتا', model: 'كامري', year: '2022', mileage: 'من 50 إلى 100 ألف كم' },
  city: 'بريدة',
  problem: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة',
  ai: WA.AIEngine.finalize({ description: 'السيارة ترج إذا وقفت وتظهر لمبة المكينة', vehicle: { make: 'تويوتا' }, questions: [], answers: [] })
};
const created = WA.Lifecycle.createRequest(payload);
assert(created.request.publicToken && !created.request.publicToken.includes(payload.customer.phone), 'Public token leaked phone');
log('إنشاء publicToken عشوائي دون رقم الجوال');

const match = WA.Matching.match({ request: created.request, excludedPartnerIds: [] });
assert(match.partner && match.partner.city === 'بريدة', 'Matching fabricated or ignored city');
assert(match.partner.coverageCities.includes('بريدة'), 'Coverage mismatch');
log('مطابقة تعتمد على المدينة والتغطية دون تعديل بيانات الشريك');

const referral1 = WA.Lifecycle.createReferral(created.request.id, match.partner.id, match.reason);
WA.Lifecycle.markReferralShown(referral1.id);
assert(WA.Storage.findById('wa_requests', created.request.id).activeReferralId === referral1.id, 'Referral not attached');
log('إنشاء الطلب والإحالة قبل عرض الشريك');

const serviceRequests = [
  { serviceType: 'parts', city: 'بريدة', maintenanceService: '' },
  { serviceType: 'tow', city: 'بريدة', preciseLocation: 'حي تجريبي', vehicleMoves: 'لا تتحرك' },
  { serviceType: 'maintenance', city: 'بريدة', maintenanceService: 'تغيير الزيت والفلاتر' }
];
for (const item of serviceRequests) {
  const probe = { ...created.request, ...item, id: `PROBE-${item.serviceType}`, activeReferralId: '', referralCount: 0 };
  const result = WA.Matching.match({ request: probe, excludedPartnerIds: [] });
  assert(result.partner && result.partner.type === WA.Matching.typeForService(item.serviceType), `Matching failed for ${item.serviceType}`);
}
log('نجاح المطابقة للمسارات الأربعة من بيانات Seed');

const noMatchProbe = { ...created.request, id: 'PROBE-NOMATCH', city: 'البدائع', serviceType: 'problem' };
const noMatch = WA.Matching.match({ request: noMatchProbe, excludedPartnerIds: [] });
assert(!noMatch.partner && noMatch.reason.includes('لا يوجد شريك'), 'No-match state failed');
log('إظهار حالة واضحة عند عدم وجود تطابق دون اختلاق شريك');

WA.Lifecycle.saveDraft({ screen: 'vehicle', serviceType: 'problem', marker: 'qa' });
assert(WA.Lifecycle.loadDraft().marker === 'qa', 'Draft restoration failed');
WA.Lifecycle.clearDraft();
assert(WA.Lifecycle.loadDraft() === null, 'Draft clearing failed');
log('حفظ المسودة واستعادتها بعد إعادة التحميل');

WA.Lifecycle.confirmArrival(referral1.id, 'customer');
assert(!WA.Storage.get('wa_fees').some((fee) => fee.referralId === referral1.id), 'Fee created on arrival only');
log('عدم استحقاق الرسم عند الوصول وحده');

WA.Lifecycle.confirmIntake(referral1.id, 'partner');
const referralFee = WA.Storage.get('wa_fees').filter((fee) => fee.referralId === referral1.id);
assert(referralFee.length === 1, 'Fee not created after arrival + intake');
WA.Lifecycle.ensureFee(referral1.id);
assert(WA.Storage.get('wa_fees').filter((fee) => fee.referralId === referral1.id).length === 1, 'Duplicate fee created');
log('استحقاق رسم واحد فقط بعد الوصول وبدء الاستقبال أو الفحص');

const excluded1 = WA.Lifecycle.requestAlternative(created.request.id, 'لم يتم الرد');
const requestAfter1 = WA.Storage.findById('wa_requests', created.request.id);
const match2 = WA.Matching.match({ request: requestAfter1, excludedPartnerIds: excluded1 });
assert(match2.partner && match2.partner.id !== match.partner.id, 'Previous partner not excluded');
const referral2 = WA.Lifecycle.createReferral(created.request.id, match2.partner.id, match2.reason);
const excluded2 = WA.Lifecycle.requestAlternative(created.request.id, 'لم نتفق على الموعد');
const match3 = WA.Matching.match({ request: WA.Storage.findById('wa_requests', created.request.id), excludedPartnerIds: excluded2 });
assert(match3.partner && !excluded2.includes(match3.partner.id), 'Third partner exclusion failed');
WA.Lifecycle.createReferral(created.request.id, match3.partner.id, match3.reason);
let fourthBlocked = false;
try { WA.Lifecycle.requestAlternative(created.request.id, 'سبب آخر'); } catch (_) { fourthBlocked = true; }
assert(fourthBlocked, 'Fourth referral should be blocked');
log('ثلاث إحالات بحد أقصى مع استبعاد الشركاء السابقين');

let ratingBlocked = false;
const payload2 = { ...payload, customer: { firstName: 'اختبار2', phone: '0551234568' } };
const created2 = WA.Lifecycle.createRequest(payload2);
const matchSecondRequest = WA.Matching.match({ request: created2.request, excludedPartnerIds: [] });
const untouchedReferral = WA.Lifecycle.createReferral(created2.request.id, matchSecondRequest.partner.id, matchSecondRequest.reason);
try {
  WA.Lifecycle.createRating({ requestId: created2.request.id, referralId: untouchedReferral.id, overall: 5, treatment: 5, commitment: 5, clarity: 5, serviceQuality: 5, fairness: 5, recommend: 'yes' });
} catch (_) { ratingBlocked = true; }
assert(ratingBlocked, 'Unverified rating should be blocked');
log('منع التقييم قبل تجربة فعلية مؤكدة');

const rating = WA.Lifecycle.createRating({ requestId: created.request.id, referralId: referral1.id, overall: 5, treatment: 5, commitment: 4, clarity: 5, serviceQuality: 4, fairness: 4, recommend: 'yes', comment: '<script>test</script> تجربة جيدة' });
assert(rating.isVerified && !rating.comment.includes('<'), 'Rating sanitization/verification failed');
log('تقييم موثق وتعقيم المحتوى المدخل');

const objection = WA.Lifecycle.createObjection({ partnerId: match.partner.id, referralId: referral1.id, type: 'referral', reason: 'العميل لم يصل', details: 'اعتراض تجريبي' });
assert(objection.status === 'new', 'Objection not created');
assert(WA.Storage.get('wa_fees').find((fee) => fee.referralId === referral1.id).status === 'disputed', 'Disputed fee not held');
log('تعليق الرسم المتنازع عليه عند الاعتراض');

const feePartner = match.partner.id;
for (let i = 0; i < 4; i += 1) {
  const rid = `REF-QA-${i}`;
  const qreq = `REQ-QA-${i}`;
  WA.Storage.upsert('wa_requests', { id: qreq, humanId: `WA-QA-${i}`, publicToken: `qa_token_${i}`, customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'problem', city: 'بريدة', status: 'intake_started', lastActivityAt: WA.Storage.now() });
  WA.Storage.upsert('wa_referrals', { id: rid, requestId: qreq, partnerId: feePartner, order: 1, status: 'intake_started', customerArrivalConfirmedAt: WA.Storage.now(), partnerIntakeConfirmedAt: WA.Storage.now() });
  WA.Storage.insertUnique('wa_fees', { id: `FEE-QA-${i}`, referralId: rid, partnerId: feePartner, amount: 25, event: 'arrival_and_intake_started', status: 'unclaimed', eligibleAt: WA.Storage.now() }, ['referralId']);
}
const claim = WA.Lifecycle.issueClaim(feePartner, 'threshold');
assert(claim && claim.amount >= 100, 'Threshold claim not issued');
log('إصدار مطالبة عند بلوغ 100 ريال');

const payment = WA.Lifecycle.registerPayment(claim.id, 'demo_bank_transfer');
assert(payment.status === 'paid' && WA.Storage.findById('wa_claims', claim.id).status === 'paid', 'Payment not applied');
log('تسجيل دفع وإيصال تجريبي وإغلاق المطالبة');

const feePartnerIdsBeforeMonthly = new Set(WA.Storage.get('wa_fees').map((row) => row.partnerId));
const monthlyPartner = partners.find((row) => row.id !== feePartner && row.type === 'workshop' && !feePartnerIdsBeforeMonthly.has(row.id));
WA.Storage.upsert('wa_requests', { id: 'REQ-MONTHLY-QA', humanId: 'WA-MONTHLY-QA', publicToken: 'monthly_qa_token', customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'problem', city: monthlyPartner.city, status: 'intake_started', lastActivityAt: WA.Storage.now() });
WA.Storage.upsert('wa_referrals', { id: 'REF-MONTHLY-QA', requestId: 'REQ-MONTHLY-QA', partnerId: monthlyPartner.id, order: 1, status: 'intake_started', customerArrivalConfirmedAt: WA.Storage.now(), partnerIntakeConfirmedAt: WA.Storage.now() });
WA.Storage.upsert('wa_fees', { id: 'FEE-MONTHLY-QA', referralId: 'REF-MONTHLY-QA', partnerId: monthlyPartner.id, amount: 25, event: 'arrival_and_intake_started', status: 'unclaimed', eligibleAt: new Date(Date.now() - 40 * 86400000).toISOString() });
WA.Lifecycle.maybeIssueClaims();
const monthlyClaim = WA.Storage.get('wa_claims').find((row) => row.partnerId === monthlyPartner.id && row.reason === 'monthly_settlement');
assert(monthlyClaim && monthlyClaim.amount === 25, 'Monthly settlement claim failed');
log('إصدار مطالبة شهرية حتى لو كان الرصيد أقل من 100 ريال');

WA.Storage.upsert('wa_claims', { ...monthlyClaim, status: 'issued', dueAt: new Date(Date.now() - 86400000).toISOString() });
WA.Lifecycle.runSweep();
const suspendedPartner = WA.Storage.findById('wa_partners', monthlyPartner.id);
assert(suspendedPartner.paymentStatus === 'overdue' && suspendedPartner.partnershipStatus === 'suspended_financial', 'Overdue suspension failed');
log('تعليق الشريك المتأخر عن السداد واستبعاده من المطابقة');
const monthlyPayment = WA.Lifecycle.registerPayment(monthlyClaim.id, 'demo_bank_transfer');
const reactivatedPartner = WA.Storage.findById('wa_partners', monthlyPartner.id);
assert(monthlyPayment.status === 'paid' && reactivatedPartner.paymentStatus === 'current' && reactivatedPartner.partnershipStatus === 'active', 'Reactivation after payment failed');
log('إعادة تفعيل الشريك بعد تسوية المطالبة');

const oldRequest = WA.Storage.upsert('wa_requests', { id: 'REQ-OLD-QA', humanId: 'WA-OLD-QA', publicToken: 'old_qa_token', customerId: created.customer.id, vehicleId: created.vehicle.id, serviceType: 'parts', city: 'بريدة', status: 'referred', lastActivityAt: new Date(Date.now() - 6 * 86400000).toISOString() });
WA.Lifecycle.runSweep();
assert(WA.Storage.findById('wa_requests', oldRequest.id).status === 'administratively_closed', 'Administrative closure failed');
log('الإغلاق الإداري بعد خمسة أيام دون حذف السجل');

const issues = WA.Storage.integrityCheck();
assert(issues.length === 0, `Integrity issues: ${issues.join('; ')}`);
log('سلامة العلاقات المرجعية بين الجداول');

console.log('\nALL_UNIT_QA_PASSED');
