import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditBook from '../src/components/EditBook';

describe('EditBook Component', () => {
  const books = [
    {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      barcode: '123456789',
    },
  ];

  const onUpdateBookMock = jest.fn();

  it('should render correctly', () => {
    const { getByText, getByDisplayValue } = render(
      <EditBook books={books} onUpdateBook={onUpdateBookMock} />
    );
    expect(getByText('Edit Book')).toBeTruthy();
    expect(getByDisplayValue('Test Book')).toBeTruthy();
    expect(getByDisplayValue('Test Author')).toBeTruthy();
    expect(getByDisplayValue('Test Description')).toBeTruthy();
    expect(getByDisplayValue('123456789')).toBeTruthy();
  });

  it('should show validation error if required fields are empty', () => {
    const { getByText, getByDisplayValue } = render(
      <EditBook books={books} onUpdateBook={onUpdateBookMock} />
    );
    fireEvent.changeText(getByDisplayValue('Test Book'), '');
    fireEvent.changeText(getByDisplayValue('Test Author'), '');
    fireEvent.changeText(getByDisplayValue('Test Description'), '');
    fireEvent.press(getByText('Save Changes'));
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should call onUpdateBook with correct data when form is submitted', () => {
    const { getByText, getByDisplayValue } = render(
      <EditBook books={books} onUpdateBook={onUpdateBookMock} />
    );
    fireEvent.changeText(getByDisplayValue('Test Book'), 'Updated Title');
    fireEvent.changeText(getByDisplayValue('Test Author'), 'Updated Author');
    fireEvent.changeText(getByDisplayValue('Test Description'), 'Updated Description');
    fireEvent.changeText(getByDisplayValue('123456789'), '987654321');
    fireEvent.press(getByText('Save Changes'));
    expect(onUpdateBookMock).toHaveBeenCalledWith({
      id: 1,
      title: 'Updated Title',
      author: 'Updated Author',
      description: 'Updated Description',
      barcode: '987654321',
    });
  });
});
