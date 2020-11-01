import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
} from "../controllers/categoryController.js";

import { isAdmin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(listCategories).post(protect, isAdmin, addCategory);
router
  .route("/:id")
  .get(protect, isAdmin, getCategoryById)
  .put(protect, isAdmin, updateCategory)
  .delete(protect, isAdmin, deleteCategory);

export default router;
