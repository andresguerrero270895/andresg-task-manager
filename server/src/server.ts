// src/index.ts
import express from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks.js";
import bodyParser from "body-parser";
import pool from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json()); // parse JSON bodies

// health
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "db error" });
  }
});

// API routes
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
