// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8JiqggWNrzZvJTx1SONgMcakmZkBcpxU",
    authDomain: "nextjs-course-coderhouse.firebaseapp.com",
    projectId: "nextjs-course-coderhouse",
    storageBucket: "nextjs-course-coderhouse.appspot.com",
    messagingSenderId: "825157835597",
    appId: "1:825157835597:web:d752eaeb645f31b0573504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
