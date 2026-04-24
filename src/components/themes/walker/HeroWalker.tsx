"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { HeroSlide } from "@/sanity/lib/types";

interface HeroWalkerProps {
    tagline?: string;
    companyName?: string;
    slides?: HeroSlide[];
}

const HeroWalker = ({ tagline, slides = [] }: HeroWalkerProps) => {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slideCount = slides.length;

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
        if (slideCount === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slideCount);
        }, 4000);
        return () => clearInterval(timer);
    }, [slideCount]);

    if (slideCount === 0) {
        return (
            <section id="home" className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#1a3c47]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p
                        className="text-[#d4af37] text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {tagline || "From Celebrations to Creations"}
                    </p>
                </div>
                <div
                    className="absolute bottom-0 left-0 w-full h-[120px] bg-white z-10"
                    style={{
                        clipPath: "polygon(0 100%, 100% 100%, 100% 30%, 0 0%)",
                        transform: "translateY(1px)",
                    }}
                />
            </section>
        );
    }

    return (
        <section id="home" className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
            {/* Background Images with Fade */}
            {slides.map((slide, index) => (
                <div
                    key={slide._id}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms] ease-in-out"
                    style={{
                        backgroundImage: slide.imageUrl ? `url('${slide.imageUrl}')` : undefined,
                        opacity: index === current ? 1 : 0,
                    }}
                />
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Slide Caption */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="relative overflow-hidden py-4">
                    {slides.map((slide, index) => (
                        <p
                            key={slide._id}
                            className={`text-white text-2xl md:text-4xl lg:text-5xl italic tracking-wide drop-shadow-lg transition-all duration-700 ease-in-out ${
                                index === current
                                    ? "opacity-100 translate-y-0 relative"
                                    : "opacity-0 translate-y-4 absolute inset-0"
                            }`}
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {slide.caption || slide.title || ""}
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
                    {slides.map((slide, index) => (
                        <button
                            key={slide._id}
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
