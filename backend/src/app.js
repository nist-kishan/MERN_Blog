import express from "express";
import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import compression from "compression";
// import cookieParser from "cookie-parser";

import router from "./route/index.js";
// import { notFoundHandler } from "./middlewares/notFoundHandler.js";
// import errorHandler from "./middlewares/errorHandler.js";


const app = express();

// // ---------- Security & Compression ----------
// app.use(helmet());
// app.use(compression());

// // ---------- CORS ----------
console.log("CORS enabled for:", process.env.CLIENT_URL);
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: false,
}));

// // ---------- Middleware ----------
// app.use(morgan("dev"));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true }));

// // ---------- Routes ----------
app.use("/api", router);

// // ---------- Health Check ----------
// app.get("/", (req, res) => {
//   res.status(200).send("✅ API is running");
// });

// // ---------- Not Found & Error Handlers ----------
// app.use(notFoundHandler);
// app.use(errorHandler);

export default app;
