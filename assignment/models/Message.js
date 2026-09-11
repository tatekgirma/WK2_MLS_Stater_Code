import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  fromId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  body: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

MessageSchema.index({ toId: 1, createdAt: -1 });

export default mongoose.model("Message", MessageSchema);
