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
    ],
});
