import BadRequestError from "../../errors/bad-request.error.ts";

type ValidateStringOptions = {
    field: string;
    minLength?: number;
    maxLength?: number;
}

const validateString = (
    value: unknown,
    options: ValidateStringOptions
): string => {

    const { field, minLength, maxLength } = options;

    if (typeof value !== "string") {
        throw new BadRequestError(`${field} must be a string`);
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
        throw new BadRequestError(`${field} is required`);
    }

    if (minLength && trimmedValue.length < minLength) {
        throw new BadRequestError(
            `${field} must be at least ${minLength} characters long`
        );
    }

    if (maxLength && trimmedValue.length > maxLength) {
        throw new BadRequestError(
            `${field} must be less than ${maxLength} characters`
        );
    }

    return trimmedValue;
}

export default validateString;