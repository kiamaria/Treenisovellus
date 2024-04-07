import React from "react";
import { StyleSheet, Text, SafeAreaView, Button, View } from "react-native";
import { signOut, getAuth } from "firebase/auth";


export const TrainingScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <Text>Treenejä</Text>
      <Button title="Log Out" onPress={() => handleSignOut()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

