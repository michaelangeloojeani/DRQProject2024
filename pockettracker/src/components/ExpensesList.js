import React from "react";

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "5px" }}>
      <h3>{expense.description}</h3>
      <p>Amount: ${expense.amount}</p>
      <p>Category: {expense.category}</p>
      <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
      <button
        onClick={() => onDelete(expense._id)}
        style={{
          backgroundColor: "#d9534f",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ExpenseItem;
