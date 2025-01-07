import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReadingGoals from '../src/components/ReadingGoals';

describe('ReadingGoals Component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ReadingGoals />);
    expect(getByText('Reading Goals')).toBeTruthy();
    expect(getByPlaceholderText('Enter a new goal')).toBeTruthy();
  });

  it('should add a new goal', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(<ReadingGoals />);
    fireEvent.changeText(getByPlaceholderText('Enter a new goal'), 'Read 10 books');
    fireEvent.press(getByText('Add Goal'));
    expect(getByText('Read 10 books')).toBeTruthy();
  });

  it('should show validation error if progress is invalid', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(<ReadingGoals />);
    fireEvent.changeText(getByPlaceholderText('Enter a new goal'), 'Read 10 books');
    fireEvent.press(getByText('Add Goal'));
    fireEvent.changeText(getByDisplayValue('0'), '101');
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should update progress correctly', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(<ReadingGoals />);
    fireEvent.changeText(getByPlaceholderText('Enter a new goal'), 'Read 10 books');
    fireEvent.press(getByText('Add Goal'));
    fireEvent.changeText(getByDisplayValue('0'), '50');
    expect(getByDisplayValue('50')).toBeTruthy();
  });
});
