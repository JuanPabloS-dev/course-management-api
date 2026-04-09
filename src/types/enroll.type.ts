import type { Course } from "./courses.types";
import type { User } from "./users.types";

export default interface EnrollmentRepositoryInterface {
  getCoursesByUserId(userId: string): Promise<Course[]>;

  getUsersByCourseId(courseId: string): Promise<User[]>;

  createEnrollment(userId: string, courseId: string): Promise<Enrollment>;

  getEnrollmentById(id: string): Promise<Enrollment | null>;

  findEnrollmentByCourseAndUser(userId: string, courseId: string): Promise<Enrollment | null>;

  deleteEnrollment(userId: string, courseId: string): Promise<string | void>;
}

export interface Enrollment {
  id: string,
  courseId: string,
  userId: string,
  createdAt: Date,
}

export type EnrollmentInput = {
  courseId: string,
  userId: string,
}

