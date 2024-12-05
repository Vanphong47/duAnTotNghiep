const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/trash.controller");

router.get("/", controller.index);
router.delete("/delete/:id", controller.deleteItem);
router.patch("/undo/:id", controller.undo);
router.get("/detail/:id", controller.detail);

module.exports = router;
