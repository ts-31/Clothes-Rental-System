import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import OrderModel from "../components/OrderModel";
import config from "../config";

export default function ViewClothes() {
  const [lender, setLender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state || {};

  if (!post) {
    return <div>No post data available</div>;
  }

  useEffect(() => {
    const fetchUserNameAndId = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/api/auth/user/${post.author}`
        );
        const data = await response.json();
        console.log("DATA: ", data);
        if (data && data.username) {
          setLender(data);
        } else {
          setLender(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUserNameAndId();
  }, [post.author]);

  const handleChatClick = (receiver) => {
    if (lender) {
      navigate("/chat", { state: { receiver } });
    }
  };

  return (
    <div className="container my-3" style={{ maxWidth: "1200px" }}>
      <div
        className="row bg-light mx-auto shadow-lg rounded p-4"
        style={{ borderRadius: "16px" }}
      >
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={post.photoUrl}
            alt={post.clothingType}
            className="img-fluid rounded"
            style={{
              maxHeight: "500px",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center text-center">
          <h1 className="display-5 text-primary font-weight-bold mb-4">
            {post.clothingType}
          </h1>

          <p className="lead mb-2">
            <strong>Brand:</strong> {post.brand}
          </p>
          <p className="lead mb-2">
            <strong>Size:</strong> {post.size}
          </p>
          <p className="lead mb-2">
            <strong>Gender:</strong> {post.gender}
          </p>
          <p className="lead mb-2">
            <strong>Condition:</strong> {post.condition}
          </p>
          <p className="lead mb-2">
            <strong>Rental Price:</strong> ₹{post.rentalPrice}
          </p>
          <p className="lead mb-2">
            <strong>Deposit:</strong> ₹{post.deposit}
          </p>

          <div className="lead mb-4">
            <strong>Description:</strong>
            <p style={{ lineHeight: "1.5", marginTop: "8px" }}>
              {post.description}
            </p>
          </div>

          <p className="lead mb-3">
            <strong>Location:</strong> {post.location}
          </p>

          <div className="d-flex flex-column flex-md-row justify-content-center mt-4">
            <Button
              className="btn btn-primary btn-lg me-md-2 mb-2 mb-md-0"
              style={{ borderRadius: "50px", padding: "12px 30px" }}
              onClick={() => setModalShow(true)}
            >
              Rent Now
            </Button>
            <OrderModel
              show={modalShow}
              onHide={() => setModalShow(false)}
              post={post}
              lender={lender}
            />
            <button
              className="btn btn-outline-primary btn-lg mb-2 mb-md-0"
              style={{ borderRadius: "50px", padding: "12px 30px" }}
              onClick={() => handleChatClick(lender)}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : `Chat with ${lender?.username || "Renter"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
