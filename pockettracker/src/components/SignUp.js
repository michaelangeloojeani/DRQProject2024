import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp({ setUsername }) {
  const [username, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter a valid username and password.");
      return;
    }

    try {
      // Send a POST request to the backend API
      const response = await axios.post("http://localhost:4000/api/users", {
        username,
        password,
      });
      
      // Set the username globally and navigate to the main app
      setUsername(response.data.user.username); // Use the correct response data structure
      navigate("/app");
    } catch (error) {
      console.error("Error signing up:", error.response || error.message); // Log errors for debugging
      alert(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <form onSubmit={handleSignUp} style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setInputUsername(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
