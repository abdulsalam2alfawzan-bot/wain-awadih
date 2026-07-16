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
