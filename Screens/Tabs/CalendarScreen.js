import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";


export const CalendarScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Kalenteri</Text>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
