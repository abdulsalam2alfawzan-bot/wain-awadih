(() => {
  "use strict";
  const $ = WA.UI.qs;
  let invoice = null;

  const renderMissing = () => {
    $("#paymentCard").hidden = true;
    $("#paymentMissing").hidden = false;
  };

  const init = () => {
    const params = new URLSearchParams(location.search);
    const invoiceId = params.get("invoice") || params.get("claim");
    invoice = invoiceId
      ? (WA.Storage.findById("wa_invoices", invoiceId) || WA.Storage.findById("wa_claims", invoiceId))
      : null;

    if (!invoice) {
      renderMissing();
      return;
    }

    const partner = WA.Storage.findById("wa_partners", invoice.partnerId);
    const objectionDeadline = invoice.objectionDeadline || invoice.disputeDeadline;
    $("#claimSummary").innerHTML = `
      <div class="guidance-item"><span>رقم الفاتورة</span><strong>${WA.UI.escapeHtml(invoice.number || invoice.id)}</strong></div>
      <div class="guidance-item"><span>الشريك</span><strong>${WA.UI.escapeHtml(partner?.name || "—")}</strong></div>
      <div class="guidance-item"><span>دورة الفاتورة</span><strong>${WA.UI.escapeHtml(invoice.cycle || "—")}</strong></div>
      <div class="guidance-item"><span>المبلغ</span><strong>${WA.UI.formatMoney(invoice.amount)}</strong></div>
      <div class="guidance-item"><span>تاريخ الاستحقاق</span><strong>${WA.UI.formatDate(invoice.dueAt)}</strong></div>
      <div class="guidance-item"><span>نهاية مهلة الاعتراض</span><strong>${WA.UI.formatDate(objectionDeadline)}</strong></div>`;

    if (invoice.status === "paid") {
      const payment = WA.Storage.get("wa_payments").find((row) => row.invoiceId === invoice.id || row.claimId === invoice.id);
      $("#paymentForm").innerHTML = `
        <div class="success-panel">
          <strong>تم سداد هذه الفاتورة</strong>
          <p>${payment ? `<a href="receipt.html?payment=${encodeURIComponent(payment.id)}">عرض الإيصال</a>` : "سجل الدفع غير متاح."}</p>
        </div>`;
      return;
    }

    if (invoice.status === "under_review") {
      $("#paymentForm").innerHTML = `
        <div class="warning-panel">
          <strong>الفاتورة تحت المراجعة</strong>
          <p>تم تعليق السداد المتنازع عليه حتى تسجيل قرار الاعتراض.</p>
        </div>`;
      return;
    }

    $("#paymentForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!$("#confirmPayment").checked) {
        WA.UI.showToast("أكد صحة بيانات السداد", "error");
        return;
      }
      const method = new FormData(event.currentTarget).get("paymentMethod");
      try {
        const payment = WA.Lifecycle.registerPayment(invoice.id, method);
        location.replace(`receipt.html?payment=${encodeURIComponent(payment.id)}`);
      } catch (error) {
        WA.UI.showToast(error.message, "error");
      }
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
