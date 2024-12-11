import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DJSessionPage from './components/DJSession/DJSessionPage'; 
import { Amplify } from '@aws-amplify/core'; 
import awsconfig from './aws-exports'; 
import './styles/styles.css';

// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9FyRwbhEiuX1gjTiv9RLN-PiPauhebrw",
  authDomain: "casty-b1f93.firebaseapp.com",
  projectId: "casty-b1f93",
  storageBucket: "casty-b1f93.appspot.com",
  messagingSenderId: "729127708184",
  appId: "1:729127708184:web:04904569ff4b10aa1c456d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Configure Amplify
Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(''); 
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      setUser(result.user); 
      console.log("User logged in:", result.user.email);
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message); 
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null); 
      console.log("User logged out.");
    } catch (error) {
      console.error("Logout Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser ? `Logged in: ${currentUser.email}` : "No user logged in");
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Welcome to Casty</h1>
        </header>

        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dj-session">DJ Session</Link></li>
                <li><Link to="/listener-session">Listener Session</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dj-session" element={<DJSessionPage />} />
              <Route path="/listener-session" element={<ListenerPage />} />
            </Routes>
          </div>
        ) : (
          <div className="login-form">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleGoogleLogin}>Login with Google</button>
          </div>
        )}
      </div>
    </Router>
  );
}

const HomePage = () => (
  <div>
    <h2>Welcome Home</h2>
    <p>Select an option from the navigation bar.</p>
  </div>
);

const ListenerPage = () => (
  <div>
    <h2>Listener Session</h2>
    <p>Join a DJ session to listen live!</p>
  </div>
);

export default App;
