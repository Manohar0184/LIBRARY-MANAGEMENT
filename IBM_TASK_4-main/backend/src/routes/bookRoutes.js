import express from "express";
import { createBook, getAllBooks, getBooksByCategory, getBooksAfterYear, updateBookCopies, updateBookCategory, deleteBookIfZero } from "../controllers/bookController.js";

const router = express.Router();

// CREATE
router.post("/", createBook);

// READ
router.get("/",getAllBooks);
router.get("/category/:category",getBooksByCategory);
router.get("/after/:year",getBooksAfterYear);

// Update
router.put("/:id/copies", updateBookCopies);
router.put("/:id/category", updateBookCategory);

// DELETE
router.delete("/:id",deleteBookIfZero);

export default router;