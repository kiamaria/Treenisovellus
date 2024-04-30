import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "..",
  authDomain: "treenisovellus.firebaseapp.com",
  databaseURL: "https://treenisovellus-default-rtdb.firebaseio.com",
  projectId: "treenisovellus",
  storageBucket: "treenisovellus.appspot.com",
  messagingSenderId: "12491419678",
  appId: "1:124914196786:web:b82511e96c97971e9a372",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, database };
