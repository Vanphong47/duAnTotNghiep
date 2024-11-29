const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js"); //upload cloud ảnh

const upload = multer();

const accountsController = require("../../controllers/admin/account.controller.js");

router.get("/", accountsController.index);

router.get("/create", accountsController.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  accountsController.createPost
);

router.delete("/delete/:id", accountsController.deleteItem);

router.get("/edit/:id", accountsController.edit);

router.patch("/change-status/:status/:id", accountsController.changeStatus);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  accountsController.editPatch
);

module.exports = router;
