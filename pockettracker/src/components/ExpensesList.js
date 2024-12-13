import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  return expenses.map((expense) => (
    <ExpenseItem key={expense._id} expense={expense} />
  ));
};

export default ExpensesList;
