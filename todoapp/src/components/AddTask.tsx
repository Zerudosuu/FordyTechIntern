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
  border: 1px solid white;
  height: 50%;
  top: 30%;
  left: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 30px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #979797;

  label {
    font-size: 12px;
  }

  @media ${media.tablet} {
    flex-direction: column;
    width: 90%;
    height: 100%;
    top: 0;
    left: 10%;
    z-index: 200;
  }

  @media ${media.mobile} {
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    border-radius: 5px;
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
  .taskNameContainer,
  .taskDetailContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      padding: 10px 10px;
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
    status: "Open", // Adjusted default status to match Status type
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
      name: "",
      details: "",
      completed: false,
      status: "Open",
      dueDate: new Date(),
      priority: "Low",
    });
    hideAddTask();
  };
  return (
    <AddTaskContainer>
      <h1>Add Task</h1>
      <div className="taskNameContainer">
        <label htmlFor="taskName"> Enter Task Name</label>
        <input
          name="taskName"
          type="text"
          placeholder="Task Name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>

      <div className="taskDetailContainer">
        <label htmlFor="taskDetails"> Enter Task Details</label>
        <input
          name="taskDetails"
          type="text"
          placeholder="Task Details"
          value={task.details}
          onChange={(e) => setTask({ ...task, details: e.target.value })}
        />
      </div>

      <div className="taskStatusContainer">
        <label htmlFor="taskStatus">Status</label>
        <select
          name="taskStatus"
          value={task.status || "To Do"} // Default value if not set
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as Status })
          }
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="taskDueDateContainer">
        <label htmlFor="taskDueDate">Due Date</label>
        <input
          name="taskDueDate"
          type="date" // Use date input type
          value={task.dueDate?.toISOString().slice(0, 10) || ""} // Format date for input
          onChange={(e) =>
            setTask({ ...task, dueDate: new Date(e.target.value) })
          }
        />
      </div>

      <div className="taskPriorityContainer">
        <label htmlFor="taskPriority">Priority</label>
        <select
          name="taskPriority"
          value={task.priority || "Low"} // Default value if not set
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
