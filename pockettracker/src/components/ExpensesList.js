import React from "react"; // Import React
import ExpenseItem from "./ExpenseItem"; // Import the ExpenseItem component to display individual expenses

// ExpensesList component that renders a list of expenses
const ExpensesList = ({ expenses, onDelete }) => {
  // Check if the expenses array is empty or undefined
  if (!expenses || expenses.length === 0) {
    return <p>No expenses available.</p>; // Display a message if no expenses are present
  }

  return (
    <div>
      {/* Map over the expenses array and render an ExpenseItem for each expense */}
      {expenses.map((expense) =>
        expense ? (
          // Render ExpenseItem only if the expense is not null or undefined
          <ExpenseItem key={expense._id} expense={expense} onDelete={onDelete} />
        ) : null
      )}
    </div>
  );
};

export default ExpensesList; // Export the ExpensesList component
