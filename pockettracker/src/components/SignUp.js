import React, { useState } from "react"; // Import React and useState for managing state
import axios from "axios"; // Import axios for API requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function SignUp({ setUsername }) {
  // Local state for the input fields
  const [inputUsername, setInputUsername] = useState(""); // State to hold the username input
  const [password, setPassword] = useState(""); // State to hold the password input
  const navigate = useNavigate(); // Hook for programmatically navigating to different routes

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation for empty fields
    if (!inputUsername || !password) {
      alert("Please enter a valid username and password.");
      return;
    }

    try {
      // Send a POST request to the backend API to create a new user
      const response = await axios.post("http://localhost:4000/api/users", {
        username: inputUsername,
        password,
      });

      // Update the global username state in App.js
      setUsername(response.data.user.username);

      // Navigate to the Home page after successful sign-up
      navigate("/");
    } catch (error) {
      // Log the error and display an appropriate alert message
      console.error("Error signing up:", error.response || error.message);
      alert(error.response?.data?.message || "Error signing up.");
    }
  };

  // Styles for the container and form elements
  const containerStyle = {
    display: "flex", // Use flexbox for centering
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    height: "100vh", // Full viewport height
    backgroundColor: "#5121de", // Set the background color
  };

  const formStyle = {
    width: "350px", // Set the width of the form
    backgroundColor: "#fff", // White background for the form
    padding: "30px", // Add padding inside the form
    borderRadius: "10px", // Round the corners of the form
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
    textAlign: "center", // Center-align the form text
  };

  const inputStyle = {
    width: "100%", // Full width input fields
    padding: "12px", // Add padding inside inputs
    margin: "10px 0", // Add vertical spacing between inputs
    border: "1px solid #ccc", // Light gray border
    borderRadius: "5px", // Round the input corners
    fontSize: "16px", // Increase the font size for readability
  };

  const buttonStyle = {
    width: "100%", // Full width button
    padding: "12px", // Add padding inside the button
    backgroundColor: "#203cd9", // Primary button color
    color: "#fff", // White text
    border: "none", // Remove border
    borderRadius: "5px", // Round the button corners
    cursor: "pointer", // Change cursor to pointer on hover
    fontWeight: "bold", // Bold text
    fontSize: "16px", // Increase font size for readability
  };

  const titleStyle = {
    marginBottom: "20px", // Add spacing below the title
    fontSize: "24px", // Large font size for the title
    fontWeight: "bold", // Bold text
    color: "#5121de", // Primary text color for the title
  };

  return (
    <div style={containerStyle}>
      {/* Form for user sign-up */}
      <form onSubmit={handleSignUp} style={formStyle}>
        <h1 style={titleStyle}>Create an Account</h1> {/* Form title */}
        <input
          type="text"
          placeholder="Enter your username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)} // Update username state
          style={inputStyle}
          required // Mark as required field
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          style={inputStyle}
          required // Mark as required field
        />
        <button type="submit" style={buttonStyle}>
          Sign Up {/* Submit button */}
        </button>
      </form>
    </div>
  );
}

export default SignUp; // Export the SignUp component for use in other files
