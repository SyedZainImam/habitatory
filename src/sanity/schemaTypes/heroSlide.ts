import { defineField, defineType } from "sanity";

export const heroSlideType = defineType({
    name: "heroSlide",
    title: "Hero Slide",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Optional label for this slide (for admin reference)",
        }),
        defineField({
            name: "image",
            title: "Slide Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "caption",
            title: "Caption",
            type: "string",
            description: "Caption text displayed over the slide",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
            validation: (rule) => rule.required().min(1),
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            order: "order",
            media: "image",
        },
        prepare({ title, order, media }) {
            return {
                title: title || `Slide ${order}`,
                subtitle: `Order: ${order}`,
                media,
            };
        },
    },
});
