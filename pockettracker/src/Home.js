// Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to PocketTracker</h1>
      <p>Sign up or log in to access your account.</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup" style={{ marginLeft: "10px" }}>
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
