import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";

dotenv.config();

const port = process.env.PORT || 3001;
connectDB();
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
