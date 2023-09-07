// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth , createUserWithEmailAndPassword} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAKwkqc9hwv_cWS4AvtuclatgqtiLpOnXU",
    authDomain: "buy-it-f0426.firebaseapp.com",
    projectId: "buy-it-f0426",
    storageBucket: "buy-it-f0426.appspot.com",
    messagingSenderId: "505954442491",
    appId: "1:505954442491:web:ea37fc4c7c9505d616245e",
    measurementId: "G-JH0T91CE8D"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db , auth};