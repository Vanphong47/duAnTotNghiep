const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: String,
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String,
      email: String,
      city: String,
      notes: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: String,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
