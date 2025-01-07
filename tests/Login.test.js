import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../src/components/Login';

describe('Login Component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should show validation error if email is empty', () => {
    const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), '');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Login'));
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should show validation error if password is empty', () => {
    const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.press(getByText('Login'));
    expect(getByText('Validation Error')).toBeTruthy();
  });

  it('should navigate to BookList on successful login', async () => {
    const navigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText } = render(<Login navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Login'));
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for async operation
    expect(navigation.navigate).toHaveBeenCalledWith('BookList');
  });

  it('should show error message on login failure', async () => {
    const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'invalidpassword');
    fireEvent.press(getByText('Login'));
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for async operation
    expect(getByText('Error')).toBeTruthy();
  });
});
