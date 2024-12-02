import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles (keep it if needed)
import App from './App';  // Main app component
import { initializeApp } from 'firebase/app';  // Firebase initialization
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';  // Assuming styles.css is in the src/styles folder

// Firebase configuration (or import from firebase-config.js if in a separate file)
const firebaseConfig = {
  apiKey: "AIzaSyD9FyRwbhEiuX1gjTiv9RLN-PiPauhebrw",
  authDomain: "casty-b1f93.firebaseapp.com",
  projectId: "casty-b1f93",
  storageBucket: "casty-b1f93.appspot.com",
  messagingSenderId: "729127708184",
  appId: "1:729127708184:web:04904569ff4b10aa1c456d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
