const Account = require("../../model/account.model");
const md5 = require("md5");
const system = require("../../config/system");

// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Thông tin cá nhân",
  });
};
// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Chỉnh sửa cá nhân",
  });
};
// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  await Account.updateOne(
    {
      _id: id,
      deleted: false,
    },
    req.body
  );
  req.flash("success", "Cập nhật tài khoản thành công!");
  res.redirect(`/${system.prefixAdmin}/my-account`);
};
