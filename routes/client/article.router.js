const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/article.controller.js");

router.get("/", controller.new);

module.exports = router;
