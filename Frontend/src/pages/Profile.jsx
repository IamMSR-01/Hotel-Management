import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: userData, isLoading } = useSelector((state) => state.auth);
  const user = userData?.message;

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white text-center mt-10">Please login to view your profile</div>;
  }

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="w-full max-w-3xl p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl text-white">
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
            <h2 className="text-4xl text-yellow-500 font-bold">{user.fullName}</h2>
            <p className="text-medium text-green-300 capitalize">{user.role}</p>
            <div className="grid grid-cols-1  gap-4">
              <p className="flex gap-2"><strong>Username:</strong><p className="text-yellow-400">{user.username}</p> </p>
              <p className="flex gap-2"><strong>Email:</strong><p className="text-yellow-400">{user.email}</p> </p>
              <p className="flex gap-2"><strong>Phone:</strong><p className="text-yellow-400">{user.phoneNumber}</p> </p>
            </div>
            <button
              onClick={handleEdit}
              className="mt-4 px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform duration-300"
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {user.role === "admin" && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-green-300 mb-4">Admin Actions</h3>
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

        {user.role !== "admin" && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
            {user?.bookings?.length > 0 ? (
              user.bookings.map((booking, index) => (
                <div
                  key={index}
                  className="mt-2 p-4 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm shadow-md"
                >
                  <p><strong>Room:</strong> {booking?.roomDetails?.[0]?.title}</p>
                  <p><strong>Status:</strong> {booking?.status}</p>
                  <p><strong>Check-in:</strong> {booking?.checkInDate}</p>
                  <p><strong>Check-out:</strong> {booking?.checkOutDate}</p>
                  <p><strong>Payment:</strong> {booking?.paymentDetails?.[0]?.status}</p>
                </div>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;