// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
require("dotenv").config();

const { createLogger, format, transports } = require("winston");
const { AutoEncryptionLoggerLevel } = require("mongodb");
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [new transports.Console()],
});

// Create an Express application
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.ATLAS_URI, {})
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB:", err.message);
  });

// Define a MongoDB schema and model using Mongoose
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Make sure the username is unique
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
});

const User = mongoose.model("User", userSchema);

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
});

const Post = mongoose.model("Post", postSchema);

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
});

const NewsPost = mongoose.model("NewsPost", newsPostSchema);

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
});

const Event = mongoose.model("Event", eventSchema);

app.use(express.json()); // <==== parse request body as JSON

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
    logger.error("POST /login 400 " + error.message);
  }
});
// Define a route to handle user creation
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

app.post("/posts", async (req, res) => {
  try {
    logger.info("POST /posts");

    const userThatPosted = await User.findOne({
      username: req.body.username,
    });

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      user: userThatPosted._id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    logger.info("POST /posts 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /posts 400: " + error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    logger.info("GET /posts");

    const posts = (
      await Post.find({}).populate("user", "username fullName")
    ).reverse();

    res.status(200).json(posts);
    logger.info("GET /posts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /posts 400: " + error.message);
  }
});

app.get("/newsPosts", async (req, res) => {
  try {
    logger.info("GET /newsPosts");

    const newsPosts = (
      await NewsPost.find({}).populate("user", "username fullName")
    ).reverse();

    res.status(200).json(newsPosts);
    logger.info("GET /newsPosts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /newsPosts 400: " + error.message);
  }
});

app.post("/newsPosts", async (req, res) => {
  try {
    logger.info("POST /newsPosts");
    const userThatPosted = await User.findOne({
      username: req.body.username,
    });

    const newPost = new NewsPost({
      title: req.body.title,
      content: req.body.content,
      user: userThatPosted._id,
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

app.get("/search/:searchTerm", async (req, res) => {
  try {
    logger.info("GET /search");
    const users = await User.find({
      username: { $regex: req.params.searchTerm },
    });
    if (users) {
      res.status(200).json(users);
      logger.info("GET /search 200");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /search 400: " + error.message);
  }
});

app.post("/events", async (req, res) => {
  try {
    logger.info("POST /events");
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
    });

    if (!newEvent) {
      throw new Error("Event does not exist");
    }

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
    logger.info("POST /events 201");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("POST /events 400: " + error.message);
  }
});

app.get("/events", async (req, res) => {
  try {
    logger.info("GET /events");
    const events = await Event.find({}).populate(
      "creator",
      "username fullName"
    );
    res.status(200).json(events);
    logger.info("GET /events 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("GET /events 400: " + error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    logger.info("DELETE /posts");
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(post);
    logger.info("DELETE /posts 200");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("DELETE /posts 400: " + error.message);
  }
});

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

app.put("/user/:username", async (req, res) => {
  logger.info("DOIGN THIS ");
  try {
    logger.info("PUT /user");
    const { username } = req.params;
    const user = await User.findOne({ username });

    console.log(req.body.data);
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

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
