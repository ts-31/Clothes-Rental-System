import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DisplayOrderModal = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{order.clothingType}</h4>
        <p>
          <strong>Brand:</strong> {order.brand}
        </p>
        <p>
          <strong>Lender:</strong> {order.lender?.username}
        </p>
        <p>
          <strong>Size:</strong> {order.size}
        </p>
        <p>
          <strong>Gender:</strong> {order.gender}
        </p>
        <p>
          <strong>Condition:</strong> {order.condition}
        </p>
        <p>
          <strong>Rental Price:</strong> ₹{order.rentalPrice}
        </p>
        <p>
          <strong>Deposit:</strong> ₹{order.deposit}
        </p>
        <p>
          <strong>Description:</strong> {order.description}
        </p>
        <p>
          <strong>Location:</strong> {order.location}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisplayOrderModal;
