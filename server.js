import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// configuration
dotenv.config(); // Detta laddar miljövariabler från en .env-fil
const app = express(); // Detta skapar upp en express-applikation
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;
const menuRoutes = require("./routes/menu");

// middleware
app.use(express.json());

// routes
app.use("/api/menu", menuRoutes);

database.on("error", (error) => {
  console.error("Database connection error:", error);
});

database.once("connected", () => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
