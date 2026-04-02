import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderWalker from "@/components/themes/walker/HeaderWalker";
import FooterWalker from "@/components/themes/walker/FooterWalker";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY } from "@/sanity/lib/queries";

export const metadata = {
    title: "Products — Habitatory",
    description:
        "Explore Habitatory's premium products — custom backdrops for stunning event settings and photograph binders to preserve your treasured memories.",
};

// Revalidate every 60 seconds so new Sanity edits appear quickly
export const revalidate = 60;

type Product = {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    features: string[];
    order: number;
};

// Hardcoded fallback products shown when no products exist in Sanity yet
const FALLBACK_PRODUCTS: Product[] = [
    {
        _id: "fallback-1",
        title: "Custom Backdrops",
        imageUrl: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM.jpeg",
        description:
            "Transform any space into a breathtaking scene with our bespoke backdrops. From elegant floral walls and shimmering sequin panels to hand-painted murals and custom-printed designs, each backdrop is crafted to match your event's unique theme and colour palette.",
        features: [
            "Floral & botanical walls",
            "Sequin & shimmer panels",
            "Custom-printed photo walls",
            "Fabric draping & curtain backdrops",
            "Themed stage designs",
        ],
        order: 0,
    },
    {
        _id: "fallback-2",
        title: "Photograph Binders",
        imageUrl: "/images/WhatsApp Image 2026-02-17 at 11.32.07 PM (1).jpeg",
        description:
            "Preserve your most treasured moments in our luxurious photograph binders. Each binder is carefully crafted with premium materials, offering an elegant and timeless way to relive the magic of your celebration for years to come.",
        features: [
            "Premium leather & linen covers",
            "Acid-free archival pages",
            "Custom monogram embossing",
            "Multiple size options",
            "Gift-ready packaging",
        ],
        order: 1,
    },
];

export default async function ProductsPage() {
    const products: Product[] = await client.fetch(ALL_PRODUCTS_QUERY);

    // Use Sanity data if available, otherwise show fallback products
    const displayProducts = products && products.length > 0 ? products : FALLBACK_PRODUCTS;

    return (
        <main className="min-h-screen bg-white">
            <HeaderWalker />

            {/* Hero Banner */}
            <section className="relative w-full h-[40vh] min-h-[320px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/WhatsApp Image 2026-02-17 at 11.32.06 PM (1).jpeg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c47]/80 to-[#1a3c47]/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our Products
                    </h1>
                    <div className="w-20 h-0.5 bg-[#d4af37] mb-4" />
                    <p className="text-white/80 text-lg md:text-xl italic max-w-2xl">
                        Premium products to elevate your celebrations
                    </p>
                </div>
            </section>

            {/* Products */}
            <section className="py-24 px-6 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    {displayProducts.map((product, index) => (
                        <div
                            key={product._id}
                            className={`flex flex-col ${
                                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            } gap-10 md:gap-16 items-center`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/2">
                                <div className="relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden shadow-xl">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c47]/20 to-transparent" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2">
                                <h2
                                    className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {product.title}
                                </h2>
                                <div className="w-12 h-0.5 bg-[#d4af37] mb-6" />
                                <p className="text-zinc-600 text-base leading-relaxed mb-6">
                                    {product.description}
                                </p>

                                {product.features && product.features.length > 0 && (
                                    <ul className="space-y-3 mb-8">
                                        {product.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-3 text-sm text-zinc-600"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 border-2 border-[#2C5F72] text-[#2C5F72] font-semibold px-6 py-3 rounded-lg hover:bg-[#2C5F72] hover:text-white transition-all duration-300 text-sm tracking-wide"
                                >
                                    Enquire Now
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 md:px-8 bg-[#faf8f5]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Looking for Something Custom?
                    </h2>
                    <p className="text-zinc-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                        We love bringing unique ideas to life. Reach out to discuss your
                        custom requirements and let us create something exclusively for you.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a3c47] font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-lg hover:bg-[#e8c964] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Contact Us
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <FooterWalker />
        </main>
    );
}
