import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  FlatList,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { ListItem, Card, CheckBox } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SelectList } from "react-native-dropdown-select-list";
import { Icon } from "react-native-elements";
import { database } from "../../firebaseConfig";
import { onValue, ref, push } from "firebase/database";

const Stack = createNativeStackNavigator();

// Stack navigaatio yksittäisten liikkeiden tietojen katseluun
export const SaveTrainingScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Savetraining"
        component={SaveTraining}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Showtraining"
        component={ShowTraining}
        options={({ route }) => ({
          title: route.params.item.WorkOut,
        })}
      />
    </Stack.Navigator>
  );
};

//Yksittäisen liikkeen tietojen katselu -sivu
const ShowTraining = (props) => {
  return (
    <Card>
      <Card.Title>{props.route.params.item.WorkOut}</Card.Title>
      <Card.Divider />
      <Text style={styles.title}>Explaination:</Text>
      <Text style={{ marginBottom: 10 }}>
        {props.route.params.item.Explaination}
      </Text>
      <Card.Divider />
      <Text style={styles.title}>Equipment: </Text>
      <Text style={{ marginBottom: 10 }}>
        {props.route.params.item.Equipment}
      </Text>
    </Card>
  );
};


const SaveTraining = (props) => {
  const [muscle, setMuscle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [trainingName, setTrainingName] = useState("");

  const muscleGroups = [
    "Biceps",
    "Triceps",
    "Chest",
    "Back",
    "Legs",
    "Abs",
    "Stretching",
    "Warm Up",
    "Lats",
    "Hamstring",
    "Calves",
    "Quadriceps",
    "Trapezius",
    "Shoulders",
    "Glutes",
  ];

  //Haetaan liikkeet
  const url = `https://work-out-api1.p.rapidapi.com/search?Muscles=${muscle}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "eb235635ebmshd5433c46c45df32p12ee16jsn0cfdc26ca55e",
      "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
    },
  };

  const getExercises = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (Array.isArray(result)) {
        setExercises(result);
      } else {
        console.log("Invalid data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Databseen tallentaminen
  const saveToDatabase = () => {
    push(ref(database, "trainings/"), { trainingName, checkedExercises });
    Alert.alert("Training saved!")
    setCheckedExercises([]);
    setTrainingName("");
  };

  //Liikkeiden valinta checkboxilla
  const checked = (exerciseName) => {
    if (checkedExercises.includes(exerciseName)) {
      setCheckedExercises(
        checkedExercises.filter((name) => name !== exerciseName)
      );
    } else {
      setCheckedExercises([...checkedExercises, exerciseName]);
    }
  };

  //poista liike luomistilassa olevasta treenistä
  const deleteItem = (exerciseName) => {
    setCheckedExercises(
      checkedExercises.filter((name) => name !== exerciseName)
    );
  };

  //Treenin yleiskatselu laatikko
  const trainingList = () => {
    return (
      <View style={styles.overview}>
        <TextInput
          style={styles.input}
          value={trainingName}
          placeholder="Enter training name:"
          placeholderTextColor="white"
          onChangeText={(text) => setTrainingName(text)}
        />

        {checkedExercises.length === 0 ? (
          <Text style={styles.text}>No moves selected yet!</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={checkedExercises}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
                <Icon name="delete" onPress={() => deleteItem(item)} />
              </ListItem>
            )}
          />
        )}

        <Button title="Save" onPress={saveToDatabase} />
      </View>
    );
  };

  //Liikkeiden suodatus ja näyttäminen
  return (
    <SafeAreaView style={styles.container}>
      {trainingList()}
      <View style={styles.search}>
        <SelectList
          setSelected={(muscle) => setMuscle(muscle)}
          data={muscleGroups}
          save="muscle"
        />

        <Button title="Search" onPress={getExercises} />

        <FlatList
          style={styles.list}
          data={exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem
              bottomDivider
              onPress={() =>
                props.navigation.navigate("Showtraining", { item })
              }
            >
              <CheckBox
                checked={checkedExercises.includes(item.WorkOut)}
                onPress={() => checked(item.WorkOut)}
              />
              <ListItem.Content>
                <ListItem.Title>{item.WorkOut}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
        />

        <View style={styles.box}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  input: {
    padding: 8,
    color: "white",
    fontSize: 20,
    color: "white",
    paddingBottom: 5,
  },
  search: {
    width: "90%",
    paddingTop: 20,
  },
  overview: {
    backgroundColor: "#7CB9E8",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  text: {
    color: 'white',
    padding: 8,

  }
});
