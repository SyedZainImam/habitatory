import { defineField, defineType } from "sanity";

export const contactInquiryType = defineType({
    name: "contactInquiry",
    title: "Contact Inquiry",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "message",
            title: "Message",
            type: "text",
            readOnly: true,
        }),
        defineField({
            name: "submittedAt",
            title: "Submitted At",
            type: "datetime",
            readOnly: true,
        }),
        defineField({
            name: "read",
            title: "Read",
            type: "boolean",
            description: "Mark as read once you've reviewed this inquiry",
            initialValue: false,
        }),
    ],
    orderings: [
        {
            title: "Newest First",
            name: "submittedAtDesc",
            by: [{ field: "submittedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "email",
            read: "read",
        },
        prepare({ title, subtitle, read }) {
            return {
                title: `${read ? "" : "● "}${title}`,
                subtitle,
            };
        },
    },
});
