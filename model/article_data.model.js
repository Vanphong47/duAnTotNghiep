const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false, // mặc định để false cho sản phẩm
    },
    // deletedAt: Date,
    createdBy: {
      accountId: String,
      createdAt: Date,
    },
    deletedBy: {
      accountId: String,
      deletedAt: Date,
    },
    updatedBy: {
      accountId: String,
      updatedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema, "articles");

module.exports = Article;
