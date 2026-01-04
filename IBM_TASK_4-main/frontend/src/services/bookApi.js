import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/books";

export const getAllBooks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addBook = async (bookData) => {
  const response = await axios.post(API_BASE_URL, bookData);
  return response.data;
};

export const getBooksByCategory = async (category) => {
  const response = await axios.get(`${API_BASE_URL}/category/${category}`);
  return response.data;
};

export const getBooksAfterYear = async (year) => {
  const response = await axios.get(`${API_BASE_URL}/after/${year}`);
  return response.data;
};

export const updateBookCopies = async (id, change) => {
  const response = await axios.put(
    `${API_BASE_URL}/${id}/copies`,
    { change }
  );
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
