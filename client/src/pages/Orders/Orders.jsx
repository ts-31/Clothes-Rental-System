import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import DisplayOrderModal from "./DisplayOrderModel";
import config from "../../config";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchOrders(userId);
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/order/orders?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("ERROR:", error.message);
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center">Your Orders</h2>
      {orders.map((order) => (
        <Card
          className="my-3 p-3"
          key={order._id}
          onClick={() => handleOrderClick(order)}
        >
          <Row className="align-items-center">
            <Col xs={12} md={3} className="mb-3 mb-md-0 text-center">
              <Card.Img
                src={order.photoUrl || "https://via.placeholder.com/150"}
                alt="Order Image"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </Col>

            <Col xs={12} md={9} className="text-center text-md-start">
              <Card.Body>
                <Card.Title>Type: {order.clothingType}</Card.Title>
                <Card.Text>Brand: {order.brand}</Card.Text>
                <Card.Text>Rent: ${order.rentalPrice}</Card.Text>
                <Card.Text>Lender: {order.lender?.username}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      {selectedOrder && (
        <DisplayOrderModal
          show={!!selectedOrder}
          onHide={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default Order;
