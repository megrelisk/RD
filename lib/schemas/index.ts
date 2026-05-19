import { z } from "zod";

/* ---------- Site (singleton) ---------- */
export const SiteSchema = z.object({
  fighterName: z.string().min(1),
  nickname: z.string().min(1),
  weightClass: z.string().min(1),
  record: z.object({
    wins: z.number().int().nonnegative(),
    losses: z.number().int().nonnegative(),
    draws: z.number().int().nonnegative(),
    knockouts: z.number().int().nonnegative(),
    submissions: z.number().int().nonnegative(),
  }),
  tagline: z.string(),
  heroVideoUrl: z.string().url().optional().or(z.literal("")),
  heroPosterUrl: z.string().url().optional().or(z.literal("")),
  nextFightDate: z.string().optional().or(z.literal("")),
  nextFightOpponent: z.string().optional().or(z.literal("")),
  nextFightVenue: z.string().optional().or(z.literal("")),
  managerEmail: z.string().email().optional().or(z.literal("")),
  managerPhone: z.string().optional().or(z.literal("")),
  managerWhatsapp: z.string().optional().or(z.literal("")),
  mediaKitUrl: z.string().url().optional().or(z.literal("")),
  bioShort: z.string(),
});
export type Site = z.infer<typeof SiteSchema>;

/* ---------- Stats ---------- */
export const StatSchema = z.object({
  label: z.string().min(1),
  value: z.number(),
  suffix: z.string().default(""),
  prefix: z.string().default(""),
  icon: z.string().default(""), // lucide icon name
  order: z.number().int().default(0),
});
export type Stat = z.infer<typeof StatSchema>;

/* ---------- Socials ---------- */
export const SocialSchema = z.object({
  platform: z.enum(["instagram", "tiktok", "youtube", "twitter", "facebook"]),
  handle: z.string().min(1),
  url: z.string().url(),
  followers: z.number().int().nonnegative(),
  order: z.number().int().default(0),
});
export type Social = z.infer<typeof SocialSchema>;

/* ---------- Audience ---------- */
export const AudienceRegionSchema = z.object({
  country: z.string().min(1),
  countryCode: z.string().length(2), // ISO 3166-1 alpha-2
  percentage: z.number().min(0).max(100),
  viewers: z.number().int().nonnegative(),
  order: z.number().int().default(0),
});
export type AudienceRegion = z.infer<typeof AudienceRegionSchema>;

export const AudienceDemographicSchema = z.object({
  category: z.enum(["age", "gender", "income"]),
  label: z.string().min(1),
  percentage: z.number().min(0).max(100),
  order: z.number().int().default(0),
});
export type AudienceDemographic = z.infer<typeof AudienceDemographicSchema>;

/* ---------- Videos ---------- */
export const VideoSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["highlight", "training", "walkout", "lifestyle", "interview"]),
  youtubeId: z.string().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});
export type Video = z.infer<typeof VideoSchema>;

/* ---------- Gallery ---------- */
export const GalleryItemSchema = z.object({
  imageUrl: z.string().url(),
  alt: z.string().default(""),
  hoverVideoUrl: z.string().url().optional().or(z.literal("")),
  cols: z.number().int().min(1).max(4).default(1),
  rows: z.number().int().min(1).max(4).default(1),
  order: z.number().int().default(0),
});
export type GalleryItem = z.infer<typeof GalleryItemSchema>;

/* ---------- Sponsorship Packages ---------- */
export const PackageSchema = z.object({
  name: z.string().min(1),
  tier: z.enum(["bronze", "silver", "gold", "title"]),
  priceUSD: z.number().int().nonnegative(),
  perks: z.array(z.string()).default([]),
  estimatedImpressions: z.number().int().nonnegative().default(0),
  highlighted: z.boolean().default(false),
  ctaLabel: z.string().default("INQUIRE NOW"),
  order: z.number().int().default(0),
});
export type Package = z.infer<typeof PackageSchema>;

/* ---------- Gear Zones (logo placement) ---------- */
export const GearZoneSchema = z.object({
  name: z.string().min(1),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  width: z.number().min(0).max(100),
  height: z.number().min(0).max(100),
  impressions: z.number().int().nonnegative(),
  priceFromUSD: z.number().int().nonnegative(),
  baseImageUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
});
export type GearZone = z.infer<typeof GearZoneSchema>;

/* ---------- Sponsors (past partners) ---------- */
export const SponsorSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().url(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
});
export type Sponsor = z.infer<typeof SponsorSchema>;

/* ---------- Testimonials ---------- */
export const TestimonialSchema = z.object({
  author: z.string().min(1),
  company: z.string().min(1),
  role: z.string().default(""),
  quote: z.string().min(1),
  photoUrl: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  rating: z.number().min(1).max(5).default(5),
  order: z.number().int().default(0),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

/* ---------- Press ---------- */
export const PressItemSchema = z.object({
  outlet: z.string().min(1),
  logoUrl: z.string().url(),
  title: z.string().default(""),
  url: z.string().url(),
  date: z.string().default(""),
  order: z.number().int().default(0),
});
export type PressItem = z.infer<typeof PressItemSchema>;

/* ---------- Achievements ---------- */
export const AchievementSchema = z.object({
  title: z.string().min(1),
  year: z.string().default(""),
  description: z.string().default(""),
  iconType: z.enum(["belt", "trophy", "medal", "ranking"]).default("trophy"),
  order: z.number().int().default(0),
});
export type Achievement = z.infer<typeof AchievementSchema>;

/* ---------- Leads (public-writable) ---------- */
export const LeadSchema = z.object({
  company: z.string().min(1, "Company name required"),
  contactName: z.string().min(1, "Contact name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional().or(z.literal("")),
  budget: z.string().min(1, "Pick a budget"),
  packageInterest: z.string().optional().or(z.literal("")),
  fightDateInterest: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more (min 10 chars)").max(2000),
  status: z.enum(["new", "contacted", "negotiating", "won", "lost"]).optional(),
  createdAt: z.string().optional(),
});
export type Lead = z.infer<typeof LeadSchema>;

/* ---------- Media Kit Requests ---------- */
export const MediaKitRequestSchema = z.object({
  email: z.string().email(),
  company: z.string().min(1),
  createdAt: z.string().optional(),
});
export type MediaKitRequest = z.infer<typeof MediaKitRequestSchema>;
