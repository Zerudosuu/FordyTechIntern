import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { React, useState, useContext } from "react";
import { Checkbox } from "react-native-paper";
import { TaskContext } from "../Context/TaskContext";

const TaskItem = ({ openViewTaskModal, getCurrentTaskIndex }) => {
  const [task, setTask] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleTaskClick = () => {
    getCurrentTaskIndex(); // Call the function passed from TaskList
    openViewTaskModal();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleTaskClick}>
      <Checkbox
        status={isChecked ? "checked" : "unchecked"}
        onPress={() => setIsChecked(!isChecked)}
        style={styles.roundedCheckbox}
      />

      <View style={styles.taskContainer}>
        <Text>
          AHGASDASDASDASDAGASDASDASDsadasdasdddddddddddddddddddddddddddd
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fef6ff",
    width: "100%",
    height: 100,
    paddingHorizontal: 20,
    color: "#000",
    // Border radius for iOS
    borderRadius: 10,
    marginBottom: 10,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Shadow for Android
    elevation: 5,

    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  checkboxContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  taskContainer: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
  },

  roundedCheckbox: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskItem;
