import React, { useState } from "react";
import { assets, cities } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/hotels",
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      console.log("Hotel registration response:", data);

      toast.success(data.message || "Hotel registered successfully!");
      setIsOwner(true);
      setShowHotelReg(false);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred while registering the hotel.";
      console.error("Hotel registration error:", message);
      toast.error(message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        action=""
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-centermd:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-6 -right-4 h-4 w-4 cursor-pointer"
            onClick={() => setShowHotelReg(false)}
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* Hotel Name */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="text-gray-500 font-medium">
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Hotel Name"
              required
              className="w-full px-3 py-2.5 outline-indigo-500 font-light border border-gray-300 rounded mt-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="text-gray-500 font-medium">
              Phone
            </label>
            <input
              type="text"
              id="contact"
              placeholder="Enter Phone Number"
              required
              className="w-full px-3 py-2.5 outline-indigo-500 font-light border border-gray-300 rounded mt-2"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
          </div>
          {/* Hotel Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="text-gray-500 font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Hotel Address"
              required
              className="w-full px-3 py-2.5 outline-indigo-500 font-light border border-gray-300 rounded mt-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          {/* City */}
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="text-gray-500 font-medium">
              City
            </label>
            <select
              id="city"
              required
              className="w-full px-3 py-2.5 outline-indigo-500 font-light border border-gray-300 rounded mt-2"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
