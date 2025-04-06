const RoomCard = ({ title, price, image }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-3">₹{price} / night</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
