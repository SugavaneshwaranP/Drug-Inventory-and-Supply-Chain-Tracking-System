const express = require("express");
const router = express.Router();
const Stock = require("../models/StockModel"); // Ensure you have a Mongoose model

// Add stock to the database
router.post("/", async (req, res) => {
  try {
    const { drugName, stockStatus, numberOfStocks, drugArrivalDate, aiAgeRecommendation } = req.body;

    if (!drugName || !stockStatus || !numberOfStocks) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStock = new Stock({
      drugName,
      stockStatus,
      numberOfStocks,
      drugArrivalDate,
      aiAgeRecommendation,
    });

    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
