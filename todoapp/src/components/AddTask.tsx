import { useState, useContext } from "react";
import { TaskContext } from "../Context/TaskContext";
import styled from "styled-components";

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

const AddTaskContainer = styled.div`
  position: absolute;
  width: 80%;
  border: 1px solid white;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  background-color: white;
  border-radius: 20px;

  label {
    font-size: 12px;
  }

  .buttonContainer {
    display: flex;
    justify-content: end;
    gap: 10px;

    button {
      border-radius: 10px;
      padding: 10px 20px;
      background: none;
      transition: all 0.3s;

      &:hover {
        background-color: #b2b3b4;
        color: white;
      }
    }

    .Addtask {
      background-color: #445055;
      color: white;
      border: none;

      &:hover {
        background-color: #2e363a;
      }
    }
  }
  .taskNameContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      padding: 10px 10px;
      border-radius: 10px;
      margin: 0;
    }
  }
  .taskDetailContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      height: auto;
      padding: 10px;
      min-width: 50px;
      box-sizing: border-box;
      border-radius: 10px;
      margin: 0;
    }
  }
`;

const AddTaskComponent = () => {
  const [task, setTask] = useState<Task>({
    name: "",
    details: "",
    completed: false,
  });

  const handleTask = () => {
    addTask(task);
    setTask({ name: "", details: "", completed: false });
    hideAddTask();
  };

  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error("TaskList must be used within a TaskProvider");
  }
  const { addTask, hideAddTask } = taskContext;

  return (
    <AddTaskContainer>
      <h1>Add Task</h1>
      <div className="taskNameContainer">
        <label htmlFor="taskName"> Enter Task Name</label>
        <input
          name="taskName"
          type="text"
          placeholder="Task Name"
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>

      <div className="taskDetailContainer">
        <label htmlFor="taskDetails"> Enter Task Details</label>
        <input
          name="taskDetails"
          type="text"
          placeholder="Task Details"
          onChange={(e) => setTask({ ...task, details: e.target.value })}
        />
      </div>

      <div className="buttonContainer">
        <button onClick={hideAddTask}>Cancel</button>
        <button className="Addtask" onClick={handleTask}>
          Add Task
        </button>
      </div>
    </AddTaskContainer>
  );
};

export default AddTaskComponent;
