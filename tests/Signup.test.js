import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Signup from '../src/components/Signup';

describe('Signup Component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('should show validation error if email is empty', () => {
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should show validation error if password is empty', () => {
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should show error if passwords do not match', () => {
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password456');
    fireEvent.press(getByText('Sign Up'));
    expect(getByText('Passwords do not match')).toBeTruthy();
  });

  it('should call createUserWithEmailAndPassword with correct data when form is submitted', async () => {
    const createUserWithEmailAndPasswordMock = jest.fn().mockResolvedValue({});
    auth().createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Sign Up'));
    expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should navigate to BookList after successful signup', async () => {
    const createUserWithEmailAndPasswordMock = jest.fn().mockResolvedValue({});
    auth().createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;
    const navigateMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: navigateMock }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Sign Up'));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('BookList');
    });
  });

  it('should show error message if signup fails', async () => {
    const createUserWithEmailAndPasswordMock = jest.fn().mockRejectedValue(new Error('Signup failed'));
    auth().createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;
    const { getByText, getByPlaceholderText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Sign Up'));
    await waitFor(() => {
      expect(getByText('Signup failed')).toBeTruthy();
    });
  });
});
