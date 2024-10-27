import { Request, Response } from "express";
import { getMockProducts } from "../mock-servers";
import { generateId } from "../utils/common";
import { writeToJsonFile } from "../utils/fileOperations";

// Get Products list
export const getProducts = async (req: Request, res: Response) => {
  const products = await getMockProducts();
  res.json(products);
};

// Add new Product
export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, categoryId, categoryName } = req.body;
  const newProduct = { name, description, price, categoryId, categoryName };
  const productsList = await getMockProducts();
  const newId =
    parseInt(productsList.products[productsList.products.length - 1].id) + 1;
  productsList.products.push({
    ...newProduct,
    id: newId.toString(),
    productId: generateId("PRDT", productsList.products),
  });
  const content = JSON.stringify(productsList);
  writeToJsonFile("products.json", content);
  res.json(productsList);
};

// Update Vendor based on ID
export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { name, description, price, categoryId, categoryName } = req.body;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const productsList = await getMockProducts();
  const productIndex = productsList.products.findIndex(
    (product) => product.id === id
  );

  if (productIndex !== -1) {
    productsList.products[productIndex].name = name;
    productsList.products[productIndex].description = description;
    productsList.products[productIndex].price = price;
    productsList.products[productIndex].categoryId = categoryId;
    productsList.products[productIndex].categoryName = categoryName;

    const content = JSON.stringify(productsList);
    try {
      writeToJsonFile("products.json", content);
      res.json(productsList);
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
};

// Delete Vendor based on ID
export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const productsList = await getMockProducts();
  if (productsList.products.length > 0) {
    const productIndex = productsList.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      productsList.products.splice(productIndex, 1);

      const content = JSON.stringify(productsList);

      try {
        writeToJsonFile("products.json", content);
        res.json(productsList);
      } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
      }
    }
  } else {
    res.status(404).json({
      message: "No products found",
    });
  }
};
