import mongoose from "mongoose";
const { Schema } = mongoose;

const SavedItemSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  itemId: { type: Schema.Types.ObjectId, required: true },
  itemType: { type: String, enum: ["post", "comment"], default: "post" },
  folder: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

SavedItemSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("SavedItem", SavedItemSchema);
