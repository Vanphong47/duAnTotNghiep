const express = require("express");
const router = express.Router();
const multer = require("multer");

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

const accountsController = require("../../controllers/admin/account.controller.js");

router.get("/", accountsController.index);

router.get("/create", accountsController.create);

router.post("/create", upload.single("avatar"), accountsController.createPost);

// router.get("/edit/:id", accountsController.edit);

// router.patch(
//   "/edit/:id",
//   upload.single("avatar"),
//   uploadCloud.uploadSingle,
//   accountsController.editPatch
// );
module.exports = router;
