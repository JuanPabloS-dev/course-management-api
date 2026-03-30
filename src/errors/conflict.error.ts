import BaseError from "./base.error";

class ConflictError extends BaseError {
  constructor(message = "Conflict") {
    super(message, 409, true);
  }
}

export default ConflictError;