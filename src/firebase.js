import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtbdBHXwHLRCJvchG6PS2373CmBO27n6c",
  authDomain: "react-redux-todo-57a4c.firebaseapp.com",
  projectId: "react-redux-todo-57a4c",
  storageBucket: "react-redux-todo-57a4c.appspot.com",
  messagingSenderId: "704712537837",
  appId: "1:704712537837:web:3da4197751e77647aefee4",
  measurementId: "G-2Q9RES0XSL"
};
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);

export default firebase;
