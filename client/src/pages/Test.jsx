import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function test() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file is selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("http://localhost:5000/api/post/test", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Success: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Upload Photos</label>
      <input
        type="file"
        className="form-control"
        name="photos"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        required
      />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
