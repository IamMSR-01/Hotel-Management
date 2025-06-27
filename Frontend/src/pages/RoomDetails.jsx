import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    if (room) {
      setRoom(room);
      setMainImage(room.images[0]);
    }
  }, [id]);
  return (
    room && (
      <div className="min-h-screen py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* room details */}
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <h1 className="font-semibold text-3xl md:text-4xl">
            {room.hotel.name}{" "}
            <span className="font-inner text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inner py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        {/* room rating */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>
        {/* room address */}
        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
        {/* room images  */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/2">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt={`Room Image ${index + 1}`}
                  className={`w-full object-cover rounded-xl shadow-md cursor-pointer ${
                    mainImage === image ? "outline-3 outline-orange-500" : ""
                  }`}
                />
              ))}
          </div>
        </div>
        {/* room highlight */}
        <div className="flex flex-col md:flex-row mt-10 md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Experience Luxury Never Before
            </h1>
            <div className="flex items-center gap-4 mt-3 mb-6 flex-wrap">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 "
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-4"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* room price */}
          <p className="text-2xl font-medium">${room.pricePerNight} / night</p>
        </div>
        {/* check availability */}
        <form
          className="flex flex-col md:flex-row item-start md:items-center justify-between bg-white shadow-2xl p-6 rounded-xl mx-auto mt-16 max-w-6xl"
          action=""
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-wrap md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-in
              </label>
              <input
                type="date"
                id="checkInDate"
                className="border border-gray-300 p-2 rounded-lg mt-1.5 w-full"
                placeholder="Check-in"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-out
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="border border-gray-300 p-2 rounded-lg mt-1.5 w-full"
                placeholder="Check-out"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                className="border border-gray-300 p-2 rounded-lg mt-1.5 w-full"
                placeholder="Guests"
                required
              />
            </div>
          </div>
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 cursor-pointer"
            type="submit"
          >
            Check Availability
          </button>
        </form>
        {/* common specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div
              key={index}
              className="flex items-start gap-2"
            >
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div className="flex flex-col">
                <p className="font-medium">{spec.title}</p>
                <p className="text-sm text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* room description */}
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests can enjoy a range of amenities, including a fully equipped kitchen, a spacious living area, and a private balcony with stunning views. The room is designed to provide a comfortable and relaxing atmosphere, making it the perfect choice for both short and long stays. Whether you're traveling for business or leisure, this room offers everything you need for a memorable stay.
          </p>
        </div>
        {/* hotel owner information */}
        <div className="flex flex-col item-start gap-4">
          <div className="flex gap-4">
            <img src={room.hotel.owner.image} alt="Host" className="w-14 h-14 md:w-18 md:h-18 rounded-full" />
            <div>
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-blue-500 hover:bg-blue-600 w-40 transition-all cursor-pointer">Contact Now</button>
        </div>
      </div>
    )
  );
}

export default RoomDetails;
