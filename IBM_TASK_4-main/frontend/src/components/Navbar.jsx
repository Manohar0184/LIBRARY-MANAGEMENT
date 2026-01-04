const Navbar = ({ currentPage, onChangePage }) => {
  return (
    <nav className="glass navbar">
      <h2>LibraryMS</h2>

      <div className="navbar-right">
        <button
          className={currentPage === "dashboard" ? "nav-active" : ""}
          onClick={() => onChangePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={currentPage === "books" ? "nav-active" : ""}
          onClick={() => onChangePage("books")}
        >
          All Books
        </button>

        <button
          className={currentPage === "addBook" ? "nav-active" : ""}
          onClick={() => onChangePage("addBook")}
        >
          Add Book
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
