const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books with search and pagination
router.get("/", async (req, res, next) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Build filter object
    let filter = {};
    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }
    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    // Calculate pagination
    const skip = (pageNum - 1) * limitNum;

    // Get total count and books
    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// GET a single book by ID
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// POST a new book
router.post("/", async (req, res, next) => {
  try {
    const { title, author, genre, price, publishedDate, inStock } = req.body;

    // Validate required fields
    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, author, and price",
      });
    }

    const book = new Book({
      title,
      author,
      genre,
      price,
      publishedDate,
      inStock: inStock !== undefined ? inStock : true,
    });

    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    next(error);
  }
});

// PUT update a book by ID
router.put("/:id", async (req, res, next) => {
  try {
    const { title, author, genre, price, publishedDate, inStock } = req.body;

    // Validate required fields if provided
    if (title === "" || author === "" || (price !== undefined && price < 0)) {
      return res.status(400).json({
        success: false,
        message: "Invalid field values provided",
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (author !== undefined) updateData.author = author;
    if (genre !== undefined) updateData.genre = genre;
    if (price !== undefined) updateData.price = price;
    if (publishedDate !== undefined) updateData.publishedDate = publishedDate;
    if (inStock !== undefined) updateData.inStock = inStock;

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE a book by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
