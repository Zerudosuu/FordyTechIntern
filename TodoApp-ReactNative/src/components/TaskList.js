import { View, Text, StyleSheet } from "react-native";
import { React, useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../Context/TaskContext";
const TaskList = () => {
  const taskContext = useContext(TaskContext);

  const { getCurrentTaskIndex, tasks, openViewTaskModal, DeleteTask } =
    taskContext;

  return (
    <View style={styles.container}>
      {tasks.map((task, index) => {
        return (
          <TaskItem
            openViewTaskModal={openViewTaskModal}
            key={index}
            task={task}
            getCurrentTaskIndex={() => getCurrentTaskIndex(index)}
            onDelete={() => DeleteTask(index)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskList;
