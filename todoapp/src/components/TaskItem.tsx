import { useState } from "react";
import styled from "styled-components";

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onDeleteTask?: () => void;
  onEdit?: () => void;
};

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 20px;
  gap: 20px;
  color: white;
  border-radius: 10px;

  &:hover {
    background-color: #525353;
  }

  button {
    margin-left: 0;
  }

  .TaskNameAndDetailContainer {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    max-width: 200px;
    margin-bottom: 10px;

    .details {
      margin-top: 5px;
      font-size: 12px;
      opacity: 80%;
    }

    input {
      height: 18px;
      width: 18px;
    }
  }

  .buttonContainer {
    display: flex;
    gap: 20px;

    button {
      background: none;
      fill: none;
      border: none;
      color: white;
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
`;

const TaskItem = ({ task, onDeleteTask, onEdit }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  return (
    <Item>
      <div className="TaskNameAndDetailContainer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted((prev) => !prev)}
        />

        <div>
          <TaskName completed={isCompleted}>{task.name}</TaskName>
          <p className="details">{task.details}</p>
        </div>
      </div>

      <div className="buttonContainer">
        <button type="button" onClick={onEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pencil"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
        <button type="button" onClick={onDeleteTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </Item>
  );
};

export default TaskItem;
