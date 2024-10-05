import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory Management API!");
});

export default app;
