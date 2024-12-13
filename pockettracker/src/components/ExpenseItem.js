import React from "react"; // Import React
import Card from "react-bootstrap/Card"; // Import Bootstrap Card component
import { FaUtensils, FaSmile, FaShoppingCart, FaFileInvoice, FaTag } from "react-icons/fa"; // Import icons from react-icons

const ExpenseItem = ({ expense, onDelete }) => {
  if (!expense) return null; // Return null if the expense is undefined or null

  // Map categories to corresponding icons
  const categoryIcons = {
    Food: <FaUtensils />, // Icon for "Food"
    Leisure: <FaSmile />, // Icon for "Leisure"
    Shopping: <FaShoppingCart />, // Icon for "Shopping"
    Bill: <FaFileInvoice />, // Icon for "Bill"
    Other: <FaTag />, // Icon for "Other"
  };

  // Destructure expense properties
  const { description, amount, category, date } = expense;

  return (
    // Bootstrap Card component with styling
    <Card
      style={{
        marginBottom: "15px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
      }}
    >
      {/* Card header displaying category with an icon */}
      <Card.Header
        style={{
          backgroundColor: "#663ce2", // Header background color
          display: "flex", // Flexbox for alignment
          alignItems: "center", // Center items vertically
          gap: "10px", // Spacing between items
        }}
      >
        {categoryIcons[category] || <FaTag />} {/* Display corresponding icon or fallback */}
        <span>{category || "No Category"}</span> {/* Display category or fallback */}
      </Card.Header>

      {/* Card body containing description, amount, date, and delete button */}
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{description || "No Description"}</p> {/* Display description or fallback */}
          <footer>Amount: €{amount ? amount.toFixed(2) : "0.00"}</footer> {/* Display amount or fallback */}
          <p>Date: {date ? new Date(date).toLocaleDateString() : "N/A"}</p> {/* Display formatted date or fallback */}
        </blockquote>

        {/* Delete button */}
        <button
          onClick={() => onDelete(expense._id)} // Call onDelete with expense ID
          style={{
            backgroundColor: "#d9534f", // Button background color
            color: "#fff", // Button text color
            border: "none", // Remove border
            padding: "5px 10px", // Button padding
            cursor: "pointer", // Pointer cursor on hover
            marginTop: "10px", // Top margin
          }}
        >
          Delete
        </button>
      </Card.Body>
    </Card>
  );
};

export default ExpenseItem; // Export the component
