import dotenv from "dotenv";
import mongoose from "mongoose";
import categories from "./data/categories.js";
import brands from "./data/brands.js";
import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Brand from "./models/brandModal.js";
import Category from "./models/categoryModel.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();

    const createdUser = await User.insertMany(users);
    const createdCategories = await Category.insertMany(categories);
    const Mobiles = createdCategories[0]._id;

    const Brands = brands.map((brand) => ({
      ...brand,
      category: Mobiles,
    }));
    console.log(Brands);
    const createdBrand = await Brand.insertMany(Brands);
    console.log(createdBrand);
    const Apple = createdBrand[0]._id;
    const admin = createdUser[0]._id;

    const createdProducts = products.map((product) => ({
      ...product,
      user: admin,
      category: Mobiles,
      brand: Apple,
    }));
    await Product.insertMany(createdProducts);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`Error : ${eror.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error : ${eror.message}`);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
