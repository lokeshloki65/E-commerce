//

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://kavin:kavin123@ecom.wsdjg.mongodb.net/Ecom"
    );
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
