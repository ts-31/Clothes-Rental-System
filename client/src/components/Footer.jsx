import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4}>
            <h5>Clothes Rental</h5>
            <p>
              Rent high-quality formal and casual clothes for every occasion.
            </p>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/rentals">Rentals</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@clothesrental.com</li>
              <li>Phone: +1 234 567 8901</li>
              <li>Address: 123 Fashion Street, NY</li>
            </ul>
            <div className="social-icons">
              <a href="https://facebook.com">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p>
              &copy; {new Date().getFullYear()} Clothes Rental. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
