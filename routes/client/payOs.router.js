const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/client/payOs.controller");

router.post("/create-payment-link", Controller.create);

module.exports = router;
