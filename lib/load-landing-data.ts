import {
  getSite,
  listAchievements,
  listAudienceDemographics,
  listAudienceRegions,
  listGallery,
  listGearZones,
  listPackages,
  listPress,
  listSocials,
  listSponsors,
  listStats,
  listTestimonials,
  listVideos,
} from "@/lib/firebase/collections";
import { isFirebaseConfigured } from "@/lib/firebase/client";
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

export type LandingData = {
  site: typeof PLACEHOLDER_SITE;
  stats: typeof PLACEHOLDER_STATS;
  socials: typeof PLACEHOLDER_SOCIALS;
  regions: typeof PLACEHOLDER_AUDIENCE_REGIONS;
  demographics: typeof PLACEHOLDER_AUDIENCE_DEMOGRAPHICS;
  videos: typeof PLACEHOLDER_VIDEOS;
  gallery: typeof PLACEHOLDER_GALLERY;
  packages: typeof PLACEHOLDER_PACKAGES;
  gearZones: typeof PLACEHOLDER_GEAR_ZONES;
  sponsors: typeof PLACEHOLDER_SPONSORS;
  testimonials: typeof PLACEHOLDER_TESTIMONIALS;
  press: typeof PLACEHOLDER_PRESS;
  achievements: typeof PLACEHOLDER_ACHIEVEMENTS;
  fromFirestore: boolean;
};

function pickPlaceholders(): LandingData {
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

/**
 * Loads all landing-page data. Tries Firestore first; falls back to
 * rich placeholder data so the site is fully populated out of the box.
 *
 * Per-collection fallback: if a collection is empty in Firestore we use
 * the placeholder for that slice. Lets the admin gradually replace content.
 */
export async function loadLandingData(): Promise<LandingData> {
  if (!isFirebaseConfigured()) return pickPlaceholders();

  try {
    const [
      site,
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
      getSite().catch(() => null),
      listStats().catch(() => []),
      listSocials().catch(() => []),
      listAudienceRegions().catch(() => []),
      listAudienceDemographics().catch(() => []),
      listVideos().catch(() => []),
      listGallery().catch(() => []),
      listPackages().catch(() => []),
      listGearZones().catch(() => []),
      listSponsors().catch(() => []),
      listTestimonials().catch(() => []),
      listPress().catch(() => []),
      listAchievements().catch(() => []),
    ]);

    return {
      site: site ?? PLACEHOLDER_SITE,
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
    console.warn("[landing] Firestore load failed, using placeholders:", err);
    return pickPlaceholders();
  }
}
