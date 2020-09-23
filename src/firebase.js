import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  // Pegar el CONST FirebaseConfig dado por Firebase here
  // -->
  apiKey: 'AIzaSyAiixgLeuIM0984JjhC7X1PKyAg5bhb4bk',
  authDomain: 'instagram-clone-project-80350.firebaseapp.com',
  databaseURL: 'https://instagram-clone-project-80350.firebaseio.com',
  projectId: 'instagram-clone-project-80350',
  storageBucket: 'instagram-clone-project-80350.appspot.com',
  messagingSenderId: '593452939677',
  appId: '1:593452939677:web:d06cea0bdd7d857409d774',
  measurementId: 'G-8CT6N76GZT',
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
