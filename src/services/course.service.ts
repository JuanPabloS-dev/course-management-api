import type { UpdateCourseInput } from "./../types/courses.types.ts";
import type {
  CourseRepository,
  CreateCourseInput,
} from "../types/courses.types.ts";
import NotFoundError from "../errors/not-found.error.ts";
import ConflictError from "../errors/conflict.error.ts";
import assertCourseOwnership from "../helpers/course-auth.helper.ts";

class CourseService {
  private courseRepository:CourseRepository
  constructor(courseRepository:CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async createCourse({ teacherId, title, description }: CreateCourseInput) {
    const courseExists = await this.courseRepository.findByTeacherAndTitle(
      teacherId,
      title,
    );
    if (courseExists) throw new ConflictError("Course already exists");
    const result = await this.courseRepository.createCourse({
      teacherId,
      title,
      description,
    });
    return result;
  }

  async updateCourse(id: string, data: UpdateCourseInput, teacherId: string) {
    await assertCourseOwnership(this.courseRepository,id, teacherId);
    return await this.courseRepository.updateCourse(id, data);
  }

  async deleteCourse(id:string,teacherId:string){
    await assertCourseOwnership(this.courseRepository,id, teacherId);
    await this.courseRepository.deleteCourse(id)

  }

  async getCourseById(id: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new NotFoundError("Course not found");
    return course;
  }

  async getCoursesByTeacherId(teacherId: string) {
    const courses = await this.courseRepository.findByTeacherId(teacherId);
    return courses;
  }
}

export default CourseService;

