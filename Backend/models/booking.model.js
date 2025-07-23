import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;