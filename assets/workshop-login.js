(() => {
  "use strict";
  const $ = WA.UI.qs;

  const init = () => {
    $("#loginForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const code = WA.Storage.sanitizeText($("#partnerCode").value, 30).toUpperCase();
      const pin = WA.Storage.sanitizeText($("#partnerPin").value, 12);
      const credentials = WA.Storage.get("wa_sessions").find((row) => row.type === "demo_credentials" && row.partnerCode === code && row.pin === pin);
      if (!credentials) {
        WA.UI.showToast("بيانات الدخول غير صحيحة", "error");
        return;
      }
      const sessions = WA.Storage.get("wa_sessions").filter((row) => row.type !== "partner_session");
      sessions.push({
        id: WA.Storage.randomToken("session"),
        type: "partner_session",
        partnerId: credentials.partnerId,
        createdAt: WA.Storage.now(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
      });
      WA.Storage.set("wa_sessions", sessions);
      location.href = "workshop-dashboard.html";
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
