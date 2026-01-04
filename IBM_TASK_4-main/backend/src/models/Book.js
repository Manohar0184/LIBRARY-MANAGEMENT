import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
      min: [1000, "Invalid year"],
    },
    availableCopies: {
      type: Number,
      required: [true, "Available copies is required"],
      min: [0, "Available copies cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
