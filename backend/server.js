import express from "express";
import authRoutes from "./routes/auth.route.js";
import summarizeRoute from "./routes/summarize.js";
import { connectDB } from "./db/connectDB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://notes-summarizer-1ys7.onrender.com", // Add your frontend URL
      "http://localhost:3000", // Allow localhost during development
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
//Routes
app.use("/api", summarizeRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
