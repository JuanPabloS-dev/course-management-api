import express from "express";
import UserRepository from "./repositories/user.repository.ts";
import UserService from "./services/user.services.ts";
const app = express();

const userRepo = new UserRepository()
const userService = new UserService(userRepo)

app.use(express.json())


app.post('/register', async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const user = userService.register(name,email,password)
        res.status(201).json(user)
    } catch (error:any) {
        res.status(400).json({message:error.message})
    }
});



export default app