// Revalidate every 60 seconds — picks up Sanity CMS changes without rebuilding
export const revalidate = 60;

import HeaderWalker from "@/components/themes/walker/HeaderWalker";
import HeroWalker from "@/components/themes/walker/HeroWalker";
import ProcessWalker from "@/components/themes/walker/ProcessWalker";
import ServicesWalker from "@/components/themes/walker/ServicesWalker";
import SpecialtiesWalker from "@/components/themes/walker/SpecialtiesWalker";
import FooterWalker from "@/components/themes/walker/FooterWalker";

import Testimonials from "@/components/Testimonials";
import { getSiteSettings, getHeroSlides, getAllServices } from "@/sanity/lib/fetchers";

export default async function Home() {
  const [settings, heroSlides, services] = await Promise.all([
    getSiteSettings(),
    getHeroSlides(),
    getAllServices(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <HeaderWalker />
      <HeroWalker tagline={settings?.tagline} companyName={settings?.companyName} slides={heroSlides} />
      <ProcessWalker aboutText={settings?.aboutText} />
      <ServicesWalker services={services} />
      <SpecialtiesWalker />

      {/* Testimonials Section */}
      <Testimonials />

      <FooterWalker />
    </main>
  );
}
