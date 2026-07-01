"use server";

import { createClient } from "next-sanity";
import { randomBytes } from "crypto";

export interface MagnetOrderResult {
    success: boolean;
    orderID?: string;
    error?: string;
}

function generateOrderID(): string {
    return "HAB-" + randomBytes(2).toString("hex").toUpperCase();
}

export async function submitMagnetOrder(formData: FormData): Promise<MagnetOrderResult> {
    const customerName = (formData.get("customerName") as string)?.trim();
    const customerPhone = (formData.get("customerPhone") as string)?.trim();
    const templateId = (formData.get("templateId") as string)?.trim();
    const notes = (formData.get("notes") as string)?.trim() ?? "";
    const imageBlob = formData.get("composedImage") as File | null;

    if (!customerName) return { success: false, error: "Name is required." };
    if (!customerPhone) return { success: false, error: "Phone number is required." };
    if (!imageBlob || imageBlob.size === 0) return { success: false, error: "Composed image is missing." };

    try {
        const writeClient = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
            token: process.env.SANITY_API_WRITE_TOKEN,
            useCdn: false,
        });

        const orderID = generateOrderID();

        // Upload composed image to Sanity Assets
        const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
        const asset = await writeClient.assets.upload("image", imageBuffer, {
            filename: `magnet-order-${orderID}.jpg`,
            contentType: "image/jpeg",
        });

        // Create the magnetOrder document
        await writeClient.create({
            _type: "magnetOrder",
            orderID,
            customerName,
            customerPhone,
            templateId: templateId || "classic-6up",
            composedImage: {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: asset._id,
                },
            },
            status: "pending",
            createdAt: new Date().toISOString(),
            notes: notes || "",
        });

        return { success: true, orderID };
    } catch (err) {
        console.error("magnetOrder error:", err);
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
