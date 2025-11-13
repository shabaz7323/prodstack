import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.get("/", (req, res) => res.send("Backend API Running ✅"));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/prodstack")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
