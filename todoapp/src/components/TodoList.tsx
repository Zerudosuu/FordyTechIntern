import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AddTaskComponent from "./AddTask";
import { saveTasks, loadTasks } from "../utils/Load-Save";
import styled from "styled-components";
import { TaskContext } from "../Context/TaskContext";

const Container = styled.div`
  background-color: white;
  width: 30%;
  margin: 0 auto;
  height: 80%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Input = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  width: 100%;
  gap: 10px;

  button {
    padding: 10px 10px;
    background: none;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;

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
  const [showAddTask, setShowAddTask] = useState<boolean>(false);

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

  const editTask = (index: number, task: Task) => {
    const newTasks = [...tasks];
    newTasks[index] = task;
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const hideAddTask = () => {
    setShowAddTask(false);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, hideAddTask }}
    >
      <Container>
        <Input>
          <button onClick={() => setShowAddTask((prev) => !prev)}>
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
              className="lucide lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </Input>

        <TaskStyle>
          <TaskList />
        </TaskStyle>

        {showAddTask && <AddTaskComponent />}
      </Container>
    </TaskContext.Provider>
  );
};

export default TodoList;
