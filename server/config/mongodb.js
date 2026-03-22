import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected..");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
};

export default connectDB;
