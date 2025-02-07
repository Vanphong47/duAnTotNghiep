const express = require("express");
const router = express.Router();
const checkoutController = require("../../controllers/client/checkout.controller.js");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get(
  "/checkOrder",
  authMiddleware.requireAuth,
  checkoutController.checkOrder
);

router.get("/", authMiddleware.requireAuth, checkoutController.index);

router.post("/order", authMiddleware.requireAuth, checkoutController.order);

router.get(
  "/success/:orderId",
  authMiddleware.requireAuth,
  checkoutController.success
);

module.exports = router;
