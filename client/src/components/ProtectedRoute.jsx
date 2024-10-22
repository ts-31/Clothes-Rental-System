import React, { useContext } from "react";
import { AuthContext } from "../main";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const { username } = useContext(AuthContext);

  if (!username) {
    return (
      <Navigate to="/login" state={{ message: "You need to login first" }} />
    );
  }

  return element;
}
