import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function HeaderLuxury() {
    return (
        <header className={`${playfair.className} w-full bg-[#1d0a30] text-[#f2e3c6] shadow-md border-b border-[#d4af37]/20`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center hover:opacity-80 transition-opacity">
                    <Link href="/" className="flex items-center gap-5">
                        <Image
                            src="/images/3ad81537-283c-45db-bfb8-f423da42d528.png"
                            alt="Habitatory Icon"
                            width={120}
                            height={120}
                            className="object-contain"
                            priority
                        />
                        <span className="text-4xl font-bold tracking-widest text-[#d4af37] uppercase">Habitatory</span>
                    </Link>
                </div>

                <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
                    <Link href="/services" className="hover:text-[#d4af37] transition-colors">Services</Link>
                    <Link href="/events" className="hover:text-[#d4af37] transition-colors">Events</Link>
                    <Link href="/shop" className="hover:text-[#d4af37] transition-colors">Marketplace</Link>
                    <Link href="/about" className="hover:text-[#d4af37] transition-colors">About Us</Link>
                </nav>

                <button className="px-6 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1d0a30] transition-all duration-300 rounded font-medium tracking-wide">
                    Inquire Now
                </button>
            </div>
        </header>
    );
}
