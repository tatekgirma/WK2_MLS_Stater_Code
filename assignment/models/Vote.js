import mongoose from "mongoose";
const { Schema } = mongoose;

const VoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targetId: { type: Schema.Types.ObjectId, required: true, index: true },
  targetType: { type: String, enum: ["post", "comment"], required: true },
  value: { type: Number, enum: [1, -1], required: true },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date },
});

VoteSchema.index({ userId: 1, targetId: 1 }, { unique: true });
VoteSchema.index({ targetId: 1, targetType: 1 });

export default mongoose.model("Vote", VoteSchema);
