// Mobile / floating navigation

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Wedding countdown.
// Uses midnight in India Standard Time.
// Change the time when the ceremony time is confirmed.

const weddingDate = new Date(
  "2027-01-31T00:00:00+05:30"
).getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = Math.max(0, weddingDate - now);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Crossfade the sticky photo from the first image to the second
// as the visitor scrolls into the Our Story section, and back
// again if they scroll back up.

const photoPanel = document.querySelector(".photo-panel");
const storySection = document.getElementById("story");

if (photoPanel && storySection) {
  const photoSwap = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        photoPanel.classList.toggle("show-second", entry.isIntersecting);
      });
    },
    { threshold: 0.25 }
  );

  photoSwap.observe(storySection);
}

// Memories gallery lightbox (with prev/next + swipe)

const lightbox = document.getElementById("memoryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const memoryPhotos = document.querySelectorAll(".memory-photo");

let currentPhotoIndex = 0;

function showPhoto(index) {
  currentPhotoIndex = (index + memoryPhotos.length) % memoryPhotos.length;
  const img = memoryPhotos[currentPhotoIndex].querySelector("img");
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
}

function openLightbox(index) {
  showPhoto(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

memoryPhotos.forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index));
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPhoto(currentPhotoIndex - 1);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showPhoto(currentPhotoIndex + 1);
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(currentPhotoIndex - 1);
    if (e.key === "ArrowRight") showPhoto(currentPhotoIndex + 1);
  });

  // Swipe support (touch)
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const swipeThreshold = 40;

    if (deltaX > swipeThreshold) {
      showPhoto(currentPhotoIndex - 1);
    } else if (deltaX < -swipeThreshold) {
      showPhoto(currentPhotoIndex + 1);
    }
  }, { passive: true });
}

// RSVP & Wishes forms (Formspree)

const RSVP_ENDPOINT = "https://formspree.io/f/mdeaddjv";
const WISHES_ENDPOINT = "https://formspree.io/f/xqpelljr";

const rsvpForm = document.getElementById("rsvpForm");
const wishesForm = document.getElementById("wishesForm");

if (rsvpForm && wishesForm) {
  const attendanceInputs = rsvpForm.querySelectorAll(
    'input[name="attendance"]'
  );

  const eventChoices = document.getElementById("eventChoices");
  const guestCountContainer = document.getElementById("guestCountContainer");

  function updateAttendance() {
    const attending = rsvpForm.querySelector(
      'input[name="attendance"]:checked'
    )?.value === "Attending";

    eventChoices.hidden = !attending;
    guestCountContainer.hidden = !attending;

    eventChoices.querySelectorAll("input").forEach((input) => {
      input.disabled = !attending;
      if (!attending) input.checked = false;
    });

    const guestCount = document.getElementById("guestCount");
    guestCount.disabled = !attending;
    guestCount.required = attending;
  }

  attendanceInputs.forEach((input) => {
    input.addEventListener("change", updateAttendance);
  });

  updateAttendance();

  async function submitWeddingForm(form, endpoint, statusId, successMessage) {
    const status = document.getElementById(statusId);
    const button = form.querySelector('button[type="submit"]');

    status.textContent = "Sending...";
    status.className = "form-status";
    button.disabled = true;

    try {
      const formData = new FormData(form);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      status.textContent = successMessage;
      status.className = "form-status success";

      form.reset();

      if (form === rsvpForm) {
        updateAttendance();
      }
    } catch (error) {
      status.textContent =
        "We couldn't send your message. Please try again.";
      status.className = "form-status error";
    } finally {
      button.disabled = false;
    }
  }

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const attending = rsvpForm.querySelector(
      'input[name="attendance"]:checked'
    )?.value === "Attending";

    const selectedEvents = rsvpForm.querySelectorAll(
      'input[name="events"]:checked'
    );

    const status = document.getElementById("rsvpStatus");

    if (attending && selectedEvents.length === 0) {
      status.textContent = "Please select at least one celebration.";
      status.className = "form-status error";
      return;
    }

    submitWeddingForm(
      rsvpForm,
      RSVP_ENDPOINT,
      "rsvpStatus",
      "Thank you! Your RSVP has been received. ♡"
    );
  });

  wishesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    submitWeddingForm(
      wishesForm,
      WISHES_ENDPOINT,
      "wishesStatus",
      "Your beautiful wishes have been received! ♡"
    );
  });
}
