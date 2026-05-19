/**
 * Seeds Firestore with placeholder data so the landing renders fully on first load.
 *
 * USAGE:
 *   1. Fill in `.env.local` with FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   2. Run: npx tsx scripts/seed.ts
 *   3. (Optional) `--clear` to wipe collections before seeding: `npx tsx scripts/seed.ts --clear`
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { COLLECTIONS } from "../lib/firebase/collections";
import {
  PLACEHOLDER_ACHIEVEMENTS,
  PLACEHOLDER_AUDIENCE_DEMOGRAPHICS,
  PLACEHOLDER_AUDIENCE_REGIONS,
  PLACEHOLDER_GALLERY,
  PLACEHOLDER_GEAR_ZONES,
  PLACEHOLDER_PACKAGES,
  PLACEHOLDER_PRESS,
  PLACEHOLDER_SITE,
  PLACEHOLDER_SOCIALS,
  PLACEHOLDER_SPONSORS,
  PLACEHOLDER_STATS,
  PLACEHOLDER_TESTIMONIALS,
  PLACEHOLDER_VIDEOS,
} from "../lib/placeholder-data";

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

const CLEAR = process.argv.includes("--clear");

async function clearCollection(name: string) {
  const db = getFirestore();
  const snap = await db.collection(name).get();
  const batch = db.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
  console.log(`  - cleared ${snap.size} docs from ${name}`);
}

async function seedCollection<T extends object>(name: string, items: Array<T & { id: string }>) {
  const db = getFirestore();
  if (CLEAR) await clearCollection(name);
  const batch = db.batch();
  for (const item of items) {
    const { id, ...data } = item;
    batch.set(db.collection(name).doc(id), data);
  }
  await batch.commit();
  console.log(`  ✓ seeded ${items.length} → ${name}`);
}

async function main() {
  init();
  const db = getFirestore();

  console.log("⚔️  Seeding Firestore...\n");

  await db.collection(COLLECTIONS.site).doc("main").set(PLACEHOLDER_SITE);
  console.log(`  ✓ seeded site/main`);

  await seedCollection(COLLECTIONS.stats, PLACEHOLDER_STATS);
  await seedCollection(COLLECTIONS.socials, PLACEHOLDER_SOCIALS);
  await seedCollection(COLLECTIONS.audienceRegions, PLACEHOLDER_AUDIENCE_REGIONS);
  await seedCollection(COLLECTIONS.audienceDemographics, PLACEHOLDER_AUDIENCE_DEMOGRAPHICS);
  await seedCollection(COLLECTIONS.videos, PLACEHOLDER_VIDEOS);
  await seedCollection(COLLECTIONS.gallery, PLACEHOLDER_GALLERY);
  await seedCollection(COLLECTIONS.packages, PLACEHOLDER_PACKAGES);
  await seedCollection(COLLECTIONS.gearZones, PLACEHOLDER_GEAR_ZONES);
  await seedCollection(COLLECTIONS.sponsors, PLACEHOLDER_SPONSORS);
  await seedCollection(COLLECTIONS.testimonials, PLACEHOLDER_TESTIMONIALS);
  await seedCollection(COLLECTIONS.press, PLACEHOLDER_PRESS);
  await seedCollection(COLLECTIONS.achievements, PLACEHOLDER_ACHIEVEMENTS);

  console.log("\n✅ Seeding complete!\n");
  console.log("⚠️  Don't forget to add your admin UID to the `admins` collection:");
  console.log("     1. Go to Firebase Console → Authentication → find your user → copy UID");
  console.log("     2. Create doc at: admins/{your-uid} with { email, displayName, role: 'owner' }\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
