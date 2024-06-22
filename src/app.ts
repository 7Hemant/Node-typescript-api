import express,{ Request, Response } from "express";

import { ArticleRoutes } from "./routers";

const app = express();
app.use(express.json())

const PORT = 3000 || process.env.PORT

app.use("/api/v1",ArticleRoutes)

app.listen(PORT,()=>{
    console.log("node-typescipt-api server is live on PORT:",PORT)
})