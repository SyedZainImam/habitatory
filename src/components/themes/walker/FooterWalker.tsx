import React from "react";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";

const SOCIAL_LINKS = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const FooterWalker = () => {
    return (
        <footer id="contact" className="w-full relative bg-[#1a3c47]">
            {/* Top slant */}
            <div
                className="absolute top-0 left-0 w-full h-[60px] md:h-[100px] bg-[#faf8f5] z-10"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    marginTop: "-1px",
                }}
            />

            <div className="max-w-6xl mx-auto px-6 md:px-8 pt-32 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full">
                    {/* Left Column: Contact Us */}
                    <div className="flex flex-col">
                        <h3
                            className="text-white text-xl font-semibold mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Get In Touch
                        </h3>
                        <div className="w-12 h-0.5 bg-[#d4af37] mb-8" />

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 hover:bg-[#d4af37]/10 transition">
                                    <Mail size={18} />
                                </div>
                                <span className="text-zinc-300 text-sm">info@habitatory.com</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#7CB7CA] flex items-center justify-center text-white shrink-0 shadow-sm">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex flex-col text-zinc-300 text-sm leading-snug">
                                    <span>PO Box 4444 Eagle, CO 81631</span>
                                    <span>United States</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 hover:bg-[#d4af37]/10 transition">
                                    <Phone size={18} />
                                </div>
                                <span className="text-zinc-300 text-sm">+180 025 2536</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="flex flex-col">
                        <h3
                            className="text-white text-xl font-semibold mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Send Us a Message
                        </h3>
                        <div className="w-12 h-0.5 bg-[#d4af37] mb-8" />

                        <form className="flex flex-col space-y-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex flex-col gap-4 w-full md:w-1/2">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition placeholder:text-zinc-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition placeholder:text-zinc-500"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition placeholder:text-zinc-500"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 flex flex-col gap-4">
                                    <textarea
                                        placeholder="Your message..."
                                        className="w-full h-[106px] md:h-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition resize-none placeholder:text-zinc-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-[#d4af37] text-[#1a3c47] font-bold tracking-widest uppercase text-xs py-3.5 rounded-lg hover:bg-[#e8c964] transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="w-full bg-[#142e37] py-6 px-6 md:px-8 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-zinc-400 text-xs tracking-wider">
                        © 2026 Habitatory. All Rights Reserved.
                    </span>
                    <div className="flex gap-3">
                        {SOCIAL_LINKS.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                                >
                                    <Icon size={15} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterWalker;
