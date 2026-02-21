import HeaderWalker from "@/components/themes/walker/HeaderWalker";
import HeroWalker from "@/components/themes/walker/HeroWalker";
import ProcessWalker from "@/components/themes/walker/ProcessWalker";
import ServicesWalker from "@/components/themes/walker/ServicesWalker";
import SpecialtiesWalker from "@/components/themes/walker/SpecialtiesWalker";
import FooterWalker from "@/components/themes/walker/FooterWalker";

import EventGallery from "@/components/EventGallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderWalker />
      <HeroWalker />
      <ProcessWalker />
      <ServicesWalker />
      <SpecialtiesWalker />

      {/* Gallery Section */}
      <section id="gallery">
        <EventGallery />
      </section>

      <FooterWalker />
    </main>
  );
}
