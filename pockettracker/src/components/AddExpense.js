import React, { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = { description, amount, category };

    axios
      .post("http://localhost:4000/api/expenses", expense)
      .then((res) => {
        alert("Expense added successfully!");
        setDescription("");
        setAmount("");
        setCategory("");
      })
      .catch((err) => {
        alert("Error adding expense.");
      });
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Leisure">Leisure</option>
            <option value="Rent">Rent</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
