"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Our Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact Us", href: "#contact" },
];

const HeaderWalker = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Intersection Observer for active section
    useEffect(() => {
        const sectionIds = NAV_ITEMS.map((n) => n.href.replace("#", ""));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
            }
        },
        []
    );

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#1a3c47]/95 backdrop-blur-md shadow-lg py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, "#home")}
                        className="flex items-center gap-3 group"
                    >
                        <Image
                            src="/images/logo-cropped.png"
                            alt="Habitatory Logo"
                            width={375}
                            height={390}
                            className={`object-contain transition-all duration-300 ${scrolled ? "h-8 w-auto" : "h-10 w-auto"}`}
                            priority
                        />
                        <span
                            className={`font-bold tracking-wide text-[#d4af37] transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"
                                }`}
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Habitatory
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => {
                                const isActive =
                                    activeSection === item.href.replace("#", "");
                                return (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-md ${isActive
                                                ? "text-[#d4af37]"
                                                : "text-white/80 hover:text-white"
                                                }`}
                                        >
                                            {item.label}
                                            {isActive && (
                                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#d4af37] rounded-full" />
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${mobileOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Drawer panel */}
                <div
                    className={`absolute top-0 right-0 w-72 h-full bg-[#1a3c47] shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-end p-5">
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-white/70 hover:text-white transition"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="px-6">
                        <ul className="flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive =
                                    activeSection === item.href.replace("#", "");
                                return (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wide transition-all duration-300 ${isActive
                                                ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37]"
                                                : "text-white/70 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    {/* Brand accent */}
                    <div className="absolute bottom-8 left-6 right-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-4" />
                        <p
                            className="text-[#d4af37]/50 text-xs text-center italic tracking-wider"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            From Celebrations to Creations
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderWalker;
