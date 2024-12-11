import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { TaskContext, Task, Priority } from "../Context/TaskContext";

describe("TodoList Component", () => {
  test("renders filter dropdown", () => {
    render(<TodoList />);
    const filterDropdown = screen.getByLabelText(/filter/i);
    expect(filterDropdown).toBeInTheDocument();
  });

  test("filter dropdown has correct options", () => {
    render(<TodoList />);
    const filterDropdown = screen.getByLabelText(/filter/i);
    expect(filterDropdown).toHaveValue("All");
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  test("filter dropdown changes value on selection", () => {
    render(<TodoList />);
    const filterDropdown = screen.getByLabelText(/filter/i);
    fireEvent.change(filterDropdown, { target: { value: "High" } });
    expect(filterDropdown).toHaveValue("High");
  });
});
