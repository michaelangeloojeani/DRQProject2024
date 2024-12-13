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

// Expense Schema
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
});
const expenseModel = mongoose.model("Expense", expenseSchema);

// CRUD Endpoints for Users

// (Add existing user CRUD endpoints here)

// CRUD Endpoints for Expenses

// Create a new expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { description, amount, category } = req.body;
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

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
