import { updateBookCopies, deleteBook } from "../services/bookApi";

const BookCard = ({ book, onRefresh }) => {
  const handleIncrease = async () => {
    await updateBookCopies(book._id, 1);
    onRefresh();
  };

  const handleDecrease = async () => {
    await updateBookCopies(book._id, -1);
    onRefresh();
  };

  const handleDelete = async () => {
    if (book.availableCopies !== 0) {
      alert("Set copies to 0 before deleting");
      return;
    }
    await deleteBook(book._id);
    onRefresh();
  };

  return (
    <div className="glass book-card">
      <h3>{book.title}</h3>
      <p className="author">by {book.author}</p>

      <div className="meta">
        <span> {book.category}</span>
        <span> {book.publishedYear}</span>
      </div>

      <p className="copies">
        Copies: <strong>{book.availableCopies}</strong>
      </p>

      <div className="actions">
        <button onClick={handleIncrease}>Add Copies</button>
        <button onClick={handleDecrease}>Remove Copies</button>
        <button className="danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
