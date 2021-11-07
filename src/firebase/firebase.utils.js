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

//userAuth is the whole user obj from the auth.onAuthStateChanged
//input:user data,additionalData.
//output:userRef(firestore reference)
export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if(!userAuth){return;}//no user login,return nothing
    //check data in the follow path
    const userRef=firestore.doc(`users/${userAuth.uid}`);//!use uid!
    const snapShot=await userRef.get();
    //if no data exist then creat data using data from userAuth
    if(!snapShot.exists){
        //only put displayName and email from userAuth into uerRef
        //and generate current time put into userRef
        const {displayName,email}=userAuth;
        const createdAt=new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData //when the display Name is null, we can add in additionalData
            })
        }catch(error){
            console.log('error occurs during creating user',error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;
