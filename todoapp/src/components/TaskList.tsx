// Define Task type
type Task = {
  name: string;
  details: string;
  completed: boolean;
};

// Define TaskListProps for explicit typing
type TaskListProps = {
  tasks: Task[];
};

import TaskItem from "./TaskItem";

const TaskList = ({ tasks }: TaskListProps) => (
  <div>
    {tasks.map((task) => (
      <div>
        <TaskItem
          name={task.name}
          details={task.details}
          completed={task.completed}
        />
      </div>
    ))}
  </div>
);

export default TaskList;
