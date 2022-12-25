import express from "express";
import TaskController from "../controllers/TaskController";
import UserController from "../controllers/UserController";


export const route = express.Router()


const userController = new UserController();    
const taskController = new TaskController();

route.post('/user', userController.createUser)
route.get('/user', userController.getUser)
route.post('/task/new', taskController.createTask)
route.put('/task/edit/:id', taskController.updateTask)
route.delete('/task/delete/:id', taskController.deleteTask)
route.get('/user/tasks', taskController.getUsersTasks)    