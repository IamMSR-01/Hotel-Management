import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({label, selected = false, onChange = () => { }}) => {
  return (
    <label className="flex items-center gap-3 mt-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className="w-4 h-4 accent-blue-500"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
}

const RadioButton = ({label, selected = false, onChange = () => { }}) => {
  return (
    <label className="flex items-center gap-3 mt-2 text-sm cursor-pointer">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
        className="w-4 h-4 accent-blue-500"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
}

function AllRooms() {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
  ];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="text-4xl md:text-[40px] font-semibold">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantages of ours limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>
        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:border-b-0 last:pb-30"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`), scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              title="View Room Detaills"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />
            <div className="flex flex-col gap-2 md:w-1/2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`), scrollTo(0, 0);
                }}
                className="text-3xl text-gray-800 cursor-pointer"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
              {/* rooms amenities */}
              <div className="flex flex-wrap items-center mb-6 gap-4 mt-3">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              {/* room price per night */}
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight} / night
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* filters */}
      <div className="bg-white w-80 border border-gray-300 rounded-lg text-gray-600 max-lg:mb-4 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters ? "border-b" : ""
          }`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`  }>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                onChange={(checked, label) => console.log(`${label} is ${checked ? "selected" : "deselected"}`)}
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Ranges</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$ ${range}`}
                onChange={(checked, label) => console.log(`${label} is ${checked ? "selected" : "deselected"}`)}
              />
            ))}
          </div>
          <div className="px-5 pt-5 pb-8">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                onChange={(label) => console.log(`${label} is selected`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRooms;
