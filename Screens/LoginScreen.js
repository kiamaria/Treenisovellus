import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Button } from "@rneui/themed";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Kirjautumis -sivu
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

  // Rekisteröidy
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage)
      });
  };

  //Kirjaudu sisään
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
        console.log(errorMessage)
        Alert.alert(errorMessage)
      });
  };

  const passwordSentToEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Sent to email.")
        Alert.alert("Sent to email.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode && errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Image
          style={{ width: 300, height: "110%" }}
          source={require("../treenisovellus_dumbell.png")}
        />
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
          <TouchableOpacity>
            <Text
              style={styles.forgot_button}
              onPress={() => passwordSentToEmail()}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#7CB9E8",
    borderRadius: 10,
    borderColor: "#7CB9E8",
    borderWidth: 3,
    marginTop: 5,
    paddingHorizontal: 60,
  },
  buttonOutline: {
    width: "100%",
    backgroundColor: "white",
    borderColor: "#7CB9E8",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 60,
  },
  bottonText: {
    color: "white",
  },
  buttonOutlineText: {
    color: "#7CB9E8",
  },
  forgot_button: {
    height: 30,
    marginTop: 10,
  },
});
