import mongoose from "mongoose";
const { Schema } = mongoose;

const MediaSchema = new Schema({
  url: { type: String, required: true, index: true },
  provider: { type: String },
  type: { type: String },
  thumbnail: { type: String },
  meta: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: () => new Date() },
});

MediaSchema.index({ url: 1 }, { unique: true, sparse: true });

export default mongoose.model("Media", MediaSchema);
