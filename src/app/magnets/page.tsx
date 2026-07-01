import { getSiteSettings } from "@/sanity/lib/fetchers";
import MagnetOrderFlow from "@/components/magnets/MagnetOrderFlow";
import type { MagnetSiteInfo } from "@/lib/draw-magnet-sheet";

export const revalidate = 60;

export const metadata = {
    title: "Order Fridge Magnets | Habitatory",
    description: "Upload your favourite photos and get them printed as custom fridge magnets.",
};

function extractInstagramHandle(url: string | undefined): string {
    if (!url) return "habitatory.ca";
    const match = url.match(/instagram\.com\/([^/?#]+)/);
    return match ? match[1] : url;
}

function cleanPhone(phone: string | undefined): string {
    if (!phone) return "1234567890";
    return phone.replace(/\D/g, "");
}

export default async function MagnetsPage() {
    const settings = await getSiteSettings();

    const siteInfo: MagnetSiteInfo = {
        companyName: settings?.companyName ?? "Habitatory",
        email: settings?.email ?? "habitatory@gmail.com",
        website: "www.habitatory.ca",
        instagramHandle: extractInstagramHandle(settings?.socialLinks?.instagram),
    };

    const whatsappPhone = cleanPhone(settings?.phone);

    return (
        <main>
            {/* Hero */}
            <div className="bg-[#2C5F72] text-white py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Custom Fridge Magnets
                </h1>
                <p className="text-lg text-white/80 max-w-xl mx-auto">
                    Upload 6 of your favourite photos — we&apos;ll print them as a beautiful set of magnets.
                </p>
            </div>

            {/* Order flow */}
            <MagnetOrderFlow siteInfo={siteInfo} whatsappPhone={whatsappPhone} />
        </main>
    );
}
