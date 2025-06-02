import express from "express";
import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();



// REGISTER
// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Användarnamnet är redan taget" });
    }

    const userId = uuidv4().slice(0, 5);
    const newUser = await User.create({
      userId,
      username,
      password,
    });

    res.status(201).json({
      message: "Användare skapad",
      userId: newUser.userId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fel vid registrering", error: err.message });
  }
});

// LOGIN
// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: "Felaktigt användarnamn eller lösenord" });
    }

    global.user = user;

    res.json({
      message: "Inloggning lyckades",
      userId: user.userId,
    });
  } catch (err) {
    res.status(500).json({ message: "Fel vid inloggning", error: err.message });
  }
});

// LOGOUT
// GET /api/auth/logout
router.get("/logout", (req, res) => {
  global.user = null;
  res.json({ message: "Utloggad, ingen användare inloggad" });
});

export default router;
