import type { Pool } from "pg";
import pool from "../config/database.ts";

class UserRepository {
    private pool: Pool
    constructor(pool: Pool) {
        this.pool = pool;
    }
  async create(name: string, email: string, password: string) {
    const query: string = `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING id, name, email, role, created_at
    ;
    `;
    const values = [name, email, password];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email: string) {
    const query = `
    SELECT * FROM USERS
    WHERE email = $1
    ;
    `;
    const result = await this.pool.query(query, [email]);
    return result.rows[0];
  }
}

export default UserRepository;
