import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendverificationEmail,
  userWelcomeEmail,
} from "../mailtrap/emails.js";
import userModel from "../models/user.model.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";

const genAI = new GoogleGenerativeAI("AIzaSyDwid5pzQlmLbuK9so4QcwFpepMa0fkOyk"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Signup Controller
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await userModel.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new userModel({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    await sendverificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Verify Email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await userModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Invaild or Expire Verification Code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await userWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Successfully Verified Email",
      user: {
        ...user._doc,
        password: undefined, // Remove password from the response
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while verifying the email.",
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  console.log("Request Body:", req.body); // Debug log
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "All fields are required!",
      });
    }
    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Invaild Credentials!!",
      });
    }

    const isPasswordVaild = await bcryptjs.compare(password, user.password);
    if (!isPasswordVaild) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid Crenditals",
      });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastlogin = Date.now();
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        ...user._doc,
        password: undefined, // Remove password from the response
      },
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "All fields are required!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "You are New User Please Registred First",
      });
    }

    //Gen. Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 + 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    //sending reset email

    await sendPasswordResetEmail(
      user.email,
      `https://notes-summarizer-rklu.onrender.com//reset-password/${resetToken}`
    );
    return res.status(200).json({
      success: true,
      error: false,
      message: "Reset Password Link Sent Successfully ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//Reset Password Controller
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
    });

    const userwithToken = await userModel.findOne({
      resetPasswordToken: { $gt: Date.now() },
    });

    if (!user && !userwithToken) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Invaild or expired reset token",
      });
    }

    //Update Password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    sendResetSuccessEmail(user.email);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
//Auth Controller
export const checkAuth = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      user,
    });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

//Summarize Controller
export const summarizeText = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res
      .status(400)
      .json({ error: "Text is required for summarization" });
  }
  try {
    const result = await model.generateContent(`${text}\n\n`);
    const summary = result?.response?.text();

    if (summary) {
      return res.status(200).json({ summary });
    } else {
      throw new Error("No summary generated");
    }
  } catch (error) {
    console.error("Error summarizing text:", error);
    res.status(500).json({
      error: "Failed to generate summary",
    });
  }
};
