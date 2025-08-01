import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const AddRoom = () => {

  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wi-Fi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.roomType || !input.pricePerNight || !input.amenities || !Object.values(images).some(image => image)) {
      toast.error("Please fill all fields and upload at least one image.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("roomType", input.roomType);
      formData.append("pricePerNight", input.pricePerNight);

      const amenities = Object.keys(input.amenities).filter(
        (amenity) => input.amenities[amenity]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        } 
      });

      const response = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.success) {
        toast.success("Room added successfully!");
        setInput({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wi-Fi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      }else{
        toast.error(response.message || "Failed to add room. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add room.");
    } finally {
      setLoading(false); 
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and acccurate room details, pricing and amenities, to enhance the user booking experience."
      />

      {/* upload area for images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="max-h-13 cursor-pointer opacity-80"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />

            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex flex-col max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={input.roomType}
            onChange={(e) => setInput({ ...input, roomType: e.target.value })}
            className="border border-gray-300 opacity-70 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/ night</span>
          </p>
          <input
            type="number"
            value={input.pricePerNight}
            onChange={(e) =>
              setInput({ ...input, pricePerNight: e.target.value })
            }
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            placeholder="0"
          />
        </div>
      </div>

      <p className="text-gray-800 mt-4 ">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(input.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={input.amenities[amenity]}
              onChange={(e) =>
                setInput({
                  ...input,
                  amenities: {
                    ...input.amenities,
                    [amenity]: !input.amenities[amenity],
                  },
                })
              }
              className="cursor-pointer"
            />
            <label htmlFor={`amenities${index + 1}`} className="cursor-pointer">
              {" "}
              {amenity}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6 hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? "Adding Room..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
