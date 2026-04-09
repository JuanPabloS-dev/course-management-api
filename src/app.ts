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
import LessonService from './services/lesson.service.ts';
import LessonController from './controllers/lesson.controller.ts';
import lessonRoutes from './routes/lesson.routes.ts';
import PostgresLessonRepository from './repositories/lesson.repository.ts';
import EnrollmentRepository from "./repositories/enroll.repository.ts";
import EnrollmentService from "./services/enroll.service.ts";
import EnrollmentController from "./controllers/enroll.controller.ts";
import enrollRoutes from "./routes/enroll.routes.ts";
import pool from "./config/database.ts";



const app = express();


const userRepo = new UserRepository(pool)
const courseRepo = new PostgresCourseRepository(pool)
const lessonRepo = new PostgresLessonRepository(pool)
const enrollRepo = new EnrollmentRepository(pool)
function user(){

const userService = new UserService(userRepo)
const userController = new UserController(userService)
return usersRoutes(userController)
}

function course(){

    const courseService = new CourseService(courseRepo)
    const courseController = new CourseController(courseService)
    return courseRoutes(courseController)
}

function lesson(){

    const lessonService = new LessonService(lessonRepo, courseRepo)
    const lessonController = new LessonController(lessonService)

    return lessonRoutes(lessonController)
}
function enroll(){

    const enrollService = new EnrollmentService(enrollRepo,courseRepo,userRepo)
    const enrollController = new EnrollmentController(enrollService)
    return enrollRoutes(enrollController)
}

app.use(morgan('dev'))
app.use(express.json())
app.use('/lessons', lesson())
app.use('/enrollments', enroll())


app.use('/',user())
app.use('/courses',course())


app.use(errorHandlerMiddleware)


export default app