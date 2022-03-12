import { intializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbcRBFZZ3tcLzJObSgTnjQfIrn3AwCxH8",
    authDomain: "eco-hero-15b21.firebaseapp.com",
    projectId: "eco-hero-15b21",
    storageBucket: "eco-hero-15b21.appspot.com",
    messagingSenderId: "185271524094",
    appId: "1:185271524094:web:c3586f182e4f89dfb2e3af",
    measurementId: "G-TKLMEYXXK8"
  };


const app = intializeApp(firebaseConfig);

const auth = getAuth(app);