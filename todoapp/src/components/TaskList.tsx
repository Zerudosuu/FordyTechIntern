import styled from "styled-components";
import { useContext } from "react";
import { TaskContext } from "../Context/TaskContext";
import TaskItem from "./TaskItem";

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const TaskList = () => {
  const taskContext = useContext(TaskContext);

  // Add a check in case `taskContext` is undefined
  if (!taskContext) {
    throw new Error("TaskList must be used within a TaskProvider");
  }

  const { tasks, deleteTask, getCurrentTaskIndex, currentPriority } =
    taskContext;

  const filteredTasks =
    currentPriority === "All"
      ? tasks
      : tasks.filter((task) => task.priority === currentPriority);
  return (
    <TaskListContainer>
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          buttonID={index}
          onDeleteTask={() => deleteTask(index)}
          getIndex={() => getCurrentTaskIndex(index)}
        />
      ))}
    </TaskListContainer>
  );
};

export default TaskList;
