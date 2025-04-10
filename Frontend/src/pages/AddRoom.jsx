import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function AddRoom() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) return <div>Please login to access this page</div>;
  const userRole = user?.message?.role;
  if (userRole !== "admin") {
    toast.error("You are not authorized to add a room");
    return null;
  }

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    maxGuests: "",
    description: "",
    amenities: "",
    latitude: "",
    longitude: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate lat/lng
    if (!formData.latitude || !formData.longitude) {
      toast.error("Latitude and Longitude are required");
      return;
    }

    const roomData = new FormData();
    roomData.append("title", formData.title);
    roomData.append("description", formData.description);
    roomData.append("price", formData.price);
    roomData.append("maxGuests", formData.maxGuests);
    roomData.append("amenities", formData.amenities.split(","));
    roomData.append(
      "location",
      JSON.stringify({
        type: "Point",
        coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
      })
    );

    formData.images.forEach((img) => roomData.append("images", img));

    try {
      const response = await API.post("/rooms", roomData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Room added successfully");
      navigate("/rooms");
    } catch (err) {
      console.error(err);
      toast.error("Error adding room");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Room Title" value={formData.title} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="number" name="maxGuests" placeholder="Max Guests" value={formData.maxGuests} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="text" name="amenities" placeholder="Amenities (comma separated)" value={formData.amenities} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Room</button>
      </form>
    </div>
  );
}

export default AddRoom;
