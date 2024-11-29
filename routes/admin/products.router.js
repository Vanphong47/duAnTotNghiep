const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

// const storageMulter = require("../../helpers/storage.helper");
// Hàm xử lí lưu ảnh vào public
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, prefix + "-" + file.originalname);
//   },
// });

//Hết hàm xử lí lưu ảnh vào public
// const upload = multer({ storage: storage });
const upload = multer();
const controller = require("../../controllers/admin/products.controller");

const validate = require("../../validates/admin/produc.validate");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
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

router.get("/detail/:id", controller.detail);

module.exports = router;
