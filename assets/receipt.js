(() => {
  "use strict";
  const init = () => {
    const receiptId = WA.getQuery("id");
    const payments = WA.storage.get("wa_payments", []);
    const payment = receiptId ? payments.find((item) => item.receiptId === receiptId) : payments[0];
    const profile = WA.storage.get("wa_workshop_profile", {});
    if (!payment) {
      document.querySelector("#receiptCard").innerHTML = '<div class="empty-state"><h3>لم يتم العثور على الإيصال</h3><p>ارجع إلى صفحة الدفع أو لوحة الورشة.</p><a class="btn btn-dark mt-16" href="workshop-dashboard.html">لوحة الورشة</a></div>';
      return;
    }
    document.querySelector("#receiptId").textContent = payment.receiptId;
    document.querySelector("#paymentId").textContent = payment.id;
    document.querySelector("#receiptWorkshop").textContent = profile.name || "ورشة تجريبية";
    document.querySelector("#receiptAmount").textContent = WA.formatMoney(payment.amount);
    document.querySelector("#receiptMethod").textContent = payment.method;
    document.querySelector("#receiptDate").textContent = WA.formatDate(payment.paidAt);
    document.querySelector("#receiptLast4").textContent = payment.cardLast4 ? `•••• ${payment.cardLast4}` : "غير متاح";
    document.querySelector("#receiptFees").textContent = `يشمل الإيصال الرسوم التالية: ${(payment.feeIds || []).join("، ") || "لا توجد تفاصيل"}. القيم المالية محاكاة للعرض ولا تمثل سياسة تجارية معتمدة.`;
    document.querySelector("#printReceipt").addEventListener("click", () => window.print());
  };
  document.addEventListener("DOMContentLoaded", init);
})();
