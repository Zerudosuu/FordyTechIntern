import { createContext } from "react";

export type Status =
  | "To Do"
  | "InProgress"
  | "Completed"
  | "DueSoon"
  | "Overdue";

export type Priority = "High" | "Medium" | "Low" | "All";

export type Task = {
  taskID: number;
  name: string;
  details: string;
  completed: boolean;
  dueDate?: Date;
  status?: Status;
  priority?: Priority;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (index: number) => void;
  completeEdit: (task: Task) => void;
  hideAddTask: () => void;
  hideEditTask: () => void;
  currentPriority: Priority;
  getCurrentTaskIndex: (index: number) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
