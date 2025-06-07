const mongoose = require("mongoose");

const DrugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  addedAt: { type: String, default: new Date().toLocaleString() }, // Add default timestamp
});

module.exports = mongoose.model("Drug", DrugSchema);
