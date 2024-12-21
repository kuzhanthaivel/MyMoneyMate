# My Money Mate App

This README provides an overview of the My Money Mate app, its features, and the structure of the screens and navigation as implemented in the React Native project.

## Overview

My Money Mate is a financial management app designed to help users:

- Manage profiles of individuals.
- Track transactions by date or by individual.
- Set target amounts for individuals.
- Update user profiles and reset passwords.
- Visualize and organize financial data effectively.

The app is built with React Native, Expo, and a REST API backend, and uses components like `react-navigation` for navigation.

---

## Screens and Navigation

The app uses a stack navigator to handle transitions between the screens. Below is a detailed breakdown of each screen and its purpose.

### 1. **Welcome Screen**

- **Purpose**: Provides a starting point for the user with a swipe-up gesture to navigate into the app.
- **Features**:
  - Swipe-up action to navigate.
  - Animated "Swipe Up" icon.
  **File:** `Welcome.js`

### 2. **Verify Key Screen**

- **Purpose**: Allows users to log in using a username and password.
- **Features**:
  - Displays username fetched from the backend.
  - Toggles password visibility.
  - Verifies login credentials and sets session expiration.
  **File:** `Verifykey.js`

### 3. **Home Screen**

- **Purpose**: Serves as the main dashboard for users to view their profiles, check total amounts, and navigate to other views or add members.
- **Features**:
  - Displays profile picture, username, and total collection amount.
  - Allows profile editing.
  - Provides options to view data by date or individual.
  **File:** `HomeScreen.js`

### 4. **Add Selection Screen**

- **Purpose**: Provides users with options to add a new member or add a transaction for an existing member.
- **Features**:
  - Two main options: "Create a Member" and "Add Transaction".
  **File:** `Addselection.js`

### 5. **Add New Member Screen**

- **Purpose**: Allows users to create a new member profile by entering their name and target amount.
- **Features**:
  - Inputs for name and target amount.
  - Submits data to the backend to create a new member.
  **File:** `AddNewmember.js`

### 6. **Add Existing Member Screen**

- **Purpose**: Enables adding transactions for existing members.
- **Features**:
  - Search functionality to filter members by name.
  - Date picker for transaction date.
  - Input for transaction amount.
  **File:** `AddExistingmember.js`

### 7. **View by Date Screen**

- **Purpose**: Displays all transactions grouped by date.
- **Features**:
  - Lists transactions with name, date, and amount.
  - Delete functionality for transactions.
  **File:** `Viewbydate.js`

### 8. **View by Individual Screen**

- **Purpose**: Displays all transactions for individual members, along with their balance and paid amount.
- **Features**:
  - Expandable cards to show detailed transactions.
  - Delete functionality for members.
  **File:** `ViewbyName.js`

### 9. **Edit Profile Screen**

- **Purpose**: Allows users to update their profile name and reset their password.
- **Features**:
  - Input fields for new username and password.
  - Validates matching passwords.
  - Submits updated data to the backend.
  **File:** `EditProfile.js`

---

## Navigation Structure

The navigation between the screens is handled by `@react-navigation/native` and `@react-navigation/stack`.

### Stack Navigator

The `Stack.Navigator` includes the following routes:

- `Welcome`
- `Verifykey`
- `Home`
- `Addselection`
- `AddNewmember`
- `AddExistingmember`
- `Viewbydate`
- `ViewbyName`
- `EditProfile`

The initial route is `Welcome`. All screens have headers hidden by default.

## Key Components

- **CustomText**: A reusable component for rendering text with consistent styles.
- **DateTimePicker**: Used in `AddExistingmember` for selecting transaction dates.
- **AsyncStorage**: Handles local storage of session and username data.
- **Fetch API**: Communicates with the backend for data retrieval and updates.

---

## Backend Integration

The app interacts with a REST API hosted at `https://my-money-mate-server.vercel.app`. Key endpoints include:

- `/get-all-names`: Fetches a list of all member names.
- `/add-transaction`: Adds a new transaction for a member.
- `/create-member`: Creates a new member profile.
- `/all-transactions-date`: Retrieves transactions grouped by date.
- `/get-all-transactions`: Retrieves transactions grouped by individual.
- `/edit-profile`: Updates user profile details.
- `/verify-user`: Verifies login credentials.

---

## Installation and Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   expo start
   ```
4. Ensure the backend server is running at the specified endpoint.

---

## Future Improvements

- Add authentication flow for enhanced security.
- Implement charts for better visualization of financial data.
- Include push notifications for transaction reminders.
- Optimize performance for larger datasets.

---

## Package Configuration

The following are the important modules used in the app:

```json
{
  "name": "MyMoneyMate",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo-google-fonts/ravi-prakash": "^0.2.3",
    "@react-native-async-storage/async-storage": "^2.1.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "axios": "^1.7.7",
    "expo": "~52.0.19",
    "react": "18.3.1",
    "react-native": "^0.76.5"
  }
}
```

---
## 🎥 Demo

![Slideshow](./assets/Copy%20of%20Untitled%20Design.gif)

---


## Conclusion

My Money Mate provides an intuitive interface for managing financial data. The modular design of the app makes it easy to scale and add new features in the future. Contributions and suggestions are welcome!

