import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import { SaveTrainingScreen } from "./Tabs/SaveTrainingScreen";
import { TrainingScreen } from "./Tabs/TrainingScreen";
import { CalendarScreen } from "./Tabs/CalendarScreen";

const HomeScreen = (props) => {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator initialRouteName="Training">
        <Tab.Screen
          name="Training"
          component={TrainingScreen}
          options={{
            headerShown: false,
            tabBarLabel: "See trainings",
            nameShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="eye" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SaveTraining"
          component={SaveTrainingScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Create new",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Schedule",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});