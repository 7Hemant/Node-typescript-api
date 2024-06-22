import { PrismaClient } from "@prisma/client";
import {Request, Response} from "express"

const prisma = new PrismaClient()


export const  createArticle =(req:Request,res:Response)=>{
       console.log(req?.body)
    res.send("create")
}
export const  readArticle =(req:Request,res:Response)=>{

    res.send("this is working")
}
export const  deleteArticle =(req:Request,res:Response)=>{}
export const  updateArticle =(req:Request,res:Response)=>{}