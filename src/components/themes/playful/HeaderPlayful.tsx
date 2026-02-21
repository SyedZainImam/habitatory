import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function HeaderPlayful() {
    return (
        <header className={`${poppins.className} w-full bg-[#fdfaf6] text-[#2d3748] shadow-sm`}>
            <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-5 hover:scale-105 transition-transform">
                    <Image
                        src="/images/3ad81537-283c-45db-bfb8-f423da42d528.png"
                        alt="Habitatory Icon"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                    />
                    <div className="text-5xl font-extrabold tracking-tight text-[#FF4500] flex items-center gap-2">
                        Habitatory<span className="w-3 h-3 rounded-full bg-[#4B0082] mt-4"></span>
                    </div>
                </Link>

                <nav className="hidden md:flex space-x-8 font-medium">
                    <Link href="/services" className="hover:text-[#FF4500] transition-colors">Services</Link>
                    <Link href="/events" className="hover:text-[#4B0082] transition-colors">Events</Link>
                    <Link href="/shop" className="hover:text-[#FF1493] hover:drop-shadow-sm transition-all hover:-translate-y-0.5 inline-block">Marketplace</Link>
                    <Link href="/about" className="hover:text-[#FF4500] transition-colors">Our Story</Link>
                </nav>

                <button className="px-6 py-2.5 bg-[#4B0082] text-white hover:bg-[#3A0066] hover:scale-105 hover:-rotate-2 transition-all duration-300 rounded-full font-semibold shadow-md shadow-[#4B0082]/30">
                    Let's Chat!
                </button>
            </div>
        </header>
    );
}
