import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useRoute } from '@react-navigation/native';

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

  const handleBarcodeScan = (barcodeData) => {
    if (!barcodeData) {
      Alert.alert('Barcode Error', 'Failed to scan the barcode. Please try again.');
      setScanning(false);
      return;
    }
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

const BookDetails = ({ books }) => {
  const route = useRoute();
  const { id } = route.params;
  const book = books.find((book) => book.id === id);
  const [notes, setNotes] = useState(book.notes || '');
  const [rating, setRating] = useState(book.rating || 0);
  const [progress, setProgress] = useState(book.progress || 0);

  const handleNotesChange = (text) => {
    setNotes(text);
  };

  const handleRatingChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 5) {
      Alert.alert('Validation Error', 'Please enter a valid rating between 0 and 5.');
      return;
    }
    setRating(numericValue);
  };

  const handleProgressChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      Alert.alert('Validation Error', 'Please enter a valid progress percentage between 0 and 100.');
      return;
    }
    setProgress(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={styles.textArea}
          value={notes}
          onChangeText={handleNotesChange}
          multiline
        />
      </View>
      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Rating</Text>
        <TextInput
          style={styles.input}
          value={rating.toString()}
          onChangeText={handleRatingChange}
          keyboardType="numeric"
          maxLength={1}
        />
      </View>
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Reading Progress</Text>
        <TextInput
          style={styles.input}
          value={progress.toString()}
          onChangeText={handleProgressChange}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>
    </View>
  );
};

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setBooks(books.filter((book) => book.id !== id))
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { id: item.id })}>
        <Text style={styles.bookTitle}>{item.title}</Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Library</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search books..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Book" onPress={() => navigation.navigate('AddBook')} />
    </View>
  );
};

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

const ReadingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [progress, setProgress] = useState({});

  const handleNewGoalChange = (text) => {
    setNewGoal(text);
  };

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const handleProgressChange = (goal, text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      Alert.alert('Validation Error', 'Please enter a valid progress percentage between 0 and 100.');
      return;
    }
    setProgress({
      ...progress,
      [goal]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Goals</Text>
      <View style={styles.addGoal}>
        <TextInput
          style={styles.input}
          value={newGoal}
          onChangeText={handleNewGoalChange}
          placeholder="Enter a new goal"
        />
        <Button title="Add Goal" onPress={handleAddGoal} />
      </View>
      <FlatList
        data={goals}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item}</Text>
            <TextInput
              style={styles.progressInput}
              value={progress[item] || '0'}
              onChangeText={(text) => handleProgressChange(item, text)}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.percentage}>%</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  notesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingSection: {
    marginBottom: 20,
  },
  progressSection: {
    marginBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookTitle: {
    fontSize: 18,
    color: '#4CAF50',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addGoal: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalText: {
    flex: 1,
    fontSize: 18,
  },
  progressInput: {
    width: 50,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  percentage: {
    fontSize: 18,
    marginLeft: 5,
  },
});

export const configureLibrary = (name) => {
  return {
    libraryName: name,
  };
};

export { AddBook, BookDetails, BookList, EditBook, ReadingGoals };
