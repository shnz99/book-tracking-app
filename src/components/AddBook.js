import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleAuthorChange = (text) => {
    setAuthor(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleBarcodeChange = (text) => {
    setBarcode(text);
  };

  const handleSubmit = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Book</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
          required
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Author</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={handleAuthorChange}
          required
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={handleDescriptionChange}
          multiline
          required
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Barcode</Text>
        <TextInput
          style={styles.input}
          value={barcode}
          onChangeText={handleBarcodeChange}
        />
        <Button title="Scan Barcode" onPress={startScanning} />
      </View>
      <Button title="Add Book" onPress={handleSubmit} />
      {scanning && (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={(e) => handleBarcodeScan(e.data)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlignVertical: 'top',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddBook;
