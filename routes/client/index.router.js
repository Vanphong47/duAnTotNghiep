const productRouter = require("./product.route");
const homeRouter = require("./home.router");
const articleRouter = require("./article.router");
const introRouter = require("./intro.router");

module.exports = (app) => {
  app.use("/", homeRouter);

  app.use("/products", productRouter);

  app.use("/article", articleRouter);

  app.use("/intro", introRouter);
};
