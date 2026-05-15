import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name too long"),

    email: z
        .string()
        .trim()
        .email("Invalid email format"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email format"),

    password: z
        .string()
        .min(1, "Password is required")
});

export type RegisterDto =
    z.infer<typeof registerSchema>;

export type LoginDto =
    z.infer<typeof loginSchema>;