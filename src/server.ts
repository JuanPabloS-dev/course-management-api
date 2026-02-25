import {createServer} from 'http'
import app from './app.ts'
import env from './config/env.ts';
const server = createServer(app)

server.listen(env.PORT,()=>{
    console.log(`corriendo en el http//:localhost:${env.PORT}`);
})