import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTasksToStorage = async (tasks) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage", error);
  }
};

export const loadTasksFromStorage = async (setTasks) => {
  try {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Update the tasks state
    }
  } catch (error) {
    console.error("Error loading tasks from local storage", error);
  }
};
