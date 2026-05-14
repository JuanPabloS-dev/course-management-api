import validateString from "./validateString.ts";

const validatePassword = (password: unknown): string => {

    return validateString(password, {
        field: "Password",
        minLength: 6,
        maxLength: 100
    });
}

export default validatePassword;