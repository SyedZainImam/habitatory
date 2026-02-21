import React from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const services = [
    {
        title: "Corporate Galas",
        description: "Sophisticated and seamless event execution tailored for the corporate world.",
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM (1).jpeg"
    },
    {
        title: "Signature Weddings",
        description: "Elegant and timeless wedding planning from conception to celebration.",
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.06 PM.jpeg"
    },
    {
        title: "Private Soirées",
        description: "Exclusive intimacy and spectacular detail for custom private events.",
        image: "/images/WhatsApp Image 2026-02-17 at 11.32.08 PM.jpeg"
    }
];

export default function ServicesLuxury() {
    return (
        <section className={`${playfair.className} w-full py-24 bg-[#0f031b] text-[#f2e3c6]`}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-normal mb-4">Our Featured Services</h2>
                    <div className="h-1 w-24 bg-[#d4af37] mx-auto mb-6"></div>
                    <p className="text-[#aeb6bf] max-w-2xl mx-auto font-sans font-light">
                        We provide comprehensive management and design for events of the highest caliber.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="relative h-96 w-full overflow-hidden mb-6">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    style={{ backgroundImage: `url('${service.image}')` }}
                                />
                                <div className="absolute inset-0 bg-[#1d0a30]/30 group-hover:bg-transparent transition-colors duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f031b] to-transparent opacity-90"></div>
                                <h3 className="absolute bottom-6 left-6 text-2xl font-medium text-[#d4af37] group-hover:text-[#f2e3c6] transition-colors">{service.title}</h3>
                            </div>
                            <p className="font-sans font-light text-[#aeb6bf] px-2 leading-relaxed">
                                {service.description}
                            </p>
                            <button className="mt-4 px-2 text-[#d4af37] text-sm uppercase tracking-widest font-semibold flex items-center group-hover:underline underline-offset-4 decoration-[#d4af37]">
                                Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
