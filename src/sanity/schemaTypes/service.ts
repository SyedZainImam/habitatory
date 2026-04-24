import { defineField, defineType } from "sanity";

export const serviceType = defineType({
    name: "service",
    title: "Service",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "icon",
            title: "Icon (optional)",
            description: "Icon identifier or image for the service",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Service Image",
            type: "image",
            options: {
                hotspot: true,
            },
            description: "Image displayed for this service on the homepage",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
