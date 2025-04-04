import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        enum: ['Pending', 'Failed', 'Paid'],
        default: 'Pending'
    }


}, {timestamps: true});

bookingSchema.plugin(mongooseAggregatePaginate);

export const Booking = mongoose.model("Booking", bookingSchema)