const express = require("express");
const app = express();
const port = 8080;
const db = require("./firebase").db; // Firestore database instance

app.use(express.json());

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasksSnapshot = await db.collection("tasks").get();
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific task
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const taskRef = db.collection("tasks").doc(id);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ id: taskSnapshot.id, ...taskSnapshot.data() });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new task
app.post("/tasks", async (req, res) => {
  const { name, completed = false } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Task name is required" });
  }

  try {
    const newTask = {
      name,
      completed,
    };

    const taskRef = await db.collection("tasks").add(newTask);
    res.status(201).json({ id: taskRef.id, ...newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a task
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params; // Task ID from the URL
  const { name, completed } = req.body; // Fields to update

  if (!name && completed === undefined) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const taskRef = db.collection("tasks").doc(id);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskRef.update({
      ...(name && { name }), // Update `name` if provided
      ...(completed !== undefined && { completed }), // Update `completed` if provided
    });

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const taskRef = db.collection("tasks").doc(id);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskRef.delete();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => console.log(`Server has started on port: ${port}`));
