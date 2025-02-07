const User = require("../../model/user.model");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const records = await User.find(find);
  console.log(records);
  res.render("admin/pages/user/user.pug", {
    pageTitle: "Danh sách người dùng",
    records: records,
  });
};
