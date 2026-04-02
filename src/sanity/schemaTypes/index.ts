import { type SchemaTypeDefinition } from "sanity";

import { eventType } from "./event";
import { testimonialType } from "./testimonial";
import { serviceType } from "./service";
import { heroSlideType } from "./heroSlide";
import { siteSettingsType } from "./siteSettings";
import { contactInquiryType } from "./contactInquiry";
import { productType } from "./product";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [eventType, testimonialType, serviceType, heroSlideType, siteSettingsType, contactInquiryType, productType],
};
