import Book from "../models/Book.js";

/* =====================================================
   CREATE – Add a new book
===================================================== */
export const createBook = async (req, res, next) => {
  try {
    const { title, author, category, publishedYear, availableCopies } = req.body;

    if (
      !title ||
      !author ||
      !category ||
      !publishedYear ||
      availableCopies === undefined
    ) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const book = await Book.create({
      title,
      author,
      category,
      publishedYear,
      availableCopies,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   READ – Get all books
===================================================== */
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   READ – Get books by category
===================================================== */
export const getBooksByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const books = await Book.find({ category });

    if (books.length === 0) {
      res.status(404);
      throw new Error("No books found in this category");
    }

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   READ – Get books published after a given year
===================================================== */
export const getBooksAfterYear = async (req, res, next) => {
  try {
    const year = Number(req.params.year);

    if (isNaN(year)) {
      res.status(400);
      throw new Error("Invalid year");
    }

    const books = await Book.find({
      publishedYear: { $gt: year },
    });

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   UPDATE – Increase / Decrease available copies
===================================================== */
export const updateBookCopies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { change } = req.body;

    if (typeof change !== "number") {
      res.status(400);
      throw new Error("Change value must be a number");
    }

    const book = await Book.findById(id);

    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    const updatedCopies = book.availableCopies + change;

    if (updatedCopies < 0) {
      res.status(400);
      throw new Error("Available copies cannot be negative");
    }

    book.availableCopies = updatedCopies;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book copies updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   UPDATE – Change book category
===================================================== */
export const updateBookCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    if (!category) {
      res.status(400);
      throw new Error("Category is required");
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );

    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    res.status(200).json({
      success: true,
      message: "Book category updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   DELETE – Delete book only if availableCopies === 0
===================================================== */
export const deleteBookIfZero = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    if (book.availableCopies !== 0) {
      res.status(400);
      throw new Error(
        "Book can be deleted only if available copies are zero"
      );
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
