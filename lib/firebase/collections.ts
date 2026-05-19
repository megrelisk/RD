import {
  type DocumentData,
  type Firestore,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./client";
import type {
  Achievement,
  AudienceDemographic,
  AudienceRegion,
  GalleryItem,
  GearZone,
  Lead,
  MediaKitRequest,
  Package,
  PressItem,
  Site,
  Social,
  Sponsor,
  Stat,
  Testimonial,
  Video,
} from "../schemas";

export const COLLECTIONS = {
  site: "site",
  stats: "stats",
  socials: "socials",
  audienceRegions: "audienceRegions",
  audienceDemographics: "audienceDemographics",
  videos: "videos",
  gallery: "gallery",
  packages: "packages",
  gearZones: "gearZones",
  sponsors: "sponsors",
  testimonials: "testimonials",
  press: "press",
  achievements: "achievements",
  leads: "leads",
  mediaKitRequests: "mediaKitRequests",
  admins: "admins",
} as const;

function makeConverter<T extends DocumentData>(): FirestoreDataConverter<T & { id: string }> {
  return {
    toFirestore: (data) => {
      const { id, ...rest } = data as T & { id: string };
      void id;
      return rest;
    },
    fromFirestore: (snap: QueryDocumentSnapshot) =>
      ({ id: snap.id, ...(snap.data() as T) }) as T & { id: string },
  };
}

const siteConv = makeConverter<Site>();
const statConv = makeConverter<Stat>();
const socialConv = makeConverter<Social>();
const audienceRegionConv = makeConverter<AudienceRegion>();
const audienceDemographicConv = makeConverter<AudienceDemographic>();
const videoConv = makeConverter<Video>();
const galleryConv = makeConverter<GalleryItem>();
const packageConv = makeConverter<Package>();
const gearZoneConv = makeConverter<GearZone>();
const sponsorConv = makeConverter<Sponsor>();
const testimonialConv = makeConverter<Testimonial>();
const pressConv = makeConverter<PressItem>();
const achievementConv = makeConverter<Achievement>();
const leadConv = makeConverter<Lead>();
const mediaKitConv = makeConverter<MediaKitRequest>();

/* ---------- Site singleton ---------- */
export async function getSite(database: Firestore = db()) {
  const ref = doc(database, COLLECTIONS.site, "main").withConverter(siteConv);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function setSite(data: Site) {
  const ref = doc(db(), COLLECTIONS.site, "main").withConverter(siteConv);
  await setDoc(ref, { ...data, id: "main" }, { merge: true });
}

/* ---------- Generic ordered list helpers ---------- */
async function listOrdered<T extends DocumentData>(
  name: string,
  conv: FirestoreDataConverter<T & { id: string }>,
): Promise<(T & { id: string })[]> {
  const col = collection(db(), name).withConverter(conv);
  const snap = await getDocs(query(col, orderBy("order", "asc")));
  return snap.docs.map((d) => d.data());
}

export const listStats = () => listOrdered(COLLECTIONS.stats, statConv);
export const listSocials = () => listOrdered(COLLECTIONS.socials, socialConv);
export const listAudienceRegions = () =>
  listOrdered(COLLECTIONS.audienceRegions, audienceRegionConv);
export const listAudienceDemographics = () =>
  listOrdered(COLLECTIONS.audienceDemographics, audienceDemographicConv);
export const listVideos = () => listOrdered(COLLECTIONS.videos, videoConv);
export const listGallery = () => listOrdered(COLLECTIONS.gallery, galleryConv);
export const listPackages = () => listOrdered(COLLECTIONS.packages, packageConv);
export const listGearZones = () => listOrdered(COLLECTIONS.gearZones, gearZoneConv);
export const listSponsors = () => listOrdered(COLLECTIONS.sponsors, sponsorConv);
export const listTestimonials = () => listOrdered(COLLECTIONS.testimonials, testimonialConv);
export const listPress = () => listOrdered(COLLECTIONS.press, pressConv);
export const listAchievements = () => listOrdered(COLLECTIONS.achievements, achievementConv);

/* ---------- Lead (public-writable) ---------- */
export async function createLead(data: Omit<Lead, "createdAt" | "status">) {
  const col = collection(db(), COLLECTIONS.leads);
  return addDoc(col, {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

/* ---------- Media kit request ---------- */
export async function createMediaKitRequest(data: Omit<MediaKitRequest, "createdAt">) {
  const col = collection(db(), COLLECTIONS.mediaKitRequests);
  return addDoc(col, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/* ---------- Generic admin CRUD ---------- */
export async function createDoc<T extends DocumentData>(
  collectionName: string,
  data: T,
) {
  return addDoc(collection(db(), collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateDocById<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>,
) {
  await updateDoc(doc(db(), collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  } as DocumentData);
}

export async function deleteDocById(collectionName: string, id: string) {
  await deleteDoc(doc(db(), collectionName, id));
}

export const listLeads = () => listOrdered<Lead>(COLLECTIONS.leads, leadConv);
export const listMediaKitRequests = () =>
  listOrdered<MediaKitRequest>(COLLECTIONS.mediaKitRequests, mediaKitConv);
