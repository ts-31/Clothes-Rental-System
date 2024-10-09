import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../main";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const { username, setUsername, logout } = useContext(AuthContext);
  const [logoutMsg, setLogoutMsg] = useState("");

  const handleLogout = () => {
    logout();
    setLogoutMsg("Logout successfully");
  };

  const openOrderRoute = () => {
    navigate("/orders");
  };

  return (
    <div className="d-flex flex-column gap-3">
      {logoutMsg && (
        <div className="text-center mb-3 text-success">{logoutMsg}</div>
      )}
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={openOrderRoute}>Orders</Button>
    </div>
  );
}
