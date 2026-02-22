import React from "react";
import Image from "next/image";
import { getAllEvents } from "@/sanity/lib/fetchers";
import type { Event } from "@/sanity/lib/types";

export default async function EventGallery() {
    let events: Event[] = [];
    let error = null;

    try {
        events = await getAllEvents();
    } catch (err) {
        console.error("Error fetching events:", err);
        error = "Failed to load events. Please try again later.";
    }

    if (error) {
        return (
            <div className="w-full py-20 text-center bg-red-50 text-red-600 rounded-xl my-10 border border-red-100">
                <p className="font-semibold text-lg">{error}</p>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="w-full py-20 text-center bg-[#faf8f5] text-zinc-400 rounded-xl my-10">
                <p className="font-medium text-lg">No events found yet. Add some in the Sanity Admin Panel!</p>
            </div>
        );
    }

    return (
        <section className="w-full py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4 tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Recent Events
                    </h2>
                    <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mb-6" />
                    <p className="text-zinc-600 max-w-2xl mx-auto text-sm md:text-base">
                        Explore our latest curated experiences and celebrations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event: any) => (
                        <div
                            key={event._id}
                            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100"
                        >
                            <div className="relative w-full h-64 overflow-hidden bg-zinc-100">
                                {event.coverImageUrl ? (
                                    <Image
                                        src={event.coverImageUrl}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                        No Image
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-[#2C5F72] shadow-sm capitalize tracking-wide">
                                    {event.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-xs text-[#d4af37] mb-2 font-medium tracking-wider uppercase">
                                    {new Date(event.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </div>
                                <h3
                                    className="text-xl font-bold text-[#1a3c47] mb-3"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {event.title}
                                </h3>
                                {event.description && (
                                    <p className="text-zinc-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                        {event.description}
                                    </p>
                                )}

                                <button className="mt-auto text-left font-semibold text-[#2C5F72] hover:text-[#d4af37] transition-colors flex items-center group/btn text-sm">
                                    View Gallery
                                    <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
