import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectAll,closeAll } from "./config/index.js";

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    await connectAll(); 

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🌱 Environment: ${ENV}`);
    });

    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Cleaning up...`);
      try {
        await closeAll();
        console.log("✅ All DB connections closed. Exiting...");
        process.exit(0);
      } catch (err) {
        console.error("❌ Error during shutdown:", err.message);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

// Global unhandled error handlers
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

startServer();
