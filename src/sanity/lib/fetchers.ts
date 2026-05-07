// Server-side data fetching functions for Sanity CMS

import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { urlFor } from "./image";
import {
    ALL_EVENTS_QUERY,
    EVENT_BY_SLUG_QUERY,
    EVENTS_BY_CATEGORY_QUERY,
    ALL_SERVICES_QUERY,
    ALL_TESTIMONIALS_QUERY,
    ALL_HERO_SLIDES_QUERY,
    ALL_PRODUCTS_QUERY,
    SITE_SETTINGS_QUERY,
} from "./queries";
import type {
    Event,
    Service,
    Testimonial,
    HeroSlide,
    Product,
    SiteSettings,
} from "./types";

// Helper: generate a properly sized image URL from a Sanity image object.
// This respects crop/hotspot settings configured in the CMS, preventing
// the "zoomed in" look that raw asset URLs produce.
function buildImageUrl(image: SanityImageSource | undefined | null, width: number, height?: number): string | undefined {
    if (!image || (typeof image === "object" && !("asset" in image))) return undefined;
    let builder = urlFor(image).width(width).auto("format").quality(85);
    if (height) builder = builder.height(height);
    return builder.url();
}

// ─── Events ─────────────────────────────────────────────

export async function getAllEvents(): Promise<Event[]> {
    const events = await client.fetch<Event[]>(ALL_EVENTS_QUERY);
    return events.map((event) => ({
        ...event,
        coverImageUrl: buildImageUrl(event.coverImage, 800, 600) || event.coverImageUrl,
    }));
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
    const event = await client.fetch<Event | null>(EVENT_BY_SLUG_QUERY, { slug });
    if (!event) return null;
    return {
        ...event,
        coverImageUrl: buildImageUrl(event.coverImage, 1200, 800) || event.coverImageUrl,
    };
}

export async function getEventsByCategory(
    category: "corporate" | "wedding" | "custom"
): Promise<Event[]> {
    const events = await client.fetch<Event[]>(EVENTS_BY_CATEGORY_QUERY, { category });
    return events.map((event) => ({
        ...event,
        coverImageUrl: buildImageUrl(event.coverImage, 800, 600) || event.coverImageUrl,
    }));
}

// ─── Services ───────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
    const services = await client.fetch<Service[]>(ALL_SERVICES_QUERY);
    return services.map((service) => ({
        ...service,
        imageUrl: buildImageUrl(service.image, 800, 600) || service.imageUrl,
    }));
}

// ─── Testimonials ───────────────────────────────────────

export async function getAllTestimonials(): Promise<Testimonial[]> {
    return client.fetch<Testimonial[]>(ALL_TESTIMONIALS_QUERY);
}

// ─── Hero Slides ────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
    const slides = await client.fetch<HeroSlide[]>(ALL_HERO_SLIDES_QUERY);
    return slides.map((slide) => ({
        ...slide,
        imageUrl: buildImageUrl(slide.image, 1920, 1080) || slide.imageUrl,
    }));
}

// ─── Products ───────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
    const products = await client.fetch<Product[]>(ALL_PRODUCTS_QUERY);
    return products.map((product) => ({
        ...product,
        imageUrl: buildImageUrl(product.image, 900, 700) || product.imageUrl,
    }));
}

// ─── Site Settings ──────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
    const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
    if (!settings) return null;
    return {
        ...settings,
        aboutHeroImageUrl: buildImageUrl(settings.aboutHeroImage, 1920, 800) || settings.aboutHeroImageUrl,
        galleryHeroImageUrl: buildImageUrl(settings.galleryHeroImage, 1920, 800) || settings.galleryHeroImageUrl,
        productsHeroImageUrl: buildImageUrl(settings.productsHeroImage, 1920, 800) || settings.productsHeroImageUrl,
    };
}
