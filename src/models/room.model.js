import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const roomSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    amenities: [
        {
            type: String
        }
    ],
    images:[
        {
            type: String
        }
    ],
    available: {
        type: Boolean,
        default: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }
    ]


},{timestamps:true});

// indexing for optimization
roomSchema.index({location: "2dsphere"})
roomSchema.index({price: 1})

roomSchema.plugin(mongooseAggregatePaginate)


export const Room = mongoose.model("Room", roomSchema);