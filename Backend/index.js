import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongo.js";
import { urlRoutes } from "./src/routes/urlRoutes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

const FRONTEND_URL = process.env.FRONTEND_URL;

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

connectDB();

app.use("/", urlRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
