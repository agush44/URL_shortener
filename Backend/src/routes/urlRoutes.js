import { Router } from "express";
import validateUrl from "../middleware/validate.js";
import {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
} from "../controllers/urlController.js";

import { urlSchema } from "../validations/urlValidator.js";

const urlRoutes = Router();

urlRoutes.get("/", getAllUrls);
urlRoutes.post("/shorten", validateUrl(urlSchema), createShortUrl);
urlRoutes.get("/:slug", redirectToOriginalUrl);

export { urlRoutes };
