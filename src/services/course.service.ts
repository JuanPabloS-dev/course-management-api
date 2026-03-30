import type { UpdateCourseInput } from "./../types/courses.types.ts";
import type {
  CourseRepository,
  CreateCourseInput,
} from "../types/courses.types.ts";
import NotFoundError from "../errors/not-found.error.ts";
import ConflictError from "../errors/conflict.error.ts";
import ForbiddenError from "../errors/forbidden.error.ts";

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
    const courseExists = await this.courseRepository.findById(id);
    if (!courseExists) throw new NotFoundError("Course not found");
    if (courseExists.teacherId !== teacherId) throw new ForbiddenError("You cannot modify this course");
    const result = await this.courseRepository.updateCourse(id, data);
    if (result) return result;
    else throw new Error("fail requests");
  }

  async deleteCourse(id:string,teacherId:string){
    const courseExist = await this.courseRepository.findById(id)
    if (!courseExist) throw new NotFoundError("Course not found");
    if (courseExist.teacherId !== teacherId) throw new ForbiddenError("You cannot modify this course");;
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

