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
assert(!noMatch.partner && noMatch.reason.includes('لا يوجد شريك'), 'No-match state failed');
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
