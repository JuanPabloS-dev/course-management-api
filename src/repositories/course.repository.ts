import type { CourseRepository } from "../types/courses.types.ts";
import type {
  Course,
  CreateCourseInput,
  UpdateCourseInput,
} from "../types/courses.types";
import type { Pool } from "pg";
class PostgresCourseRepository implements CourseRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async createCourse(data: CreateCourseInput): Promise<Course> {
    const query = `INSERT INTO courses(title,description,teacher_id)
        VALUES($1,$2,$3)
        RETURNING id,title,description,created_at as "createdAt",teacher_id as "teacherId"
        ;
        `;
    const values = [data.title, data.description, data.teacherId];
    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }
  async findById(id: string): Promise<Course | null> {
    const query = `SELECT id,title,description,created_at as "createdAt",teacher_id as "teacherId"
        FROM courses WHERE id = $1
        ;
        `;
    const values = [id];
    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }

  async findByTeacherId(teacherId: string): Promise<Course[]> {
    const query = `SELECT id,title,description,created_at as "createdAt",teacher_id as "teacherId"
        FROM courses WHERE teacher_id = $1
        ;
        `;
    const values = [teacherId];
    const result = await this.pool.query(query, values);
    return result.rows;
  }

  async findByTeacherAndTitle(
    teacherId: string,
    title: string,
  ): Promise<Course | null> {
    const query = `SELECT id,title,description,created_at as "createdAt",teacher_id as "teacherId" 
        FROM courses WHERE teacher_id = $1 AND title = $2
        ;
        `;
    const values = [teacherId, title];
    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }
  async updateCourse(
    id: string,
    data: UpdateCourseInput,
  ): Promise<Course | null> {
    const query = `UPDATE courses SET title = COALESCE($1,title), description = COALESCE($2,description)
        WHERE id = $3
        RETURNING id,title,description,created_at as "createdAt",teacher_id as "teacherId"
        ;
        `;
    const values = [data.title ?? null, data.description ?? null, id];
    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }
  async deleteCourse(id: string): Promise<void> {
    const query = `DELETE FROM courses
        WHERE id = $1
        RETURNING id,title,description,teacher_id as "teacherId"
        ;
        `;
    const values = [id];
    await this.pool.query(query, values);
  }
}
export default PostgresCourseRepository;
