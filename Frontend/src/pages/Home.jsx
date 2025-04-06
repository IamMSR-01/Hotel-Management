import Navbar from '../components/Navbar';
import Features from '../components/Features';
import RoomCard from '../components/RoomCard';
import Footer from '../components/Footer';

const rooms = [
  {
    title: "Premium Deluxe Room",
    price: 3500,
    image: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Executive Suite",
    price: 5000,
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Standard Room",
    price: 2000,
    image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-100">
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to StayEase 🏨</h2>
          <p className="text-lg text-gray-700 mb-6">Find your perfect stay at the best price!</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Book a Room
          </button>
        </div>
      </section>

      <Features />

      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Rooms</h2>
        <div className="grid gap-6 md:grid-cols-3 px-6 max-w-6xl mx-auto">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} {...room} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
