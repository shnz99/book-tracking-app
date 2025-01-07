import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="book-list">
      <h1>My Library</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add-book">Add Book</Link>
    </div>
  );
};

export default BookList;
