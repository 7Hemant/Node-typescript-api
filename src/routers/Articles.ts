import  express  from "express";

const ArticleRoutes = express.Router();

import { readArticle,createArticle,deleteArticle,updateArticle} from "../controllers/ArticleController"

ArticleRoutes.get("/readArticle",readArticle);
ArticleRoutes.post("/createArticle",createArticle),
ArticleRoutes.delete("/deleteArticle/:id",deleteArticle),
ArticleRoutes.patch("/updatArticle/:id",updateArticle)

export default ArticleRoutes;