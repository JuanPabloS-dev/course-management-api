export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: Date;
}

export interface CreateLessonInput {
  title: string;
  content: string;
  courseId: string;
}

export interface UpdateLessonInput {
  title?: string;
  content?: string;
}

export interface LessonRepository {
  createLesson(data: CreateLessonInput): Promise<Lesson>;
  findById(id: string): Promise<Lesson | null>;
  findByCourseId(courseId: string): Promise<Lesson[]>;
  updateLesson(id: string, data: UpdateLessonInput): Promise<Lesson | null>;
  deleteLesson(id: string): Promise<void>;
}