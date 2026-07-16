(() => {
  "use strict";
  const $ = WA.UI.qs;
  let claim = null;
  const init = () => {
    const claimId = new URLSearchParams(location.search).get("claim");
    claim = claimId ? WA.Storage.findById("wa_claims", claimId) : null;
    if (!claim) { $("#paymentCard").hidden = true; $("#paymentMissing").hidden = false; return; }
    const partner = WA.Storage.findById("wa_partners", claim.partnerId);
    $("#claimSummary").innerHTML = `<div class="guidance-item"><span>رقم المطالبة</span><strong>${WA.UI.escapeHtml(claim.id)}</strong></div><div class="guidance-item"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div><div class="guidance-item"><span>المبلغ</span><strong>${WA.UI.formatMoney(claim.amount)}</strong></div><div class="guidance-item"><span>تاريخ الاستحقاق</span><strong>${WA.UI.formatDate(claim.dueAt)}</strong></div>`;
    if (claim.status === "paid") {
      const payment = WA.Storage.get("wa_payments").find((row) => row.claimId === claim.id);
      $("#paymentForm").innerHTML = `<div class="success-panel"><strong>تم سداد هذه المطالبة تجريبيًا</strong><p><a href="receipt.html?payment=${encodeURIComponent(payment?.id || "")}">عرض الإيصال</a></p></div>`;
      return;
    }
    $("#paymentForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!$("#confirmDemoPayment").checked) { WA.UI.showToast("أكد فهمك لطبيعة العملية التجريبية", "error"); return; }
      const method = new FormData(event.currentTarget).get("paymentMethod");
      try {
        const payment = WA.Lifecycle.registerPayment(claim.id, method);
        location.replace(`receipt.html?payment=${encodeURIComponent(payment.id)}`);
      } catch (error) { WA.UI.showToast(error.message, "error"); }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
