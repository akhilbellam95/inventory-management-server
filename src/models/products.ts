import { Schema, model, Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
