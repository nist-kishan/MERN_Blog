import mongoose from "mongoose";

let isConnectedBefore = false;
let listenersAttached = false;
let connecting = false;

export const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not defined in environment variables.");
    process.exit(1);
  }

  if (connecting) return;
  connecting = true;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("🟢 MongoDB connected");
    isConnectedBefore = true;
  } catch (err) {
    console.error("🔴 MongoDB connection error:", err.message);
  } finally {
    connecting = false;
  }

  if (!listenersAttached) {
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
      setTimeout(connectMongo, 5000);
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB error:", err.message);
    });

    mongoose.connection.on("connected", () => {
      if (!isConnectedBefore) {
        console.log("🟢 MongoDB connected");
        isConnectedBefore = true;
      } else {
        console.info("🔁 MongoDB reconnected");
      }
    });

    listenersAttached = true;
  }
};

export const closeMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed gracefully");
  } catch (err) {
    console.error("❌ Error closing MongoDB:", err.message);
  }
};
