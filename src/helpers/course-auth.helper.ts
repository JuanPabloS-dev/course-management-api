import type { CourseRepository } from "../types/courses.types.ts";
import NotFoundError from "../errors/not-found.error.ts";
import ForbiddenError from "../errors/forbidden.error.ts";

const assertCourseOwnership = async (courseRepository: CourseRepository,courseId: string, userId: string ) => {
    const course = await courseRepository.findById(courseId);
    if (!course) throw new NotFoundError("Course not found");
    if (course.teacherId !== userId) throw new ForbiddenError("You cannot modify this course");
    return course;

}

export default assertCourseOwnership;