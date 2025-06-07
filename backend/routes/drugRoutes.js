const express = require("express");
const Drug = require("../models/Drug"); // Ensure the model is correctly imported

const router = express.Router();

// Add a new drug
router.post("/", async (req, res) => {
  try {
    const { name, stock } = req.body;
    const addedAt = new Date().toLocaleString(); // Automatically add timestamp

    const newDrug = new Drug({ name, stock, addedAt });

    const savedDrug = await newDrug.save();
    res.status(201).json(savedDrug);
  } catch (error) {
    res.status(500).json({ message: "Failed to add drug", error });
  }
});

// Get all drugs
router.get("/", async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drugs", error });
  }
});

module.exports = router;
