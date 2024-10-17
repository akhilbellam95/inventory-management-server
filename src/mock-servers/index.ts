import { getDataFromJsonFile } from "../utils/fileOperations";

export const getMockVendors = (): Promise<{ vendors: Vendor[] }> => {
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

export const getMockProducts = (): Promise<{ products: Product[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDataFromJsonFile("products.json"));
    });
  });
};
