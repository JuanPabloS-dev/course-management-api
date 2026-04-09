import type { NextFunction,Request,Response } from "express";
import type EnrollmentService from "../services/enroll.service";

class EnrollmentController {
    private enrollmentService: EnrollmentService
    constructor( enrollmentService: EnrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    async createEnrollment(req: Request, res: Response, next: NextFunction) {
        const { courseId } = req.body;
        const userId = req.user?.id as string;
        const result = await this.enrollmentService.createEnrollment({ courseId, userId });
        res.status(201).json(result);
}
    async getCoursesByUserId(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id as string;
        const result = await this.enrollmentService.getCoursesByUserId(userId);
        res.status(200).json(result);
    }
    async getUsersByCourseId(req: Request, res: Response, next: NextFunction) {
        const courseId  = req.params.courseId as string;
        const result = await this.enrollmentService.getUsersByCourseId(courseId);
        res.status(200).json(result);
    }
    async deleteEnrollment(req: Request, res: Response, next: NextFunction) {
        const { courseId } = req.body;
        const userId = req.user?.id as string;
        await this.enrollmentService.deleteEnrollment({ courseId, userId });
        res.status(204).send();
    }


}



export default EnrollmentController;