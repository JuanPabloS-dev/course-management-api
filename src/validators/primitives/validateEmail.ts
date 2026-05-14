import BadRequestError from "../../errors/bad-request.error.ts";
import validateString from "./validateString.ts";

const validateEmail = (email: unknown): string => {

    const validatedEmail = validateString(email, {
        field: "Email",
        minLength: 5,
        maxLength: 150
    });

    const normalizedEmail = validatedEmail.toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        throw new BadRequestError("Invalid email format");
    }

    return normalizedEmail;
}

export default validateEmail;