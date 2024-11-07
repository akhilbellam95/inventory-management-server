import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URL || "";
const client = new MongoClient(uri);
let db: Db;

const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
    db = client.db("inventory-management");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const getVendorsCollection = () => db.collection("vendors");
const getProductsCollection = () => db.collection("products");
const getvendorCategoriesCollection = () => db.collection("vendor-categories");
const getproductCategoriesCollection = () =>
  db.collection("product-categories");

export {
  connectDB,
  getVendorsCollection,
  getProductsCollection,
  getvendorCategoriesCollection,
  getproductCategoriesCollection,
};
