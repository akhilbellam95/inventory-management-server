import express from "express";
import apiRoutes from "./routes/api";
import cors from "cors";
import { connectDB } from "./db";

connectDB();
const app = express();

app.use(express.json());

app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory Management API!");
});

app.use("/api", apiRoutes);

export default app;
