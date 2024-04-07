import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { SaveTrainingScreen } from "./Tabs/SaveTrainingScreen";
import { TrainingScreen } from "./Tabs/TrainingScreen";
import { ScoreScreen } from "./Tabs/ScoreScreen";
import { CalendarScreen } from "./Tabs/CalendarScreen";

const HomeScreen = (props) => {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator initialRouteName="Training">
        <Tab.Screen name="Training" component={TrainingScreen} />
        <Tab.Screen name="SaveTraining" component={SaveTrainingScreen} />
        <Tab.Screen name="Score" component={ScoreScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});