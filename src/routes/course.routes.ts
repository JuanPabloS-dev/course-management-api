import { Router } from "express";
import CourseController from "../controllers/course.controller.ts";
import authenticationMiddleware from "../middlewares/auth.meddleware.ts";
import roleGuard from "../middlewares/role.middleware.ts";


const courseRouter = Router();

export default (controller: CourseController) => {
    courseRouter.post('/create', authenticationMiddleware, roleGuard(['TEACHER', 'ADMIN']), controller.createCourse.bind(controller));
    courseRouter.get('/teacher', authenticationMiddleware, roleGuard(['TEACHER', 'ADMIN']), controller.getByTeacherId.bind(controller));
    courseRouter.get('/:id', authenticationMiddleware, controller.getById.bind(controller));
    courseRouter.patch('/update/:id', authenticationMiddleware, roleGuard(['TEACHER', 'ADMIN']), controller.updateCourse.bind(controller));
    courseRouter.delete('/:id', authenticationMiddleware, roleGuard(['TEACHER', 'ADMIN']), controller.deleteCourse.bind(controller));
    return courseRouter;
}