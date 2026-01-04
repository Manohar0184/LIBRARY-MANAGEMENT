import { useState } from "react";
import { addBook } from "../services/bookApi";

const BookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addBook({
        ...formData,
        publishedYear: Number(formData.publishedYear),
        availableCopies: Number(formData.availableCopies),
      });

      setFormData({
        title: "",
        author: "",
        category: "",
        publishedYear: "",
        availableCopies: "",
      });

      onBookAdded(); // refresh book list
    } catch (err) {
      setError("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass book-form">
      <h2>Add New Book</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="publishedYear"
          placeholder="Published Year"
          value={formData.publishedYear}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="availableCopies"
          placeholder="Available Copies"
          value={formData.availableCopies}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
