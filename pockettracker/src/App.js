import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AddExpense from "./components/AddExpense";
import Home from "./components/Home"; // Home within the app

const App = ({ username }) => {
  return (
    <>
      <NavigationBar /> {/* Display the navigation bar */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Routes>
          {/* Define app-specific routes */}
          <Route
            path="/"
            element={<Home username={username} />}
          />
          <Route
            path="/add-expense"
            element={<AddExpense />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
