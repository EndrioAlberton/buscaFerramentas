import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configurações adicionais do provedor Google
provider.setCustomParameters({
    prompt: 'select_account'
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export { auth, provider };
