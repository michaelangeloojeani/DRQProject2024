import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const topSectionStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    color: "#000",
  };

  const bottomSectionStyle = {
    flex: "1",
    backgroundImage: "url('/money1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#663ce2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={topSectionStyle}>
        <h1>Welcome to PocketTracker</h1>
        <p>Track your expenses and manage your finances effectively</p>
        <Link to="/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
      </div>
      <div style={bottomSectionStyle}></div>
    </div>
  );
}

export default Home;
