type TaskItemProps = {
  name: string;
  details: string;
  completed: boolean;
};

const TaskItem = ({ name, details, completed }: TaskItemProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{details}</p>
      <p>Status: {completed ? "Completed" : "Incomplete"}</p>
    </div>
  );
};

export default TaskItem;
