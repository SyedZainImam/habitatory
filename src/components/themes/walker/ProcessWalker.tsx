"use client";

import React from "react";
import { MapPin, FileEdit, Users } from "lucide-react";

const PROCESS_CARDS = [
    {
        icon: MapPin,
        title: "Choose Venues",
        description:
            "We help you discover and secure the perfect venue tailored to your theme, guest size, and budget.",
        accent: true,
    },
    {
        icon: FileEdit,
        title: "Negotiate Contracts",
        description:
            "We professionally manage vendor negotiations to ensure the best value without compromising quality.",
        accent: false,
    },
    {
        icon: Users,
        title: "Plan Effective Meetings",
        description:
            "We coordinate timelines, logistics, and execution to ensure seamless and stress-free event planning.",
        accent: false,
    },
];

interface ProcessWalkerProps {
    aboutText?: string;
}

const ProcessWalker = ({ aboutText }: ProcessWalkerProps) => {
    return (
        <section id="about" className="bg-white py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                <h2
                    className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4 tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Our Process
                </h2>
                <div className="w-16 h-0.5 bg-[#d4af37] mb-8" />
                <p className="text-zinc-600 max-w-3xl text-sm md:text-base leading-relaxed mb-16 px-4">
                    {aboutText || "Habitatory specializes in bespoke celebrations tailored with uncompromising attention to detail, transforming your vision into an unparalleled reality for events of all sizes."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {PROCESS_CARDS.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="group flex bg-white items-start p-6 rounded-lg cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7CB7CA]/10"
                            >
                                <div
                                    className={`p-4 rounded-lg mr-5 shrink-0 transition-all duration-300 ${card.accent
                                            ? "bg-[#7CB7CA] text-white shadow-md group-hover:bg-[#2C5F72]"
                                            : "bg-white text-[#2C5F72] border-2 border-[#2C5F72] group-hover:bg-[#2C5F72] group-hover:text-white"
                                        }`}
                                >
                                    <Icon size={30} strokeWidth={1.5} />
                                </div>
                                <div className="text-left flex flex-col items-start">
                                    <h3
                                        className="text-lg font-bold text-[#1a3c47] mb-2"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                                        {card.description}
                                    </p>
                                    <button className="border border-[#2C5F72] text-[#2C5F72] px-6 py-1.5 text-sm font-medium hover:bg-[#2C5F72] hover:text-white transition-all duration-300 rounded-md">
                                        More Info
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessWalker;
