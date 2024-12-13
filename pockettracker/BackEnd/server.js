const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Setup
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://g00416140:admin@cluster0.1fsat.mongodb.net/yourDatabaseName",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const userModel = mongoose.model("User", userSchema);

// CRUD Endpoints for Users

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Get a single user by ID
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Create a new user (Sign-Up)
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new userModel({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Update a user's information
app.put("/api/user/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete a user
app.delete("/api/user/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
