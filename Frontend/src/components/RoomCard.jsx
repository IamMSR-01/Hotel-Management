const RoomCard = ({ title, price, image }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-300/30 hover:scale-[1.02] transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />
      <div className="p-5 text-white">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-yellow-200 font-medium mb-4">₹{price} / night</p>
        <button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold px-5 py-2 rounded-full hover:brightness-110 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
