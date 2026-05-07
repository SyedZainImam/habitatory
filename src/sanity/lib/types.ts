// TypeScript types for Sanity document models

import type { SanityImageSource } from "@sanity/image-url";

export interface Event {
    _id: string;
    title: string;
    slug: { current: string };
    category: "corporate" | "wedding" | "custom";
    date: string;
    description?: string;
    coverImageUrl?: string;
    coverImage?: SanityImageSource;
    galleryImages?: GalleryImage[];
}

export interface GalleryImage {
    asset: {
        _id: string;
        url: string;
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface Service {
    _id: string;
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
    image?: SanityImageSource;
    order?: number;
}

export interface Testimonial {
    _id: string;
    clientName: string;
    quote: string;
    eventReference?: {
        _id: string;
        title: string;
        category: string;
    };
}

export interface HeroSlide {
    _id: string;
    title?: string;
    caption?: string;
    imageUrl?: string;
    image?: SanityImageSource;
    order: number;
}

export interface Product {
    _id: string;
    title: string;
    imageUrl?: string;
    image?: SanityImageSource;
    description: string;
    features: string[];
    order: number;
}

export interface SiteSettings {
    companyName: string;
    tagline?: string;
    email: string;
    phone?: string;
    address?: string;
    socialLinks?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        youtube?: string;
        tiktok?: string;
        twitter?: string;
        pinterest?: string;
        snapchat?: string;
    };
    aboutText?: string;
    aboutHeroImageUrl?: string;
    aboutHeroImage?: SanityImageSource;
    galleryHeroImageUrl?: string;
    galleryHeroImage?: SanityImageSource;
    productsHeroImageUrl?: string;
    productsHeroImage?: SanityImageSource;
}
