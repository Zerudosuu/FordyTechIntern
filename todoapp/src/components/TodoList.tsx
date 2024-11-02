import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AddTaskComponent from "./AddTask";
import { saveTasks, loadTasks } from "../utils/Load-Save";
import { Button } from "./ui/button";
import Header from "./Header";
import { Plus } from "lucide-react";

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
    <div className=" flex flex-col w-svw h-svh border-4 border-yellow-400">
      <Header />
      <main className="border-4 border-green h-[90%]">
        <div className="flex w-full h-full">
          <section className="w-[4%] h-full border-4 border-rose-400"></section>
          <section className="w-[50%] border-4 border-green-400">
            <div className="flex items-center justify-end h-[5%] mb-10">
              <Button
                onClick={() => setShowAddTask(!showAddTask)}
                className="flex items-center justify-center w-[50px] h-[50px] border-4 border-black"
              >
                <Plus size={24} />
              </Button>
              {showAddTask && <AddTaskComponent addTask={addTask} />}
            </div>
            <TaskList tasks={tasks} />
          </section>
          <section className="w-[96%] border-4 border-green-400"></section>
        </div>
      </main>
      TodoList
      {/* <Button onClick={() => setShowAddTask(!showAddTask)}>
        {" "}
        {showAddTask ? "Hide" : "Show"} Add Task{" "}
      </Button>
      {showAddTask && <AddTaskComponent addTask={addTask} />}
      <TaskList tasks={tasks} /> */}
    </div>
  );
};

export default TodoList;
