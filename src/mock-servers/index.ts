import { IProduct } from "../models/products";
import { IVendor } from "../models/vendor";
import { getDataFromJsonFile } from "../utils/fileOperations";

export const getMockVendors = (): Promise<{ vendors: IVendor[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDataFromJsonFile("vendors.json"));
    }, 2000);
  });
};

export const getMockCategories = (): Promise<{ categories: Category[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDataFromJsonFile("categories.json"));
    }, 2000);
  });
};

export const getMockProducts = (): Promise<{ products: IProduct[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDataFromJsonFile("products.json"));
    });
  });
};
