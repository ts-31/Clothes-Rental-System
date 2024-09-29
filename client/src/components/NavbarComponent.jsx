import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../main";

function NavbarComponent() {
  const { username } = useContext(AuthContext);
  return (
    // <Navbar expand="lg" className="bg-body-tertiary w-100 mt-3">
    <Navbar
      expand="lg"
      className="bg-dark navbar-dark w-auto mt-3 mx-3 rounded-top-3"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {username ? `Hello, ${username}` : "ClothesRental"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="ms-5">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/chat" className="ms-5">
              Chat
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="ms-5">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/account" className="ms-5">
              Account
            </Nav.Link>
            <Nav.Link as={Link} to="/lend" className="ms-5">
              Lend
            </Nav.Link>
            <Nav.Link as={Link} to="/rent" className="ms-5">
              Rent
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
