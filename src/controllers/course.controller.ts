
import type CourseService from '../services/course.service.ts';
import type { NextFunction, Request, Response } from 'express';
import  BadRequestError from '../errors/bad-request.error.ts';
import type { UpdateCourseInput } from '../types/courses.types.ts';
class CourseController {
    private courseService: CourseService
    constructor(courseService: CourseService) {
        this.courseService = courseService;
}

    async createCourse(req: Request, res: Response, next: NextFunction) {
        const { title, description } = req.body;
        const teacherId = req.user?.id as string;
        const result = await this.courseService.createCourse({
            title,
            description,
            teacherId,
        });
        res.status(201).json(result);
        
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const result = await this.courseService.getCourseById(id as string);
        res.status(200).json(result);
    }
    async getByTeacherId(req: Request, res: Response, next: NextFunction) {
        const teacherId = req.user?.id as string;
        const result = await this.courseService.getCoursesByTeacherId(teacherId);
        res.status(200).json(result);
    }
    async updateCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const { id } = req.params;

    const teacherId = req.user?.id as string;

    const result =
        await this.courseService.updateCourse(
            id as string,
            req.body,
            teacherId
        );

    res.status(200).json(result);
}
    async deleteCourse(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const teacherId = req.user?.id as string;
        await this.courseService.deleteCourse(id as string, teacherId);
        res.status(204).send();
    }
}


export default CourseController;