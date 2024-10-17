import { Response, Request } from "express";
import { getMockVendors } from "../mock-servers";
import { writeToJsonFile } from "../utils/fileOperations";
import { generateId } from "../utils/common";

// Get Vendors list
export const getVendors = async (req: Request, res: Response) => {
  const vendors = await getMockVendors();
  res.json(vendors);
};

// Post to vendors list
export const addVendor = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  const vendorsList: { vendors: Vendor[] } = await getMockVendors();
  const newId =
    parseInt(vendorsList.vendors[vendorsList.vendors.length - 1].id) + 1;
  const newVendor = {
    name,
    email,
    phone,
    address,
    id: newId.toString(),
    vendorId: generateId("VN", vendorsList.vendors),
  };
  vendorsList.vendors.push(newVendor);
  const content = JSON.stringify(vendorsList);
  writeToJsonFile("vendors.json", content);
  res.json(vendorsList);
};

// Update Vendor based on ID
export const updateVendor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  const vendorsList: { vendors: Vendor[] } = await getMockVendors();
  const vendorIndex = vendorsList.vendors.findIndex(
    (vendor) => vendor.id === id
  );
  if (vendorIndex !== -1) {
    vendorsList.vendors[vendorIndex].name = name;
    vendorsList.vendors[vendorIndex].email = email;
    vendorsList.vendors[vendorIndex].phone = phone;
    vendorsList.vendors[vendorIndex].address = address;
  } else {
    res.status(404).json({ message: "Vendor not found" });
  }
  const content = JSON.stringify(vendorsList);
  writeToJsonFile("vendors.json", content);
  res.json(vendorsList);
};
