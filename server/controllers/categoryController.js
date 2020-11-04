import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all categories
// @route GET api/categories
// @access Public
export const listCategories = asyncHandler(async (req, res) => {
  const pagesize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Category.countDocuments({});
  const categories = await Category.find({})
    .limit(pagesize)
    .skip(pagesize * (page - 1));
  if (!categories) {
    res.status(404);
    throw new Error("Categories not found");
  } else {
    // res.json(categories);
    res.json({ categories, page, pages: Math.ceil(count / pagesize) });
  }
});

// @desc add new category
// @route POST api/categories
// @access PRIVATE && ADMIN
export const addCategory = asyncHandler(async (req, res) => {
  console.log("Nameeeeeeeeeeeeeeeeeeeeeee", req.body.name);
  const catName = req.body.name;
  const newCategory = new Category({ name: catName });
  const createdCategory = await newCategory.save();
  res.status(201).json(createdCategory);
});

// @desc get Category details
// @route GET api/categories/:id
// @access private && admin
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.json(category);
  }
});

// @desc update Category details
// @route PUT api/categories/:id
// @access private && admin
export const updateCategory = asyncHandler(async (req, res) => {
  const catName = req.body.name;

  const category = await Category.findById(req.params.id);
  category.name = catName;
  const updatedCategory = await category.save();
  res.status(201).json(updatedCategory);
});

// @desc delete Category
// @route DELETE api/categories/:id
// @access private && admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new Error("Category not found");
  } else {
    await category.remove();
    res.status(201).json({ message: "Brand Removed" });
  }
});

// @desc fetch categories and related brands
// @route DELETE api/categories/:id
// @access private && admin
