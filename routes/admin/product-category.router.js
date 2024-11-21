const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require("../../validates/admin/product-category.validate");

// Hàm xử lí lưu ảnh vào public
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, prefix + "-" + file.originalname);
  },
});

//Hết hàm xử lí lưu ảnh vào public
const upload = multer({ storage: storage });
const controller = require("../../controllers/admin/product-category.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.patch("/change-status/:status/:id", controller.changeStatus);
router.delete("/delete/:id", controller.deleteItem);

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
  validate.createPost,
  controller.editPatch
);
// router.get("/detail/:id", controller.detail);
module.exports = router;
