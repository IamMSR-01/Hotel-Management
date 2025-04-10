import { Briefcase, Building2, Globe, Users, Mail, PhoneCall, MessageCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">About StayEase</h1>
        <p className="text-lg text-white mb-10">
          At <span className="font-semibold text-primary">StayEase</span>, we believe that comfort and convenience shouldn't come with complexity. Whether you're traveling for business or leisure, our platform helps you find the perfect stay with ease. We bring you verified listings, user-friendly filters, and top-tier service.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <img
              src="https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Mission"
              className="w-full h-96 object-cover rounded-xl shadow"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Globe className="text-primary w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500 mb-1">Global Reach</h2>
                <p className="text-white">
                  StayEase connects travelers to unique stays across cities, mountains, beaches, and beyond. Explore thousands of options with verified amenities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Briefcase className="text-primary w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500 mb-1">Business Friendly</h2>
                <p className="text-white">
                  We support business professionals with tailored stays, workspace-friendly rooms, and high-speed internet in every location.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="text-primary w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500 mb-1">Customer First</h2>
                <p className="text-white">
                  Our 24/7 support and easy-to-navigate booking process make StayEase a trusted choice for thousands of happy customers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building2 className="text-primary w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-500 mb-1">Verified Properties</h2>
                <p className="text-white">
                  Every listing on StayEase goes through a thorough verification process to ensure you get exactly what you book – or even better!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-400/10 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Why Choose StayEase?</h2>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>Wide range of affordable and premium stays</li>
            <li>Advanced filtering and real-time availability</li>
            <li>Transparent pricing with no hidden charges</li>
            <li>Dedicated support team always available</li>
            <li>Safe, secure, and verified accommodations</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-white mb-1">Need Help?</h2>
          <p className="text-gray-400 mb-6">
            Reach out to our support at <span className="text-primary font-medium">support@stayease.com</span>
          </p>

          <div className="flex justify-center gap-8 text-white">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-yellow-500 mb-2" />
              <span>Email Us</span>
            </div>
            <div className="flex flex-col items-center">
              <PhoneCall className="w-8 h-8 text-yellow-500 mb-2" />
              <span>Call Support</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircle className="w-8 h-8 text-yellow-500 mb-2" />
              <span>Live Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
