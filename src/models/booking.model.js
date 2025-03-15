import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(date) {
                return this.checkInDate < date;
            },
            message: "Check-out date should be after check-in date"
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'failed', 'Paid'],
        default: 'pending'
    }


}, {timestamps: true});

export const Booking = mongoose.model("Booking", bookingSchema)