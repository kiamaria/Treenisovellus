import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa2IpQz_68fHWR5N5_KQvu5Ehk8igfNwE",
  authDomain: "treenisovellus.firebaseapp.com",
  databaseURL: "https://treenisovellus-default-rtdb.firebaseio.com",
  projectId: "treenisovellus",
  storageBucket: "treenisovellus.appspot.com",
  messagingSenderId: "124914196786",
  appId: "1:124914196786:web:b82511e96c97971e9a372b",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, database };
