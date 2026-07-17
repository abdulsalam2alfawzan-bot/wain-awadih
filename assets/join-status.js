(() => {
  "use strict";
  const $ = WA.UI.qs;
  const show = (name) => { $("#joinLookup").hidden = name !== "lookup"; $("#joinResult").hidden = name !== "result"; $("#joinNotFound").hidden = name !== "notFound"; };
  const render = (application) => {
    $("#joinResultContent").innerHTML = `<div class="section-head"><div class="kicker">${WA.UI.escapeHtml(application.applicationNumber)}</div><h1>${WA.UI.escapeHtml(application.businessName)}</h1><p>${WA.UI.escapeHtml(application.statusLabel || application.status || "قيد المراجعة")}</p></div><div class="guidance-grid"><div class="guidance-item"><span>نوع الشريك</span><strong>${WA.UI.escapeHtml(WA.Config.partnerTypes[application.partnerType])}</strong></div><div class="guidance-item"><span>الموقع</span><strong>${WA.UI.escapeHtml([application.region, application.city].filter(Boolean).join(" — "))}</strong></div><div class="guidance-item"><span>التغطية</span><strong>${WA.UI.escapeHtml((application.coverageCities || [application.city].filter(Boolean)).join("، "))}</strong></div><div class="guidance-item"><span>تاريخ التقديم</span><strong>${WA.UI.formatDate(application.submittedAt)}</strong></div></div><div class="legal-note">حالة الطلب المعروضة هي آخر حالة محفوظة في النظام.</div>`;
    show("result");
  };
  const init = () => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      const app = WA.Storage.get("wa_join_applications").find((row) => row.publicToken === token);
      app ? render(app) : show("notFound");
    } else show("lookup");
    $("#joinLookupForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const number = WA.Storage.sanitizeText($("#joinNumber").value, 30).toUpperCase();
      const phone = WA.Storage.sanitizePhone($("#joinPhone").value);
      const app = WA.Storage.get("wa_join_applications").find((row) => row.applicationNumber === number && row.phone === phone);
      app ? render(app) : show("notFound");
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
