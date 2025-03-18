import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// dotenv configuration
dotenv.config({ path: "./env" });
const PORT = process.env.PORT || 3000;
// database connection functions called
// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(`Database connection fialed error: ${error}`);
//     process.exit(1);
//   });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
})