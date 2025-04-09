import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { fetchMe } from "../redux/slices/authSlice";

function AdminRooms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const actualUser = user?.message;

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data?.message?.docs || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDeleteRoom = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await API.delete(`/rooms/${slug}`, { withCredentials: true });
      setRooms((prev) => prev.filter((room) => room.slug !== slug));
      console.log("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchMe());
    fetchRooms();
  }, [dispatch]);


  if (!actualUser || actualUser.role !== "admin") {
    return (
      <p className="flex justify-center text-xl font-bold text-red-700">
        Access Denied
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage All Rooms</h1>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="border p-4 rounded-xl shadow-md bg-white"
            >
              <img
                src={room.images?.[0]}
                alt={room.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-gray-600">
                {room.description.slice(0, 100)}...
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Guests: {room.maxGuests}
              </p>
              <p className="text-sm text-gray-500">₹ {room.price}/night</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/update-room/${room.slug}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.slug)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRooms;
