import { PrismaClient } from "@prisma/client";
import {Request, Response} from "express"

const prisma = new PrismaClient()


export const  createArticle = async(req:Request,res:Response)=>{
    const createdArticle = await prisma.article.create({data:req.body})
    res.json({"messge":"this is created","createdArticle":createdArticle})
}


export const  readArticle =async (req:Request,res:Response)=>{
    const articleData = await prisma.article.findMany()
    res.json({"articleData":articleData})
}
export const  deleteArticle = async(req:Request,res:Response)=>{
    const ArticleId = req.params.id;
    const Articlefinded = await prisma.article.findUnique({where:{ id:Number(ArticleId)}})
    
    if(!Articlefinded) {res.json({"message":"not found"}); return;}

    const deleteArticle = await prisma.article.delete({
        where:{
            id:Number(ArticleId)
        }
    })
    res.json({"message":"Article deleted","id":deleteArticle.id})    
}
export const  updateArticle = async(req:Request,res:Response)=>{
    const ArticleId = req.params.id;
    const Articlefinded = await prisma.article.findUnique({where:{ id:Number(ArticleId)}})
    
    if(!Articlefinded) {res.json({"message":"not found"}); return;}

    const updatedArticle = await prisma.article.update({
        where:{
            id:Number(ArticleId)
        },
        data:req.body
    })

    res.json({ "message":"updated Article","Article": updatedArticle})
}