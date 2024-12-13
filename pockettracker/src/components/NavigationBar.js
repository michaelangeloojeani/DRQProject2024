import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = ({ username }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">PocketTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/app/add-expense">Add Expense</Nav.Link>
            <Nav.Link href="/app/view-expenses">View Expenses</Nav.Link>
            {!username && <Nav.Link href="/signup">Sign Up</Nav.Link>} {/* Conditionally render Sign Up */}
          </Nav>
          {username && <Navbar.Text>Signed in as: {username}</Navbar.Text>} {/* Show username */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
