import { Pool } from "pg";
import type { Enrollment, EnrollmentInput } from "../types/enroll.type.ts";
import type { Course } from "../types/courses.types.ts";
import type { User } from "../types/users.types.ts";
import type EnrollmentRepositoryInterface from "../types/enroll.type.ts";

class EnrollmentRepository implements EnrollmentRepositoryInterface {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
}

    async getCoursesByUserId(userId: string): Promise<Course[]> {
    const result = await this.pool.query(
      "SELECT c.id, c.title, c.description, c.created_at AS createdAt FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.user_id = $1",
      [userId]
    );
    return result.rows;
  }
  async getUsersByCourseId(courseId: string): Promise<User[]> {
    const result = await this.pool.query(
      "SELECT u.id, u.name, u.email, u.created_at AS createdAt FROM users u JOIN enrollments e ON u.id = e.user_id WHERE e.course_id = $1",
      [courseId]
    );
    return result.rows;
  }

    async createEnrollment(userId: string, courseId: string): Promise<Enrollment> {
    const result = await this.pool.query(
      "INSERT INTO enrollments (course_id, user_id) VALUES ($1, $2) RETURNING id, course_id AS courseId, user_id AS userId, created_at AS createdAt",
      [courseId, userId]
    );
    
    return result.rows[0];
  }

  async getEnrollmentById(id: string): Promise<Enrollment | null> {
    const result = await this.pool.query(
      "SELECT id, course_id AS courseId, user_id AS userId, created_at AS createdAt FROM enrollments WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }
  async findEnrollmentByCourseAndUser(courseId: string, userId: string): Promise<Enrollment | null> {
    const result = await this.pool.query(
      "SELECT id, course_id AS courseId, user_id AS userId, created_at AS createdAt FROM enrollments WHERE course_id = $1 AND user_id = $2",
      [courseId, userId]
    );
    return result.rows[0] || null;
  }
  async deleteEnrollment(userId: string, courseId: string): Promise<string | void> {
    const result = await this.pool.query(
      "DELETE FROM enrollments WHERE course_id = $1 AND user_id = $2 RETURNING id",
      [courseId, userId]
    );
    return result.rows[0]?.id;
  }
}


export default EnrollmentRepository;

