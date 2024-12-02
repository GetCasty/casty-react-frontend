// src/components/Auth.js
import React, { useState, useEffect } from 'react';
import firebase from '../firebase-config'; // Import firebase-config

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in with email");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("User signed up with email");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      console.log("User logged in with Google:", user);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
          {/* Add other user-specific UI, like DJ session controls */}
        </div>
      ) : (
        <div>
          <h2>Login / Sign Up</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleGoogleLogin}>Login with Google</button>

          <h3>Sign Up with Email</h3>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          <h3>Login with Email</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
