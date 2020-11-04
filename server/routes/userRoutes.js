import express from "express";
import {
  authUser,
  deleteuser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
  AddToFavorites,
  deleteFavorite,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

router.patch("/favorites/:id", protect, deleteFavorite);
router.route("/favorites").patch(protect, AddToFavorites);

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, isAdmin, getUserById)
  .delete(protect, isAdmin, deleteuser)
  .put(protect, isAdmin, updateUser);
export default router;
