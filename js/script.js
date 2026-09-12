// ===== Background music =====
(function bgMusic(){
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  if (!audio || !btn) return;

  function updateIcon(){
    btn.textContent = audio.paused ? "🔇" : "🔊";
  }

  function tryPlay(){
    audio.play().then(updateIcon).catch(() => updateIcon());
  }

  // Attempt autoplay immediately; most mobile browsers block this until
  // the visitor interacts with the page, so we also try on first tap.
  tryPlay();
  ["click", "touchstart"].forEach((evt) => {
    document.addEventListener(evt, function firstInteraction(){
      if (audio.paused) tryPlay();
      document.removeEventListener(evt, firstInteraction);
    }, { once: true });
  });

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) tryPlay();
    else { audio.pause(); updateIcon(); }
  });
})();

// ===== Countdown to the wedding ceremony (Jan 31, 2027, 11:00 AM IST) =====
(function countdown(){
  const target = new Date("2027-01-31T11:00:00+05:30").getTime();

  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };

  function pad(n){ return String(n).padStart(2, "0"); }

  function tick(){
    const diff = target - Date.now();
    if (diff <= 0){
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.mins.textContent = "00";
      els.secs.textContent = "00";
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.mins.textContent = pad(mins);
    els.secs.textContent = pad(secs);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// ===== RSVP form submission (Formspree) =====
(function rsvpForm(){
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    status.textContent = "Sending your RSVP...";

    try{
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok){
        status.textContent = "Thank you! Your RSVP has been received. 💛";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again or contact us directly.";
      }
    } catch (err){
      status.textContent = "Something went wrong. Please try again or contact us directly.";
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
