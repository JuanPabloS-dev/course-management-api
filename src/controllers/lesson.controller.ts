import type LessonService from "../services/lesson.service.ts";
import type { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request.error.ts";
import type { UpdateLessonInput } from "../types/lesson.types.ts";

class LessonController {
  private lessonService: LessonService;

  constructor(lessonService: LessonService) {
    this.lessonService = lessonService;
  }

  async createLesson(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;
    const { courseId } = req.params;

    if (!title?.trim() || !content?.trim()) {
      throw new BadRequestError("Title and content are required");
    }

    const teacherId = req.user?.id as string;

    const result = await this.lessonService.createLesson(
      {
        title: title.trim(),
        content: content.trim(),
        courseId: courseId as string,
      },
      teacherId
    );

    res.status(201).json(result);
  }

  async getByCourse(req: Request, res: Response, next: NextFunction) {
    const { courseId } = req.params;

    const result = await this.lessonService.getLessonsByCourseId(courseId as string);

    res.status(200).json(result);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { lessonId } = req.params;

    const result = await this.lessonService.getLessonById(lessonId as string);

    res.status(200).json(result);
  }

  async updateLesson(req: Request, res: Response, next: NextFunction) {
    const lessonId = req.params.lessonId as string;
    const { title, content } = req.body;

    const data: UpdateLessonInput = {};

    if (!title?.trim() && !content?.trim()) {
      throw new BadRequestError("At least one field is required");
    }

    if (title?.trim()) data.title = title.trim();
    if (content?.trim()) data.content = content.trim();

    const teacherId = req.user?.id as string;

    const result = await this.lessonService.updateLesson(
      lessonId as string,
      data,
      teacherId
    );

    res.status(200).json(result);
  }

  async deleteLesson(req: Request, res: Response, next: NextFunction) {
    const { lessonId } = req.params;
    const teacherId = req.user?.id as string;

    await this.lessonService.deleteLesson(lessonId as string, teacherId);

    res.status(204).send();
  }
}

export default LessonController;