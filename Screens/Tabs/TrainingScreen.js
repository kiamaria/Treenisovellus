import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { signOut, getAuth } from "firebase/auth";
import { database } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ListItem, Icon } from "@rneui/themed";

//Luotujen treenien katselu -sivu & uloskirjautuminen

const Stack = createNativeStackNavigator();

//Stack navigaatio
export const TrainingScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="trainingScreenList"
        component={TrainingScreenList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Showinformation" component={ShowInformation} />
    </Stack.Navigator>
  );
};

// Treenien listaus
const TrainingScreenList = (props) => {
  const [trainings, setTrainings] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    getTrainings();
  }, []);

  const user = auth.currentUser;

  const getTrainings = async () => {
    const q = query(
      collection(database, "trainings"),
      where("user", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    let training = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      training.push(doc.data());
    });
    setTrainings(training);
  };

  //Kirjaudu ulos
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // Näytetään luodut omat treenit
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bluebox}>
        <Text style={styles.text}>Your trainings:</Text>

        {trainings.length === 0 ? (
          <Text style={styles.text}>No trainings created yet!</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={trainings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem
                bottomDivider
                onPress={() =>
                  props.navigation.navigate("Showinformation", { item })
                }
              >
                <ListItem.Content>
                  <ListItem.Title>{item.trainingName}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )}
          />
        )}
      </View>
      <View style={styles.together}>
        <Button title="Log Out" onPress={() => handleSignOut()} color={"white"}/>
        <Icon name="sync" onPress={() => getTrainings()} style={styles.sync} color={"white"}/>
      </View>
    </SafeAreaView>
  );
};

// Yksittäisen treenin tiedot
const ShowInformation = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bluebox}>
        <Text style={styles.text}>{props.route.params.item.trainingName}</Text>
        <FlatList
          data={props.route.params.item.exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "space-between" },
  bluebox: {
    backgroundColor: "#7CB9E8",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  text: {
    padding: 8,
    color: "white",
    fontSize: 20,
    color: "white",
  },
  together: {
    flexDirection: "row",
    borderRadius: 9,
    width: "90%",
    padding: 7,
    justifyContent: "space-between",
    backgroundColor: "#7CB9E8",
  },
  sync: {
    paddingTop: 8,
  },
});
