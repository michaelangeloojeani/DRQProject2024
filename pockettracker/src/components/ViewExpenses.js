import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpensesList from "./ExpensesList"; // Component to render the list of expenses

const ViewExpenses = () => {
  // State to store expenses fetched from the server
  const [expenses, setExpenses] = useState([]);
  
  // State to track the current sorting option (price or time)
  const [sortOption, setSortOption] = useState("");

  // Fetch expenses from the server when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/expenses") // Endpoint to fetch all expenses
      .then((response) => {
        setExpenses(response.data); // Update the state with the fetched expenses
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error); // Log any errors
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle the deletion of an expense
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/expenses/${id}`) // Endpoint to delete a specific expense
      .then(() => {
        alert("Expense deleted successfully!");
        // Update the state by removing the deleted expense
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting expense:", error); // Log any errors
        alert("Failed to delete expense.");
      });
  };

  // Function to handle sorting expenses based on the selected option
  const handleSort = (option) => {
    setSortOption(option); // Update the selected sorting option in state
    const sortedExpenses = [...expenses]; // Create a shallow copy of the expenses array
    if (option === "price") {
      sortedExpenses.sort((a, b) => a.amount - b.amount); // Sort by price in ascending order
    } else if (option === "time") {
      sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by time in ascending order
    }
    setExpenses(sortedExpenses); // Update the state with the sorted array
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
          value={sortOption} // Controlled input tied to sortOption state
          onChange={(e) => handleSort(e.target.value)} // Call handleSort when the user selects an option
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
      {/* Render the list of expenses or a message if none exist */}
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} onDelete={handleDelete} />
      ) : (
        <p>No expenses found. Add some!</p>
      )}
    </div>
  );
};

export default ViewExpenses;
