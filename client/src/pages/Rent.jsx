import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import ClothesCard from "../components/ClothesCard";
import config from "../config";

export default function Rent() {
  const [pageStatus, setPageStatus] = useState({
    loader: false,
    error: "",
  });
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetchLendPost();
  }, []);

  const fetchLendPost = async () => {
    setPageStatus({ loader: true });
    try {
      const response = await fetch(`${config.API_URL}/api/post/rent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        setPageStatus({
          ...pageStatus,
          loader: false,
          error: "Error fetching data",
        });
      }
      const data = await response.json();
      setPageStatus({ loader: false, error: "" });
      setPostData(data);
    } catch (error) {
      setPageStatus({ ...pageStatus, error: "Something went wrong..." });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {pageStatus.loader ? (
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row no-gutters">
            {postData.map((card, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 p-0"
                key={index}
              >
                <ClothesCard
                  image={card.photoUrl}
                  heading={card.clothingType}
                  price={card.rentalPrice}
                  name={card.brand}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {pageStatus.error && (
        <div className="text-center mb-3 text-danger">{pageStatus.error}</div>
      )}
    </div>
  );
}
