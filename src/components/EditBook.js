import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/EditBook.css';

const EditBook = ({ books, onUpdateBook }) => {
  const { id } = useParams();
  const book = books.find((book) => book.id === id);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [barcode, setBarcode] = useState(book.barcode);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedBook = {
      ...book,
      title,
      author,
      description,
      barcode,
    };
    onUpdateBook(updatedBook);
  };

  return (
    <div className="edit-book">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="barcode">Barcode</label>
          <input
            type="text"
            id="barcode"
            value={barcode}
            onChange={handleBarcodeChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBook;
