"use client";

import { useState } from "react";
import { canvasToBlob, drawMagnetSheet } from "@/lib/draw-magnet-sheet";
import type { MagnetSiteInfo } from "@/lib/draw-magnet-sheet";
import { DEFAULT_TEMPLATE } from "@/lib/magnet-templates";
import { submitMagnetOrder } from "@/app/actions/magnetOrder";

interface Props {
    croppedPhotos: (string | null)[];
    siteInfo: MagnetSiteInfo;
    whatsappPhone: string;
    onBack: () => void;
    onSuccess: (orderID: string, customerName: string) => void;
}

export default function OrderForm({
    croppedPhotos,
    siteInfo,
    whatsappPhone,
    onBack,
    onSuccess,
}: Props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!name.trim()) { setError("Name is required."); return; }
        if (!phone.trim()) { setError("Phone number is required."); return; }

        setIsSubmitting(true);
        try {
            // Render the full-resolution sheet
            const fullCanvas = document.createElement("canvas");
            await drawMagnetSheet(
                fullCanvas,
                DEFAULT_TEMPLATE,
                croppedPhotos.map((p) => p ?? ""),
                siteInfo
            );
            const blob = await canvasToBlob(fullCanvas);

            const formData = new FormData();
            formData.set("customerName", name.trim());
            formData.set("customerPhone", phone.trim());
            formData.set("templateId", DEFAULT_TEMPLATE.id);
            formData.set("notes", notes.trim());
            formData.set("composedImage", new File([blob], "magnet-sheet.jpg", { type: "image/jpeg" }));

            const result = await submitMagnetOrder(formData);
            if (result.success && result.orderID) {
                onSuccess(result.orderID, name.trim());
            } else {
                setError(result.error ?? "Something went wrong.");
            }
        } catch {
            setError("Failed to submit order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-2xl font-bold text-[#2C5F72] mb-1">Your Details</h2>
                <p className="text-sm text-gray-500">We&apos;ll confirm your order via WhatsApp.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F72]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Phone <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F72]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests…"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F72] resize-none"
                />
            </div>

            {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {error}
                </p>
            )}

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
                >
                    ← Back
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-[#2C5F72] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a3c47] transition-colors disabled:opacity-50 text-sm"
                >
                    {isSubmitting ? "Placing Order…" : "Place Order"}
                </button>
            </div>
        </form>
    );
}

// ── Order Confirmation ────────────────────────────────────────────────────────

interface ConfirmationProps {
    orderID: string;
    customerName: string;
    whatsappPhone: string;
    onNewOrder: () => void;
}

export function OrderConfirmation({ orderID, customerName, whatsappPhone, onNewOrder }: ConfirmationProps) {
    const waText = encodeURIComponent(`Hi! My magnet order ID is ${orderID}`);
    const waLink = `https://wa.me/${whatsappPhone}?text=${waText}`;

    return (
        <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#2C5F72] mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-6">
                Thank you, {customerName}! Your magnet sheet is being prepared.
            </p>

            <div className="bg-[#faf8f5] border border-[#d4af37] rounded-2xl px-8 py-6 mb-8 inline-block">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-widest">Your Order ID</p>
                <p className="text-4xl font-bold text-[#2C5F72] tracking-wider">{orderID}</p>
            </div>

            <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
                Send us your Order ID on WhatsApp to confirm payment and get updates.
            </p>

            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1ebe5d] transition-colors mb-4"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Order ID on WhatsApp
            </a>

            <div className="mt-6">
                <button
                    onClick={onNewOrder}
                    className="text-sm text-gray-500 hover:text-[#2C5F72] underline"
                >
                    Place another order
                </button>
            </div>
        </div>
    );
}
