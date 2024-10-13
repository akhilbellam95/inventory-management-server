import { Response, Request } from "express";
import { getMockVendors } from "../mock-servers";
import { writeToJsonFile } from "../utils/fileOperations";

export const getVendors = async (req: Request, res: Response) => {
  const vendors = await getMockVendors();
  res.json(vendors);
};

// Post to vendors list
export const addVendor = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  const newVendor = { name, email, phone, address };
  const vendorsList: { vendors: Vendor[] } = await getMockVendors();
  console.log(vendorsList, req.body);
  vendorsList.vendors.push(newVendor);
  const content = JSON.stringify(vendorsList);
  // TODO: Write to file
  writeToJsonFile("vendors.json", content);
  res.json(vendorsList);
};
