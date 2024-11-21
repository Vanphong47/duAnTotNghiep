const mongoose = require("mongoose");

module.exports.connect = () => {
  mongoose.connect(process.env.MONGO_URL)
      .then(() => console.log('Kết nối mongoose thành công !'));
}