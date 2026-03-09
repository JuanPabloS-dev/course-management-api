import type { CourseRepository } from '../types/courses.types';
import type { Course, CreateCourseInput, UpdateCourseInput } from "../types/courses.types"
import type { Pool } from 'pg';
class PostgresCourseRepository implements CourseRepository{
    constructor(private pool:Pool){}
    async createCourse(data: CreateCourseInput): Promise<Course>{
        const query = `INSERT INTO courses(title,description,teacher_id)
        VALUES($1,$2,$3)
        RETURNING id,title,(SELECT name FROM users WHERE id = $3) as teacher,description,created_at,teacher_id
        ;
        `
        const values=[data.title,data.description,data.teacherId]
        const result = await this.pool.query(query,values)
        return result.rows[0]
    }
    async findById(id: string): Promise<Course | null>{       
        const query = `SELECT id,name,title,description,created_at,teacher_id 
        FROM courses WHERE id = $1
        ;
        `
        const values=[id]
        const result = await this.pool.query(query,values)
        return result.rows[0]
    }

    
    async findByTeacherId(teacherId: string): Promise<Course[]>{
        const query = `SELECT id,name,title,description,created_at,teacher_id 
        FROM courses WHERE teacher_id = $1
        ;
        `
        const values=[teacherId]
        const result = await this.pool.query(query,values)
        return result.rows[0]

    }


    async findByTeacherAndTitle(teacherId: string, title: string): Promise<Course | null>{
        const query = `SELECT id,name,title,description,created_at,teacher_id 
        FROM courses WHERE teacher_id = $1 AND title = $2
        ;
        `
        const values=[teacherId,title]
        const result = await this.pool.query(query,values)
        return result.rows[0]
    }
    async updateCourse(id: string, data: UpdateCourseInput): Promise<Course | null>{
        const query = `UPDATE courses SET title = COALESCE($1,title), description = COALESCE($2,description)
        WHERE id = $3
        RETURNING id,name,title,description,created_at,teacher_id
        ;
        `
        const values=[data.title ?? null,data.description ?? null,id]
        const result = await this.pool.query(query,values)
        return result.rows[0]
    }
    async deleteCourse(id: string,teacherID:string): Promise<void>{
        const query = `DELETE FROM courses
        WHERE teacher_id = $1 AND id = $2
        ;
        `
        const values=[teacherID,id]
        await this.pool.query(query,values)
    }
}

export default PostgresCourseRepository