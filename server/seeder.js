import dotenv from "dotenv";
import mongoose from "mongoose";
import color from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUser = await User.insertMany(users);
    const admin = createdUser[0]._id;
    const createdProducts = products.map((product) => ({
      ...product,
      user: admin,
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
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error : ${eror.message}`);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
