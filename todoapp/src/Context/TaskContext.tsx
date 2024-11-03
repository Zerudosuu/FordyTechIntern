import { createContext } from "react";

type Task = { name: string; details: string; completed: boolean };

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (index: number) => void;
  editTask: (index: number, task: Task) => void;
  hideAddTask: () => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
