import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongo.js";
import { urlRoutes } from "./src/routes/urlRoutes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

const FRONTEND_URL = process.env.FRONTEND_URL;

const PORT = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

connectDB();

app.use("/", urlRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
