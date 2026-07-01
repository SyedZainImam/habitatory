"use client";

import { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import PhotoCropper from "./PhotoCropper";
import MagnetCanvas from "./MagnetCanvas";
import OrderForm, { OrderConfirmation } from "./OrderForm";
import type { MagnetSiteInfo } from "@/lib/draw-magnet-sheet";
import { DEFAULT_TEMPLATE } from "@/lib/magnet-templates";

type Step = "upload" | "crop" | "preview" | "done";

interface Props {
    siteInfo: MagnetSiteInfo;
    whatsappPhone: string;
}

const TOTAL_PHOTOS = DEFAULT_TEMPLATE.photoCount;

function resetState() {
    return {
        step: "upload" as Step,
        rawPhotos: Array<string | null>(TOTAL_PHOTOS).fill(null),
        croppedPhotos: Array<string | null>(TOTAL_PHOTOS).fill(null),
        cropIndex: 0,
        orderID: null as string | null,
        customerName: "",
    };
}

export default function MagnetOrderFlow({ siteInfo, whatsappPhone }: Props) {
    const [state, setState] = useState(resetState);

    function setRawPhotos(photos: (string | null)[]) {
        setState((s) => ({ ...s, rawPhotos: photos }));
    }

    function startCropping() {
        setState((s) => ({ ...s, step: "crop", cropIndex: 0 }));
    }

    function handleCropDone(croppedDataUrl: string) {
        setState((s) => {
            const updated = [...s.croppedPhotos];
            updated[s.cropIndex] = croppedDataUrl;
            const nextIndex = s.cropIndex + 1;
            if (nextIndex >= TOTAL_PHOTOS) {
                return { ...s, croppedPhotos: updated, step: "preview" };
            }
            return { ...s, croppedPhotos: updated, cropIndex: nextIndex };
        });
    }

    function handleCropBack() {
        setState((s) => {
            if (s.cropIndex === 0) {
                return { ...s, step: "upload" };
            }
            return { ...s, cropIndex: s.cropIndex - 1 };
        });
    }

    function handleOrderSuccess(orderID: string, customerName: string) {
        setState((s) => ({ ...s, orderID, customerName, step: "done" }));
    }

    function handleNewOrder() {
        setState(resetState());
    }

    const stepLabels: { key: Step; label: string }[] = [
        { key: "upload", label: "Upload" },
        { key: "crop", label: "Crop" },
        { key: "preview", label: "Preview" },
        { key: "done", label: "Done" },
    ];
    const currentStepIdx = stepLabels.findIndex((s) => s.key === state.step);

    return (
        <div className="min-h-screen bg-[#faf8f5]">
            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Progress bar */}
                {state.step !== "done" && (
                    <div className="flex items-center gap-2 mb-10">
                        {stepLabels.filter((s) => s.key !== "done").map((s, i) => {
                            const active = s.key === state.step;
                            const done = i < currentStepIdx;
                            return (
                                <div key={s.key} className="flex items-center gap-2 flex-1">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold shrink-0 ${done ? "bg-[#d4af37] text-white" : active ? "bg-[#2C5F72] text-white" : "bg-gray-200 text-gray-400"}`}>
                                        {done ? "✓" : i + 1}
                                    </div>
                                    <span className={`text-sm font-medium hidden sm:block ${active ? "text-[#2C5F72]" : done ? "text-[#d4af37]" : "text-gray-400"}`}>
                                        {s.label}
                                    </span>
                                    {i < stepLabels.filter((s) => s.key !== "done").length - 1 && (
                                        <div className={`flex-1 h-px ${done ? "bg-[#d4af37]" : "bg-gray-200"}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── Step 1: Upload ── */}
                {state.step === "upload" && (
                    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8">
                        <PhotoUploader
                            rawPhotos={state.rawPhotos}
                            onPhotosChange={setRawPhotos}
                            onContinue={startCropping}
                        />
                    </div>
                )}

                {/* ── Step 2: Crop ── */}
                {state.step === "crop" && (
                    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8">
                        <PhotoCropper
                            imageSrc={state.rawPhotos[state.cropIndex]!}
                            aspectRatio={DEFAULT_TEMPLATE.photoAspectRatio}
                            photoIndex={state.cropIndex}
                            totalPhotos={TOTAL_PHOTOS}
                            onCropDone={handleCropDone}
                            onBack={handleCropBack}
                        />
                    </div>
                )}

                {/* ── Step 3: Preview + Order Form ── */}
                {state.step === "preview" && (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1 flex justify-center">
                            <MagnetCanvas
                                croppedPhotos={state.croppedPhotos}
                                siteInfo={siteInfo}
                            />
                        </div>
                        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm p-8 lg:sticky lg:top-8">
                            <OrderForm
                                croppedPhotos={state.croppedPhotos}
                                siteInfo={siteInfo}
                                whatsappPhone={whatsappPhone}
                                onBack={() => setState((s) => ({ ...s, step: "crop", cropIndex: TOTAL_PHOTOS - 1 }))}
                                onSuccess={handleOrderSuccess}
                            />
                        </div>
                    </div>
                )}

                {/* ── Step 4: Confirmation ── */}
                {state.step === "done" && state.orderID && (
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8">
                        <OrderConfirmation
                            orderID={state.orderID}
                            customerName={state.customerName}
                            whatsappPhone={whatsappPhone}
                            onNewOrder={handleNewOrder}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
