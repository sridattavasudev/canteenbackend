const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    product_title: { type: String },
    list_price: { type: String },
    p_image: { type: String },
    quantity: { type: Number },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

exports.Item = Item;
