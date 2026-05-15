import { Router } from "express";
import CourseController from "../controllers/course.controller.ts";
import authenticationMiddleware from "../middlewares/auth.meddleware.ts";
import roleGuard from "../middlewares/role.middleware.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import {createCourseSchema,updateCourseSchema} from "../validations/course.validation.ts";
import validate from "../middlewares/validation.middleware.ts";

export default (controller: CourseController) => {
    const courseRouter = Router();

    courseRouter.post(
        '/create',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        validate(createCourseSchema),
        asyncHandler(controller.createCourse.bind(controller))
    );

    courseRouter.get(
        '/teacher',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        asyncHandler(controller.getByTeacherId.bind(controller))
    );

    courseRouter.get(
        '/:id',
        authenticationMiddleware,
        asyncHandler(controller.getById.bind(controller))
    );

    courseRouter.patch(
        '/update/:id',
        authenticationMiddleware,
        validate(updateCourseSchema),
        roleGuard(['TEACHER', 'ADMIN']),
        asyncHandler(controller.updateCourse.bind(controller))
    );

    courseRouter.delete(
        '/:id',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        asyncHandler(controller.deleteCourse.bind(controller))
    );

    return courseRouter;
}