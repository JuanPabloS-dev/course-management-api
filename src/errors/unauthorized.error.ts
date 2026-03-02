import BaseError from "./base.error.ts";

class UnauthorizedError extends BaseError{
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export default UnauthorizedError