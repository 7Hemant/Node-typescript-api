import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as formidable from "formidable";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export const createArticle = async (req: Request, res: Response) => {
  const folderPath = path.join(__dirname, "../", "uploads");
  if (!fs.existsSync(folderPath)) {
    // Create the folder
    fs.mkdirSync(folderPath);
    console.log(`Folder '${folderPath}' created successfully.`);
  }

  const form = new formidable.IncomingForm({
    uploadDir: folderPath,
    keepExtensions: true,
    maxFieldsSize: 20 * 1024 * 1024,
  });
  form.onPart = (part) => {
    form._handlePart(part);
    console.log(part);
  };
  form.parse(req, async (err, fields: any, files: formidable.Files<string>) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error parsing form" });
    }

    try {
      const { image } = files as any;
      //   console.log(image);
      const oldPath = image[0].filepath;
      console.log({ oldPath });
    } catch (error) {
      console.error(error);
    }
  });
  // const createdArticle = await prisma.article.create({data:req.body})
  // res.json({"messge":"this is created","createdArticle":createdArticle})
};

export const readArticle = async (req: Request, res: Response) => {
  const articleData = await prisma.article.findMany();
  res.json({ articleData: articleData });
};
export const deleteArticle = async (req: Request, res: Response) => {
  const ArticleId = req.params.id;
  const Articlefinded = await prisma.article.findUnique({
    where: { id: Number(ArticleId) },
  });

  if (!Articlefinded) {
    res.json({ message: "not found" });
    return;
  }

  const deleteArticle = await prisma.article.delete({
    where: {
      id: Number(ArticleId),
    },
  });
  res.json({ message: "Article deleted", id: deleteArticle.id });
};
export const updateArticle = async (req: Request, res: Response) => {
  const ArticleId = req.params.id;
  const Articlefinded = await prisma.article.findUnique({
    where: { id: Number(ArticleId) },
  });

  if (!Articlefinded) {
    res.json({ message: "not found" });
    return;
  }

  const updatedArticle = await prisma.article.update({
    where: {
      id: Number(ArticleId),
    },
    data: req.body,
  });

  res.json({ message: "updated Article", Article: updatedArticle });
};
