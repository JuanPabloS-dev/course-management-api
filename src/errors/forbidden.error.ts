import  BaseError  from './base.error.ts'

class ForbiddenError extends BaseError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export default ForbiddenError