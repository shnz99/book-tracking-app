import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';

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

  const handleEdit = (id) => {
    navigation.navigate('EditBook', { id });
  };

  const renderItem = ({ item, drag, isActive }) => (
    <TouchableOpacity
      onLongPress={drag}
      onPress={() => navigation.navigate('BookDetails', { id: item.id })}
      style={[
        styles.bookItem,
        { backgroundColor: isActive ? '#f0f0f0' : '#fff' }
      ]}
    >
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Button title="Edit" onPress={() => handleEdit(item.id)} />
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
    </TouchableOpacity>
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
      <DraggableFlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onDragEnd={({ data }) => setBooks(data)}
      />
      <Button title="Add Book" onPress={() => navigation.navigate('AddBook')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
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
});

export default BookList;
