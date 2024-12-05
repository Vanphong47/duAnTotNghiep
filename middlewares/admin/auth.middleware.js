const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
const system = require("../../config/system");
module.exports.requireAuth = async (req, res, next) => {
  console.log(req.cookies.token);
  if (!req.cookies.token) {
    res.redirect(`/${system.prefixAdmin}/auth/login`);
    return;
  }
  try {
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
      status: "active",
    }).select("-password");
    if (!user) {
      res.redirect(`/${system.prefixAdmin}/auth/login`);
      return;
    }
    const role = await Role.findOne({
      _id: user.role_id,
      deleted: false,
    });
    res.locals.user = user; // trả về giao diện các thông tin user
    res.locals.role = role;
    next();
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/auth/login`);
  }
};
