import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/BookDetails.css';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find((book) => book.id === id);
  const [notes, setNotes] = useState(book.notes || '');
  const [rating, setRating] = useState(book.rating || 0);
  const [progress, setProgress] = useState(book.progress || 0);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <div className="notes-section">
        <h2>Notes</h2>
        <textarea value={notes} onChange={handleNotesChange} />
      </div>
      <div className="rating-section">
        <h2>Rating</h2>
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="0"
          max="5"
        />
      </div>
      <div className="progress-section">
        <h2>Reading Progress</h2>
        <input
          type="number"
          value={progress}
          onChange={handleProgressChange}
          min="0"
          max="100"
        />
      </div>
    </div>
  );
};

export default BookDetails;
