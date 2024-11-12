import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TaskContext, Task, Status } from "../Context/TaskContext";
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
    if (task.status === "Completed") {
      setIsCompleted(true);
    }
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
            checked={isCompleted || task.status === "Completed"} // Determine if completed or status is 'Complete'
            onChange={() => setIsCompleted(!isCompleted)} // Toggle completion state on change
            aria-label="Task Completion Checkbox"
          />
        </div>

        <div className="TaskDetailsAndName">
          <div className="nameAndDetails">
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

const Item = styled.div<{ completed: string; status: string }>`
  display: grid;
  grid-template-columns: 2fr 0.4fr;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({ completed }) =>
    completed === "true" ? "#f5f5f5" : "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .TaskNameAndDetailContainer {
    display: grid;
    grid-template-columns: auto 5fr 0.3fr;
    grid-auto-flow: column;
    gap: 20px;
    align-items: center;

    .InputCheckBox {
      display: flex;
      justify-content: center;
      align-items: center;

      input[type="checkbox"] {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        margin: auto;
        appearance: none;
        background-color: #fff;
        border: 2px solid #ccc;
        position: relative;
        transition: background-color 0.2s, border-color 0.2s;
      }

      input[type="checkbox"]:checked {
        background-color: #2764f3;
        border-color: #ffffff;
      }

      input[type="checkbox"]:checked::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
      }

      @media ${media.mobile} {
        input[type="checkbox"] {
          height: 18px;
          width: 18px;
          border-width: 1.5px;
        }

        input[type="checkbox"]:checked::before {
          width: 8px;
          height: 8px;
        }
      }
    }

    .TaskDetailsAndName {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      .nameAndDetails {
        display: flex;
        flex-direction: column;

        h1 {
          font-size: 18px;
          margin: 0;
          text-decoration: ${({ completed }) =>
            completed === "true" ? "line-through" : "none"};

          color: ${({ completed }) => (completed === "true" ? "#888" : "#333")};
        }

        p {
          font-size: 14px;
          color: ${({ completed }) => (completed === "true" ? "#888" : "#555")};
        }

        @media ${media.tablet} {
          h1 {
            font-size: 16px;
          }

          p {
            font-size: 12px;
          }
        }

        @media ${media.mobile} {
          h1 {
            font-size: 14px;
            overflow-wrap: break-word;
          }

          p {
            font-size: 12px;
          }
        }
      }

      .statusAndPriority {
        display: flex;
        flex-direction: column;
        gap: 10px;

        h5 {
          display: flex;
          align-items: center;
          gap: 5px;
          color: ${({ status }) =>
            status === "Completed"
              ? "#006400"
              : status === "To Do"
              ? "#8d8d8c"
              : status === "InProgress"
              ? "#0000FF"
              : status === "DueSoon"
              ? "#FFA500"
              : status === "Overdue"
              ? "#FF0000"
              : status === "Priority"
              ? "#800080"
              : "#000000"};

          Circle {
            fill: ${({ status }) =>
              status === "Completed"
                ? "#006400"
                : status === "To Do"
                ? "#8d8d8c"
                : status === "InProgress"
                ? "#0000FF"
                : status === "Due Soon"
                ? "#FFA500"
                : status === "Overdue"
                ? "#FF0000"
                : status === "Priority"
                ? "#800080"
                : "#000000"};
          }
        }

        p {
          font-size: 14px;
          font-weight: 700;
          color: ${({ status }) =>
            status === "Completed"
              ? "#006400"
              : status === "To Do"
              ? "#8d8d8c"
              : status === "InProgress"
              ? "#0000FF"
              : status === "DueSoon"
              ? "#FFA500"
              : status === "Overdue"
              ? "#FF0000"
              : status === "Priority"
              ? "#800080"
              : "#000000"};

          Circle {
            fill: ${({ status }) =>
              status === "Completed"
                ? "#006400"
                : status === "To Do"
                ? "#8d8d8c"
                : status === "InProgress"
                ? "#0000FF"
                : status === "Due Soon"
                ? "#FFA500"
                : status === "Overdue"
                ? "#FF0000"
                : status === "Priority"
                ? "#800080"
                : "#000000"};
          }
        }

        @media ${media.tablet} {
          h5 {
            font-size: 12px;
          }

          p {
            font-size: 10px;
          }
        }

        @media ${media.mobile} {
          h5 {
            font-size: 12px;
          }

          p {
            display: none;
            font-size: 10px;
          }
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
      cursor: pointer;
      padding: 8px;
      border-radius: 5px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f0f0f0;
      }

      &:active {
        background-color: #e0e0e0;
      }

      @media ${media.mobile} {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;
