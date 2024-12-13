import React from "react";
import NavigationBar from "./components/NavigationBar"; // Import the Navigation Bar component

function App({ username }) {
  return (
    <>
      <NavigationBar /> {/* Add the navigation bar */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome, {username ? username : "Guest"}!</h1>
      </div>
    </>
  );
}

export default App;
