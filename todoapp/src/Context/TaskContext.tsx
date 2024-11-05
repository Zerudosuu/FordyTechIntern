import { createContext } from "react";

export type Status =
  | "Open"
  | "InProgress"
  | "Complete"
  | "DueSoon"
  | "Overdue"
  | "Priority";
export type Priority = "High" | "Medium" | "Low";
export type Task = {
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
