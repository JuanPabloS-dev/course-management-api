import type { EnrollmentInput, Enrollment } from './../types/enroll.type.ts';
import type EnrollmentRepositoryInterface from "../types/enroll.type.ts";
import type { CourseRepository } from '../types/courses.types.ts';
import type { UsersRepository } from '../types/users.types.ts';
import { ConflictError, NotFoundError } from '../errors/index.ts';



class EnrollmentService {
  private enrollRepository: EnrollmentRepositoryInterface;
  private courseRepository:CourseRepository;
  private usersRepository: UsersRepository
  constructor(enrollRepository: EnrollmentRepositoryInterface, courseRepository:CourseRepository, usersRepository: UsersRepository) {
    this.enrollRepository = enrollRepository;
    this.courseRepository = courseRepository;
    this.usersRepository = usersRepository;
  }
  async createEnrollment(data: EnrollmentInput): Promise<Enrollment> {
    const course = await this.courseRepository.findById(data.courseId);
    if (!course) throw new NotFoundError("Course not found");
    const user = await this.usersRepository.findById(data.userId);
    if (!user) throw new NotFoundError("User not found");
    const enrollExists = await this.enrollRepository.findEnrollmentByCourseAndUser(data.courseId, data.userId);
    if (enrollExists) throw new ConflictError("Enrollment already exists");
    return await this.enrollRepository.createEnrollment(data.userId, data.courseId);
  }

  async getCoursesByUserId(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");
    return await this.enrollRepository.getCoursesByUserId(userId);
  }

    async getUsersByCourseId(courseId: string) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundError("Course not found");
    return await this.enrollRepository.getUsersByCourseId(courseId);
  }
  async deleteEnrollment(data: EnrollmentInput): Promise<void> {
    const deleted = await this.enrollRepository.deleteEnrollment(data.userId, data.courseId);
    if (!deleted) throw new NotFoundError("Enrollment not found");
  }

}

export default EnrollmentService;