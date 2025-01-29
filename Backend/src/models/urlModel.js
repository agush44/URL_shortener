import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
