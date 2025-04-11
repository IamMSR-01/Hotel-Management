import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../utils/axios";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId;

  const [formData, setFormData] = useState({
    roomId: roomId,
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    duration: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/bookings/create", {
        ...formData,
        roomId,
      });
      alert("Booking successful!");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="w-full max-w-lg p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          🛏️ Book This Room
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">
              Check-In Date
            </label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">
              Check-Out Date
            </label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">
              Duration
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 transition-transform transform hover:scale-105"
          >
            ✅ Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
