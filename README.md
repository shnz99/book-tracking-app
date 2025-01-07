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

## Custom Build Script

The project uses a custom build script with `webpack` to automate the build process. The build script is defined in the `package.json` file under the "scripts" section:
```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```
To run the custom build script, use the following command:
```
npm run build
```

## Continuous Integration (CI) Pipeline

The project is set up with a CI pipeline using GitHub Actions. The CI pipeline is defined in the `.github/workflows/ci.yml` file. It automates the build process, runs tests, and ensures consistency across different environments. The CI pipeline includes a step to run `npm audit` to check for security vulnerabilities.

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
