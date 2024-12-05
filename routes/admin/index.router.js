const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./product-category.router");
const rolesRouter = require("./role.route");
const accountsRouter = require("./account.route");
const authRouter = require("./auth.router");
const trashRouter = require("./trashbin.router");
const articleRouter = require("./article.router");
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware"); // middleware cho các trang link tới đăng nhập

module.exports = (app) => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(
    `${PATH_ADMIN}/dashboard`,
    authMiddleware.requireAuth,
    dashboardRouter
  );
  app.use(`${PATH_ADMIN}/products`, authMiddleware.requireAuth, productsRouter);
  app.use(
    `${PATH_ADMIN}/products-category`,
    authMiddleware.requireAuth,
    productsCategoryRouter
  );
  app.use(`${PATH_ADMIN}/roles`, authMiddleware.requireAuth, rolesRouter);
  app.use(`${PATH_ADMIN}/accounts`, authMiddleware.requireAuth, accountsRouter);
  app.use(`${PATH_ADMIN}/auth`, authRouter);
  app.use(`${PATH_ADMIN}/trashbin`, authMiddleware.requireAuth, trashRouter);
  app.use(`${PATH_ADMIN}/article`, authMiddleware.requireAuth, articleRouter);
};
