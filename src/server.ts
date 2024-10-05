import app from "./app";
// import { config } from "../config/.env";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
