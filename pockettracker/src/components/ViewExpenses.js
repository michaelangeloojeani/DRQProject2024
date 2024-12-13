import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpensesList from "./ExpensesList";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Track sorting option

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/expenses/${id}`)
      .then(() => {
        alert("Expense deleted successfully!");
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense.");
      });
  };

  // Sorting logic
  const handleSort = (option) => {
    setSortOption(option);
    const sortedExpenses = [...expenses];
    if (option === "price") {
      sortedExpenses.sort((a, b) => a.amount - b.amount); // Ascending order by price
    } else if (option === "time") {
      sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date)); // Ascending order by date
    }
    setExpenses(sortedExpenses);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Expenses</h2>
      {/* Sorting Options */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="sort-options" style={{ marginRight: "10px" }}>
          Sort By:
        </label>
        <select
          id="sort-options"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select an option</option>
          <option value="price">Price</option>
          <option value="time">Time</option>
        </select>
      </div>
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} onDelete={handleDelete} />
      ) : (
        <p>No expenses found. Add some!</p>
      )}
    </div>
  );
};

export default ViewExpenses;
