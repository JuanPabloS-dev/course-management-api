import { z } from "zod";

export const createLessonSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title too long"),

    content: z
        .string()
        .trim()
        .min(10, "Content must be at least 10 characters")
        .max(5000, "Content too long")
}).strict();

export const updateLessonSchema =
    createLessonSchema
        .partial()
        .refine(
            (data) =>
                Object.keys(data).length > 0,
            {
                message:
                    "At least one field is required"
            }
        );