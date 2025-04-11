import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-hot-toast";

function UpdateBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    status: "",
    paymentStatus: "Pending",
    maxGuests: 1,
    duration: 1,
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        const b = res.data.booking;
        setFormData({
          checkInDate: b.checkInDate || "",
          checkOutDate: b.checkOutDate || "",
          status: b.status || "Pending",
          paymentStatus: b.paymentStatus || "Pending",
          maxGuests: b.maxGuests || 1,
          duration: b.duration || 1,
        });
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/bookings/update/${bookingId}`, formData);
      toast.success("Booking updated successfully!");
      navigate("/profile/:id");
    } catch (err) {
      toast.error("Failed to update booking.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-yellow-500 p-4">
      <div className="w-full max-w-2xl p-8 backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">Update Your Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className="block mb-1 font-medium">Check-In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Check-Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Booking Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Max Guests</label>
            <input
              type="number"
              name="maxGuests"
              min="1"
              value={formData.maxGuests}
              onChange={handleChange}
              className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Duration (days)</label>
            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400/80 transition cursor-pointer"
          >
            Update Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBooking;
