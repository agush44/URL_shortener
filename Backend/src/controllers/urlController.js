import { nanoid } from "nanoid";
import Url from "../models/urlModel.js";
import { urlSchema } from "../validations/urlValidator.js";

// Crear una nueva URL acortada
const createShortUrl = async (req, res) => {
  const { originalUrl, slug } = req.body;

  // Validar datos con Joi
  const { error } = urlSchema.validate({ originalUrl, slug });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Verificar si ya existe el slug
    if (slug) {
      const existingSlug = await Url.findOne({ slug });
      if (existingSlug) {
        return res.status(409).json({ message: "Slug already in use." });
      }
    }

    // Generar un slug automáticamente si no se proporciona
    const newSlug = slug || nanoid(6);

    const url = new Url({ originalUrl, slug: newSlug });
    await url.save();

    return res.status(201).json({
      message: "Short URL created successfully!",
      shortUrl: `${newSlug}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating short URL.", error });
  }
};

// Redirigir a la URL original usando el slug
const redirectToOriginalUrl = async (req, res) => {
  const { slug } = req.params;

  try {
    const url = await Url.findOne({ slug });

    if (!url) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    // Incrementar contador de clics
    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error redirecting to original URL.", error });
  }
};

// Obtener todas las URLs acortadas (opcional)
const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    return res.status(200).json(urls);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching URLs.", error });
  }
};

export { createShortUrl, redirectToOriginalUrl, getAllUrls };
