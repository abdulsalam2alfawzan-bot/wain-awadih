from __future__ import annotations

import json
import socket
import subprocess
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, expect, Error as PlaywrightError

ROOT = Path(__file__).resolve().parents[1]


def free_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def wait_server(port: int) -> None:
    import urllib.request
    url = f"http://127.0.0.1:{port}/index.html"
    for _ in range(50):
        try:
            urllib.request.urlopen(url, timeout=0.5).read(1)
            return
        except Exception:
            time.sleep(0.1)
    raise RuntimeError("Local server did not start")


def choose_service(page, service: str) -> None:
    page.goto(f"{base}/customer.html?service={service}&fresh=1", wait_until="networkidle")
    expect(page.locator("#serviceNext")).to_be_enabled()
    page.locator("#serviceNext").click()


def customer_step(page, name: str, phone: str) -> None:
    page.locator("#firstName").fill(name)
    page.locator("#phone").fill(phone)
    page.locator("#privacyAccepted").check()
    page.locator("#termsAccepted").check()
    page.locator("#customerForm button[type=submit]").click()
    expect(page.locator('[data-screen="vehicle"]')).to_have_class(lambda value: "active" in value)


def vehicle_step(page, service: str) -> None:
    page.locator("#make").select_option(label="تويوتا")
    page.locator("#model").select_option(label="كامري")
    if service != "tow":
        page.locator("#year").select_option("2022")
    if service in {"problem", "maintenance"}:
        page.locator("#mileage").select_option(label="من 50 إلى 100 ألف كم")
    if service == "maintenance":
        page.locator("#fuelType").select_option(label="بنزين")
    page.locator("#vehicleForm button[type=submit]").click()
    expect(page.locator('[data-screen="location"]')).to_have_class(lambda value: "active" in value)


def location_step(page, service: str) -> None:
    page.locator("#region").select_option(label="منطقة القصيم")
    page.locator("#city").select_option(label="بريدة")
    if service == "tow":
        page.locator("#detectLocation").click()
        expect(page.locator("#locationStatus")).to_contain_text("تم تحديد الموقع", timeout=15000)
        expect(page.locator("#preciseLocation")).not_to_have_value("")
    page.locator("#locationForm button[type=submit]").click()
    expect(page.locator('[data-screen="path"]')).to_have_class(lambda value: "active" in value)


def finish_problem(page) -> dict:
    page.locator("#problem").fill("السيارة ترج إذا وقفت عند الإشارة وتظهر لمبة المكينة والعزم ضعيف")
    page.locator("#pathForm button[type=submit]").click()
    expect(page.locator('[data-screen="questions"]')).to_have_class(lambda value: "active" in value, timeout=10000)
    for index in range(4):
        expect(page.locator("#questionTitle")).to_contain_text(f"سؤال {index + 1} من 4")
        page.locator("#answerChoices .choice-btn").first.click()
        page.locator("#questionNext").click()
    expect(page.locator('[data-screen="guidance"]')).to_have_class(lambda value: "active" in value)
    expect(page.locator("#expectedIssue")).not_to_be_empty()
    expect(page.locator("#specialty")).not_to_be_empty()
    page.locator("#findPartner").click()
    return wait_result(page)


def finish_parts(page) -> dict:
    page.locator("#vin").fill("JTTESTVIN123456789")
    page.locator("#partName").fill("كمبروسر مكيف")
    page.locator("#partType").select_option(label="وكالة")
    page.locator("#pathForm button[type=submit]").click()
    expect(page.locator('[data-screen="review"]')).to_have_class(lambda value: "active" in value)
    expect(page.locator("#reviewContent")).to_contain_text("كمبروسر مكيف")
    page.locator("#reviewMatch").click()
    return wait_result(page)


def finish_tow(page) -> dict:
    page.locator("#vehicleMoves").select_option(label="لا تتحرك")
    page.locator("#placeDescription").fill("بجوار محطة وقود، عند البوابة الشمالية")
    page.locator("#towDestination").fill("مركز الصيانة في بريدة")
    page.locator("#towNotes").fill("السيارة متوقفة في مكان آمن")
    page.locator("#pathForm button[type=submit]").click()
    expect(page.locator('[data-screen="review"]')).to_have_class(lambda value: "active" in value)
    expect(page.locator("#serviceDisclaimer")).to_contain_text("عاجل")
    page.locator("#reviewMatch").click()
    return wait_result(page)


def finish_maintenance(page) -> dict:
    page.locator("#maintenanceService").select_option(label="تغيير الزيت والفلاتر")
    page.locator("#maintenanceNotes").fill("أفضل موعدًا مسائيًا")
    page.locator("#pathForm button[type=submit]").click()
    expect(page.locator('[data-screen="review"]')).to_have_class(lambda value: "active" in value)
    page.locator("#reviewMatch").click()
    return wait_result(page)


def wait_result(page) -> dict:
    expect(page.locator('[data-screen="result"]')).to_have_class(lambda value: "active" in value, timeout=15000)
    expect(page.locator("#partnerResult")).to_contain_text("سبب الترشيح")
    link = page.locator("#privateLink").input_value()
    assert "token=" in link and "05" not in link, link
    assert page.locator("#whatsappLink").get_attribute("href").startswith("https://wa.me/")
    return {"link": link, "request_header": page.locator("#resultHeader").inner_text()}


base = ROOT.as_uri()

results = []
errors = []
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path="/usr/bin/chromium", headless=True, args=["--no-sandbox"])
        context = browser.new_context(viewport={"width": 390, "height": 844}, locale="ar-SA")
        context.add_init_script("""
          Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            value: { getCurrentPosition(success) { success({coords:{latitude:26.3592, longitude:43.9818, accuracy:12}}); } }
          });
        """)
        page = context.new_page()
        page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
        page.on("console", lambda msg: errors.append(f"console {msg.type}: {msg.text}") if msg.type == "error" else None)

        try:
            page.goto(f"{base}/index.html", wait_until="networkidle")
        except PlaywrightError as error:
            if "ERR_BLOCKED_BY_ADMINISTRATOR" in str(error):
                print("BROWSER_E2E_SKIPPED_POLICY: Chromium is blocked from local and file URLs by the execution environment")
                browser.close()
                raise SystemExit(0)
            raise
        page.evaluate("localStorage.clear()")
        page.reload(wait_until="networkidle")
        expect(page.locator("h1")).to_contain_text("عندك مشكلة في السيارة")

        flows = [
            ("problem", "اختبار", "0551111111", finish_problem),
            ("parts", "قطع", "0551111112", finish_parts),
            ("tow", "سطحة", "0551111113", finish_tow),
            ("maintenance", "صيانة", "0551111114", finish_maintenance),
        ]
        saved_links = []
        for service, name, phone, finisher in flows:
            choose_service(page, service)
            customer_step(page, name, phone)
            vehicle_step(page, service)
            location_step(page, service)
            result = finisher(page)
            saved_links.append(result["link"])
            results.append(f"PASS customer flow: {service}")

        # متابعة طلب المشكلة وتأكيد الخدمة والتكلفة والتقييم.
        page.goto(saved_links[0], wait_until="networkidle")
        expect(page.locator("#requestSection")).to_be_visible()
        page.locator("#confirmService").click()
        expect(page.locator("#trackCostBand")).to_be_visible()
        page.locator("#trackCostBand").select_option("from_200_to_400")
        page.locator("#saveCostBand").click()
        expect(page.locator("#openRating")).to_be_visible()
        page.locator("#openRating").click()
        for selector in ["#ratingOverall", "#ratingTreatment", "#ratingCommitment", "#ratingClarity", "#ratingService", "#ratingFairness"]:
            page.locator(selector).select_option("5")
        page.locator('input[name="recommend"][value="yes"]').check()
        page.locator("#ratingComment").fill("تجربة جيدة")
        page.locator("#ratingForm button[type=submit]").click()
        expect(page.locator("#ratingPanel")).to_contain_text("تم استلام تقييمك")
        results.append("PASS track/service/cost/rating")

        # بوابة الشريك.
        page.goto(f"{base}/workshop-login.html", wait_until="networkidle")
        page.locator("#partnerCode").fill("WA-PARTNER")
        page.locator("#partnerPin").fill("1234")
        page.locator("#partnerLoginForm button[type=submit]").click()
        page.wait_for_url("**/workshop-dashboard.html")
        expect(page.locator("#overviewStats")).to_be_visible()
        expect(page.locator("body")).to_contain_text("الفواتير")
        results.append("PASS partner login/dashboard")

        # نموذج الانضمام: تحقق الواجهة المتكيفة دون إرسال كل الخطوات.
        page.goto(f"{base}/join.html", wait_until="networkidle")
        page.locator("#partnerType").select_option("tow")
        expect(page.locator("#towDocuments")).to_be_visible()
        expect(page.locator("#operationCardNumber")).to_have_attribute("required", "")
        results.append("PASS adaptive join/tow documents")

        # تحقق محمول RTL وعدم تجاوز عرض الصفحة بصورة فادحة.
        overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        assert overflow <= 2, f"Mobile horizontal overflow: {overflow}px"
        results.append("PASS mobile RTL viewport")
        browser.close()
finally:
    pass

if errors:
    raise AssertionError("Browser console/page errors:\n" + "\n".join(errors))

print("\n".join(results))
print("BROWSER_E2E_PASSED")
