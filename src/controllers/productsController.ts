import { Request, Response } from "express";
import { getMockCategories, getMockProducts } from "../mock-servers";
import { generateId } from "../utils/common";
import { writeToJsonFile } from "../utils/fileOperations";

export const getProducts = async (req: Request, res: Response) => {
  const products = await getMockProducts();
  res.json(products);
};

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
