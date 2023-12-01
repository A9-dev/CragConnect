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
app.use(express.json()); // <==== parse request body as JSON

// Define a route to handle user creation
app.post("/users", async (req, res) => {
  try {
    console.log("-".repeat(process.stdout.columns));
    console.log("POST /users");
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
      throw new Error("Missing username or password");
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
