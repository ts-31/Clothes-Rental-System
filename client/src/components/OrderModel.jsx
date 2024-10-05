import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import config from "../config";
import { AuthContext } from "../main";

export default function OrderModel(props) {
  const { post, lender } = props;
  const { userId } = useContext(AuthContext);

  const placeOrder = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/order/orderClothes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          lender: lender.id,
          clothingType: post.clothingType,
          brand: post.brand,
          size: post.size,
          gender: post.gender,
          condition: post.condition,
          description: post.description,
          rentalPrice: post.rentalPrice,
          deposit: post.deposit,
          location: post.location,
          photoUrl: post.photoUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        props.onHide();
      } else {
        alert("Error placing order: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-modal"
      style={{
        maxHeight: "100vh",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "55vh",
          overflowY: "auto",
        }}
      >
        <h4>{post.clothingType}</h4>
        <p>
          <strong>Brand:</strong> {post.brand}
        </p>
        <p>
          <strong>Lender:</strong> {lender?.username}
        </p>
        <p>
          <strong>Size:</strong> {post.size}
        </p>
        <p>
          <strong>Gender:</strong> {post.gender}
        </p>
        <p>
          <strong>Condition:</strong> {post.condition}
        </p>
        <p>
          <strong>Rental Price:</strong> ₹{post.rentalPrice}
        </p>
        <p>
          <strong>Deposit:</strong> ₹{post.deposit}
        </p>
        <p>
          <strong>Description:</strong> {post.description}
        </p>
        <p>
          <strong>Location:</strong> {post.location}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={placeOrder}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
