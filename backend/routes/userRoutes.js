const express = require("express");
const { registerUser, authUser } = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", authUser);

router.get("/getAllUsers", protect, admin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getByUserId?", async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateUser?", protect, async (req, res) => {
  const { userId } = req.query;
  const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(400).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/deleteUser?", protect, async (req, res) => {
  const { userId } = req.query;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User Successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
