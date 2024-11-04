import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TaskContext } from "../Context/TaskContext";

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

const AddTaskContainer = styled.div`
  position: absolute;
  width: 30%;
  border: 1px solid white;
  height: 30%;
  top: 40%;
  left: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #979797;

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

const EditTask = ({ task }) => {
  const [currentTask, setCurrentTask] = useState<Task>({
    name: "",
    details: "",
    completed: false,
  });

  const handleSaveTask = () => {
    completeEdit(currentTask);
    hideEditTask();
  };

  const textContext = useContext(TaskContext);

  const { hideEditTask, completeEdit } = textContext;

  useEffect(() => {
    setCurrentTask(task);
  }, []);

  return (
    <AddTaskContainer>
      <h1>What do you want to Edit</h1>
      <div className="taskNameContainer">
        <label htmlFor="taskName"> Enter Task Name</label>
        <input
          name="taskName"
          type="text"
          placeholder="Task Name"
          value={currentTask.name}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, name: e.target.value })
          }
        />
      </div>

      <div className="taskDetailContainer">
        <label htmlFor="taskDetails"> Enter Task Details</label>
        <input
          name="taskDetails"
          type="text"
          placeholder="Task Details"
          value={currentTask.details}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, details: e.target.value })
          }
        />
      </div>

      <div className="buttonContainer">
        <button onClick={hideEditTask}>Cancel</button>
        <button className="Addtask" onClick={handleSaveTask}>
          Save Changes
        </button>
      </div>
    </AddTaskContainer>
  );
};

export default EditTask;
