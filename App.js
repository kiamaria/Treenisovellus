import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from "firebase/app";
import { auth } from "./firebaseConfig";

// Screen imports
import LoginScreen from "./Screens/LoginScreen.js";
import HomeScreen from './Screens/HomeScreen';

// Creating stack navigation
const Stack = createNativeStackNavigator();

auth

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="Screen">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

