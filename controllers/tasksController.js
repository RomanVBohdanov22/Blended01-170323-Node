import fs from "fs/promises";
import path from "path";
import { controllerDecorator } from "../helpers/controllerDecorator.js";
import HttpError from "../helpers/HttpError.js";
const pathTasks = path.resolve(process.cwd(), "db", "tasks.json");

const readTasks = async () => {
  const buffer = await fs.readFile(pathTasks);
  const tasks = JSON.parse(buffer);
  return tasks;
};

const createTask = controllerDecorator(async (req, res) => {
  const newTask = {
    id: crypto.randomUUID(),
    ...req.body,
  };
  let tasks = await readTasks();
  tasks = [...tasks, newTask];
  const task = await fs.writeFile(pathTasks, JSON.stringify(tasks, null, 2));
  console.log(newTask);
  res.status(201).send(newTask);
});

const getTasks = controllerDecorator(async (req, res) => {
  /*const buffer = await fs.readFile(pathTasks);
  const tasks = JSON.parse(buffer);*/

  //throw HttpError(400);
  res.send(await readTasks()); //tasks);
});

export { createTask, getTasks };
