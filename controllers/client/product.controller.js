const Product = require("../../model/product.model");
const productCategory = require("../../model/product-category.model");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /products/
module.exports.index = async (req, res) => {
  // Phân trang
  const find = {
    deleted: false,
  };
  const countProduct = await Product.countDocuments(find); // Đếm bản ghi
  const objectPagination = paginationHelper(8, req.query, countProduct);
  // Hết phân trang
  const products = await Product.find({
    status: "active",
    deleted: false,
  })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  for (const item of products) {
    item.priceNew = item.price * (1 - item.discountPercentage / 100);
    item.priceNew = item.priceNew.toLocaleString("vi-VN");
  }
  // if (products.product_category_id) {
  //   const category = await productCategory.findOne({
  //     _id: products.product_category_id,
  //   });
  //   products.category = category;
  // }
  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    pagination: objectPagination,
  });
};

// [GET] /detail/:slug
// module.exports.detail = async (req, res) => {
//   try {
//     const slug = req.params.slug;

//     const product = await Product.findOne({
//       slug: slug,
//       deleted: false,
//       status: "active",
//     });
//     const products = await Product.find({
//       status: "active",
//       deleted: false,
//     });
//     // product.priceNew = product.price * (1 - product.discountPercentage/100)
//     // product.priceNew = product.priceNew.toFixed(0);
//     // if(product.product_category_id){
//     //   const category = await productCategory.findOne({
//     //     _id: product.product_category_id,
//     //   });
//     //   product.category = category;
//     // }
//     console.log(product);
//     res.render("client/pages/products/detail", {
//       pageTitle: product.title,
//       product: product,
//       products: products,
//     });
//   } catch (error) {
//     res.redirect("/");
//   }
// };

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    // Phân trang
    const find = {
      deleted: false,
    };
    const countProduct = await Product.countDocuments(find); // Đếm bản ghi
    const objectPagination = paginationHelper(8, req.query, countProduct);
    // Hết phân trang
    const slugCategory = req.params.slugCategory;
    const category = await productCategory.findOne({
      slug: slugCategory,
      deleted: false,
      status: "active",
    });
    const getSubCategory = async (parentId) => {
      const subs = await productCategory.find({
        parent_id: parentId,
        deleted: false,
        status: "active",
      });
      let allSubs = [...subs];
      for (const sub of subs) {
        const childs = await getSubCategory(sub.id);
        allSubs = allSubs.concat(childs);
      }
      return allSubs;
    };
    const allCategory = await getSubCategory(category.id);
    const allCategoryId = allCategory.map((item) => item.id);
    const products = await Product.find({
      product_category_id: {
        $in: [category.id, ...allCategoryId],
      },
      deleted: false,
      status: "active",
    })
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip)
      .sort({
        position: "desc",
      });
    for (const item of products) {
      item.priceNew = item.price * (1 - item.discountPercentage / 100);
      item.priceNew = item.priceNew.toLocaleString("vi-VN");
    }
    res.render("client/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      pagination: objectPagination,
    });
  } catch (error) {
    res.redirect("/");
  }
};

// [GET] /detail/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slugProduct;

    const product = await Product.findOne({
      slug: slug,
      deleted: false,
      status: "active",
    });
    product.priceNew = product.price * (1 - product.discountPercentage / 100);
    product.priceNew = product.priceNew.toLocaleString("vi-VN");
    if (product.product_category_id) {
      const category = await productCategory.findOne({
        _id: product.product_category_id,
      });
      product.category = category;
    }
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("/");
  }
};
