import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Subreddit from "./models/Subreddit.js";
import Thread from "./models/Thread.js";

async function query1() {
  // Write code for Query 1 here
  //Q.1 //get user with email
  // const user = await User.find({ email: "diana@example.com" });
  // console.log(user);
  //Q.2 //get threads in subreddit programming
  // const threads = await Subreddit.aggregate([
  //   { $match: { name: "programming" } },
  //   {
  //     $lookup: {
  //       from: "threads",
  //       localField: "_id",
  //       foreignField: "subreddit",
  //       as: "threads",
  // },
  //   },
  // // ]);
  // console.dir(threads, { depth: null });
}
//Q.3.//users who posted threads
//   const users = await User.aggregate([
//     {
//       $lookup: {
//         from: "threads",
//         localField: "_id",
//         foreignField: "author",
//         as: "userWithThreads",
//       },
//     },
//     {
//       $match: {
//         "userWithThreads.0": { $exists: true },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         name: 1,
//         "userWithThreads.title": 1,
//         "userWithThreads.content": 1,
//         "userWithThreads.upvotes": 1,
//         "userWithThreads.downvotes": 1,
//         "userWithThreads.voteCount": 1,
//       },
//     },
//     { $unwind: "$userWithThreads" },
//     { $limit: 2 },
//   ]);
//   console.dir(users, { depth: null });
//   //Q.4.  const threads = await Thread.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: new Date("2024-01-01T00:00:00.000Z") },
//       },
//     },
//     { $limit: 1 },
//   ]);
//   console.dir(threads);
// }

////
async function query2() {
  // Write code for Query 2 here
  //Q.5 add a new thread(create) subreddit develops author ethan
  // const subreddit = await Subreddit.findOne({ name: "devops" });
  // console.log(subreddit);
  // const author = await User.findOne({ name: "Ethan" });
  // console.log(author);
  // const newThread = new Thread({
  //   title: "New Developments in AI",
  //   content: "Let's discuss the latest in AI technology.",
  //   subreddit: subreddit._id,
  //   author: author._id,
  //   upvotes: 0,
  //   downvotes: 0,
  //   voteCount: 0,
  //   createdAt: new Date(),
  // });
  // const savedThread = await newThread.save();
  // console.log("New thread created:", savedThread);
  //Q.6 update thread upvotes and downvotes
  // update title of the thread "docker and kebernetes"
  //   const updatedThread = await Thread.findOneAndUpdate(
  //     { title: "docker and kebernetes" },
  //     { $inc: { upvotes: 1, downvotes: 1 } },
  //     { upsert: true, new: true },
  //   );
  //   console.log("Updated thread:", updatedThread);
}

/*






*/
async function query3() {
  // Write code for Query 3 here
  //Q.8 Find the author id and thread count for the user who posted the most threads
  //prompt_1:Find the user who has posted the most threads. Return that user's author ID and the total number of threads they have posted.
  //prompt-2:Using the threads collection, group threads by author, count the number of threads for each author, sort the results by thread count in descending order, and return the author ID and thread count for the user with the most threads.
  // const mostActiveAuthor = await Thread.aggregate([
  //   {
  //     $group: {
  //       _id: "$author",
  //       threadCount: { $sum: 1 },
  //     },
  //   },
  //   { $sort: { threadCount: -1 } },
  //   { $limit: 2 },
  // ]);
  // if (mostActiveAuthor.length > 0) {
  //   const authorId = mostActiveAuthor[0]._id;
  //   const threadCount = mostActiveAuthor[0].threadCount;
  //   console.log("Most active author ID:", authorId);
  //   console.log("Total threads posted:", threadCount);
  // }
  // if (mostActiveAuthor.length > 1) {
  //   const authorId = mostActiveAuthor[1]._id;
  //   const threadCount = mostActiveAuthor[1].threadCount;
  //   console.log("Second most active author ID:", authorId);
  //   console.log("Total threads posted:", threadCount);
  // }
}

async function query4() {
  // Write code for Query 4 here
  //delete operations
  //Q. 7. delete all subreddits and theor associated threads
  // const deletedSubreddits = await Subreddit.deleteMany({});
  // console.log("Deleted subreddits:", deletedSubreddits.deletedCount);
}

// more queries

async function runQueries() {
  // Uncomment the query you want to run
  await query1();
  await query2();
  await query3();
  await query4();
  // more
}

async function main() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    await runQueries();
  } catch (err) {
    console.error("DB connection failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
  }
}

main();
