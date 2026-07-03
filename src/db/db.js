import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
