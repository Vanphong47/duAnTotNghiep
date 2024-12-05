const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");
// const upload = multer()

const controller = require("../../controllers/admin/article.controller");

router.get("/", controller.index);
module.exports = router;
