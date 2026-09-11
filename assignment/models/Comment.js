import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
    index: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
    index: true,
  },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  authorSnapshot: {
    userId: Schema.Types.ObjectId,
    username: String,
    avatarUrl: String,
  },
  body: { type: String, required: true },
  depth: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  upvoteCount: { type: Number, default: 0 },
  downvoteCount: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  removedBy: { modId: Schema.Types.ObjectId, reason: String },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date },
});

CommentSchema.index({ postId: 1, createdAt: 1 });
CommentSchema.index({ postId: 1, score: -1 });
CommentSchema.index({ parentId: 1 });

export default mongoose.model("Comment", CommentSchema);
