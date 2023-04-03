// Import the functions you need from the SDKs you need
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC9Q5AMsQpY67iDZE64ctlWMfGQh1xs4w",
  authDomain: "manage-your-employees.firebaseapp.com",
  projectId: "manage-your-employees",
  storageBucket: "manage-your-employees.appspot.com",
  messagingSenderId: "100599193309",
  appId: "1:100599193309:web:3fa9d8f012c240ee480534"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);         

export const db = getFirestore();


export const  createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>
{
  console.log(additionalInformation)
  if(!userAuth) return;
  const userDocRef = doc(db, 'employees', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists())
  {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation,});
    }
    catch(error)
    {
      console.log('error creating the user ', error.message)
    }
  
  }

 // console.log(userDocRef)
  return userDocRef;


};  


export const createAuthUserWithEmailAndPassword = async(email, password)=> {
    console.log(email, password)
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}
export const getUserDoc = async (user)=>
{
  if(!user) return null
  console.log(user.uid)
  const userDocRef = doc(db, 'employees', user.uid);
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()) return null
  console.log('exists')
  const userDoc = userSnapshot.data()
  sessionStorage.setItem("userData", userDoc.role)
  console.log("userSnapshot ", userDoc)
  return userDoc;

  //const usersCollection = firebase.firestore().collection("employees");

            // // Query the collection for the user document with the corresponding UID
            // usersCollection.doc(user.uid).get().then((doc) => {
            //   if (doc.exists) {
            //     // User document found
            //     const userData = doc.data(); 
            //     console.log(userData)// Get the user data from the document
            //     sessionStorage.setItem("userData", userData)
            //     // Use the user data as needed
            //   } else {
            //     // User document not found
            //   }
            // })
}
export const signOutUser = () => signOut(auth);