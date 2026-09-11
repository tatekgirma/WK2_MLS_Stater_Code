import mongoose from "mongoose";
const { Schema } = mongoose;

const AnalyticsEventSchema = new Schema({
  eventType: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId },
  meta: { type: Schema.Types.Mixed },
  ts: { type: Date, default: () => new Date(), index: true },
});

// Consider using a time-series collection in production
export default mongoose.model("AnalyticsEvent", AnalyticsEventSchema);
