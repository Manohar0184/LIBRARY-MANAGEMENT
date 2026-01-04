import BookForm from "../components/BookForm";

const AddBook = ({ onBookAdded }) => {
  return (
    <div className="section">
      <BookForm onBookAdded={onBookAdded} />
    </div>
  );
};

export default AddBook;
