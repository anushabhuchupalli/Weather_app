import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import dotenv from 'dotenv';
dotenv.config(); 
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, `123456789` );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


// Signup route
router.post("auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, `123456789`, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({ status: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot password route
router.post("auth/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    const token = jwt.sign({ userId: user._id }, `123456789`, { expiresIn: "24h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anushabhuchupalli@gmail.com",
        pass: "hfom ojug eezx bgcn",
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");

    const mailOptions = {
      from: "anushabhuchupalli@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ status: true, message: "Email sent for password reset" });
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Reset password route
router.post("auth/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = await jwt.verify(token, `123456789`);
    console.log("Decoded token:", decoded);
    const id = decoded.userId;
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate( id, { password: hashPassword }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Password updated successfully");

    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});


// Verify route (protected)
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, `123456789`);
    next()

  } catch (err) {
    return res.json(err);
  }
};



router.get("/verify",verifyUser, (req, res) => {
  return res.json({status: true, message: "authorized"})
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({status: true})
})


export { router as UserRouter };

export default router;