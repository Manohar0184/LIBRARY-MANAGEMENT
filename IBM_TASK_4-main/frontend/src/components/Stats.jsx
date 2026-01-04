const Stats = ({ books }) => {
  const totalBooks = books.length;

  const totalCopies = books.reduce(
    (sum, book) => sum + book.availableCopies,
    0
  );

  const categories = new Set(books.map((b) => b.category)).size;

  return (
    <div className="stats-grid">
      <div className="glass stat-card">
        <h2>{totalBooks}</h2>
        <p>Total Books</p>
      </div>

      <div className="glass stat-card">
        <h2>{categories}</h2>
        <p>Categories</p>
      </div>

      <div className="glass stat-card">
        <h2>{totalCopies}</h2>
        <p>Total Copies</p>
      </div>
    </div>
  );
};

export default Stats;
