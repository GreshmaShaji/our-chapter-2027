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
