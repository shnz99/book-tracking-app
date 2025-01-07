import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookDetails from '../src/components/BookDetails';

describe('BookDetails Component', () => {
  const books = [
    {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      notes: 'Test Notes',
      rating: 4,
      progress: 50,
    },
  ];

  it('should render correctly', () => {
    const { getByText, getByDisplayValue } = render(<BookDetails books={books} />);
    expect(getByText('Test Book')).toBeTruthy();
    expect(getByText('Test Author')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByDisplayValue('Test Notes')).toBeTruthy();
    expect(getByDisplayValue('4')).toBeTruthy();
    expect(getByDisplayValue('50')).toBeTruthy();
  });

  it('should show validation error if rating is invalid', () => {
    const { getByText, getByDisplayValue } = render(<BookDetails books={books} />);
    fireEvent.changeText(getByDisplayValue('4'), '6');
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should show validation error if progress is invalid', () => {
    const { getByText, getByDisplayValue } = render(<BookDetails books={books} />);
    fireEvent.changeText(getByDisplayValue('50'), '101');
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should update notes correctly', () => {
    const { getByDisplayValue } = render(<BookDetails books={books} />);
    fireEvent.changeText(getByDisplayValue('Test Notes'), 'Updated Notes');
    expect(getByDisplayValue('Updated Notes')).toBeTruthy();
  });

  it('should update rating correctly', () => {
    const { getByDisplayValue } = render(<BookDetails books={books} />);
    fireEvent.changeText(getByDisplayValue('4'), '5');
    expect(getByDisplayValue('5')).toBeTruthy();
  });

  it('should update progress correctly', () => {
    const { getByDisplayValue } = render(<BookDetails books={books} />);
    fireEvent.changeText(getByDisplayValue('50'), '75');
    expect(getByDisplayValue('75')).toBeTruthy();
  });
});
