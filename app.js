import express, { response } from "express";
import tasksRouter from "./routers/tasksRouter.js";

const app = express();
app.use(express.json());
app.use("/tasks", tasksRouter);
app.use((error, req, res, next) => {
  const { message, status = 500 } = error;

  res.status(status).send(message ? message : "Intrenal Server Error!");
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
