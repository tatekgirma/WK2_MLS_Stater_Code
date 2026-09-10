import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";
import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

dotenv.config();

const SUFFIX = Date.now().toString(36).slice(-6);
const ctx = {};

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "Assertion failed");
}

const tests = [];

tests.push({
  name: "1. Connect to DB",
  fn: async () => {
    const uri = process.env.MONGODB_URI;
    assert(uri, "MONGODB_URI not set in .env");
    await mongoose.connect(uri);
    assert(
      mongoose.connection.readyState === 1,
      "Failed to connect to MongoDB",
    );
  },
});

tests.push({
  name: "2. Create test user A",
  fn: async () => {
    const u = new User({
      name: `Test User A ${SUFFIX}`,
      email: `testA+${SUFFIX}@example.com`,
      password: "pass",
      createdAt: new Date(),
    });
    ctx.userA = await u.save();
    assert(ctx.userA._id, "User A did not get an _id");
  },
});

tests.push({
  name: "3. Read user by email",
  fn: async () => {
    const found = await User.findOne({ email: ctx.userA.email });
    assert(found, "Could not find user by email");
    assert(String(found._id) === String(ctx.userA._id), "Found wrong user");
  },
});

tests.push({
  name: "4. Update user name",
  fn: async () => {
    const updated = await User.findByIdAndUpdate(
      ctx.userA._id,
      { name: "Updated Name" },
      { new: true },
    );
    assert(updated.name === "Updated Name", "User name was not updated");
    ctx.userA = updated;
  },
});

tests.push({
  name: "5. Duplicate email should fail",
  fn: async () => {
    let threw = false;
    try {
      const dup = new User({
        name: "Dup",
        email: ctx.userA.email,
        password: "p",
        createdAt: new Date(),
      });
      await dup.save();
    } catch (e) {
      threw = true;
    }
    assert(threw, "Duplicate email did not cause an error");
  },
});

tests.push({
  name: "6. Create subreddit with author",
  fn: async () => {
    const s = new Subreddit({
      name: `testsub_${SUFFIX}`,
      description: "Subreddit for tests",
      author: ctx.userA._id,
      createdAt: new Date(),
    });
    ctx.sub = await s.save();
    assert(ctx.sub._id, "Subreddit did not get an _id");
  },
});

tests.push({
  name: "7. Read subreddit and populate author",
  fn: async () => {
    const found = await Subreddit.findById(ctx.sub._id).populate("author");
    assert(found && found.author, "Subreddit author not populated");
    assert(
      String(found.author._id) === String(ctx.userA._id),
      "Subreddit author mismatch",
    );
  },
});

tests.push({
  name: "8. Update subreddit description",
  fn: async () => {
    const updated = await Subreddit.findByIdAndUpdate(
      ctx.sub._id,
      { description: "Updated desc" },
      { new: true },
    );
    assert(
      updated.description === "Updated desc",
      "Subreddit description not updated",
    );
  },
});

tests.push({
  name: "9. Create thread linked to user and subreddit",
  fn: async () => {
    const t = new Thread({
      title: `Test Thread ${SUFFIX}`,
      content: "Thread content",
      author: ctx.userA._id,
      subreddit: ctx.sub._id,
      upvotes: 1,
      downvotes: 0,
      voteCount: 1,
      createdAt: new Date(),
    });
    ctx.thread1 = await t.save();
    assert(ctx.thread1._id, "Thread did not get an _id");
  },
});

tests.push({
  name: "10. Read thread and populate author+subreddit",
  fn: async () => {
    const found = await Thread.findById(ctx.thread1._id).populate(
      "author subreddit",
    );
    assert(found && found.author && found.subreddit, "Thread populate failed");
    assert(
      String(found.author._id) === String(ctx.userA._id),
      "Thread author mismatch",
    );
  },
});

tests.push({
  name: "11. Increment upvotes/downvotes and update voteCount",
  fn: async () => {
    await Thread.findByIdAndUpdate(
      ctx.thread1._id,
      { $inc: { upvotes: 3, downvotes: 1, voteCount: 2 } },
      { new: true },
    );
    const t = await Thread.findById(ctx.thread1._id);
    assert(
      t.upvotes - t.downvotes === t.voteCount,
      "voteCount not consistent with up/down votes",
    );
  },
});

tests.push({
  name: "12. Create two additional users and bulk insert threads",
  fn: async () => {
    const uB = new User({
      name: `Test B ${SUFFIX}`,
      email: `testB+${SUFFIX}@example.com`,
      password: "p",
      createdAt: new Date(),
    });
    const uC = new User({
      name: `Test C ${SUFFIX}`,
      email: `testC+${SUFFIX}@example.com`,
      password: "p",
      createdAt: new Date(),
    });
    ctx.userB = await uB.save();
    ctx.userC = await uC.save();

    const many = [
      {
        title: `Bulk 1 ${SUFFIX}`,
        content: "bulk",
        author: ctx.userB._id,
        subreddit: ctx.sub._id,
        upvotes: 2,
        downvotes: 0,
        voteCount: 2,
        createdAt: new Date(),
      },
      {
        title: `Bulk 2 ${SUFFIX}`,
        content: "bulk",
        author: ctx.userC._id,
        subreddit: ctx.sub._id,
        upvotes: 3,
        downvotes: 1,
        voteCount: 2,
        createdAt: new Date(),
      },
      {
        title: `Bulk 3 ${SUFFIX}`,
        content: "bulk",
        author: ctx.userA._id,
        subreddit: ctx.sub._id,
        upvotes: 0,
        downvotes: 0,
        voteCount: 0,
        createdAt: new Date(),
      },
    ];
    const inserted = await Thread.insertMany(many);
    assert(inserted.length === 3, "Bulk insert did not create 3 threads");
    ctx.bulkThreads = inserted;
  },
});

tests.push({
  name: "13. Find threads by subreddit",
  fn: async () => {
    const items = await Thread.find({ subreddit: ctx.sub._id });
    assert(items.length >= 3, "Did not find expected threads in subreddit");
  },
});

tests.push({
  name: "14. Find threads by author B",
  fn: async () => {
    const items = await Thread.find({ author: ctx.userB._id });
    assert(items.length >= 1, "No threads found for author B");
  },
});

tests.push({
  name: "15. Update many threads content",
  fn: async () => {
    const res = await Thread.updateMany(
      { subreddit: ctx.sub._id },
      { $set: { content: `UPDATED ${SUFFIX}` } },
    );
    assert(
      res.modifiedCount > 0 || res.nModified > 0 || res.matchedCount > 0,
      "updateMany did not affect threads",
    );
  },
});

tests.push({
  name: "16. Delete one thread",
  fn: async () => {
    const del = await Thread.findByIdAndDelete(ctx.bulkThreads[0]._id);
    assert(del, "Thread deletion returned nothing");
    const found = await Thread.findById(ctx.bulkThreads[0]._id);
    assert(!found, "Deleted thread still found");
  },
});

tests.push({
  name: "17. Delete subreddit and ensure threads persist (no cascade)",
  fn: async () => {
    await Subreddit.findByIdAndDelete(ctx.sub._id);
    const threads = await Thread.find({ subreddit: ctx.sub._id });
    assert(
      threads.length >= 1,
      "Threads were removed when subreddit deleted (expected to persist)",
    );
  },
});

tests.push({
  name: "18. Create multiple users and verify unique ObjectIds",
  fn: async () => {
    const u1 = await new User({
      name: `U1 ${SUFFIX}`,
      email: `u1+${SUFFIX}@example.com`,
      password: "p",
      createdAt: new Date(),
    }).save();
    const u2 = await new User({
      name: `U2 ${SUFFIX}`,
      email: `u2+${SUFFIX}@example.com`,
      password: "p",
      createdAt: new Date(),
    }).save();
    const u3 = await new User({
      name: `U3 ${SUFFIX}`,
      email: `u3+${SUFFIX}@example.com`,
      password: "p",
      createdAt: new Date(),
    }).save();
    assert(
      String(u1._id) !== String(u2._id) &&
        String(u2._id) !== String(u3._id) &&
        String(u1._id) !== String(u3._id),
      "ObjectIds are not unique",
    );
  },
});

tests.push({
  name: "19. createdAt fields are Date and recent",
  fn: async () => {
    const t =
      ctx.userA.createdAt || (await User.findById(ctx.userA._id)).createdAt;
    assert(t instanceof Date, "createdAt is not a Date");
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    assert(
      t > yearAgo,
      "createdAt is older than one year (unexpected for test data)",
    );
  },
});

tests.push({
  name: "20. Disconnect from DB",
  fn: async () => {
    await mongoose.disconnect();
    assert(mongoose.connection.readyState === 0, "Did not disconnect cleanly");
  },
});

async function runAll() {
  let passed = 0,
    failed = 0;
  console.log(`Running ${tests.length} CRUD tests`);
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    try {
      await t.fn();
      console.log(`✅ ${t.name}`);
      passed++;
    } catch (err) {
      console.error(`❌ ${t.name} — ${err.message}`);
      failed++;
      // continue running remaining tests
    }
  }
  console.log(`\nTest run complete. Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runAll();
