import { Request, Response } from "express";
import { getMockProducts } from "../mock-servers";
import { getProductsCollection } from "../db";
import { ObjectId } from "mongodb";
import { IProduct } from "../models/products";

// Get Products list
export const getProducts = async (req: Request, res: Response) => {
  const productsCollection = getProductsCollection();
  const products = await productsCollection.find({}).toArray();
  console.log(products);
  res.status(200).json(products);
};

// Add new Product
export const addProduct = async (req: Request, res: Response) => {
  const { name, description, category, subCategory } = req.body;

  const newProduct: IProduct = {
    _id: new ObjectId(),
    name,
    description,
    category,
    subCategory,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const product: IProduct = newProduct;
  try {
    const productsCollection = getProductsCollection();
    const result = await productsCollection.insertOne(product);
    if (result.insertedId === null) {
      const products = await productsCollection.find({}).toArray();
      res.status(201).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

// Update Vendor based on ID
export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { name, description, category, subCategory } = req.body;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  try {
    const productsCollection = getProductsCollection();

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id as string) },
      {
        $set: {
          name,
          description,
          category,
          subCategory,
          updatedAt: new Date(),
        },
      }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Product not found" });
    } else {
      const updatedProduct = await productsCollection.findOne({
        _id: new ObjectId(id as string),
      });
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete Vendor based on ID
export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  // Delete vendor from MongoDB
  const productsCollection = getProductsCollection();
  const result = await productsCollection.deleteOne({
    _id: new ObjectId(id as string),
  });
  if (result.deletedCount === 1) {
    res.status(204).json();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
