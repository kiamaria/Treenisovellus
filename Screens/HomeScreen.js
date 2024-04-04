import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { signOut, getAuth } from "firebase/auth";

const HomeScreen = (props) => {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Button onPress={() => handleSignOut()}>Log Out</Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
