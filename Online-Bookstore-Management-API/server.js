const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const { requestLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const booksRouter = require("./routes/books");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Routes
app.use("/api/books", booksRouter);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Online Bookstore Management API",
    version: "1.0.0",
    endpoints: {
      getAllBooks: "GET /api/books",
      getBookById: "GET /api/books/:id",
      addBook: "POST /api/books",
      updateBook: "PUT /api/books/:id",
      deleteBook: "DELETE /api/books/:id",
      searchBooks: "GET /api/books?author=name&genre=type&page=1&limit=10",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
