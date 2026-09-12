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

const firebaseConfig = {
  apiKey: "AIzaSyC22somHCe0-W6pTHYoVLQE4Iq5Gd5M3QQ",
  authDomain: "wishes-2b727.firebaseapp.com",
  projectId: "wishes-2b727",
  storageBucket: "wishes-2b727.firebasestorage.app",
  messagingSenderId: "1001733979823",
  appId: "1:1001733979823:web:3c07d96867866e149dde5a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wishesRef = collection(db, "wishes");

const form = document.getElementById("wishes-form");
const status = document.getElementById("wishes-status");
const list = document.getElementById("wishes-list");
const empty = document.getElementById("wishes-empty");

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
    card.innerHTML = `
      <p class="wish-message">${escapeHtml(data.message || "")}</p>
      <p class="wish-meta">&mdash; ${escapeHtml(data.name || "Anonymous")}</p>
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
