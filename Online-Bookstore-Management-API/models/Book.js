const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please provide an author name"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    publishedDate: {
      type: Date,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
