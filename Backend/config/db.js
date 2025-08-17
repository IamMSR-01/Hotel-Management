import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/hotel-booking`);
        console.log(`\n MongoDB connected successfully: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection fialed error: " + error);
        process.exit(1);
    }
}

export default connectDB;