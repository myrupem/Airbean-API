const Product = require("../models/product");

const getAllProducts = async () => {
  return await Product.find({});
};

module.exports = {
  getAllProducts,
};
