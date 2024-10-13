import { Router } from "express";

import { addVendor, getVendors } from "../controllers/vendorsController";
import {
  addCategory,
  getCategories,
} from "../controllers/categoriesController";

const router = Router();

// Vendor Routes
router.get("/vendors", getVendors);
router.post("/vendors", addVendor);

// Category Routes
router.get("/categories", getCategories);
router.post("/categories", addCategory);

export default router;
