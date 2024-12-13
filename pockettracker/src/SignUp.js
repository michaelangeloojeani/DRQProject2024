import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp({ setUsername }) {
  const [username, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/signup", { username, password });
      setUsername(response.data.username); // Set the username globally for the app
      navigate("/app"); // Redirect to the main app
    } catch (error) {
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
