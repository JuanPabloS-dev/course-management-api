import { z } from "zod";

export const createCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title too long"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description too long")
}).strict();

export const updateCourseSchema =
    createCourseSchema
        .partial()
        .refine(
            (data) =>
                Object.keys(data).length > 0,
            {
                message:
                    "At least one field is required"
            }
        );