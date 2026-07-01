"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "/#home", type: "anchor" },
    { label: "About Us", href: "/about", type: "page" },
    { label: "Our Events", href: "/#events", type: "anchor" },
    { label: "Gallery", href: "/gallery", type: "page" },
    { label: "Products", href: "/products", type: "page" },
    { label: "Magnets", href: "/magnets", type: "page" },
    { label: "Contact Us", href: "/#contact", type: "anchor" },
];

const HeaderWalker = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Intersection Observer for active section (only on the home page)
    useEffect(() => {
        if (!isHomePage) {
            setActiveSection(null);
            return;
        }

        const anchorIds = NAV_ITEMS
            .filter((n) => n.type === "anchor")
            .map((n) => n.href.replace("/#", ""));
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

        anchorIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [isHomePage]);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, item: typeof NAV_ITEMS[0]) => {
            if (item.type === "anchor") {
                // If we're on the home page, scroll smoothly
                const id = item.href.replace("/#", "");
                const el = document.getElementById(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth" });
                    setMobileOpen(false);
                }
                // If not on the home page, let the link navigate to /#section
            } else {
                setMobileOpen(false);
            }
        },
        []
    );

    const isActive = (item: typeof NAV_ITEMS[0]) => {
        if (item.type === "page") {
            return pathname === item.href;
        }
        // Anchor links are only active when on the home page
        if (isHomePage && activeSection) {
            return activeSection === item.href.replace("/#", "");
        }
        return false;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-[#1a3c47]/95 backdrop-blur-md shadow-lg py-3"
                        : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <div
                            className={`relative rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] ${
                                scrolled ? "w-14 h-14" : "w-20 h-20"
                            }`}
                        >
                            <Image
                                src="/images/3ad81537-283c-45db-bfb8-f423da42d528.png"
                                alt="Habitatory Logo"
                                width={80}
                                height={80}
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span
                            className={`font-bold tracking-wide text-[#d4af37] transition-all duration-300 ${
                                scrolled ? "text-xl" : "text-2xl"
                            }`}
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Habitatory
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => {
                                const active = isActive(item);
                                const NavComponent = item.type === "page" ? Link : "a";
                                return (
                                    <li key={item.href}>
                                        <NavComponent
                                            href={item.href}
                                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item)}
                                            className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-md ${
                                                active
                                                    ? "text-[#d4af37]"
                                                    : "text-white/80 hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                            {active && (
                                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#d4af37] rounded-full" />
                                            )}
                                        </NavComponent>
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
                className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
                    mobileOpen
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
                    className={`absolute top-0 right-0 w-72 h-full bg-[#1a3c47] shadow-2xl transition-transform duration-300 ${
                        mobileOpen ? "translate-x-0" : "translate-x-full"
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
                                const active = isActive(item);
                                const NavComponent = item.type === "page" ? Link : "a";
                                return (
                                    <li key={item.href}>
                                        <NavComponent
                                            href={item.href}
                                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item)}
                                            className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wide transition-all duration-300 ${
                                                active
                                                    ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37]"
                                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {item.label}
                                        </NavComponent>
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
