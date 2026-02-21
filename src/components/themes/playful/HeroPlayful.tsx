import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function HeroPlayful() {
    return (
        <section className={`${poppins.className} relative w-full pt-12 pb-24 md:py-32 bg-[#fdfaf6] overflow-hidden`}>
            {/* Decorative blobs */}
            <div className="absolute top-10 left-[-5%] w-72 h-72 bg-[#FF1493]/40 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-[-5%] w-80 h-80 bg-[#FF4500]/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#4B0082]/40 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Text Content - Asymmetrical layout */}
                    <div className="flex-1 text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF1493]/30 text-[#D11078] font-semibold text-sm mb-6 transform -rotate-2">
                            ✨ From Celebrations to Creations
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2d3748] leading-[1.1] mb-6 tracking-tight">
                            Events that are anything but <span className="text-[#FF4500] relative inline-block">ordinary.<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#4B0082]" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg></span>
                        </h1>
                        <p className="text-lg text-[#718096] mb-8 max-w-lg leading-relaxed font-medium">
                            We design vibrant, joyful, and utterly unforgettable celebrations for the wildly in love and the boldly creative.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-[#FF4500] text-white hover:bg-[#E63E00] hover:shadow-lg hover:shadow-[#FF4500]/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl font-bold text-lg">
                                Start Planning
                            </button>
                            <button className="px-8 py-4 bg-white text-[#2d3748] border-2 border-[#e2e8f0] hover:border-[#4B0082] hover:text-[#4B0082] transition-all duration-300 rounded-2xl font-bold text-lg shadow-sm">
                                See Our Vibe
                            </button>
                        </div>
                    </div>

                    {/* Image Collage - Asymmetrical */}
                    <div className="flex-1 relative w-full h-[500px]">
                        <div className="absolute right-0 top-0 w-3/4 h-3/4 bg-gray-200 rounded-[2rem] overflow-hidden shadow-2xl transform rotate-3 z-20 border-8 border-white">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: 'url("/images/WhatsApp Image 2026-02-17 at 11.32.09 PM.jpeg")' }}
                            />
                        </div>
                        <div className="absolute left-0 bottom-10 w-2/3 h-2/3 bg-gray-300 rounded-[2rem] overflow-hidden shadow-xl transform -rotate-3 z-10 border-8 border-white">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: 'url("/images/WhatsApp Image 2026-02-17 at 11.32.09 PM (1).jpeg")' }}
                            />
                        </div>
                        {/* Small accent dot */}
                        <div className="absolute bottom-20 right-10 w-16 h-16 bg-[#FF1493] rounded-full z-30 flex items-center justify-center shadow-lg transform rotate-12">
                            <span className="text-2xl">⚡</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
