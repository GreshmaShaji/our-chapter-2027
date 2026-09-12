(function heroReveal(){
  const heroArch = document.getElementById("top");
  const ribbon = document.getElementById("ribbon");
  const skipBtn = document.getElementById("intro-skip");

  if (!heroArch || !ribbon) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function openHero(){
    if (heroArch.classList.contains("open")) return;
    ribbon.classList.add("untied");
    setTimeout(() => heroArch.classList.add("open"), 1600);
  }

  if (prefersReducedMotion){
    ribbon.classList.add("untied");
    heroArch.classList.add("open");
    return;
  }

  ribbon.addEventListener("click", openHero);
  ribbon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openHero();
    }
  });

  if (skipBtn){
    skipBtn.addEventListener("click", openHero);
  }
})();
