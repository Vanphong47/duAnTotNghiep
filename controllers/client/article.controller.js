const Article = require("../../model/article_data.model");

// [GET] /
module.exports.new = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const recordAricle = await Article.find(find);
  res.render("client/pages/article/news.pug", {
    pageTitle: "Tin Tức",
    recordAricle: recordAricle,
  });
};

// [GET] /article/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findOne({
      _id: id,
      deleted: false,
    });
    res.render("client/pages/article/detail", {
      pageTitle: "chi tiết bài viết",
      article: article,
    });
  } catch (error) {
    res.redirect(`/article`);
  }
};
