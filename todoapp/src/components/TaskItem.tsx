import { useState, useContext } from "react";
import styled from "styled-components";
import { TaskContext, Status, Priority } from "../Context/TaskContext";
import { Pencil, X } from "lucide-react";

type Task = {
  name: string;
  details: string;
  completed: boolean;
  status: Status;
  dueDate: Date;
  priority: Priority;
};

type TaskItemProps = {
  task: Task;
  onDeleteTask?: () => void;
  completeEdit?: () => void;
  getIndex: () => void;
};

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

const Item = styled.div<{ completed: boolean }>`
  display: flex;
  width: 100%;
  height: 80px;
  border: 1px solid black;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #525353;
    color: white;
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
    width: 70%;

    align-items: flex-start;
    gap: 10px;

    input {
      height: 20px;
      width: 20px;
      margin-top: 2px;
    }

    .TaskDetailsAndName {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 5px h1 {
        text-decoration: ${({ completed }) =>
          completed ? "line-through" : "none"};
      }
      p {
        opacity: 70%;
        font-size: 14px;
      }
    }
  }

  .buttonContainer {
    display: flex;
    gap: 40px;
    width: 30%;
    justify-content: flex-end;

    button {
      background: none;
      outline: none;
      border: none;
    }
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
    <Item completed={isCompleted}>
      <div className="TaskNameAndDetailContainer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted((prev) => !prev)}
        />

        <div className="TaskDetailsAndName">
          <h1>{task.name}</h1>
          <p className="details">{task.details}</p>
        </div>

        <div className="statusAndPriority">
          <p>{task.status}</p>
          <p>{task.priority}</p>
        </div>
      </div>

      <div className="buttonContainer">
        <button type="button" onClick={edit}>
          <Pencil color="#007eea" strokeWidth={3} size={24} />
        </button>
        <button type="button" onClick={onDeleteTask}>
          <X className="DeleteButton" color="red" strokeWidth={3} size={24} />
        </button>
      </div>
    </Item>
  );
};

export default TaskItem;
