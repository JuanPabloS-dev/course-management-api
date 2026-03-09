
class BaseError extends Error {
    public readonly status: number;
    public readonly isOperational: boolean;
    constructor(message: string, status: number,isOperational: boolean = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, BaseError.prototype);
    }

}

export default BaseError