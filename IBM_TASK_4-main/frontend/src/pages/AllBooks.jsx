import { useEffect, useState } from "react";
import {
  getAllBooks,
  getBooksByCategory,
  getBooksAfterYear,
} from "../services/bookApi";

import BookCard from "../components/BookCard";
import FilterBar from "../components/FilterBar";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAllBooks();
      setBooks(result.data);
    } catch {
      setError("Failed to load books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    if (!category) return;
    setLoading(true);
    setError("");
    try {
      const result = await getBooksByCategory(category);
      setBooks(result.data);
    } catch {
      setError("No books found for this category");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByYear = async (year) => {
    if (!year) return;
    setLoading(true);
    setError("");
    try {
      const result = await getBooksAfterYear(year);
      setBooks(result.data);
    } catch {
      setError("No books found after this year");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="section">
      {/* Filters (MOVED HERE) */}
      <FilterBar
        onFilterCategory={filterByCategory}
        onFilterYear={filterByYear}
        onReset={fetchAllBooks}
      />

      {/* Book List */}
      {loading && <p>Loading books...</p>}

      {!loading && error && (
        <div className="glass" style={{ padding: "16px", textAlign: "center" }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="book-grid">
          {books.length === 0 ? (
            <div className="glass" style={{ padding: "20px" }}>
              No books found 
            </div>
          ) : (
            books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onRefresh={fetchAllBooks}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
