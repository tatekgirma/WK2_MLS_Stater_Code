import mongoose from "mongoose";
const { Schema } = mongoose;

const ReportSchema = new Schema({
  reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targetId: { type: Schema.Types.ObjectId, required: true, index: true },
  targetType: { type: String, enum: ["post", "comment"], required: true },
  reason: { type: String },
  evidence: [{ type: Schema.Types.Mixed }],
  status: {
    type: String,
    enum: ["open", "handled", "dismissed"],
    default: "open",
  },
  handledBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date },
});

ReportSchema.index({ status: 1, createdAt: 1 });
ReportSchema.index({ targetId: 1 });

export default mongoose.model("Report", ReportSchema);
