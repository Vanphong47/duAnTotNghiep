const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");
const Order = require("../../model/order.model");

//[Get] /pay
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  cart.totalPrice = 0;
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id,
      }).select("thumbnail title slug price discountPercentage");
      product.priceNew = product.price * (1 - product.discountPercentage / 100);
      product.priceNew = product.priceNew.toFixed(0);
      item.productInfo = product;
      item.totalPrice = item.quantity * product.priceNew;
      cart.totalPrice += item.totalPrice;
    }
  }
  res.render("client/pages/pay/index.pug", {
    pageTitle: "Đặt hàng",
    cartDetail: cart,
  });
};
