import "server-only";

import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type {
  Achievement,
  AudienceDemographic,
  AudienceRegion,
  GalleryItem,
  GearZone,
  Package,
  PressItem,
  Site,
  Social,
  Sponsor,
  Stat,
  Testimonial,
  Video,
} from "@/lib/schemas";
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
} from "@/lib/placeholder-data";

type WithId<T> = T & { id: string };

export type LandingData = {
  site: Site;
  stats: WithId<Stat>[];
  socials: WithId<Social>[];
  regions: WithId<AudienceRegion>[];
  demographics: WithId<AudienceDemographic>[];
  videos: WithId<Video>[];
  gallery: WithId<GalleryItem>[];
  packages: WithId<Package>[];
  gearZones: WithId<GearZone>[];
  sponsors: WithId<Sponsor>[];
  testimonials: WithId<Testimonial>[];
  press: WithId<PressItem>[];
  achievements: WithId<Achievement>[];
  fromFirestore: boolean;
};

function placeholders(): LandingData {
  return {
    site: PLACEHOLDER_SITE,
    stats: PLACEHOLDER_STATS,
    socials: PLACEHOLDER_SOCIALS,
    regions: PLACEHOLDER_AUDIENCE_REGIONS,
    demographics: PLACEHOLDER_AUDIENCE_DEMOGRAPHICS,
    videos: PLACEHOLDER_VIDEOS,
    gallery: PLACEHOLDER_GALLERY,
    packages: PLACEHOLDER_PACKAGES,
    gearZones: PLACEHOLDER_GEAR_ZONES,
    sponsors: PLACEHOLDER_SPONSORS,
    testimonials: PLACEHOLDER_TESTIMONIALS,
    press: PLACEHOLDER_PRESS,
    achievements: PLACEHOLDER_ACHIEVEMENTS,
    fromFirestore: false,
  };
}

function hasAdminConfig() {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

async function listOrdered<T>(name: string): Promise<WithId<T>[]> {
  const snap = await adminDb().collection(name).orderBy("order", "asc").get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function loadLandingDataServer(): Promise<LandingData> {
  if (!hasAdminConfig()) return placeholders();

  try {
    const db = adminDb();
    const [
      siteDoc,
      stats,
      socials,
      regions,
      demographics,
      videos,
      gallery,
      packages,
      gearZones,
      sponsors,
      testimonials,
      press,
      achievements,
    ] = await Promise.all([
      db.doc(`${COLLECTIONS.site}/main`).get(),
      listOrdered<Stat>(COLLECTIONS.stats),
      listOrdered<Social>(COLLECTIONS.socials),
      listOrdered<AudienceRegion>(COLLECTIONS.audienceRegions),
      listOrdered<AudienceDemographic>(COLLECTIONS.audienceDemographics),
      listOrdered<Video>(COLLECTIONS.videos),
      listOrdered<GalleryItem>(COLLECTIONS.gallery),
      listOrdered<Package>(COLLECTIONS.packages),
      listOrdered<GearZone>(COLLECTIONS.gearZones),
      listOrdered<Sponsor>(COLLECTIONS.sponsors),
      listOrdered<Testimonial>(COLLECTIONS.testimonials),
      listOrdered<PressItem>(COLLECTIONS.press),
      listOrdered<Achievement>(COLLECTIONS.achievements),
    ]);

    const site = siteDoc.exists ? (siteDoc.data() as Site) : PLACEHOLDER_SITE;

    return {
      site,
      stats: stats.length ? stats : PLACEHOLDER_STATS,
      socials: socials.length ? socials : PLACEHOLDER_SOCIALS,
      regions: regions.length ? regions : PLACEHOLDER_AUDIENCE_REGIONS,
      demographics: demographics.length ? demographics : PLACEHOLDER_AUDIENCE_DEMOGRAPHICS,
      videos: videos.length ? videos : PLACEHOLDER_VIDEOS,
      gallery: gallery.length ? gallery : PLACEHOLDER_GALLERY,
      packages: packages.length ? packages : PLACEHOLDER_PACKAGES,
      gearZones: gearZones.length ? gearZones : PLACEHOLDER_GEAR_ZONES,
      sponsors: sponsors.length ? sponsors : PLACEHOLDER_SPONSORS,
      testimonials: testimonials.length ? testimonials : PLACEHOLDER_TESTIMONIALS,
      press: press.length ? press : PLACEHOLDER_PRESS,
      achievements: achievements.length ? achievements : PLACEHOLDER_ACHIEVEMENTS,
      fromFirestore: true,
    };
  } catch (err) {
    console.warn("[landing-server] Admin SDK load failed, using placeholders:", err);
    return placeholders();
  }
}
