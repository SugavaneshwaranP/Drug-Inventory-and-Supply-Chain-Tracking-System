const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const drugRoutes = require("./routes/drugRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const stockRoutes = require("./routes/stockRoutes");
const userRoutes = require("./routes/userRoutes"); 
const memberRoutes = require("./routes/memberRoutes"); // ✅ Added Member Routes

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Improved CORS Setup
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Allow React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB Connection with Try-Catch
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/drug_inventory";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/drugs", drugRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/members", memberRoutes); // ✅ Added Member Routes

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
