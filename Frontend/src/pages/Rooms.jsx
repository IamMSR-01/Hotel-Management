import { useEffect, useState } from "react";
import API from "../utils/axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    amenities: "",
    sortBy: "",
    page: 1,
    limit: 10,
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      console.log("Fetching with query:", query);
      const { data } = await API.get("/rooms", { params: query });

      console.log("API Response:", data);

      if (data?.data?.docs) {
        setRooms(data.data.docs);
      } else {
        setRooms([]); // fallback
      }
    } catch (err) {
      console.error("❌ Failed to fetch rooms", err);
      setRooms([]); // in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [query]);

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={query.search}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g., WIFI,AC)"
          value={query.amenities}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="sortBy"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading rooms...</p>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="border rounded p-4 shadow">
              <img
                src={room.images?.[0]}
                alt={room.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{room.title}</h2>
              <p className="text-sm text-gray-600">{room.description}</p>
              <p className="mt-2 font-medium text-green-700">
                ₹{room.price} / night
              </p>
              <p className="text-sm text-gray-500">
                Max Guests: {room.maxGuests}
              </p>
              <p className="text-sm text-gray-500">
                Amenities: {room.amenities?.join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500">No rooms available</p>
      )}
    </div>
  );
};

export default Rooms;
