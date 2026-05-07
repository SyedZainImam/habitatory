import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "companyName",
            title: "Company Name",
            type: "string",
            initialValue: "Habitatory",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
            initialValue: "From Celebrations to Creations",
        }),
        defineField({
            name: "email",
            title: "Contact Email",
            type: "string",
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
        }),
        defineField({
            name: "address",
            title: "Address",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "socialLinks",
            title: "Social Media Links",
            type: "object",
            description: "Add URLs for the social platforms you want to display. Only platforms with a URL will appear on the website.",
            fields: [
                defineField({
                    name: "instagram",
                    title: "Instagram URL",
                    type: "url",
                }),
                defineField({
                    name: "facebook",
                    title: "Facebook URL",
                    type: "url",
                }),
                defineField({
                    name: "linkedin",
                    title: "LinkedIn URL",
                    type: "url",
                }),
                defineField({
                    name: "youtube",
                    title: "YouTube URL",
                    type: "url",
                }),
                defineField({
                    name: "tiktok",
                    title: "TikTok URL",
                    type: "url",
                }),
                defineField({
                    name: "twitter",
                    title: "Twitter / X URL",
                    type: "url",
                }),
                defineField({
                    name: "pinterest",
                    title: "Pinterest URL",
                    type: "url",
                }),
                defineField({
                    name: "snapchat",
                    title: "Snapchat URL",
                    type: "url",
                }),
            ],
        }),
        defineField({
            name: "aboutText",
            title: "About Section Text",
            type: "text",
            rows: 5,
            description: "Main description text shown in the About/Process section",
        }),
        defineField({
            name: "aboutHeroImage",
            title: "About Page Hero Image",
            type: "image",
            options: { hotspot: true },
            description: "Banner image shown at the top of the About page",
        }),
        defineField({
            name: "galleryHeroImage",
            title: "Gallery Page Hero Image",
            type: "image",
            options: { hotspot: true },
            description: "Banner image shown at the top of the Gallery page",
        }),
        defineField({
            name: "productsHeroImage",
            title: "Products Page Hero Image",
            type: "image",
            options: { hotspot: true },
            description: "Banner image shown at the top of the Products page",
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Site Settings",
                subtitle: "Global configuration",
            };
        },
    },
});
