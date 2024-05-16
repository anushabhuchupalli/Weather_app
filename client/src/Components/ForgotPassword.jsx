import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:3000/auth/forgot-password", {
        email,
      });

      if (response.data.status) {
        alert("Check your email for the reset password link.");
        navigate('/login');
      } else {
        alert("User not registered."); // Handle case when user is not found
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Error sending request.");
    }
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
