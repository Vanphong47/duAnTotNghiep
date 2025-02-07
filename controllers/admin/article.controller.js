const Article = require("../../model/article_data.model");
const Account = require("../../model/account.model.js");
const system = require("../../config/system");
const paginationHelper = require("../../helpers/pagination.helper");

//[GET] admin/article
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  // Search
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // End Search
  // Phân trang
  const countArticle = await Article.countDocuments(find); // Đếm bản ghi
  const objectPagination = paginationHelper(3, req.query, countArticle);
  // Hết phân trang
  const record = await Article.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  // Lưu thông tin người tạo
  for (const records of record) {
    const account = await Account.findOne({
      _id: records.createdBy.accountId,
    });
    if (account) {
      records.createdBy.fullName = account.fullName;
    }
  }
  // hết lưu tt người tạo

  // Lưu thông tin người sửa
  for (const records of record) {
    const account = await Account.findOne({
      _id: records.updatedBy.accountId,
    });
    if (account) {
      records.updatedBy.fullName = account.fullName;
    }
  }
  // hết lưu tt người sửa
  res.render("admin/pages/article/article.pug", {
    pageTitle: "Trang bài viết",
    record: record,
    keyword: req.query.keyword,
    pagination: objectPagination,
  });
};

//[DELETE] /admin/article/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Article.updateOne(
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

//[GET] /admin/article/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/article/create", {
    pageTitle: "Thêm mới bài viết",
  });
};
//[POST] /admin/article/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countArticle = await Article.countDocuments(); // Đếm tổng số bản ghi
    req.body.position = countArticle + 1;
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
  const article = new Article(req.body);
  await article.save();

  req.flash("success", "Thêm mới bài viết thành công!");

  res.redirect(`/${system.prefixAdmin}/article`);
};

//[PATCH] /admin/article/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  // const objectUpdatedBy = {
  //   accountId: res.locals.user.id,
  //   updatedAt: new Date(),
  // };
  req.body.updatedBy = {
    accountId: res.locals.user.id, // thêm id của người dùng vào database
    updatedAt: new Date(),
  };

  await Article.updateOne(
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
// [GET] /admin/article/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findOne({
      _id: id,
      deleted: false,
    });
    res.render("admin/pages/article/edit", {
      pageTitle: "chỉnh sửa bài viết",
      article: article,
    });
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/article`);
  }
};

// [PATCH] /admin/article/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);
    if (req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    // const objectUpdatedBy = {
    //   accountId: res.locals.user.id,
    //   updatedAt: new Date(),
    // };
    req.body.updatedBy = {
      accountId: res.locals.user.id, // thêm id của người dùng vào database
      updatedAt: new Date(),
    };
    await Article.updateOne(
      {
        _id: id,
        deleted: false,
      },
      {
        ...req.body,
        // $push: { updatedBy: objectUpdatedBy },
        // thêm thời gian sửa trong database
      }
    );
    req.flash("success", "Chỉnh sửa sản phẩm thành công!");
    res.redirect("back");
  } catch (error) {
    res.send("Error");
  }
};
// [GET] /admin/article/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findOne({
      _id: id,
      deleted: false,
    });
    res.render("admin/pages/article/detail", {
      pageTitle: "chi tiết bài viết",
      article: article,
    });
  } catch (error) {
    res.redirect(`/${system.prefixAdmin}/article`);
  }
};
