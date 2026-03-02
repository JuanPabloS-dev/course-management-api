
class BaseError extends Error {
    public readonly status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, BaseError.prototype);
    }

}

export default BaseError