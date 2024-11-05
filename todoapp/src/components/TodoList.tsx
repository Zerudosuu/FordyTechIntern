import { useState, useEffect, ChangeEvent } from "react";
import { TaskContext, Task, Priority } from "../Context/TaskContext";
import { saveTasks, loadTasks } from "../utils/Load-Save";
import TaskList from "./TaskList";
import AddTaskComponent from "./AddTask";
import styled from "styled-components";
import EditTask from "./EditTask";
import {
  Calendar,
  ChevronFirst,
  ChevronLast,
  CircleUser,
  Clipboard,
  Filter,
  Notebook,
  Plus,
} from "lucide-react";
import DateBackground from "../../public/Image/DateBackground.jpg";

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

const Container = styled.div`
  background-color: white;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;

  @media ${media.tablet} {
    flex-direction: column;
  }

  @media ${media.mobile} {
    flex-direction: column;
  }

  .Sidebar {
    width: 20%;
    height: 100%;
    color: #2b2b2b;
    position: absolute;
    left: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 10px 0px 26px rgba(0, 0, 0, 0.45);
    z-index: 300;
    transition: width 0.3s ease;
    background: rgb(0, 136, 240);
    background: -moz-linear-gradient(
      170deg,
      rgba(0, 136, 240, 1) 14%,
      rgba(0, 118, 255, 1) 31%,
      rgba(81, 82, 224, 1) 50%,
      rgba(39, 117, 219, 1) 71%,
      rgba(42, 0, 169, 1) 90%
    );
    background: -webkit-linear-gradient(
      170deg,
      rgba(0, 136, 240, 1) 14%,
      rgba(0, 118, 255, 1) 31%,
      rgba(81, 82, 224, 1) 50%,
      rgba(39, 117, 219, 1) 71%,
      rgba(42, 0, 169, 1) 90%
    );
    background: linear-gradient(
      170deg,
      rgba(0, 136, 240, 1) 14%,
      rgba(0, 118, 255, 1) 31%,
      rgba(81, 82, 224, 1) 50%,
      rgba(39, 117, 219, 1) 71%,
      rgba(42, 0, 169, 1) 90%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0088f0",endColorstr="#2a00a9",GradientType=1);
    &.SidebarClose {
      width: 80px; /* Reduced width for closed sidebar */
      align-items: center;

      .TabSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white; /* Hide text in closed state */

        .tab {
          display: flex;
          justify-content: center;
        }
      }
      .TabSection .tab h3 {
        display: none; /* Hide text in closed state */
      }

      .ProfileName h1 {
        display: none; /* Hide profile name */
      }
    }

    @media ${media.tablet} {
      background-color: #007eea;
      &.SidebarClose {
        width: 80px; /* Reduced width for closed sidebar */
        align-items: center;

        .TabSection {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px; /* Hide text in closed state */
        }
        .TabSection .tab h3 {
          display: none; /* Hide text in closed state */
        }

        .ProfileName h1 {
          display: none; /* Hide profile name */
        }
      }

      @media ${media.mobile} {
        &.SidebarClose {
          width: 100%; /* Ensure full width on mobile */
          display: flex; /* Override any display properties that hide it */
          position: fixed;
          height: 10%; /* Stick it to the bottom if you want a bottom bar */
          /* Stick it to the bottom if you want a bottom bar */

          .TabSection {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            /* Hide text in closed state */
          }
        }
      }
    }

    @media ${media.tablet} {
      background-color: #007eea;
    }

    @media ${media.mobile} {
      position: fixed;
      width: 100%;
      height: 10%;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px;
      box-shadow: none;
      color: white;
      bottom: 0;
      border-top-left-radius: 10px;
      background-color: #007eea;
      z-index: 100;
    }

    .Profile {
      border-top-right-radius: 10px;
      width: 100%;
      height: 10%;
      display: flex;
      align-items: center;
      padding: 20px;
      justify-content: space-between;
      font-weight: 200;
      color: white;

      button {
        background: none;
        border: none;
        cursor: pointer;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;

        &:hover {
          background-color: #7bb5f0;
          color: white;
        }
      }

      @media ${media.tablet} {
        display: flex;
      }

      @media ${media.mobile} {
        display: none;
      }

      .ProfileName {
        display: flex;
        align-items: center;
        gap: 10px;

        h1 {
          font-size: 20px;
          font-weight: 200;
        }
      }
    }

    .TabSection {
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .tab {
        display: flex;
        width: 100%;
        height: 50px;
        gap: 10px;
        align-items: center;
        padding: 20px;
        color: white;

        &:hover {
          background-color: #ececec;
          color: black;
        }
      }

      @media ${media.tablet} {
        padding-top: 30px;
        display: flex;
        width: 100%;
        height: 90%;
        flex-direction: column;
        color: white;

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

          @media ${media.mobile} {
            justify-content: center;
          }

          &:hover {
            background-color: #ececec;
            color: black;
          }
        }
      }

      @media ${media.mobile} {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        h3 {
          display: none;
        }
      }
    }
  }

  .Taskbody {
    border: 1px solid black;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 20px 20px 20px 10%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media ${media.tablet} {
      width: 100%;
      padding: 20px 15px 20px 15%;
    }

    @media ${media.mobile} {
      width: 100%;
      padding: 20px;
    }

    .DateNoteContainer {
      display: flex;
      flex-direction: row;
      gap: 20px;
      color: white;

      width: 100%;
      height: 30%;

      @media ${media.tablet} {
        flex-direction: column;
        height: auto;
      }

      @media ${media.mobile} {
        flex-direction: column;
        height: auto;
        border-bottom: none;
      }

      .DateAndTime {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: start;
        gap: 10px;
        background-image: url(${DateBackground});
        background-size: cover;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        flex-direction: column;
        justify-content: end;
        padding: 20px;

        @media ${media.tablet} {
          height: 200px;
          justify-content: center;
        }

        @media ${media.mobile} {
          height: 150px;
          justify-content: center;
        }
      }

      .RecentNotes {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        gap: 10px;
        padding-left: 50px;
        color: #2b2b2b;

        @media ${media.tablet} {
          display: none;
        }

        @media ${media.mobile} {
          display: none;
        }

        .NotesContainer {
          display: flex;
          gap: 10px;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          align-items: center;

          .Note {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
            border-radius: 10px;
            height: 100%;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }

    .TodoContainer {
      display: flex;

      width: 100%;
      height: 70%;

      flex-direction: column;

      @media ${media.mobile} {
        padding: 0;
      }

      @media ${media.tablet} {
        height: 75%;
      }
      .todoTitle {
        display: flex;
        gap: 10px;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        align-items: center;

        position: sticky;
        top: 0;
        z-index: 50;

        @media ${media.mobile} {
          button {
            width: 35px;
            height: 35px;
          }

          button span {
            display: none;
          }
        }
      }

      .todoList {
        overflow-y: auto;
        overflow-x: hidden;

        scrollbar-width: thin;
        scrollbar-color: #f5f5f5 #007eea;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Input = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;

  gap: 10px;

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

  div {
    border: 1px solid #525353;
    border-radius: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;

    select {
      height: 30px;
      border: none;
      background-color: none;
    }
    background-color: white;

    @media ${media.mobile} {
      div {
        padding: 0;
        background-color: #525353;
      }
    }
  }
`;

// type Task is now imported from TaskContext

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [showEditTask, setShowEditTask] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
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

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>): void {
    const filter = event.target.value;
    console.log(filter);
    setCurrentFilter(filter);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        completeEdit,
        hideAddTask,
        currentPriority: currentFilter as Priority,
        getCurrentTaskIndex,
        hideEditTask,
      }}
    >
      <Container>
        <aside className={`Sidebar ${isSideBarOpen ? "" : "SidebarClose"}`}>
          <div className="Profile">
            <div className="ProfileName">
              {isSideBarOpen && <h1>Ronald Salvador</h1>}
            </div>
            <button onClick={toggleSidebar}>
              {isSideBarOpen ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <div className="TabSection">
            <div className="tab TaskTab">
              <Clipboard strokeWidth={2} size={28} />
              <h3>Task</h3>
            </div>
            <div className="tab NoteTab">
              <Notebook strokeWidth={2} size={28} />
              <h3>Notes</h3>
            </div>
            <div className="tab CalendarTab">
              <Calendar strokeWidth={2} size={28} />
              <h3>Calendar</h3>
            </div>
          </div>
        </aside>

        <div className="Taskbody">
          <div className="DateNoteContainer">
            <div className="DateAndTime">
              <h1>Today</h1>
              <h3>{formattedDate}</h3>
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
                  <Plus />
                  <span>Add Task</span>
                </button>

                <div>
                  <label htmlFor="filter">
                    <Filter />
                  </label>
                  <select id="filter " onChange={handleFilterChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">low</option>
                    <option value="All">All</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
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
