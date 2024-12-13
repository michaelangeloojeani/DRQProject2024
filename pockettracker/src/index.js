import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // The main app component
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
