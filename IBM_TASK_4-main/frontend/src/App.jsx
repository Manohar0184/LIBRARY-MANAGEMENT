import { useState } from "react";
import "./styles/app.css";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";

const App = () => {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="container">
      <Navbar currentPage={page} onChangePage={setPage} />

      {page === "dashboard" && <Dashboard />}
      {page === "books" && <AllBooks />}
      {page === "addBook" && <AddBook onBookAdded={() => setPage("books")} />}
    </div>
  );
};

export default App;
