import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AddTaskComponent from "./AddTask";
import { saveTasks, loadTasks } from "../utils/Load-Save";

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
    setTasks([...tasks, task]);
    saveTasks([...tasks, task]);
  };

  return (
    <div>
      TodoList
      <button onClick={() => setShowAddTask(!showAddTask)}>
        {showAddTask ? "Hide" : "Show"} Add Task
      </button>
      {showAddTask && <AddTaskComponent addTask={addTask} />}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TodoList;
