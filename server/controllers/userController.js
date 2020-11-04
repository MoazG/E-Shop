import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generatToken.js";

// @desc : auth Users & get Token
// @routes : POST api/users/login
// @access : Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      favorites: user.favorites,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc : regiser new User
// @routes : POST api/users/register
// @access : Public
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    email,
    password,
    name,
    favorites: [],
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

// @desc :  get User profile
// @routes : GET api/users/profile
// @access : PRIVATE
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      favorites: user.favorites,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// @desc :  Update User profile
// @routes : PUT api/users/profile
// @access : PRIVATE
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.favorites = req.body.favorites || user.favorites;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// @desc    Update user favorites
// @route   PATCH /api/users/:id
// @access  Private/User
export const AddToFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const product = req.body.product;
  console.log(product);
  if (user) {
    const exist = user.favorites.findIndex((elm) => elm._id === product._id);
    if (exist !== -1) {
      res.status(404);
      throw new Error("Product exists");
    } else {
      user.favorites.push(product);
      const updatedUser = await user.save();
      res.json(updatedUser.favorites);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const deleteFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const productId = req.params.id;
  if (user) {
    const exist = user.favorites.findIndex((elm) => elm._id === productId);
    if (exist === -1) {
      res.status(404);
      throw new Error("Product not exists");
    } else {
      user.favorites.splice(exist, 1);
      const updatedUser = await user.save();
      res.json(updatedUser.favorites);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc :  get all users
// @routes : GET api/users
// @access : PRIVATE && ADMIN
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc :  delete user
// @routes : DELETE api/users/:id
// @access : PRIVATE && ADMIN
export const deleteuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user removed" });
  } else {
    res.status(401);
    throw new Error("User removed");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
