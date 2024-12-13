import React, { useState } from "react"; // Import React and useState for state management
import axios from "axios"; // Import Axios for making HTTP requests
import Form from "react-bootstrap/Form"; // Import Form component from React-Bootstrap
import Button from "react-bootstrap/Button"; // Import Button component from React-Bootstrap
import Container from "react-bootstrap/Container"; // Import Container component for layout
import Card from "react-bootstrap/Card"; // Import Card component for styling

const AddExpense = () => {
  // State variables for managing form inputs
  const [description, setDescription] = useState(""); // For expense description
  const [amount, setAmount] = useState(""); // For expense amount
  const [category, setCategory] = useState(""); // For expense category

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create an expense object with the current form values
    const expense = { description, amount, category };

    // Send a POST request to the backend API to add the expense
    axios
      .post("http://localhost:4000/api/expenses", expense)
      .then(() => {
        // Alert the user on successful addition
        alert("Expense added successfully!");
        // Reset form fields
        setDescription("");
        setAmount("");
        setCategory("");
      })
      .catch(() => {
        // Alert the user on an error
        alert("Error adding expense.");
      });
  };

  // Inline style for the "Add Expense" button
  const buttonStyle = {
    backgroundColor: "#663ce2", // Custom purple background color
    color: "#fff", // White text for contrast
    border: "none", // Remove border
    padding: "12px", // Add padding for better click area
    width: "100%", // Make the button full width
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer cursor for better UX
    fontWeight: "bold", // Bold text
    fontSize: "16px", // Larger text size
  };

  return (
    <Container className="mt-5">
      {/* Card component for styling the form */}
      <Card style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Card.Title className="text-center mb-4">Add Expense</Card.Title>
        {/* Form component for capturing expense details */}
        <Form onSubmit={handleSubmit}>
          {/* Input field for description */}
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expense description"
              value={description} // Controlled input bound to description state
              onChange={(e) => setDescription(e.target.value)} // Update state on change
              required // Make the field mandatory
            />
          </Form.Group>

          {/* Input field for amount */}
          <Form.Group controlId="formAmount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter expense amount"
              value={amount} // Controlled input bound to amount state
              onChange={(e) => setAmount(e.target.value)} // Update state on change
              required // Make the field mandatory
            />
          </Form.Group>

          {/* Dropdown for selecting a category */}
          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category} // Controlled input bound to category state
              onChange={(e) => setCategory(e.target.value)} // Update state on change
              required // Make the field mandatory
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Leisure">Leisure</option>
              <option value="Shopping">Shopping</option>
              <option value="Bill">Bills</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          {/* Submit button with custom styles */}
          <Button type="submit" style={buttonStyle}>
            Add Expense
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddExpense; // Export the component for use in other parts of the application
