import { Response, Request } from "express";
import { getMockVendors } from "../mock-servers";
import { writeToJsonFile } from "../utils/fileOperations";
import { generateId } from "../utils/common";

// Get Vendors list
export const getVendors = async (req: Request, res: Response) => {
  console.log(req);
  const vendors = await getMockVendors();
  res.json(vendors);
};

// Add new Vendor
export const addVendor = async (req: Request, res: Response) => {
  console.log(req);
  const { name, email, phone, address, gstNum } = req.body;
  const vendorsList: { vendors: Vendor[] } = await getMockVendors();
  const newId =
    parseInt(vendorsList.vendors[vendorsList.vendors.length - 1].id) + 1;
  const newVendor = {
    name,
    email,
    gstNum,
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
export const updateVendorById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { name, email, phone, address, gstNum } = req.body;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const vendorsList: { vendors: Vendor[] } = await getMockVendors();
  const vendorIndex = vendorsList.vendors.findIndex(
    (vendor) => vendor.id === id
  );
  if (vendorIndex !== -1) {
    vendorsList.vendors[vendorIndex].name = name;
    vendorsList.vendors[vendorIndex].email = email;
    vendorsList.vendors[vendorIndex].phone = phone;
    vendorsList.vendors[vendorIndex].address = address;
    vendorsList.vendors[vendorIndex].gstNum = gstNum;
    const content = JSON.stringify(vendorsList);
    try {
      writeToJsonFile("vendors.json", content);
      res.json(vendorsList);
    } catch (error) {
      res.status(500).json({
        message: "Error updating vendor",
      });
    }
  } else {
    res.status(404).json({ message: "Vendor not found" });
  }
};

// Delete Vendor based on ID
export const deleteVendorById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const vendorsList: { vendors: Vendor[] } = await getMockVendors();
  if (vendorsList.vendors.length > 0) {
    const vendorIndex = vendorsList.vendors.findIndex(
      (vendor) => vendor.id === id
    );

    if (vendorIndex !== -1) {
      vendorsList.vendors.splice(vendorIndex, 1);

      const content = JSON.stringify(vendorsList);
      try {
        writeToJsonFile("vendors.json", content);
        res.json(vendorsList);
      } catch (error) {
        res.status(500).json({
          message: "Error deleting vendor",
        });
      }
    }
  } else {
    res.status(404).json({
      message: "Vendor list is empty!!!",
    });
  }
};
