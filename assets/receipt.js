(() => {
  "use strict";
  const $ = WA.UI.qs;
  const init = () => {
    const paymentId = new URLSearchParams(location.search).get("payment");
    const payment = paymentId ? WA.Storage.findById("wa_payments", paymentId) : null;
    if (!payment) { $("#receiptCard").hidden = true; $("#receiptMissing").hidden = false; return; }
    const claim = WA.Storage.findById("wa_claims", payment.claimId);
    const partner = WA.Storage.findById("wa_partners", payment.partnerId);
    $("#receiptContent").innerHTML = `<div class="receipt-row"><span>رقم الإيصال</span><strong>${WA.UI.escapeHtml(payment.receiptNumber)}</strong></div><div class="receipt-row"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div><div class="receipt-row"><span>رقم المطالبة</span><strong>${WA.UI.escapeHtml(claim?.id || payment.claimId)}</strong></div><div class="receipt-row"><span>طريقة السداد</span><strong>${WA.UI.escapeHtml(payment.method)}</strong></div><div class="receipt-row"><span>تاريخ السداد</span><strong>${WA.UI.formatDate(payment.paidAt)}</strong></div><div class="receipt-row receipt-total"><span>الإجمالي</span><strong>${WA.UI.formatMoney(payment.amount)}</strong></div><div class="legal-note">هذا إيصال محاكاة داخل نسخة MVP، ولا يمثل مستندًا ماليًا أو ضريبيًا حقيقيًا.</div>`;
    $("#printReceipt").addEventListener("click", () => window.print());
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
