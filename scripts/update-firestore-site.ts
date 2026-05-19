import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { PLACEHOLDER_SITE } from "../lib/placeholder-data";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function main() {
  console.log("Initializing Firebase client SDK...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log("Updating site/main document in Firestore...");
  const docRef = doc(db, "site", "main");
  await setDoc(docRef, PLACEHOLDER_SITE, { merge: true });

  console.log("Successfully updated site/main to Roman Dolidze!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to update site in Firestore:", err);
  process.exit(1);
});
