export default async function run(page, ui) {
  const data = await page.evaluate(() => {
    const hero = document.querySelector(".hero");
    const bg = document.querySelector(".hero-bg");
    const ov = document.querySelector(".hero-overlay");
    const txt = document.querySelector(".hero-text");
    const title = document.querySelector(".hero-title");
    const bgcs = bg ? getComputedStyle(bg) : null;
    const hcs = hero ? getComputedStyle(hero) : null;
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      heroWidth: hero ? Math.round(hero.getBoundingClientRect().width) : null,
      heroHeight: hero ? Math.round(hero.getBoundingClientRect().height) : null,
      heroPosition: hcs ? hcs.position : null,
      bgSize: bgcs ? bgcs.backgroundSize : null,
      bgPos: bgcs ? bgcs.backgroundPosition : null,
      bgRepeat: bgcs ? bgcs.backgroundRepeat : null,
      bgImage: bgcs ? bgcs.backgroundImage : null,
      overlayBg: ov ? getComputedStyle(ov).backgroundImage : null,
      textAlign: txt ? getComputedStyle(txt).textAlign : null,
      textLeftX: txt ? Math.round(txt.getBoundingClientRect().left) : null,
      titleColor: title ? getComputedStyle(title).color : null,
      hasOldHeroImage: !!document.querySelector(".hero-image"),
    };
  });
  return data;
}
