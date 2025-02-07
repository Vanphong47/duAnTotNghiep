const PayOs = require("@payos/node");
const system = require("../../config/system");

const payos = new PayOs("client_id", "api-key", "checksum-key"); // tạo mới 1 payos

module.exports.create = async (req, res) => {
  const order = {
    amount: 10000,
    description: "Thanh toán mì tôm",
    orderCode: 10,
    returnUrl: `${system.prefixAdmin}`,
    canceUrl: `${system.prefixAdmin}`,
  };
  await payos.getPaymentLinkInformation(order);

  res.redirect(303, paymentLink.checkoutUrl);
};
