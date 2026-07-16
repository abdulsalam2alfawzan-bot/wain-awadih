(() => {
  "use strict";

  const selectedFees = new Set();

  const requireSession = () => {
    if (!WA.storage.get("wa_workshop_session", null)) {
      window.location.href = "workshop-login.html";
      return false;
    }
    return true;
  };

  const getWorkshopId = () => WA.storage.get("wa_workshop_session", {})?.workshopId || WA.storage.get("wa_workshop_profile", {})?.id || "WS-101";
  const getUnpaidFees = () => WA.storage.get("wa_fees", []).filter((fee) => fee.status === "غير مدفوع" && (!fee.workshopId || fee.workshopId === getWorkshopId()));

  const renderFees = () => {
    const fees = getUnpaidFees();
    const mount = document.querySelector("#unpaidFeesList");
    if (!fees.length) {
      mount.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✓</div><h3>لا يوجد رصيد مستحق</h3><p>جميع الرسوم التجريبية مسددة.</p></div>';
      document.querySelector("#payButton").disabled = true;
      updateSummary();
      return;
    }
    fees.forEach((fee) => selectedFees.add(fee.id));
    mount.innerHTML = fees.map((fee) => `
      <label class="check-card" style="justify-content:space-between">
        <span style="display:flex;align-items:center;gap:9px">
          <input type="checkbox" class="fee-check" value="${WA.escapeHTML(fee.id)}" checked>
          <span><strong class="ltr">${WA.escapeHTML(fee.id)}</strong><br><small class="text-muted">${WA.escapeHTML(fee.requestId)} — ${WA.escapeHTML(fee.event)}</small></span>
        </span>
        <strong>${WA.formatMoney(fee.amount)}</strong>
      </label>`).join("");
    document.querySelectorAll(".fee-check").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) selectedFees.add(checkbox.value);
        else selectedFees.delete(checkbox.value);
        updateSummary();
      });
    });
    updateSummary();
  };

  const updateSummary = () => {
    const fees = getUnpaidFees().filter((fee) => selectedFees.has(fee.id));
    const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    document.querySelector("#summaryCount").textContent = fees.length;
    document.querySelector("#summaryTotal").textContent = WA.formatMoney(total);
    document.querySelector("#payButton").disabled = fees.length === 0;
  };

  const fieldInvalid = (name, invalid) => document.querySelector(`[data-field="${name}"]`)?.classList.toggle("invalid", invalid);

  const formatCard = (value) => value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const processPayment = (event) => {
    event.preventDefault();
    const number = document.querySelector("#cardNumber").value.replace(/\D/g, "");
    const name = document.querySelector("#cardName").value.trim();
    const expiry = document.querySelector("#expiry").value.trim();
    const cvv = document.querySelector("#cvv").value.replace(/\D/g, "");
    const valid = {
      cardNumber: number.length === 16,
      cardName: name.length >= 3,
      expiry: /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry),
      cvv: cvv.length === 3
    };
    Object.entries(valid).forEach(([key, value]) => fieldInvalid(key, !value));
    if (!Object.values(valid).every(Boolean)) return;

    const allFees = WA.storage.get("wa_fees", []);
    const feesToPay = allFees.filter((fee) => fee.status === "غير مدفوع" && selectedFees.has(fee.id) && (!fee.workshopId || fee.workshopId === getWorkshopId()));
    if (!feesToPay.length) {
      WA.toast("اختر رسمًا واحدًا على الأقل.");
      return;
    }

    const button = document.querySelector("#payButton");
    button.disabled = true;
    button.textContent = "جاري تنفيذ المحاكاة…";
    setTimeout(() => {
      const paymentId = WA.randomId("PAY", 5);
      const receiptId = WA.randomId("RCPT", 5);
      const total = feesToPay.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
      allFees.forEach((fee) => {
        if (selectedFees.has(fee.id) && fee.status === "غير مدفوع") {
          fee.status = "مدفوع";
          fee.paymentId = paymentId;
        }
      });
      WA.storage.set("wa_fees", allFees);
      const payments = WA.storage.get("wa_payments", []);
      payments.unshift({
        id: paymentId,
        receiptId,
        amount: total,
        method: "بطاقة مدى — محاكاة",
        cardLast4: number.slice(-4),
        status: "مكتمل",
        paidAt: new Date().toISOString(),
        workshopId: getWorkshopId(),
        feeIds: feesToPay.map((fee) => fee.id)
      });
      WA.storage.set("wa_payments", payments);
      window.location.href = `receipt.html?id=${encodeURIComponent(receiptId)}`;
    }, 1200);
  };

  const init = () => {
    if (!requireSession()) return;
    const profile = WA.storage.get("wa_workshop_profile", {});
    document.querySelector("#summaryWorkshop").textContent = profile.name;
    document.querySelector("#summaryEvent").textContent = profile.agreementEvent;
    renderFees();

    const cardNumber = document.querySelector("#cardNumber");
    cardNumber.addEventListener("input", () => {
      cardNumber.value = formatCard(cardNumber.value);
      document.querySelector("#cardPreviewNumber").textContent = cardNumber.value || "•••• •••• •••• ••••";
      fieldInvalid("cardNumber", false);
    });
    document.querySelector("#cardName").addEventListener("input", (event) => {
      document.querySelector("#cardPreviewName").textContent = event.target.value || "اسم الورشة";
      fieldInvalid("cardName", false);
    });
    document.querySelector("#expiry").addEventListener("input", (event) => {
      let value = event.target.value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = `${value.slice(0,2)}/${value.slice(2)}`;
      event.target.value = value;
      document.querySelector("#cardPreviewExpiry").textContent = value || "MM/YY";
      fieldInvalid("expiry", false);
    });
    document.querySelector("#cvv").addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 3);
      fieldInvalid("cvv", false);
    });
    document.querySelector("#paymentForm").addEventListener("submit", processPayment);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
