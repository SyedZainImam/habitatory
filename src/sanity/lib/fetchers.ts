// Server-side data fetching functions for Sanity CMS

import { client } from "./client";
import {
    ALL_EVENTS_QUERY,
    EVENT_BY_SLUG_QUERY,
    EVENTS_BY_CATEGORY_QUERY,
    ALL_SERVICES_QUERY,
    ALL_TESTIMONIALS_QUERY,
    ALL_HERO_SLIDES_QUERY,
    SITE_SETTINGS_QUERY,
} from "./queries";
import type {
    Event,
    Service,
    Testimonial,
    HeroSlide,
    SiteSettings,
} from "./types";

// ─── Events ─────────────────────────────────────────────

export async function getAllEvents(): Promise<Event[]> {
    return client.fetch<Event[]>(ALL_EVENTS_QUERY);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
    return client.fetch<Event | null>(EVENT_BY_SLUG_QUERY, { slug });
}

export async function getEventsByCategory(
    category: "corporate" | "wedding" | "custom"
): Promise<Event[]> {
    return client.fetch<Event[]>(EVENTS_BY_CATEGORY_QUERY, { category });
}

// ─── Services ───────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
    return client.fetch<Service[]>(ALL_SERVICES_QUERY);
}

// ─── Testimonials ───────────────────────────────────────

export async function getAllTestimonials(): Promise<Testimonial[]> {
    return client.fetch<Testimonial[]>(ALL_TESTIMONIALS_QUERY);
}

// ─── Hero Slides ────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
    return client.fetch<HeroSlide[]>(ALL_HERO_SLIDES_QUERY);
}

// ─── Site Settings ──────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
    return client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}
