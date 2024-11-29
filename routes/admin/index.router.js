const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./product-category.router");
const rolesRouter = require("./role.route");
const accountsRouter = require("./account.route");
const authRouter = require("./auth.router");
const systemConfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);
  app.use(`${PATH_ADMIN}/products`, productsRouter);
  app.use(`${PATH_ADMIN}/products-category`, productsCategoryRouter);
  app.use(`${PATH_ADMIN}/roles`, rolesRouter);
  app.use(`${PATH_ADMIN}/accounts`, accountsRouter);
  app.use(`${PATH_ADMIN}/auth`, authRouter);
};
