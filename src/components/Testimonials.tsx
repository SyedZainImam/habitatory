import React from "react";
import { getAllTestimonials } from "@/sanity/lib/fetchers";
import type { Testimonial } from "@/sanity/lib/types";
import { Quote } from "lucide-react";

export default async function Testimonials() {
    let testimonials: Testimonial[] = [];
    let error = null;

    try {
        testimonials = await getAllTestimonials();
    } catch (err) {
        console.error("Error fetching testimonials:", err);
        error = "Failed to load testimonials.";
    }

    if (error) {
        return (
            <div className="w-full py-16 text-center bg-red-50 text-red-600 rounded-xl my-10 border border-red-100">
                <p className="font-semibold text-lg">{error}</p>
            </div>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-24 bg-[#faf8f5]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#2C5F72] mb-4 tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Client Testimonials
                    </h2>
                    <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mb-6" />
                    <p className="text-zinc-600 max-w-2xl mx-auto text-sm md:text-base">
                        What our clients say about their experience with Habitatory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-zinc-100 flex flex-col"
                        >
                            <Quote
                                size={28}
                                className="text-[#d4af37]/40 mb-4 shrink-0"
                            />
                            <p className="text-zinc-600 text-sm leading-relaxed italic flex-grow mb-6">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <div className="border-t border-zinc-100 pt-4">
                                <p
                                    className="font-semibold text-[#1a3c47] text-sm"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {testimonial.clientName}
                                </p>
                                {testimonial.eventReference && (
                                    <p className="text-[#d4af37] text-xs mt-1 capitalize">
                                        {testimonial.eventReference.category} &mdash;{" "}
                                        {testimonial.eventReference.title}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
