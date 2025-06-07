const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, required: true, enum: ["Active", "Pending", "Inactive"] },
    successRate: { type: Number, default: 94 },
    deliveryTime: { type: String, default: "4days" },
    rating: { type: Number, default: 4.5 },
    totalOrders: { type: Number, default: 1 },
    pendingPayments: { type: String, default: "₹500" },
});

module.exports = mongoose.model("Supplier", SupplierSchema);
