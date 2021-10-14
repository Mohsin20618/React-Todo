import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBOAgqTmRtyPY1Qx1Qlvl2ZexOV_V0WqQg",
    authDomain: "todoapp-d2a12.firebaseapp.com",
    projectId: "todoapp-d2a12",
    storageBucket: "todoapp-d2a12.appspot.com",
    messagingSenderId: "866741895930",
    appId: "1:866741895930:web:02dd39ea976bff53edff43",
    measurementId: "G-1GL84TE3PR"
  });
  const db = getFirestore()
 
  export {db} ;