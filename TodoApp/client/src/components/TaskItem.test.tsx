import { render, fireEvent } from "@testing-library/react";
// Ensure this is compatible with your environment
import { vi } from "vitest"; // Import vi for mock functions
import TaskItem from "./TaskItem";
import { TaskContext } from "../Context/TaskContext";

// Mock task for testing
const mockTask = {
  taskID: 1,
  name: "Test Task",
  details: "Test Details",
  status: "To Do",
  priority: "High",
  completed: false,
};

// Mock context value
const mockContextValue = {
  hideEditTask: vi.fn(),
  onDeleteTask: vi.fn(), // Ensure all necessary context methods are mocked
};

describe("TaskItem Component", () => {
  it("renders task details correctly", () => {
    const { getByText } = render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskItem task={mockTask} getIndex={vi.fn()} buttonID={1} />
      </TaskContext.Provider>
    );

    // Assertions to check if task details are rendered
    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("Test Details")).toBeInTheDocument();
    expect(getByText("To Do")).toBeInTheDocument();
    expect(getByText("Priority: High")).toBeInTheDocument();
  });

  it("calls getIndex and hideEditTask when edit button is clicked", () => {
    const mockGetIndex = vi.fn();
    const { getByLabelText } = render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskItem task={mockTask} getIndex={mockGetIndex} buttonID={1} />
      </TaskContext.Provider>
    );

    // Simulate clicking the edit button
    fireEvent.click(getByLabelText("Edit"));

    // Check if the functions were called
    expect(mockGetIndex).toHaveBeenCalled();
    expect(mockContextValue.hideEditTask).toHaveBeenCalled();
  });

  it("calls onDeleteTask when delete button is clicked", () => {
    const { getByLabelText } = render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskItem
          task={mockTask}
          onDeleteTask={mockContextValue.onDeleteTask}
          getIndex={vi.fn()}
          buttonID={1}
        />
      </TaskContext.Provider>
    );

    // Simulate clicking the delete button
    fireEvent.click(getByLabelText("Delete"));

    // Check if the onDeleteTask function was called
    expect(mockContextValue.onDeleteTask).toHaveBeenCalled();
  });

  it("toggles task completion status when checkbox is clicked", () => {
    const { getByRole } = render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskItem task={mockTask} getIndex={vi.fn()} buttonID={1} />
      </TaskContext.Provider>
    );

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    // Check if the checkbox is now checked
    expect(checkbox).toBeChecked();
  });
});
