const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: Number,
    email: String,
    password: String,
    tokenUser: String,
    phone: String,
    avatar: String,
    status: {
      type: String,
      default: "active",
    },
    accepFriends: Array,
    requestFriends: Array,
    friendsList: [
      {
        user_id: String,
        room_chat_id: String,
      },
    ],
    statusOnline: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
