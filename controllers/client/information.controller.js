module.exports.size = async (req, res) => {
  res.render("client/pages/information/size.pug", {
    pageTitle: "Hướng dẫn đo size",
  });
};
module.exports.guarantee = async (req, res) => {
  res.render("client/pages/information/guarantee.pug", {
    pageTitle: "Bảo hành & bảo quản",
  });
};
module.exports.delivery = async (req, res) => {
  res.render("client/pages/information/delivery.pug", {
    pageTitle: "Giao hàng đổi hàng",
  });
};
module.exports.pay = async (req, res) => {
  res.render("client/pages/information/pay.pug", {
    pageTitle: "Hình thức thanh toán",
  });
};
