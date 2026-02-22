"use server";

export interface ContactFormState {
    success: boolean;
    message: string;
}

export async function submitContactForm(
    _prevState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    // Validation
    if (!name || !name.trim()) {
        return { success: false, message: "Name is required." };
    }

    if (!email || !email.trim()) {
        return { success: false, message: "Email is required." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address." };
    }

    if (!message || !message.trim()) {
        return { success: false, message: "Message is required." };
    }

    try {
        // Store the inquiry in Sanity CMS
        const { createClient } = await import("next-sanity");

        const writeClient = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "heqhq5w1",
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
            apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
            token: process.env.SANITY_API_WRITE_TOKEN,
            useCdn: false,
        });

        await writeClient.create({
            _type: "contactInquiry",
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || "",
            message: message.trim(),
            submittedAt: new Date().toISOString(),
            read: false,
        });

        return {
            success: true,
            message: "Thank you! Your message has been sent. We'll get back to you soon.",
        };
    } catch (error) {
        console.error("Contact form submission error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    }
}
