// =======================
// IMPORT FIREBASE SDK
// =======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =======================
// CONFIG FIREBASE
// =======================
const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "gamedasboard.firebaseapp.com",
  projectId: "gamedasboard",
  storageBucket: "gamedasboard.firebasestorage.app",
  messagingSenderId: "1079144606159",
  appId: "1:1079144606159:web:6f1b0f82c4c4cdda630aba"
};


// =======================
// INIT FIREBASE
// =======================
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// =======================
// AMBIL / SET NAMA PLAYER
// =======================
let playerName = localStorage.getItem("playerName");

if (!playerName) {
  playerName = prompt("Masukkan nama kamu:");
  localStorage.setItem("playerName", playerName);
}


// =======================
// SAVE SCORE (BEST SCORE ONLY)
// =======================
export async function saveScore(score) {

  const playerRef = doc(db, "players", playerName);

  const snapshot = await getDoc(playerRef);

  // kalau player belum ada
  if (!snapshot.exists()) {

    await setDoc(playerRef, {
      name: playerName,
      bestScore: score
    });

  } else {

    let oldScore = snapshot.data().bestScore;

    // update hanya jika score lebih tinggi
    if (score > oldScore) {

      await setDoc(playerRef, {
        name: playerName,
        bestScore: score
      });

    }

  }
}


// =======================
// LOAD TOP 10 SCORES
// =======================
export async function loadTopScores() {

  const q = query(
    collection(db, "players"),
    orderBy("bestScore", "desc"),
    limit(10) //  TOP 10
  );

  const querySnapshot = await getDocs(q);

  let scores = [];

  querySnapshot.forEach((doc) => {
    scores.push(doc.data());
  });

  return scores;
}