// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx16C_ct9raRE_W8KEYP5ea-SQU_LrYf4",
  authDomain: "prepwise-966c6.firebaseapp.com",
  projectId: "prepwise-966c6",
  storageBucket: "prepwise-966c6.firebasestorage.app",
  messagingSenderId: "325381667123",
  appId: "1:325381667123:web:61077be638d6b69743a646",
  measurementId: "G-V9DVJTNLZP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
