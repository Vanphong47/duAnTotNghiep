const ProductCategory = require("../../model/product-category.model");
const system = require("../../config/system");
const createTreeHelper = require("../../helpers/create-tree.helper");
const paginationHelper = require("../../helpers/pagination.helper");

//[GET] /admin/products-category/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  // Phân trang
  const countProduct = await ProductCategory.countDocuments(find); // Đếm bản ghi
  const objectPagination = paginationHelper(4, req.query, countProduct);
  // Hết phân trang
  const records = await ProductCategory.find({
    deleted: false,
  }).skip(objectPagination.skip); //Phân trang;
  res.render("admin/pages/products-category/products-category.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: records,
    pagination: objectPagination,
  });
};

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false,
  });

  const newRecords = createTreeHelper(records);

  // console.log(newRecords);
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    records: newRecords,
  });
};

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countRecords = await ProductCategory.countDocuments();
    req.body.position = countRecords + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file && req.file.filename) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; // lưu tên file ảnh vào data
  }
  const records = new ProductCategory(req.body);
  await records.save(); // dòng code để update
  req.flash("success", "Thêm mới danh mục sản phẩm thành công!");
  res.redirect(`/${system.prefixAdmin}/products-category`);
};

//[PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await ProductCategory.updateOne(
    {
      _id: id,
    },
    {
      status: status,
    }
  );
  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back"); // tro ve trang truoc
};
//[DELETE] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductCategory.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("back");
};
//[GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const data = await ProductCategory.findOne({
      _id: req.params.id,
      deleted: false,
    });
    const records = await ProductCategory.find({
      deleted: false,
    });

    const newRecords = createTreeHelper(records);

    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/products-category`);
  }
};
//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    if (req.body.position == "") {
      const countRecords = await ProductCategory.countDocuments();
      req.body.position = countRecords + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    if (req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    await ProductCategory.updateOne(
      {
        _id: req.params.id,
        deleted: false,
      },
      req.body
    );
    req.flash("success", "Cập nhật danh mục sản phẩm thành công!");
    res.redirect(`/${system.prefixAdmin}/products-category`); // về trang hiện tại
    // res.redirect(`back`); //  về trang danh mục sản phẩm
  } catch (error) {
    res.send("Error");
  }
};

// [GET] /admin/products-category/detail/:id
// module.exports.detail = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const product = await ProductCategory.findOne({
//       _id: id,
//       deleted: false,
//     });
//     res.render("admin/pages/products-category/detail", {
//       pageTitle: "chi tiết sản phẩm",
//       product: product,
//     });
//   } catch (error) {
//     res.redirect(`/${system.prefixAdmin}/products-category`);
//   }
// };