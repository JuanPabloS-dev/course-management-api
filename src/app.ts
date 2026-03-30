import express from "express";
import UserRepository from "./repositories/user.repository.ts";
import UserService from "./services/user.service.ts";
import UserController from "./controllers/user.controller.ts";
import usersRoutes from "./routes/users.routes.ts";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.ts";
import morgan from "morgan";
import CourseService from './services/course.service.ts';
import CourseController from './controllers/course.controller.ts';
import courseRoutes from './routes/course.routes.ts';
import PostgresCourseRepository from './repositories/course.repository.ts';
import { Pool } from "pg";
import pool from "./config/database.ts";



const app = express();
function user(){
const userRepo = new UserRepository(pool)
const userService = new UserService(userRepo)
const userController = new UserController(userService)
return usersRoutes(userController)
}

function course(){
    const courseRepo = new PostgresCourseRepository(pool)
    const courseService = new CourseService(courseRepo)
    const courseController = new CourseController(courseService)
    return courseRoutes(courseController)
}


app.use(morgan('dev'))
app.use(express.json())



app.use('/',user())
app.use('/courses',course())

app.use(errorHandlerMiddleware)


export default app