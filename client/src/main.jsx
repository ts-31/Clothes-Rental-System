import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

let root = createRoot(document.getElementById("root"));

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const logout = () => {
    localStorage.clear();
    setUsername(null);
  };

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);
    setUsername(user.username);
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
