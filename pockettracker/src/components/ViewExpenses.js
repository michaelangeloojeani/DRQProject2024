import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpensesList from "./ExpensesList";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Expenses</h2>
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} onDelete={handleDelete} />
      ) : (
        <p>No expenses found. Add some!</p>
      )}
    </div>
  );
};

export default ViewExpenses;
