import { Router } from "express";

import {
  addVendor,
  getVendors,
  updateVendor,
} from "../controllers/vendorsController";

import {
  addCategory,
  getCategories,
} from "../controllers/categoriesController";
import { addProduct, getProducts } from "../controllers/productsController";

const router = Router();

// Vendor Routes
router.get("/vendors", getVendors);
router.post("/vendors", addVendor);
router.put("/vendors", updateVendor);

// Category Routes
router.get("/categories", getCategories);
router.post("/categories", addCategory);

// Product Routes
router.get("/products", getProducts);
router.post("/products", addProduct);
export default router;
