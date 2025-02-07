const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
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
    featured: String, // Nổi bật
    view: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
