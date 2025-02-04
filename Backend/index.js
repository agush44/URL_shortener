import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongo.js";
import { urlRoutes } from "./src/routes/urlRoutes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

process.loadEnvFile();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

connectDB();

app.use("/", urlRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
