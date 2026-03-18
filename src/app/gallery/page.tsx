import React from "react";
import Image from "next/image";
import HeaderWalker from "@/components/themes/walker/HeaderWalker";
import FooterWalker from "@/components/themes/walker/FooterWalker";

export const metadata = {
    title: "Gallery — Habitatory",
    description:
        "Browse our gallery of stunning events crafted by Habitatory — from corporate galas and birthday parties to private soirées.",
};

const GALLERY_IMAGES = [
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM (1).jpeg",
        title: "Annual Corporate Gala",
        category: "Corporate",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM.jpeg",
        title: "Sunset Rooftop Celebration",
        category: "Private Soirée",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.07 PM (1).jpeg",
        title: "Golden Anniversary Dinner",
        category: "Birthday Party",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.07 PM.jpeg",
        title: "Enchanted Garden Party",
        category: "Private Soirée",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM (1).jpeg",
        title: "Executive Awards Night",
        category: "Corporate",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM.jpeg",
        title: "Elegant Milestone Birthday",
        category: "Birthday Party",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.09 PM (1).jpeg",
        title: "Charity Fundraiser Gala",
        category: "Corporate",
    },
    {
        src: "/images/WhatsApp Image 2026-02-17 at 11.32.09 PM.jpeg",
        title: "Intimate Candle-Lit Soirée",
        category: "Private Soirée",
    },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-white">
            <HeaderWalker />

            {/* Hero Banner */}
            <section className="relative w-full h-[40vh] min-h-[320px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/WhatsApp Image 2026-02-17 at 11.32.09 PM.jpeg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c47]/80 to-[#1a3c47]/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our Gallery
                    </h1>
                    <div className="w-20 h-0.5 bg-[#d4af37] mb-4" />
                    <p className="text-white/80 text-lg md:text-xl italic max-w-2xl">
                        A glimpse into our most cherished celebrations
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24 px-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {GALLERY_IMAGES.map((img, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                            >
                                <div className="relative w-full h-72">
                                    <Image
                                        src={img.src}
                                        alt={img.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase">
                                        {img.category}
                                    </span>
                                    <h3
                                        className="text-white font-bold text-lg mt-1"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {img.title}
                                    </h3>
                                </div>
                                {/* Category badge always visible */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#2C5F72] shadow-sm group-hover:opacity-0 transition-opacity duration-300">
                                    {img.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterWalker />
        </main>
    );
}
