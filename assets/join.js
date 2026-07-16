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
