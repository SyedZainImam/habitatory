import { type SchemaTypeDefinition } from "sanity";

import { eventType } from "./event";
import { testimonialType } from "./testimonial";
import { serviceType } from "./service";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [eventType, testimonialType, serviceType],
};
