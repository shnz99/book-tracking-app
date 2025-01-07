# Mobile App for Book Tracking and Management

This mobile app allows users to track and manage the books they have read. Users can add books to their library by searching for them or scanning their barcodes. The app provides features like categorizing books, adding notes, and rating books. Users can also set reading goals and track their progress.

## Features

- Track and manage books
- Add books by searching or scanning barcodes
- Categorize books
- Add notes and rate books
- Set reading goals and track progress
- User authentication

## Setup and Run

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd <project-directory>
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the app:
   ```
   npm start
   ```

The app will be running on `http://localhost:3000`.

## User Authentication Setup

1. Install `react-native-firebase`:
   ```
   npm install @react-native-firebase/app @react-native-firebase/auth
   ```
2. Follow the setup instructions for `react-native-firebase` for both Android and iOS:
   - [Android Setup](https://rnfirebase.io/#android-setup)
   - [iOS Setup](https://rnfirebase.io/#ios-setup)
3. Implement the authentication logic in the `src/components/Login.js` and `src/components/Signup.js` components.

## Running Tests

To run the unit tests for the components, use the following command:
```
npm test
```

## Contributing Guidelines

We welcome contributions to improve the app. Please follow these guidelines when contributing:

1. Fork the repository and create a new branch for your feature or bugfix.
2. Write clear and concise commit messages.
3. Ensure your code follows the existing code style and conventions.
4. Write unit tests for any new features or changes.
5. Submit a pull request with a detailed description of your changes.
