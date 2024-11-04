import { useState, useEffect } from "react";
import { TaskContext } from "../Context/TaskContext";
import { saveTasks, loadTasks } from "../utils/Load-Save";
import TaskList from "./TaskList";
import AddTaskComponent from "./AddTask";
import styled from "styled-components";
import EditTask from "./EditTask";
import { Calendar, Clipboard, Notebook } from "lucide-react";
import DateBackground from "../../public/Image/DateBackground.jpg";

const Container = styled.div`
  background-color: white;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;

  .Sidebar {
    width: 20%;
    height: 100%;
    color: #2b2b2b;

    border-top-right-radius: 10px;
    -webkit-box-shadow: 10px 0px 26px 0px rgba(0, 0, 0, 0.45);
    -moz-box-shadow: 10px 0px 26px 0px rgba(0, 0, 0, 0.45);
    box-shadow: 10px 0px 26px 0px rgba(0, 0, 0, 0.45);
  }

  .Profile {
    width: 100%;
    height: 10%;
    border-bottom: 0.5px black solid;
    display: flex;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
    font-weight: 200;

    svg {
      width: 25px;
      height: 25px;
    }

    .ProfileName {
      display: flex;
      align-items: center;
      gap: 10px;

      h1 {
        font-size: 18px;
        font-weight: 100;
      }
    }
  }

  .TabSection {
    padding-top: 30px;
    display: flex;
    width: 100%;
    height: 90%;

    flex-direction: column;

    h3 {
      font-size: 16px;
      font-weight: 100;
    }

    .tab {
      display: flex;
      width: 100%;
      height: 50px;
      gap: 10px;
      align-items: center;
      padding: 20px;

      &:hover {
        background-color: #ececec;
      }
    }
  }

  .Taskbody {
    width: 80%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .DateNoteContainer {
      display: flex;
      flex-direction: row;
      gap: 50px;
      color: white;
      border-bottom: 2px solid gray;
      width: 100%;
      height: 300px;

      h1 {
        font-size: 24px;
        font-weight: 400;
      }

      h3 {
        font-size: 32px;
        font-weight: 600;
      }

      .DateAndTime {
        width: 40%;
        height: 80%;
        display: flex;
        align-items: start;
        gap: 10px;
        background-image: url(${DateBackground});
        background-size: cover;
        border-radius: 50px;
        background-color: rgba(0, 0, 0, 0.5);

        flex-direction: column;
        justify-content: end;
        padding: 35px;

        -webkit-box-shadow: 16px 12px 26px 2px rgba(0, 0, 0, 0.45);
        -moz-box-shadow: 16px 12px 26px 2px rgba(0, 0, 0, 0.45);
        box-shadow: 16px 12px 26px 2px rgba(0, 0, 0, 0.45);
      }

      .RecentNotes {
        border-left: 3px solid gray;
        width: 80%;
        height: 80%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-left: 50px;
        color: #2b2b2b;

        h1 {
          font-size: 24px;
          font-weight: 600;
        }

        .NotesContainer {
          display: flex;
          gap: 10px;

          border-radius: 10px;
          height: 100%;
          width: 100%;

          .Note {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 10px;

            h3 {
              font-size: 24px;
              font-weight: 600;
            }

            p {
              font-size: 16px;
              font-weight: 100;
              opacity: 50%;
            }
          }
        }
      }
    }

    .TodoContainer {
      display: flex;
      gap: 20px;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      flex-direction: column;
      /* overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #f5f5f5 #f5f5f5; */

      .todoTitle {
        display: flex;
        gap: 10px;
        width: 100%;
        padding: 10px;

        border-radius: 10px;
        align-items: center;
      }
    }
  }
`;

const Input = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;

  button {
    padding: 10px 10px;
    background: #007eea;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
    width: 120px;
    border-radius: 10px;

    &:hover {
      background-color: #525353;
    }
  }
`;

const TaskStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 20px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [showEditTask, setShowEditTask] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const tasks = loadTasks();
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    saveTasks([...tasks, task]);
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    saveTasks(tasks.filter((_, i) => i !== index));
  };

  const completeEdit = (task: Task) => {
    const newTasks = [...tasks];
    if (currentTaskIndex !== null) {
      newTasks[currentTaskIndex] = task;
    }
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const getCurrentTaskIndex = (index: number) => {
    setCurrentTaskIndex(index);
  };
  const hideAddTask = () => {
    setShowAddTask((prev) => !prev);
  };
  const hideEditTask = () => {
    setShowEditTask((prev) => !prev);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        completeEdit,
        hideAddTask,
        setIsEditing,
        getCurrentTaskIndex,
        hideEditTask,
      }}
    >
      <Container>
        <aside className="Sidebar">
          <div className="Profile">
            <div className="ProfileName">
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
                className="lucide lucide-circle-user-round"
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <h1>Ronald Salvador</h1>
            </div>

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
              class="lucide lucide-arrow-left-from-line"
            >
              <path d="m9 6-6 6 6 6" />
              <path d="M3 12h14" />
              <path d="M21 19V5" />
            </svg>
          </div>
          <div className="TabSection">
            <div className="tab">
              <Clipboard strokeWidth={2} size={20} />
              <h3>Task</h3>
            </div>
            <div className="tab">
              <Notebook strokeWidth={2} size={20} />
              <h3>Notes</h3>
            </div>
            <div className="tab">
              <Calendar strokeWidth={2} size={20} />
              <h3>Calendar</h3>
            </div>
          </div>
        </aside>

        <div className="Taskbody">
          <div className="DateNoteContainer">
            <div className="DateAndTime">
              <h1>Today</h1>
              <h3>September 1, 2021</h3>
            </div>

            <div className="RecentNotes">
              <h1>Recent Notes</h1>
              <div className="NotesContainer">
                <div className="Note">
                  <h3>React Typescript Note</h3>
                  <p>React Design Patterns</p>
                </div>
                <div className="Note">
                  <h3>Meeting with the team</h3>
                  <p>Discuss the project</p>
                </div>
                <div className="Note">
                  <h3>Notes for design principle</h3>
                  <p>Notes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="TodoContainer">
            <div className="todoTitle">
              <h1>To-do</h1>
              <Input>
                <button onClick={() => setShowAddTask(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>

                  <span>Add Task</span>
                </button>
              </Input>
            </div>

            <div className="todoList">
              <TaskList />
            </div>
          </div>

          {/* <Input>
            <button onClick={() => setShowAddTask(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>

              <span>Add Task</span>
            </button>
          </Input>

          <TaskStyle>
            <TaskList />
          </TaskStyle> */}

          {showAddTask && <AddTaskComponent />}
          {showEditTask && currentTaskIndex !== null && (
            <EditTask task={tasks[currentTaskIndex]} />
          )}
        </div>
      </Container>
    </TaskContext.Provider>
  );
};

export default TodoList;
