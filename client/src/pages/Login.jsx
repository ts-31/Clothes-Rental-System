import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./style.css";
import { AuthContext } from "../main";
import config from "../config";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;
  const { login } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [formStatus, setFormStatus] = useState({
    error: "",
    successMsg: "",
    loading: false,
  });
  const [inputFields, setInputFields] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    if (isSignup) {
      handleRegister(event);
    } else {
      handleLogin(event);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setFormStatus({ ...formStatus, loading: true, successMsg: "", error: "" });
    await delay(500);
    try {
      const response = await fetch(`${config.API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputFields.email,
          username: inputFields.username,
          password: inputFields.password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setFormStatus({
          error: data.message || "An unexpected error occurred.",
        });
      } else {
        const data = await response.json();
        setFormStatus({
          error: "",
          successMsg: "User successfully registered",
          loading: false,
        });
        setInputFields({ email: "", username: "", password: "" });
      }
    } catch (error) {
      setFormStatus({ error: error.message, loading: false });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setFormStatus({ error: "", successMsg: "", loading: true });
    await delay(500);
    try {
      const response = await fetch(`${config.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputFields.email,
          password: inputFields.password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setFormStatus({ error: data.message, loading: false });
      } else {
        const data = await response.json();
        console.log("Data: ", data);
        const { token, user } = data;
        login(token, user);
        setFormStatus({
          error: "",
          successMsg: "Login Successful",
          loading: false,
        });
        setInputFields({ email: "", username: "", password: "" });
      }
    } catch (error) {
      setFormStatus({ error: error.message, loading: false });
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleToggle = () => setIsSignup(!isSignup);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="login-container bg-white border border-primary rounded ">
      <div>
        {message && <div className="alert alert-warning">{message}</div>}
      </div>
      <Form className="p-4" onSubmit={handleSubmit}>
        <div className="h4 text-center mb-4">
          {isSignup ? "Sign Up" : "Log In"}
        </div>
        {formStatus.error && (
          <div className="text-center mb-3 text-danger">{formStatus.error}</div>
        )}
        {formStatus.successMsg && (
          <div className="text-center mb-3 text-success">
            {formStatus.successMsg}
          </div>
        )}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={inputFields.email}
            placeholder="Email"
            onChange={handleInputChange}
            required
            autoComplete="email"
          />
        </Form.Group>

        {isSignup && (
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={inputFields.username}
              placeholder="Username"
              onChange={handleInputChange}
              required
              autoComplete="username"
            />
          </Form.Group>
        )}

        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={inputFields.password}
            placeholder="Password"
            onChange={handleInputChange}
            required
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
        </Form.Group>

        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={formStatus.loading}
        >
          {formStatus.loading
            ? isSignup
              ? "Signing Up..."
              : "Logging In..."
            : isSignup
            ? "Sign Up"
            : "Log In"}
        </Button>

        <div className="d-grid justify-content-center mt-3">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handleToggle}
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
