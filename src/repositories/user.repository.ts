import type { CreateUserInput, UsersRepository} from '../types/users.types.ts';
import type { Pool } from "pg";

class UserRepository implements UsersRepository {
    private pool: Pool
    constructor(pool: Pool) {
        this.pool = pool;
    }
  async create(data: CreateUserInput) {
    const query: string = `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING id, name, email, role, created_at as "createdAt"
    ;
    `;
    const values = [data.name, data.email, data.password];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email: string) {
    const query = `
    SELECT * FROM users
    WHERE email = $1
    ;
    `;
    const result = await this.pool.query(query, [email]);
    return result.rows[0] ?? null;
  }
  async findById(id: string) {
    const query = `
    SELECT id, name, email, password, role, created_at as "createdAt" FROM users
    WHERE id = $1
    ;
    `;
    const result = await this.pool.query(query, [id]);
    return result.rows[0] ?? null;
  }

}

export default UserRepository;
