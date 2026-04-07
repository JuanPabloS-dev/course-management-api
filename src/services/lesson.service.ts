import type {
  LessonRepository,
  CreateLessonInput,
  UpdateLessonInput,
} from "../types/lesson.types.ts";
import type { CourseRepository } from "../types/courses.types.ts";
import NotFoundError from "../errors/not-found.error.ts";
import assertLessonOwnership from "../helpers/lesson-auth.helper.ts";

class LessonService {
  private lessonRepository: LessonRepository;
  private courseRepository: CourseRepository;

  constructor(
    lessonRepository: LessonRepository,
    courseRepository: CourseRepository
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  async createLesson(data: CreateLessonInput, teacherId: string) {
    // verificar que el course existe
    const course = await this.courseRepository.findById(data.courseId);

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    // verificar ownership
    if (course.teacherId !== teacherId) {
      throw new NotFoundError("You do not own this course");
    }

    return await this.lessonRepository.createLesson(data);
  }

  async updateLesson(
    lessonId: string,
    data: UpdateLessonInput,
    teacherId: string
  ) {
    await assertLessonOwnership(
      this.lessonRepository,
      this.courseRepository,
      lessonId,
      teacherId
    );

    return await this.lessonRepository.updateLesson(lessonId, data);
  }

  async deleteLesson(lessonId: string, teacherId: string) {
    await assertLessonOwnership(
      this.lessonRepository,
      this.courseRepository,
      lessonId,
      teacherId
    );

    await this.lessonRepository.deleteLesson(lessonId);
  }

  async getLessonById(id: string) {
    const lesson = await this.lessonRepository.findById(id);

    if (!lesson) throw new NotFoundError("Lesson not found");

    return lesson;
  }

  async getLessonsByCourseId(courseId: string) {
    return await this.lessonRepository.findByCourseId(courseId);
  }
}

export default LessonService;