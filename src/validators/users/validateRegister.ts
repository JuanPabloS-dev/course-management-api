import BadRequestError from "../../errors/bad-request.error.ts";

import validateString from "../primitives/validateString.ts";
import validateEmail from "../primitives/validateEmail.ts";
import validatePassword from "../primitives/validatePassword.ts";

export type RegisterDTO = {
    name: string;
    email: string;
    password: string;
}

const validateRegister = (data: unknown): RegisterDTO => {

    if (
        typeof data !== "object" ||
        data === null ||
        Array.isArray(data)
    ) {
        throw new BadRequestError("Invalid request body");
    }

    const { name, email, password } = data as Record<string, unknown>;

    const validatedName = validateString(name, {
        field: "Name",
        minLength: 3,
        maxLength: 100
    });

    const validatedEmail = validateEmail(email);

    const validatedPassword = validatePassword(password);

    // 4. DTO seguro
    return {
        name: validatedName,
        email: validatedEmail,
        password: validatedPassword
    };
}

export default validateRegister;