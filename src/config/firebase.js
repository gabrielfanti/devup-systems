import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';


var firebaseConfig = {
  apiKey: "AIzaSyDAajDH_EPhQxhrAbdGZww7QmbgK7B2gGc",
  authDomain: "devupsystems.firebaseapp.com",
  databaseURL: "https://devupsystems-default-rtdb.firebaseio.com",
  projectId: "devupsystems",
  storageBucket: "devupsystems.appspot.com",
  messagingSenderId: "262544628632",
  appId: "1:262544628632:web:263cd5021a4aa2fb8169ed"
};

firebase.initializeApp(firebaseConfig);

export default firebase;