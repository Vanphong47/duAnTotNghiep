const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require("../../validates/admin/product-category.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js"); //upload cloud ảnh

const upload = multer();
const controller = require("../../controllers/admin/product-category.controller");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.delete("/delete/:id", controller.deleteItem);
router.patch("/change-multi", controller.changeMulti);

router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.editPatch
);
// router.get("/detail/:id", controller.detail);
module.exports = router;
