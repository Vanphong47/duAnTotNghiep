const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/article.controller.js");

router.get("/", controller.new);

router.get("/detail/:id", controller.detail);

module.exports = router;
