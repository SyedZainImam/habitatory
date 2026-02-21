import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        defineField({
            name: "clientName",
            title: "Client Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "eventReference",
            title: "Event Reference",
            type: "reference",
            to: [{ type: "event" }],
        }),
    ],
    preview: {
        select: {
            title: "clientName",
            subtitle: "quote",
        },
    },
});
