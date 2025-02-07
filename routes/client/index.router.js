const productRouter = require("./product.route");
const homeRouter = require("./home.router");
const searchRoutes = require("./search.router.js");
const articleRouter = require("./article.router");
const introRouter = require("./intro.router");
const cart = require("./cart.route");
const checkOutRoute = require("./checkout.route.js");
const payRoute = require("./pay.route.js");
const userRouter = require("./user.router.js");
const infomartionRouter = require("./information.js");
const payOsRouter = require("./payOs.router.js");

const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const cartMiddleware = require("../../middlewares/client/cart.milddleware.js");
const userMiddleware = require("../../middlewares/client/user.milddleware.js");
const settingMiddleware = require("../../middlewares/client/setting.middleware.js");

module.exports = (app) => {
  app.use(categoryMiddleware.category);

  app.use(cartMiddleware.cart);

  app.use(userMiddleware.infoUser);

  app.use(settingMiddleware.settingGeneral);

  app.use("/", homeRouter);

  app.use("/products", productRouter);

  app.use("/search", searchRoutes);

  app.use("/article", articleRouter);

  app.use("/intro", introRouter);

  app.use("/cart", cart);

  app.use("/checkout", checkOutRoute);

  app.use("/pay", payRoute);

  app.use("/user", userRouter);

  app.use("/information", infomartionRouter);

  app.use("/payOs", payOsRouter);
};
