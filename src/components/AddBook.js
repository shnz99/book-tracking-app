import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Book</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <Tooltip
          isVisible={showTooltip}
          content={<Text>Enter the title of the book</Text>}
          placement="top"
          onClose={() => setShowTooltip(false)}
        >
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
            onFocus={() => setShowTooltip(true)}
            required
          />
        </Tooltip>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Author</Text>
        <Tooltip
          isVisible={showTooltip}
          content={<Text>Enter the author of the book</Text>}
          placement="top"
          onClose={() => setShowTooltip(false)}
        >
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={handleAuthorChange}
            onFocus={() => setShowTooltip(true)}
            required
          />
        </Tooltip>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <Tooltip
          isVisible={showTooltip}
          content={<Text>Enter a brief description of the book</Text>}
          placement="top"
          onClose={() => setShowTooltip(false)}
        >
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={handleDescriptionChange}
            onFocus={() => setShowTooltip(true)}
            multiline
            required
          />
        </Tooltip>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Barcode</Text>
        <Tooltip
          isVisible={showTooltip}
          content={<Text>Enter the barcode of the book</Text>}
          placement="top"
          onClose={() => setShowTooltip(false)}
        >
          <TextInput
            style={styles.input}
            value={barcode}
            onChangeText={handleBarcodeChange}
            onFocus={() => setShowTooltip(true)}
          />
        </Tooltip>
      </View>
      <Button title="Add Book" onPress={handleSubmit} />
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

export default AddBook;
