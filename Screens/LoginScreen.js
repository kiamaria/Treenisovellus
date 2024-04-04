import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/themed";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, getAuth
} from "firebase/auth";


const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const subscribtion = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        props.navigation.navigate("Home");
      } 
    })
    return () => (subscribtion())
  }, []);

  // Sign Up
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //Sign in
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail();
        setPassword();
        props.navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign in"
          titleStyle={styles.bottonText}
          buttonStyle={styles.button}
          onPress={handleSignIn}
        />
        <Button
          title="Register"
          titleStyle={styles.buttonOutlineText}
          buttonStyle={styles.buttonOutline}
          onPress={handleSignUp}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 90,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginTop: 5,
  },
  buttonOutline: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: "white",
    borderColor: "lightblue",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  bottonText: {
    color: "white",
  },
  buttonOutlineText: {
    color: "lightblue",
  },
  forgot_button: {
    height: 30,
    marginTop: 10,
  },
});
