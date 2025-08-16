import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({ success: false, message: "Hotel is already register" });
    }

    await Hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.status(201).json({ success: true, message: "Hotel register successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.error("Hotel registration error:", error.message);
  }
};
