import Brand from "../models/brandModal.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all brands
// @route GET api/brands
// @access Public
export const listBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}).populate("category", "name");
  res.json(brands);
});

// @desc add new brand
// @route POST api/brands
// @access PRIVATE && ADMIN
export const addBrand = asyncHandler(async (req, res) => {
  console.log(req.body);
  const brandName = req.body.name;
  const categoryId = req.body.categoryId;
  const newBrand = new Brand({ name: brandName, category: categoryId });

  const createdBrand = await newBrand.save();
  res.status(201).json(createdBrand);
});

// @desc get Brand details
// @route GET api/Brands/:id
// @access private && admin
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.json(brand);
  }
});

// @desc update Brand details
// @route PUT api/brands/:id
// @access private && admin
export const updateBrand = asyncHandler(async (req, res) => {
  const brandName = req.body.name;
  const categoryId = req.body.category;

  const brand = await Brand.findById(req.params.id);
  brand.name = brandName;
  brand.category = categoryId;
  const updatedBrand = await brand.save();
  res.status(201).json(updatedBrand);
});

// @desc delete Brand
// @route DELETE api/brands/:id
// @access private && admin
export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  } else {
    await brand.remove();
    res.json({ message: "Brand Removed" });
  }
});
