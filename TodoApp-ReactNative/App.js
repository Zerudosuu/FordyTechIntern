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
import React, { useState, createContext } from "react";
import theme from "./src/Style/theme";
import TaskItem from "./src/components/TaskItem";
import { TaskContext } from "./src/Context/TaskContext";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentSelectedTask, setCurrentSelectedTask] = useState({});

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        setCurrentSelectedTask,
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
          <View style={styles.todoList}>
            <TaskItem setModalVisible={setModalVisible} />
            <TaskItem />
            <TaskItem />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.AddButton}
          >
            <Image source={require("./assets/plus.png")} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide" // 'slide', 'fade', or 'none'
          transparent={false} // true if you want a transparent background
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Callback for when the user taps outside the modal or the back button on Android
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Hello, I am a modal!</Text>
              <Button
                title="Close Modal"
                onPress={() => setModalVisible(false)}
              />
            </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalContent: {
    flex: 1,
    width: "100%",

    backgroundColor: "white",
    borderRadius: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
