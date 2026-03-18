"use client";

import React, { useState, useEffect, useCallback } from "react";

const SLIDES = [
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.07 PM.jpeg",
        caption: "Elegant Corporate Galas That Inspire",
    },
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM (1).jpeg",
        caption: "Unforgettable Birthday Celebrations",
    },
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM.jpeg",
        caption: "Intimate Private Soirées With Style",
    },
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.09 PM.jpeg",
        caption: "Bespoke Themes Crafted to Perfection",
    },
];

interface HeroWalkerProps {
    tagline?: string;
    companyName?: string;
}

const HeroWalker = ({ tagline, companyName }: HeroWalkerProps) => {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToSlide = useCallback(
        (index: number) => {
            if (index === current || isTransitioning) return;
            setIsTransitioning(true);
            setCurrent(index);
            setTimeout(() => setIsTransitioning(false), 800);
        },
        [current, isTransitioning]
    );

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
            {/* Background Images with Fade */}
            {SLIDES.map((slide, index) => (
                <div
                    key={index}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms] ease-in-out"
                    style={{
                        backgroundImage: `url('${slide.image}')`,
                        opacity: index === current ? 1 : 0,
                    }}
                />
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Slide Caption */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="relative overflow-hidden py-4">
                    {SLIDES.map((slide, index) => (
                        <p
                            key={index}
                            className={`text-white text-2xl md:text-4xl lg:text-5xl italic tracking-wide drop-shadow-lg transition-all duration-700 ease-in-out ${
                                index === current
                                    ? "opacity-100 translate-y-0 relative"
                                    : "opacity-0 translate-y-4 absolute inset-0"
                            }`}
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {slide.caption}
                        </p>
                    ))}
                </div>

                <div className="w-20 h-px bg-[#d4af37] mt-6 mb-4" />

                <p
                    className="text-[#d4af37] text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {tagline || "From Celebrations to Creations"}
                </p>

                {/* Carousel Dots */}
                <div className="flex gap-3 mt-16">
                    {SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`transition-all duration-300 rounded-full ${
                                index === current
                                    ? "w-10 h-2 bg-[#d4af37]"
                                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Slant */}
            <div
                className="absolute bottom-0 left-0 w-full h-[120px] bg-white z-10"
                style={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 30%, 0 0%)",
                    transform: "translateY(1px)",
                }}
            />
        </section>
    );
};

export default HeroWalker;
