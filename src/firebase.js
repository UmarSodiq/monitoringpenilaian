import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.FirebaseApp = {
  db,
  auth,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  signInWithPopup,
  provider,
  onAuthStateChanged,
  signOut
};

// Dispatch a custom event to notify index.html that Firebase is fully initialized and ready
window.dispatchEvent(new CustomEvent("FirebaseReady"));
