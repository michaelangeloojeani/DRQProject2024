import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
const Root = () => {
  const [username, setUsername] = useState(""); // Global state for username

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Sign-Up Route */}
        <Route path="/signup" element={<SignUp setUsername={setUsername} />} />
        {/* Main App Route */}
        <Route path="/app" element={<App username={username} />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
