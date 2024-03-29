import {initializeApp} from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyATE1Iy4teC7qBsIgw7zn1oguQpbuN_PLY",
    authDomain: "clothing-db-b0b55.firebaseapp.com",
    databaseURL: "https://clothing-db-b0b55.firebaseio.com",
    projectId: "clothing-db-b0b55",
    storageBucket: "clothing-db-b0b55.appspot.com",
    messagingSenderId: "330772976774",
    appId: "1:330772976774:web:a31e7362e954a23c09ed07",
    measurementId: "G-C8WJQ88WMN"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    promt: "select_account"
  })

  export const auth = getAuth();
  export const SignInWithGooglePopup = () => signInWithPopup(auth, provider)
  export const SignInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
  export const db = getFirestore();
  
  export const createUserDocFromAuth = async (userAuth, additionalInfo) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInfo
            })
        } catch(error){
            console.log(error.message)
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)
      return
    
      return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)
      return
    return await signInWithEmailAndPassword(auth, email, password);
  }

  
  export const signOutUser = () => signOut(auth);
