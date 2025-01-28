import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongo.js";

process.loadEnvFile();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
