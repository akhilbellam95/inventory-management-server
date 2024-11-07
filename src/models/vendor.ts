import { Schema, model, Document, ObjectId, Types } from "mongoose";

interface VendorAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IVendor {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  address?: VendorAddress;
  productsSupplied: string[];
  gstNum: string;
  category: string;
  subCategory: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const vendorSchema = new Schema<IVendor>({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  gstNum: { type: String },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Vendor = model<IVendor>("Vendor", vendorSchema);

export default Vendor;

// interface Vendor {
//   name: string;
//   address: string;
//   email: string;
//   phone: string;
//   gstNum: string;
//   vendorId: string;
// }
