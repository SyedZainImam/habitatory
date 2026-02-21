import React from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function HeroLuxury() {
    return (
        <section className={`${playfair.className} relative w-full h-[80vh] bg-[#1d0a30] flex items-center justify-center overflow-hidden`}>
            {/* Background Image Overlay placeholder */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
                style={{ backgroundImage: 'url("/images/WhatsApp Image 2026-02-17 at 11.32.07 PM.jpeg")' }}
            ></div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d0a30] via-[#1d0a30]/80 to-transparent z-10"></div>

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                <span className="text-[#d4af37] uppercase tracking-[0.3em] text-sm mb-4 font-semibold">From Celebrations to Creations</span>
                <h1 className="text-5xl md:text-7xl text-[#f2e3c6] font-normal mb-6 leading-tight">
                    Curating Timeless <br />
                    <span className="italic text-[#d4af37]">Experiences</span>
                </h1>
                <p className="text-[#aeb6bf] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
                    Bespoke celebrations tailored with uncompromising attention to detail,
                    transforming your vision into an unparalleled reality.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                    <button className="px-8 py-4 bg-[#d4af37] text-[#1d0a30] hover:bg-[#e1c050] transition-colors duration-300 font-bold uppercase tracking-widest text-sm rounded shadow-lg shadow-[#d4af37]/20">
                        Book Consultation
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-[#f2e3c6]/40 text-[#f2e3c6] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300 font-medium uppercase tracking-widest text-sm rounded">
                        View Portfolio
                    </button>
                </div>
            </div>
        </section>
    );
}
