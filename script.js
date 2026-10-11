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

// Crossfade the sticky photo from the first image to the second
// as the visitor scrolls into the Celebrations section, and back
// again if they scroll back up.

const photoPanel = document.querySelector(".photo-panel");
const celebrations = document.getElementById("celebrations");

if (photoPanel && celebrations) {
  const photoSwap = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        photoPanel.classList.toggle("show-second", entry.isIntersecting);
      });
    },
    { threshold: 0.25 }
  );

  photoSwap.observe(celebrations);
}
