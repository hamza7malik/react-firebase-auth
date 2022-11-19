// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration here
const firebaseConfig = {
  apiKey: 'AIzaSyAak4eewoVIJg-6Lv1vbW1O0ixKF-9LadE',
  authDomain: 'e-commerce-b82b8.firebaseapp.com',
  projectId: 'e-commerce-b82b8',
  storageBucket: 'e-commerce-b82b8.appspot.com',
  messagingSenderId: '1059060330166',
  appId: '1:1059060330166:web:7be9dc385e76817fb70017',
};
// Your web app's Firebase configuration here

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// ------------------------
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserFromAuth = async (authUser, additionalData = {}) => {
  const userDocRef = doc(db, 'user', authUser.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if snapshop does not exists: push user
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = authUser;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user..', error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
