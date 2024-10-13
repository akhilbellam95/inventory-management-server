import express from "express";
import apiRoutes from "./routes/api";

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory Management API!");
});

app.use("/api", apiRoutes);

export default app;
