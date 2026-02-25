import pool from "../config/database.ts";

class UserRepository{
async create(name:string,email:string,password:string){
    const query:string = `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING id, name, email, role, created_at
    ;
    `;
    const values = [name,email,password]
    const result = await pool.query(query,values)
    return result.rows[0]
}

async findByEmail(email:string){
    const query = `
    SELECT id,name,email,role FROM USERS
    WHERE email = $1
    ;
    `
    const result = await pool.query(query,[email])
    return result.rows[0]
}

}

export default UserRepository