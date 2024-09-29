import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import "./Lend.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../main";
import config from "../config";

const Lend = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [photo, setPhoto] = useState(null);
  const { userId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    clothingType: "",
    brand: "",
    size: "",
    gender: "",
    condition: "",
    description: "",
    rentalPrice: "",
    deposit: "",
    location: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("clothingType", formData.clothingType);
    data.append("brand", formData.brand);
    data.append("size", formData.size);
    data.append("gender", formData.gender);
    data.append("condition", formData.condition);
    data.append("description", formData.description);
    data.append("rentalPrice", formData.rentalPrice);
    data.append("deposit", formData.deposit);
    data.append("location", formData.location);
    data.append("author", userId);
    data.append("photo", photo);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch(`${config.API_URL}/api/post/lend`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        setErrorMsg(data.message || "Something went wrong, please try again.");
      } else {
        const data = await response.json();
        setLoading(false);
        setErrorMsg("");
        setSuccessMsg(data.message);
        setFormData({
          clothingType: "",
          brand: "",
          size: "",
          gender: "",
          condition: "",
          description: "",
          rentalPrice: "",
          deposit: "",
          location: "",
          author: "",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container mt-4 mb-4 form-container">
      <h2 className="text-center mb-4">Lend Your Clothes</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Clothing Type</label>
            <select
              className="form-select"
              name="clothingType"
              value={formData.clothingType}
              onChange={handleChange}
              required
            >
              <option value="">Select Clothing Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Party Wear">Party Wear</option>
              <option value="Formal Wear">Formal Wear</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Size</label>
            <input
              type="text"
              className="form-control"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Condition</label>
            <select
              className="form-select"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Worn">Worn</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Rental Price</label>
            <input
              type="number"
              className="form-control"
              name="rentalPrice"
              value={formData.rentalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Deposit</label>
            <input
              type="number"
              className="form-control"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Photos</label>
          <input
            type="file"
            className="form-control"
            name="photos"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            required
          />
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center ">
          {errorMsg && (
            <div className="text-center mb-3 text-danger">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-center mb-3 text-success">{successMsg}</div>
          )}
          {loading ? (
            <Button
              className=""
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Posting...
            </Button>
          ) : (
            <Button
              className=""
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Post
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Lend;
