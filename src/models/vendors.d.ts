import { ObjectId } from "mongodb";
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
interface Vendor {
  id: ObjectId;
  name: string;
  gstNum: string;
  vendorId: string;
  phone: string;
  email?: string;
  address?: Address;
  productsSupplied: string[];
  category: string;
  subCategory: string;
  createdAt?: Date;
  updatedAt?: Date;
}
