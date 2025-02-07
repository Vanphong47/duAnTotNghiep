const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");

// [GET] /cart
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
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
};
// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  // console.log(exitProductInCart);
  console.log(productId);
  console.log(quantity);
  console.log(cartId);
  try {
    const cart = await Cart.findOne({
      _id: cartId,
    });

    const exitProductInCart = cart.products.find(
      (item) => item.product_id == productId
    );

    if (exitProductInCart) {
      const quantityNew = exitProductInCart.quantity + quantity;
      await Cart.updateOne(
        {
          _id: cartId,
          "products.product_id": productId,
        },
        {
          $set: { "products.$.quantity": quantityNew },
        }
      );
    } else {
      const objectCart = {
        product_id: productId,
        quantity: quantity,
      };
      await Cart.updateOne(
        {
          _id: cartId,
        },
        {
          $push: { products: objectCart },
        }
      );
    }
    req.flash("success", "Đã thêm vào giỏ hàng!");
  } catch (error) {
    req.flash("error", "Thêm sản phẩm vào giỏ hàng không thành công!");
  }
  res.redirect("back");
};
//[Get] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: { products: { product_id: productId } },
    }
  );
  req.flash("success", "Xóa sản phẩm trong giỏ hàng thành công!");

  res.redirect("back");
};

//[Get] /update/:productId/:quantityId
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  try {
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: { "products.$.quantity": quantity },
      }
    );
    req.flash("success", "Cập nhật số lượng trong giỏ hàng thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật số lượng trong giỏ hàng thành công!");
  }

  res.redirect("back");
};
