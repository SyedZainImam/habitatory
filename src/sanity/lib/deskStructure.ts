import type { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title("Habitatory CMS")
        .items([
            // Site Settings — singleton
            S.listItem()
                .title("Site Settings")
                .id("siteSettings")
                .child(
                    S.document()
                        .schemaType("siteSettings")
                        .documentId("siteSettings")
                        .title("Site Settings")
                ),

            S.divider(),

            // Content Management
            S.listItem()
                .title("Events")
                .schemaType("event")
                .child(S.documentTypeList("event").title("Events")),

            S.listItem()
                .title("Services")
                .schemaType("service")
                .child(S.documentTypeList("service").title("Services")),

            S.listItem()
                .title("Testimonials")
                .schemaType("testimonial")
                .child(S.documentTypeList("testimonial").title("Testimonials")),

            S.listItem()
                .title("Hero Slides")
                .schemaType("heroSlide")
                .child(S.documentTypeList("heroSlide").title("Hero Slides")),

            S.listItem()
                .title("Products")
                .schemaType("product")
                .child(S.documentTypeList("product").title("Products")),

            S.divider(),

            // Inbox
            S.listItem()
                .title("Contact Inquiries")
                .schemaType("contactInquiry")
                .child(
                    S.documentTypeList("contactInquiry")
                        .title("Contact Inquiries")
                        .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
        ]);
