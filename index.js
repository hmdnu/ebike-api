import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// routes
import userRoutes from "./routes/User.js";
import rentalRoutes from "./routes/Rental.js";
import stationRoutes from "./routes/Station.js";

import Station from "./models/Station.js";

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  // Add other required headers here

  if (req.method === "OPTIONS") {
    // Handle preflight requests (OPTIONS)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(204).end();
  }

  next();
});

// database connection
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "e-bike",
  })
  .then(() => {
    app.listen(port, () => console.log("server running on port", port));
    console.log("Database is connected");
  })
  .catch((err) => console.log("Failed to connect to database", err));

app.use("/user", userRoutes);
app.use("/rental", rentalRoutes);
app.use("/station", stationRoutes);
