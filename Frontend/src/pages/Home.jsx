import Navbar from "../components/Navbar";
import Features from "../components/Features";
import RoomCard from "../components/RoomCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const rooms = [
  {
    title: "Premium Deluxe Room",
    price: 5000,
    image:
      "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Executive Suite",
    price: 3500,
    image:
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Standard Room",
    price: 2000,
    image:
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section with Glass Effect */}
      <section className="min-h-[90vh] bg-[url('https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg')] bg-cover bg-center flex items-center justify-center px-4 ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-10 rounded-3xl shadow-lg max-w-2xl text-center text-white"
        >
          <h2 className="text-4xl font-serif text-green-500 md:text-5xl font-bold mb-4">
            Welcome to <span className="text-indigo-600">StayEase</span> 🏨
          </h2>
          <p className="text-lg font-serif text-slate-200 mb-6">
            Redefine your travel with StayEase — premium rooms, affordable
            prices, and memories that last a lifetime.
          </p>
          <button
            onClick={() => navigate("/rooms")}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-semibold shadow-md"
          >
            Book a Room
          </button>
        </motion.div>
      </section>

      <Features />

      {/* Popular Rooms Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-300 tracking-wide">
          Popular Rooms
        </h2>
        <div className="grid gap-10 md:grid-cols-3 px-6 max-w-7xl mx-auto">
          {rooms.map((room, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-200/20 hover:scale-[1.02] transition-all duration-300"
            >
              <RoomCard {...room} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
