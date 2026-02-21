import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const services = [
    {
        title: "Wild Weddings",
        description: "Rule-breaking romantic celebrations that actually feel like you.",
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM.jpeg",
        color: "bg-[#FF4500]",
        accent: "text-[#FF4500]",
        bgLight: "bg-[#FF4500]/10"
    },
    {
        title: "Epic Brand Activations",
        description: "Interactive experiences that get people talking and sharing.",
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM (1).jpeg",
        color: "bg-[#4B0082]",
        accent: "text-[#4B0082]",
        bgLight: "bg-[#4B0082]/10"
    },
    {
        title: "Custom Bashes",
        description: "From milestone birthdays to just-because parties, we bring the fun.",
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.07 PM (1).jpeg",
        color: "bg-[#FF1493]",
        accent: "text-[#D11078]",
        bgLight: "bg-[#FF1493]/20"
    }
];

export default function ServicesPlayful() {
    return (
        <section className={`${poppins.className} w-full py-24 bg-white text-[#2d3748]`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Our <span className="text-[#4B0082]">Jam</span></h2>
                        <p className="text-[#718096] text-lg font-medium leading-relaxed">
                            We specialize in creating immersive, colorful, and wildly
                            entertaining environments. No boring ballroom events here.
                        </p>
                    </div>
                    <button className="px-6 py-3 border-2 border-[#2d3748] text-[#2d3748] hover:bg-[#2d3748] hover:text-white transition-colors duration-300 rounded-full font-bold whitespace-nowrap">
                        See All Services
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className={`group rounded-[2rem] p-8 ${service.bgLight} border border-transparent hover:border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8 shadow-md">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                                    style={{ backgroundImage: `url('${service.image}')` }}
                                />
                            </div>
                            <h3 className={`text-2xl font-bold mb-3 ${service.accent}`}>{service.title}</h3>
                            <p className="text-[#4a5568] font-medium leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <button className={`w-12 h-12 rounded-full ${service.color} text-white flex items-center justify-center group-hover:w-full group-hover:justify-between group-hover:px-6 transition-all duration-300 overflow-hidden relative`}>
                                <span className="opacity-0 group-hover:opacity-100 font-bold whitespace-nowrap transition-opacity duration-300 delay-100 absolute left-6">
                                    Details
                                </span>
                                <span className="text-xl absolute right-0 w-12 text-center">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
