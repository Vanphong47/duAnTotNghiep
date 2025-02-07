const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/client/cart.controller.js");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/", cartController.index);

router.get(
  "/delete/:productId",
  authMiddleware.requireAuth,
  cartController.delete
);

router.post(
  "/add/:productId",
  authMiddleware.requireAuth,
  cartController.addPost
);

router.get(
  "/update/:productId/:quantity",
  authMiddleware.requireAuth,
  cartController.update
);

module.exports = router;
