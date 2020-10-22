import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all products
// @route GET api/products/
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const pagesize = 2;
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
    .limit(pagesize)
    .skip(pagesize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pagesize) });
});

// @desc Fetch single product
// @route GET api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
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
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
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
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
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
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
