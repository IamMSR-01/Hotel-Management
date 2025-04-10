import { useEffect, useState } from "react";
import API from "../utils/axios";
import { motion } from "framer-motion";

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
    limit: 12,
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/rooms", { params: query });
      if (data?.message?.docs) {
        setRooms(data.message.docs);
      } else {
        setRooms([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch rooms", err);
      setRooms([]);
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
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-300"
      >
        Explore Our Rooms
      </motion.h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 max-w-6xl mx-auto">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={query.search}
          onChange={handleChange}
          className="bg-white/10 backdrop-blur-md text-white placeholder:text-slate-300 p-3 rounded-xl border border-white/10"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
          className="bg-white/10 backdrop-blur-md text-white placeholder:text-slate-300 p-3 rounded-xl border border-white/10"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
          className="bg-white/10 backdrop-blur-md text-white placeholder:text-slate-300 p-3 rounded-xl border border-white/10"
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g., WIFI,AC)"
          value={query.amenities}
          onChange={handleChange}
          className="bg-white/10 backdrop-blur-md text-white placeholder:text-slate-300 p-3 rounded-xl border border-white/10"
        />
        <select
          name="sortBy"
          onChange={handleChange}
          className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl border border-white/10"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
        </select>
      </div>

      {/* Room Cards */}
      {loading ? (
        <p className="text-center text-slate-300">Loading rooms...</p>
      ) : rooms.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
          {rooms.map((room, idx) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-200/20 hover:scale-[1.02] transition-all duration-300 p-4"
            >
              <img
                src={room.images?.[0]}
                alt={room.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold text-indigo-300 mb-1">
                {room.title}
              </h2>
              <p className="text-sm text-slate-300 mb-2">{room.description}</p>
              <p className="font-medium text-green-400">
                ₹{room.price} / night
              </p>
              <p className="text-sm text-slate-400">
                Max Guests: {room.maxGuests}
              </p>
              <p className="text-sm text-slate-400">
                Amenities: {room.amenities?.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-400">No rooms available</p>
      )}
    </section>
  );
};

export default Rooms;
