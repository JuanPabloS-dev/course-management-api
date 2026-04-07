import { Router } from "express";
import type LessonController from "../controllers/lesson.controller.ts";
import authenticationMiddleware from "../middlewares/auth.meddleware.ts";
import roleGuard from "../middlewares/role.middleware.ts";

export default (controller: LessonController) => {
    const lessonRouter = Router();

    lessonRouter.post(
        '/create/:courseId',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        controller.createLesson.bind(controller)
    );

    lessonRouter.get(
        '/course/:courseId',
        authenticationMiddleware,
        controller.getByCourse.bind(controller)
    );

    lessonRouter.get(
        '/:lessonId',
        authenticationMiddleware,
        controller.getById.bind(controller)
    );

    lessonRouter.patch(
        '/update/:lessonId',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        controller.updateLesson.bind(controller)
    );

    lessonRouter.delete(
        '/:lessonId',
        authenticationMiddleware,
        roleGuard(['TEACHER', 'ADMIN']),
        controller.deleteLesson.bind(controller)
    );

    return lessonRouter;
}