const express = require("express");
const router = express.Router();
const infomationController = require("../../controllers/client/information.controller");

router.get("/huong-dan-do-size", infomationController.size);
router.get("/bao-hanh-bao-quan", infomationController.guarantee);
router.get("/giao-hang-doi-hang", infomationController.delivery);
router.get("/thanh-toan", infomationController.pay);

module.exports = router;
