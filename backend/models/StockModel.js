const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  drugName: { type: String, required: true, unique: true },
  stockStatus: { type: String, required: true },
  numberOfStocks: { type: Number, required: true },
  drugArrivalDate: { type: String },
  aiAgeRecommendation: { type: String },
});

module.exports = mongoose.model("Stock", StockSchema);
