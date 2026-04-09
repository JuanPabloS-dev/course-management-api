import { Router } from "express";
import type EnrollmentController from "../controllers/enroll.controller.ts";
import authenticationMiddleware from "../middlewares/auth.meddleware.ts";
import roleGuard from "../middlewares/role.middleware.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

export default (controller: EnrollmentController) => {
    const enrollmentRouter = Router();

    // Inscribirse a un curso
    enrollmentRouter.post(
        "/",
        authenticationMiddleware,
        asyncHandler(controller.createEnrollment.bind(controller))
    );

    // Cursos del usuario logueado
    enrollmentRouter.get(
        "/me",
        authenticationMiddleware,
        asyncHandler(controller.getCoursesByUserId.bind(controller))
    );

    // Usuarios inscritos en un curso
    enrollmentRouter.get(
        "/course/:courseId",
        authenticationMiddleware,
        roleGuard(["TEACHER", "ADMIN"]),
        asyncHandler(controller.getUsersByCourseId.bind(controller))
    );

    // Cancelar inscripción
    enrollmentRouter.delete(
        "/",
        authenticationMiddleware,
        asyncHandler(controller.deleteEnrollment.bind(controller))
    );

    return enrollmentRouter;
};