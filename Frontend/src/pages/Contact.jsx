import { Mail, PhoneCall, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">Contact Us</h1>
        <p className="text-lg text-white mb-10">
          We’re here to help you plan your perfect stay. Whether you have a question, suggestion, or need assistance with a booking, the StayEase team is just a message away.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500">Email</h2>
                <p className="text-white">support@stayease.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <PhoneCall className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500">Phone</h2>
                <p className="text-white">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500">Address</h2>
                <p className="text-white">StayEase HQ, 4th Floor, Sky Towers, New Delhi, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-gray-400/10 p-6 rounded-xl space-y-6 shadow-md">
            <div>
              <label className="block text-sm text-white mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Type your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
