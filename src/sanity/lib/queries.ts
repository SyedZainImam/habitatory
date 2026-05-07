// Centralized GROQ queries for all content types

// ─── Events ─────────────────────────────────────────────
export const ALL_EVENTS_QUERY = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  category,
  date,
  description,
  "coverImageUrl": coverImage.asset->url,
  coverImage,
  galleryImages
}`;

export const EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  date,
  description,
  "coverImageUrl": coverImage.asset->url,
  coverImage,
  galleryImages[] {
    asset-> {
      _id,
      url
    },
    hotspot
  }
}`;

export const EVENTS_BY_CATEGORY_QUERY = `*[_type == "event" && category == $category] | order(date desc) {
  _id,
  title,
  slug,
  category,
  date,
  description,
  "coverImageUrl": coverImage.asset->url,
  coverImage
}`;

// ─── Services ───────────────────────────────────────────
export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(order asc, _createdAt asc) {
  _id,
  title,
  description,
  icon,
  "imageUrl": image.asset->url,
  image,
  order
}`;

// ─── Testimonials ───────────────────────────────────────
export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  clientName,
  quote,
  eventReference-> {
    _id,
    title,
    category
  }
}`;

// ─── Hero Slides ────────────────────────────────────────
export const ALL_HERO_SLIDES_QUERY = `*[_type == "heroSlide"] | order(order asc) {
  _id,
  title,
  caption,
  "imageUrl": image.asset->url,
  image,
  order
}`;

// ─── Products ───────────────────────────────────────────
export const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(order asc) {
  _id,
  title,
  "imageUrl": image.asset->url,
  image,
  description,
  features,
  order
}`;

// ─── Site Settings (singleton) ──────────────────────────
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  companyName,
  tagline,
  email,
  phone,
  address,
  socialLinks,
  aboutText,
  "aboutHeroImageUrl": aboutHeroImage.asset->url,
  aboutHeroImage,
  "galleryHeroImageUrl": galleryHeroImage.asset->url,
  galleryHeroImage,
  "productsHeroImageUrl": productsHeroImage.asset->url,
  productsHeroImage
}`;
