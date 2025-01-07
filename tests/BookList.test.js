import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookList from '../src/components/BookList';

describe('BookList Component', () => {
  const books = [
    {
      id: 1,
      title: 'Test Book 1',
      author: 'Test Author 1',
      description: 'Test Description 1',
    },
    {
      id: 2,
      title: 'Test Book 2',
      author: 'Test Author 2',
      description: 'Test Description 2',
    },
  ];

  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<BookList books={books} />);
    expect(getByText('My Library')).toBeTruthy();
    expect(getByPlaceholderText('Search books...')).toBeTruthy();
    expect(getByText('Test Book 1')).toBeTruthy();
    expect(getByText('Test Book 2')).toBeTruthy();
  });

  it('should filter books based on search term', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<BookList books={books} />);
    fireEvent.changeText(getByPlaceholderText('Search books...'), 'Test Book 1');
    expect(getByText('Test Book 1')).toBeTruthy();
    expect(queryByText('Test Book 2')).toBeNull();
  });

  it('should navigate to BookDetails when a book is pressed', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<BookList books={books} navigation={navigation} />);
    fireEvent.press(getByText('Test Book 1'));
    expect(navigation.navigate).toHaveBeenCalledWith('BookDetails', { id: 1 });
  });

  it('should delete a book when delete button is pressed', () => {
    const { getByText, queryByText } = render(<BookList books={books} />);
    fireEvent.press(getByText('Delete'));
    expect(queryByText('Test Book 1')).toBeNull();
  });

  it('should navigate to AddBook when add book button is pressed', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<BookList books={books} navigation={navigation} />);
    fireEvent.press(getByText('Add Book'));
    expect(navigation.navigate).toHaveBeenCalledWith('AddBook');
  });
});
