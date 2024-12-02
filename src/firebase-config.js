// src/firebase-config.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9FyRwbhEiuX1gjTiv9RLN-PiPauhebrw",
  authDomain: "casty-b1f93.firebaseapp.com",
  projectId: "casty-b1f93",
  storageBucket: "casty-b1f93.appspot.com",
  messagingSenderId: "729127708184",
  appId: "1:729127708184:web:04904569ff4b10aa1c456d"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized
}

export default firebase;