import express from "express";
import cors from "cors";
import studentrecords from "./routes/studentrecords.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/studentrecords", studentrecords);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Server started successfully message
});
