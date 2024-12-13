import React, { useState, useEffect } from "react"; // Import React and hooks for state and lifecycle management
import axios from "axios"; // Import Axios for HTTP requests
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for accessing route parameters and navigation

const EditExpense = () => {
  const { id } = useParams(); // Extract the expense ID from the route parameters
  const navigate = useNavigate(); // Hook for programmatically navigating to other routes

  // State variables for managing form inputs
  const [description, setDescription] = useState(""); // Expense description
  const [amount, setAmount] = useState(""); // Expense amount
  const [category, setCategory] = useState(""); // Expense category

  // Fetch the current expense details when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/expenses/${id}`) // Make GET request to fetch expense by ID
      .then((response) => {
        // Extract data and set state variables
        const { description, amount, category } = response.data;
        setDescription(description);
        setAmount(amount);
        setCategory(category);
      })
      .catch((err) => console.error("Error fetching expense:", err)); // Log any errors
  }, [id]); // Dependency array ensures this runs only when `id` changes

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const updatedExpense = { description, amount, category }; // Construct updated expense object

    // Make PUT request to update the expense
    axios
      .put(`http://localhost:4000/api/expenses/${id}`, updatedExpense)
      .then((res) => {
        console.log("Expense updated:", res.data); // Log success response
        alert("Expense updated successfully!"); // Alert user on success
        navigate("/expenses"); // Redirect to the expenses view page
      })
      .catch((err) => {
        console.error("Error updating expense:", err); // Log any errors
        alert("Failed to update expense."); // Alert user on failure
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>Edit Expense</h3>
      {/* Form for editing expense details */}
      <form onSubmit={handleSubmit}>
        {/* Input field for description */}
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            value={description} // Controlled input bound to description state
            onChange={(e) => setDescription(e.target.value)} // Update state on change
            required // Make the field mandatory
          />
        </div>

        {/* Input field for amount */}
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount} // Controlled input bound to amount state
            onChange={(e) => setAmount(e.target.value)} // Update state on change
            required // Make the field mandatory
          />
        </div>

        {/* Dropdown for selecting a category */}
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            value={category} // Controlled input bound to category state
            onChange={(e) => setCategory(e.target.value)} // Update state on change
            required // Make the field mandatory
          >
            <option value="Leisure">Leisure</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Bill">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit button */}
        <div style={{ marginTop: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Update Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense; // Export the component for use in other parts of the app
