export default async function run(page, ui) {
  const results = [];
  for (const [label, w, h] of [
    ["desktop", 1280, 800],
    ["tablet", 820, 1024],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(250);
    const data = await page.evaluate(() => {
      const hero = document.querySelector(".hero");
      const txt = document.querySelector(".hero-text");
      const ov = document.querySelector(".hero-overlay");
      return {
        heroWidth: hero ? Math.round(hero.getBoundingClientRect().width) : null,
        viewportWidth: window.innerWidth,
        textAlign: txt ? getComputedStyle(txt).textAlign : null,
        textLeftX: txt ? Math.round(txt.getBoundingClientRect().left) : null,
        textRightX: txt ? Math.round(txt.getBoundingClientRect().right) : null,
        overlay: ov ? getComputedStyle(ov).backgroundImage.slice(0, 40) : null,
        titleSize: getComputedStyle(document.querySelector(".hero-title")).fontSize,
      };
    });
    results.push({ label, w, ...data });
  }
  return results;
}
