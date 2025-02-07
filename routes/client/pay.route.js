const express = require("express");
const router = express.Router();
const payController = require("../../controllers/client/pay.controller.js");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/", authMiddleware.requireAuth, payController.index);

router.post("/order", authMiddleware.requireAuth, payController.order);

router.get(
  "/success/:orderId",
  authMiddleware.requireAuth,
  payController.success
);

module.exports = router;
