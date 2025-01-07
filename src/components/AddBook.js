import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import './styles/AddBook.css';

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);

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
    const newBook = {
      id: Date.now(),
      title,
      author,
      description,
      barcode,
    };
    onAddBook(newBook);
    setTitle('');
    setAuthor('');
    setDescription('');
    setBarcode('');
  };

  const handleBarcodeScan = (barcodeData) => {
    setBarcode(barcodeData);
    setScanning(false);
  };

  const startScanning = () => {
    setScanning(true);
  };

  return (
    <div className="add-book">
      <h1>Add a New Book</h1>
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
          <button type="button" onClick={startScanning}>
            Scan Barcode
          </button>
        </div>
        <button type="submit">Add Book</button>
      </form>
      {scanning && (
        <RNCamera
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onBarCodeRead={(e) => handleBarcodeScan(e.data)}
        />
      )}
    </div>
  );
};

export default AddBook;
