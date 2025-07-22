import { Router } from "express";
import blogRouter from "../modules/blog/routes/blog.routes.js";
import commentRouter from "../modules/comment/router/comment.route.js";

const router = Router();

router.use("/blog", blogRouter);
router.use("/comment", commentRouter);
export default router;
