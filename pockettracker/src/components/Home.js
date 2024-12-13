// Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to PocketTracker</h1>
      <p>Track your expenses and manage your finances effectively</p>
      <p>Sign up to access your account.</p>
      <div>
 
        <Link to="/signup" style={{ marginLeft: "10px" }}>
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
