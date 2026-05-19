import { AudienceInsights } from "@/components/sections/AudienceInsights";
import { BookingForm } from "@/components/sections/BookingForm";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { GearVisualizer } from "@/components/sections/GearVisualizer";
import { Hero } from "@/components/sections/Hero";
import { HighlightReel } from "@/components/sections/HighlightReel";
import { Navbar } from "@/components/sections/Navbar";
import { SponsorshipPackages } from "@/components/sections/SponsorshipPackages";
import { StatsBar } from "@/components/sections/StatsBar";
import { TrustBlock } from "@/components/sections/TrustBlock";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { KOEasterEgg } from "@/components/effects/KOEasterEgg";
import { loadLandingDataServer } from "@/lib/load-landing-data-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const data = await loadLandingDataServer();

  return (
    <div id="top" className="relative min-h-screen bg-black">
      <Navbar fighterName={data.site.fighterName} />
      <CustomCursor />
      <KOEasterEgg />

      <Hero site={data.site} socials={data.socials} />
      <StatsBar stats={data.stats} site={data.site} />
      <HighlightReel videos={data.videos} />
      <Gallery items={data.gallery} />
      <SponsorshipPackages packages={data.packages} />
      <GearVisualizer zones={data.gearZones} />
      <AudienceInsights regions={data.regions} demographics={data.demographics} />
      <TrustBlock sponsors={data.sponsors} testimonials={data.testimonials} />
      <BookingForm site={data.site} packages={data.packages} />
      <Footer site={data.site} socials={data.socials} />
    </div>
  );
}
