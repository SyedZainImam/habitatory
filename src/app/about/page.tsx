import React from "react";
import Link from "next/link";
import HeaderWalker from "@/components/themes/walker/HeaderWalker";
import FooterWalker from "@/components/themes/walker/FooterWalker";
import { Heart, Sparkles, Users, Star, ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/sanity/lib/fetchers";

export const metadata = {
    title: "About Us — Habitatory",
    description:
        "Learn about Habitatory — a passionate team dedicated to crafting unforgettable events. From corporate galas to birthday parties, we transform your vision into reality.",
    openGraph: {
        title: "About Us — Habitatory",
        description:
            "A passionate team dedicated to crafting unforgettable events.",
    },
};

const VALUES = [
    {
        icon: Heart,
        title: "Passion for Perfection",
        description:
            "Every event is a canvas for our creativity. We pour our hearts into every detail, ensuring each celebration is as unique and extraordinary as the people we serve.",
    },
    {
        icon: Sparkles,
        title: "Creative Excellence",
        description:
            "We believe that the magic lies in the details. Our team of creative visionaries pushes boundaries to deliver breathtaking experiences that leave lasting impressions.",
    },
    {
        icon: Users,
        title: "Client-Centred Approach",
        description:
            "Your story is at the heart of every event we design. We listen, we understand, and we craft celebrations that authentically reflect your personality and vision.",
    },
    {
        icon: Star,
        title: "Memorable Moments",
        description:
            "We don't just plan events — we create memories. From the first spark of an idea to the final farewell, every moment is designed to be cherished forever.",
    },
];

export const revalidate = 60;

export default async function AboutPage() {
    const settings = await getSiteSettings();
    const heroImageUrl = settings?.aboutHeroImageUrl;

    return (
        <main className="min-h-screen bg-white">
            <HeaderWalker />

            {/* Hero Banner */}
            <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                {heroImageUrl ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${heroImageUrl}')` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#1a3c47]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c47]/80 to-[#1a3c47]/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        About Habitatory
                    </h1>
                    <div className="w-20 h-0.5 bg-[#d4af37] mb-4" />
                    <p className="text-white/80 text-lg md:text-xl italic max-w-2xl">
                        Where every celebration becomes a masterpiece
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 px-6 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4 tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our Story
                    </h2>
                    <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mb-10" />

                    <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed text-left">
                        <p>
                            At Habitatory, we believe that every event tells a story — and it&apos;s our
                            passion to make that story unforgettable. Born from a love for
                            creativity and an obsession with detail, Habitatory was founded with a
                            singular mission: to transform ordinary moments into extraordinary
                            memories.
                        </p>
                        <p>
                            Our journey began with a simple idea — that celebrations should be as
                            unique as the people behind them. Whether it&apos;s a sparkling corporate
                            gala, an intimate birthday gathering, or an elegant private soirée, we
                            approach each event as a one-of-a-kind experience deserving of the
                            highest craft and care.
                        </p>
                        <p>
                            What sets us apart is our deeply personal approach. We don&apos;t believe in
                            templates or cookie-cutter solutions. Instead, we sit down with every
                            client, listen to their dreams, and work tirelessly to bring those
                            visions to life — down to the last petal, the last note of music, and
                            the last ray of light.
                        </p>
                        <p>
                            From custom backdrops that set the perfect scene to professional
                            photography that captures every precious moment, our end-to-end
                            services ensure that you can relax and enjoy the festivities while we
                            handle the rest. Because at Habitatory, your joy is our greatest
                            achievement.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-[#faf8f5] py-24 px-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2
                            className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4 tracking-wider uppercase"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            What Drives Us
                        </h2>
                        <div className="w-16 h-0.5 bg-[#d4af37] mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {VALUES.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-8 shadow-sm border border-zinc-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-full bg-[#2C5F72] flex items-center justify-center text-white mb-5">
                                        <Icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-[#1a3c47] mb-3"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {value.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 md:px-8 bg-[#2C5F72]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Ready to Create Something Extraordinary?
                    </h2>
                    <p className="text-teal-100/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                        Let&apos;s turn your vision into a celebration that you and your guests
                        will remember forever.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a3c47] font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-lg hover:bg-[#e8c964] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Get In Touch
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <FooterWalker />
        </main>
    );
}
