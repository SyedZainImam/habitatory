import React from "react";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { FaTiktok, FaPinterestP, FaSnapchatGhost } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/lib/fetchers";

type SocialKey = "instagram" | "facebook" | "linkedin" | "youtube" | "tiktok" | "twitter" | "pinterest" | "snapchat";

const SOCIAL_PLATFORMS: { key: SocialKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { key: "instagram", label: "Instagram", icon: Instagram },
    { key: "facebook", label: "Facebook", icon: Facebook },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin },
    { key: "youtube", label: "YouTube", icon: Youtube },
    { key: "tiktok", label: "TikTok", icon: FaTiktok },
    { key: "twitter", label: "Twitter / X", icon: Twitter },
    { key: "pinterest", label: "Pinterest", icon: FaPinterestP },
    { key: "snapchat", label: "Snapchat", icon: FaSnapchatGhost },
];

const FooterWalker = async () => {
    const settings = await getSiteSettings();

    const socialLinks = SOCIAL_PLATFORMS
        .map((platform) => ({
            ...platform,
            href: settings?.socialLinks?.[platform.key],
        }))
        .filter((link) => link.href);

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
                                <span className="text-zinc-300 text-sm">
                                    {settings?.email || "info@habitatory.com"}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#7CB7CA] flex items-center justify-center text-white shrink-0 shadow-sm">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex flex-col text-zinc-300 text-sm leading-snug">
                                    <span>{settings?.address || "PO Box 4444 Eagle, CO 81631"}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 hover:bg-[#d4af37]/10 transition">
                                    <Phone size={18} />
                                </div>
                                <span className="text-zinc-300 text-sm">
                                    {settings?.phone || "+180 025 2536"}
                                </span>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        {socialLinks.length > 0 && (
                            <div className="mt-8">
                                <h4 className="text-white/60 text-xs tracking-widest uppercase mb-4">Follow Us</h4>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.key}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.label}
                                                className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300"
                                            >
                                                <Icon size={18} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Contact Form */}
                    <ContactForm />
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="w-full bg-[#142e37] py-6 px-6 md:px-8 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-zinc-400 text-xs tracking-wider">
                        &copy; {new Date().getFullYear()} Habitatory. All Rights Reserved.
                    </span>
                    {socialLinks.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.key}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                                    >
                                        <Icon size={15} />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default FooterWalker;
