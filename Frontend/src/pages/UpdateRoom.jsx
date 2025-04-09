import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";

function UpdateRoom() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    title: "",
    description: "",
    price: "",
    maxGuests: "",
    amenities: [],
    location: "",
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await API.get(`/rooms/${slug}`);
        const room = response?.data?.message?.room;

        setRoomData({
          title: room.title,
          description: room.description,
          price: room.price,
          maxGuests: room.maxGuests,
          amenities: room.amenities,
          images: room.images || [],
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchRoom();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      amenities: value.split(",").map((amenity) => amenity.trim()),
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const removeExistingImage = (urlToRemove) => {
    setExistingImages(existingImages.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", roomData.title);
    formData.append("description", roomData.description);
    formData.append("price", roomData.price);
    formData.append("maxGuests", roomData.maxGuests);
    formData.append("amenities", JSON.stringify(roomData.amenities));

    images.forEach((image) => {
      formData.append("images", image);
    });

    existingImages.forEach((image) => {
      formData.append("existingImages", image);
    });

    try {
      await API.put(`/rooms/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Room updated successfully!");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={roomData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={roomData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={roomData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="maxGuests"
          placeholder="Max Guests"
          value={roomData.maxGuests}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={roomData.amenities.join(",")}
          onChange={handleAmenitiesChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Existing Image Previews */}
        <div className="flex flex-wrap gap-2">
          {existingImages.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(url)}
                className="absolute top-0 right-0 bg-red-600 text-white px-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* New Image Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <div className="flex flex-wrap gap-2">
          {images.length > 0 &&
            Array.from(images).map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="new"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Room
        </button>
      </form>
    </div>
  );
}

export default UpdateRoom;
