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
  },
  password: {
    type: String,
    required: true,
  },
  organisation: {
    type: Boolean,
    required: true,
  },
  // Add more fields as needed
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
  username: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Post = mongoose.model("Post", postSchema);

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
    logger.error("Error logging in:", error.message);
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
      // Add more fields as needed
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    logger.info("User created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating user:", error.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    logger.info("POST /posts");
    logger.info(JSON.stringify(req.body));
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      username: req.body.username,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    logger.info("Post created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error creating post:", error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    logger.info("GET /posts");

    const posts = (await Post.find({})).reverse();

    res.status(200).json(posts);
    logger.info("Posts retrieved successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Error retrieving posts:", error.message);
  }
});

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
