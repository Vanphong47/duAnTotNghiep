const md5 = require("md5");
const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
const system = require("../../config/system");
const generateHelpers = require("../../helpers/generate.helper"); // hàm tạo 30 kí tự ngẫu nhiên
const { response } = require("express");
//[GET] /admin/account/
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find);
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
    });
    record.role = role;
  }
  res.render("admin/pages/accounts/accounts.pug", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};
//[GET] /admin/account/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};
//[POST] /admin/account/create
module.exports.createPost = async (req, res) => {
  //   if (res.locals.role.permissions.includes("account_create")) {
  //     req.body.token = generateHelpers.generateRandomString(30);
  //     req.body.password = md5(req.body.password);
  //     const record = new Account(req.body);
  //     await record.save();
  //     res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  //   } else {
  //     res.send(false);
  //   }

  req.body.token = generateHelpers.generateRandomString(30);
  req.body.password = md5(req.body.password);
  if (req.file && req.file.filename) {
    req.body.avatar = `/uploads/${req.file.filename}`; // lưu tên file ảnh vào data
  }
  const record = new Account(req.body);
  await record.save();
  res.redirect(`/${system.prefixAdmin}/accounts`);
};
//[GET] /admin/account/edit/:id
// module.exports.edit = async (req, res) => {
//   try {
//     const data = await Account.findOne({
//       _id: req.params.id,
//       deleted: false,
//     });
//     const roles = await Role.find({
//       deleted: false,
//     });
//     res.render("admin/pages/accounts/edit.pug", {
//       pageTitle: "Chỉnh sửa tài khoản",
//       data: data,
//       roles: roles,
//     });
//   } catch (error) {
//     res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
//   }
// };
//[PATCH] /admin/account/edit/:id
// module.exports.editPatch = async (req, res) => {
//   const id = req.params.id;
//   if (req.body.password) {
//     req.body.password = md5(req.body.password);
//   } else {
//     delete req.body.password;
//   }
//   await Account.updateOne(
//     {
//       _id: id,
//       deleted: false,
//     },
//     req.body
//   );
//   req.flash("success", "Cập nhật tài khoản thành công!");
//   res.redirect("back");
// };
