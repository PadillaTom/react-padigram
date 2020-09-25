import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  // Pegar el CONST FirebaseConfig dado por Firebase here
  // -->
  apiKey: 'AIzaSyD-rH0jKXmSVuPnr8mCZxJ1JnZZXXcLQ8w',
  authDomain: 'casadelc-react.firebaseapp.com',
  databaseURL: 'https://casadelc-react.firebaseio.com',
  projectId: 'casadelc-react',
  storageBucket: 'casadelc-react.appspot.com',
  messagingSenderId: '261948214939',
  appId: '1:261948214939:web:40e2a8ba8e9067b849803e',
  measurementId: 'G-C1XGSN8MG9',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

// :::::::::: Code to Copy ::::::::
// import firebase from 'firebase';

// const firebaseApp = firebase.initializeApp({
// // Pegar el CONST FirebaseConfig dado por Firebase here
// // -->
// });

// const db = firebasteApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();
// export { db, auth, storage };

// Luego--> NPM I FIREBASE
