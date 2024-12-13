import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpensesList from "./ExpensesList";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend
    axios
      .get("http://localhost:4000/api/expenses")
      .then((response) => {
        console.log("Fetched expenses:", response.data);
        setExpenses(response.data); // Update state with fetched expenses
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Expenses</h2>
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <p>No expenses found. Add some!</p>
      )}
    </div>
  );
};

export default ViewExpenses;
