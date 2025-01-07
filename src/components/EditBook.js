import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const EditBook = ({ books, onUpdateBook }) => {
  const route = useRoute();
  const { id } = route.params;
  const book = books.find((book) => book.id === id);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [barcode, setBarcode] = useState(book.barcode);

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
    if (!title || !author || !description) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

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
    <View style={styles.container}>
      <Text style={styles.title}>Edit Book</Text>
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
      </View>
      <Button title="Save Changes" onPress={handleSubmit} />
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
});

export default EditBook;
