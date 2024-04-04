import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa2IpQz_68fHWR5N5_KQvu5Ehk8igfNwE",
  authDomain: "treenisovellus.firebaseapp.com",
  projectId: "treenisovellus",
  storageBucket: "treenisovellus.appspot.com",
  messagingSenderId: "124914196786",
  appId: "1:124914196786:web:b82511e96c97971e9a372b",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
