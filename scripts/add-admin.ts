/**
 * Adds a UID to the Firestore "admins" collection so that user can access the admin panel.
 *
 * USAGE:
 *   npx tsx scripts/add-admin.ts <UID>
 *
 * Requires FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function init() {
  if (getApps().length) return;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in .env.local",
    );
  }
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

async function main() {
  const uid = process.argv[2];
  if (!uid) {
    console.error("Usage: npx tsx scripts/add-admin.ts <UID>");
    process.exit(1);
  }

  init();
  const db = getFirestore();
  await db.collection("admins").doc(uid).set({ createdAt: new Date().toISOString() });
  console.log(`✓ Admin added: ${uid}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
