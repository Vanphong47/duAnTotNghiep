const filterStatusHelper = require("../../helpers/filterState.helper.js");
const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
const Account = require("../../model/account.model.js");
const system = require("../../config/system");
const paginationHelper = require("../../helpers/pagination.helper");
const createTreeHelper = require("../../helpers/create-tree.helper");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  try {
    // Status
    const filterState = filterStatusHelper(req.query);
    // end status
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    // Search
    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, "i");
      find.title = regex;
    }
    // End Search
    // console.log(find)

    // Phân trang
    const countProduct = await Product.countDocuments(find); // Đếm bản ghi
    const objectPagination = paginationHelper(4, req.query, countProduct);
    // Hết phân trang

    // Sort sắp xếp
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort["position"] = "desc";
    }
    // End sort
    const products = await Product.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip); //Phân trang
    // Lưu thông tin người tạo
    for (const product of products) {
      const account = await Account.findOne({
        _id: product.createdBy.accountId,
      });
      if (account) {
        product.createdBy.fullName = account.fullName;
      }
    }
    // hết lưu tt người tạo

    // Lưu thông tin người xóa
    // for (const product of products) {
    //   const account = await Account.findOne({
    //     _id: product.deletedBy.accountId,
    //   });
    //   if (account) {
    //     product.deletedBy.fullName = account.fullName;
    //   }
    // }
    // hết lưu tt người xóa
    // lưu tt người sửa
    for (const product of products) {
      const account = await Account.findOne({
        _id: product.updatedBy.accountId,
      });
      if (account) {
        product.updatedBy.fullName = account.fullName;
      }
    }
    // hết lưu tt người sửa
    res.render("admin/pages/products/products", {
      pageTitle: "Danh Sách Sản Phẩm",
      products: products,
      filterState: filterState,
      keyword: req.query.keyword,
      pagination: objectPagination,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/${system.prefixAdmin}/products`);
  }
};
//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  const objectUpdatedBy = {
    accountId: res.locals.user.id,
    updatedAt: new Date(),
  };
  await Product.updateOne(
    {
      _id: id,
    },
    {
      status: status,
      $push: { updatedBy: objectUpdatedBy },
    }
  );
  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back"); // tro ve trang truoc
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany(
        {
          _id: { $in: ids },
        },
        {
          status: type,
        }
      );
      req.flash("success", "Cập nhật trạng thái thành công!");
      break;
    case "delete-all":
      await Product.updateMany(
        {
          _id: { $in: ids },
        },
        {
          deleted: true,
          deletedBy: {
            accountId: res.locals.user.id,
            deletedAt: new Date(), // thêm ai là người xóa trong database
          },
        }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-"); // tách mảng
        position = parseInt(position);
        await Product.updateOne(
          {
            _id: id,
          },
          {
            position: position,
          }
        );
      }
      req.flash("success", "Thay đổi vị trí thành công!");
      break;
    default:
      break;
  }

  res.redirect("back");
};

//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        // deletedAt: new Date(),
        deletedBy: {
          accountId: res.locals.user.id,
          deletedAt: new Date(), // thêm ai là người xóa trong database
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("back");
};

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false,
  });

  const newRecords = createTreeHelper(records);
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    records: newRecords,
  });
};

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments(); // Đếm tổng số bản ghi
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file && req.file.filename) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; // lưu tên file ảnh vào data
  }
  req.body.createdBy = {
    accountId: res.locals.user.id, // thêm id của người dùng vào database
    createdAt: new Date(),
  };
  const product = new Product(req.body);
  await product.save();

  req.flash("success", "Thêm mới sản phẩm thành công!");

  res.redirect(`/${system.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });
    const records = await ProductCategory.find({
      deleted: false,
    });
    const newRecords = createTreeHelper(records);
    res.render("admin/pages/products/edit", {
      pageTitle: "chỉnh sửa sản phẩm",
      product: product,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/products`);
  }
};
// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if (req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    req.body.updatedBy = {
      accountId: res.locals.user.id, // thêm id của người dùng vào database
      updatedAt: new Date(),
    };
    await Product.updateOne(
      {
        _id: id,
        deleted: false,
      },
      {
        ...req.body,
      }
    );
    req.flash("success", "Chỉnh sửa sản phẩm thành công!");
    res.redirect(`/${system.prefixAdmin}/products`);
  } catch (error) {
    res.send("Error");
  }
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });
    res.render("admin/pages/products/detail", {
      pageTitle: "chi tiết sản phẩm",
      product: product,
    });
    // viết logic kiểm tra số lượng người xem tại đây
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/products`);
  }
};
