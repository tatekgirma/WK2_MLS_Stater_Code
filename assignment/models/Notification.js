import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  payload: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.model("Notification", NotificationSchema);
