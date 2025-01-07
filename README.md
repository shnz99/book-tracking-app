# Mobile App for Book Tracking and Management

This mobile app allows users to track and manage the books they have read. Users can add books to their library by searching for them or scanning their barcodes. The app provides features like categorizing books, adding notes, and rating books. Users can also set reading goals and track their progress.

## Features

- Track and manage books
- Add books by searching or scanning barcodes
- Categorize books
- Add notes and rate books
- Set reading goals and track progress

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

## Running Tests

To run the unit tests for the components, use the following command:
```
npm test
```

## Running the App on a Mobile Device

To run the app on a mobile device using Expo, follow these steps:

1. Install the Expo CLI:
   ```
   npm install -g expo-cli
   ```
2. Start the Expo development server:
   ```
   expo start
   ```
3. Download the Expo Go app on your mobile device from the App Store (iOS) or Google Play Store (Android).
4. Open the Expo Go app and scan the QR code displayed in the terminal or on the Expo development server page.

## Building the App for Android and iOS

To build the app for Android and iOS, follow these steps:

1. Install the Expo CLI if you haven't already:
   ```
   npm install -g expo-cli
   ```
2. Build the app for Android:
   ```
   expo build:android
   ```
3. Build the app for iOS:
   ```
   expo build:ios
   ```

Follow the instructions provided by Expo to complete the build process and obtain the APK (Android) or IPA (iOS) files.

## Contributing Guidelines

We welcome contributions to improve the app. Please follow these guidelines when contributing:

1. Fork the repository and create a new branch for your feature or bugfix.
2. Write clear and concise commit messages.
3. Ensure your code follows the existing code style and conventions.
4. Write unit tests for any new features or changes.
5. Submit a pull request with a detailed description of your changes.
