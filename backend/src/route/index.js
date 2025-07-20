import { Router } from "express";
import blogRouter from "../modules/blog/routes/blog.routes.js";

const router = Router();

router.use("/blog", blogRouter);  // Prefix all blog routes with /blog

export default router;
