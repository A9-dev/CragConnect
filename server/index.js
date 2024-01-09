// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
require("dotenv").config();

const { createLogger, format, transports } = require("winston");
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
const port = process.env.PORT || 3000;

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
    logger.info(JSON.stringify(req.body));

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    res.status(200).json(user);
    logger.info("User logged in successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error logging in: " + error.message);
  }
});
// Define a route to handle user creation
app.post("/register", async (req, res) => {
  try {
    logger.info("POST /register");
    logger.info(JSON.stringify(req.body));

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
      // Add more fields as needed
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    logger.info("User created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating user: " + error.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    logger.info("POST /posts");
    logger.info(JSON.stringify(req.body));

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
    logger.info("Post created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating post: " + error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    logger.info("GET /posts");

    const posts = (
      await Post.find({}).populate("user", "username fullName")
    ).reverse();

    res.status(200).json(posts);
    logger.info("Posts retrieved successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error retrieving posts: " + error.message);
  }
});

app.get("/newsPosts", async (req, res) => {
  try {
    logger.info("GET /newsPosts");

    const newsPosts = (
      await NewsPost.find({}).populate("user", "username fullName")
    ).reverse();

    res.status(200).json(newsPosts);
    logger.info("News posts retrieved successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error retrieving news posts: " + error.message);
  }
});

app.post("/newsPosts", async (req, res) => {
  try {
    logger.info("POST /newsPosts");
    logger.info(JSON.stringify(req.body));
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
    logger.info("News post created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating news post: " + error.message);
  }
});

// Get subscriptions for a specific username
app.get("/subscriptions/:username", async (req, res) => {
  try {
    logger.info("GET /subscriptions");
    logger.info(JSON.stringify(req.params));
    const user = await User.findOne({
      username: req.params.username,
    });
    if (user) {
      res.status(200).json(user.subscribingTo);
      logger.info("Subscriptions: " + user.subscribingTo);
    } else {
      throw new Error("Subscription does not exist");
    }

    logger.info("Subscriptions retrieved successfully!");
  } catch (error) {
    logger.error(error.message);
    logger.error("Error retrieving subscriptions: " + error.message);
    res.status(400).json({ message: error.message });
  }
});

// Add a username to the subscriptions array for a specific username
app.post("/subscriptions", async (req, res) => {
  try {
    logger.info("POST /subscriptions");
    logger.info(JSON.stringify(req.body));
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
      logger.info("Subscription created successfully!");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating subscription: " + error.message);
  }
});

// Remove a username from the subscriptions array for a specific username
app.delete("/subscriptions", async (req, res) => {
  try {
    logger.info("DELETE /subscriptions");
    logger.info(JSON.stringify(req.body));
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
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error deleting subscription: " + error.message);
  }
});

app.get("/search/:searchTerm", async (req, res) => {
  try {
    logger.info("GET /search");
    logger.info(JSON.stringify(req.params));
    const users = await User.find({
      username: { $regex: req.params.searchTerm },
    });
    if (users) {
      res.status(200).json(users);
      logger.info("Users retrieved successfully!");
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error retrieving users: " + error.message);
  }
});

app.post("/events", async (req, res) => {
  try {
    logger.info("POST /events");
    logger.info(JSON.stringify(req.body));
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
    logger.info("Event created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating event: " + error.message);
  }
});

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
