// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDI557XcKO8nsmmjrjG5hDiZGbYwqHgbZg',
    authDomain: 'formen-shop-2fde7.firebaseapp.com',
    projectId: 'formen-shop-2fde7',
    storageBucket: 'formen-shop-2fde7.appspot.com',
    messagingSenderId: '399577269554',
    appId: '1:399577269554:web:8bcb821f1b77cd6f19432b',
    measurementId: 'G-KHM5BKEGVW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
export default app;
