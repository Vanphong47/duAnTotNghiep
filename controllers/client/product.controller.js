const Product = require("../../model/product.model");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /products/
module.exports.index = async (req, res) => {
  // Phân trang
  const find = {
    deleted: false,
  };
  const countProduct = await Product.countDocuments(find); // Đếm bản ghi
  const objectPagination = paginationHelper(4, req.query, countProduct);
  // Hết phân trang
  const products = await Product.find({
    status: "active",
    deleted: false,
  })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  for (const item of products) {
    item.priceNew = item.price * (1 - item.discountPercentage / 100);
    item.priceNew = item.priceNew.toFixed(0);
  }
  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    pagination: objectPagination,
  });
};

// [GET] /detail/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;

    const product = await Product.findOne({
      slug: slug,
      deleted: false,
      status: "active",
    });
    // product.priceNew = product.price * (1 - product.discountPercentage/100)
    // product.priceNew = product.priceNew.toFixed(0);
    // if(product.product_category_id){
    //   const category = await productCategory.findOne({
    //     _id: product.product_category_id,
    //   });
    //   product.category = category;
    // }
    console.log(product);
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("/");
  }
};
