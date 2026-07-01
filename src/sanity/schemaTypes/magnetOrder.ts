import { defineField, defineType } from "sanity";

export const magnetOrderType = defineType({
    name: "magnetOrder",
    title: "Magnet Order",
    type: "document",
    fields: [
        defineField({
            name: "orderID",
            title: "Order ID",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "customerPhone",
            title: "Customer Phone",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "templateId",
            title: "Template",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "composedImage",
            title: "Print-Ready Image",
            type: "image",
            readOnly: true,
            description: "Open in new tab → Ctrl+P to print",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending Payment", value: "pending" },
                    { title: "Paid", value: "paid" },
                    { title: "Printed", value: "printed" },
                ],
                layout: "radio",
            },
            initialValue: "pending",
        }),
        defineField({
            name: "createdAt",
            title: "Order Date",
            type: "datetime",
            readOnly: true,
        }),
        defineField({
            name: "notes",
            title: "Customer Notes",
            type: "text",
            readOnly: true,
        }),
    ],
    orderings: [
        {
            title: "Newest First",
            name: "createdAtDesc",
            by: [{ field: "createdAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "customerName",
            subtitle: "orderID",
            media: "composedImage",
            status: "status",
        },
        prepare({ title, subtitle, media, status }) {
            const icon = status === "printed" ? "✅" : status === "paid" ? "💰" : "⏳";
            return {
                title: `${icon} ${title}`,
                subtitle,
                media,
            };
        },
    },
});
