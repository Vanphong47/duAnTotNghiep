const Product = require("../../model/product.model");
const Account = require("../../model/account.model.js");
const system = require("../../config/system");

//[GET] admin/trashbin
module.exports.index = async (req, res) => {
  let find = {
    deleted: true,
  };

  const records = await Product.find(find);
  // lấy ra tên người xóa
  for (const product of records) {
    const account = await Account.findOne({
      _id: product.deletedBy.accountId,
    });
    if (account) {
      product.deletedBy.fullName = account.fullName;
    }
    console.log(account);
  }
  res.render("admin/pages/trashbin/trash.pug", {
    pageTitle: "Thùng rác",
    products: records,
  });
};

//[DELETE] admin/trashbin/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({
      _id: id,
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect("back");
};

//[GET] /admin/trashbin/undo/:id
module.exports.undo = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne(
      {
        _id: id,
      },
      {
        deleted: false,
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("back");
};
// [GET] /admin/trashbin/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
      deleted: true,
    });
    res.render("admin/pages/trashbin/detail", {
      pageTitle: "chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/products`);
  }
};
