import { Response, Request } from "express";
import { ObjectId } from "mongodb";
import Vendor, { IVendor } from "../models/vendor"; // Assuming you have a Vendor model defined
import { getVendorsCollection } from "../db";

// Get Vendors list
export const getVendors = async (req: Request, res: Response) => {
  const vendorsCollection = getVendorsCollection();
  const vendors = await vendorsCollection.find({}).toArray();
  console.log(vendors);
  res.status(200).json(vendors);
};

// Add new Vendor
export const addVendor = async (req: Request, res: Response) => {
  console.log(req);
  const {
    name,
    email,
    phone,
    address,
    gstNum,
    category,
    subCategory,
    productsSupplied,
  } = req.body;

  const newVendor: IVendor = {
    _id: new ObjectId(),
    name,
    email,
    phone,
    address,
    gstNum,
    category,
    subCategory,
    productsSupplied,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const vendor: IVendor = new Vendor(newVendor);
  try {
    const vendorsCollection = getVendorsCollection();
    const result = await vendorsCollection.insertOne(vendor);
    if (result.insertedId === null) {
      const vendors = await vendorsCollection.find({}).toArray();
      res.status(201).json(vendors);
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding vendor", error });
  }
};

// Update Vendor based on ID
export const updateVendorById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { name, email, phone, address, gstNum, category, subCategory } =
    req.body;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  try {
    const vendorsCollection = getVendorsCollection();

    const result = await vendorsCollection.updateOne(
      { _id: new ObjectId(id as string) },
      {
        $set: {
          name,
          email,
          phone,
          address,
          gstNum,
          category,
          subCategory,
          updatedAt: new Date(),
        },
      }
    );
    if (result.modifiedCount === 1) {
      const vendors = await vendorsCollection.find({}).toArray();
      res.status(200).json(vendors);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating vendor", error });
  }
};

// Delete Vendor based on ID
export const deleteVendorById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  // Delete vendor from MongoDB
  const vendorsCollection = getVendorsCollection();
  const vendor = await vendorsCollection.findOne({
    _id: new ObjectId(id as string),
  });
  if (vendor) {
    await vendorsCollection.deleteOne({ _id: new ObjectId(id as string) });
    const vendors = await vendorsCollection.find({}).toArray();
    res.json(vendors);
  } else {
    res.status(404).json({ message: "Vendor not found" });
  }
};
