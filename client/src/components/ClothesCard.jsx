import React from "react";

export default function ClothesCard({ image, heading, price, name }) {
  return (
    <div className="card h-100 mb-3" style={{ width: "100%", border: "none" }}>
      <img
        className="card-img-top p-3"
        src={image}
        alt="Clothing item"
        style={{ height: "350px", objectFit: "cover" }}
      />
      <ul className="list-group list-group-flush text-center">
        <h6 className="list-group-item p-0 m-0" style={{ border: "none" }}>
          {heading}
        </h6>
        <li className="list-group-item p-0" style={{ border: "none" }}>
          {name}
        </li>
        <li
          className="list-group-item p-0"
          style={{ border: "none", color: "#8B2950" }}
        >
          ₹ {price} rent
        </li>
      </ul>
    </div>
  );
}
