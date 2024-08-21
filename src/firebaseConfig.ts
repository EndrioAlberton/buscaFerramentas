import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEMUjMAaKQEE7GGViLgrP53IzsgL-HQgI",
    authDomain: "buscarferramentasensino.firebaseapp.com",
    projectId: "buscarferramentasensino",
    storageBucket: "buscarferramentasensino.appspot.com",
    messagingSenderId: "302635372121",
    appId: "1:302635372121:web:18b6f1ed60b2266586ab48",
    measurementId: "G-3PJL8BPSKT"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
