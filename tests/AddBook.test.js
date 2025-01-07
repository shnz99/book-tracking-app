import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddBook from '../src/components/AddBook';

describe('AddBook Component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddBook onAddBook={() => {}} />);
    expect(getByText('Add a New Book')).toBeTruthy();
    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Author')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
    expect(getByPlaceholderText('Barcode')).toBeTruthy();
  });

  it('should show validation error if required fields are empty', () => {
    const { getByText, getByPlaceholderText } = render(<AddBook onAddBook={() => {}} />);
    fireEvent.changeText(getByPlaceholderText('Title'), '');
    fireEvent.changeText(getByPlaceholderText('Author'), '');
    fireEvent.changeText(getByPlaceholderText('Description'), '');
    fireEvent.press(getByText('Add Book'));
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should call onAddBook with correct data when form is submitted', () => {
    const onAddBookMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(<AddBook onAddBook={onAddBookMock} />);
    fireEvent.changeText(getByPlaceholderText('Title'), 'Test Title');
    fireEvent.changeText(getByPlaceholderText('Author'), 'Test Author');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Test Description');
    fireEvent.changeText(getByPlaceholderText('Barcode'), '123456789');
    fireEvent.press(getByText('Add Book'));
    expect(onAddBookMock).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'Test Title',
      author: 'Test Author',
      description: 'Test Description',
      barcode: '123456789',
    });
  });

  it('should show barcode error if barcode scan fails', () => {
    const { getByText, getByPlaceholderText } = render(<AddBook onAddBook={() => {}} />);
    fireEvent.press(getByText('Scan Barcode'));
    fireEvent(getByPlaceholderText('Barcode'), 'onBarCodeRead', { data: null });
    expect(getByText('Barcode Error')).toBeTruthy();
  });
});
