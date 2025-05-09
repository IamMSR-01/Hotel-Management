import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-hot-toast";
import {formatDate} from "../utils/formatDate.js";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: userData, isLoading } = useSelector((state) => state.auth);
  const user = userData?.message;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.bookings) {
      setBookings(user.bookings);
    }
  }, [user?.bookings]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      await API.delete(`/bookings/cancel/${bookingId}`);
      toast.success("Booking cancelled successfully!");
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to cancel booking";
      toast.error(msg);
      console.error("Delete Booking Error:", msg);
    }
  };

  if (isLoading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  if (!user) {
    return (
      <div className="text-white text-center mt-10">
        Please login to view your profile
      </div>
    );
  }

  const handleEdit = () => navigate("/edit-profile");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-black pb-10"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3251700/pexels-photo-3251700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="w-full mt-14 max-w-6xl p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl text-white">
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex flex-col items-center">
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover border-4 border-white/40 shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={() => navigate("/update-avatar")}
              className="mt-4 text-sm text-yellow-900 hover:text-yellow-200 bg-yellow-300 p-2 rounded hover:underline"
            >
              Update Avatar
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-4xl text-yellow-500 font-bold">
              {user.fullName}
            </h2>
            <p className="text-medium text-green-300 capitalize">{user.role}</p>
            <div className="grid grid-cols-1 gap-4">
              <p>
                <strong>Username:</strong>{" "}
                <span className="text-yellow-400">{user.username}</span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span className="text-yellow-400">{user.email}</span>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <span className="text-yellow-400">{user.phoneNumber}</span>
              </p>
            </div>
            <button
              onClick={handleEdit}
              className="mt-4 px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform duration-300"
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* Admin Actions */}
        {user.role === "admin" && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-green-300 mb-4">
              Admin Actions
            </h3>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/add-room")}
                className="bg-green-600 px-5 py-2 rounded-full hover:bg-green-500 transition-all duration-300"
              >
                ➕ Add New Room
              </button>
              <button
                onClick={() => navigate("/admin/rooms")}
                className="bg-yellow-500 px-5 py-2 rounded-full hover:bg-yellow-400 transition-all duration-300"
              >
                🛠️ Manage All Rooms
              </button>
            </div>
          </div>
        )}

        {/* My Bookings */}
        {user.role !== "admin" && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-yellow-400 mb-6">
              My Bookings
            </h3>
            {bookings?.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {bookings.map((booking, index) => {
                  const room = booking?.roomDetails?.[0];
              
                  return (
                    <div
                      key={index}
                      className="bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-lg backdrop-blur-md"
                    >
                      <img
                        src={
                          room?.images?.[0] || "https://via.placeholder.com/300"
                        }
                        alt={room?.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 text-white space-y-2">
                        <h4 className="text-2xl font-bold text-yellow-300">
                          {room?.title}
                        </h4>
                        <p className="text-sm text-gray-200">
                          {room?.description?.slice(0, 100)}...
                        </p>
                        <p className="text-green-300">₹{room?.price} / night</p>
                        <p className="text-yellow-500">
                          ⭐ {room?.rating || 4.5} / 5
                        </p>

                        <div className="text-sm space-y-1 pt-2">
                          <p>
                            <strong>Check-in:</strong> {formatDate(booking?.checkInDate)}
                          </p>
                          <p>
                            <strong>Check-out:</strong> {formatDate(booking?.checkOutDate)}
                          </p>
                          <p>
                            <strong>Guests:</strong> {room?.maxGuests}
                          </p>
                          <p>
                            <strong>Duration:</strong> {booking?.duration} <span>Days</span>
                          </p>
                          <p>
                            <strong>Status:</strong> {booking?.status}
                          </p>
                          <p>
                            <strong>Payment:</strong>{" "}
                            {booking.paymentStatus}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4">
                          <button
                            onClick={() => navigate(`/rooms/${room?.slug}`)}
                            className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 text-white"
                          >
                            🔍 View Details
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/update-booking/${booking._id}`)
                            }
                            className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                          >
                            ✏️ Update
                          </button>
                          {booking.status !== "Cancelled" ? (
                            <button
                              className="bg-red-500 text-white px-4 py-1 rounded"
                              onClick={() => handleDeleteBooking(booking._id)}
                            >
                              Cancel Booking
                            </button>
                          ) : (
                            <span className="font-bold text-xl text-red-600 italic">
                              Already Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-white text-sm">No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
