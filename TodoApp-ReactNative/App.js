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

  const handleSaveTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        index === currentTaskIndex ? updatedTask : task
      )
    );
    saveTasksToStorage(tasks);
    setModalVisible(false);
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

  const DeleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
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
        DeleteTask,
      }}
    >
      <View style={styles.container}>
        <View style={styles.currentDateAndTimeContainer}>
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
              <ViewTask
                task={tasks[currentTaskIndex]}
                onClose={closeModal}
                onDelete={DeleteTask}
                onSave={handleSaveTask}
              />
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

    marginBottom: 20,
    flex: 1 / 3,

    shadowColor: "#445055",
    shadowOffset: {
      width: 2,
      height: 14,
    },
    shadowOpacity: 0.61,
    shadowRadius: 32,

    elevation: 10,

    backgroundColor: theme.colors.primary,
  },

  imageBackground: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  cardHeader: {
    fontSize: 42,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#fff",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  todoListContainer: {
    flex: 1,
    padding: 10,
  },

  todoList: {
    flex: 1,
  },
  footer: {
    flex: 1 / 32,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  AddButton: {
    backgroundColor: theme.colors.primary,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -50,
    right: 30,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
  },

  icon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // Semi-transparent black for dim effect
  },
});
