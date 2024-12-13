import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return <p>No expenses available.</p>;
  }

  return (
    <div>
      {expenses.map((expense) =>
        expense ? (
          <ExpenseItem key={expense._id} expense={expense} onDelete={onDelete} />
        ) : null
      )}
    </div>
  );
};

export default ExpensesList;
