import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBqinIvVaiW_2fo5E-ScOebg2qAWjTdmi0",
    authDomain: "whatsapp-clone-cfdf8.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-cfdf8.firebaseio.com",
    projectId: "whatsapp-clone-cfdf8",
    storageBucket: "whatsapp-clone-cfdf8.appspot.com",
    messagingSenderId: "1047843635732",
    appId: "1:1047843635732:web:4f4faca2f3f51db6919d01",
    measurementId: "G-C6RLZ3MSVV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;