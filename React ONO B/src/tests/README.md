# Testing Documentation

This directory contains unit and integration tests for the React ONO application, using **Vitest** and **React Testing Library**.

## 📂 Directory Structure

### 1. Unit Tests (`/unit`)
Focuses on individual components in isolation:
- **`AddMission.test.jsx`**: Verifies input handling and submission logic for the Add component.
- **`MissionItem.test.jsx`**: Details the behavior of individual mission rows (display, styling, and callbacks).

### 2. Integration Tests (`/integration`)
Comprehensive tests covering the main application flow:
- **`App.test.jsx`**: Validates end-to-end user flows including state management, localStorage persistence, and status filtering.

### 3. Configuration
- **`setup.js`**: Global test setup, including `@testing-library/jest-dom` extensions.

## 🚀 How to Run Tests

Run the following command in the project root to execute the full suite:
```bash
npm test
```

To run tests in a specific category:
```bash
npx vitest src/tests/unit
npx vitest src/tests/integration
```
