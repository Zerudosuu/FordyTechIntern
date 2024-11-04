import { useState, useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../Context/TaskContext";
import { Pencil, X } from "lucide-react";

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onDeleteTask?: () => void;
  completeEdit?: () => void;
  getIndex: () => void;
};

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 20px;
  gap: 20px;
  color: #373838;
  border-radius: 10px;
  border: 1px solid #979797;
  margin-bottom: 10px;

  box-shadow: 2px 10px 30px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 2px 10px 30px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 2px 10px 30px 0px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #525353;
  }

  button {
    margin-left: 0;
  }

  h1 {
    font-size: 18px;
    font-weight: 500;
  }

  .TaskNameAndDetailContainer {
    display: flex;
    align-items: start;
    gap: 10px;
    width: 100%;

    .details {
      font-size: 12px;
      opacity: 80%;
    }

    input {
      height: 20px;
      width: 20px;
    }
  }

  .buttonContainer {
    display: flex;
    align-items: center;
    gap: 20px;

    button {
      background: none;
      fill: none;
      border: none;
      color: black;
      border-radius: 50%;
      padding: 8px 10px;

      &:hover {
        background-color: #303131;
      }
    }
  }
`;

const TaskName = styled.h3<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    width: 100%;
  }
`;

const TaskItem = ({ task, onDeleteTask, getIndex }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const { setIsEditing, hideEditTask } = useContext(TaskContext);

  const edit = () => {
    hideEditTask(true);
    getIndex();
  };

  return (
    <Item>
      <div className="TaskNameAndDetailContainer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted((prev) => !prev)}
        />

        <div>
          <TaskName completed={isCompleted}>
            <h1>{task.name}</h1>
            <p className="details">{task.details}</p>
          </TaskName>
        </div>
      </div>

      <div className="buttonContainer">
        <button type="button" onClick={edit}>
          <Pencil color="#007eea" strokeWidth={3} size={24} />
        </button>
        <button type="button" onClick={onDeleteTask}>
          <X color="red" strokeWidth={3} size={24} />
        </button>
      </div>
    </Item>
  );
};

export default TaskItem;
