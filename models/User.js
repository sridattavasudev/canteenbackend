const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    orders: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
