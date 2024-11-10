import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import React, { useState, createContext, useEffect } from "react";
import theme from "./src/Style/theme";
import TaskItem from "./src/components/TaskItem";
import { TaskContext } from "./src/Context/TaskContext";
import AddTask from "./src/components/AddTask";
import ViewTask from "./src/components/ViewTask";
import TaskList from "./src/components/TaskList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveTasksToStorage,
  loadTasksFromStorage,
} from "./src/components/SaveLoad";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isAddTaskModal, setIsAddTaskModal] = useState(true);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    loadTasksFromStorage(setTasks);
  }, []);

  const saveData = () => {
    saveTasksToStorage(tasks);
  };

  const openAddTaskModal = () => {
    setIsAddTaskModal(true);
    setModalVisible(true);
  };

  const openViewTaskModal = () => {
    setIsAddTaskModal(false);
    setModalVisible(true);
  };

  const getCurrentTaskIndex = (index) => {
    setCurrentTaskIndex(index);
  };

  const DeleteTask = () => {
    setTasks(tasks.filter((task, index) => index !== currentTaskIndex));
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addTask = (newTask) => {
    const updatedTask = [...tasks, newTask];
    setTasks(updatedTask);
    saveTasksToStorage(updatedTask);
    setModalVisible(false);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        getCurrentTaskIndex,
        openViewTaskModal,
      }}
    >
      <View style={styles.container}>
        <View style={styles.currentDateAndTimeContainer}>
          <StatusBar barStyle="default" backgroundColor="transparent" />
          <ImageBackground
            source={require("./assets/cardBackground.jpg")}
            style={styles.imageBackground}
            imageStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }} // Applies border radius to the image
          >
            <Text style={styles.cardHeader}>Today's Task</Text>
            <Text style={styles.text}>{formattedDate}</Text>
          </ImageBackground>
        </View>

        <View style={styles.todoListContainer}>
          <TaskList />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={openAddTaskModal} style={styles.AddButton}>
            <Image source={require("./assets/plus.png")} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            {isAddTaskModal ? (
              <AddTask onAddTask={addTask} onClose={closeModal} />
            ) : (
              <ViewTask task={tasks[currentTaskIndex]} onClose={closeModal} />
            )}
          </View>
        </Modal>
      </View>
    </TaskContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  currentDateAndTimeContainer: {
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // Ensures the rounded corners apply properly
    marginBottom: 20,
    flex: 1 / 3,

    // Shadow properties for iOS
    shadowColor: "#445055",
    shadowOffset: {
      width: 2,
      height: 14,
    },
    shadowOpacity: 0.61,
    shadowRadius: 32,

    // Shadow properties for Android
    elevation: 10, // Adjust the elevation as needed for a pronounced shadow effect

    backgroundColor: theme.colors.primary,
  },

  imageBackground: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  cardHeader: {
    fontSize: theme.fontScales.xxl,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#fff", // Adjust for contrast with background
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // Adjust for contrast with background
  },

  todoListContainer: {
    flex: 1,
    padding: 20,

    //c Adjust for contrast with background
  },

  todoList: {
    flex: 1,
    // Adjust for contrast with background
  },
  footer: {
    flex: 1 / 32,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",

    // Adjust for contrast with background
  },
  AddButton: {
    backgroundColor: theme.colors.primary,
    width: 90, // Adjust as needed for button size
    height: 90, // Same as width for a perfect circle
    borderRadius: 50, // Half of width/height for a circle
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -50,
    borderWidth: 2,
    borderColor: theme.colors.secondary, // Optional: adjust color if needed
  },

  icon: {
    width: 40, // Adjust size as needed
    height: 40,
    tintColor: "#fff", // Optional: adjust color if the image allows
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start", // Start at the top
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
    marginTop: "39%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, // Adds 1/3 padding from the top
  },
});
