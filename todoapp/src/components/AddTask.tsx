import { useState } from "react";

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

const AddTaskComponent = ({ addTask }: { addTask: (task: Task) => void }) => {
  const [task, setTask] = useState<Task>({
    name: "",
    details: "",
    completed: false,
  });

  const WilladdTask = () => {
    addTask(task);
    setTask({ name: "", details: "", completed: false });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Name"
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Task Details"
        onChange={(e) => setTask({ ...task, details: e.target.value })}
      />

      <button onClick={WilladdTask}>Add Task</button>
    </div>
  );
};

export default AddTaskComponent;
