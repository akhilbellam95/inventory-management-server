import { Request, Response } from "express";
import { getMockCategories } from "../mock-servers";
import { generateId } from "../utils/common";
import { writeToJsonFile } from "../utils/fileOperations";

// Get Categories list
export const getCategories = async (req: Request, res: Response) => {
  const categories = await getMockCategories();
  res.json(categories);
};

// Add new Category
export const addCategory = async (req: Request, res: Response) => {
  console.log(req);
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

// Update Category based on ID
export const updateCategoryById = async (req: Request, res: Response) => {
  console.log(req);
  const { id } = req.query;
  const { name, description } = req.body;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const categoriesList = await getMockCategories();
  const categoryIndex = categoriesList.categories.findIndex(
    (category) => category.id === id
  );

  if (categoryIndex !== -1) {
    categoriesList.categories[categoryIndex].name = name;
    categoriesList.categories[categoryIndex].description = description;

    const content = JSON.stringify(categoriesList);
    try {
      writeToJsonFile("categories.json", content);
      res.json(categoriesList);
    } catch (error) {
      res.status(500).json({ message: "Failed to update category" });
    }
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

// Delete Category based on ID
export const deleteCategoryById = async (req: Request, res: Response) => {
  const id = req.query.id;
  console.log(`ID received for deletion: ${id}`);

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const categoriesList = await getMockCategories();
  const categoryIndex = categoriesList.categories.findIndex(
    (category) => category.id === id
  );

  if (categoryIndex !== -1) {
    categoriesList.categories.splice(categoryIndex, 1);

    const content = JSON.stringify(categoriesList);
    try {
      writeToJsonFile("categories.json", content);
      res.json(categoriesList);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category" });
    }
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};
