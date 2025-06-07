const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  drug: { type: mongoose.Schema.Types.ObjectId, ref: "Drug" },
  quantity: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
