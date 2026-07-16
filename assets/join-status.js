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
