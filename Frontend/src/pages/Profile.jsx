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
    </div>
  );
}

export default Profile;
