import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import Hotel from "../models/hotel.model.js";
import transporter from "../config/NodeMailer.js";

// function to check the availability of a room
const checkRoomAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.error("Error checking room availability:", error);
    throw new Error("Error checking room availability");
  }
};

// API to check room availability
export const checkAvailabilityAPI = async (req, res) => {
  const { checkInDate, checkOutDate, room } = req.body;

  try {
    const isAvailable = await checkRoomAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.status(200).json({ success: true, isAvailable });
  } catch (error) {
    console.error("Error checking room availability:", error);
    res
      .status(500)
      .json({ success: false, error: "Error checking room availability" });
  }
};

// function to create a booking
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    const isAvailable = await checkRoomAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available for the selected dates.",
      });
    }

    // get total price from room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({
      room,
      checkInDate,
      checkOutDate,
      guests: +guests,
      user,
      totalPrice,
      hotel: roomData.hotel._id,
    });
    if (!booking) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating booking." });
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "New Booking Details",
      html: `<h2>Your Booking Details</h2>
              <p>Dear ${req.user.username},</p>
              <p>Thank you for your booking! Here are your details: </p>
              <ul>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
                <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "$"
              } ${booking.totalPrice} / night</li>
              </ul>
                <p>We look forward to welcoming you!</p>
                <p>If you need to make any change feel fre to contact us.</p>,`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      booking,
      message: "Booking created successfully.",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, error: "Error creating booking" });
  }
};

// API to get all bookings of a user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("room")
      .populate("hotel")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching user bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth().userId });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    if (totalBookings === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found for this hotel." });
    }
    res
      .status(200)
      .json({ success: true, bookings, totalBookings, totalRevenue });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching hotel bookings" });
  }
};
