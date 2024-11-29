// [GET] /
module.exports.index = (req, res) => {
  res.render("client/pages/intro/intro.pug", {
    pageTitle: "Về Chúng Tôi",
  });
};
