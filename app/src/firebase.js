// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhdMvlbZEl-78MmYF5peD27QSZb1Im8DY",
    authDomain: "pantry-14eec.firebaseapp.com",
    projectId: "pantry-14eec",
    storageBucket: "pantry-14eec.appspot.com",
    messagingSenderId: "145119996764",
    appId: "1:145119996764:web:37d88c1999189f8c88af99",
    measurementId: "G-38Z67MCEJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// const analytics = getAnalytics(app);
export { firestore, firebaseConfig }
