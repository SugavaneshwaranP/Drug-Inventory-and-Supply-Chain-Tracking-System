const express = require("express");
const Supplier = require("../models/Supplier"); // Import the Supplier model
const router = express.Router();

// Add Supplier (POST)
router.post("/", async (req, res) => {
    try {
        const newSupplier = new Supplier(req.body);
        const savedSupplier = await newSupplier.save();
        res.status(201).json(savedSupplier);
    } catch (error) {
        console.error("Error adding supplier:", error);
        res.status(500).json({ message: "Failed to add supplier" });
    }
});

// Get All Suppliers (GET)
router.get("/", async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching suppliers" });
    }
});

module.exports = router;
