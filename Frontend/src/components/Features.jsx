const features = [
  { title: "Luxurious Rooms", desc: "Relax in comfort with spacious, elegantly designed interiors.", emoji: "🛏️" },
  { title: "24/7 Concierge", desc: "We’re here for you anytime, day or night — just a call away.", emoji: "🕒" },
  { title: "Gourmet Dining", desc: "Taste world-class cuisine crafted by top chefs at your service.", emoji: "🍽️" },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white text-center">
      <h2 className="text-5xl font-extrabold mb-14 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
        Why StayEase?
      </h2>
      <div className="grid gap-12 md:grid-cols-3 px-6 max-w-7xl mx-auto">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="p-8 bg-white/5 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-lg transition hover:scale-105 hover:shadow-yellow-300/20 duration-300 group"
          >
            <div className="text-6xl mb-5 group-hover:animate-bounce">{f.emoji}</div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-100">{f.title}</h3>
            <p className="text-gray-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
