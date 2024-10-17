import { Request, Response } from "express";
import { getMockCategories } from "../mock-servers";
import { generateId } from "../utils/common";
import { writeToJsonFile } from "../utils/fileOperations";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await getMockCategories();
  res.json(categories);
};

export const addCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newCategory = { name, description };
  const categoriesList = await getMockCategories();
  const newId =
    parseInt(
      categoriesList.categories[categoriesList.categories.length - 1].id
    ) + 1;
  categoriesList.categories.push({
    ...newCategory,
    id: newId.toString(),
    categoryId: generateId("CAT", categoriesList.categories),
  });
  const content = JSON.stringify(categoriesList);
  writeToJsonFile("categories.json", content);
  res.json(categoriesList);
};
