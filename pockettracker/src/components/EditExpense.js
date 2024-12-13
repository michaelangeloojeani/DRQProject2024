import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Fetch the current expense details
    axios
      .get(`http://localhost:4000/api/expenses/${id}`)
      .then((response) => {
        const { description, amount, category } = response.data;
        setDescription(description);
        setAmount(amount);
        setCategory(category);
      })
      .catch((err) => console.error("Error fetching expense:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExpense = { description, amount, category };
    axios
      .put(`http://localhost:4000/api/expenses/${id}`, updatedExpense)
      .then((res) => {
        console.log("Expense updated:", res.data);
        alert("Expense updated successfully!");
        navigate("/expenses");
      })
      .catch((err) => {
        console.error("Error updating expense:", err);
        alert("Failed to update expense.");
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>Edit Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Leisure">Leisure</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Phone Bill">Phone Bill</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Update Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
