import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = { description, amount, category };

    axios
      .post("http://localhost:4000/api/expenses", expense)
      .then(() => {
        alert("Expense added successfully!");
        setDescription("");
        setAmount("");
        setCategory("");
      })
      .catch(() => {
        alert("Error adding expense.");
      });
  };

  return (
    <Container className="mt-5">
      <Card style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Card.Title className="text-center mb-4">Add Expense</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAmount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter expense amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Leisure">Leisure</option>
              <option value="Shopping">Shopping</option>
              <option value="Bill">Bills</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Add Expense
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddExpense;
