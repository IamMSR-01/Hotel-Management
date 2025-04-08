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
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  // Just replace your return() part with this 👇

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <button
          onClick={() => navigate("/update-avatar")}
          className="mt-2 text-blue-600 hover:underline block mx-auto"
        >
          Update Avatar
        </button>
        <div>
          <h2 className="text-xl font-bold text-black">{user.fullName}</h2>
          <p className="text-gray-600 capitalize">{user.role}</p>
        </div>
      </div>
      <div className="space-y-2 text-black">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phoneNumber}
        </p>
      </div>
      <button
        onClick={handleEdit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
      {/* Show this only if user is 'admin' */}
      {user.role === "admin" && (
        <div className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold text-green-600">
            Admin Actions
          </h2>
          <button
            onClick={() => navigate("/add-room")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Add New Room
          </button>
          {/* Add more admin buttons here if needed */}
        </div>
      )}
      {/* Show only for normal users */}
      {user.role !== "admin" && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">My Bookings</h2>
          {user?.bookings?.length > 0 ? (
            user.bookings.map((booking, index) => (
              <div key={index} className="mt-2 p-3 border rounded-md">
                <p>
                  <strong>Room:</strong> {booking?.roomDetails?.[0]?.title}
                </p>
                <p>
                  <strong>Status:</strong> {booking?.status}
                </p>
                <p>
                  <strong>Check-in:</strong> {booking?.checkInDate}
                </p>
                <p>
                  <strong>Check-out:</strong> {booking?.checkOutDate}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {booking?.paymentDetails?.[0]?.status}
                </p>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
