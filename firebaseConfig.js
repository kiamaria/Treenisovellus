import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "xccv",
  authDomain: "--firebaseapp.com",
  projectId: "treenisovellus",
  storageBucket: "treenisovellus.appspot.com",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
