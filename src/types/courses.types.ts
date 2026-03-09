export interface CourseRepository {
  createCourse(data: CreateCourseInput): Promise<Course>
  findById(id: string): Promise<Course | null>
  findByTeacherId(teacherId: string): Promise<Course[]>
  findByTeacherAndTitle(teacherId: string, title: string): Promise<Course | null>
  updateCourse(id: string, data: UpdateCourseInput): Promise<Course | null>
  deleteCourse(id: string, teacherId: string): Promise<void>
}

export type Course = {
  id: string
  title: string
  description: string
  teacherId: string
  createdAt: Date
  teacher?: string
}

export type CreateCourseInput = {
  title: string
  description: string
  teacherId: string
}

export type UpdateCourseInput = {
  title?: string
  description?: string
}