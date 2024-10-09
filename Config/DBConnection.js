import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is working!", mongoose.connection.host);
  } catch (error) {
    console.error("Not connected:", error);
  }
};

export default DBConnection;
