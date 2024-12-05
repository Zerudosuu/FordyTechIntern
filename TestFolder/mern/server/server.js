import express from "express";
import cors from "cors";
import students from "./routes/studentrecords.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/student", students);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Server started successfully message
});
