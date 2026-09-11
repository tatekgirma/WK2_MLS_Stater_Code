import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";
import Comment from "../models/Comment.js";
import Vote from "../models/Vote.js";
import Report from "../models/Report.js";
import Notification from "../models/Notification.js";
import SavedItem from "../models/SavedItem.js";
import Message from "../models/Message.js";
import Media from "../models/Media.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/reddit_clone";

async function run() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to", MONGODB_URI);

  // Ensure indexes for all models
  const models = [
    User,
    Subreddit,
    Thread,
    Comment,
    Vote,
    Report,
    Notification,
    SavedItem,
    Message,
    Media,
  ];
  await Promise.all(models.map(m => m.createIndexes()));

  console.log("Indexes created/ensured for models.");
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
