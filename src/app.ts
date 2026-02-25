import express from "express";
import UserRepository from "./repositories/user.repository.ts";
const app = express();

const userRepo = new UserRepository()

app.use(express.json())


app.get('/create-test-user', async(req,res)=>{
    const result = await userRepo.create(
        'Juan',
        'jua@gmail.com',
        '12345'
    );
    res.json(result)
});



export default app