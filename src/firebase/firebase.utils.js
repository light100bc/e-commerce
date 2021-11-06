import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; //use fire base by its library

const config={ //firebase config is from the firebase website
    apiKey: "AIzaSyC3yho9H_Ydsp-DsERkLADUYzmy-QoNiGQ",
    authDomain: "crwn-db-54ef6.firebaseapp.com",
    projectId: "crwn-db-54ef6",
    storageBucket: "crwn-db-54ef6.appspot.com",
    messagingSenderId: "795799992812",
    appId: "1:795799992812:web:dbf26e7d04f847016268c9",
    measurementId: "G-7S8Q7YNEX2"
};

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;
