import { createContext } from "react";

type Task = { name: string; details: string; completed: boolean };

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (index: number) => void;
  completeEdit: (task: Task) => void;
  hideAddTask: () => void;
  hideEditTask: () => void;
  setIsEditing: (editing: boolean) => void;
  getCurrentTaskIndex: (index: number) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
