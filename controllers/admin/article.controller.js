const Article = require("../../model/article_data.model");

//[GET] admin/article
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const record = await Article.find(find);
  res.render("admin/pages/article/article.pug", {
    pageTitle: "Trang bài viết",
    record: record,
  });
};
