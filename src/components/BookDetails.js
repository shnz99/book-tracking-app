import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  notesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlignVertical: 'top',
  },
  ratingSection: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  progressSection: {
    marginBottom: 20,
  },
});

export default BookDetails;
