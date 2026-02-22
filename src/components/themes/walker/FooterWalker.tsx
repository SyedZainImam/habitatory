import React from "react";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import type { SiteSettings } from "@/sanity/lib/types";

interface FooterWalkerProps {
    settings?: SiteSettings | null;
}

const FooterWalker = ({ settings }: FooterWalkerProps) => {
    const email = settings?.email || "info@habitatory.com";
    const phone = settings?.phone || "+180 025 2536";
    const address = settings?.address || "PO Box 4444 Eagle, CO 81631\nUnited States";
    const socialLinks = [
        { icon: Instagram, href: settings?.socialLinks?.instagram || "#", label: "Instagram" },
        { icon: Facebook, href: settings?.socialLinks?.facebook || "#", label: "Facebook" },
        { icon: Linkedin, href: settings?.socialLinks?.linkedin || "#", label: "LinkedIn" },
    ];
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
                                <span className="text-zinc-300 text-sm">{email}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#7CB7CA] flex items-center justify-center text-white shrink-0 shadow-sm">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex flex-col text-zinc-300 text-sm leading-snug">
                                    {address.split("\n").map((line, i) => (
                                        <span key={i}>{line}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 hover:bg-[#d4af37]/10 transition">
                                    <Phone size={18} />
                                </div>
                                <span className="text-zinc-300 text-sm">{phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <ContactForm />
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="w-full bg-[#142e37] py-6 px-6 md:px-8 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-zinc-400 text-xs tracking-wider">
                        © 2026 Habitatory. All Rights Reserved.
                    </span>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => {
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
