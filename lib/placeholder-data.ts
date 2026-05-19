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
} from "./schemas";

type WithId<T> = T & { id: string };

export const PLACEHOLDER_SITE: Site = {
  fighterName: "ROMAN DOLIDZE",
  nickname: "THE CAUCASIAN",
  weightClass: "MIDDLEWEIGHT — 185 LBS",
  record: { wins: 15, losses: 5, draws: 0, knockouts: 8, submissions: 3 },
  tagline: "PUT YOUR BRAND ON THE FORCE OF THE CAUCASUS.",
  heroVideoUrl: "https://firebasestorage.googleapis.com/v0/b/dolidze-5cdf0.firebasestorage.app/o/portfoliovids%2Fhero2.MP4?alt=media&token=d1887809-4555-4337-a1f5-137f6b3835aa",
  heroPosterUrl: "",
  nextFightDate: "2026-09-14T22:00:00Z",
  nextFightOpponent: "REAPER MARTINEZ",
  nextFightVenue: "T-MOBILE ARENA, LAS VEGAS",
  managerEmail: "manager@romandolidze.com",
  managerPhone: "+1 (555) 010-0199",
  managerWhatsapp: "+15550100199",
  mediaKitUrl: "",
  bioShort:
    "UFC Middleweight contender, world-class grappler, and knockout artist from Georgia. A dominant force in the octagon with a global fanbase of millions. Put your brand on Roman as he marches to the championship.",
};

export const PLACEHOLDER_STATS: WithId<Stat>[] = [
  { id: "1", label: "TOTAL REACH / MONTH", value: 14_800_000, suffix: "+", prefix: "", icon: "Eye", order: 1 },
  { id: "2", label: "INSTAGRAM FOLLOWERS", value: 2_400_000, suffix: "", prefix: "", icon: "AtSign", order: 2 },
  { id: "3", label: "FIGHT VIEW HOURS", value: 47_000_000, suffix: "h", prefix: "", icon: "Video", order: 3 },
  { id: "4", label: "PR VALUE / FIGHT", value: 1_800_000, suffix: "", prefix: "$", icon: "TrendingUp", order: 4 },
  { id: "5", label: "FINISHES", value: 16, suffix: "/20", prefix: "", icon: "Zap", order: 5 },
  { id: "6", label: "COUNTRIES REACHED", value: 92, suffix: "", prefix: "", icon: "Globe", order: 6 },
];

export const PLACEHOLDER_SOCIALS: WithId<Social>[] = [
  { id: "ig", platform: "instagram", handle: "@killerdoe", url: "https://instagram.com", followers: 2_400_000, order: 1 },
  { id: "tt", platform: "tiktok", handle: "@killerdoe", url: "https://tiktok.com", followers: 1_900_000, order: 2 },
  { id: "yt", platform: "youtube", handle: "@KillerDoeOfficial", url: "https://youtube.com", followers: 850_000, order: 3 },
  { id: "tw", platform: "twitter", handle: "@killerdoe", url: "https://x.com", followers: 620_000, order: 4 },
];

export const PLACEHOLDER_AUDIENCE_REGIONS: WithId<AudienceRegion>[] = [
  { id: "us", country: "United States", countryCode: "US", percentage: 38, viewers: 5_624_000, order: 1 },
  { id: "br", country: "Brazil", countryCode: "BR", percentage: 14, viewers: 2_072_000, order: 2 },
  { id: "ru", country: "Russia", countryCode: "RU", percentage: 9, viewers: 1_332_000, order: 3 },
  { id: "mx", country: "Mexico", countryCode: "MX", percentage: 8, viewers: 1_184_000, order: 4 },
  { id: "uk", country: "United Kingdom", countryCode: "GB", percentage: 6, viewers: 888_000, order: 5 },
  { id: "ge", country: "Georgia", countryCode: "GE", percentage: 4, viewers: 592_000, order: 6 },
  { id: "ot", country: "Other", countryCode: "ZZ", percentage: 21, viewers: 3_108_000, order: 7 },
];

export const PLACEHOLDER_AUDIENCE_DEMOGRAPHICS: WithId<AudienceDemographic>[] = [
  { id: "g-m", category: "gender", label: "Male", percentage: 71, order: 1 },
  { id: "g-f", category: "gender", label: "Female", percentage: 29, order: 2 },
  { id: "a-1", category: "age", label: "18-24", percentage: 28, order: 1 },
  { id: "a-2", category: "age", label: "25-34", percentage: 41, order: 2 },
  { id: "a-3", category: "age", label: "35-44", percentage: 19, order: 3 },
  { id: "a-4", category: "age", label: "45+", percentage: 12, order: 4 },
  { id: "i-1", category: "income", label: "$40-80k", percentage: 36, order: 1 },
  { id: "i-2", category: "income", label: "$80-120k", percentage: 31, order: 2 },
  { id: "i-3", category: "income", label: "$120k+", percentage: 21, order: 3 },
  { id: "i-4", category: "income", label: "<$40k", percentage: 12, order: 4 },
];

export const PLACEHOLDER_VIDEOS: WithId<Video>[] = [
  { id: "v1", title: "KO REEL — TOP 5 FINISHES", category: "highlight", youtubeId: "dQw4w9WgXcQ", videoUrl: "", thumbnailUrl: "", featured: true, order: 1 },
  { id: "v2", title: "TRAINING CAMP — WEEK 6", category: "training", youtubeId: "dQw4w9WgXcQ", videoUrl: "", thumbnailUrl: "", featured: false, order: 2 },
  { id: "v3", title: "WALKOUT — UFC 301", category: "walkout", youtubeId: "dQw4w9WgXcQ", videoUrl: "", thumbnailUrl: "", featured: false, order: 3 },
  { id: "v4", title: "LIFESTYLE — DAY IN THE LIFE", category: "lifestyle", youtubeId: "dQw4w9WgXcQ", videoUrl: "", thumbnailUrl: "", featured: false, order: 4 },
];

const placeholderImg = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const PLACEHOLDER_GALLERY: WithId<GalleryItem>[] = [
  { id: "g1", imageUrl: placeholderImg("fighter1", 1200, 1500), alt: "Walkout silhouette", hoverVideoUrl: "", cols: 2, rows: 2, order: 1 },
  { id: "g2", imageUrl: placeholderImg("fighter2", 800, 800), alt: "Gloves up", hoverVideoUrl: "", cols: 1, rows: 1, order: 2 },
  { id: "g3", imageUrl: placeholderImg("fighter3", 800, 800), alt: "Bloody knuckles", hoverVideoUrl: "", cols: 1, rows: 1, order: 3 },
  { id: "g4", imageUrl: placeholderImg("fighter4", 1200, 800), alt: "Training", hoverVideoUrl: "", cols: 2, rows: 1, order: 4 },
  { id: "g5", imageUrl: placeholderImg("fighter5", 800, 1200), alt: "Press conference", hoverVideoUrl: "", cols: 1, rows: 2, order: 5 },
  { id: "g6", imageUrl: placeholderImg("fighter6", 800, 800), alt: "Belt", hoverVideoUrl: "", cols: 1, rows: 1, order: 6 },
  { id: "g7", imageUrl: placeholderImg("fighter7", 800, 800), alt: "Stare-down", hoverVideoUrl: "", cols: 1, rows: 1, order: 7 },
  { id: "g8", imageUrl: placeholderImg("fighter8", 1600, 900), alt: "Crowd shot", hoverVideoUrl: "", cols: 3, rows: 1, order: 8 },
];

export const PLACEHOLDER_PACKAGES: WithId<Package>[] = [
  {
    id: "bronze",
    name: "BRONZE",
    tier: "bronze",
    priceUSD: 7_500,
    perks: ["Logo on training kit", "1 IG story per month", "Branded post-fight shoutout"],
    estimatedImpressions: 250_000,
    highlighted: false,
    ctaLabel: "INQUIRE NOW",
    order: 1,
  },
  {
    id: "silver",
    name: "SILVER",
    tier: "silver",
    priceUSD: 25_000,
    perks: ["Logo on shorts (small)", "2 IG posts + 4 stories", "1 YouTube vlog feature", "Walkout shirt placement"],
    estimatedImpressions: 1_200_000,
    highlighted: false,
    ctaLabel: "INQUIRE NOW",
    order: 2,
  },
  {
    id: "gold",
    name: "GOLD",
    tier: "gold",
    priceUSD: 75_000,
    perks: ["Logo on shorts (large)", "Walkout banner placement", "Monthly IG feature", "YouTube intro logo", "Press conference backdrop"],
    estimatedImpressions: 6_500_000,
    highlighted: true,
    ctaLabel: "CLAIM GOLD",
    order: 3,
  },
  {
    id: "title",
    name: "TITLE SPONSOR",
    tier: "title",
    priceUSD: 250_000,
    perks: ["Chest plate (primary)", "Walkout shirt (front)", "Dedicated campaign", "Co-branded content", "VIP fight access"],
    estimatedImpressions: 22_000_000,
    highlighted: false,
    ctaLabel: "OWN THE FIGHTER",
    order: 4,
  },
];

export const PLACEHOLDER_GEAR_ZONES: WithId<GearZone>[] = [
  { id: "chest", name: "CHEST PLATE", x: 35, y: 28, width: 30, height: 14, impressions: 9_500_000, priceFromUSD: 120_000, baseImageUrl: "", order: 1 },
  { id: "thigh-l", name: "LEFT THIGH", x: 22, y: 55, width: 18, height: 12, impressions: 4_200_000, priceFromUSD: 35_000, baseImageUrl: "", order: 2 },
  { id: "thigh-r", name: "RIGHT THIGH", x: 60, y: 55, width: 18, height: 12, impressions: 4_200_000, priceFromUSD: 35_000, baseImageUrl: "", order: 3 },
  { id: "back", name: "REAR (BACK)", x: 35, y: 70, width: 30, height: 14, impressions: 2_800_000, priceFromUSD: 18_000, baseImageUrl: "", order: 4 },
  { id: "gloves", name: "GLOVES", x: 8, y: 38, width: 12, height: 10, impressions: 6_100_000, priceFromUSD: 45_000, baseImageUrl: "", order: 5 },
];

export const PLACEHOLDER_SPONSORS: WithId<Sponsor>[] = [
  { id: "s1", name: "MONSTER", logoUrl: "", websiteUrl: "https://example.com", order: 1 },
  { id: "s2", name: "REEBOK", logoUrl: "", websiteUrl: "https://example.com", order: 2 },
  { id: "s3", name: "VENUM", logoUrl: "", websiteUrl: "https://example.com", order: 3 },
  { id: "s4", name: "GYMSHARK", logoUrl: "", websiteUrl: "https://example.com", order: 4 },
  { id: "s5", name: "DRAFTKINGS", logoUrl: "", websiteUrl: "https://example.com", order: 5 },
  { id: "s6", name: "BANG ENERGY", logoUrl: "", websiteUrl: "https://example.com", order: 6 },
  { id: "s7", name: "MANSCAPED", logoUrl: "", websiteUrl: "https://example.com", order: 7 },
  { id: "s8", name: "PRIME", logoUrl: "", websiteUrl: "https://example.com", order: 8 },
];

export const PLACEHOLDER_TESTIMONIALS: WithId<Testimonial>[] = [
  {
    id: "t1",
    author: "ALEX KIM",
    company: "RAGE ENERGY",
    role: "CMO",
    quote: "Sales spiked 340% the week after Doe wore our logo. The man IS the marketing campaign.",
    photoUrl: placeholderImg("ceo1", 400, 400),
    videoUrl: "",
    rating: 5,
    order: 1,
  },
  {
    id: "t2",
    author: "MARIA LOPEZ",
    company: "FORGE APPAREL",
    role: "Founder",
    quote: "We launched a co-branded line with Doe — sold out in 48 hours. Best ROI we've ever seen.",
    photoUrl: placeholderImg("ceo2", 400, 400),
    videoUrl: "",
    rating: 5,
    order: 2,
  },
  {
    id: "t3",
    author: "DIMITRI PETROV",
    company: "IRON SUPPS",
    role: "CEO",
    quote: "He doesn't read scripts. He fights for the brand like he fights in the cage. Authentic = converts.",
    photoUrl: placeholderImg("ceo3", 400, 400),
    videoUrl: "",
    rating: 5,
    order: 3,
  },
];

export const PLACEHOLDER_PRESS: WithId<PressItem>[] = [
  { id: "p1", outlet: "ESPN", logoUrl: "", title: "Doe Is The Most Dangerous Lightweight On Earth", url: "https://espn.com", date: "2026-04-12", order: 1 },
  { id: "p2", outlet: "MMA FIGHTING", logoUrl: "", title: "How Doe Became A Marketing Force", url: "https://mmafighting.com", date: "2026-03-08", order: 2 },
  { id: "p3", outlet: "SHERDOG", logoUrl: "", title: "P4P Rankings: Doe Climbs To #3", url: "https://sherdog.com", date: "2026-02-21", order: 3 },
  { id: "p4", outlet: "BLOODY ELBOW", logoUrl: "", title: "The Hammer Drops Another Title Hopeful", url: "https://bloodyelbow.com", date: "2026-01-15", order: 4 },
];

export const PLACEHOLDER_ACHIEVEMENTS: WithId<Achievement>[] = [
  { id: "a1", title: "INTERIM LIGHTWEIGHT CHAMPION", year: "2025", description: "Captured belt via 2nd-round TKO.", iconType: "belt", order: 1 },
  { id: "a2", title: "P4P #3 RANKED", year: "2026", description: "Currently top-3 pound-for-pound globally.", iconType: "ranking", order: 2 },
  { id: "a3", title: "PERFORMANCE OF THE NIGHT × 6", year: "2022-2026", description: "Record-setting bonus streak.", iconType: "trophy", order: 3 },
  { id: "a4", title: "FIGHT OF THE YEAR (2024)", year: "2024", description: "Voted by fans and media.", iconType: "medal", order: 4 },
];
