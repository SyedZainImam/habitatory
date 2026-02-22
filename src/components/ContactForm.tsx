"use client";

import React, { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState<ContactFormState | null, FormData>(
        submitContactForm,
        null
    );

    return (
        <div className="flex flex-col">
            <h3
                className="text-white text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                Send Us a Message
            </h3>
            <div className="w-12 h-0.5 bg-[#d4af37] mb-8" />

            {state && (
                <div
                    className={`mb-4 px-4 py-3 rounded-lg text-sm ${
                        state.success
                            ? "bg-green-500/20 text-green-200 border border-green-500/30"
                            : "bg-red-500/20 text-red-200 border border-red-500/30"
                    }`}
                >
                    {state.message}
                </div>
            )}

            <form action={formAction} className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition placeholder:text-zinc-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition placeholder:text-zinc-500"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition placeholder:text-zinc-500"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <textarea
                            name="message"
                            placeholder="Your message..."
                            required
                            className="w-full h-[106px] md:h-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#d4af37] focus:bg-white/10 transition resize-none placeholder:text-zinc-500"
                        />
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#d4af37] text-[#1a3c47] font-bold tracking-widest uppercase text-xs py-3.5 rounded-lg hover:bg-[#e8c964] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
