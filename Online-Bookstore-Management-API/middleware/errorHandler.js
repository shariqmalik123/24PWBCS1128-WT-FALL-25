// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Mongoose CastError (invalid ID format)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid book ID format",
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `A book with this ${field} already exists`,
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
