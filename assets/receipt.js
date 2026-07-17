(() => {
  "use strict";
  const $ = WA.UI.qs;

  const init = () => {
    const paymentId = new URLSearchParams(location.search).get("payment");
    const payment = paymentId ? WA.Storage.findById("wa_payments", paymentId) : null;
    if (!payment) {
      $("#receiptCard").hidden = true;
      $("#receiptMissing").hidden = false;
      return;
    }

    const invoiceId = payment.invoiceId || payment.claimId;
    const invoice = WA.Storage.findById("wa_invoices", invoiceId) || WA.Storage.findById("wa_claims", invoiceId);
    const partner = WA.Storage.findById("wa_partners", payment.partnerId);
    const methodLabel = ({ bank_transfer: "تحويل بنكي", sadad: "سداد", demo_bank_transfer: "تحويل بنكي", demo_sadad: "سداد" })[payment.method] || payment.method;
    $("#receiptContent").innerHTML = `
      <div class="receipt-row"><span>رقم الإيصال</span><strong>${WA.UI.escapeHtml(payment.receiptNumber)}</strong></div>
      <div class="receipt-row"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div>
      <div class="receipt-row"><span>رقم الفاتورة</span><strong>${WA.UI.escapeHtml(invoice?.number || invoice?.id || invoiceId || "—")}</strong></div>
      <div class="receipt-row"><span>دورة الفاتورة</span><strong>${WA.UI.escapeHtml(invoice?.cycle || "—")}</strong></div>
      <div class="receipt-row"><span>طريقة السداد</span><strong>${WA.UI.escapeHtml(methodLabel)}</strong></div>
      <div class="receipt-row"><span>تاريخ السداد</span><strong>${WA.UI.formatDate(payment.paidAt)}</strong></div>
      <div class="receipt-row receipt-total"><span>الإجمالي</span><strong>${WA.UI.formatMoney(payment.amount)}</strong></div>
      <div class="legal-note">هذا الإيصال يوثق السداد المسجل في المنصة، ويخضع اعتماده المالي للسياسات والفوترة النظامية.</div>`;
    $("#printReceipt").addEventListener("click", () => window.print());
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
