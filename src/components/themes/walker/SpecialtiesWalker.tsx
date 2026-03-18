"use client";

import React, { useState } from "react";
import { Camera, Image, Palette, Music } from "lucide-react";

const SPECIALTIES = [
    {
        icon: Camera,
        label: "Event Photography",
        title: "Capturing Every Precious Moment",
        description:
            "Our professional photography team ensures every magical moment is beautifully captured. From candid shots to curated portraits, we deliver a stunning visual story of your event that you'll treasure forever.",
    },
    {
        icon: Image,
        label: "Backdrops",
        title: "Stunning Backdrops, Different Styles",
        description:
            "Choose from an exquisite collection of backdrop styles — from floral walls and sequin curtains to custom-printed designs. Our backdrops create the perfect setting for photos and set the tone for your entire event.",
    },
    {
        icon: Palette,
        label: "Theme Selection",
        title: "Themes That Tell Your Story",
        description:
            "From elegant black-tie affairs to whimsical garden parties, we help you choose and execute a theme that reflects your personality. Every detail — colors, textures, props — is curated to bring your vision to life.",
    },
    {
        icon: Music,
        label: "AudioVisual Expertise",
        title: "Immersive Atmospheres, Lasting Impressions",
        description:
            "State-of-the-art sound, lighting, and visual technology to create immersive event atmospheres. We partner with top-tier AV professionals to deliver stunning production quality that elevates your event to the next level.",
    },
];

const SpecialtiesWalker = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = SPECIALTIES[activeIndex];

    return (
        <section className="bg-[#faf8f5] py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                <h2
                    className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4 tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Our Specialties
                </h2>
                <div className="w-16 h-0.5 bg-[#d4af37] mb-16" />

                {/* Specialty Icons Row */}
                <div className="flex flex-wrap justify-center items-end gap-6 md:gap-10 w-full mb-12">
                    {SPECIALTIES.map((spec, index) => {
                        const Icon = spec.icon;
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`flex flex-col items-center gap-3 transition-all duration-300 group ${
                                    isActive ? "scale-105" : "hover:scale-[1.02]"
                                }`}
                            >
                                <div
                                    className={`rounded-full flex items-center justify-center transition-all duration-400 relative ${
                                        isActive
                                            ? "w-24 h-24 md:w-28 md:h-28 bg-[#2C5F72] text-white shadow-lg"
                                            : "w-20 h-20 md:w-24 md:h-24 border-2 border-[#2C5F72] text-[#2C5F72] bg-white hover:bg-[#f0f7fa] shadow-sm"
                                    }`}
                                >
                                    <Icon
                                        size={isActive ? 36 : 28}
                                        strokeWidth={1.5}
                                        className="transition-all duration-300"
                                    />
                                    {/* Triangle pointer */}
                                    <div
                                        className={`absolute -bottom-2 w-3 h-3 transform rotate-45 transition-all duration-300 ${
                                            isActive
                                                ? "bg-[#2C5F72] border-r border-b border-[#2C5F72]"
                                                : "bg-white border-r border-b border-[#2C5F72]"
                                        }`}
                                    />
                                </div>
                                <span
                                    className={`text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300 ${
                                        isActive ? "text-[#2C5F72]" : "text-[#2C5F72]/60"
                                    }`}
                                >
                                    {spec.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Panel */}
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 md:p-12 border border-zinc-100 transition-all duration-500">
                    <h3
                        className="text-xl md:text-2xl font-bold text-[#1a3c47] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {active.title}
                    </h3>
                    <div className="w-10 h-0.5 bg-[#d4af37] mx-auto mb-6" />
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                        {active.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SpecialtiesWalker;
