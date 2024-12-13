import React from "react";
import Card from "react-bootstrap/Card";

const ExpenseItem = ({ expense }) => {
  return (
    <Card style={{ marginBottom: "15px" }}>
      <Card.Header>{expense.category}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{expense.description}</p>
          <footer>Amount: ${expense.amount.toFixed(2)}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default ExpenseItem;
