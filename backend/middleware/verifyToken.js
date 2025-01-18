import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(400).json({
      success: false,
      error: true,
      message: "Unauthorized - You not get Provided Token",
    });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECERT);
    if (!decode) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Unauthorized - You not get Provided Token",
      });
    }
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("Error in verifytoken", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
