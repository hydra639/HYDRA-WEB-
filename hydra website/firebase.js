// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrwy1vIRXa5dpVG5xVWWtzID7HVRSiawo",
  authDomain: "hydra-arena.firebaseapp.com",
  projectId: "hydra-arena",
  storageBucket: "hydra-arena.firebasestorage.app",
  messagingSenderId: "440218282740",
  appId: "1:440218282740:web:82c49709eb118d9e104ca1",
  measurementId: "G-MN031K28HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Login Button
document.getElementById("googleBtn").addEventListener("click", async () => {
  try {
    // Open Google popup
    const result = await signInWithPopup(auth, provider);

    // User details
    const user = result.user;

    // Save user info in localStorage
    localStorage.setItem("hydraUser", JSON.stringify({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    }));

    // Success message
    alert(`Welcome ${user.displayName} 🔥`);

    // Redirect to user dashboard
    window.location.href = "user.html";

  } catch (error) {
    console.error(error);
    alert("Google Login Failed ❌");
  }
});

// Optional logout function
window.logoutUser = async function () {
  await signOut(auth);
  localStorage.removeItem("hydraUser");
  window.location.href = "login.html";
};