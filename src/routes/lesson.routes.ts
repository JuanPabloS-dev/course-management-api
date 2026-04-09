import { Router } from "express";
import type LessonController from "../controllers/lesson.controller.ts";
import authenticationMiddleware from "../middlewares/auth.meddleware.ts";
import roleGuard from "../middlewares/role.middleware.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

export default (controller: LessonController) => {
    const lessonRouter = Router();

    lessonRouter.post(
        '/create/:courseId',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        asyncHandler(controller.createLesson.bind(controller))
    );

    lessonRouter.get(
        '/course/:courseId',
        authenticationMiddleware,
        asyncHandler(controller.getByCourse.bind(controller))
    );

    lessonRouter.get(
        '/:lessonId',
        authenticationMiddleware,
        asyncHandler(controller.getById.bind(controller))
    );

    lessonRouter.patch(
        '/update/:lessonId',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        asyncHandler(controller.updateLesson.bind(controller))
    );

    lessonRouter.delete(
        '/:lessonId',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        asyncHandler(controller.deleteLesson.bind(controller))
    );

    return lessonRouter;
}