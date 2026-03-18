"use client";

import React from "react";

const SERVICES = [
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM (1).jpeg",
        title: "Corporate Galas",
    },
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM (1).jpeg",
        title: "Birthday Parties",
    },
    {
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM.jpeg",
        title: "Private Soirées",
    },
];

const ServicesWalker = () => {
    return (
        <section id="events" className="relative w-full overflow-hidden bg-[#2C5F72] pb-32">
            {/* Slanted Top Edge */}
            <div
                className="absolute top-0 left-0 w-full h-[100px] bg-white z-10"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
                    transform: "translateY(-1px)",
                }}
            />

            <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center px-6 md:px-8 pt-32 pb-16 z-20">
                <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Our Featured Services
                </h2>
                <div className="w-16 h-0.5 bg-[#d4af37] mb-6" />
                <p className="text-teal-100/80 max-w-3xl text-sm md:text-base italic leading-relaxed mb-16 px-4">
                    We provide comprehensive management and design for events of the
                    highest caliber, tailored to your exact specifications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="group relative w-full h-72 overflow-hidden rounded-lg shadow-xl cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${service.image}')` }}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 w-full p-5 flex justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <h3
                                    className="text-white font-bold tracking-widest text-sm uppercase"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {service.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slanted Bottom Edge */}
            <div
                className="absolute bottom-0 left-0 w-full h-[100px] bg-white z-10"
                style={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 100%)",
                    transform: "translateY(1px)",
                }}
            />
        </section>
    );
};

export default ServicesWalker;
