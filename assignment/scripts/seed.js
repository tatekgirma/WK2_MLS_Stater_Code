import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import User from "../models/User.js";
import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

dotenv.config();

const dataDir = path.resolve(process.cwd(), "data");

function loadJson(fileName) {
  const filePath = path.join(dataDir, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function toObjectIds(obj, mongooseInstance) {
  const converted = { ...obj };
  if (converted._id)
    converted._id = new mongooseInstance.Types.ObjectId(converted._id);
  if (converted.author)
    converted.author = new mongooseInstance.Types.ObjectId(converted.author);
  if (converted.subreddit)
    converted.subreddit = new mongooseInstance.Types.ObjectId(
      converted.subreddit,
    );
  if (converted.createdAt) converted.createdAt = new Date(converted.createdAt);
  return converted;
}

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in .env");
    process.exit(1);
  }
  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

async function clearData() {
  console.log("Clearing existing data...");
  await Promise.all([
    Thread.deleteMany({}),
    Subreddit.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log("Cleared Thread, Subreddit, and User collections");
}

async function seed() {
  try {
    await connect();
    await clearData();

    console.log("Loading JSON files from data/");
    const usersRaw = loadJson("users.json");
    const subredditsRaw = loadJson("subreddits.json");
    const threadsRaw = loadJson("threads.json");

    console.log(`Preparing ${usersRaw.length} users`);
    const users = usersRaw.map(u => toObjectIds(u, mongoose));
    await User.insertMany(users, { ordered: false });
    console.log("Inserted users");

    console.log(`Preparing ${subredditsRaw.length} subreddits`);
    const subreddits = subredditsRaw.map(s => toObjectIds(s, mongoose));
    await Subreddit.insertMany(subreddits, { ordered: false });
    console.log("Inserted subreddits");

    console.log(`Preparing ${threadsRaw.length} threads`);
    const threads = threadsRaw.map(t => {
      const obj = toObjectIds(t, mongoose);
      // ensure numeric fields are numbers
      obj.upvotes = Number(obj.upvotes) || 0;
      obj.downvotes = Number(obj.downvotes) || 0;
      obj.voteCount = obj.upvotes - obj.downvotes;
      return obj;
    });
    await Thread.insertMany(threads, { ordered: false });
    console.log("Inserted threads");

    console.log("Seeding completed successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
