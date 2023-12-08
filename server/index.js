// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
require("dotenv").config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.ATLAS_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define a MongoDB schema and model using Mongoose
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

const postSchema = new Schema({
  title: String,
  content: String,
  username: String,
  // Add more fields as needed
});

const Post = mongoose.model("Post", postSchema);

app.use(express.json()); // <==== parse request body as JSON

app.post("/login", async (req, res) => {
  try {
    console.log("-".repeat(process.stdout.columns));
    console.log("POST /login");
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
      throw new Error("Missing username or password");
    }

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    res.status(200).json(user);
    console.log("User logged in successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error logging in:", error.message);
  } finally {
    console.log("-".repeat(process.stdout.columns));
  }
});
// Define a route to handle user creation
app.post("/register", async (req, res) => {
  try {
    console.log("-".repeat(process.stdout.columns));
    console.log("POST /register");
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
      throw new Error("Missing username or password");
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Create a new user based on the User model
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      // Add more fields as needed
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    console.log("User created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error creating user:", error.message);
  } finally {
    console.log("-".repeat(process.stdout.columns));
  }
});

app.post("/posts", async (req, res) => {
  try {
    console.log("-".repeat(process.stdout.columns));
    console.log("POST /posts");
    console.log(req.body);
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      username: req.body.username,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    console.log("Post created successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error creating post:", error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    console.log("-".repeat(process.stdout.columns));
    console.log("GET /posts");

    const posts = [
      {
        id: 1,
        title: "Post 1",
        content: "This is the first post",
        username: "user1",
      },
      {
        id: 2,
        title: "Post 2",
        content: "This is the second post",
        username: "user2",
      },
      {
        id: 3,
        title: "Post 3",
        content: "This is the third post",
        username: "user3",
      },
      {
        id: 4,
        title: "Post 4",
        content:
          "This is the fourth post lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. printed rubber handle operation master higher attention exclaimed smooth bit town shinning pleasant bound eight gulf program deep mixture physical pure gasoline shot today",
        username: "user4",
      },
      {
        id: 5,
        title: "Post 5",
        content: "This is the fifth post",
        username: "user5",
      },
    ];

    res.status(200).json(posts);
    console.log("Posts retrieved successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error retrieving posts:", error.message);
  } finally {
    console.log("-".repeat(process.stdout.columns));
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
