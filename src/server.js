import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectDB, disconnectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

connectDB();
config();

const PORT = 3001;
const app = express();

app.use(
  cors({
    origin: "https://samfos.vercel.app/" || "http://localhost:3000",
  }),
);

app.use(express.json());

app.use("/contact", contactRoutes);

console.log("hello world");
app.listen(PORT, () => {
  console.log("server start running");
});

//Handle unhandled promise rejection (e.g database connection error)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

//handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("uncaught exception:", err);
  await disconnectDB();
  process.exit(1);
});

//graceful shutdown
process.on("SIGTERM", async () => {
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
