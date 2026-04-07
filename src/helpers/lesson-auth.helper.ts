import type { LessonRepository } from "../types/lesson.types.ts";
import type { CourseRepository } from "../types/courses.types.ts";
import NotFoundError from "../errors/not-found.error.ts";
import ForbiddenError from "../errors/forbidden.error.ts";

async function assertLessonOwnership(
  lessonRepository: LessonRepository,
  courseRepository: CourseRepository,
  lessonId: string,
  teacherId: string
): Promise<void> {
  // 1. verificar lesson existe
  const lesson = await lessonRepository.findById(lessonId);

  if (!lesson) {
    throw new NotFoundError("Lesson not found");
  }

  // 2. obtener course
  const course = await courseRepository.findById(lesson.courseId);

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  // 3. verificar ownership
  if (course.teacherId !== teacherId) {
    throw new ForbiddenError("You do not own this course");
  }
}

export default assertLessonOwnership;