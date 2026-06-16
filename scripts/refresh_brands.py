# -*- coding: utf-8 -*-
"""
주1회 브랜드 대표상품 자동 갱신 (GitHub Actions / 로컬 공용)

설계 원칙 (중요):
- public/pool-brands.json 의 각 브랜드 홈페이지(url)를 헤드리스 크롬으로 재렌더링해
  대표상품 이미지를 다시 수집한다.
- pool-brands.json 의 'images' (및 로고가 비어있으면 logo)만 갱신하고,
  score/priceRange/countries/salesMethod 등 사람이 보강한 필드는 절대 건드리지 않는다.
- 안전장치: 새 스크랩 결과가 유효 상품 5장 미만이거나 오류면 기존 이미지를 그대로 둔다.
  (매주 자동으로 돌아도 사이트 품질이 나빠지지 않게 — 좋은 데이터를 빈 결과로 덮지 않음)

환경변수:
  ONLY=b01,b04   특정 브랜드만 (테스트용)
  LIMIT=3        앞 N개만 (테스트용)
"""
import os, sys, io, json, ssl, time, urllib.request
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
JSON_PATH = os.path.join(PUB, "pool-brands.json")
IMGDIR = os.path.join(PUB, "brand-images")
MIN_PRODUCTS = 5            # 이만큼 못 모으면 기존 유지
PRODUCT_W = 600             # 카드용 리사이즈 폭

ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
HDR = {"User-Agent": UA, "Referer": ""}

EXTRACT_JS = r"""
() => {
  const abs = (u) => { try { return new URL(u, location.href).href; } catch(e){ return u; } };
  const BAD = /(logo|banner|icon|sprite|btn|button|bg_|\/bg\/|payment|sns|footer|category\/(?:editor|logo)|main_hero|\/main\/|\/event\/|coupon)/i;
  const LOGO_BAD = /category|product|banner|echosting|\/admin\/|footer|payment|skin\/admin/i;
  let logo = null;
  const logoCand = [...document.querySelectorAll(
    'h1 img, .logo img, #logo img, [class*="logo" i] img, img[class*="logo" i], img[alt*="logo" i], img[src*="logo" i]')];
  for (const im of logoCand) {
    const s = im.currentSrc || im.src; if (!s || s.startsWith('data:')) continue;
    if (LOGO_BAD.test(s)) continue;
    logo = abs(s); break;
  }
  const seen = new Set(); const all = [];
  for (const img of document.querySelectorAll('img')) {
    const s = img.currentSrc || img.src;
    if (!s || s.startsWith('data:')) continue;
    const u = abs(s);
    if (seen.has(u)) continue;
    const w = img.naturalWidth||0, h = img.naturalHeight||0;
    if (w < 400 || h < 400) continue;
    const ratio = h / w;
    if (ratio < 0.9 || ratio > 1.8) continue;
    if (BAD.test(u)) continue;
    const score = /\/web\/product\//i.test(u) ? 2 : /product|goods|item|shop/i.test(u) ? 1 : 0;
    seen.add(u);
    all.push({src:u, w, h, score, order: all.length});
  }
  all.sort((a,b)=> b.score - a.score || a.order - b.order);
  return {logo, products: all.slice(0,12)};
}
"""


def scrape(page, url):
    page.goto(url, wait_until="domcontentloaded", timeout=35000)
    try:
        h = page.evaluate("document.body.scrollHeight") or 6000
    except Exception:
        h = 6000
    h = min(max(h, 6000), 12000)
    for y in range(0, h, 600):
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(300)
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(1500)
    return page.evaluate(EXTRACT_JS)


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=25, context=ctx).read()


def save_product(url, path):
    data = fetch(url)
    im = Image.open(io.BytesIO(data)).convert("RGB")
    if im.width > PRODUCT_W:
        im = im.resize((PRODUCT_W, round(im.height * PRODUCT_W / im.width)))
    im.save(path, "JPEG", quality=86)


def main():
    brands = json.load(open(JSON_PATH, encoding="utf-8"))
    only = set(filter(None, os.environ.get("ONLY", "").split(",")))
    limit = int(os.environ.get("LIMIT", "0") or 0)

    targets = [b for b in brands if b.get("url")]
    if only:
        targets = [b for b in targets if b["id"] in only]
    if limit:
        targets = targets[:limit]

    updated, kept, failed = [], [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        bctx = browser.new_context(user_agent=UA, viewport={"width": 1366, "height": 900})
        page = bctx.new_page()
        for b in targets:
            bid = b["id"]
            try:
                r = scrape(page, b["url"])
                prods = (r.get("products") or [])[:MIN_PRODUCTS]
                # 다운로드 시도 (실패한 이미지는 제외)
                d = os.path.join(IMGDIR, bid); os.makedirs(d, exist_ok=True)
                staged = []
                for i, pr in enumerate(prods, 1):
                    try:
                        tmp = os.path.join(d, f"_new_p{i}.jpg")
                        save_product(pr["src"], tmp)
                        staged.append((i, tmp))
                    except Exception:
                        pass
                # 안전장치: 5장 못 모으면 기존 유지
                if len(staged) < MIN_PRODUCTS:
                    for _, tmp in staged:
                        try: os.remove(tmp)
                        except Exception: pass
                    kept.append(f"{bid}({len(staged)}장만)")
                    print(f"  유지 {bid} {b.get('realName','')}: {len(staged)}장만 확보 → 기존 보존")
                    continue
                # 확정: _new_pN.jpg → pN.jpg 교체
                new_imgs = []
                for i, tmp in staged:
                    final = os.path.join(d, f"p{i}.jpg")
                    os.replace(tmp, final)
                    new_imgs.append(f"/brand-images/{bid}/p{i}.jpg")
                b["images"] = new_imgs
                # 로고가 비어있고 새로 잡혔으면만 보강 (있으면 건드리지 않음)
                if not b.get("logo") and r.get("logo"):
                    try:
                        ext = ".png" if ".png" in r["logo"].lower() else ".jpg"
                        lp = os.path.join(d, f"logo{ext}")
                        with open(lp, "wb") as f: f.write(fetch(r["logo"]))
                        b["logo"] = f"/brand-images/{bid}/logo{ext}"
                    except Exception:
                        pass
                updated.append(f"{bid} {b.get('realName','')}")
                print(f"  갱신 {bid} {b.get('realName','')}: 상품 {len(new_imgs)}장")
            except Exception as e:
                failed.append(f"{bid}({str(e)[:30]})")
                print(f"  실패 {bid} {b.get('realName','')}: {str(e)[:50]} → 기존 보존")
            time.sleep(1)
        browser.close()

    if updated:
        json.dump(brands, open(JSON_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    print("\n=== 요약 ===")
    print(f"갱신 {len(updated)} / 유지 {len(kept)} / 실패 {len(failed)} (총 {len(targets)})")
    if updated: print("갱신:", ", ".join(updated))
    if kept:    print("유지:", ", ".join(kept))
    if failed:  print("실패:", ", ".join(failed))
    # GitHub Actions 출력용
    gh = os.environ.get("GITHUB_OUTPUT")
    if gh:
        with open(gh, "a", encoding="utf-8") as f:
            f.write(f"updated_count={len(updated)}\n")
            f.write(f"summary=갱신 {len(updated)}·유지 {len(kept)}·실패 {len(failed)}\n")


if __name__ == "__main__":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    main()
