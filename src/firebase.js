import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyRqeCuUdLabbwjlVLxVOzWgz8OI1z454",
  authDomain: "tomessenger-6030b.firebaseapp.com",
  databaseURL: "https://tomessenger-6030b.firebaseio.com",
  projectId: "tomessenger-6030b",
  storageBucket: "tomessenger-6030b.appspot.com",
  messagingSenderId: "492183646912",
  appId: "1:492183646912:web:ed90540e031aeadd24b325",
  measurementId: "G-WHE3LP8VZJ"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;