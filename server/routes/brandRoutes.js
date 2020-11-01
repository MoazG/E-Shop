import express from "express";
import {
  addBrand,
  deleteBrand,
  getBrandById,
  listBrands,
  updateBrand,
} from "../controllers/brandController.js";

import { isAdmin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(listBrands).post(protect, isAdmin, addBrand);

router
  .route("/:id")
  .get(protect, isAdmin, getBrandById)
  .put(protect, isAdmin, updateBrand)
  .delete(protect, isAdmin, deleteBrand);

export default router;
