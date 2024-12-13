import React, { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = { description, amount, category };
    console.log("New Expense:", expense);

    axios
      .post("http://localhost:4000/api/expenses", expense)
      .then((res) => {
        console.log("Expense added:", res.data);
        alert("Expense added successfully!");
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
        alert("Failed to add expense.");
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Leisure">Leisure</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Phone Bill">Phone Bill</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
