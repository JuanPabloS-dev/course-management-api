
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
        if (!title || !description) throw new BadRequestError("Title and description are required");
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
        console.log(req.user);
        const teacherId = req.user?.id as string;
        const result = await this.courseService.getCoursesByTeacherId(teacherId);
        res.status(200).json(result);
    }
    async updateCourse(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { title, description } = req.body;
        const data: UpdateCourseInput = {};
        if (!title?.trim() && !description?.trim()) throw new BadRequestError("At least one field is required");
        if (title?.trim()) data.title = title.trim();
        if (description?.trim()) data.description = description.trim();
        const teacherId = req.user?.id as string;
        const result = await this.courseService.updateCourse(id as string, data, teacherId);
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