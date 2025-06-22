import { Blog } from '../models/blog.model';

import Joi from 'joi';

const BlogSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().min(2).max(5000).required()
});

/**
 * Dynamically validates the object based on available fields.
 */
export const validBlog = (obj: Blog) => {
    const { error, value } = BlogSchema.validate(obj);
    if (error) {
        throw error;
    }
    return value;
};


// export const validBlog = <T extends Partial<z.infer<typeof BlogSchema>>>(obj: T): boolean => {
//     try {
//         // Extract keys that exist in both the object and the schema
//         const schemaKeys = Object.keys(BlogSchema.shape) as (keyof typeof BlogSchema.shape)[];
//         const existingKeys = schemaKeys.filter(key => key in obj);

//         // Pick only existing keys from BlogSchema
//         const dynamicSchema = BlogSchema.pick(
//             existingKeys.reduce((acc, key) => {
//                 acc[key] = true;
//                 return acc;
//             }, {} as Record<keyof typeof BlogSchema.shape, true>)
//         );

//         // Validate using the dynamically selected schema
//         dynamicSchema.parse(obj);
//         return true;
//     } catch (error) {
//         throw new Error(
//             `Validation failed: ${error instanceof z.ZodError ? error.errors.map(e => e.message).join(", ") : "Invalid data"}`
//         );
//     }
// };

export { BlogSchema }; 