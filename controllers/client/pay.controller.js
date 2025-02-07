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
      product.priceNew = product.priceNew.toLocaleString("vi-VN");
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
//[post] /pay/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const infoUser = req.body;
  const orderInfo = {
    cart_id: cartId,
    userInfo: infoUser,
    products: [],
  };
  const cart = await Cart.findOne({
    _id: cartId,
  });
  for (const product of cart.products) {
    const infoProduct = await Product.findOne({
      _id: product.product_id,
    });
    const objectProduct = {
      product_id: product.product_id,
      price: infoProduct.price,
      discountPercentage: infoProduct.discountPercentage,
      quantity: product.quantity,
    };
    orderInfo.products.push(objectProduct);
  }
  console.log(cart);
  const order = new Order(orderInfo);
  await order.save();
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      products: [],
    }
  );
  res.redirect(`/pay/success/${order.id}`);
};
//[Get] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
    });
    order.totalPrice = 0;
    for (const product of order.products) {
      const infoProduct = await Product.findOne({
        _id: product.product_id,
      });
      product.title = infoProduct.title;
      product.thumbnail = infoProduct.thumbnail;
      console.log(product.thumbnail);
      product.priceNew = (
        product.price *
        (1 - product.discountPercentage / 100)
      ).toFixed(0);
      product.totalPrice = product.priceNew * product.quantity;
      order.totalPrice += product.totalPrice;
      setInterval(() => {
        checkPaid(order.totalPrice, order.userInfo.fullName);
      }, 1000);
    }
    async function checkPaid(price, content) {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbyNQcWIKf3SCLhGkrnPcIxewbUGbktJEEKxiFDjw9BvBJbrTCNIv15_XiqANa41wAd-/exec"
        );
        const data = await res.json();
        const lastPaid = data.data[data.data.length - 1];
        lastPrice = lastPaid["Giá trị"];
        lastContent = lastPaid["Mô tả"];
        console.log(data.data);
        if (lastPrice.length >= price && lastContent.includes(content)) {
          alert("Thanh toán thành công");
        } else {
          console.log("Không thành công");
        }
      } catch (e) {
        console.log(e);
      }
    }
    res.render("client/pages/pay/success", {
      pageTitle: "Đặt hàng thành công!",
      order: order,
    });
  } catch (error) {
    console.error(error);
  }
};
