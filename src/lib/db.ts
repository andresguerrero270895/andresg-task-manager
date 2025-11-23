// src/lib/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
