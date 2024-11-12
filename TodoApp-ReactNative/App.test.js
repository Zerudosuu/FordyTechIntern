import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import App from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskContext } from "./src/Context/TaskContext";

// Mock task data
const mockTasks = [
  {
    name: "Buy groceries",
    description: "Get fruits, vegetables, and bread.",
    frequency: "Once",
    date: new Date(2024, 10, 12), // November 12, 2024
    time: "10:00 AM",
  },
  {
    name: "Morning run",
    description: "Run 5km around the park.",
    frequency: "Daily",
    date: new Date(2024, 10, 13), // November 13, 2024
    time: "6:30 AM",
  },
];

// Mock Async Storage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(JSON.stringify(mockTasks))),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock loadTasksFromStorage
jest.mock("./src/components/SaveLoad", () => ({
  loadTasksFromStorage: jest.fn((setTasks) => {
    setTasks(mockTasks); // Directly mock setting tasks
  }),
}));

describe("App Component with Async Storage and mock data", () => {
  it("loads tasks from storage and displays them", async () => {
    render(
      <TaskContext.Provider
        value={{
          tasks: mockTasks, // Pass mock tasks as initial value
          setTasks: jest.fn(), // Mock the setTasks function (it won't be called in this case)
        }}
      >
        <App />
      </TaskContext.Provider>
    );

    // Wait for tasks to load and check if they are rendered
    await waitFor(() => {
      expect(screen.getByText(/Buy groceries/i)).toBeTruthy();
      expect(screen.getByText(/Morning run/i)).toBeTruthy();
    });

    // Optionally, check that AsyncStorage's getItem was called
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("tasksKey"); // Replace with the actual key you're using
  });
});
