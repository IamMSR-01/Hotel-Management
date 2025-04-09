import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-black via-gray-900 to-black text-gray-300 py-14">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-sm">
        {/* Company Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">StayEase</h3>
          <p className="mb-4">
            Redefining comfort with luxury. Stay at the most premium spaces, crafted for peace and ease.
          </p>
          <div className="flex gap-4 text-xl text-gray-400 mt-4">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Rooms</a></li>
            <li><a href="#" className="hover:text-yellow-400">Features</a></li>
            <li><a href="#" className="hover:text-yellow-400">Offers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-400">Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="mb-2">📍 Dehradun, Uttarakhand, India</p>
          <p className="mb-2">📞 +91 90XXXXXXXX</p>
          <p className="mb-2">✉️ support@stayease.com</p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} StayEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
