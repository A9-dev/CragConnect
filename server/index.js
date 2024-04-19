// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
require("dotenv").config();
const winston = require("winston");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

// Format for non REST API logs
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Format for REST API logs
const alignedFormat = printf(({ level, message, timestamp }) => {
  // strip the whitespace from level
  var [method, endpoint, status, ...error] = message.split(" ");
  error = error.join(" ");
  // if status is undefined then make it an empty string
  status = status || "Received";

  if (error) {
    return `${timestamp} ${level}: ${method.padEnd(7)} ${endpoint.padEnd(
      24
    )} ${status} ${error}`;
  }
  return `${timestamp} ${level}: ${method.padEnd(7)} ${endpoint.padEnd(
    24
  )} ${status}`;
});

// Create logger for non REST API logs
const normalLogger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [new transports.Console()],
});

// Create logger for REST API logs
const logger = winston.createLogger({
  format: winston.format.combine(colorize(), timestamp(), alignedFormat),
  transports: [new winston.transports.Console()],
});

// Create an Express application
const app = express();
const port = process.env.PORT || 5000;
const myIP = process.env.IP_ADDR;

// Enable CORS
app.use(cors());

app.use(express.static("../client/dist"));
app.get("/", (req, res) => {
  logger.info("GET /");
  res.sendFile("index.html", { root: "../client/dist" });
  logger.info("GET / 200");
});

app.get("/news", (req, res) => {
  logger.info("GET /news");
  res.sendFile("index.html", { root: "../client/dist" });
  logger.info("GET /news 200");
});
app.get("/events", (req, res) => {
  logger.info("GET /events");
  res.sendFile("index.html", { root: "../client/dist" });
  logger.info("GET /events 200");
});

app.get("/partnerFind", (req, res) => {
  logger.info("GET /partner");
  res.sendFile("index.html", { root: "../client/dist" });
  logger.info("GET /partner 200");
});

app.get("/fitness", (req, res) => {
  logger.info("GET /fitness");
  res.sendFile("index.html", { root: "../client/dist" });
  logger.info("GET /fitness 200");
});

app.get("/settings", (req, res) => {
  logger.info("GET /settings");
  res.sendFile("index.html", { root: "../client/dist" });
  logger.info("GET /settings 200");
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.ATLAS_URI, {})
  .then(() => {
    normalLogger.info("Connected to MongoDB");
  })
  .catch((err) => {
    normalLogger.error("Error connecting to MongoDB:", err.message);
  });

// Define the schema for the User model, includes a username, password, if the user is an organisation, who subscribes to this user, who this user subscribes to, full name, what fitness plan they use, fitnessScore (how many workouts they've done), last date they worked out, total exercises done (for the day)
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organisation: {
    type: Boolean,
    required: true,
  },
  subscribers: {
    type: [String],
    required: true,
  },
  subscribingTo: {
    type: [String],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  fitnessPlan: {
    type: String,
    required: true,
  },
  fitnessScore: {
    type: Number,
    required: true,
  },
  lastWorkedOutDate: {
    type: String,
    required: true,
  },
  exercisesDone: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Define the schema for the Post model, includes a title, content, user who posted it, date and time, likes, and comments
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateAndTime: {
    type: String,
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
  comments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

// Define the schema for the Comment model, includes content, user who posted it, and date and time
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateAndTime: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

// Define the schema for the NewsPost model, includes a title, content, user who posted it, date and time, likes, and comments
const newsPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateAndTime: {
    type: String,
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
  comments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    required: true,
  },
});

const NewsPost = mongoose.model("NewsPost", newsPostSchema);

// Define the schema for the Event model, includes a creator, event title, event description, address, postcode, phone number, date and time, users going, and users interested
const eventSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventTitle: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  dateAndTime: {
    type: String,
    required: true,
  },
  usersGoing: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
  usersInterested: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

// Define the schema for the PartnerFindEntry model, includes a creator, title, description, date and time, location, users interested, and if it is following only
const partnerFindEntrySchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  usersInterested: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
  followingOnly: {
    type: Boolean,
    required: true,
  },
  selectedUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
  availableSpaces: {
    type: Number,
    required: true,
  },
});

const PartnerFindEntry = mongoose.model(
  "PartnerFindEntry",
  partnerFindEntrySchema
);

// Use the Express application to handle data in JSON format
app.use(express.json());

// Route to handle user login
app.post("/login", async (req, res) => {
  try {
    logger.info("POST /login");

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    res.status(200).json(user);
    logger.info("POST /login 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /login 400: " + error.message);
  }
});
// Route to handle user creation
app.post("/register", async (req, res) => {
  try {
    logger.info("POST /register");

    // Check if the username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Create a new user based on the User model
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      organisation: req.body.organisation,
      subscribers: [],
      subscribingTo: [],
      fullName: req.body.fullName,
      fitnessPlan: "Strength",
      fitnessScore: 0,
      lastWorkedOutDate: "2000-01-01",
      exercisesDone: 0,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    logger.info("POST /register 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /register 400: " + error.message);
  }
});

// Route to handle user posting
app.post("/posts", async (req, res) => {
  try {
    logger.info("POST /posts");

    const userThatPosted = await User.findOne({
      username: req.body.username,
    });

    const timestamp = new Date().toISOString();

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      user: userThatPosted._id,
      dateAndTime: timestamp,
      likes: [],
      comments: [],
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    logger.info("POST /posts 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /posts 400: " + error.message);
  }
});

// Route to handle getting all posts
app.get("/posts", async (req, res) => {
  try {
    logger.info("GET /posts");

    const posts = (
      await Post.find({})
        .populate("user", "username fullName")
        .populate({
          path: "comments",
          populate: { path: "user", select: "username fullName" },
        })
    ).reverse();

    res.status(200).json(posts);
    logger.info("GET /posts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /posts 400: " + error.message);
  }
});

// Route to handle getting all news posts
app.get("/newsPosts", async (req, res) => {
  try {
    logger.info("GET /newsPosts");

    const newsPosts = (
      await NewsPost.find({})
        .populate("user", "username fullName")
        .populate({
          path: "comments",
          populate: { path: "user", select: "username fullName" },
        })
    ).reverse();

    res.status(200).json(newsPosts);
    logger.info("GET /newsPosts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /newsPosts 400: " + error.message);
  }
});

// Route to handle creating a news post
app.post("/newsPosts", async (req, res) => {
  try {
    logger.info("POST /newsPosts");
    const userThatPosted = await User.findOne({
      username: req.body.username,
    });

    const timestamp = new Date().toISOString();

    const newPost = new NewsPost({
      title: req.body.title,
      content: req.body.content,
      user: userThatPosted._id,
      dateAndTime: timestamp,
      likes: [],
      comments: [],
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    logger.info("POST /newsPosts 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /newsPosts 400: " + error.message);
  }
});

// Get subscriptions for a specific username
app.get("/subscriptions/:username", async (req, res) => {
  try {
    logger.info("GET /subscriptions");
    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      throw new Error("Subscription does not exist");
    }
    res.status(200).json(user.subscribingTo);

    logger.info("GET /subscriptions 200");
  } catch (error) {
    logger.error(error.message);
    logger.error("GET /subscriptions 400: " + error.message);
    res.status(400).json({ message: error.message });
  }
});

// Add a username to the subscriptions array for a specific username
app.post("/subscriptions", async (req, res) => {
  try {
    logger.info("POST /subscriptions");
    const user = await User.findOne({
      username: req.body.username,
    });
    const user2 = await User.findOne({
      username: req.body.subscription,
    });
    if (user) {
      user.subscribingTo.push(req.body.subscription);
      user2.subscribers.push(req.body.username);

      const savedUser = await user.save();
      const savedUser2 = await user2.save();

      res.status(201).json({ savedUser, savedUser2 });
      logger.info("POST /subscriptions 201");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /subscriptions 400: " + error.message);
  }
});

// Remove a username from the subscriptions array for a specific username
app.delete("/subscriptions", async (req, res) => {
  try {
    logger.info("DELETE /subscriptions");
    const user = await User.findOne({
      username: req.body.username,
    });
    const user2 = await User.findOne({
      username: req.body.subscription,
    });

    if (user) {
      user.subscribingTo = user.subscribingTo.filter(
        (username) => username !== req.body.subscription
      );
      const savedUser = await user.save();
      user2.subscribers = user2.subscribers.filter(
        (username) => username !== req.body.username
      );
      const savedUser2 = await user2.save();

      res.status(200).json({ savedUser, savedUser2 });
      logger.info("DELETE /subscriptions 200");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /subscriptions 400: " + error.message);
  }
});

// Route to handle searching for a user
app.get("/search/:searchTerm", async (req, res) => {
  try {
    logger.info("GET /search");
    const users = await User.find({
      $or: [
        { username: { $regex: req.params.searchTerm } },
        { fullName: { $regex: req.params.searchTerm } },
      ],
    }).distinct("_id");

    const unique = await User.find({ _id: { $in: users } });

    if (unique) {
      res.status(200).json(unique);
      logger.info("GET /search 200");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /search 400: " + error.message);
  }
});

// Route to handle creating an event
app.post("/eventPosts", async (req, res) => {
  try {
    logger.info("POST /eventPosts");
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      throw new Error("User does not exist");
    }
    if (!user.organisation) {
      throw new Error("User is not an organisation");
    }

    const newEvent = new Event({
      creator: user._id,
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription,
      address: req.body.address,
      postcode: req.body.postcode,
      phoneNumber: req.body.phoneNumber,
      dateAndTime: req.body.dateAndTime,
      usersGoing: [],
      usersInterested: [],
    });

    if (!newEvent) {
      throw new Error("Event does not exist");
    }

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
    logger.info("POST /eventPosts 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /eventPosts 400: " + error.message);
  }
});

// Route to handle getting all events
app.get("/eventPosts", async (req, res) => {
  try {
    logger.info("GET /eventPosts");
    let events = await Event.find({}).populate("creator", "username fullName");
    // Only show events that are in the future
    events = events.filter((event) => {
      return new Date(event.dateAndTime) > new Date();
    });

    // sort by date, with the earliest date first
    events.sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

    res.status(200).json(events);
    logger.info("GET /eventPosts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /eventPosts 400: " + error.message);
  }
});

// Route to handle deleting a post by id
app.delete("/posts/:id", async (req, res) => {
  try {
    logger.info("DELETE /posts");
    const post =
      (await Post.findByIdAndDelete(req.params.id)) ||
      (await NewsPost.findByIdAndDelete(req.params.id));
    res.status(200).json(post);
    logger.info("DELETE /posts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /posts 400: " + error.message);
  }
});

// Route to handle getting a user by username
app.get("/user/:username", async (req, res) => {
  try {
    logger.info("GET /user");
    const user = await User.findOne({
      username: req.params.username,
    });
    // remove password from user object
    user.password = undefined;
    res.status(200).json(user);
    logger.info("GET /user 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /user 400: " + error.message);
  }
});

// Route to handle updating a user by username, used for settings
app.put("/user/:username", async (req, res) => {
  try {
    logger.info("PUT /user");
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (user) {
      // Update user fields if provided in the request body

      const savedUser = await User.findOneAndUpdate(
        { username: req.params.username },
        req.body.data,
        {
          new: true,
        }
      );
      res.status(200).json(savedUser);
      logger.info("PUT /user 200");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("PUT /user 400: " + error.message);
  }
});

// Route to handle updating a user's fitness score
app.put("/user/fitnessScore/:username", async (req, res) => {
  try {
    logger.info("PUT /user/fitnessScore");
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User does not exist");
    }

    // If the date is today, the user has already worked out
    if (user.lastWorkedOutDate === new Date().toISOString().split("T")[0]) {
      throw new Error("User already worked out today");
    }

    user.fitnessScore = user.fitnessScore + 1;
    user.lastWorkedOutDate = new Date().toISOString().split("T")[0];
    const savedUser = await user.save();
    res.status(200).json(savedUser);
    logger.info("PUT /user/fitnessScore 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("PUT /user/fitnessScore 400: " + error.message);
  }
});

// Route to handle getting the top n fitness scores
app.get("/fitnessScores/:number", async (req, res) => {
  try {
    const number = parseInt(req.params.number);
    logger.info("GET /fitnessScores");
    const users = await User.find({ organisation: false })
      .sort({ fitnessScore: -1 })
      .limit(number);
    const filteredUsers = users.map((user) => {
      return { username: user.username, fitnessScore: user.fitnessScore };
    });
    res.status(200).json(filteredUsers);
    logger.info("GET /fitnessScores 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /fitnessScores 400: " + error.message);
  }
});

// Route to handle resetting a user's exercises done, used after they complete a workout
app.put("/user/resetExercisesDone/:username", async (req, res) => {
  try {
    logger.info("PUT /user/resetExercisesDone");
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User does not exist");
    }
    user.exercisesDone = 0;
    const savedUser = await user.save();
    res.status(200).json(savedUser);
    logger.info("PUT /user/resetExercisesDone 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("PUT /user/resetExercisesDone 400: " + error.message);
  }
});

// Route to handle setting a user's exercises done, used after they complete an exercise
app.put("/user/setExercisesDone/:username", async (req, res) => {
  try {
    logger.info("PUT /user/setExercisesDone");
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User does not exist");
    }
    user.exercisesDone = req.body.exercisesDone;
    const savedUser = await user.save();
    res.status(200).json(savedUser);
    logger.info("PUT /user/setExercisesDone 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("PUT /user/setExercisesDone 400: " + error.message);
  }
});

// Route to add like to post by id
app.post("/posts/like/:postId", async (req, res) => {
  try {
    logger.info("POST /addLike");
    const post =
      (await Post.findById(req.params.postId)) ||
      (await NewsPost.findById(req.params.postId));
    const user = await User.findById(req.body.userId);
    if (!post) {
      throw new Error("Post does not exist");
    }
    if (!user) {
      throw new Error("User does not exist");
    }
    if (post.likes.includes(user._id)) {
      throw new Error("User already liked this post");
    }
    post.likes.push(user._id);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
    logger.info("POST /addLike 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /addLike 400: " + error.message);
  }
});

// Route to delete like from post by id
app.delete("/posts/like/:postId", async (req, res) => {
  try {
    logger.info("DELETE /deleteLike");
    const post =
      (await Post.findById(req.params.postId)) ||
      (await NewsPost.findById(req.params.postId));
    const user = await User.findById(req.body.userId);
    if (!post) {
      throw new Error("Post does not exist");
    }
    if (!user) {
      throw new Error("User does not exist");
    }
    if (!post.likes.includes(user._id)) {
      throw new Error("User has not liked this post");
    }
    post.likes = post.likes.filter(
      (id) => id.toString() !== user._id.toString()
    );
    const savedPost = await post.save();
    res.status(200).json(savedPost);
    logger.info("DELETE /deleteLike 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /deleteLike 400: " + error.message);
  }
});

// Route to add comment to post by id
app.post("/posts/comment/:postId", async (req, res) => {
  try {
    logger.info("POST /addComment");
    const post =
      (await Post.findById(req.params.postId)) ||
      (await NewsPost.findById(req.params.postId));
    const user = await User.findById(req.body.userId);
    if (!post) {
      throw new Error("Post does not exist");
    }
    if (!user) {
      throw new Error("User does not exist");
    }
    const newComment = new Comment({
      content: req.body.comment,
      user: user._id,
      dateAndTime: new Date().toISOString(),
    });

    const savedComment = await newComment.save();
    post.comments.push(savedComment._id);
    const savedPost = await post.save();
    res.status(201).json(savedComment);
    logger.info("POST /addComment 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /addComment 400: " + error.message);
  }
});

// Route to delete comment from post by id
app.delete("/posts/:postId/comment/:commentId", async (req, res) => {
  try {
    logger.info("DELETE /deleteComment");
    const post =
      (await Post.findById(req.params.postId)) ||
      (await NewsPost.findById(req.params.postId));
    if (!post) {
      throw new Error("Post does not exist");
    }
    post.comments = post.comments.filter(
      (id) => id.toString() !== req.params.commentId
    );
    const savedPost = await post.save();
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ savedPost, comment });
    logger.info("DELETE /deleteComment 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /deleteComment 400: " + error.message);
  }
});

// Route to handle deleting all posts made by automated tests
app.delete("/testPosts", async (req, res) => {
  try {
    logger.info("DELETE /testPosts");
    await Post.deleteMany({ title: "Test Title" });
    await NewsPost.deleteMany({ title: "Test Title" });
    await Event.deleteMany({ eventTitle: "Test event" });
    res.status(200).json({ message: "Test posts deleted" });
    logger.info("DELETE /testPosts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /testPosts 400: " + error.message);
  }
});

// Route to handle deleting event by id
app.delete("/eventPosts/:eventId", async (req, res) => {
  try {
    logger.info("DELETE /eventPosts");
    const event = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json(event);
    logger.info("DELETE /eventPosts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /eventPosts 400: " + error.message);
  }
});

app.post("/partnerEntry", async (req, res) => {
  try {
    logger.info("POST /partnerEntry");

    // Get user from id
    const newEntry = new PartnerFindEntry({
      creator: req.body.creator,
      description: req.body.description,
      dateAndTime: req.body.dateAndTime,
      location: req.body.location,
      usersInterested: [],
      followingOnly: req.body.followingOnly,
      selectedUsers: [],
      availableSpaces: req.body.availableSpaces,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
    logger.info("POST /partnerEntry 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    normalLogger.error("POST /partnerEntry 400: " + error.message);
  }
});

app.get("/partnerEntry", async (req, res) => {
  try {
    logger.info("GET /partnerEntry");
    const entries = await PartnerFindEntry.find({})
      .populate("creator", "username fullName subscribingTo")
      .populate("usersInterested", "username fullName")
      .populate("selectedUsers", "username fullName");
    res.status(200).json(entries);
    logger.info("GET /partnerEntry 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /partnerEntry 400: " + error.message);
  }
});

app.post("/partnerEntry/interest/:entryId", async (req, res) => {
  try {
    logger.info("POST /partnerEntry/interest");
    const entry = await PartnerFindEntry.findById(req.params.entryId);
    const user = await User.findById(req.body.userId);
    if (!entry) {
      throw new Error("Entry does not exist");
    }
    if (!user) {
      throw new Error("User does not exist");
    }
    if (entry.usersInterested.includes(user._id)) {
      throw new Error("User already interested in this entry");
    }
    entry.usersInterested.push(user._id);
    const savedEntry = await entry.save();
    res.status(200).json(savedEntry);
    logger.info("POST /partnerEntxry/interest 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /partnerEntry/interest 400: " + error.message);
  }
});

app.delete("/partnerEntry/interest/:entryId", async (req, res) => {
  try {
    logger.info("DELETE /partnerEntry/interest");
    const entry = await PartnerFindEntry.findById(req.params.entryId);
    const user = await User.findById(req.body.userId);
    if (!entry) {
      throw new Error("Entry does not exist");
    }
    if (!user) {
      throw new Error("User does not exist");
    }
    if (!entry.usersInterested.includes(user._id)) {
      throw new Error("User is not interested in this entry");
    }
    entry.usersInterested = entry.usersInterested.filter(
      (id) => id.toString() !== user._id.toString()
    );
    const savedEntry = await entry.save();
    res.status(200).json(savedEntry);
    logger.info("DELETE /partnerEntry/interest 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /partnerEntry/interest 400: " + error.message);
  }
});

app.get("/partnerEntry/:entryId", async (req, res) => {
  try {
    logger.info("GET /partnerEntry");
    const entry = await PartnerFindEntry.findById(req.params.entryId);
    res.status(200).json(entry);
    logger.info("GET /partnerEntry 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /partnerEntry 400: " + error.message);
  }
});

app.delete("/partnerEntry/:entryId", async (req, res) => {
  try {
    logger.info("DELETE /partnerEntry");
    const entry = await PartnerFindEntry.findByIdAndDelete(req.params.entryId);
    res.status(200).json(entry);
    logger.info("DELETE /partnerEntry 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /partnerEntry 400: " + error.message);
  }
});

app.put("/partnerEntry/:entryId", async (req, res) => {
  try {
    logger.info("PUT /partnerEntry");
    const entry = await PartnerFindEntry.findById(req.params.entryId);
    if (!entry) {
      throw new Error("Entry does not exist");
    }
    // The entry is in the request body
    const newEntry = req.body;
    const savedEntry = await PartnerFindEntry.findByIdAndUpdate(
      req.params.entryId,
      newEntry,
      {
        new: true,
      }
    );

    res.status(200).json(savedEntry);
    logger.info("PUT /partnerEntry 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("PUT /partnerEntry 400: " + error.message);
  }
});

// Start the server
app.listen(port, myIP, () => {
  normalLogger.info(`Server is running on port ${port}`);
});
