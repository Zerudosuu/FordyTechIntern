import { useState, useContext } from "react";
import { TaskContext, Status, Priority } from "../Context/TaskContext";
import styled from "styled-components";

type Task = {
  name: string;
  details: string;
  completed: boolean;
  status: Status;
  dueDate: Date;
  priority: Priority;
};

//BreakPoints
const sizes = {
  desktop: "1024px",
  tablet: "768px",
  mobile: "480px",
};

const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.mobile})`,
};

const AddTaskContainer = styled.div`
  position: absolute;
  width: 30%;
  height: 60%;
  top: 20%;
  left: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

  label {
    font-size: 12px;
    color: #555;
    margin-bottom: 4px;
  }

  h1 {
    text-align: center;
    font-size: 20px;
    color: #333;
  }

  @media ${media.tablet} {
    width: 100%;
    height: auto;
    top: 50%;
    left: 0%;
    padding: 20px;
  }

  @media ${media.mobile} {
    padding-top: 20%;
    width: 100%;
    height: auto;
    left: 0;
    bottom: 0;
    padding: 15px;
    border-radius: 0;
  }

  .taskInputContainer {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;

    input,
    select {
      padding: 8px;
      border-radius: 8px;
      border: 1px solid #bbb;
      outline: none;
      transition: border 0.2s;

      &:focus {
        border-color: #007eea;
      }
    }

    select {
      cursor: pointer;
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      border-radius: 8px;
      padding: 10px 20px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #ddd;
      }
    }

    .Addtask {
      background-color: #007eea;
      color: white;

      &:hover {
        background-color: #005bb5;
      }
    }
  }
`;

const AddTaskComponent = () => {
  const [task, setTask] = useState<Task>({
    name: "",
    details: "",
    completed: false,
    status: "To Do", // Adjusted default status to match Status type
    dueDate: new Date(),
    priority: "Low",
  });
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error("AddTaskComponent must be used within a TaskProvider");
  }

  const { addTask, hideAddTask } = taskContext;

  const handleTask = () => {
    addTask(task);
    setTask({
      name: "No name Task",
      details: "",
      completed: false,
      status: "To Do",
      dueDate: new Date(),
      priority: "Low",
    });
    hideAddTask();
  };
  return (
    <AddTaskContainer>
      <h1>Add Task</h1>

      <div className="taskInputContainer">
        <label htmlFor="taskName">Enter Task Name</label>
        <input
          name="taskName"
          type="text"
          placeholder="Task Name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>

      <div className="taskInputContainer">
        <label htmlFor="taskDetails">Enter Task Details</label>
        <input
          name="taskDetails"
          type="text"
          placeholder="Task Details"
          value={task.details}
          onChange={(e) => setTask({ ...task, details: e.target.value })}
        />
      </div>

      <div className="taskInputContainer">
        <label htmlFor="taskStatus">Status</label>
        <select
          name="taskStatus"
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as Status })
          }
        >
          <option value="To Do">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Complete</option>
          <option value="Due Soon">Due Soon</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="taskInputContainer">
        <label htmlFor="taskDueDate">Due Date</label>
        <input
          name="taskDueDate"
          type="date"
          value={task.dueDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setTask({ ...task, dueDate: new Date(e.target.value) })
          }
        />
      </div>

      <div className="taskInputContainer">
        <label htmlFor="taskPriority">Priority</label>
        <select
          name="taskPriority"
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value as Priority })
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="buttonContainer">
        <button onClick={hideAddTask}>Cancel</button>
        <button className="Addtask" onClick={handleTask}>
          Add to Task
        </button>
      </div>
    </AddTaskContainer>
  );
};

export default AddTaskComponent;
