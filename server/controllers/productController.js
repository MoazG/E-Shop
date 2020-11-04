import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import Brand from "../models/brandModal.js";
import Category from "../models/categoryModel.js";

// @desc Fetch all products
// @route GET api/products/
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const pagesize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate("category", "name")
    .populate("brand", "name")
    .limit(pagesize)
    .skip(pagesize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pagesize) });
});

// @desc Fetch single product
// @route GET api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name", Category)
    .populate("brand", "name");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.json(product);
  }
});

// @desc delete a product
// @route DELETE api/products/:id
// @access Private && Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    await product.remove();
    res.json({ message: "Product Removed" });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: [
      "/images/sample.jpg",
      "/images/sample.jpg",
      "/images/sample.jpg",
      "/images/sample.jpg",
    ],
    brand: "5f9dc474a5494d23a4e57a98",
    category: "5f9dc41f12938c35544590d5",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    sale,
    discount,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.sale = sale;
    product.discount = discount;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    create a review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const reviewExists = product.reviews.find(
      (review) => req.user._id.toString() === review.user._id.toString()
    );
    if (reviewExists) {
      res.status(400);
      throw new Error("already reviewd this product");
    } else {
      const newReview = {
        name: req.user.name,
        user: req.user._id,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, current) => {
          return Number(current.rating) + acc;
        }, 0) / product.reviews.length;
      console.log(product.rating);
      await product.save();
      res.status(201).json({ message: "review Added" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    get top products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

// @desc get filtered products
// @route POST api/products/filterBy
// @access Public
export const getFilteredProducts = asyncHandler(async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let catName = req.body.catName ? req.body.catName : "";
  let brandName = req.body.brandName ? req.body.brandName : "";
  let limit = req.body.limit ? Number(req.body.limit) : 10;

  let page = Number(req.body.page) || 1;

  let findArgs = {};

  findArgs = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  if (catName) {
    const catId = await Category.find({ name: catName });
    findArgs.category = [catId[0]._id];
  }
  if (brandName) {
    const brandId = await Brand.find({ name: brandName });
    findArgs.brand = [brandId[0]._id];
  }

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }
  const count = await Product.countDocuments(findArgs);
  console.log(page);
  const products = await Product.find(findArgs)
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(limit * (page - 1));
  if (products) {
    res.status(201).json({ products, page, pages: Math.ceil(count / limit) });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
