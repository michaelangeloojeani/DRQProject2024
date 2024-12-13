import React from "react"; // Import React
import { Link } from "react-router-dom"; // Import Link for navigation between routes

function Home() {
  // Define inline styles for the container and its sections
  const containerStyle = {
    display: "flex", // Flex container to create a vertical layout
    flexDirection: "column", // Arrange children in a column
    height: "100vh", // Full viewport height
  };

  const topSectionStyle = {
    flex: "1", // Take up equal space as the bottom section
    display: "flex", // Flex container for centering content
    flexDirection: "column", // Arrange children in a column
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
    backgroundColor: "#f5f5f5", // Light background color
    padding: "20px", // Add padding around content
    color: "#000", // Black text color
  };

  const bottomSectionStyle = {
    flex: "1", // Take up equal space as the top section
    backgroundImage: "url('/money1.jpg')", // Use an image as the background
    backgroundSize: "cover", // Make the image cover the entire section
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
  };

  const buttonStyle = {
    padding: "10px 20px", // Add padding to the button
    backgroundColor: "#663ce2", // Button background color
    color: "#fff", // Button text color
    border: "none", // Remove the border
    borderRadius: "5px", // Round the button corners
    cursor: "pointer", // Change cursor to pointer on hover
    marginTop: "10px", // Add margin above the button
  };

  return (
    <div style={containerStyle}>
      {/* Top section of the page */}
      <div style={topSectionStyle}>
        <h1>Welcome to PocketTracker</h1>
        <p>Track your expenses and manage your finances effectively</p>
        <Link to="/signup">
          {/* Link to the Sign-Up page */}
          <button style={buttonStyle}>Sign Up</button>
        </Link>
      </div>
      {/* Bottom section of the page with an image background */}
      <div style={bottomSectionStyle}></div>
    </div>
  );
}

export default Home; // Export the Home component
