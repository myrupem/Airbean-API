import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import menuRoutes from "./routes/menu.js";
import orderRouter from "./routes/order.js";

// configuration
dotenv.config(); // Detta laddar miljövariabler från en .env-fil
const app = express(); // Detta skapar upp en express-applikation
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// middleware
app.use(express.json());

// routes
app.use("/api/menu", menuRoutes);

// Order routes
app.use("/api/orders", orderRouter);

database.on("error", (error) => {
  console.error("Database connection error:", error);
});

database.once("connected", () => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
