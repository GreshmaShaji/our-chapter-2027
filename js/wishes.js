import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// TODO: replace with your own free Firebase project config.
// See README.md for step-by-step setup instructions.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wishesRef = collection(db, "wishes");

const form = document.getElementById("wishes-form");
const status = document.getElementById("wishes-status");
const list = document.getElementById("wishes-list");
const empty = document.getElementById("wishes-empty");

function timeAgo(date){
  if (!date) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units = [
    ["year", 31536000], ["month", 2592000], ["day", 86400],
    ["hour", 3600], ["minute", 60],
  ];
  for (const [name, secs] of units){
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value} ${name}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderWishes(snapshot){
  if (snapshot.empty){
    empty.style.display = "block";
    list.querySelectorAll(".wish-card").forEach((el) => el.remove());
    return;
  }
  empty.style.display = "none";
  list.querySelectorAll(".wish-card").forEach((el) => el.remove());

  snapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "wish-card";
    const when = data.createdAt ? timeAgo(data.createdAt.toDate()) : "";
    card.innerHTML = `
      <p class="wish-message">${escapeHtml(data.message || "")}</p>
      <p class="wish-meta">&mdash; ${escapeHtml(data.name || "Anonymous")}${when ? ` &middot; ${when}` : ""}</p>
    `;
    list.appendChild(card);
  });
}

const wishesQuery = query(wishesRef, orderBy("createdAt", "desc"), limit(100));
onSnapshot(wishesQuery, renderWishes, (err) => {
  console.error("Could not load wishes:", err);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector("button[type=submit]");
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  if (!name || !message) return;

  submitBtn.disabled = true;
  status.textContent = "Sending your wish...";

  try{
    await addDoc(wishesRef, { name, message, createdAt: serverTimestamp() });
    status.textContent = "Thank you! Your wish has been shared. 💛";
    form.reset();
  } catch (err){
    console.error(err);
    status.textContent = "Something went wrong. Please try again in a moment.";
  } finally {
    submitBtn.disabled = false;
  }
});
