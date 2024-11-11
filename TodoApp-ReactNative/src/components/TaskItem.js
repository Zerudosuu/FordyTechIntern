import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { React, useState, useContex, useEffect } from "react";
import { Checkbox } from "react-native-paper";
import { TaskContext } from "../Context/TaskContext";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../Style/theme";

const TaskItem = ({
  openViewTaskModal,
  getCurrentTaskIndex,
  task,
  onDelete,
}) => {
  const [itemTask, setItemTask] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isRighActionOpen, setIsRighActionOpen] = useState(false);

  useEffect(() => {
    setItemTask(task);
  }, [itemTask]);

  const handleTaskClick = () => {
    getCurrentTaskIndex(); // Call the function passed from TaskList
    openViewTaskModal();
  };

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Icon name="delete" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleTaskClick}>
        <Icon name="fullscreen" size={25} color="white" fill="outlined" />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView
      style={styles.container}
      onSwipeableOpen={() => setIsRightActionVisible(true)}
      onSwipeableClose={() => setIsRightActionVisible(false)}
    >
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.taskContainer}>
          <Text style={styles.Time}>{task.time ? task.time : "No time"}</Text>
          <Text style={[styles.taskName, isChecked && styles.completeText]}>
            {task.name}
          </Text>
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => setIsChecked(!isChecked)}
            style={styles.roundedCheckbox}
            color={theme.colors.primary}
          />
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    color: "#000",
    marginBottom: 10,

    borderRadius: 10,
    backgroundColor: "transparent",
  },
  taskContainer: {
    padding: 20, // Adjust padding for less space
    borderWidth: 2,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%", // Slightly exceed the parent width to overlap
    height: "100%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  rightAction: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    gap: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  Time: {
    fontSize: 18,
    color: "#000",

    opacity: 0.5,
  },

  taskName: {
    fontSize: 18,
    color: "#000",
    width: "60%",
  },

  completeText: {
    textDecorationLine: "line-through",
    color: "#bbb",
  },
});

export default TaskItem;
