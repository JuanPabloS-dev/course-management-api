import express from "express";
import UserRepository from "./repositories/user.repository.ts";
import UserService from "./services/user.services.ts";
import morgan from "morgan";
const app = express();

const userRepo = new UserRepository()
const userService = new UserService(userRepo)
app.use(morgan('dev'))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hola mundo')
})
app.post('/register', async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const user = userService.register(name,email,password)
        res.status(201).json(user)
    } catch (error:any) {
        res.status(400).json({message:error.message})
    }
});

app.post('/login', async(req,res)=>{
    try {
        const {email,password} = req.body
        const result = await userService.login(email,password)
        res.status(200).json(result)
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }

})



export default app