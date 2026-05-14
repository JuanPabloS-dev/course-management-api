import BadRequestError from "../../errors/bad-request.error.ts";

import validateEmail from "../primitives/validateEmail.ts";
import validatePassword from "../primitives/validatePassword.ts";

export type LoginDTO = {
    email: string;
    password: string;
}

const validateLogin = (data: unknown): LoginDTO => {

    if (
        typeof data !== "object" ||
        data === null ||
        Array.isArray(data)
    ) {
        throw new BadRequestError("Invalid request body");
    }

    const { email, password } = data as Record<string, unknown>;

    return {
        email: validateEmail(email),
        password: validatePassword(password)
    };
}

export default validateLogin;