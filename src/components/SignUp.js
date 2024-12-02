import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the createUserWithEmailAndPassword method
import { auth } from './firebase-config'; // Import the Firebase auth instance from your config

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create a new user with email and password using Firebase authentication
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully");
      // Optionally, redirect the user or show a success message
    } catch (err) {
      setError('Sign Up failed. Please try again.');
      console.error("Sign Up error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
