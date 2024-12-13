import React from "react";
import Card from "react-bootstrap/Card";
import { FaUtensils, FaSmile, FaShoppingCart, FaFileInvoice, FaTag } from "react-icons/fa";

const ExpenseItem = ({ expense, onDelete }) => {
  if (!expense) return null;

  // Map category to icons
  const categoryIcons = {
    Food: <FaUtensils />,
    Leisure: <FaSmile />,
    Shopping: <FaShoppingCart />,
    Bill: <FaFileInvoice />,
    Other: <FaTag />,
  };

  const { description, amount, category, date } = expense;

  return (
    <Card style={{ marginBottom: "15px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Card.Header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {categoryIcons[category] || <FaTag />} <span>{category || "No Category"}</span>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{description || "No Description"}</p>
          <footer>Amount: €{amount ? amount.toFixed(2) : "0.00"}</footer>
          <p>Date: {date ? new Date(date).toLocaleDateString() : "N/A"}</p>
        </blockquote>
        <button
          onClick={() => onDelete(expense._id)}
          style={{
            backgroundColor: "#d9534f",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Delete
        </button>
      </Card.Body>
    </Card>
  );
};

export default ExpenseItem;
