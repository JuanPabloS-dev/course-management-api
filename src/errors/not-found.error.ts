import BaseError from "./base.error";

class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, 404, true);
  }
}

export default NotFoundError;