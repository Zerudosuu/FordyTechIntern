import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TaskContext, Task } from "../Context/TaskContext";
import { Circle, Pencil, X } from "lucide-react";

type TaskItemProps = {
  task: Task;
  onDeleteTask?: () => void;
  completeEdit?: () => void;
  getIndex: () => void;
  buttonID: number;
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

const Item = styled.div<{ completed: string; status: string }>`
  display: grid;
  grid-template-columns: 2fr 0.4fr;
  border: 1px solid black;
  border-radius: 10px;

  .TaskNameAndDetailContainer {
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.5fr;
    grid-auto-flow: column;
    height: 80px;
    gap: 20px;

    .InputCheckBox {
      display: flex;
      justify-content: center;
      align-items: center;
      input[type="checkbox"] {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        appearance: none; /* Remove default checkbox styling */
        background-color: #fff;
        border: 2px solid #ccc; /* Border for checkbox */
        position: relative;
        transition: background-color 0.2s, border-color 0.2s;
      }

      input[type="checkbox"]:checked {
        background-color: #2764f3; /* Color when checked */
        border-color: #ffffff;
      }

      input[type="checkbox"]:checked::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Center the checkmark */
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ffffff; /* White inner circle when checked */
      }

      @media ${media.mobile} {
        input[type="checkbox"] {
          height: 18px; /* Slightly smaller on mobile */
          width: 18px;
          border-width: 1.5px; /* Adjust border thickness */
        }

        input[type="checkbox"]:checked::before {
          width: 8px; /* Adjust inner circle size */
          height: 8px;
        }
      }
    }

    .TaskDetailsAndName {
      align-self: center;
      white-space: nowrap; /* Prevents text from wrapping to the next line */
      overflow: hidden; /* Hides overflowing text */
      text-overflow: ellipsis;
      gap: 10px;

      h1 {
        font-size: 20px;
        margin: 0;
      }

      @media ${media.tablet} {
        h1 {
          font-size: 18px;
        }

        p {
          font-size: 14px;
        }
      }

      @media ${media.mobile} {
        h1 {
          font-size: 14px;
        }

        p {
          font-size: 10px;
        }
      }
    }

    .statusAndPriority {
      align-items: start;
      display: flex;
      flex-direction: column;
      height: auto;
      justify-content: center;
      gap: 10px;

      h5 {
        display: flex;
        align-items: center;
        gap: 5px;
        text-decoration: ${({ completed }) =>
          completed === "true" ? "line-through" : "none"};

        color: ${({ status }) =>
          status === "Completed"
            ? "#006400" // Dark Green
            : status === "To Do"
            ? "#8d8d8c" // Green
            : status === "InProgress"
            ? "#0000FF" // Blue
            : status === "DueSoon"
            ? "#FFA500" // Orange
            : status === "Overdue"
            ? "#FF0000" // Red
            : status === "Priority"
            ? "#800080" // Purple
            : "#000000"};

        Circle {
          fill: ${({ status }) =>
            status === "Completed"
              ? "#006400" // Dark Green
              : status === "To Do"
              ? "#8d8d8c" // Green
              : status === "InProgress"
              ? "#0000FF" // Blue
              : status === "DueSoon"
              ? "#FFA500" // Orange
              : status === "Overdue"
              ? "#FF0000" // Red
              : status === "Priority"
              ? "#800080" // Purple
              : "#000000"};
        }
      }

      @media ${media.mobile} {
        h5 {
          font-size: 12px;
        }

        p {
          font-size: 10px;
        }
      }
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;

    button {
      border: none;
      background: none;

      @media ${media.mobile} {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const TaskItem = ({
  task,
  onDeleteTask,
  getIndex,
  buttonID,
}: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const taskContext = useContext(TaskContext);
  const hideEditTask = taskContext?.hideEditTask;

  useEffect(() => {
    task.taskID = buttonID;
  }, []);

  const edit = () => {
    if (hideEditTask) {
      hideEditTask();
    }
    getIndex();
  };

  // const toggleCompleteStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  // };
  return (
    <Item completed={isCompleted.toString()} status={task.status || "Unknown"}>
      <div className="TaskNameAndDetailContainer">
        <div className="InputCheckBox">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(true)}
            aria-label="Task Completion Checkbox"
          />
        </div>

        <div className="TaskDetailsAndName">
          <h1>{task.name}</h1>
          <p className="details">{task.details}</p>
        </div>

        <div className="statusAndPriority">
          <h5>
            {" "}
            <Circle size={14} />
            {task.status}
          </h5>
          <p>Priority: {task.priority}</p>
        </div>
      </div>

      <div className="buttonContainer">
        <button
          data-testid={`edit-button-${task.taskID}`}
          type="button"
          name="edit"
          onClick={edit}
          aria-label="Edit"
        >
          <Pencil color="#007eea" strokeWidth={3} size={24} />
        </button>
        <button
          type="button"
          name="delete"
          onClick={onDeleteTask}
          aria-label="Delete"
        >
          <X className="DeleteButton" color="red" strokeWidth={3} size={24} />
        </button>
      </div>
    </Item>
  );
};

export default TaskItem;
