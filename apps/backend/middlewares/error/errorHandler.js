import { AppError } from "./apiError.js";

export function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: "INTERNAL_SERVER_ERROR",
      code: 500,
    },
  });
}
