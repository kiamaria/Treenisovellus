import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { ListItem } from "@rneui/themed";
import { SelectList } from "react-native-dropdown-select-list";

export const SaveTrainingScreen = () => {
    const [muscle, setMuscle] = useState("");
    const [intensityLevel, setIntensityLevel] = useState("");
    const [exercises, setExercises] = useState([]);

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
    
     const level = ["Beginner", "Intermediate", "Expert"];
    
  const url = `https://work-out-api1.p.rapidapi.com/search?Muscles=${muscle}&Intensity_Level=${intensityLevel}`;
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
          console.log(exercises)
      } else {
        console.log("Invalid data");
      }
    } catch (error) {
      console.error(error);
    }
  };
    
    console.log(exercises)


  return (
    <SafeAreaView style={styles.container}>
      <SelectList
        style={styles.dropdown}
        setSelected={(intensityLevel) => setIntensityLevel(intensityLevel)}
        data={level}
        save="level"
      />
      <SelectList
        style={styles.dropdown}
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
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.WorkOut}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: {
    width: "100%",
    },
    dropdown: {
      padding: '30',
  }
});
