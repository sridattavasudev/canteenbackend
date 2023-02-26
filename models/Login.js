const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: String, default: "0" },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", loginSchema);

exports.Login = Login;
