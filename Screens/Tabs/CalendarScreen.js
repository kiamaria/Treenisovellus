import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { database } from "../../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export const CalendarScreen = () => {
  const [date, setDate] = useState(new Date());
  const [trainings, setTrainings] = useState([]);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState();
  const [calendarTraining, setCalendarTraining] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  // Haetaan treenit firebasesta uuden tapahtuman tallennusta varten
  const getTrainings = async () => {
    const q = query(
      collection(database, "trainings"),
      where("user", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    let training = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      training.push(doc.data());
    });
    setTrainings(training);
  };

  // Haetaan tapahtumat kalenteriin firebasesta
  const getCalendarTrainings = async () => {
    const q = query(
      collection(database, "calendar"),
      where("user", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    let calendar = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Muunnetaan Firebase timestamp javascript date objektiksi
      const start = data.start.toDate();
      const end = data.end.toDate();
      // Sijoitetaan alkuperäisen timestampin tilalle javascript objekti
      data.start = start;
      data.end = end;
      //console.log(doc.id, " => ", data);
      calendar.push(data);
    });
    setCalendarTraining(calendar);
  };

  // Haetaan treenit ja kalenterin tapahtumat, että ne pysyy ajantasalla
  useEffect(() => {
    getTrainings();
    getCalendarTrainings();
  }, []);

  // Tallennetetaan treeniaika kalenteriin
  const saveToDatabase = async () => {
    const selectedDate = new Date(date);
    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      7,
      0,
      0
    );
    const endOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      22,
      0,
      0
    );
    const docRef = await addDoc(collection(database, "calendar"), {
      title: selectedTraining,
      start: startOfDay,
      end: endOfDay,
      user: user.uid,
    });
    console.log("Document written with ID: ", docRef.id);
    setShowAddTraining(false);
    getCalendarTrainings();
  };

  // Uuden tapahtuman lisäys näyttö
  const addToCalendar = () => {
    return (
      <SafeAreaView>
        <View style={styles.overview}>
          <Text style={styles.textHeading}>Add a training to schedule: </Text>
          <Text style={styles.text}>Training: </Text>
          <SelectList
            dropdownTextStyles={{ color: "white", fontSize: 15 }}
            inputStyles={{ color: "white" }}
            boxStyles={{
              color: "white"
            }}
            data={trainings.map((training) => training.trainingName)}
            setSelected={(selectedTraining) =>
              setSelectedTraining(selectedTraining)
            }
            save="selectedTraining"
          />
          <Text style={styles.text}>Date: </Text>
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, date) => setDate(date)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Button
              title="Add"
              onPress={() => saveToDatabase()}
              color={"white"}
            />
            <Button
              title="Cancel"
              onPress={() => setShowAddTraining(false)}
              color={"white"}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // Määrittää näytetäänkö treenin lisäys kalenteriin
  const handleAddTraining = () => {
    setShowAddTraining(true);
  };

  // Treenin lisäys kalenteriin
  return (
    <SafeAreaView style={styles.container}>
      {showAddTraining ? (
        addToCalendar()
      ) : (
        <View style={styles.calendar}>
          <View style={styles.bluebox}>
            <Button
              color={"white"}
              onPress={handleAddTraining}
              title="Add a training to calendar"
            />
          </View>
          <Calendar events={calendarTraining} height={600} mode={"month"} />
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-evenly", alignItems: "center",  },
  overview: {
    backgroundColor: "#7CB9E8",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  textHeading: {
    padding: 8,
    color: "white",
    fontSize: 20,
  },
  text: {
    padding: 8,
    color: "white",
    fontSize: 14,
  },
  picker: {
    paddingTop: 8,
  },
  calendar: {
    width: "90%",
    height: "100%",
  },
  bluebox: {
    backgroundColor: "#7CB9E8",
    borderRadius: 8,
    padding: 8,
  },
});
