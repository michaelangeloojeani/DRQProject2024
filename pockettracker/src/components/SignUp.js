import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp({ setUsername }) {
  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!inputUsername || !password) {
      alert("Please enter a valid username and password.");
      return;
    }

    try {
      // Send a POST request to the backend API
      const response = await axios.post("http://localhost:4000/api/users", {
        username: inputUsername,
        password,
      });

      // Set the username globally in App.js
      setUsername(response.data.user.username);

      // Redirect to the main app
      navigate("/app/add-expense");
    } catch (error) {
      console.error("Error signing up:", error.response || error.message);
      alert(error.response?.data?.message || "Error signing up.");
    }
  };

  return (
    <form onSubmit={handleSignUp} style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={inputUsername}
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
