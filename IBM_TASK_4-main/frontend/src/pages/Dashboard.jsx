import { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookApi";

import Stats from "../components/Stats";
import BookCard from "../components/BookCard";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const result = await getAllBooks();
      setBooks(result.data);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  /* Top 3 latest books */
  const latestBooks = [...books]
    .sort((a, b) => b.publishedYear - a.publishedYear)
    .slice(0, 3);

  return (
    <div>
      {/* Latest Books */}
      <div className="section">
        <div className="glass" style={{ padding: "20px", marginBottom: "16px" }}>
          <h3>Latest Books</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Recently published books
          </p>
        </div>

        {loading ? (
          <p>Loading latest books...</p>
        ) : latestBooks.length === 0 ? (
          <div className="glass" style={{ padding: "16px" }}>
            No recent books available
          </div>
        ) : (
          <div className="book-grid">
            {latestBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onRefresh={fetchAllBooks}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats at Bottom */}
      <div className="section">
        <Stats books={books} />
      </div>
    </div>
  );
};

export default Dashboard;
