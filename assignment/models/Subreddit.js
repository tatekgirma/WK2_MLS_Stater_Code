import mongoose from "mongoose";
const { Schema } = mongoose;

const SubredditSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Subreddit", SubredditSchema);
