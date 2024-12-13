const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://g00416140:admin@cluster0.1fsat.mongodb.net/yourDatabaseName",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);

// Expense Schema
const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const expenseModel = mongoose.model("Expense", expenseSchema);

// --- User Routes ---

// Create a new user (Sign-Up)
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Create new user
    const newUser = new userModel({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

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
app.get("/api/users/:id", async (req, res) => {
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

// Update a user
app.put("/api/users/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { username, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete a user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// --- Expense Routes ---

// Create a new expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    // Validate inputs
    if (!description || !amount || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = new expenseModel({ description, amount, category });
    await newExpense.save();
    res.status(201).json({ message: "Expense created", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error });
  }
});

// Get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await expenseModel.find({});
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

// Get a single expense by ID
app.get("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await expenseModel.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense", error });
  }
});

// Update an expense
app.put("/api/expenses/:id", async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      req.params.id,
      { description, amount, category },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated", expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
});

// Delete an expense
app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted", expense: deletedExpense });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
