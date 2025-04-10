import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { motion } from "framer-motion";

function RoomDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRoom = async () => {
    try {
      const { data } = await API.get(`/rooms/${slug}`);
      setRoom(data?.message?.room);
    } catch (error) {
      console.error("Error fetching room details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [slug]);

  if (loading)
    return <div className="text-center text-slate-300 py-20">Loading...</div>;

  if (!room)
    return (
      <div className="text-center text-red-400 py-20">Room not found.</div>
    );

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto backdrop-blur-md bg-white/5 p-6 rounded-3xl border border-white/10 shadow-lg shadow-pink-300/10"
      >
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={room.images?.[0]}
          alt={room.title}
          className="rounded-2xl mb-6 w-full h-[400px] object-cover shadow-lg"
        />

        <motion.h2
          className="text-4xl font-bold text-indigo-300 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {room.title}
        </motion.h2>

        <p className="text-slate-300 text-lg mb-6">{room.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
            <p className="text-green-400 font-semibold text-xl mb-2">
              ₹{room.price} / night
            </p>
            <p className="text-slate-400 mb-1">Max Guests: {room.maxGuests}</p>
            <p className="text-slate-400">
              Amenities:{" "}
              <span className="text-pink-300">
                {room.amenities?.join(", ")}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center">
            <motion.button
              onClick={() => navigate("/book-room", { state: { roomId: room._id } })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 transition-all px-8 py-3 rounded-xl shadow-lg text-white font-semibold"
            >
              Book Now
            </motion.button>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h3 className="text-3xl font-bold text-pink-400 mb-4">Reviews</h3>
          {room.reviews?.length > 0 ? (
            <div className="space-y-4">
              {room.reviews.map((rev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl shadow-md"
                >
                  <p className="text-yellow-400 font-medium mb-1">
                    ⭐ {rev.rating}
                  </p>
                  <p className="text-slate-200">{rev.comment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No reviews yet.</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default RoomDetails;
