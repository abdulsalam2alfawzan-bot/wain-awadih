(() => {
  "use strict";
  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
  const init = () => {
    const phone = document.querySelector("#loginPhone");
    const code = document.querySelector("#loginCode");
    phone.addEventListener("input", () => { phone.value = normalizePhone(phone.value); });
    document.querySelector("#fillDemoLogin").addEventListener("click", () => {
      phone.value = "0550000101";
      code.value = "1234";
      document.querySelector('[data-field="loginPhone"]').classList.remove("invalid");
      document.querySelector('[data-field="loginCode"]').classList.remove("invalid");
      phone.focus();
    });
    document.querySelector("#workshopLoginForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const phoneValid = phone.value === "0550000101";
      const codeValid = code.value === "1234";
      document.querySelector('[data-field="loginPhone"]').classList.toggle("invalid", !phoneValid);
      document.querySelector('[data-field="loginCode"]').classList.toggle("invalid", !codeValid);
      if (!phoneValid || !codeValid) return;
      WA.storage.set("wa_workshop_session", { workshopId: "WS-101", loginAt: new Date().toISOString() });
      window.location.href = "workshop-dashboard.html";
    });
  };
  document.addEventListener("DOMContentLoaded", init);
})();
