import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);


const Url = mongoose.model("Url", urlSchema);
export default Url;
