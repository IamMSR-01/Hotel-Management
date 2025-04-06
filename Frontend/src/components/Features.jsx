const features = [
  { title: "Luxurious Rooms", desc: "Spacious and well-furnished rooms for comfort.", emoji: "🛏️" },
  { title: "24/7 Service", desc: "Round-the-clock room and concierge services.", emoji: "🕒" },
  { title: "Delicious Food", desc: "Taste the best dishes from our in-house restaurant.", emoji: "🍽️" },
];

const Features = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
      <div className="grid gap-8 md:grid-cols-3 px-6 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <div key={idx} className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <div className="text-4xl mb-3">{f.emoji}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
