import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpenses";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  const [username, setUsername] = useState(""); // Global username state

  return (
    <>
      <NavigationBar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        
        {username && <p>Logged in as: {username}</p>}
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp setUsername={setUsername} />} />
          <Route path="/app/add-expense" element={<AddExpense />} />
          <Route path="/app/view-expenses" element={<ViewExpenses />} />
         
        </Routes>
      </div>
    </>
  );
}

export default App;
