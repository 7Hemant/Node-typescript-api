import express,{ Request, Response } from "express";

const app = express();

const PORT = 3000 || process.env.PORT

app.use("/",(req:Request,res:Response)=>{
 res.send("this is node-typescipt-api")
})

app.listen(PORT,()=>{
    console.log("node-typescipt-api server is live on PORT:",PORT)
})