import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpenses";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  const [username, setUsername] = useState(""); // Global username state

  const appStyle = {
    backgroundColor: "#203cd9", // Set background color
    minHeight: "100vh", // Ensure it covers the full viewport height
    padding: 0,
    margin: 0,
    color: "#ffffff", // Set text color for better contrast
  };

  // Load username from local storage on app load
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Save username to local storage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username"); // Clear it if username is empty
    }
  }, [username]);

  return (
    <div style={appStyle}>
      <NavigationBar username={username} /> {/* Pass username */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>PocketTracker</h1>
        {username && <p>Logged in as: {username}</p>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp setUsername={setUsername} />} />
          <Route path="/app/add-expense" element={<AddExpense />} />
          <Route path="/app/view-expenses" element={<ViewExpenses />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
