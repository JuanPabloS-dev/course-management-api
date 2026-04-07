import type { Pool } from "pg";
import type {
  LessonRepository,
  Lesson,
  CreateLessonInput,
  UpdateLessonInput,
} from "../types/lesson.types.ts";

class PostgresLessonRepository implements LessonRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async createLesson(data: CreateLessonInput): Promise<Lesson> {
    const query = `
      INSERT INTO lessons (title, content, course_id)
      VALUES ($1, $2, $3)
      RETURNING 
        id,
        title,
        content,
        course_id as "courseId",
        created_at as "createdAt"
    `;
    const values = [data.title, data.content, data.courseId];

    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }

  async findById(id: string): Promise<Lesson | null> {
    const query = `
      SELECT 
        id,
        title,
        content,
        course_id as "courseId",
        created_at as "createdAt"
      FROM lessons
      WHERE id = $1
    `;
    const values = [id];

    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }

  async findByCourseId(courseId: string): Promise<Lesson[]> {
    const query = `
      SELECT 
        id,
        title,
        content,
        course_id as "courseId",
        created_at as "createdAt"
      FROM lessons
      WHERE course_id = $1
      ORDER BY created_at ASC
    `;
    const values = [courseId];

    const result = await this.pool.query(query, values);
    return result.rows;
  }

  async updateLesson(
    id: string,
    data: UpdateLessonInput
  ): Promise<Lesson | null> {
    const query = `
      UPDATE lessons
      SET 
        title = COALESCE($1, title),
        content = COALESCE($2, content)
      WHERE id = $3
      RETURNING 
        id,
        title,
        content,
        course_id as "courseId",
        created_at as "createdAt"
    `;
    const values = [data.title ?? null, data.content ?? null, id];

    const result = await this.pool.query(query, values);
    return result.rows[0] ?? null;
  }

  async deleteLesson(id: string): Promise<void> {
    const query = `
      DELETE FROM lessons
      WHERE id = $1
    `;
    const values = [id];

    await this.pool.query(query, values);
  }
}

export default PostgresLessonRepository;