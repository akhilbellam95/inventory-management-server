import { Router } from "express";

import {
  addVendor,
  deleteVendorById,
  getVendors,
  updateVendorById,
} from "../controllers/vendorsController";

import {
  addCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById,
} from "../controllers/categoriesController";

import {
  addProduct,
  deleteProductById,
  getProducts,
  updateProductById,
} from "../controllers/productsController";

const router = Router();

// Vendor Routes
router.get("/vendors", getVendors);
router.post("/vendors", addVendor);
router.put("/vendors", updateVendorById);
router.delete("/vendors", deleteVendorById);

// Category Routes
router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.put("/categories", updateCategoryById);
router.delete("/categories", deleteCategoryById);

// Product Routes
router.get("/products", getProducts);
router.post("/products", addProduct);
router.put("/products", updateProductById);
router.delete("/products", deleteProductById);

export default router;
