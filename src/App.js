import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Follow from './components/Follow'; // Import Follow component (if needed)

// Firebase config
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
  const [user, setUser] = useState(null); // Holds the logged-in user info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  // Email/Password signup functionality
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up with email:", userCredential.user);
    } catch (error) {
      console.error("Error signing up with email:", error);
      setError(error.message);
    }
  };

  // Email/Password login functionality
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in with email:", userCredential.user);
    } catch (error) {
      console.error("Error logging in with email:", error);
      setError(error.message);
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
      setError(error.message);
    }
  };

  // Check for authentication state
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

    return unsubscribe; // Clean up the listener when the component is unmounted
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Casty</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <div id="session-section" style={{ display: 'block' }}>
            <button>Start DJ Session</button> {/* Add session functionality */}
          </div>
          <Follow /> {/* The Follow component */}
        </div>
      ) : (
        <div id="login-form" style={{ display: 'block' }}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleGoogleLogin}>Login with Google</button>
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login with Email</button>
          </form>

          <h3>Sign Up</h3>
          <form onSubmit={handleEmailSignUp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
