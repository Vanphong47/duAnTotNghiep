// [GET] /
module.exports.new = (req, res) => {
  res.render("client/pages/article/news.pug", {
    pageTitle: "Tin Tức",
  });
};
