import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const {token} = useParams()
  
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await Axios.post(`https://weather-app-beta-five-74.vercel.app/auth/reset-password/${token}`, {
          password,
        });
        console.log(response);
        if (response.data.status) {
          navigate('/login');
        }
        console.log(response.data);
      } catch (error) {
        console.log("Error resetting password:", error);
      }
    };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  )
};

export { ResetPassword }; // Export ResetPassword as named export
