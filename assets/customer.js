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
