import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../main";

export default function Account() {
  const { username, setUsername, logout } = useContext(AuthContext);
  const [logoutMsg, setLogoutMsg] = useState("");
  const handleLogout = () => {
    logout();
    setLogoutMsg("Logout successfully");
  };
  return (
    <div>
      {logoutMsg && (
        <div className="text-center mb-3 text-success">{logoutMsg}</div>
      )}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
