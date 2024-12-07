import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import DJSessionPage from './components/DJSession/DJSessionPage'; // Import your DJ Session page
import './styles/styles.css';
import { Amplify } from 'aws-amplify'; // Corrected import
import awsconfig from './aws-exports'; // Ensure the path is correct

// Configure Amplify with the aws-exports.js
Amplify.configure(awsconfig);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9FyRwbhEiuX1gjTiv9RLN-PiPauhebrw",
  authDomain: "casty-b1f93.firebaseapp.com",
  projectId: "casty-b1f93",
  storageBucket: "casty-b1f93.appspot.com",
  messagingSenderId: "729127708184",
  appId: "1:729127708184:web:04904569ff4b10aa1c456d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Google login functionality
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User logged in with Google:", result.user);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setError(error.message);
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      setError(error.message);
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user.email);
        setUser(user);
      } else {
        console.log("No user is logged in");
        setUser(null);
      }
    });

    return unsubscribe; // Cleanup on component unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Welcome to Casty</h1>
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <nav>
              <ul>
                <li><Link to="/dj-session">DJ Session</Link></li>
                <li><Link to="/">Home</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/dj-session" element={<DJSessionPage />} />
              <Route path="/" element={<div><h2>Welcome Home</h2></div>} />
            </Routes>
          </div>
        ) : (
          <div id="login-form" style={{ display: 'block' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleGoogleLogin}>Login with Google</button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
