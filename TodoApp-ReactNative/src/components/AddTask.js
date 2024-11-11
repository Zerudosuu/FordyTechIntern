import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "../Style/theme";

export default function AddTask({ onAddTask, onClose }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    frequency: "",
    date: new Date(), // Stores the full date
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }); // Stores the formatted time

  const [error, setError] = useState("");

  const [isEveryday, setIsEveryday] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      if (mode === "date") {
        // Update the date in the task
        setTask({
          ...task,
          date: selectedDate,
        });
      } else if (mode === "time") {
        // Update the time in the task
        setTask({
          ...task,
          time: selectedDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
    }
    setShow(false);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const handleAddTask = () => {
    const newTask = {
      ...task,
      frequency: isEveryday ? "Everyday" : "Once",
    };

    if (!task.name || !task.description) {
      setError("Task name and description are required.");
      return;
    }
    setError("");
    onAddTask(newTask);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.heading}>Add Task</Text>
        <View style={styles.TextAndInputContainer}>
          <Text style={styles.addTaskTitle}>Task Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={task.name}
            onChangeText={(text) => setTask({ ...task, name: text })}
          />
        </View>

        <View style={styles.TextAndInputContainer}>
          <Text style={styles.addTaskTitle}>Task Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={task.description}
            onChangeText={(text) => setTask({ ...task, description: text })}
            multiline
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isEveryday ? "checked" : "unchecked"}
            onPress={() => {
              setIsEveryday(!isEveryday);
              setTask({
                ...task,
                frequency: !isEveryday ? "Everyday" : "Once",
              });
            }}
          />
          <Text style={styles.checkboxText}>Repeat Every Day</Text>
        </View>

        {!isEveryday && (
          <View style={styles.DateAndTimeContainer}>
            <TouchableOpacity
              style={styles.dateAndTime}
              onPress={() => showMode("date")}
            >
              <Text style={styles.dateAndTimeTextTitle}>Select Date: </Text>
              <Text style={styles.dateAndTimeText}>
                {task.date.toDateString()}
              </Text>
              <Icon name="calendar" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateAndTime}
              onPress={() => showMode("time")}
            >
              <Text style={styles.dateAndTimeTextTitle}>Select Time: </Text>
              <Text style={styles.dateAndTimeText}>{task.time}</Text>
              <Icon name="clock" size={25} color="black" />
            </TouchableOpacity>
          </View>
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={task.date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        {/* Add Task Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.buttonTextWhite}>Add Task</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.buttonTextPrimary}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    marginTop: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    elevation: 10,
    justifyContent: "space-between",
  },

  TextAndInputContainer: {
    gap: 10,
    marginBottom: 20,
  },
  addTaskTitle: {
    fontSize: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
  DateAndTimeContainer: {
    justifyContent: "space-around",
    marginBottom: 20,

    gap: 10,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 20,
  },

  addButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "48%", // Set to 48% for side-by-side layout with space
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "48%", // Set to 48% for side-by-side layout with space
  },

  buttonTextWhite: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonTextPrimary: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  dateAndTime: { flexDirection: "row", alignItems: "center", gap: 5 },
  dateAndTimeTextTitle: {
    fontSize: 16,
  },
  dateAndTimeText: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
