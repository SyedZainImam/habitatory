"use client";

import React, { useState } from "react";
import { MapPin, FileEdit, Utensils, CalendarDays, Music } from "lucide-react";

const SPECIALTIES = [
    {
        icon: MapPin,
        label: "Venue Selection",
        title: "Perfect Venues, Perfectly Matched",
        description:
            "From intimate spaces to grand ballrooms, we scout and secure venues that set the perfect stage for your event. Our extensive network and local expertise ensure you get the ideal location that aligns with your vision, guest count, and budget.",
    },
    {
        icon: FileEdit,
        label: "Contract Negotiations",
        title: "Expert Negotiations, Maximum Value",
        description:
            "Our experts handle vendor contracts with precision, securing the best terms and protecting your interests. We leverage years of industry relationships to ensure transparent pricing, favorable clauses, and complete peace of mind.",
    },
    {
        icon: Utensils,
        label: "Food & Beverage",
        title: "Culinary Experiences That Delight",
        description:
            "Curated menus and beverage programs designed to delight your guests and complement your event theme. From artisanal catering to signature cocktails, we craft dining experiences that become a highlight of every event.",
    },
    {
        icon: CalendarDays,
        label: "Agenda Creation",
        title: "Strategic Scheduling, Flawless Flow",
        description:
            "Strategic scheduling and program flow design to maximize engagement and deliver a seamless experience. We plan every minute detail — from guest arrivals and keynote timings to entertainment transitions and send-offs.",
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
                                className={`flex flex-col items-center gap-3 transition-all duration-300 group ${isActive ? "scale-105" : "hover:scale-[1.02]"
                                    }`}
                            >
                                <div
                                    className={`rounded-full flex items-center justify-center transition-all duration-400 relative ${isActive
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
                                        className={`absolute -bottom-2 w-3 h-3 transform rotate-45 transition-all duration-300 ${isActive
                                                ? "bg-[#2C5F72] border-r border-b border-[#2C5F72]"
                                                : "bg-white border-r border-b border-[#2C5F72]"
                                            }`}
                                    />
                                </div>
                                <span
                                    className={`text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-[#2C5F72]" : "text-[#2C5F72]/60"
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
