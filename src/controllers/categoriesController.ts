import { Request, Response } from "express";
import { getMockCategories } from "../mock-servers";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await getMockCategories();
  res.json(categories);
};

export const addCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newCategory = { name, description };
  const categoriesList = await getMockCategories();
  categoriesList.categories.push(newCategory);
  res.json(categoriesList);
};
