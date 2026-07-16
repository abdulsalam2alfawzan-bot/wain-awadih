from pathlib import Path
from bs4 import BeautifulSoup
import re, sys, json

root = Path(__file__).resolve().parents[1]
html_files = sorted(root.glob('*.html'))
issues = []
metrics = {'html_files': len(html_files), 'links': 0, 'scripts': 0, 'controls': 0}

for file in html_files:
    soup = BeautifulSoup(file.read_text(encoding='utf-8'), 'html.parser')
    if soup.html is None or soup.html.get('lang') != 'ar' or soup.html.get('dir') != 'rtl':
        issues.append(f'{file.name}: missing Arabic RTL')
    if not soup.find('meta', attrs={'name':'viewport'}):
        issues.append(f'{file.name}: missing viewport')
    if not soup.find('meta', attrs={'http-equiv':'Content-Security-Policy'}):
        issues.append(f'{file.name}: missing CSP meta')
    ids = [tag.get('id') for tag in soup.find_all(attrs={'id': True})]
    duplicates = sorted({x for x in ids if ids.count(x) > 1})
    if duplicates:
        issues.append(f'{file.name}: duplicate ids {duplicates}')
    for tag in soup.find_all(['a','link','script']):
        attr = 'href' if tag.name in ('a','link') else 'src'
        value = tag.get(attr)
        if not value:
            continue
        if tag.name == 'script': metrics['scripts'] += 1
        else: metrics['links'] += 1
        clean = value.split('?')[0].split('#')[0]
        if not clean or clean.startswith(('http://','https://','mailto:','tel:','data:','javascript:')):
            continue
        target = (file.parent / clean).resolve()
        if not target.exists():
            issues.append(f'{file.name}: dead local reference {value}')
    for control in soup.find_all(['input','select','textarea']):
        if control.get('type') == 'hidden':
            continue
        metrics['controls'] += 1
        cid = control.get('id')
        labelled = cid and soup.find('label', attrs={'for': cid})
        wrapped = control.find_parent('label')
        aria = control.get('aria-label') or control.get('aria-labelledby')
        if not (labelled or wrapped or aria):
            issues.append(f'{file.name}: unlabelled control {cid or control.name}')
    for button in soup.find_all('button'):
        if not button.get('type'):
            issues.append(f'{file.name}: button without type')

css = (root / 'assets/styles.css').read_text(encoding='utf-8')
if css.count('{') != css.count('}'):
    issues.append('styles.css: unbalanced braces')
if '@media (prefers-reduced-motion: reduce)' not in css:
    issues.append('styles.css: missing reduced motion support')

required_keys = [
  'wa_customers','wa_vehicles','wa_requests','wa_partners','wa_referrals','wa_ratings',
  'wa_objections','wa_discounts','wa_fees','wa_claims','wa_payments','wa_join_applications',
  'wa_consents','wa_sessions','wa_meta'
]
config = (root / 'assets/config.js').read_text(encoding='utf-8')
for key in required_keys:
    if key not in config:
        issues.append(f'config.js: missing {key}')

prohibited = [r'سعر متوقع', r'تكلفة متوقعة', r'الأرخص']
for file in list(root.glob('*.html')) + list((root/'assets').glob('*.js')):
    text = file.read_text(encoding='utf-8')
    for pattern in prohibited:
        if re.search(pattern, text) and 'لا نعرض' not in text and 'لا تعرض' not in text:
            issues.append(f'{file.name}: potentially prohibited pricing claim: {pattern}')

print(json.dumps({'metrics': metrics, 'issues': issues}, ensure_ascii=False, indent=2))
if issues:
    sys.exit(1)
