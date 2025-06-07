const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }, // Role field
});

module.exports = mongoose.model("User", UserSchema);
