export class AppError extends Error {
  constructor(
    message = "An unexpected error occurred.",
    status = 400,
    code = "APP_ERROR",
  ) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "The request data is invalid.") {
    super(message, 400, "BAD_REQUEST");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication is required to access this resource.") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class NotPermittedError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, 403, "NOT_PERMITTED");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "The requested resource was not found.") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message = "A resource with the provided data already exists.") {
    super(message, 409, "DATA_CONFLICT");
  }
}

export class UserCouldNotBeCreated extends AppError {
  constructor(message = "Unable to create user whith the provided data") {
    super(message, 409, "CONFLICT");
  }
}

export class RouteNotFound extends AppError {
  constructor(message = "This route does not exist") {
    super(message, 404, "NOT_FOUND");
  }
}
