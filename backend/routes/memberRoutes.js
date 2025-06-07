const express = require("express");
const router = express.Router();
const Member = require("../models/MemberModel");

// ✅ Add New Member
router.post("/add", async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newMember = new Member({ name, email, phone, role });
    await newMember.save();

    res.status(201).json({ message: "Member added successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get All Members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update Member
router.put("/update/:id", async (req, res) => {
  try {
    const { name, email, phone, role, status } = req.body;
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, role, status },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found!" });
    }

    res.status(200).json({ message: "Member updated successfully!", updatedMember });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete Member
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found!" });
    }

    res.status(200).json({ message: "Member deleted successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
