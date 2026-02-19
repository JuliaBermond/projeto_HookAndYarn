export class ApiResponse {
  static success(
    res,
    {
      statusCode = 200,
      message = "Operation completed successfully.",
      data = null,
    }
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}
