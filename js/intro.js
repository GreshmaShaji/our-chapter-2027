(function intro(){
  const introEl = document.getElementById("intro");
  const envelope = document.getElementById("envelope");
  const envelopeScene = document.getElementById("envelope-scene");
  const churchScene = document.getElementById("church-scene");
  const skipBtn = document.getElementById("intro-skip");

  if (!introEl || !envelope) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion){
    introEl.classList.add("hidden");
    return;
  }

  document.body.style.overflow = "hidden";

  function endIntro(){
    introEl.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function showChurchScene(){
    envelopeScene.classList.add("fade-out");
    setTimeout(() => churchScene.classList.add("active"), 450);
    setTimeout(endIntro, 450 + 5200);
  }

  function openEnvelope(){
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    setTimeout(showChurchScene, 1100);
  }

  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openEnvelope();
    }
  });

  churchScene.addEventListener("click", endIntro);
  skipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    endIntro();
  });
})();
