import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


// dotenv configuration
dotenv.config({ path: "./env" });
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
})