import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper"; // For Frequency (Optional, if you want checkbox for "Everyday")

export default function AddTask({ onAddTask, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isEveryday, setIsEveryday] = useState(false);

  // Handle Add Task Button
  const handleAddTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      frequency: isEveryday ? "Everyday" : "Once", // You can customize this
    };
    onAddTask(newTask); // Pass new task to parent
  };

  const handleCancel = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
        multiline
      />

      {/* Frequency: Checkbox for "Everyday" */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isEveryday ? "checked" : "unchecked"}
          onPress={() => setIsEveryday(!isEveryday)}
        />
        <Text style={styles.checkboxText}>Repeat Every Day</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
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

    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%", // Space out the elements
    elevation: 10, // Shadow for Android
    borderWidth: 1, // Border for iOS
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

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space out the buttons
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
