import { initializeApp, getApps, getApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0LSAoXVNtx4CA7rGuR60IuRdbzFV_xME",
  authDomain: "the-bridges-7616f.firebaseapp.com",
  databaseURL: "https://the-bridges-7616f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "the-bridges-7616f",
  storageBucket: "the-bridges-7616f.firebasestorage.app",
  messagingSenderId: "189167724942",
  appId: "1:189167724942:android:b890b6e70c9fb13ef41cdf",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app, auth };